/* panoptik
 * /bin/core/express/middlewares.js - global middleware configuration
 * started @ 23/10/2015
 */

"use strict";

/*exports.log = function( oRequest, oResponse, fNext ) {
    var sDate = ( new Date() ).toTimeString();

    console.log( "(" + sDate + ") - [" + oRequest.method + "] - " + oRequest.url );
    fNext();
};*/

exports.json = {
    "send": function( oRequest, oResponse, mData, iStatusCode ) {
        oResponse.status( iStatusCode || 200 ).json( {
            "url": "[" + oRequest.method + "] - " + oRequest.url,
            "error": false,
            "data": mData
        } );
    },
    "error": function( oRequest, oResponse, oError, iStatusCode ) {
        oResponse.status( iStatusCode || 500 ).json( {
            "url": "[" + oRequest.method + "] - " + oRequest.url,
            "error": oError.message || oError,
            "data": null
        } );
    }
};
