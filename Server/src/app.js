const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const v4 = require('uuid').v4;
// const crypto = require('crypto');

const user = require('./routes/user');
const ad = require('./routes/ad');
const review = require('./routes/reviews');

require('dotenv').config();
require('dotenv').config();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use("/user", user);

// const multerS3 = require('multer-s3');
// const { S3Client } = require("@aws-sdk/client-s3");
// const multer = require('multer');
// const region = process.env.AWS_BUCKET_REGION
// const accessKeyId = process.env.DB_ACCESS_KEY
// const secretAccessKey = process.env.DB_SECRET_KEY
// const s3 = new S3Client({
//   region: region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey
//   }
// });
// const multerStorage = multerS3({
//   s3,
//   bucket: process.env.AWS_BUCKET_NAME,
//   key: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const filename = `File/images/${file.fieldname}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });
// const upload = multer({
//   storage: multerStorage,
// });
// Route pour ajouter un fichier à l'utilisateur. Made by Marko
// app.post('/file/addFile', upload.single('fileToSave'), async (req, res) => {
//   fileToSave = req.file;
//   if (!fileToSave) {
//     return res.status(400).send('Missing information in body');
//   }
//   try {
//     // Send in DB the file information here
//     console.log(pdf);
//     return res.status(200).send("File added");
//   }
//   catch (err) {
//     console.error(err);
//     return res.status(500).send("[addFile]", err);
//   }
// });
// app.get('/file/getFileBinary', verifyToken, async (req, res) => {
//   try {
//     if (!req.query.path) {
//       return res.status(400).send('Missing parameter');
//     }
//     const filePath = req.query.path;
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: filePath,
//     };
//     const command = new GetObjectCommand(params);
//     try {
//       const data = await s3.send(command);
//       const ext = filePath.split('.')[filePath.split('.').length - 1];
//       var contentType = "";
//       switch (ext) {
//         case "pdf":
//           contentType = "application/pdf";
//           break;
//         case "png":
//           contentType = "image/png";
//           break;
//         case "jpg":
//         case "jpeg":
//           contentType = "image/jpeg";
//           break;
//         default:
//           contentType = "application/octet-stream";
//           break;
//       }
//       // Set the appropriate content headers
//       res.set('Content-Type', contentType);
//       // Stream the file data as the response
//       data.Body.pipe(res);
//     } catch (err) {
//       console.error('Error retrieving file:', err);
//       return res.status(500).json({ error: 'Failed to retrieve file' });
//     }
//   } catch (err) {
//     if (err.code === 'ENOENT') {
//       // Handle file not found error
//       console.error('File not found:', err.path);
//       res.status(404).send('File not found');
//     } else {
//       // Handle other errors
//       console.error('Error reading file:', err);
//       res.status(500).send('Internal Server Error');
//     }
//   }
// });

module.exports = app;