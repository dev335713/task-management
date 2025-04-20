const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.post("/upload-avatar", upload.single('avatar'), (req,res)=>{
    if (!req.file)
    {
        res.status(400).json({
            message:"No file uploaded"
        })
    }
    else
    {
        User.findOneAndUpdate({_id:req.user.id},{$set:{avatar:req.file.filename}})
        .then((oldobj)=>{
            if(oldobj)
            {
                if(typeof(oldobj.avatar)!="undefined")
                {
                    const filePath = path.join(__dirname, '../../uploads', oldobj.avatar);

                    fs.unlink(filePath, (err) => {
                        if(err)
                        {
                            res.status(500).json({
                                message:"Server Error",
                                err:err
                            })
                        }
                        else
                        {
                            res.status(200).json({
                                message:`File Uploaded at ${req.file.filename}`
                            })
                        }
                    });
                }
                else
                {
                    res.status(200).json({
                        message:`File Uploaded at ${req.file.filename}`
                    })
                }
            }
            else
            {
                res.status(500).json({
                    message:"Server Error",
                })
            }
        })
        .catch((err)=>{
            res.status(500).json({
                message:"Server Error",
                err:err
            })
        })
    }
})

router.get("/avatar", (req,res)=>{
    User.findOne({_id:req.user.id})
    .then((userobj)=>{
        const filePath = path.join(__dirname, '../../uploads', userobj.avatar);
        res.status(200).sendFile(filePath);
    })
    .catch((err)=>{
        res.status(500).json({
            message:"Server Error",
            err:err
        })
    })
})

module.exports = router;