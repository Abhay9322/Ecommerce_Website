// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please login again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authUser;
