# RaiderRide Installation Guide

You can follow this guide to get you ready for developing in no time!

## Requirements

### Node and Yarn

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

  Then you'll want to run the following commands:

  ```sh
  $ npm install --global yarn
  ```

- #### Node installation on MacOS

  First, install [Homebrew](https://brew.sh/) if you haven't already and then run the following commands:

      $ brew update
      $ brew install yarn

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install yarn

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.14.2

    $ yarn --version
    1.22.18

## Getting Started

First, clone the directory and install the dependencies:

```
$ yarn install
```

Next, you are going to want to set up your react native enviornment by following [this guide](https://reactnative.dev/docs/environment-setup#installing-dependencies). (Note: make sure you select **React Native CLI Quickstart** instead of Expo CLI Quickstart).

Finally, once you are ready, build the app for your respective platform:

```
$ yarn run android
```

or

```
$ yarn run ios
```
