# How to Set Up A Google Maps API Key

> To use this program fully, you need to set up an API key on the google cloud console for development.

## Step 1: Set Up an API Key

First, follow the steps listed here to enable the map SDKs:
https://developers.google.com/maps/get-started#enable-api-sdk

You are going to want to enable:

- Maps SDK for iOS
- Maps SDK for Android

Once you are done, you should have an API key available.

## Step 2: Add API Key to Code

First, create a file in the main directory of the project, called ".env"

Then, open that file in a text editor and add the following, replacing "Replace_With_Your_Key" with the API key you generated in Step 1.

```.env
GOOGLE_API_KEY=Replace_With_Your_Key
```

## Step 3: Run Code as Normal

The react-native-config package should automatically populate the API key to it's needed location with no further configuration.

Under no circumstances should you ever share the API key or commit your .env file.

---

_If you encounter any issues or have questions, contact @jaxcksn on discord or github._
