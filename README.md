#Re Life - NonoDev96

[![npm version](https://badge.fury.io/js/ionic.svg)](https://badge.fury.io/js/ionic) [![Build Status](https://travis-ci.org/apache/cordova-cli.svg?branch=master)](https://travis-ci.org/apache/cordova-cli)

##Install package
```npm
npm install
npm install -g cordova ionic 
```

##Install platforms and plugins
```npm
ionic state reset
ionic state restore

cordova telemetry on
```

##Run server
```npm
ionic serve 
ionic serve --lab
ionic serve -lc -s -p 80
```

##Run app in android device
```npm
ionic run android --device
ionic run android --emulator
```

##Plugins 
```npm
ionic plugin add cordova-plugin-camera
...

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
[SDK Platform-Tools for Linux](https://dl.google.com/android/repository/platform-tools-latest-linux.zip)
```
export HOME="/home/$(whoami)"
export ANDROID_HOME="$HOME/Android/Sdk"
```

**OS X** 
[SDK Platform-Tools for Mac](https://dl.google.com/android/repository/platform-tools-latest-darwin.zip)
```
sudo nano /etc/paths

/Users/andmud/Library/Android/sdk/platform-tools
/Users/andmud/Library/Android/sdk/tools
```

**WINDOWS** 
[SDK Platform-Tools for Windows](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
```
%USERPROFILE%\AppData\Local\Android\sdk\platform-tools
```