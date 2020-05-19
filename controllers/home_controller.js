module.exports.home = function(req, res){
    // return res.end('<h1>Hi Mitra</h1>');
    return res.render('home', {
        title: "home"
    });
}