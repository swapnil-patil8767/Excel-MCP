<div align="center">

# 📊 Excel MCP - AI-Powered Excel Automation Server

<img width="454" height="156" alt="image" src="https://github.com/user-attachments/assets/4a569b65-4f20-45a9-9469-2c7699e9d1fb" />
<br><br>


[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![FastMCP](https://img.shields.io/badge/FastMCP-Latest-green.svg)](https://github.com/jlowin/fastmcp)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/swapnil-patil8767/Excel-MCP?style=social)](https://github.com/swapnil-patil8767/Excel-MCP)

**Excel MCP** is a powerful Model Context Protocol (MCP) server that enables AI assistants like Claude to perform advanced Excel operations through natural language. Transform your Excel workflows with automated data cleaning, visualization, analysis, and manipulation - all through conversational AI.

[Features](#-key-features) • [Installation](#-complete-installation-guide) • [Usage](#-usage-guide) • [Documentation](#-available-tools-reference) • [Support](#-support)

---

</div>

## 🌟 Key Features

### 📈 Data Visualization
- **Multiple Chart Types**: Bar, Line, Pie, Area, Scatter, Combo, and Stacked charts
- **Dynamic Dashboards**: Create professional 2×2 and 2×3 dashboard layouts
- **Histograms**: Automatic frequency distribution analysis
- **Customizable Styling**: Control colors, layouts, and chart positioning

### 🧹 Advanced Data Cleaning
- **Intelligent Null Handling**: Fill with mean, median, mode, or custom values
- **Duplicate Management**: Remove, mark, or filter duplicates by specific columns
- **Outlier Detection**: IQR, Z-score, and percentile-based methods
- **Text Standardization**: Case conversion, whitespace trimming, special character removal
- **Data Validation**: Range checking, format validation (email, phone, URL)

### 🔄 Data Transformation
- **Pivot Tables**: Dynamic aggregation with sorting and filtering
- **Column Operations**: Split, merge, rename, reorder, and drop columns
- **Type Conversion**: Safe conversion between int, float, string, and bool
- **Normalization**: Min-max and z-score scaling
- **Date Parsing**: Extract year, month, day, quarter, and more from dates

### 📊 Advanced Analysis
- **Statistical Summaries**: Comprehensive dataset overview with descriptive statistics
- **Custom Pandas Code**: Execute complex operations with full pandas flexibility
- **Formatted Tables**: Create professional Excel tables with multiple style options
- **Date/Time Operations**: Standardize formats, fill gaps, and parse components

### 🎨 Professional Formatting
- **Excel Tables**: Multiple built-in styles with customizable stripes and highlights
- **Dashboard Headers**: Centered, styled titles with custom colors
- **Data Labels**: Configurable chart annotations

---

## 🚀 Complete Installation Guide

### Prerequisites Overview
Before starting, you'll need:
- ✅ Python 3.8 or higher
- ✅ uv package manager
- ✅ Claude Desktop application
- ✅ Git (optional, for cloning)

---

## 📦 Step-by-Step Setup

### Step 1: Install Python

#### Windows
1. Download Python from [python.org](https://www.python.org/downloads/)
2. Run the installer
3. ⚠️ **IMPORTANT**: Check "Add Python to PATH" during installation
4. Verify installation:
```cmd
python --version
```

#### macOS
```bash
# Using Homebrew
brew install python@3.11

# Verify installation
python3 --version
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install python3 python3-pip
python3 --version
```

---

### Step 2: Install uv Package Manager

**uv** is a fast Python package installer and resolver that makes dependency management seamless.

#### Windows (PowerShell)
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

#### macOS/Linux
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

#### Verify uv Installation
```bash
uv --version
```

If successful, you should see something like: `uv 0.x.x`

#### Alternative: Install via pip
```bash
pip install uv
```

---

### Step 3: Install Claude Desktop

#### Windows
1. Visit [Claude Desktop Download Page](https://claude.ai/download)
2. Download the Windows installer (`.exe`)
3. Run the installer and follow the prompts
4. Launch Claude Desktop and sign in with your Anthropic account

#### macOS
1. Visit [Claude Desktop Download Page](https://claude.ai/download)
2. Download the macOS installer (`.dmg`)
3. Open the `.dmg` file and drag Claude to Applications
4. Launch Claude Desktop from Applications
5. Sign in with your Anthropic account

#### Linux
1. Visit [Claude Desktop Download Page](https://claude.ai/download)
2. Download the appropriate Linux package (`.AppImage`, `.deb`, or `.rpm`)
3. Install and launch the application
4. Sign in with your Anthropic account

---

### Step 4: Get the Excel MCP Code

#### Option A: Clone with Git (Recommended)
```bash
# Install Git if you don't have it
# Windows: Download from https://git-scm.com/download/win
# macOS: brew install git
# Linux: sudo apt install git

# Clone the repository
git clone https://github.com/swapnil-patil8767/Excel-MCP.git
cd Excel-MCP
```

#### Option B: Download ZIP
1. Visit [Excel MCP Repository](https://github.com/swapnil-patil8767/Excel-MCP)
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location
5. Open terminal/command prompt in the extracted folder

---

### Step 5: Install Python Dependencies

The dependencies will be **automatically installed** when you first run the server through uv. However, you can install them manually if needed:

#### Automatic Installation (Recommended)
Dependencies are installed automatically when Claude Desktop starts the server. No action needed!

#### Manual Installation (Optional)
If you want to install dependencies beforehand:

```bash
# Navigate to the Excel-MCP directory
cd path/to/Excel-MCP

# Install all required packages
uv pip install fastmcp openpyxl pandas scipy
```

#### Required Dependencies
- **fastmcp** (v0.1.0+) - MCP server framework
- **openpyxl** (v3.0.0+) - Excel file manipulation
- **pandas** (v1.3.0+) - Data analysis and manipulation
- **scipy** (v1.7.0+) - Statistical computations

#### Verify Installation
```bash
uv pip list
```

You should see all four packages listed.

---

### Step 6: Configure Claude Desktop

Now we'll connect the Excel MCP server to Claude Desktop.

#### Find Your Configuration File

**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```
Quick access: Press `Win + R`, type `%APPDATA%\Claude`, press Enter

**macOS**:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Linux**:
```
~/.config/Claude/claude_desktop_config.json
```

#### Edit Configuration

1. **Open Claude Desktop**
2. Click on your profile icon (bottom left)
3. Select **Settings**
4. Navigate to the **Developer** tab
5. Click **Edit Config** button

This will open `claude_desktop_config.json` in your default text editor.

#### Add Excel MCP Configuration

Replace the entire file contents with the configuration below (adjust paths as needed):

##### Windows Configuration
```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\uv.exe",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "--with",
        "scipy",
        "C:\\Users\\YOUR_USERNAME\\path\\to\\Excel-MCP\\main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

**🔧 How to customize for Windows:**
1. Replace `YOUR_USERNAME` with your actual Windows username
2. Find your Python installation path:
   ```cmd
   where python
   ```
3. Update the path to `main.py` with your actual Excel-MCP location
4. Adjust Python version number if different (e.g., `Python312` for Python 3.12)

##### macOS Configuration
```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "--with",
        "scipy",
        "/Users/YOUR_USERNAME/path/to/Excel-MCP/main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

**🔧 How to customize for macOS:**
1. Replace `YOUR_USERNAME` with your actual username
2. Update the full path to `main.py`
3. You can find the full path by running in terminal:
   ```bash
   cd path/to/Excel-MCP
   pwd
   ```

##### Linux Configuration
```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "--with",
        "scipy",
        "/home/YOUR_USERNAME/path/to/Excel-MCP/main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

**🔧 How to customize for Linux:**
1. Replace `YOUR_USERNAME` with your actual username
2. Update the full path to `main.py`

#### Configuration Tips

**Finding Python Path (Windows)**:
```cmd
where python
where uv
```

**Finding Python Path (macOS/Linux)**:
```bash
which python3
which uv
```

**Getting Full Path to Excel-MCP**:
```bash
# Navigate to Excel-MCP folder first
cd path/to/Excel-MCP

# Windows (Command Prompt)
cd

# macOS/Linux
pwd
```

---

### Step 7: Test the Server

Before connecting to Claude Desktop, let's verify the server works:

#### Test Server Directly
```bash
# Navigate to Excel-MCP directory
cd path/to/Excel-MCP

# Run the server
uv run --with fastmcp --with openpyxl --with pandas --with scipy main.py
```

If successful, you'll see the server start without errors. Press `Ctrl+C` to stop.

#### Common Test Issues

**"Command not found: uv"**
- Solution: Restart your terminal after installing uv
- Or add uv to PATH manually

**"ModuleNotFoundError: No module named 'fastmcp'"**
- Solution: Install dependencies manually:
  ```bash
  uv pip install fastmcp openpyxl pandas scipy
  ```

**"Permission denied"**
- Windows: Run Command Prompt as Administrator
- macOS/Linux: Check file permissions:
  ```bash
  chmod +x main.py
  ```

---

### Step 8: Connect to Claude Desktop

### Step 8: Connect to Claude Desktop

Now that everything is configured, let's connect the server to Claude!

#### 1. Save Configuration File
- After editing `claude_desktop_config.json`, save the file
- Make sure the JSON syntax is valid (no missing commas or brackets)

#### 2. Restart Claude Desktop
- **Completely close** Claude Desktop (don't just minimize)
- **Windows**: Right-click system tray icon → Exit
- **macOS**: Cmd+Q or Claude menu → Quit Claude
- **Linux**: Close the application completely
- Wait 5 seconds
- **Reopen Claude Desktop**

#### 3. Verify Connection

Look for these indicators that the server is connected:

✅ **Tool Indicator**: You should see a 🔨 (hammer) icon in the Claude chat interface

✅ **Available Tools**: Type a message like:
```
"What Excel tools do you have available?"
```

Claude should list tools like:
- `get_all_sheets_name`
- `create_dashboard`
- `create_pivot`
- `dataset_summary_for_data_claning`
- And 40+ more tools!

#### 4. Test with a Simple Request

Upload a sample Excel file and try:
```
"Show me the sheet names in this Excel file"
```

If Claude successfully lists the sheets, congratulations! 🎉 Your setup is complete.

---

### Step 9: First Excel Operation

Let's do your first Excel automation:

#### Create a Test File (Optional)
If you don't have an Excel file, create one:

1. Open Excel/Google Sheets
2. Create a simple table:
   ```
   | Product | Sales | Region |
   |---------|-------|--------|
   | Laptop  | 1200  | North  |
   | Mouse   | 25    | South  |
   | Keyboard| 75    | East   |
   ```
3. Save as `test_data.xlsx`

#### Upload and Analyze
1. **Upload file** to Claude Desktop (drag and drop or click attachment icon)
2. **Ask Claude**:
   ```
   "Analyze this Excel file and show me:
   1. All sheet names
   2. A preview of the data
   3. Create a bar chart showing Sales by Product"
   ```

3. **Claude will**:
   - Use `get_all_sheets_name` to list sheets
   - Use `get_sheet_preview` to show data
   - Use `create_dashboard` to generate the chart
   - Return the updated file with a new "Dashboard" sheet

---

## 🔧 Advanced Configuration

### Multiple MCP Servers

You can run multiple MCP servers simultaneously:

```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "--with",
        "scipy",
        "/path/to/Excel-MCP/main.py"
      ],
      "env": {},
      "transport": "stdio"
    },
    "Other MCP Server": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "/path/to/other-mcp/main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

### Environment Variables

Add custom environment variables if needed:

```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": ["run", "--with", "fastmcp", "..."],
      "env": {
        "CUSTOM_VAR": "value",
        "DEBUG": "true"
      },
      "transport": "stdio"
    }
  }
}
```

### Timeout Configuration

For large Excel files, increase timeout:

```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": ["..."],
      "env": {},
      "transport": "stdio",
      "timeout": 300000
    }
  }
}
```

---

## 🎯 Quick Start Commands

### Check Installation
```bash
# Verify Python
python --version

# Verify uv
uv --version

# Verify dependencies
uv pip list | grep fastmcp
uv pip list | grep openpyxl
uv pip list | grep pandas

# Test server
cd path/to/Excel-MCP
uv run --with fastmcp --with openpyxl --with pandas --with scipy main.py
```

### Reset Configuration
If something goes wrong:

```bash
# Windows
del %APPDATA%\Claude\claude_desktop_config.json

# macOS/Linux
rm ~/Library/Application\ Support/Claude/claude_desktop_config.json
# or
rm ~/.config/Claude/claude_desktop_config.json
```

Then reconfigure from scratch.

---

## ✅ Installation Checklist

Use this checklist to ensure everything is set up correctly:

- [ ] Python 3.8+ installed and added to PATH
- [ ] uv package manager installed (`uv --version` works)
- [ ] Claude Desktop downloaded and installed
- [ ] Excel-MCP repository cloned or downloaded
- [ ] Dependencies installed (automatic or manual)
- [ ] `claude_desktop_config.json` edited with correct paths
- [ ] Claude Desktop restarted
- [ ] 🔨 Tool icon visible in Claude interface
- [ ] Test query successful (e.g., "What Excel tools are available?")
- [ ] Sample Excel operation completed

---

## 📹 Video Tutorials (Coming Soon)

- [ ] Complete Installation Walkthrough (Windows)
- [ ] Complete Installation Walkthrough (macOS)
- [ ] First Excel Automation Demo
- [ ] Advanced Dashboard Creation
- [ ] Data Cleaning Pipeline Example

---

## 🆘 Installation Troubleshooting

### Issue: "uv command not found"

**Solution**:
```bash
# Windows - Add to PATH manually
setx PATH "%PATH%;%USERPROFILE%\.cargo\bin"

# macOS/Linux - Add to shell profile
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### Issue: "Python not found"

**Solution**:
- Windows: Reinstall Python and check "Add to PATH"
- macOS: Use `python3` instead of `python`
- Linux: Install with `sudo apt install python3`

### Issue: "JSON syntax error in config"

**Solution**:
- Use [JSONLint](https://jsonlint.com/) to validate your config
- Common errors:
  - Missing commas between objects
  - Incorrect path separators (use `\\` on Windows)
  - Unclosed quotes or brackets

### Issue: "Server starts but no tools appear"

**Solution**:
1. Check Claude Desktop logs:
   - Windows: `%APPDATA%\Claude\logs`
   - macOS: `~/Library/Logs/Claude`
   - Linux: `~/.config/Claude/logs`
2. Verify the path to `main.py` is correct
3. Try running the server manually first

### Issue: "Module import errors"

**Solution**:
```bash
# Reinstall all dependencies
uv pip uninstall fastmcp openpyxl pandas scipy
uv pip install fastmcp openpyxl pandas scipy

# Or use requirements file
cd Excel-MCP
echo "fastmcp>=0.1.0" > requirements.txt
echo "openpyxl>=3.0.0" >> requirements.txt
echo "pandas>=1.3.0" >> requirements.txt
echo "scipy>=1.7.0" >> requirements.txt
uv pip install -r requirements.txt
```

### Issue: "Permission denied" on Linux/macOS

**Solution**:
```bash
chmod +x main.py
chmod 755 Excel-MCP
```

### Getting Help

Still stuck? Try these resources:

1. **Check logs**: Look in Claude Desktop logs folder
2. **GitHub Issues**: [Report a bug](https://github.com/swapnil-patil8767/Excel-MCP/issues)
3. **Discord/Community**: Join MCP community channels
4. **Email Support**: swapnilpatil8767@gmail.com

Include this information when asking for help:
- Operating system and version
- Python version (`python --version`)
- uv version (`uv --version`)
- Error messages from logs
- Contents of your `claude_desktop_config.json` (remove sensitive info)

---

```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\uv.exe",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "C:\\path\\to\\Excel-MCP\\main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

**Important**: Replace:
- `YOUR_USERNAME` with your Windows username
- `C:\\path\\to\\Excel-MCP\\main.py` with the actual path to your cloned repository
- Update the Python version in the path if different (e.g., `Python312` for Python 3.12)

#### macOS/Linux Configuration
```json
{
  "mcpServers": {
    "Excel MCP": {
      "command": "uv",
      "args": [
        "run",
        "--with",
        "fastmcp",
        "--with",
        "openpyxl",
        "--with",
        "pandas",
        "/path/to/Excel-MCP/main.py"
      ],
      "env": {},
      "transport": "stdio"
    }
  }
}
```

### Step 4: Restart Claude Desktop
Close and reopen Claude Desktop to load the new MCP server.

### Step 5: Verify Installation
In Claude Desktop, check for the 🔨 hammer icon indicating available tools. You should see tools like:
- `get_all_sheets_name`
- `create_dashboard`
- `create_pivot`
- `dataset_summary_for_data_claning`

---

## 📖 Usage Guide

### Basic Workflow

1. **Upload Your Excel File** to Claude Desktop
2. **Use Natural Language** to describe what you want to do
3. **Let Claude Handle** the technical implementation

### Example Use Cases

#### 📊 Creating Visualizations
```
"Create a bar chart showing sales by region from the 'Sales' sheet. 
Put it in a dashboard with the title 'Q4 Sales Analysis'."
```

#### 🧹 Cleaning Data
```
"Clean the 'CustomerData' sheet by:
1. Removing duplicates
2. Filling null values in the 'Age' column with the median
3. Standardizing email addresses to lowercase"
```

#### 📈 Pivot Analysis
```
"Create a pivot table showing total revenue by product category, 
sorted from highest to lowest, showing only the top 10 categories."
```

#### 🔍 Data Validation
```
"Check the 'Orders' sheet for:
- Outliers in the 'Price' column using IQR method
- Invalid email addresses in the 'Contact' column
- Values outside the range 0-100 in the 'Score' column"
```

#### 📅 Date Operations
```
"Standardize all dates in the 'Transactions' sheet to YYYY-MM-DD format, 
then extract year, month, and quarter into separate columns."
```

---

## 🛠️ Available Tools Reference

### Data Inspection
| Tool | Description |
|------|-------------|
| `get_all_sheets_name` | List all sheets in workbook |
| `get_sheet_preview` | Preview first N rows with metadata |
| `dataset_summary_for_data_claning` | Comprehensive data quality report |
| `get_dataframe_info` | Detailed column information and samples |

### Visualization
| Tool | Description |
|------|-------------|
| `create_dashboard` | Single chart dashboard (2×2 layout) |
| `create_dashboard_with_six_chart` | Multi-chart dashboard (2×3 layout) |
| `create_combo_chart` | Bar + Line combination chart |
| `create_stacked_chart` | Stacked bar or area chart |
| `create_histogram` | Frequency distribution chart |

### Data Cleaning
| Tool | Description |
|------|-------------|
| `drop_duplicates` | Remove duplicate rows |
| `drop_nulls` | Remove rows with null values |
| `fill_nulls` | Fill nulls with statistical measures |
| `trim_whitespace` | Remove leading/trailing spaces |
| `standardize_case` | Convert text case (lower/upper/title) |
| `remove_special_characters` | Clean text columns |

### Data Transformation
| Tool | Description |
|------|-------------|
| `create_pivot` | Generate pivot tables with aggregations |
| `split_column` | Split text into multiple columns |
| `merge_columns` | Combine columns with separator |
| `rename_columns` | Batch rename columns |
| `reorder_columns` | Change column order |
| `convert_data_types` | Safe type conversions |

### Advanced Analysis
| Tool | Description |
|------|-------------|
| `detect_outliers` | Find statistical outliers |
| `handle_outliers` | Remove, cap, or replace outliers |
| `normalize_numeric` | Min-max or z-score normalization |
| `validate_range` | Check values against expected ranges |
| `validate_format` | Validate email, phone, URL formats |

### Date/Time Operations
| Tool | Description |
|------|-------------|
| `standardize_date_format` | Convert to consistent date format |
| `parse_dates` | Extract date components (year/month/day) |
| `fill_date_gaps` | Create continuous date sequences |

### Custom Operations
| Tool | Description |
|------|-------------|
| `execute_custom_pandas_code` | Run custom pandas operations |
| `validate_custom_code` | Test code syntax before execution |

---

## 💡 Pro Tips

### Best Practices
1. **Start with Preview**: Use `get_sheet_preview` to understand your data structure
2. **Check Data Quality**: Run `dataset_summary_for_data_claning` before major operations
3. **Validate Custom Code**: Always use `validate_custom_code` before executing custom operations
4. **Backup Your Data**: Create copies before destructive operations
5. **Use Descriptive Names**: Name pivot sheets and dashboards clearly

### Performance Optimization
- Work with reasonable data sizes (< 100K rows for best performance)
- Use `top_k` parameter in pivots to limit results
- Preview data before creating multiple visualizations
- Close and reopen large workbooks periodically

### Common Patterns

#### Multi-Step Data Cleaning Pipeline
```
1. Get summary to identify issues
2. Handle duplicates
3. Fill or drop nulls
4. Standardize text formats
5. Validate data quality
6. Create final analysis dashboard
```

#### Dashboard Creation Workflow
```
1. Preview source data
2. Create necessary pivot tables
3. Design dashboard layout (2×2 or 2×3)
4. Add charts with consistent styling
5. Review and iterate
```

---

## 🐛 Troubleshooting

### Server Not Appearing in Claude
- ✅ Verify the path to `main.py` is correct
- ✅ Check Python and uv are installed correctly
- ✅ Restart Claude Desktop after config changes
- ✅ Check Claude Desktop logs for errors

### "ModuleNotFoundError"
- ✅ Ensure all dependencies are listed in the `args` section
- ✅ Try running `uv pip install openpyxl pandas scipy fastmcp` manually
- ✅ Verify Python version compatibility (3.8+)

### Excel File Errors
- ✅ Ensure file is not open in Excel
- ✅ Check file path uses proper escaping (`\\` on Windows)
- ✅ Verify file format is `.xlsx` (not `.xls`)
- ✅ Confirm you have read/write permissions

### Chart Creation Issues
- ✅ Verify sheet names match exactly (case-sensitive)
- ✅ Check column numbers are 1-based (1 = column A)
- ✅ Ensure data types are appropriate for chart type
- ✅ Confirm data range has values (not all nulls)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue with detailed reproduction steps
2. **Suggest Features**: Describe use cases and expected behavior
3. **Submit PRs**: Fork, create a feature branch, and submit a pull request
4. **Improve Documentation**: Help make this README even better

### Development Setup
```bash
git clone https://github.com/swapnil-patil8767/Excel-MCP.git
cd Excel-MCP
uv pip install -e .
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [FastMCP](https://github.com/jlowin/fastmcp) by Adam Lowin
- Excel manipulation powered by [openpyxl](https://openpyxl.readthedocs.io/)
- Data analysis with [pandas](https://pandas.pydata.org/)
- Inspired by the [Model Context Protocol](https://modelcontextprotocol.io/)

---

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/swapnil-patil8767/Excel-MCP/issues)
- **Discussions**: [GitHub Discussions](https://github.com/swapnil-patil8767/Excel-MCP/discussions)
- **Email**: patilswapnil1606@gmal.com

---

## 🎯 Roadmap

- [ ] Support for `.xls` legacy format
- [ ] Advanced statistical analysis tools
- [ ] Machine learning integration
- [ ] Real-time collaboration features
- [ ] Web-based dashboard preview
- [ ] Export to PDF/PowerPoint

---

**Made with ❤️ by Swapnil Patil**

*Transform your Excel workflows with AI - one conversation at a time.*

