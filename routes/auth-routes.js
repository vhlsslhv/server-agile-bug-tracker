const express = require("express");
const router = express.Router();
const User = require ("../models/User.model");
const bcrypt = require("bcryptjs");
const fileUpload = require("../config/cloudinary");

//Upload image cloudinary
router.post("/upload", fileUpload.single("image"), (req, res) => {
    try {
      res.status(200).json({ fileUrl: req.file.path });
    } catch (e) {
      res.status(500).json({ message: `error occurred ${e}` });
    }
  });

//Signup Route

router.post("/signup", async (req, res)=>{



    const {username, password, email, photo} = req.body;
    console.log(username, password, email);

    //Check if username and password are filled in
    if(username === "" || password === ""){
        res.status(400).json({ message: "Fill in username and password" });
        return;
    };

    //Check for password strength
    const myRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (myRegex.test(password) === false){
        res.status(400).json({ message: "Password is too weak" });
        return;
    };

    //Check if username already exists
    const user = await User.findOne({username});
    if (user !== null) {
        res.status(400).json({ message: "Username already exists" });
        return;
    };

    const saltRounds=10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
        username,
        email,
        photo,
        password: hashedPassword,
    });
    res.status(200).json(newUser);
});


//Login Route

router.post("/login", async (req, res)=>{
    const {username, password} = req.body;

    //Check if username and password are filled in
    if (!username || !password){
        res.status(400).json({ message: "Fill in username and password" });
        return;
    };

    //Check if user exists
    const user = await User.findOne({username});
    if (!user){
        res.status(401).json({ message: "Invalid Login - Check both username and password" });
        return;
    };

    //Check if passwords match
    if (bcrypt.compareSync(password, user.password)){
        // If passwords match -> initialize session with current user
        req.session.currentUser = user;
        res.status(200).json(user);        
    } else{
        // If passwords do not match
        res.status(401).json({message: "Invalid Login - Check both username and password" });
    };
});


//Logout Route + LoggedIn Route

router.post("/logout", (req, res)=>{
    req.session.destroy();
    res.status(200).json({message: "User logged out" });
});

//App crashes whenever I try to use the commented piece of code bellow

/* router.length("/loggedin", (req, res)=>{
    if (req.session.currentUser){
        res.status(200).json(req.session.currentUser);
        return;
    } else{
        res.status(401).json({message: "User not logged in" });
    };
});  */

module.exports = router;