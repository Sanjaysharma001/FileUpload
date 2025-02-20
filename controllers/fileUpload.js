const File = require("../models/File");

const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log(file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log("Not able to upload the file on server");
    console.log(error);
  }
};

function isFileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder,qualtiy) {
    const options = { folder, resource_type: "auto" };
    if(qualtiy) {
        options.qualtiy = qualtiy;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }
  
// image upload handler

exports.imageUpload = async (req, res) => {
  try {
    console.log("Request received:", req.body, req.files);

    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { email, name, tags } = req.body;
    const file = req.files.imageFile;
    console.log("File received:", file.name);

    if (file.size > 5 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "File too large  Maximum size allowed is 5MB." });
    }

    const fileType = file.name.split(".")[1].toLowerCase();
    const supportedTypes = ["jpg", "jpeg", "png"];

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({ message: "File format not supported" });
    }

    console.log("Uploading to Cloudinary...");
    const response = await uploadFileToCloudinary(file, "Lucifer");
    console.log("Cloudinary Response:", response);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      message: "Image Successfully Uploaded",
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error("Error in imageUpload:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// vidoe upload handler

exports.videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    console.log(name, email, tags);

    if (!req.files || !req.files.videoFile) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const file = req.files.videoFile;
    console.log("File received:", file.name);

    if (file.size > 10 * 1024 * 1024) {
      return res
        .status(400)
        .json({ message: "File too large. Maximum size allowed is 10MB." });
    }

    const fileType = file.name.split(".").pop().toLowerCase();
    const supportedTypes = ["mp4", "mov"];

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({ message: "File format not supported" });
    }

    console.log("Uploading video to Cloudinary...");
    const response = await uploadFileToCloudinary(file, "Lucifer");
    console.log("Cloudinary Response:", response);

    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url, // Store as videoUrl
    });

    res.json({
      message: "Video Successfully Uploaded",
      videoUrl: response.secure_url,
    });
  } catch (error) {
    console.error("Error in videoUpload:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


// imageSizeReducer

exports.imageSizeReducer = async (req, res) => {
 
    try {
       
    
        if (!req.files || !req.files.imageFile) {
          return res.status(400).json({ message: "No image uploaded" });
        }
    
        const { email, name, tags } = req.body;
        const file = req.files.imageFile;
        console.log("File received:", file.name);
    
        
    
        const fileType = file.name.split(".")[1].toLowerCase();
        const supportedTypes = ["jpg", "jpeg", "png"];
    
        if (!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({ message: "File format not supported" });
        }
    
        console.log("Uploading to Cloudinary...");
        const response = await uploadFileToCloudinary(file, "Lucifer",30);
        console.log("Cloudinary Response:", response);
    
        const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl: response.secure_url,
        });
    
        res.json({
          message: "Image Successfully Uploaded",
          imageUrl: response.secure_url,
        });
      } catch (error) {
        console.error("Error in imageUpload:", error);
        res
          .status(500)
          .json({ message: "Something went wrong", error: error.message });
      }
    };
