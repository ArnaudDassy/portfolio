"use strict";

var db = require('../../../db/database-model.js'), id;

module.exports = function( oRequest, oResponse ) {
    id = oRequest.originalUrl.split('/')[2];
    var oId = {
        'id': id
    };
    db.getById( oId, function(error, data){
        oResponse.send([data, error]);
    });
};
