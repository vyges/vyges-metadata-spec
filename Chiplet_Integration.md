# Chiplet Integration in Vyges Metadata Schema

## Overview

The Vyges metadata schema includes comprehensive support for chiplet integration, enabling IP blocks to be designed, validated, and integrated into multi-die systems. This document describes the chiplet-specific metadata fields and their usage.

## Chiplet Metadata Section

### Basic Chiplet Information

```json
{
  "chiplet": {
    "chiplet_ready": true,
    "integration_level": "rtl",
    "die_to_die_interfaces": ["ucie", "bow"],
    "packaging_considerations": "Requires 2.5D interposer with 0.8mm bump pitch"
  }
}
```

#### Fields:

- **`chiplet_ready`** (boolean): Whether this IP is designed for chiplet integration
- **`integration_level`** (enum): Integration abstraction level
  - `"rtl"`: RTL-level integration (most common for Vyges IP)
  - `"netlist"`: Netlist-level integration
  - `"hard_ip"`: Hard IP integration (vendor-provided)
- **`die_to_die_interfaces`** (array): Supported die-to-die interface protocols
  - `"ucie"`: Universal Chiplet Interconnect Express
  - `"bow"`: Bunch of Wires (Open Compute Project)
  - `"aib"`: Advanced Interface Bus (Intel)
  - `"emib"`: Embedded Multi-die Interconnect Bridge (Intel)
  - `"custom"`: Custom interface protocol
- **`packaging_considerations`** (string): Human-readable packaging requirements

### Interposer Constraints

```json
{
  "interposer_constraints": {
    "technology": "silicon",
    "routing_layers": 4,
    "minimum_pitch": 0.8,
    "die_spacing": 0.1
  }
}
```

#### Fields:

- **`technology`** (enum): Interposer technology type
  - `"silicon"`: Silicon interposer (highest density)
  - `"organic"`: Organic substrate (lower cost)
  - `"glass"`: Glass interposer (emerging technology)
- **`routing_layers`** (integer): Number of routing layers required
- **`minimum_pitch`** (number): Minimum routing pitch in micrometers
- **`die_spacing`** (number): Minimum spacing between dies in millimeters

### Bump Constraints

```json
{
  "bump_constraints": {
    "pitch": 0.8,
    "size": 0.4,
    "array": "full",
    "power_bumps": 8,
    "signal_bumps": 32
  }
}
```

#### Fields:

- **`pitch`** (number): Bump pitch in micrometers
- **`size`** (number): Bump size in micrometers
- **`array`** (enum): Bump array configuration
  - `"full"`: Full area array
  - `"peripheral"`: Peripheral array only
  - `"area"`: Area array (partial coverage)
- **`power_bumps`** (integer): Number of power/ground bumps required
- **`signal_bumps`** (integer): Number of signal bumps required

### Thermal Constraints

```json
{
  "thermal_constraints": {
    "max_power_per_die": 5.0,
    "junction_temperature": 125,
    "thermal_resistance": 20,
    "cooling_requirements": "Active cooling required"
  }
}
```

#### Fields:

- **`max_power_per_die`** (number): Maximum power per die in watts
- **`junction_temperature`** (number): Maximum junction temperature in Celsius
- **`thermal_resistance`** (number): Thermal resistance in degrees C per watt
- **`cooling_requirements`** (string): Cooling requirements description

### Multi-Die Testing

```json
{
  "multi_die_testing": {
    "test_access": "boundary_scan",
    "test_coverage": {
      "interconnect": 95,
      "functionality": 90
    },
    "test_vectors": ["interconnect_test.v", "functional_test.v"]
  }
}
```

#### Fields:

- **`test_access`** (enum): Test access method
  - `"boundary_scan"`: IEEE 1149.1 boundary scan
  - `"internal_access"`: Internal test access
  - `"functional"`: Functional testing only
- **`test_coverage`** (object): Test coverage requirements
  - `"interconnect"` (number): Interconnect test coverage percentage
  - `"functionality"` (number): Functional test coverage percentage
- **`test_vectors`** (array): List of test vector files or formats

### Signal Conformance

```json
{
  "signal_conformance": {
    "protocol_reference": "UCIe 1.1",
    "verified_against": true,
    "test_suite": "UCIe Compliance Test Suite v1.1",
    "verification_date": "2024-01-15",
    "verification_tool": "UCIe Compliance Checker",
    "compliance_level": "full"
  }
}
```

#### Fields:

- **`protocol_reference`** (string): Protocol specification version and reference
- **`verified_against`** (boolean): Whether interface was verified against protocol test suite
- **`test_suite`** (string): Name and version of test suite used for verification
- **`verification_date`** (date): Date when protocol verification was completed
- **`verification_tool`** (string): Tool used for protocol verification
- **`compliance_level`** (enum): Level of protocol compliance achieved
  - `"basic"`: Basic compliance
  - `"full"`: Full compliance
  - `"extended"`: Extended compliance features

### Power Domains

```json
{
  "power_domains": [
    {
      "name": "core_pd",
      "voltage": 0.8,
      "type": "logic",
      "isolation_required": true,
      "retention_required": false,
      "max_current_ma": 100,
      "description": "Core logic domain"
    },
    {
      "name": "io_pd",
      "voltage": 1.8,
      "type": "io",
      "isolation_required": false,
      "max_current_ma": 50,
      "description": "I/O interface domain"
    }
  ]
}
```

#### Fields:

- **`name`** (string): Power domain name
- **`voltage`** (number): Operating voltage in volts
- **`type`** (enum): Type of circuitry in this power domain
  - `"logic"`: Digital logic
  - `"memory"`: Memory circuits
  - `"analog"`: Analog circuits
  - `"io"`: I/O circuits
  - `"mixed"`: Mixed-signal circuits
- **`isolation_required`** (boolean): Whether power isolation is required
- **`retention_required`** (boolean): Whether state retention is required during power down
- **`max_current_ma`** (number): Maximum current draw in milliamps
- **`description`** (string): Description of power domain purpose

### Lifecycle and Supply Chain

```json
{
  "lifecycle": {
    "origin": "vyges/partner-x",
    "trusted_fabricator": true,
    "version_control": "git",
    "release_status": "qualified",
    "fabrication_node": "tsmc7nm",
    "package_type": "2.5d_interposer",
    "supply_chain_tracking": true,
    "certification": ["ISO 9001", "IATF 16949"]
  }
}
```

#### Fields:

- **`origin`** (string): Origin of the chiplet (e.g., vyges/partner-x, internal)
- **`trusted_fabricator`** (boolean): Whether this chiplet comes from a trusted fabricator
- **`version_control`** (enum): Version control system used
  - `"git"`: Git version control
  - `"svn"`: Subversion
  - `"perforce"`: Perforce
  - `"none"`: No version control
- **`release_status`** (enum): Release status in the supply chain
  - `"development"`: Under development
  - `"alpha"`: Alpha release
  - `"beta"`: Beta release
  - `"qualified"`: Qualified for production
  - `"production"`: Production release
  - `"deprecated"`: Deprecated
- **`fabrication_node`** (string): Fabrication process node
- **`package_type`** (enum): Package type for chiplet integration
  - `"2.5d_interposer"`: 2.5D interposer
  - `"3d_stacked"`: 3D stacked
  - `"organic_substrate"`: Organic substrate
  - `"fan_out"`: Fan-out packaging
- **`supply_chain_tracking`** (boolean): Whether supply chain is tracked and verified
- **`certification`** (array): List of certifications (e.g., ISO 9001, automotive)

## Chiplet Interface Types

### Interface Definition

Chiplet interfaces are defined in the `interfaces` array with `"type": "chiplet"`:

```json
{
  "type": "chiplet",
  "direction": "inout",
  "protocol": "UCIe",
  "width": 64,
  "signals": [
    {
      "name": "ucie_clk",
      "direction": "input",
      "type": "clock",
      "description": "UCIe clock signal"
    },
    {
      "name": "ucie_tx_data",
      "direction": "output",
      "type": "data",
      "width": 64,
      "description": "UCIe transmit data"
    }
  ]
}
```

### Supported Protocols

#### UCIe (Universal Chiplet Interconnect Express)
- **Clock**: `ucie_clk`
- **Reset**: `ucie_rst_n`
- **Data**: `ucie_tx_data`, `ucie_rx_data`
- **Control**: `ucie_tx_valid`, `ucie_rx_valid`, `ucie_tx_ready`, `ucie_rx_ready`

#### BoW (Bunch of Wires)
- **Clock**: `bow_clk`
- **Reset**: `bow_rst_n`
- **Data**: `bow_tx_data`, `bow_rx_data`
- **Control**: `bow_tx_valid`, `bow_rx_valid`

#### AIB (Advanced Interface Bus)
- **Clock**: `aib_clk`
- **Reset**: `aib_rst_n`
- **Data**: `aib_tx_data`, `aib_rx_data`
- **Control**: `aib_tx_valid`, `aib_rx_valid`

## Usage Examples

### Basic Chiplet-Ready IP

```json
{
  "name": "vyges/uart-controller",
  "chiplet": {
    "chiplet_ready": true,
    "integration_level": "rtl",
    "packaging_considerations": "Standard single-die packaging"
  }
}
```

### Advanced Chiplet with Full Constraints

```json
{
  "name": "vyges/high-performance-accelerator",
  "chiplet": {
    "chiplet_ready": true,
    "integration_level": "rtl",
    "die_to_die_interfaces": ["ucie", "bow"],
    "packaging_considerations": "Requires 2.5D interposer with 0.8mm bump pitch",
    "interposer_constraints": {
      "technology": "silicon",
      "routing_layers": 4,
      "minimum_pitch": 0.8,
      "die_spacing": 0.1
    },
    "bump_constraints": {
      "pitch": 0.8,
      "size": 0.4,
      "array": "full",
      "power_bumps": 16,
      "signal_bumps": 64
    },
    "thermal_constraints": {
      "max_power_per_die": 10.0,
      "junction_temperature": 125,
      "thermal_resistance": 15,
      "cooling_requirements": "Liquid cooling recommended"
    },
    "multi_die_testing": {
      "test_access": "boundary_scan",
      "test_coverage": {
        "interconnect": 98,
        "functionality": 95
      },
      "test_vectors": ["interconnect_test.v", "functional_test.v", "power_test.v"]
    }
  },
  "interfaces": [
    {
      "type": "chiplet",
      "direction": "inout",
      "protocol": "UCIe",
      "width": 128,
      "signals": [
        {
          "name": "ucie_clk",
          "direction": "input",
          "type": "clock",
          "description": "UCIe clock signal"
        },
        {
          "name": "ucie_tx_data",
          "direction": "output",
          "type": "data",
          "width": 128,
          "description": "UCIe transmit data"
        }
      ]
    }
  ]
}
```

## Integration with Vyges CLI

### Validation Commands

```bash
# Validate chiplet compatibility
vyges chiplet validate --ip uart-controller

# Check interposer constraints
vyges chiplet validate --constraints interposer --ip uart-controller

# Validate thermal constraints
vyges chiplet validate --constraints thermal --ip uart-controller
```

### Generation Commands

```bash
# Generate chiplet interface wrapper
vyges chiplet generate-interface --protocol ucie --ip uart-controller

# Generate multi-die testbench
vyges chiplet create-testbench --multi-die --ip1 cpu --ip2 uart-controller

# Generate packaging documentation
vyges chiplet generate-docs --packaging --ip uart-controller
```

## Best Practices

### 1. Start Simple
- Begin with `chiplet_ready: true` and basic packaging considerations
- Add detailed constraints as the design matures

### 2. Use Standard Protocols
- Prefer UCIe, BoW, or AIB over custom interfaces
- Document custom interfaces thoroughly

### 3. Consider Thermal Design
- Always specify thermal constraints for high-power IP
- Include cooling requirements in packaging considerations

### 4. Plan for Testing
- Define test access methods early
- Specify test coverage requirements

### 5. Document Constraints
- Provide clear, human-readable packaging considerations
- Include specific technology and pitch requirements

## Migration from Non-Chiplet IP

To convert existing IP to chiplet-ready:

1. **Add basic chiplet metadata**:
   ```json
   "chiplet": {
     "chiplet_ready": true,
     "integration_level": "rtl"
   }
   ```

2. **Add chiplet interfaces** to the interfaces array

3. **Specify packaging considerations** based on IP requirements

4. **Add thermal constraints** if power consumption is significant

5. **Define testing requirements** for multi-die validation

## Future Extensions

The chiplet metadata schema is designed for extensibility. Future versions may include:

- **3D integration** constraints
- **Advanced packaging** technologies (FOWLP, FOPLP)
- **Security** requirements for chiplet interfaces
- **Power management** across multiple dies
- **Yield** and **reliability** considerations
- **YAML Schema**: Alternative YAML representation for easier human editing

## References

- [UCIe Specification](https://www.uciexpress.org/)
- [OCP Bunch of Wires](https://www.opencompute.org/chiplets)
- [Intel AIB Specification](https://www.intel.com/content/www/us/en/io/advanced-interface-bus/overview.html)
- [IEEE 1149.1 Boundary Scan](https://standards.ieee.org/standard/1149_1-2013.html) 