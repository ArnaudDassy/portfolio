"use strict";

module.exports = function( oRequest, oResponse ) {

    oResponse.render( "contact.jade", {"location": "Contact"} );

};
