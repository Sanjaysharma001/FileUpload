const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String,
    },
    
    Tags:{
        type:String,
    },
    email:{
        type:String,
    },
});

fileSchema.post("save", async function (doc) {
    try{
        // transpoter 
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // send mail

        let info = await transpoter.sendMail({
            from: `Lucifer- by Sharma`,
            to: doc.email,
            subject:"File Uploaded on Cloudinary ",
            html:`<h2>Hello</h2> <p>File Uploaded View here: <a href= "${doc.imageUrl}"> ${doc.imageUrl} </a> </p>`,
        });
        console.log("Info" , info);
    }
    catch(error){
     console.error(error);
     
    }
})

module.exports = mongoose.model("File",fileSchema);