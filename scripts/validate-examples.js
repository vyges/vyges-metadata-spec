#!/usr/bin/env node
/**
 * Validate every JSON file in examples/ against schema/v1/vyges-metadata.schema.json.
 * Uses Ajv2020 directly because ajv-cli 5.0.0 does not expose JSON Schema
 * 2020-12 in its CLI surface (it tops out at draft2019), and our schema's
 * $schema is https://json-schema.org/draft/2020-12/schema.
 */
const fs = require('fs');
const path = require('path');
const Ajv2020 = require('ajv/dist/2020').default;
const addFormats = require('ajv-formats');

const schemaPath = path.join(__dirname, '..', 'schema', 'v1', 'vyges-metadata.schema.json');
const examplesDir = path.join(__dirname, '..', 'examples');

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const files = fs.readdirSync(examplesDir).filter((f) => f.endsWith('.json')).sort();
let failed = 0;

for (const file of files) {
  const full = path.join(examplesDir, file);
  const data = JSON.parse(fs.readFileSync(full, 'utf-8'));
  const ok = validate(data);
  if (ok) {
    console.log(`OK    examples/${file}`);
  } else {
    failed += 1;
    console.error(`FAIL  examples/${file}`);
    for (const err of validate.errors || []) {
      console.error(`        ${err.instancePath || '(root)'} ${err.message}`);
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} of ${files.length} example(s) failed validation.`);
  process.exit(1);
} else {
  console.log(`\nAll ${files.length} example(s) validate against the schema.`);
}
