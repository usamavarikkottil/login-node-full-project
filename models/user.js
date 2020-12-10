const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    email: String
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});


module.exports = mongoose.model("User", userSchema);