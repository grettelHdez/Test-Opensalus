const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const imageUpload = require('express-fileupload');

app.use(cors());

app.use(imageUpload({
  createParentPath: true
  
}));


app.get("/api/media", (req, res) => {
  res.json({message: "Upload Image"});
});

app.get("/api/media/upload/:name", (req, res) => {
  const imgName = req.params.name;
  const imgUrl = `./upload/${imgName}`;
  
  fs.readFile(imgUrl, (err, image) => {
    if(err) {
      throw err
    }
    console.log(image)    
    
    res.setHeader('Content-Type', `image/${path.extname(imgName).substring(1,image.length)}`);
    res.setHeader('Content-Length', image.length); // Image size here
    res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
    res.send(image);
  })
});

app.post("/api/media", (req, res) => {
  try {
    if(!req.files) {
      console.log("Status 400")
      res.status(400).json({message: "Could not upload image"})
    }
    else {
      let file = req.files.file;
      file.mv(`./upload/${ file.name}`)
      console.log("Cree upload")
      
      const data = {
        name: file.name,
        size: file.size,
        type: file.mimetype,
        url: `http://localhost:${PORT}/api/media/upload/${file.name}`
      }
      res.status(200).json({message: "OK", data})
      console.log(data)
    }
  } catch (error) {
    console.log("Error 500")
    res.status(500).json({error})
  }
});

const PORT = 3000;

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})