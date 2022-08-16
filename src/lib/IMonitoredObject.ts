import IObserver from './IObserver';
import ISubject from './ISubject';
/*
 * interface IMonitoredObject
 */
interface IMonitoredObject extends ISubject {
    observers: Array< IObserver >;
    getId(): string;
    setId( id: string ): void;
}

export default IMonitoredObject;
