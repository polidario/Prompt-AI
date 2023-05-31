import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist!"],
        required: [true, "Email is required!"]
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and must be unique!"]
    },
    image: {
        type: String,
    }
});

// We have to make sure that the User model is only
// created when there is no User in the model
const User = models.User || model("User", UserSchema);

export default User;