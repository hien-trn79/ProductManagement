import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/ManagementProducts')
        console.log("Connected Succesfully !")
    } catch (err) {
        console.log(err)
        console.log('Connect failed.')
    }
}

export default {connect};