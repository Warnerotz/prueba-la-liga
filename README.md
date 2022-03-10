## Set up

### Requirements

In order to run the application:

- You should need to have installed NodeJS v12+.
- If you are not using Linux check the "Environment Variables" section in this document.

### Installation

To set up the application in your local machine follow this steps:

- Clone this repository
- You must be currently viewing `develop` branch code. Then open a terminal inside project's root directory and run `npm install`.
- When installation process ends successfully, you should be able to run the npm scripts.

## Project description

### Architecture

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using typescript template. It also implements a [Redux](https://redux.js.org/) store.

UI components are built on top of [Material UI](https://v4.mui.com/). Specific styles are implemented using [Styled Components](https://styled-components.com/), which are written in SASS language.

### Unit/Integration Testing tools

Create React App provides with some useful testing tools.

- [Jest](https://jestjs.io): A javascript testing framework, also the test runner.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/): Used for testing React components.

This project also includes some helper libraries which were not included in Create React App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launch all the application test once. The results will be displayed in the console.

### `npm run test:coverage`

Launch all the application test once with the coverage. The results will be displayed in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Git hooks

This project also implements some [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). This could be configured easily trough [husky](https://typicode.github.io/husky/#/)

- **pre-push**: Before pushing code to any remote branch, it runs the test suite in coverage report mode (using `test:coverage` npm script). If any test does not pass, the push process will stop.

## Useful web browser extensions

- Redux DevTools: for debugging application's state changes.
- React Develop Tools: adds React debugging tools to the Chrome Developer Tools.
- Testing Playground: DOM testing playground that encourage good testing practices.
