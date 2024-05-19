import type FetchAndPublishNewNotices from '../../Contexts/BulletinBoard/application/FetchAndPublishNewNotices';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import di from './dependency-injection/index';

class CommandLineApp {
  async start() {
    const container = await di();
    await this.configureEventBus();

    const fetchAndPublishNewNotices: FetchAndPublishNewNotices = container.get('BulletinBoard.application.FetchAndPublishNewNotices');
    await fetchAndPublishNewNotices.run();
  }

  private async configureEventBus() {
    const container = await di();

    const eventBus = container.get('Shared.domain.EventBus');

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }
}

export default CommandLineApp;
