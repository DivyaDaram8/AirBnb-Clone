const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
    console.log("connected to db");
})
    .catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({})
    initData.data = initData.data.map((obj) => ({...obj, owner:"674c5ffa365fe3d34203249d"}));// we added this object id as owner to each and every listing using map function
    await Listing.insertMany(initData.data);//.data is because we have named data in the data.js 
    console.log("data was initialized");
};

initDB();