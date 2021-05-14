const express = require("express");
const ChatMessage = require("../models/chatData");

const chatRouter = express.Router();

chatRouter.get('/',(req,res)=>{

});

chatRouter.post("/chat_messages",(req,res)=>{
    username=req.body.username
    ChatMessage.find({
        $or: [
          { msgfrom : username },
          { msgto   : username }
        ]
      },null, {sort: {sendDate: 1}},(err,chats)=>{
          if(err){
              console.log(err)
          }
          if(chats)
          {res.status(200).send(chats)}
      })
})


module.exports = chatRouter;