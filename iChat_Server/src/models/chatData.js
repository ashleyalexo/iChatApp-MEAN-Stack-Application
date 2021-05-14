const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    msgfrom       : String,
    msgto         : String,
    message       : String,
    image         : String,
    isReadstatus  :{ type: Boolean, default:false},
    isFwdstatus   :{ type: Boolean, default:false},
    sendDate      :{ type: Date, default: Date.now}
});

ChatData = mongoose.model("ichat_message",ChatSchema);

module.exports = ChatData;