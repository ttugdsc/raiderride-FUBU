[raiderride](../README.md) / [Exports](../modules.md) / App

# Module: App

## Table of contents

### Type aliases

- [AuthData](App.md#authdata)
- [AuthManager](App.md#authmanager)
- [GlobalContext](App.md#globalcontext)
- [UserData](App.md#userdata)

### Functions

- [App](App.md#app)

## Type aliases

### AuthData

Ƭ **AuthData**: `Object`

The data stored in authData value of the GlobalContext

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isLoading` | `boolean` |
| `isSignout` | `boolean` |
| `userToken` | `string` \| ``null`` |

#### Defined in

coding/raiderride-FUBU/src/App.tsx:81

___

### AuthManager

Ƭ **AuthManager**: `Object`

Used to manage the authentication state as part of the global state.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `signIn` | () => `void` |
| `signOut` | () => `void` |

#### Defined in

coding/raiderride-FUBU/src/App.tsx:119

___

### GlobalContext

Ƭ **GlobalContext**: `Object`

This strictly defines the type of data stored in our global state.

**`remarks`** This should be updated anytime we add a value to our global state.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `authData` | [`AuthData`](App.md#authdata) | The authentication reducer state. |
| `authManager` | [`AuthManager`](App.md#authmanager) | Used to change the state of the authentication instead of directly calling the reducer dispatch  See [`AuthManager`](App.md#authmanager) for more details |
| `setUserData` | `React.Dispatch`<`React.SetStateAction`<[`UserData`](App.md#userdata)\>\> | The hook to set the user data state. |
| `userData` | [`UserData`](App.md#userdata) | The data for the user. (This will likely come from the backend.) |

#### Defined in

coding/raiderride-FUBU/src/App.tsx:56

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

coding/raiderride-FUBU/src/App.tsx:47

## Functions

### App

▸ **App**(): `Element`

The root component for the entire app. Mainly used to store navigation, but
could be used to store authentication state.

**`component`** App

#### Returns

`Element`

#### Defined in

coding/raiderride-FUBU/src/App.tsx:197
