"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @format */
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://admin:admin@spema.mbbcpnr.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(uri, {
    serverApi: mongodb_1.ServerApiVersion.v1,
});
client.connect((err) => {
    // perform actions on the collection object
    if (!err) {
        console.log("Connect Mongo Done !");
    }
    else {
        console.log(err);
        client.close();
    }
});
exports.default = client.db("Spema");
