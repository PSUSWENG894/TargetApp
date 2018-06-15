# DevOps Dashboard

Final Project for SWENG 894 Capstone project. This app is designed to be a Travis-CI dashboard, to consume Repository(ies) data from Travis-CI in an easy to read and understand format as well as providing additional functionality.

## Setup

Make sure you have [node(LTS)/npm](https://nodejs.org/en/) locally. Clone this repository, in the terminal navigate to the frontend directory: ```%REPOSITORY_PATH%\TargetApp\frontend``` run the command: ```npm install``` then create a file named **local.env.js** in the config directory: ```%REPOSITORY_PATH\TargetApp\frontend\config```. This config file will most likely be temporary, as the project grows this is a temporary solution.

### local.env.js

```javascript
export const NODE_ENV = 'local';
export const DEBUG_MODE = true;
export const API_KEY = '%TRAVIS_API_KEY%'; //CHANGE ME
export const API_URL = 'https://api.travis-ci.org/repo';
```

## Information

This project uses [vue-cli](https://cli.vuejs.org/) a project in Beta, the APIs may change over the course of this project, but are unlikely to nor do we have to be up-to-date.
