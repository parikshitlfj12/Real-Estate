const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
 
const SECRET_ACCESS_KEY = 'f6nFjvTSdrMhMSGrJKGp3NVur9985/xHHhd9Ybb3';
const ACCESS_KEY_ID = 'AKIAJED5GLOEHYYWJE3Q';


aws.config.update({
    secretAccessKey: SECRET_ACCESS_KEY,
    accessKeyId: ACCESS_KEY_ID,
    region: 'ap-south-1'
});

const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'images-in-s3',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})

module.exports = upload;
