// convert-vyges-schema.js
import RefParser from "json-schema-ref-parser";
import fs from "fs";

const IN = "../schema/v1/vyges-metadata.schema.json";
const OUT = "vyges-metadata-tree.json";

async function convert() {
  try {
    console.log(`Reading schema from ${IN}...`);
    const schema = await RefParser.dereference(IN);
    console.log("Schema loaded and dereferenced successfully");

    function toTree(name, node) {
      const tree = { 
        name,
        type: node.type || 'object',
        description: node.description || '',
        required: node.required || false
      };
      
      const children = [];

      // Handle properties (object fields)
      if (node.properties && typeof node.properties === 'object') {
        for (const [key, val] of Object.entries(node.properties)) {
          children.push(toTree(key, val));
        }
      }

      // Handle array items
      if (node.items && node.items.properties) {
        children.push(toTree("items", node.items));
      }

      // Handle additional metadata
      if (node.enum) {
        tree.enum = node.enum;
      }
      
      if (node.examples && node.examples.length > 0) {
        tree.examples = node.examples.slice(0, 2); // Limit to first 2 examples
      }

      if (children.length > 0) {
        tree.children = children;
      }
      
      return tree;
    }

    console.log("Converting schema to tree structure...");
    const tree = toTree("VygesMetadata", schema);
    
    console.log(`Writing tree to ${OUT}...`);
    fs.writeFileSync(OUT, JSON.stringify(tree, null, 2));
    
    // Count nodes for verification
    function countNodes(node) {
      let count = 1;
      if (node.children) {
        node.children.forEach(child => {
          count += countNodes(child);
        });
      }
      return count;
    }
    
    const totalNodes = countNodes(tree);
    console.log(`✅ Tree written to ${OUT}`);
    console.log(`📊 Total nodes: ${totalNodes}`);
    console.log(`🌳 Tree depth: ${getTreeDepth(tree)}`);
    
  } catch (err) {
    console.error('❌ Error converting schema:', err);
    process.exit(1);
  }
}

function getTreeDepth(node, depth = 0) {
  if (!node.children || node.children.length === 0) {
    return depth;
  }
  
  let maxDepth = depth;
  node.children.forEach(child => {
    const childDepth = getTreeDepth(child, depth + 1);
    if (childDepth > maxDepth) {
      maxDepth = childDepth;
    }
  });
  
  return maxDepth;
}

convert();
