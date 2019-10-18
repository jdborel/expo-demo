#### If you'd like to run the app, follow these steps.
npm install -g expo-cli
npm install moment --save  
expo install expo-permissions
expo install expo-barcode-scanner
npm install react-native-svg --save
npm install react-native-qrcode-svg --save
expo start

You'll need to create an account and get an API key from [The Movie Database Api](https://www.themoviedb.org/account/signup "Title") in order to see any results. 

Open AppSettings.js and paste your key in the apiKey variable.