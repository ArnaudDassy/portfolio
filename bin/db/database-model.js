/* panoptik
 * /bin/core/json-db.js - json db utilities
 * started @ 02/11/2015
 */

"use strict";

var fs = require( "fs" );

var _getAll;

var _loadJSONFile = function( fNext ) {
    fs.readFile( __dirname + "/../db/database.json", "utf-8", function( oError, sData ) {
        var oJSONData = {};

        if( oError ) {
            return fNext( null, oJSONData );
        }
        try {
            oJSONData = JSON.parse( sData );
        } catch( oJSONError ) {
            return fNext( oJSONError );
        }
        fNext( null, oJSONData );
    } );
};

var _saveJSONFile = function( oJSONData, fNext ) {
    var sParsedJSONData = JSON.stringify( oJSONData, null, "  " );
    fs.writeFile( __dirname + "/../db/database.json", sParsedJSONData, "utf-8", fNext );
};

exports.get = function( sDataType, oWhereClause, fNext ) {
    _getAll( sDataType, oWhereClause, function( oError, aResults ) {
        fNext && fNext( oError, aResults && aResults.length && aResults[ 0 ] );
    } );
};

exports.getById = function( oId, fNext){
    _getAll( oId, function( oError, aResults ) {
        fNext && fNext( oError, aResults && aResults.length && aResults[ 0 ] );
    } );
};
exports.getAll = _getAll = function( oWhereClause, fNext ) {
    _loadJSONFile( function( oLoadingError, oJSONData ) {
        var aResults,
            mValue,
            sProperty;

        if( oLoadingError ) {
            return fNext && fNext( oLoadingError );
        }
        // fill results with all elements in JSONData
        aResults = Object.keys( oJSONData ).map( function( sProp ) {
            return oJSONData[ sProp ];
        } );
        // filtering by where clause properties
        for( sProperty in oWhereClause ) {
            if( {}.hasOwnProperty.call( oWhereClause, sProperty ) ) {
                mValue = oWhereClause[ sProperty ];
                /*eslint-disable no-loop-func */
                aResults = aResults.filter( function( oElement ) {
                    return oElement[ sProperty ] === mValue;
                } );
                /*eslint-enable no-loop-func */
            }
        }
        if( !aResults.length ) {
            return fNext && fNext( new Error( "No element found." ) );
        }
        fNext && fNext( null, aResults );
    } );
};

exports.save = function( iID, oData, fNext ) {
    _loadJSONFile( function( oLoadingError, oJSONData ) {
        if( oLoadingError ) {
            return fNext && fNext( oLoadingError );
        }
        if( !iID ) {
            oData.id = ( new Date() ).getTime();
        }
        oData.updatedAt = new Date();
        oJSONData[ oData.id ] = oData;
        _saveJSONFile( oJSONData, function( oSavingError ) {
            if( oSavingError ) {
                return fNext && fNext( oSavingError );
            }
            fNext && fNext( null, oData );
        } );
    } );
};

exports.delete = function( iID, fNext ) {
    _loadJSONFile( function( oLoadingError, oJSONData ) {
        if( oLoadingError ) {
            return fNext && fNext( oLoadingError );
        }
        if( oJSONData[ iID ] ) {
            delete oJSONData[ iID ];
        } else {
            return fNext && fNext( null );
        }
        _saveJSONFile( oJSONData, function( oSavingError ) {
            if( oSavingError ) {
                return fNext && fNext( oSavingError );
            }
            fNext && fNext( null );
        } );
    } );
};
exports.saveJSON = function( oJSONData, fNext ) {
    var sParsedJSONData = JSON.stringify( oJSONData, null, "  " );
    fs.writeFile( __dirname + "/../db/database.json", sParsedJSONData, "utf-8", fNext );
};
