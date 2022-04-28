# How to set up a Radar API Key for Development

## Step 1: Create a .env file.

### The Easy Way:

We've included a script that automatically sets up an env file, it should automatically create the file after `yarn install` is run.

If it doesn't run for whatever reason, you can run:

`yarn run setup`

and it should run the check script.

### The Other Way:

If for some reason, your project directory doesn't have an .env file in it, all you have to do is create one, and paste in the following:

```Shell
MODE=DEV
RADAR_API_KEY=REPLACE_ME
```

## Step 2: Get a Radar API key.

You can get an API key by signing up for the Radar API at [https://radar.com/signup](https://radar.com/signup). I personally recommend using your Github account for ease of use.

After you sign up, on your [dashboard](https://radar.com/dashboard) the first visable item should say "Get Your API Keys", you are going to want to copy the one that says "Live Publishable (Client).

## Step 3: Set your .env file to use this key.

In your .env file in the root directory of the project, you are going to want to edit it.

Find the line that says:

```Shell
RADAR_API_KEY=REPLACE_ME
```

Then, replace everything to the right of the equal sign with the key you copied from Radar.

## Step 4: Restart Metro and Run the App

Finally, the last step is stop the development server that's currently running and restart it. You likely won't have to rebuild the entire app, just restart the bundler Metro.

If restarting Metro doesn't populate the API key, then a full rebuild is recommended.
<br /><br />

---

_Contact @jaxcksn on Github or Discord if you have any questions, concerns, or run into any problems._

## Happy Coding 🎉🙌
