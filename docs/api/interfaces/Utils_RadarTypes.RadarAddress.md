[raiderride](../README.md) / [Exports](../modules.md) / [Utils/RadarTypes](../modules/Utils_RadarTypes.md) / RadarAddress

# Interface: RadarAddress

[Utils/RadarTypes](../modules/Utils_RadarTypes.md).RadarAddress

An address returned by the radar API

**`interface`**

## Table of contents

### Properties

- [addressLabel](Utils_RadarTypes.RadarAddress.md#addresslabel)
- [borough](Utils_RadarTypes.RadarAddress.md#borough)
- [city](Utils_RadarTypes.RadarAddress.md#city)
- [country](Utils_RadarTypes.RadarAddress.md#country)
- [countryCode](Utils_RadarTypes.RadarAddress.md#countrycode)
- [countryFlag](Utils_RadarTypes.RadarAddress.md#countryflag)
- [county](Utils_RadarTypes.RadarAddress.md#county)
- [formattedAddress](Utils_RadarTypes.RadarAddress.md#formattedaddress)
- [geometry](Utils_RadarTypes.RadarAddress.md#geometry)
- [latitude](Utils_RadarTypes.RadarAddress.md#latitude)
- [layer](Utils_RadarTypes.RadarAddress.md#layer)
- [longitude](Utils_RadarTypes.RadarAddress.md#longitude)
- [neighborhood](Utils_RadarTypes.RadarAddress.md#neighborhood)
- [number](Utils_RadarTypes.RadarAddress.md#number)
- [placeLabel](Utils_RadarTypes.RadarAddress.md#placelabel)
- [postalCode](Utils_RadarTypes.RadarAddress.md#postalcode)
- [state](Utils_RadarTypes.RadarAddress.md#state)
- [stateCode](Utils_RadarTypes.RadarAddress.md#statecode)

## Properties

### addressLabel

• **addressLabel**: `string`

The textual representation of the street address.

#### Defined in

[Utils/RadarTypes.ts:50](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L50)

___

### borough

• `Optional` **borough**: `string`

The borough the address is in.

#### Defined in

[Utils/RadarTypes.ts:90](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L90)

___

### city

• `Optional` **city**: `string`

The city the address is in.

#### Defined in

[Utils/RadarTypes.ts:86](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L86)

___

### country

• **country**: `string`

The country of the address.

#### Defined in

[Utils/RadarTypes.ts:58](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L58)

___

### countryCode

• **countryCode**: `string`

The common country code.

**`see`** https://www.iban.com/country-codes

#### Defined in

[Utils/RadarTypes.ts:63](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L63)

___

### countryFlag

• **countryFlag**: `string`

The emoji representation of the country flag.

**`example`** 🇺🇸 for the United States

#### Defined in

[Utils/RadarTypes.ts:68](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L68)

___

### county

• `Optional` **county**: `string`

The countythe address is in.

#### Defined in

[Utils/RadarTypes.ts:94](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L94)

___

### formattedAddress

• **formattedAddress**: `string`

The proper formatted address.

#### Defined in

[Utils/RadarTypes.ts:54](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L54)

___

### geometry

• **geometry**: [`RadarGeometry`](Utils_RadarTypes.RadarGeometry.md)

A GeoJSON point of the location

**`see`** https://geojson.org/

#### Defined in

[Utils/RadarTypes.ts:42](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L42)

___

### latitude

• **latitude**: `number`

The latitude of the address

#### Defined in

[Utils/RadarTypes.ts:33](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L33)

___

### layer

• **layer**: `string`

The layer that the address is classified under.

**`see`** https://radar.com/documentation/api#autocomplete

#### Defined in

[Utils/RadarTypes.ts:112](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L112)

___

### longitude

• **longitude**: `number`

The longitude of the address

#### Defined in

[Utils/RadarTypes.ts:37](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L37)

___

### neighborhood

• `Optional` **neighborhood**: `string`

The neighborhood the address is in.

#### Defined in

[Utils/RadarTypes.ts:98](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L98)

___

### number

• `Optional` **number**: `string`

The house number of the address

#### Defined in

[Utils/RadarTypes.ts:102](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L102)

___

### placeLabel

• `Optional` **placeLabel**: `string`

The textual representation of the place.

#### Defined in

[Utils/RadarTypes.ts:46](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L46)

___

### postalCode

• `Optional` **postalCode**: `string`

The postal code the address is in.

**`see`** https://en.wikipedia.org/wiki/List_of_postal_codes

#### Defined in

[Utils/RadarTypes.ts:82](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L82)

___

### state

• `Optional` **state**: `string`

The state the address is in (if applicable).

#### Defined in

[Utils/RadarTypes.ts:72](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L72)

___

### stateCode

• `Optional` **stateCode**: `string`

The state code the address is in (if applicable).

**`see`** https://www.bls.gov/respondents/mwr/electronic-data-interchange/appendix-d-usps-state-abbreviations-and-fips-codes.htm

#### Defined in

[Utils/RadarTypes.ts:77](https://github.com/jaxcksn/raiderride-FUBU/blob/3080884/src/Utils/RadarTypes.ts#L77)
