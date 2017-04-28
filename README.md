#Re Life - NonoDev96

[![npm version](https://badge.fury.io/js/ionic.svg)](https://badge.fury.io/js/ionic) [![Build Status](https://travis-ci.org/apache/cordova-cli.svg?branch=master)](https://travis-ci.org/apache/cordova-cli)

##Clone repo and run
```npm
npm install
npm install -g cordova ionic 
```

##Install platforms and plugins
```
ionic state reset
ionic state restore

cordova telemetry on
```

##Run server
```
ionic serve 
ionic serve --lab
ionic serve -lc -s -p 80
```

##Run app in android device
```
ionic run android --device
```

##Plugins 
```npm
ionic plugin add cordova-plugin-camera
...
```
```npm
npm install --save @ionic-native/geolocation
...
```

##Create page 
```
ionic g page myPage

pages
 | - my-page
   |
   | - √ Create app/pages/my-page/my-page.html
   | - √ Create app/pages/my-page/my-page.ts
   | - √ Create app/pages/my-page/my-page.scss
```

##Create a service
```
ionic g provider authService

providers
 | 
 | - √ Create app/providers/my-data/auth-service.ts
```

##PATH
**LINUX** 
```
export HOME="/home/$(whoami)"
export ANDROID_HOME="$HOME/Android/Sdk"
```

**OS X**
```
$ echo "export PATH=\$PATH:/Users/${USER}/Library/Android/sdk/platform-tools/" >> ~/.bash_profile
```
```
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_60.jdk/Contents/Home
export ANDROID_HOME=/Applications/android/sdk
export PATH=/Applications/android/sdk/platform-tools
export PATH=/Applications/android/sdk/platforms
export PATH=/Applications/android/sdk/build-tools
```

**WINDOWS** 
```
%USERPROFILE%\AppData\Local\Android\sdk\platform-tools
```


#Ionic help 

```
 start  ..........  Starts a new Ionic project in the specified PATH
   serve  ..........  Start a local development server for app dev/testing
   setup  ..........  Configure the project with a build tool (beta)
   generate  .......  Generate pages and components
   platform  .......  Add platform target for building an Ionic app
   run  ............  Run an Ionic project on a connected device
   emulate  ........  Emulate an Ionic project on a simulator or emulator
   build  ..........  Build (prepare + compile) an Ionic project for a given platform.

   plugin  .........  Add a Cordova plugin
   resources  ......  Automatically create icon and splash screen resources (beta)
                      Put your images in the ./resources directory, named splash or icon.
                      Accepted file types are .png, .ai, and .psd.
                      Icons should be 192x192 px without rounded corners.
                      Splashscreens should be 2208x2208 px, with the image centered in the middle.

   upload  .........  Upload an app to your Ionic account
   share  ..........  Share an app with a client, co-worker, friend, or customer
   lib  ............  Gets Ionic library version or updates the Ionic library
   login  ..........  Login to your Ionic account
   io  .............  Integrate your app with Ionic Cloud services
   security  .......  Store your app's credentials for the Ionic Cloud
   push  ...........  Upload APNS and GCM credentials to Ionic Push
   package  ........  Use Ionic Package to build your app
   config  .........  Set configuration variables for your ionic app
   service  ........  Add an Ionic service package and install any required plugins
   add  ............  Add an Ion, bower component, or addon to the project
   remove  .........  Remove an Ion, bower component, or addon from the project
   list  ...........  List Ions, bower components, or addons in the project
   info  ...........  List information about the users runtime environment
   help  ...........  Provides help for a certain command
   link  ...........  Sets your Ionic App ID for your project
   hooks  ..........  Manage your Ionic Cordova hooks
   state  ..........  Saves or restores state of your Ionic Application using the package.json file
   docs  ...........  Opens up the documentation for Ionic

```