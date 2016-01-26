"use strict";

module.exports = function( oRequest, oResponse ) {
    oResponse.render( "w.jade", {"location": "Work" });
};
