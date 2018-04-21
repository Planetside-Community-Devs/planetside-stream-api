const Websocket = require("ws");
const events = require("events");
const debug = require("debug")("planetside-stream-api");


class PlanetSideStream extends events.EventEmitter {

    /**
     * Creates an instance of PlanetSideStream.
     * @param {constants.SERVERS} server 
     * @param {string} [service_id="example"] 
     * @memberof PlanetSideStream
     */
    constructor(server, service_id = "example") {
        super();
        this.server = server;
        this.service_id = service_id;
        this.address = `wss://push.planetside2.com/streaming?environment=${this.server}&service-id=s:${this.service_id}`;



        this.ws = new Websocket(this.address);

        this.ws.once("open", () => this.emit("open"));

        this.ws.on("message", data => this._onData(data));
        this._handleTypes();
    }

    /**
     * 
     *  Internal method for handling websocket responses
     * @param {string} data 
     * @returns 
     * @memberof PlanetSideStream
     */
    _onData(data) {
        let jsondata = null;
        try {
            jsondata = JSON.parse(data);
        }
        catch (e) {
            debug("Jsondata was not valid: " + data);
            return;
        }
        this.emit("data", jsondata);
    }

    /**
     * Subscribes to a given event, see http://census.daybreakgames.com/#what-is-websocket
     * 
     * @param {Array} worlds 
     * @param {Array} events 
     * @param {Array} [characters=[]] 
     * @param {boolean} [logicaland=false] 
     * @memberof PlanetSideStream
     */
    subscribe(worlds, events, characters = [], logicaland = false) {

        let payload = {
            service: "event",
            action: "subscribe",
            worlds: worlds,
            eventNames: events,
            characters: characters,
            logicalAndCharactersWithWorlds: logicaland
        };

        let stringpayload = JSON.stringify(payload);
        this.ws.send(stringpayload, err => {
            if (err) {
                debug("Failed Subscribing to Event : ", err);
            }

        });
    }

    /**
     * Unsubcribes from events, see http://census.daybreakgames.com/#what-is-websocket
     * 
     * @param {Array} [worlds=[]] 
     * @param {Array} events 
     * @param {Array} [characters=[]] 
     * @memberof PlanetSideStream
     */
    unsubscribe(worlds = [], events, characters = []) {
        let payload = {
            service: "event",
            action: "clearSubscribe",
            worlds: worlds,
            characters: characters,
            eventNames: events
        };
        let stringpayload = JSON.stringify(payload);
        this.ws.send(stringpayload, err => {
            if (err) {
                debug("Failed unsubscribing from Event : ", err);
            }

        });
    }
    /**
     * Unsubscribe from all events
     * 
     * @memberof PlanetSideStream
     */
    unsubscribeAll() {
        let payload = {
            service: "event",
            action: "clearSubscribe",
            all: "true"
        };
        let stringpayload = JSON.stringify(payload);
        this.ws.send(stringpayload, err => {
            if (err) {
                debug("Failed unsubscribing from Event : ", err);
            }

        });
    }

    /**
     * Internal method for creating events
     * 
     * @memberof PlanetSideStream
     */
    _handleTypes() {
        this.on("data", data => {
            if (data.type == "heartbeat") {
                this.emit("heartbeat", data);
            }
            else if (typeof data.payload != "undefined") {
                this.emit(data.payload.event_name, data);
            }
        });
    }
}

module.exports = PlanetSideStream;