# LibraFire test task [![JavaScript Style Guide][standard-badge]][standard-url]


  - [Minimal requirements](#minimal-requirements)
  - [Get started](#get-started)
  - [Environment variables](#environment-variables)

## Minimal requirements

* [Node.js][node-url] >= 17.0.0
* [React][react-url] >= 17.0.0

If you are running Node.js version less than 17.0.0 you can use [Node version manager](https://github.com/nvm-sh/nvm)

## Get started

To get started, you will first need to **clone** the repository & install Node.js dependencies:
### Clone repository
Using https:
```
git clone https://github.com/1978milanbabic/librafire_test.git
```
Using SSH key:
```
git clone git@github.com:1978milanbabic/librafire_test.git
```
Using GitHub Cli:
```
gh repo clone 1978milanbabic/librafire_test
```
### Install NPM dependencies
```
cd librafire_test
npm install
```
### Start project
Once you have installed all dependencies you can start the application by using `start` command:
```
$ npm start
```
You can also use production files to serve from a local server.
```
$ npm run build
```
Files will be located in `build/` folder.

## Environment variables (parcel local server)

| Name                                  | Default value                       |
|---------------------------------------|-------------------------------------|
| PORT                                  | 1234                                |

Navigate your browser to - http://localhost:1234

[standard-badge]: https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=popout
[standard-url]: https://standardjs.com
[node-url]: https://nodejs.org/
[react-url]: https://reactjs.org/blog/2020/10/20/react-v17.html
