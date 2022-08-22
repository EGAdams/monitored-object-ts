/** @class OriginalQueryRunner */
import { XMLHttpRequest } from 'xmlhttprequest';

import IApiArgs from "./IApiArgs";
import IQueryRunner from "./IQueryRunner";
import ITestable from './ITestable';

// https://unpkg.com/browse/list-populator@0.0.7/build/module/lib/
// https://unpkg.com/browse/axios@0.27.2/                            // GOLD!!!

/**
 * @description
 *
 *  Sends the results of a query to the query result processor pointed to by the api argument object.
 *
 *  In order to send the query, we use axios to establish communication.
 *  An object of this class uses axios to fire off the  query that is included in the passed in api arguments.
 *  What is done with this data is determined by the queryResultProcessor that is sent in the api arguments.
 *
 *  This is begging to be turned into a more generic class or interface.  The only thing specific about
 *  this class is the fact that it is using the jewelry machine for communication.
 *
 * @export
 * @class OriginalQueryRunner
 * @implements {IQueryRunner}
 * @implements {ITestable}
 */
export default class OriginalQueryRunner implements IQueryRunner, ITestable {
    url = "";
    constructor( urlArg: string ) { this.url = urlArg; }
    /**
     *
     * @param {IApiArgs} apiArguments
     * @return {*}  {Promise<void>}
     * @memberof OriginalQueryRunner
     */
    async runQuery ( apiArgs: IApiArgs ): Promise< void > {
        const xhr = new XMLHttpRequest();
        xhr.open( "POST", this.url, true );
        xhr.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" ); // allows "sql="... syntax!
        xhr.onreadystatechange = function() {
            if ( xhr.readyState === 4 && xhr.status === 200 ) {
                try {
                    console.log( "xhr.responseText: " + xhr.responseText );
                    apiArgs.data = JSON.parse( xhr.responseText );
                } catch( e ) {
                    console.log( "*** ERROR: failed to parse JSON data from server. ***" );
                    console.log( "*** ERROR: dataArg: " + xhr.responseText + " ***" );
                }
                if ( xhr.responseText.length != 0 ) {
                    console.log( "calling queryResultProcessor.processQueryResult with data: " + apiArgs.data );
                    apiArgs.queryResultProcessor.processQueryResult( apiArgs );
                }
            } else {
                console.log( "xhr.readyState: " + xhr.readyState );
                console.log( "xhr.status: " + xhr.status );
            }
        };
        xhr.send( "sql=" + apiArgs.query );
    }

    testMe (): void { console.log( 'testing OriginalQueryRunner...' ); }
}

if ( typeof process != "undefined" ) {  // node runner.js testMe
    const theArguments = process.argv.slice( 2 );
    if ( theArguments.includes( "testMe" ) ) {
        const runner = new OriginalQueryRunner( "" );
        runner.testMe();
    }
}

// const queryResults = await axios.get( this.url, { params: { sql: apiArguments.query }});
// apiArguments.queryResultProcessor.processQueryResult( queryResults ); // when i find out how axios works...
// xhr.send( JSON.stringify( { 'sql': apiArgs.query }));  // couldn't get this to work.
// xhr.setRequestHeader( "Content-Type", "application/json; charset=UTF-8" );  // some day...
