const admin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            message:'Permission Denied'
        })
    }
    next()

};
module.exports = admin;
