module.exports.profile =function(req, res){
    // res.end('<h1>Profile </h1>');
    return res.render('user_profile',{
        title: "Profile"
    });
};

module.exports.signin = function(req, res){
    return res.render('signin',{
        title: "Signin"
    });
};

module.exports.signup = function(req, res){
    return res.render('signup',{
        title: "Signup"
    });
};