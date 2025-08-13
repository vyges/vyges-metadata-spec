# Vyges Schema Viewer

A beautiful D3.js tree visualization for the Vyges metadata schema, making the 6000+ line schema easily navigable.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Convert Schema to Tree
```bash
npm run convert
```

This will:
- Read the Vyges metadata schema from `../schema/v1/vyges-metadata.schema.json`
- Convert it to a hierarchical tree structure
- Output `vyges-metadata-tree.json` for visualization

### 3. Open the Viewer
Open `schema-tree.html` in your web browser to see the beautiful tree visualization.

## 🌳 Features

- **Interactive Tree**: Click nodes to expand/collapse
- **Zoom & Pan**: Navigate large schemas easily
- **Rich Tooltips**: Hover over nodes for detailed information
- **Search & Navigation**: Find specific schema fields quickly
- **Responsive Design**: Works on desktop and mobile

## 📊 What You'll See

The converter transforms the complex JSON schema into a clean tree structure:

- **Root**: VygesMetadata
- **Level 1**: Top-level properties (target, design_type, name, etc.)
- **Level 2**: Nested properties within objects
- **Level 3+**: Deeply nested schema definitions

## 🛠️ Customization

### Modify the Converter
Edit `convert-vyges-schema.js` to:
- Change which fields are included
- Modify the tree structure
- Add custom metadata

### Custom Data
Use the textarea in the viewer to paste custom JSON data for visualization.

## 🔧 Technical Details

- **D3.js v7**: Modern tree layout algorithms
- **ES6 Modules**: Clean, maintainable code
- **JSON Schema Ref Parser**: Handles `$ref` dereferencing
- **Responsive SVG**: Scales to any screen size

## 📁 File Structure

```
schemaview/
├── package.json              # Dependencies and scripts
├── convert-vyges-schema.js   # Schema to tree converter
├── schema-tree.html         # D3.js tree viewer
├── README.md                # This file
└── vyges-metadata-tree.json # Generated tree data (after conversion)
```

## 🎯 Use Cases

- **Schema Exploration**: Understand the Vyges metadata structure
- **Documentation**: Visual reference for developers
- **Validation**: Check schema completeness and structure
- **Training**: Onboard new team members to the schema

## 🚨 Troubleshooting

### "Failed to load tree data"
Run `npm run convert` first to generate the tree data.

### "Schema not found"
Ensure the schema file exists at `../schema/v1/vyges-metadata.schema.json`

### "Invalid JSON"
Check that the converter script ran successfully and generated valid JSON.

## 🤝 Contributing

To improve the schema viewer:

1. Modify the converter script for better tree structure
2. Enhance the D3.js visualization
3. Add new interactive features
4. Improve the styling and UX

## 📄 License

Apache 2.0 - Same as the main Vyges project.
