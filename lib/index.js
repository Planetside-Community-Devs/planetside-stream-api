const Websocket = require("ws");
const events = require("events");
const debug = require("debug")("planetside-stream-api");


class PlanetSideStream extends events.EventEmitter{

    /**
     * Creates an instance of PlanetSideStream.
     * @param {constants.SERVERS} server 
     * @param {string} [service_id="example"] 
     * @memberof PlanetSideStream
     */
    constructor(server, service_id = "example"){
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
    _onData(data){
        let jsondata = null;
        try {
            jsondata = JSON.parse(data);
        }
        catch(e){
            debug("Jsondata was not valid: " + data);
            return;
        }
        this.emit("data", jsondata);
    }

    subscribe(worlds, events){
        let payload = {
            service: "event",
            action: "subscribe",
            worlds: worlds,
            eventNames: events
        };

        let stringpayload = JSON.stringify(payload);
        this.ws.send(stringpayload, err => {
            if(err){
                debug("Failed Subscribing to Event : ", err);
            }
            
        });
    }
    
    _handleTypes(){
        this.on("data", data => {
            if(data.type == "heartbeat"){
                this.emit("heartbeat", data);
            }
        });
    }
}

module.exports = PlanetSideStream;