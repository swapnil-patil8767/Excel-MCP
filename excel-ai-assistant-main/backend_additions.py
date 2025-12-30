# =====================================================
# ADD THESE ENDPOINTS TO YOUR EXISTING FastAPI SERVER
# =====================================================

# Add these imports at the top of your main.py
import pandas as pd
from io import BytesIO

# Add these new endpoints to your FastAPI app

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
        
        # Time series recommendation
        if date_cols and numeric_cols:
            recommendations.append({
                "type": "Line Chart",
                "columns": f"{numeric_cols[0]} vs {date_cols[0]}",
                "icon": "📈",
                "description": "Track trends over time"
            })
        
        # Bar chart for categorical comparisons
        if categorical_cols and numeric_cols:
            recommendations.append({
                "type": "Bar Chart",
                "columns": f"Top {categorical_cols[0]} by {numeric_cols[0]}",
                "icon": "📊",
                "description": "Compare categories"
            })
        
        # Pie chart for distribution
        if categorical_cols:
            recommendations.append({
                "type": "Pie Chart",
                "columns": f"{categorical_cols[0]} distribution",
                "icon": "🥧",
                "description": "Show proportions"
            })
        
        # Scatter plot for correlations
        if len(numeric_cols) >= 2:
            recommendations.append({
                "type": "Scatter Plot",
                "columns": f"{numeric_cols[0]} vs {numeric_cols[1]}",
                "icon": "⚫",
                "description": "Find correlations"
            })
        
        # Area chart for cumulative data
        if date_cols and numeric_cols:
            recommendations.append({
                "type": "Area Chart",
                "columns": f"Cumulative {numeric_cols[0]}",
                "icon": "📉",
                "description": "Show cumulative trends"
            })
        
        # Column chart for comparisons
        if len(categorical_cols) >= 2 and numeric_cols:
            recommendations.append({
                "type": "Column Chart",
                "columns": f"{categorical_cols[0]} by {categorical_cols[1]}",
                "icon": "📊",
                "description": "Multi-category comparison"
            })
        
        # Histogram for distribution
        if numeric_cols:
            recommendations.append({
                "type": "Histogram",
                "columns": f"{numeric_cols[0]} distribution",
                "icon": "📊",
                "description": "Value distribution"
            })
        
        # Combo chart
        if date_cols and len(numeric_cols) >= 2:
            recommendations.append({
                "type": "Combo Chart",
                "columns": f"{numeric_cols[0]} & {numeric_cols[1]} over time",
                "icon": "📊",
                "description": "Compare multiple metrics"
            })
        
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
