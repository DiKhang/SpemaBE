/** @format */
import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://admin:admin@spema.mbbcpnr.mongodb.net/?retryWrites=true&w=majority";

const client: MongoClient = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
});

client.connect((err: any) => {
  // perform actions on the collection object
  if (!err) {
    console.log("Connect Mongo Done !");
  } else {
    console.log(err);
    client.close();
  }
});

export default client.db("Spema");
