## Tokopedia Play Clone

**Tokopedia Play Clone** is a web application that is built using NodeJS, ExpressJS, and MongoDB for the backend and ReactJS for the frontend. This application is a clone of [Tokopedia Play](https://www.tokopedia.com/play/channels) in simplify version.

### Features

- [x] User module
- [x] Video module
- [x] Comment module
- [x] Product module

### How to install & run the app

#### Prerequisites

1. Make sure you have installed **Node.js** and **NPM** in your computer, if not please install them first in
   this [link](https://nodejs.org/en/download/)
2. Make sure you have installed **Docker** and **Docker Compose** in your computer, if not please install them first in
   this [link](https://docs.docker.com/get-docker/)
3. Make sure you have installed VSCode in your computer, if not please install it first in
   this [link](https://code.visualstudio.com/download)
4. Make sure you have installed REST Client extension in your VSCode, if not please install it first in
   this [link](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

#### Steps
- Clone this repository

```bash
git clone git@github.com:SemmiDev/tokopedia-play-clone.git
```
- Go to the project directory

```bash
cd tokopedia-play-clone
```

- Install the dependencies

```bash
npm install
```

- Run the mongodb container

```bash
docker-compose up -d
```

- Run the app (RESTful Server)

```bash
npm run server
```

### For test the API

Make sure you have installed REST Client extension in your VSCode, and navigate to [playground.http](playground.http) file in your VSCode and click `Send Request` button in each request.

### Database Schema

![Schema Database](./class-diagram.png)

### Tech Stack

- **NodeJS** (JavaScript runtime built on Chrome's V8 JavaScript engine)
- **ExpressJS** (Fast, unopinionated, minimalist web framework for Node.js)
- **MongoDB** (Document database)
- **Bcrypt** (Password hashing function)
- **Dotenv** (Zero-dependency module that loads environment variables)
- **Mongoose** (MongoDB object modeling tool)
- **Morgan** (HTTP request logger middleware for node.js)
- **UUID** (Simple, fast generation of RFC4122 UUIDS)
- **Winston** (A logger for just about everything)