"use strict";

module.exports = function( oRequest, oResponse ) {

    oResponse.render( "index.jade", {"location": "Home"} );

};
