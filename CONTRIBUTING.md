# Contributing to Vyges Metadata Specification

Thank you for your interest in contributing to the Vyges Metadata Specification! This document provides guidelines for contributing to the specification, schema, and documentation.

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **Schema Improvements**: Enhancements to the JSON Schema structure
2. **Documentation**: Improvements to README, examples, and guides
3. **Examples**: Additional metadata examples for different IP types
4. **Validation**: Better validation rules and error messages
5. **Tools**: Validation scripts, generators, or integration tools
6. **Bug Reports**: Issues with the specification or documentation

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vyges-metadata-spec.git
   cd vyges-metadata-spec
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Make your changes** following the guidelines below
2. **Test your changes**:
   ```bash
   # Validate schema syntax
   jq -e . schema/v1/vyges-metadata.schema.json > /dev/null
   
   # Test with example files
   ajv validate -s schema/v1/vyges-metadata.schema.json -d examples/*.json
   ```
3. **Commit your changes** with clear commit messages
4. **Push to your fork** and create a pull request

## Schema Development Guidelines

### Schema Structure

- **Backward Compatibility**: New versions should maintain backward compatibility when possible
- **Extensibility**: Use `x-` prefixed fields for experimental features
- **Documentation**: Every field should have clear descriptions and examples
- **Validation**: Include appropriate validation rules (min/max, patterns, etc.)

### Field Naming Conventions

- **Parameters**: camelCase (e.g., `clockFrequency`)
- **Enums**: SCREAMING_SNAKE_CASE (e.g., `DIGITAL`, `ANALOG`)
- **Endpoints**: kebab-case (e.g., `api-endpoint`)

### Adding New Fields

1. **Propose the change** via GitHub issue first
2. **Document the rationale** and use cases
3. **Provide examples** of the new field in use
4. **Update documentation** and examples
5. **Add validation rules** where appropriate

### Schema Validation

All schema changes must pass validation:

```bash
# Install validation tools
npm install -g ajv-cli jsonlint

# Validate schema syntax
jsonlint schema/v1/vyges-metadata.schema.json

# Validate against examples
for file in examples/*.json; do
  ajv validate -s schema/v1/vyges-metadata.schema.json -d "$file"
done
```

## Documentation Guidelines

### README Updates

- Keep the README clear and concise
- Update examples when schema changes
- Maintain accurate version information
- Include links to related resources

### Example Files

- Provide realistic, complete examples
- Include examples for different IP types
- Show both minimal and comprehensive metadata
- Use consistent formatting and naming

## Pull Request Process

1. **Create a descriptive title** for your PR
2. **Provide a detailed description** of changes
3. **Reference related issues** using `#issue-number`
4. **Include tests** if applicable
5. **Update documentation** for any schema changes
6. **Ensure all checks pass** before requesting review

### PR Review Checklist

- [ ] Schema changes are backward compatible
- [ ] All examples validate against the schema
- [ ] Documentation is updated
- [ ] Tests pass (if applicable)
- [ ] Commit messages are clear and descriptive

## Release Process

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes to the schema
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes and documentation updates

### Release Steps

1. **Update version** in schema file
2. **Update CHANGELOG.md** with changes
3. **Create release tag** on GitHub
4. **Update documentation** with new version
5. **Announce release** to community

## Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the README and schema comments

## License

By contributing to this project, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to the Vyges Metadata Specification! 🚀 