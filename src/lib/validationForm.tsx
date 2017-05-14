import * as React from 'react';
import {PureComponent} from 'react';
import * as PropTypes from 'prop-types';
import {ValidationFormOptions} from './ValidationFormOptions';
import {getValidationResultFor, ValidationFormEventEmitter} from './utils';

export const validationForm = (validationProps: ValidationFormOptions) => (WrappedComponent: any) => {
  return class FormValidation extends PureComponent<any, any> {
    eventEmitter: ValidationFormEventEmitter;

    constructor() {
      super();

      this.eventEmitter = ValidationFormEventEmitter.getInstance();
    }

    static isFieldValid = (fieldName: string, fieldValue: string | number | string[]) => {
      const {isValid} = getValidationResultFor(fieldName, fieldValue, validationProps.rules);
      return isValid;
    }

    static defaultProps: any = {
      errorClass: 'error',
      isFieldValid: FormValidation.isFieldValid,
    };

    static childContextTypes: any = {
      rules: PropTypes.object,
      errorClass: PropTypes.string,
      isFieldValid: PropTypes.func,
    };

    getChildContext() {
      return {...FormValidation.defaultProps, ...validationProps};
    }

    render() {
      return <WrappedComponent {...this.props} isFormValid={this.isFormValid} validateFormFields={this.validateFormFields} />;
    }

    isFormValid = (model: {[fieldName: string]: string | number | string[]}) => {
      return Object
        .keys(model)
        .map(fieldName => FormValidation.isFieldValid(fieldName, model[fieldName]))
        .every(item => item === true);
    }

    validateFormFields = () => {
      this.eventEmitter.triggerFormFieldValidationEvent();
    }
  } as any;
};
