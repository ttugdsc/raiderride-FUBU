[raiderride](../README.md) / [Exports](../modules.md) / App

# Module: App

## Table of contents

### Type aliases

- [GlobalContext](App.md#globalcontext)
- [UserData](App.md#userdata)

### Functions

- [App](App.md#app)

## Type aliases

### GlobalContext

Ƭ **GlobalContext**: `Object`

This strictly defines the type of data stored in our global state.

**`remarks`** This should be updated anytime we add a value to our global state.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `setUserData` | `React.Dispatch`<`React.SetStateAction`<[`UserData`](App.md#userdata)\>\> | The hook to set the user data state. |
| `userData` | [`UserData`](App.md#userdata) | The data for the user. (This will likely come from the backend.) |

#### Defined in

[App.tsx:41](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/App.tsx#L41)

___

### UserData

Ƭ **UserData**: `Object`

Represents user data. We should update this once the backend returns user
data to us.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Defined in

[App.tsx:32](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/App.tsx#L32)

## Functions

### App

▸ **App**(): `Element`

The root component for the entire app. Mainly used to store navigation, but
could be used to store authentication state.

**`component`**
@

#### Returns

`Element`

#### Defined in

[App.tsx:74](https://github.com/jaxcksn/raiderride-FUBU/blob/e0d2a84/src/App.tsx#L74)
