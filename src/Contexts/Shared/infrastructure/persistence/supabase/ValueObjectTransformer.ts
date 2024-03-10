import { ValueObject } from '../../../domain/value-object/ValueObject';
import { NewableClass } from '../../../domain/NewableClass';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    to: (value: ValueObject<any>): any => value.value,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    from: (value: any): ValueObject<any> => new ValueObject(value),
  };
};
