const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username  : String,
    email     : String,
    password  : String,
    imageUrl  : String,
    contacts  : [{ uname    : String, 
                   isMuted  :{ type: Boolean, default: false}, 
                   isBlocked:{ type: Boolean, default: false}
                 }],
    contactList     : [String],
    blockedList     : [String],
    mutedList       : [String],
    signupDate: { type: Date, default: Date.now }   
});

UserData = mongoose.model("ichat_user", UserSchema);

module.exports = UserData;
