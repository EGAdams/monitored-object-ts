import IMonitoredObject from './IMonitoredObject';
import IObserver from "./IObserver";
import MonitoredObjectsTableUpdater from './MonitoredObjectsTableUpdater';
/**
 *
 *  @description
 *  This is an observer of a monitored object.  When the monitored
 *  object calls it's notify() method, it will trigger this object
 *  to update the information in the monitored object database.
 *
 *  @export
 *  @class DatabaseObserver
 *  @implements {IObserver}
 */
export default class DatabaseObserver implements IObserver {
    private monitoredObject: IMonitoredObject;
    private tableUpdater = new MonitoredObjectsTableUpdater();

    constructor( monitoredObjectArg: IMonitoredObject ) {
        this.monitoredObject = monitoredObjectArg; }  // because update(): void takes no arguments according to GoF

    /**
     *  @method update
     *  @description
     *  Writes the stringified, presumably freshly updated monitoredObject into the database.
     *
     *  @memberof DatabaseObserver
     */
    update(): void { this.tableUpdater.update( this.monitoredObject ); }
}
