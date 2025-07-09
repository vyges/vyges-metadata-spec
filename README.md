# Vyges Metadata Specification

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Schema Version](https://img.shields.io/badge/Schema%20Version-1.0.0-green.svg)](https://github.com/vyges/vyges-metadata-spec)
[![JSON Schema](https://img.shields.io/badge/JSON%20Schema-Draft%202020--12-orange.svg)](https://json-schema.org/draft/2020-12/schema)
[![CI/CD](https://github.com/vyges/vyges-metadata-spec/workflows/Validate%20Schema%20and%20Examples/badge.svg)](https://github.com/vyges/vyges-metadata-spec/actions)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

📋 Standardized format for hardware IP discovery and integration in the Vyges ecosystem.

## Overview

The Vyges Metadata Specification defines a standardized JSON Schema format for describing reusable silicon IP blocks. This specification enables automated discovery, integration, and management of hardware IP across different design flows and platforms.

## Quick Start

### Schema Location
- **Latest Version**: `schema/v1/vyges-metadata.schema.json`
- **UI Schema**: `schema/v1/vyges-metadata.ui-schema.json`

### Basic Example

```json
{
  "name": "vyges/spi-controller",
  "x-version": "1.0.0",
  "description": "SPI master controller with configurable clock divider",
  "license": "Apache-2.0",
  "maturity": "production",
  "target": ["asic", "fpga"],
  "design_type": ["digital"],
  "interfaces": [
    {
      "name": "spi",
      "type": "bus",
      "direction": "output",
      "protocol": "spi",
      "width": 4,
      "signals": [
        {
          "name": "sclk",
          "direction": "output",
          "type": "clock",
          "description": "SPI clock signal"
        },
        {
          "name": "mosi",
          "direction": "output",
          "type": "data",
          "description": "Master out, slave in"
        },
        {
          "name": "miso",
          "direction": "input",
          "type": "data",
          "description": "Master in, slave out"
        },
        {
          "name": "cs_n",
          "direction": "output",
          "type": "control",
          "description": "Chip select (active low)"
        }
      ]
    }
  ],
  "template": "vyges-ip-template@1.0.0",
  "fpga": {
    "toolchain": "vivado",
    "board": "arty-a7-35"
  },
  "asic": {
    "flavor": "digital",
    "pdks": ["sky130B"],
    "synthesis_tool": "openlane"
  }
}
```

## Key Features

- **Platform Agnostic**: Supports ASIC, FPGA, and mixed-signal designs
- **Automation Ready**: Structured for automated IP integration and validation
- **Rich Metadata**: Comprehensive information for IP discovery and evaluation
- **Extensible**: Custom fields and vendor-specific extensions supported
- **Validation**: JSON Schema validation with rich examples and documentation

## Schema Structure

### Core Fields (Required)
- `name`: Unique package identifier
- `x-version`: Schema version for tracking purposes
- `license`: SPDX-compatible license
- `interfaces`: Port definitions and protocols
- `template`: Template name and version used
- `target`: Supported platforms (asic/fpga)
- `design_type`: IP category (digital/analog/mixed-signal/hard-ip)
- `maturity`: Development lifecycle stage

### Enhanced Fields (Recommended)
- `parameters`: Configurable design parameters
- `dependencies`: Required IP blocks and tools
- `performance`: Timing, power, and area metrics
- `reliability`: Quality and compliance information
- `commercial`: Licensing and support details

## Usage

### Validation
```bash
# Using jq for basic validation
jq -e . your-metadata.json > /dev/null

# Using our validation script (recommended)
npm install
node validate-examples.js

# Validate schema only
node validate-examples.js --schema-only

# Using ajv-cli (legacy, limited draft 2020-12 support)
npm install -g ajv-cli
ajv validate -s schema/v1/vyges-metadata.schema.json -d your-metadata.json
```

### Integration
The schema is designed for integration with:
- EDA tools and design flows
- IP catalogs and marketplaces
- CI/CD pipelines
- Documentation generators

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Getting Started
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Reporting Issues
Found a bug or have a suggestion? Please [open an issue](https://github.com/vyges/vyges-metadata-spec/issues).

## Versioning

This specification follows [Semantic Versioning](https://semver.org/). The current schema version is **1.0.0**.

### Version History
- **1.0.0** (2025-01): Initial public release with draft 2020-12 JSON Schema support

## License

This specification is licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.

## Support

- **Documentation**: [GitHub Repository](https://github.com/vyges/vyges-metadata-spec)
- **Issues**: [GitHub Issues](https://github.com/vyges/vyges-metadata-spec/issues)
- **Discussions**: [GitHub Discussions](https://github.com/vyges/vyges-metadata-spec/discussions)

## Related Projects

- [Vyges Website](https://vyges.com/) - Official website and documentation

---

**Maintained by**: [Vyges Inc.](https://vyges.com)  
**Specification Version**: 1.0.0  
**Last Updated**: July 2025
