This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

# E-Learning App

This is a project for an E-Learning platform, consisting of a RESTful API built with Spring Boot and a mobile application developed using React Native.

## Features

- User authentication
- Course management
- Lesson progress tracking
- Discussion forums
- Messaging system

## Technologies Used

- Spring Boot
- React Native
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Axios for API requests
- React Navigation(Tab navigation) for navigation in the mobile app

## API Setup

1. Clone API repository [1].
2. Navigate to the `e-learning-api` directory.
3. Choose GitHub Branch: `Main` or `GEN01_AuthenAuthorize`
4. Make sure you have JDK and Maven installed.
5. Run `ServiceApplication` of `Service Module` to start the Spring Boot server.

## Mobile Setup

1. Clone APP repository [2].
2. Navigate to the `e-learning-mobile` directory.
3. Make sure you have Node.js and npm (or yarn) installed.
4. Install the React Native CLI globally: `npm install -g react-native-cli`.
5. Choose GitHub Branch: `Main` or `hoanglam/BT05`
6. Install project dependencies: `npm install -f` or `yarn install -f`.
7. Run `npm start` and choose open with `Android` by pressing `a` in `terminal` to start the mobile app.

## Website Setup(For Admin)

1. Clone WEB repository [3]
2. Navigate to the `e-learning-website` directory.
3. Make sure you have Node.js and npm (or yarn) and ReactJs are installed.
4. Choose GitHub Branch: `dev` or `main`
5. Install project dependencies: `npm install -f` or `yarn install -f`.
6. Run `npm run dev` to start the website.

7. For login as `Admin` use this mail and password:
- Email: thomsonbel12@gmail.com
- Password: thomsonbel12

## Additional Notes

[1]: https://github.com/e-learning-team/e-learning-api         "e-learning-api"
[2]: https://github.com/e-learning-team/e-learning-mobile      "e-learning-mobile"
[3]: https://github.com/e-learning-team/e-learning-website     "e-learning-website"

## Contributors

- [Nguyễn Sỹ Hoàng Lâm](https://github.com/thomsonbel12)
- [Võ Hoàn Hảo](https://github.com/CunoVox)



>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
