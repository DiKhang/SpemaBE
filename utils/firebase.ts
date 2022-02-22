/** @format */

var admin = require("firebase-admin");
import serviceAccount from "../key/firebaseadminkey.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "megatalk-a65f4.appspot.com/",
});

export default admin;
