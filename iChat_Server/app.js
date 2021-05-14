const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})
const PORT = 3000 || process.env.PORT;

const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
// const User = require("./src/models/userData");
const ChatMessage = require("./src/models/chatData");

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

const db_url="mongodb://localhost:27017/iChatApp_DB";

//Database connection
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (error)=>{
  if(!error)
  {
      console.log('Success - Database Connected.');
  }
  else{
      console.log('Error - Unable to connect Database.')
  }
});

const userRouter = require("./src/routes/userRoutes");
app.use('/user',userRouter);

const chatRouter = require("./src/routes/chatRoutes");
app.use('/chat',chatRouter);

//Socket connection
activeusers = [];
rooms = [];

io.on("connection", (socket) => {
  console.log('A User Connected!')
  console.log(socket.handshake);
  activeusers.push(socket.handshake.query.username);
  console.log(socket.handshake.query.username + " user connected");

  io.emit("activeUserUpdate", { active: activeusers });

  socket.on("disconnect", () => {
    index = activeusers.indexOf(socket.handshake.query.username);
    if (index > -1) {
      activeusers.splice(index, 1);
    }
    console.log(socket.handshake.query.username + " disconnected");
  });

  socket.on("mymessage", (msg) => {
    console.log(msg);
    messagedata = ChatMessage(msg);
    messagedata.save((err, data) => {
      if (err) {
        console.log(err);
      }
      if (data) {
        io.emit(data.msgfrom, data);
        io.emit(data.msgto, data);
      }
    });
  });

  socket.on("statuschange", (status) => {
    console.log(status);
    ChatMessage.update(
      { _id: { $in: status.message } },
      { $set: { isReadstatus: true } },
      { multi: true },
      (err, data) => {
        if (data) {
          console.log(data);
        }
        if (err) {
          console.log(err);
        }
      }
    );
    io.emit(status.from + "sc", {
      message: status.message,
      contact: status.to,
    });
  });


});


//sending image through chat

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/image_uploads");
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = "";
      if (file.mimetype === "image/gif") {
        filetype = "gif";
      }
      if (file.mimetype === "image/png") {
        filetype = "png";
      }
      if (file.mimetype === "image/jpeg") {
        filetype = "jpg";
      }
      cb(null, Date.now() +'_'+ file.originalname);
    },
  });
  
var upload = multer({ storage: storage });

app.post('/sendfile', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log('file..',file.filename);

    // if (!req.file) {
    //     return res.status(500).send({ message: "Upload fail" });
    //   }

    if (!file) {
      const error = new Error('No File');
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
});

//uploading profile image
var storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profile_images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, Date.now() +'_'+ file.originalname);
  },
});

var upload1 = multer({ storage: storage1 });

app.post('/file', upload1.single('file'), (req, res, next) => {
  const file = req.file;
  console.log('file..',file.filename);

  // if (!req.file) {
  //     return res.status(500).send({ message: "Upload fail" });
  //   }

  if (!file) {
    const error = new Error('No File');
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
});

server.listen(PORT,() => console.log(`Server running on port ${PORT}`));
