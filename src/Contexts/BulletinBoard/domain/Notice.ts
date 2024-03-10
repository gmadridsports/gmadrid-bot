import { NoticeId } from './NoticeId';
import { NoticeTitle } from './NoticeTitle';

class Notice {
  private readonly id: NoticeId;
  private originSource: string;
  private originSourceId?: string;
  private title: NoticeTitle;
  private message: string;
  private type: string;
  private publishingTime: number;
  private validUntil?: number;
  private published: boolean = false;

  constructor(id: NoticeId, originSource: string, title: NoticeTitle, message: string, type: string, time: number, originSourceId?: string) {
    this.id = id;
    this.originSource = originSource;
    this.originSourceId = originSourceId;
    this.title = title;
    this.message = message;
    this.type = type;
    this.publishingTime = time;
  }
}

export default Notice;
