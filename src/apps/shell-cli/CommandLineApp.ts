import type FetchAndPublishNewNotices from '../../Contexts/BulletinBoard/application/FetchAndPublishNewNotices';
import { DomainEventSubscribers } from '../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers';
import di from './dependency-injection/index';
import { NumMessagesToFetch } from '../../Contexts/BulletinBoard/domain/NumMessagesToFetch';

class CommandLineApp {
  async start() {
    const container = await di();
    await this.configureEventBus();

    const fetchAndPublishNewNotices: FetchAndPublishNewNotices = container.get('BulletinBoard.application.FetchAndPublishNewNotices');

    await fetchAndPublishNewNotices.run(this.getNumberOfMessagesToFetch());
  }

  private async configureEventBus() {
    const container = await di();

    const eventBus = container.get('Shared.domain.EventBus');

    eventBus.addSubscribers(DomainEventSubscribers.from(container));
  }

  private getNumberOfMessagesToFetch(): NumMessagesToFetch | undefined {
    for (let i = 0; i < process.argv.length; i++) {
      if (process.argv[i] === '--numMessagesToFetch') {
        return NumMessagesToFetch.fromString(process.argv[i + 1]);
      }
    }
  }
}

export default CommandLineApp;
