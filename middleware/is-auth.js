module.exports = (req,res,next) => {
    console.log("IS THE USER LOGGED IN",req.session.isLoggedIn);
    if(!req.session.isLoggedIn){
        res.redirect('/login');
        return;
    }
    next();
}