import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HTMLProps, SFC} from 'react';
import {ValidationFormOptions} from './ValidationFormOptions';
import {getValidationResultFor} from './utils';

interface ValidationMessageProps extends HTMLProps<HTMLElement> {
  fieldName: string;
  fieldValue: string | number | string[];
}

interface Context extends ValidationFormOptions {
  canDisplayValidationErrors: () => boolean;
}

export const ValidationMessage: SFC<ValidationMessageProps> = (props: ValidationMessageProps, context: Context) => {
  const {canDisplayValidationErrors, rules} = context;
  const {children, fieldName, fieldValue, ...otherProps} = props;

  const validationResult = rules && getValidationResultFor(fieldName, fieldValue, rules);

  if (!validationResult || !canDisplayValidationErrors()) {
    return null;
  }

  return (
    <div {...otherProps}>{validationResult.messages[0]}</div>
  );
};

ValidationMessage.contextTypes = {
  rules: PropTypes.object,
  canDisplayValidationErrors: PropTypes.func,
};
