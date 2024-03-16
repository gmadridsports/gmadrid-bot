import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract toPrimitives(): any;
}
