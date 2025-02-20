const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileupload = require("express-fileupload");

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 10 * 1024 * 1024 },
}));


require("./config/database").dbConnect();



const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload',Upload);

app.listen(PORT,() => {
   console.log(`App is listning on this ${PORT}`)
});

app.patch("/ping", (req, res) => {
    res.send({
      message: "pong",
    });
  })