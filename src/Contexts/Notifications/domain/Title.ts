import { ValueObject } from '../../Shared/domain/value-object/ValueObject';

class Title extends ValueObject<string> {
  static maxLength = 50;

  constructor(value: string) {
    const trimmedValue = value.trim();
    if (trimmedValue.length < Title.maxLength) {
      super(value.trim());
      return;
    }

    super(`${trimmedValue.substring(0, Title.maxLength - 3)}...`);
  }

  static forBulletinBoardNotice(): Title {
    return new Title('📣 Nuevo anuncio');
  }
}

export default Title;
