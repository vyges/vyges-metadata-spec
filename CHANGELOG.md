# Changelog

All notable changes to the Vyges Metadata Specification will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Actions workflow for automated validation
- Comprehensive examples directory
- Contributing guidelines
- Apache 2.0 license
- NOTICE file for proper attribution
- Validation script with AJV v8+ support
- CI/CD pipeline with schema and example validation

### Changed
- Updated contact information to point to GitHub issues
- Fixed documentation URLs to point to GitHub repository
- Improved schema validation with draft 2020-12 JSON Schema support
- Enhanced GitHub Actions workflow with proper dependency installation
- Fixed jq syntax for required field validation
- Optimized CI workflow to skip validation for markdown-only changes
- Updated README with correct Vyges URL and removed non-public tools references

### Fixed
- Schema validation errors with AJV v8+ compatibility
- GitHub Actions workflow failures due to missing dependencies
- Required field validation in CI pipeline
- Documentation links and project references

## [1.0.0] - 2025-01-15

### Added
- Initial public release of Vyges Metadata Specification
- JSON Schema for IP metadata validation
- UI Schema for form generation
- Comprehensive field definitions and examples
- Support for ASIC and FPGA targets
- Digital, analog, mixed-signal, and hard-IP design types
- Interface definitions with signal specifications
- Template-based implementation details
- Parameter configuration system
- Dependency management
- Tool requirements specification
- Performance metrics (timing, area, power)
- Reliability and compliance information
- Automation support levels
- Maintainer information
- Branding and community links

### Features
- **Platform Agnostic**: Supports multiple target platforms
- **Automation Ready**: Structured for automated IP integration
- **Rich Metadata**: Comprehensive information for IP discovery
- **Extensible**: Custom fields and vendor extensions
- **Validation**: JSON Schema validation with examples

---

## Version History

- **1.0.0** (2025-01-15): Initial public release with comprehensive schema definition 