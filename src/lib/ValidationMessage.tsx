import * as React from 'react';
import { CanValidateProps } from './CanValidateProps';
import { ValidationFormOptions } from './ValidationFormOptions';
import { getValidationResultFor } from './utils/getValidationResultFor';

interface ValidationMessageProps extends CanValidateProps, React.HTMLProps<HTMLElement> {
  fieldName: string;
}

export const ValidationMessage: React.SFC<any> = (props: ValidationMessageProps, context: ValidationFormOptions) => {
  const { canValidate, fieldName, ...otherProps } = props;
  const { isValid, messages } = getValidationResultFor(props.fieldName, props.value, context.rules);

  if (isValid || !canValidate) {
    return null;
  }

  return (
    <span {...otherProps}>{messages[0]}</span>
  )
}

ValidationMessage.contextTypes = {
  rules: React.PropTypes.object
};
