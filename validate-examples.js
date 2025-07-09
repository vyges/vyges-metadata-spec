const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const add2020 = require('ajv/dist/2020').default;

const schemaPath = path.join(__dirname, 'schema/v1/vyges-metadata.schema.json');
const examplesDir = path.join(__dirname, 'examples');

// Check command line arguments
const args = process.argv.slice(2);
const schemaOnly = args.includes('--schema-only');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv({ strict: false, allErrors: true, schemaId: '$id', code: { source: true }, $data: true });

// Add draft 2020-12 meta-schema support
add2020(ajv);

// Validate schema itself
try {
  const validateSchema = ajv.compile(schema);
  console.log('\x1b[32mSchema validation: PASSED\x1b[0m');
} catch (error) {
  console.log('\x1b[31mSchema validation: FAILED\x1b[0m');
  console.log(error);
  process.exit(1);
}

if (schemaOnly) {
  console.log('Schema-only validation completed successfully');
  process.exit(0);
}

// Validate examples
const validate = ajv.compile(schema);

fs.readdirSync(examplesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(examplesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const valid = validate(data);
    if (valid) {
      console.log(`\x1b[32m${file}: VALID\x1b[0m`);
    } else {
      console.log(`\x1b[31m${file}: INVALID\x1b[0m`);
      console.log(validate.errors);
    }
  }
}); 