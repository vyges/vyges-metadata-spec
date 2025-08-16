/**
 * Vyges Metadata Specification - Example Validator
 * Copyright © 2025 Vyges All rights reserved.
 * 
 * This script validates example metadata files against the Vyges metadata schema.
 * Licensed under the Apache License, Version 2.0.
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const schemaPath = path.join(__dirname, 'schema/v1/vyges-metadata.schema.json');
const examplesDir = path.join(__dirname, 'examples');

// Check command line arguments
const args = process.argv.slice(2);
const schemaOnly = args.includes('--schema-only');
const verbose = args.includes('--verbose');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ 
  strict: false, 
  allErrors: true, 
  schemaId: '$id',
  code: { source: true }, 
  $data: true,
  // Enable draft 2020-12 features
  allowUnionTypes: true,
  allowMatchingProperties: true,
  allowMultipleOf: true,
  // Suppress format warnings for better user experience
  verbose: false
});

// Add the draft 2020-12 meta-schema explicitly
const metaSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "$schema": { "type": "string" },
    "$id": { "type": "string" },
    "$ref": { "type": "string" },
    "$defs": { "type": "object" },
    "type": { "type": "string" },
    "properties": { "type": "object" },
    "required": { "type": "array", "items": { "type": "string" } },
    "additionalProperties": { "type": "boolean" }
  }
};
ajv.addMetaSchema(metaSchema);

// Validate schema itself
try {
  const validateSchema = ajv.compile(schema);
  console.log('\x1b[32m✓ Schema validation: PASSED\x1b[0m');
} catch (error) {
  console.log('\x1b[31m✗ Schema validation: FAILED\x1b[0m');
  console.log(error);
  process.exit(1);
}

if (schemaOnly) {
  console.log('Schema-only validation completed successfully');
  process.exit(0);
}

// Validate examples
const validate = ajv.compile(schema);

console.log('\n\x1b[36m🔍 Validating Examples\x1b[0m');
console.log('=' .repeat(50));

let validCount = 0;
let invalidCount = 0;

fs.readdirSync(examplesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(examplesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const valid = validate(data);
      
      if (valid) {
        console.log(`\x1b[32m✓ ${file}: VALID\x1b[0m`);
        validCount++;
      } else {
        console.log(`\x1b[31m✗ ${file}: INVALID\x1b[0m`);
        invalidCount++;
        
        if (verbose) {
          console.log('  Errors:');
          validate.errors.forEach(error => {
            console.log(`    - ${error.instancePath || 'root'}: ${error.message}`);
          });
        } else {
          // Show first few errors for brevity
          const errorCount = validate.errors.length;
          const shownErrors = validate.errors.slice(0, 3);
          console.log(`  ${errorCount} validation error(s):`);
          shownErrors.forEach(error => {
            console.log(`    - ${error.instancePath || 'root'}: ${error.message}`);
          });
          if (errorCount > 3) {
            console.log(`    ... and ${errorCount - 3} more errors`);
          }
        }
      }
    } catch (parseError) {
      console.log(`\x1b[31m✗ ${file}: PARSE ERROR\x1b[0m`);
      console.log(`  ${parseError.message}`);
      invalidCount++;
    }
  }
});

console.log('\n' + '=' .repeat(50));
console.log(`\x1b[36m📊 Validation Summary\x1b[0m`);
console.log(`  Valid examples: ${validCount}`);
console.log(`  Invalid examples: ${invalidCount}`);
console.log(`  Total examples: ${validCount + invalidCount}`);

if (invalidCount > 0) {
  console.log('\n\x1b[33m💡 Tip: Use --verbose flag to see all validation errors\x1b[0m');
  process.exit(1);
} else {
  console.log('\n\x1b[32m🎉 All examples are valid!\x1b[0m');
}
