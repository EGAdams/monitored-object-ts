import IMonitoredObject from "./IMonitoredObject";
/**
 *  @class MonitoredObjectsTableUpdater
 *
 *  @description
 *  Create the query that query runner will then use to update the monitored objects table.
 *
 */
export default class MonitoredObjectsTableUpdater {
    constructor() { console.log( 'constructing MonitoredObjectsTableUpdater object...' ); }

    /**
     *  @method update
     *  @description
     *
     *  Passes the stringified monitoredObject to the query runner.
     *
     *  @param {IMonitoredObject} monitoredObject The monitoredObject to be stringified.
     *  @return {*}  {void}
     *  @memberof MonitoredObjectsTableUpdater
     */
    public update( monitoredObject: IMonitoredObject ): void {
        console.log( "updating table..." );
        if ( !monitoredObject.getId  ) { console.log( "*** ERROR: monitored object id not set! ***" ); return; }
        const query = "update monitored_objects set object_data='" + JSON.stringify( monitoredObject ) +
                      "' where object_view_id='" + monitoredObject.getId + "'";
        console.log( `running query${ query }...` ); }
}
