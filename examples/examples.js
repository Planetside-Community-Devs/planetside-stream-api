const api = require("../index");
const constants = require("../lib/constants");
//Create a new api wrapper object
let wrapper = new api(constants.SERVERS.PC, "laurelianae");

// Wait for the websocket connection to be ready, and then subscribe to FacilityControl as event in world 13 (Cobalt)
wrapper.on("open", () => {
    console.log("open");
    wrapper.subscribe(["13"], ["FacilityControl"]);
});

// Just generally gather all data send over the websocket 
wrapper.on("data", data => {
    console.log(data);
})

// In case we get a server status heartbeat (should happen every few seconds)
wrapper.on("heartbeat", data => {
    console.log("heartbeat");
});

// Handling the Facility Control Event
wrapper.on("FacilityControl", (data) => {
    console.log("Facility: ", JSON.stringify(data));
});