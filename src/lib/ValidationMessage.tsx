import * as React from 'react';
import { ValidationFormOptions } from './ValidationFormOptions';
import { getValidationResultFor } from './utils/getValidationResultFor';

interface ValidationMessageProps extends React.HTMLProps<HTMLElement> {
  fieldName: string;
  value: string | number | string[];
}

interface Context extends ValidationFormOptions {
  isDirty: () => boolean;
}

export const ValidationMessage: React.SFC<ValidationMessageProps> = (props: ValidationMessageProps, context: Context) => {
  const { fieldName, value, ...otherProps } = props;
  const { isDirty } = context;

  const { isValid, messages } = getValidationResultFor(fieldName, value, context.rules);

  if (isValid || !isDirty()) {
    return null;
  }

  return (
    <span {...otherProps}>{messages[0]}</span>
  );
};

ValidationMessage.contextTypes = {
  rules: React.PropTypes.object,
  isDirty: React.PropTypes.func
};
