#Install
```npm
npm install
npm install -g cordova ionic 
```
```
ionic state reset
ionic state restore

cordova telemetry on
```

##Server
```
ionic serve 
ionic serve --lab
ionic serve -lc -s -p 80
```

##Run app in device
```
ionic run android --device
```


##Plugins 
```npm
ionic plugin add cordova-plugin-camera
ionic plugin add cordova-plugin-http
ionic plugin add cordova-plugin-app-preferences
ionic plugin add cordova-plugin-uniquedeviceid
ionic plugin add cordova-base64-to-gallery
ionic plugin add cordova-plugin-datepicker
ionic plugin add cordova-plugin-firebase
ionic plugin add de.appplant.cordova.plugin.local-notification
ionic plugin add cordova-plugin-geolocation
```
```npm
npm install --save @ionic-native/geolocation
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


