import DatabaseObserver from './DatabaseObserver';
import IMonitoredObject from './IMonitoredObject';
import IObserver from './IObserver';
/**
 *  @class ObserverFactory
 *
 *  @description
 * This is a factory class that creates observers.  So far, the only observer
 * that is created is the DatabaseObserver.
 *
 */
class ObserverFactory {
    createMonitoredObjectObserver( monitoredObject: IMonitoredObject ): IObserver {
        console.log( "creating monitored object observer");
        return new DatabaseObserver( monitoredObject );
    }
}

export default ObserverFactory;
