"use strict";

var multer  = require('multer'),
    fs = require('fs'),
    Jimp = require('jimp');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/img/works')
    },
    filename: function (req, file, cb) {
        var fileExtension = file.originalname.split('.');
        var lastIndex = fileExtension.length-1;
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension[lastIndex]);
    }
});

var upload = multer({ storage: storage });

function checkMdp(oreq, ores, fnext){
    if(ores.body.mdp == 'DJlzZdUJ63'){
        fnext();
    }
}
exports.init = function( oApp ) {

     oApp.get( "/"                , require( "../controllers/pages/home.js"               ) );
     oApp.get( "/home"            , require( "../controllers/pages/home.js"               ) );

     oApp.get( "/about"           , require( "../controllers/pages/about.js"              ) );

     oApp.get( "/works"           , require( "../controllers/pages/works/works.js"        ) );
     //oApp.get( "/work/:id"        , require( "../controllers/pages/work/work.js"          ) );
    oApp.post( "/work-json/:id"   , require( "../controllers/pages/work/work-json.js"     ) );
    oApp.post( "/works-json"      , require( "../controllers/pages/works/works-json.js"   ) );
     oApp.get( "/works/create"    , require( "../controllers/pages/works/works-create.js" ) );
    oApp.post( "/works/save"      , upload.any(), function(req, res, f){
        if(req.body.mdp == 'azerty63'){
            Jimp.read('./static/img/works/'+req.files[0].filename, function (err, img) {
                if (err) throw err;
                img.resize(Jimp.AUTO, 150).clone().write("./static/img/works/small-"+req.files[0].filename);
            });
            f();
        }else{
            fs.unlink('./static/img/works/'+req.files[0].filename);
            res.redirect('../');
        }
    }
    , require( "../controllers/pages/works/works-save.js" ) );

    oApp.get( "/contact"          , require( "../controllers/pages/contact.js"            ) );
   oApp.post( "/contact/send"     , require( "../controllers/pages/contact-send.js"       ) );
    oApp.get( "/contact/redirect" , require( "../controllers/pages/contact-redirect.js"   ) );

    oApp.get( "/work/1"        , require( "../controllers/pages/work/work-1.js") );
    oApp.get( "/work/2"        , require( "../controllers/pages/work/work-2.js") );
    oApp.get( "/work/3"        , require( "../controllers/pages/work/work-3.js") );
    oApp.get( "/work/4"        , require( "../controllers/pages/work/work-4.js") );

};