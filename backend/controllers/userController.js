// import validator from "validator";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import userModel from "../models/userModel.js";


// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET)
// }

// // Route for user login
// const loginUser = async (req, res) => {
//     try {

//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exists" })
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {

//             const token = createToken(user._id)
//             res.json({ success: true, token })

//         }
//         else {
//             res.json({ success: false, message: 'Invalid credentials' })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Route for user register
// const registerUser = async (req, res) => {
//     try {

//         const { name, email, password } = req.body;

//         // checking user already exists or not
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" })
//         }

//         // validating email format & strong password
//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" })
//         }
//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" })
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password: hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)

//         res.json({ success: true, token })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }

// // Route for admin login
// const adminLogin = async (req, res) => {
//     try {

//         const { email, password } = req.body

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email + password, process.env.JWT_SECRET);
//             res.json({ success: true, token })
//         } else {
//             res.json({ success: false, message: "Invalid credentials" })
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message })
//     }
// }


// export { loginUser, registerUser, adminLogin }


import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Create JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await userModel.findOne({ email });
        if (userExists) return res.json({ success: false, message: "User already exists" });

        if (!validator.isEmail(email)) return res.json({ success: false, message: "Invalid email" });
        if (password.length < 8) return res.json({ success: false, message: "Password must be at least 8 characters" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Incorrect password" });

        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid admin credentials" });
        }

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// ✅ View Profile
const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("-password");
        res.json({ success: true, user });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// ✅ Edit Profile
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(req.userId, { name, email }, { new: true }).select("-password");

        res.json({ success: true, user: updatedUser });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// ✅ Change Password
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await userModel.findById(req.userId);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) return res.json({ success: false, message: "Old password is incorrect" });

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

export {
    loginUser,
    registerUser,
    adminLogin,
    getProfile,
    updateProfile,
    changePassword
};
