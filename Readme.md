# Planetside 2 Stream API Wrapper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/Planetside-Community-Devs/planetside-stream-api.svg?style=flat-square)](https://github.com/Planetside-Community-Devs/planetside-stream-api/issues)
[![npm](https://img.shields.io/npm/v/planetside-stream-api.svg?style=flat-square)](https://www.npmjs.com/package/planetside-stream-api)


An API wrapper to access events of the game Planetside2

## Getting Started

First of all you have to create the Api object:
```js
var PlanetsideWrapper = require("planetside-stream-api");
var constants = require("planetside-stream-api/lib/constants");

var api = new PlanetsideWrapper(constants.SERVERS.PC);

// Or if you have a service id: 
var api = new PlanetsideWrapper(constants.SERVERS.PC, "example");
```

Now you need to subscribe to some events:
```js
api.on("open", () => {
    console.log("Connected to Census!");
    api.subscribe(["13"], ["FacilityControl"]);
});
```

And then you can access all events as part of nodes `events` module:
```js
api.on("FacilityControl", data => {
    console.log(data);
});
```

If you want to unsubscribe again: 
```js
api.unsubscribe(["13"], ["FacilityControl"]);
// Or unsubscribe from everything
api.unsubscribeAll()
```

### Installing

Im just going to assume you use npm to install this library
```sh
npm install planetside-stream-api
```

## Running the tests

```sh
git clone https://github.com/Planetside-Community-Devs/planetside-stream-api.git
cd planetside-stream-api
npm install
npm test
```

For additional information of the library on runtime use
the [debug](https://github.com/visionmedia/debug) scope `planetside-stream-api`

### And coding style tests

We are using ESLint to check the library code for style issues.
To test run:

```sh
npm install
npm run lint
```

## Built With

* [WS](https://github.com/websockets/ws) - Used to connect to the websocket api - MIT Licensed
* [debug](https://github.com/visionmedia/debug) - Used to debug the library - MIT Licensed


## Authors

* **Soundofdarkness (Laura Schäfer)** - *Currently Everything* - [Soundofdarkness](https://github.com/Sounfdarkness)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* [Daybreak](https://www.daybreakgames.com/home) for creating the game and api
