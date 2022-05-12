[raiderride](../README.md) / [Exports](../modules.md) / [App](../modules/App.md) / TokenResponse

# Interface: TokenResponse

[App](../modules/App.md).TokenResponse

A response from calling the /token endpoint from
the Microsoft OAuth2 api.

**`interface`**

## Table of contents

### Properties

- [access\_token](App.TokenResponse.md#access_token)
- [expires\_in](App.TokenResponse.md#expires_in)
- [refresh\_token](App.TokenResponse.md#refresh_token)
- [scope](App.TokenResponse.md#scope)
- [token\_type](App.TokenResponse.md#token_type)

## Properties

### access\_token

• **access\_token**: `string`

The access token for calling the API.

#### Defined in

coding/raiderride-FUBU/src/App.tsx:91

___

### expires\_in

• **expires\_in**: `number`

How long (in seconds) until the Token expires.

#### Defined in

coding/raiderride-FUBU/src/App.tsx:99

___

### refresh\_token

• **refresh\_token**: `string`

The refresh token that can used to log in the user.

#### Defined in

coding/raiderride-FUBU/src/App.tsx:107

___

### scope

• **scope**: `string`

The scopes the token is valid for.

#### Defined in

coding/raiderride-FUBU/src/App.tsx:103

___

### token\_type

• **token\_type**: `string`

The token type, should be 'Bearer'

#### Defined in

coding/raiderride-FUBU/src/App.tsx:95
