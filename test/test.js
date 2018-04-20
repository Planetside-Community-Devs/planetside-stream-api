const assert = require("assert");
const api = require("../index");
const constants = require("../lib/constants");

describe("Planetside Stream Wrapper", function () {
    it("Should be able to create Stream object without key", function(){
        let apiobject = new api(constants.SERVERS.PC);
    });
    it("Should be able to create an object with a key", function(){
        let apiobject = new api(constants.SERVERS.PC, "example");
    });
})