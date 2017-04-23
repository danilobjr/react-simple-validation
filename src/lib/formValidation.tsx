import * as React from 'react';
import * as PropTypes from 'prop-types'
import { ValidationFormOptions } from './ValidationFormOptions';
import { getValidationResultFor } from './utils/getValidationResultFor';

export const formValidation = (validationProps: ValidationFormOptions) => (WrappedComponent: any) => {
  const getFieldValidationResult = (fieldName: string, fieldValue: string | number | string[]) => {
    const result = getValidationResultFor(fieldName, fieldValue, validationProps.rules);
    return result;
  };

  const isFormValid = (model: { [fieldName: string]: string | number | string[] }) => {
    return Object
      .keys(model)
      .map(fieldName => getFieldValidationResult(fieldName, model[fieldName]).isValid)
      .every(item => item === true);
  };

  return class FormValidation extends React.Component<any, any> {
    static defaultProps = {
      errorClass: 'error',
      getFieldValidationResult
    };

    static childContextTypes = {
      rules: PropTypes.object,
      errorClass: PropTypes.string,
      getFieldValidationResult: PropTypes.func
    };

    getChildContext() {
      return { ...FormValidation.defaultProps, ...validationProps };
    }

    render() {
      return <WrappedComponent {...this.props} isFormValid={isFormValid} />;
    }
  } as any;
};
