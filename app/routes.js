var User = require('../app/models/user');

module.exports = function(app, passport) {
    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {        
        res.send(req.user); 
    });

    app.post('/changepass', function (req, res, next) {
        if (req.body.newpas !== req.body.confirmpas) {
            res.send('password and confirm password do not match');
        } else {
            User.findByIdAndUpdate(req.user._id, {$set: {'local.password': req.body.confirmpas}}, function(err, doc) {
                res.send(doc); 
            }); 
        }
    });

    app.post('/update-user-info', function(req, res) { 
        User.findByIdAndUpdate(req.user._id, req.body, function (err, data) {
            if (err) {
                res.send(err);
            }
         
            res.send(data);          
        });
    });

    app.get('/product', isLoggedIn, function(req, res) {
        User.findById(req.user._id, function (err, data) {
            if (err) {
                res.send(err);
            }
        
            res.send(data.local.products);    
        });
    });

    app.post('/add-product', function(req, res) {   
        User.findByIdAndUpdate(req.user._id,{$push: {'local.products': req.body}},
            {safe: true, upsert: true},
            
            function(err, data) {
                if (err) {
                    res.send(err);
                }

                res.send(data);                 
            }
        );
    });

    app.post('/delete-products', function(req, res) { 
        User.findByIdAndUpdate(req.user._id, {$set: {'local.products': req.body}}, function(err, doc) {
            res.send(doc.local.products); 
        });  
    });

    app.post('/edit-product', function(req, res) { 
        User.findById(req.user._id, function (err, data) {
            if (err) {
                res.send(err);
            }
            var objData = data.local.products;
            var objDel = objData.id(req.body._id);
         
            var index = objData.indexOf(objDel);

            objData.splice(index, 1);
            objData.splice(index, 0, req.body);

            var result = data.local.products = objData;
            var upsertData = result;

            User.findByIdAndUpdate(req.user._id, {$set: {'local.products': upsertData}}, function(err, doc) {
                res.send(doc); 
            });   
        });
    });

    app.get('/account', isLoggedIn, function(req, res) {  
        User.findById(req.user._id, function (err, data) {
            if (err) {
                res.send(err);
            }

            res.send(data.local);    
        });
    });

    app.post('/signup', passport.authenticate('local-signup'), function(req, res) { 
        res.send(req.user); 
    });

    app.post('/login', passport.authenticate('local-login'), function(req, res) { 
        res.send(req.user); 
    });

    app.get('/loggedin', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.post('/logout', function(req, res){
        req.logout();
        res.send(200);
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }        

    res.redirect('/');
}