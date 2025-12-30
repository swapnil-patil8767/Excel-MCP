import asyncio
import os
import shutil
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from langchain_openai import ChatOpenAI
from mcp_use import MCPAgent, MCPClient
from dotenv import load_dotenv
import uuid
from io import BytesIO
import pandas as pd
load_dotenv()
from pydantic import BaseModel ,Field
from typing import List

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directory if it doesn't exist
TEMP_DIR = Path("temp_uploads")
TEMP_DIR.mkdir(exist_ok=True)

# Configure MCP server
MCP_CONFIG = {
    "mcpServers": {
        "Excel MCP": {
            "command": "C:\\Users\\Akashay\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\uv.exe",
            "args": [
                "run",
                "--with",
                "fastmcp",
                "--with",
                "openpyxl",
                "--with",
                "pandas",
                "D:\\Excel-MCP - Remote\\main.py"
            ]
        }
    }
}

async def process_excel(file_path: str, user_prompt: str):
    """Process Excel file with MCP Agent"""
    try:
        client = MCPClient.from_dict(MCP_CONFIG)
        llm = ChatOpenAI(model="gpt-4o")
        agent = MCPAgent(llm=llm, client=client, max_steps=30)
        
        # Combine file path and user prompt
        combined_prompt = f"{file_path} {user_prompt}"
        
        result = await agent.run(combined_prompt)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    prompt: str = Form(...)
):
    """Upload Excel file and process with user prompt"""
    
    # Validate file extension
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only Excel files (.xlsx, .xls) are allowed")
    
    try:
        # Generate unique filename
        file_id = str(uuid.uuid4())
        file_extension = Path(file.filename).suffix
        temp_filename = f"{file_id}{file_extension}"
        temp_file_path = TEMP_DIR / temp_filename
        
        # Save uploaded file
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Get absolute path for MCP Agent
        absolute_path = str(temp_file_path.absolute())
        
        # Process with MCP Agent - it modifies the file in place
        result = await process_excel(absolute_path, prompt)
        
        # The file has been modified by MCP server, so we return the same path
        return {
            "success": True,
            "message": "File processed successfully",
            "file_id": file_id,
            "filename": file.filename,
            "result": result,
            "file_path": absolute_path,
            "download_path": f"/download/{temp_filename}"
        }
    
    except Exception as e:
        # Clean up file if processing fails
        if temp_file_path.exists():
            temp_file_path.unlink()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/download/{filename}")
async def download_file(filename: str):
    """Download the processed Excel file"""
    
    # Security check - ensure filename doesn't contain path traversal
    if ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    file_path = TEMP_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=f"dashboard_{filename}",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

@app.post("/preview")
async def preview_file(file: UploadFile = File(...)):
    """Preview first few rows of uploaded Excel file"""
    
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only Excel files are allowed")
    
    try:
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))
        
        # Get first 10 rows for preview
        preview_data = df.head(10).fillna('').astype(str).values.tolist()
        columns = df.columns.tolist()
        
        # Add header row at the beginning
        preview_with_header = [columns] + preview_data
        
        return {
            "preview": preview_with_header,
            "columns": columns,
            "total_rows": len(df),
            "total_columns": len(columns)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Preview error: {str(e)}")


@app.post("/recommendations")
async def get_recommendations(file: UploadFile = File(...)):
    """Analyze Excel file and return AI chart recommendations"""
    
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only Excel files are allowed")
    
    try:
        contents = await file.read()
        df = pd.read_excel(BytesIO(contents))
        
        columns = df.columns.tolist()
        recommendations = []
        
        # Analyze column types
        numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
        date_cols = df.select_dtypes(include=['datetime64']).columns.tolist()
        categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
        

        # Smart recommendations based on data structure
        prompt_recommendation=f"Given the following columns: {columns}, suggest up to 8 relevant chart types for Dashbaord creation."
        
        class RecommendationItem(BaseModel):
            type: str
            columns: str
            icon: str
            description: str


        class RecommendationStyle(BaseModel):
            recommendation: List[RecommendationItem]

        llm = ChatOpenAI(model="gpt-4o")

        llm_with_style=llm.with_structured_output(RecommendationStyle)

        response=await llm_with_style.ainvoke(prompt_recommendation)

        recommendations.extend(
            [item.model_dump() for item in response.recommendation]
        )


        
        # Limit to 8 recommendations
        recommendations = recommendations[:8]
        
        # If we couldn't generate enough recommendations, add some generic ones
        if len(recommendations) < 4:
            generic = [
                {"type": "Bar Chart", "columns": "Data Summary", "icon": "📊", "description": "General comparison"},
                {"type": "Pie Chart", "columns": "Breakdown", "icon": "🥧", "description": "Percentage breakdown"},
                {"type": "Line Chart", "columns": "Trends", "icon": "📈", "description": "Track changes"},
                {"type": "Column Chart", "columns": "Comparison", "icon": "📊", "description": "Side by side view"},
            ]
            for g in generic:
                if len(recommendations) < 8 and not any(r['type'] == g['type'] for r in recommendations):
                    recommendations.append(g)
        
        return {
            "recommendations": recommendations,
            "columns": columns
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis error: {str(e)}")

@app.delete("/cleanup/{filename}")
async def cleanup_file(filename: str):
    """Clean up temporary file after download"""
    
    # Security check
    if ".." in filename or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    file_path = TEMP_DIR / filename
    
    try:
        if file_path.exists():
            file_path.unlink()
            return {"success": True, "message": "File cleaned up"}
        else:
            return {"success": False, "message": "File not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting file: {str(e)}")

@app.get("/")
async def root():
    """Serve the HTML frontend"""
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        return HTMLResponse(content=html_content)
    except FileNotFoundError:
        return {"message": "Excel MCP Dashboard API is running. Place index.html in the same directory to view the UI."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)