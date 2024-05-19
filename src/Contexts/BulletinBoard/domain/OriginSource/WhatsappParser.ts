import Parser from './Parser';

class WhatsappParser implements Parser {
  parse(message: string) {
    let messageToReturn = this.convertLinksToMarkdown(message);
    // eslint-disable-next-line no-useless-escape
    messageToReturn = messageToReturn.replace(/\*(?![^\[]*\])(?![^(]*\))(.*?)(?![^\[]*\])(?![^(]*\))\*/g, '**$1**');

    // Replace _text_ (italic in WhatsApp) with *text* (italic in Markdown)
    // eslint-disable-next-line no-useless-escape
    messageToReturn = messageToReturn.replace(/_(?![^\[]*\])(?![^(]*\))(.*?)(?![^\[]*\])(?![^(]*\))_/g, '*$1*');

    // Replace ~text~ (strikethrough in WhatsApp) with ~~text~~ (strikethrough in Markdown)
    // eslint-disable-next-line no-useless-escape
    messageToReturn = messageToReturn.replace(/~(?![^\[]*\])(?![^(]*\))(.*?)(?![^\[]*\])(?![^(]*\))~/g, '*$1*');

    return messageToReturn;
  }

  private convertLinksToMarkdown(message: string): string {
    // This regular expression matches URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return message.replace(urlRegex, '[$1]($1)');
  }
}

export default WhatsappParser;
