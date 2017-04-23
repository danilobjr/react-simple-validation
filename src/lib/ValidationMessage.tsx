import * as React from 'react';
import { ValidationFormOptions } from './ValidationFormOptions';

interface ValidationMessageProps extends React.HTMLProps<HTMLElement> {
  fieldName: string;
  value: string | number | string[];
}

interface Context {
  getFieldValidationResult: (fieldName: string, fieldValue: string | number | string[]) => { isValid: boolean; messages: string[] };
  isDirty: () => boolean;
}

export const ValidationMessage: React.SFC<ValidationMessageProps> = (props: ValidationMessageProps, context: Context) => {
  const { fieldName, value, ...otherProps } = props;
  const { isDirty, getFieldValidationResult } = context;

  const { isValid, messages } = getFieldValidationResult(fieldName, value);

  if (isValid || !isDirty()) {
    return null;
  }

  return (
    <span {...otherProps}>{messages[0]}</span>
  );
};

ValidationMessage.contextTypes = {
  isDirty: React.PropTypes.func,
  getFieldValidationResult: React.PropTypes.func
};
