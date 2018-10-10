# __MERN Boilerplate__

A template of the MERN stack + Build Tools + State Management + React Router

__SPICY TODO__
```sh
Re-organize package.json for devDependencies vs dependencies
Once you need to dish packages to client side on production builds
...you will get rekt if you dont fix it
```

```sh
Code Cleanup :/
```

## __Table of Contents__

- [Installation](#installation)
- [MERN Stack Overview](#mern-overview)

## __Installation__

1. Clone the repository
```sh
git clone https://github.com/GeorgeFinn/MERN-boilerplate.git
```
2. cd into cloned project directory
```sh
cd MERN-boilerplate
```

3. Create your `.env` file folder
```sh
touch .env
```
4. Open `.env` file and enter in MongoDB credentials (ignore SECRET_KEY for now)
```sh
MONGO_USER=myUsername
MONGO_PASS=myPassword
SECRET_KEY=secret
```
5. Install project dependencies
```sh
npm install
```

6. Run it!
```sh
npm run start
```
![](you-got-this.gif)

## __MERN Stack Overview__
### __MongoDB__
[MongoDB Documentation](https://docs.mongodb.com/?_ga=2.261222671.385300794.1538082235-26708666.1537317964)

[Mongoose Documentation](https://mongoosejs.com/docs/guides.html)



### __Express__
[Express Documentation](http://expressjs.com/en/4x/api.html)



### __React__
[React Documentation Link](https://reactjs.org/docs/hello-world.html)


### __Node__
- JavaScript Runtime
Common initial 'got me':

  ES6 Syntax:
  ```sh
  import myModule from './myModule';
  ```
  ES5 Syntax:
  ```sh
  var myModule = require('./myModule');
  ```
  `import` enables the developer to specify which specific modules he needs from a package, while `require` grabs the entire package.  This matters a ton more on the client-side to keep the application light-weight and efficient #nofluff

  [Helpful ES5 vs. ES6 Article](https://codeburst.io/es5-vs-es6-with-example-code-9901fa0136fc)


## __NPM__ - Package Manager
__--save-dev__
Saves the package as a dev-dependency which won't be automatically sent to the client.  Used to save the package for development purposes.


```sh
npm i --save-dev myPackage
```

__--save__
Saves the package as a dependency which is required for the application to run. (aka. packages needed on client side)

```sh
npm i --save myPackage
```
## __Important Packages__

---

## __Build Tools__
### nodemon

- Automatically monitors Node for code changes and restarts when it detects saved changes

### babel

- Enables the usage of ES6 and converts code into browser-compatible ES5

### eslint

- Linter utility for JavaScript and JSX

### webpack

- Bundles all the code into a distribution folder.
- Very useful build tool

### dotenv

- Zero-dependency module that enables you to store config keys in a special .env file that isn't committed

---

## __Clientside Packages__
### react-router-dom

- React Router helps with dom element control.
- Enables us to easily link up different parts of application.
- `Future` - Enables us to lazy load our application for more efficient usage of resources

### redux, react-redux, redux-thunk

- Redux is a state container
- Enables consistent development and flexibility for future changes
- State Management:
  - Fetch and Store Data
  - Assign Data to UI elements
  - Change Data
- Middleware provides a way to interact with actions that have been dispatched to the store before they reach the store's reducer.

### axios

- Promise based HTTP client for browser and Node.js - Makes is straight forward and easy to make REST API calls


---


## __Authentication Packages__
### bcryptjs

- Encrypts user password during account creation to greatly increase security

### jsonwebtoken

- generates web token for current user

### passport, passport-jwt

- Sends JSON web token along to access protected route using passport to validate token/extract user info

### validator

- Useful package that enables easy validation of forms and JSON objects

### jwt-decode (clientside only)

- Decodes JSON web token to get current user

---
