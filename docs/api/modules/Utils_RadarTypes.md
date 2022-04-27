[raiderride](../README.md) / [Exports](../modules.md) / Utils/RadarTypes

# Module: Utils/RadarTypes

## Table of contents

### Type aliases

- [Meta](Utils_RadarTypes.md#meta)
- [RadarAddress](Utils_RadarTypes.md#radaraddress)
- [RadarAutocomplete](Utils_RadarTypes.md#radarautocomplete)
- [RadarGeometry](Utils_RadarTypes.md#radargeometry)

## Type aliases

### Meta

Ƭ **Meta**: `Object`

The response code from Radar, which should normally be 200

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `code` | `number` | The HTTP status code returned by the radar API |

#### Defined in

[Utils/RadarTypes.ts:14](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/Utils/RadarTypes.ts#L14)

___

### RadarAddress

Ƭ **RadarAddress**: `Object`

An address returned by the radar API

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressLabel` | `string` | The textual representation of the street address. |
| `borough?` | `string` | The borough the address is in. |
| `city?` | `string` | The city the address is in. |
| `country` | `string` | The country of the address. |
| `countryCode` | `string` | The common country code.  **`see`** https://www.iban.com/country-codes |
| `countryFlag` | `string` | The emoji representation of the country flag.  **`example`** 🇺🇸 for the United States |
| `county?` | `string` | The countythe address is in. |
| `formattedAddress` | `string` | The proper formatted address. |
| `geometry` | [`RadarGeometry`](Utils_RadarTypes.md#radargeometry) | A GeoJSON point of the location  **`see`** https://geojson.org/ |
| `latitude` | `number` | The latitude of the address |
| `layer` | `string` | The layer that the address is classified under.  **`see`** https://radar.com/documentation/api#autocomplete |
| `longitude` | `number` | The longitude of the address |
| `neighborhood?` | `string` | The neighborhood the address is in. |
| `number?` | `string` | The house number of the address |
| `placeLabel?` | `string` | The textual representation of the place. |
| `postalCode?` | `string` | The postal code the address is in.  **`see`** https://en.wikipedia.org/wiki/List_of_postal_codes |
| `state?` | `string` | The state the address is in (if applicable). |
| `stateCode?` | `string` | The state code the address is in (if applicable).  **`see`** https://www.bls.gov/respondents/mwr/electronic-data-interchange/appendix-d-usps-state-abbreviations-and-fips-codes.htm |

#### Defined in

[Utils/RadarTypes.ts:25](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/Utils/RadarTypes.ts#L25)

___

### RadarAutocomplete

Ƭ **RadarAutocomplete**: `Object`

Represents a autocomplete result from the Radar API

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addresses` | [`RadarAddress`](Utils_RadarTypes.md#radaraddress)[] |
| `meta` | [`Meta`](Utils_RadarTypes.md#meta) |

#### Defined in

[Utils/RadarTypes.ts:5](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/Utils/RadarTypes.ts#L5)

___

### RadarGeometry

Ƭ **RadarGeometry**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `coordinates` | `number`[] |
| `type` | `string` |

#### Defined in

[Utils/RadarTypes.ts:111](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/Utils/RadarTypes.ts#L111)
