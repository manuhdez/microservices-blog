export interface ServiceEvent {
  type: string;
  payload?: Object;
}

export default class EventsController {
  private events: ServiceEvent[] = [];

  storeEvent(newEvent: ServiceEvent) {
    this.events.push(newEvent);
  }

  getAllEvents(): ServiceEvent[] {
    return this.events;
  }

  getEventsByType(type: string): ServiceEvent[] {
    return this.events.filter((event) => event.type === type);
  }
}
