# Approaching
UCLA CS130 Project

## Usage

### Download and Set up
```
// clone the repository
git clone https://github.com/VincentD97/Approaching.git
cd Approaching

// install dependencies
npm run setup

// run backend NodeJS+ExpressJS server at localhost:3000 and React frontend server at localhost:3001
npm run dev
```
### Other scripts
```
npm run server      // run only the server

npm run client      // run only the client

npm test            // run backend test
// or
npm run test        // run backend test

npm run test-react  // run frontend test

npm run doc         // generate documentation
```


## File Structure

Server source code is in ./src. Client source code is in ./client/src.
```
Approaching
├── client
│   ├── public
│   │   ├── index.html          # html web page
│   │   └── ...
│   ├── src                     # source code for client
│   │   ├── actions             # Redux actions
│   │   ├── components          # React components
│   │   ├── css                 # styling css files
│   │   ├── reducers            # Redux reducers
│   │   ├── App.js              # entry point of components
│   │   ├── index.js            # entry point of javascript files
│   │   ├── Request.js          # contains all functions for sending requests to the server
│   │   └── ...
│   └── ...
├── doc                         # documentation generated by JSDoc
├── src                         # source code for server
│   ├── database                # database related implementations
│   ├── queries                 # queries related implementations
│   ├── routers                 # routers related implementations
│   ├── app.js                  # main code for building up the server
│   ├── config.js               # configurations
│   └── ...
├── test
│   ├── database                # database related tests
│   │   ├── index.js            # entry point of database related tests
│   │   └── ...                 # detailed test cases
│   ├── queries                 # queries related tests
│   │   ├── index.js            # entry point of queries related tests
│   │   └── ...                 # detailed test cases
│   ├── routers                 # routers related tests
│   │   ├── index.js            # entry point of routers related tests
│   │   └── ...                 # detailed test cases
│   └── index.                  # entry point of the whole test
├── package.json                # npm project management configuration, including commandline scripts
└── README.md
```

## API

Goto these API endpoints in a browser and you should see expected response in plaintext.
At the same time, our mlab mongodb database should change accordingly.

`facebookId` and `accessToken` are required for all requests. Parameters that are not listed in "Required" column are optional.

### User

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/users/insert?facebookId={}&accessToken={}&name={}&email={}&notifyTime={}` |    `name, email`   |
| Update | `http://localhost:3000/users/update?facebookId={}&accessToken={}&email={}&notifyTime={}`         |          |
| Remove | `http://localhost:3000/users/remove?facebookId={}&accessToken={}`                  |          |

### Item

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/items/insert?facebookId={}&accessToken={}&name={}&picture={}&expireDate={}&location={}&quantity={}&description={}` |    All   |
| Update | `http://localhost:3000/items/update?facebookId={}&accessToken={}&_id={}&name={}&picture={}&expireDate={}&location={}&quantity={}&description={}` |   `_id`  |
| Remove | `http://localhost:3000/items/remove?facebookId={}&accessToken={}&_id={}`           |   `_id`  |

### Event

| Action |                                        Url                                         | Required |
|:------:|------------------------------------------------------------------------------------|:--------:|
| Insert | `http://localhost:3000/events/insert?facebookId={}&accessToken={}&name={}&picture={}&time={}&location={}&description={}` |    All   |
| Update | `http://localhost:3000/events/update?facebookId={}&accessToken={}&_id={}&name={}&picture={}&time={}&location={}&description={}` |   `_id`  |
| Remove | `http://localhost:3000/events/remove?facebookId={}&accessToken={}&_id={}`                  |   `_id`  |

### Get All Items and Events

|  Action   |                                        Url                                         | Required |
|:---------:|------------------------------------------------------------------------------------|:--------:|
| fetchData | `http://localhost:3000/fetchData?facebookId={}&accessToken={}`                     |          |
| fetchItems | `http://localhost:3000/fetchItems?facebookId={}&accessToken={}`                     |          |
| fetchEvents | `http://localhost:3000/fetchEvents?facebookId={}&accessToken={}`                     |          |