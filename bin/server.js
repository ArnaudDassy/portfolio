"use strict";

var zouti = require( "zouti" );

// zouti.clearConsole();
zouti.log( "launching...", "portefolio:server", zouti.YELLOW );

zouti.bench( "portefolio:server" );

// load & configure all
require( "./core/express.js" );

zouti.bench( "portefolio:server" );
