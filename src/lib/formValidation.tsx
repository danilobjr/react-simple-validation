import * as React from 'react';
import { ValidationFormOptions } from './ValidationFormOptions';
import { getValidationResultFor } from './utils/getValidationResultFor';

export const formValidation = (validationProps: ValidationFormOptions) => (WrappedComponent: any) => {
  return class FormValidation extends React.Component<any, any> {
    static getFieldValidationResult = (fieldName: string, fieldValue: string | number | string[]) => {
      const result = getValidationResultFor(fieldName, fieldValue, validationProps.rules);
      return result;
    }

    static defaultProps = {
      errorClass: 'error',
      getFieldValidationResult: FormValidation.getFieldValidationResult
    };

    static childContextTypes = {
      rules: React.PropTypes.object,
      errorClass: React.PropTypes.string,
      getFieldValidationResult: React.PropTypes.func
    };

    getChildContext() {
      return { ...FormValidation.defaultProps, ...validationProps };
    }

    render() {
      return <WrappedComponent {...this.props} isFormValid={this.isFormValid} />;
    }

    isFormValid = (model: { [fieldName: string]: string | number | string[] }) => {
      return Object
        .keys(model)
        .map(fieldName =>
          FormValidation
            .getFieldValidationResult(fieldName, model[fieldName])
            .isValid
        )
        .every(item => item === true);
    }
  } as any;
};
