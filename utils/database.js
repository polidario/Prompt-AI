import mongoose from 'mongoose';

let isConnected = false;

export const dbConnection = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected) {
        console.log("We are connected");
        return;
    } else {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName: "reminisce_db",
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            isConnected = true;

            console.log("We are just connected to the DB");
        } catch(err) {
            console.log(err);
        }
    }
}