import * as React from 'react';
import { formField, ValidationMessage, FormFieldComponent } from 'lib';

@formField
export class InputField extends FormFieldComponent<HTMLInputElement> {
  render() {
    const { className, isValid, label, name, value, ...otherProps } = this.props;

    debugger;

    return (
      <div className={isValid ? '' : 'error'}>
        <label htmlFor={name}>{label}</label>
        <br />
        <input id={name} name={name} value={value} {...otherProps} />
        <br />
        <ValidationMessage fieldName={name} value={value} />
      </div>
    );
  }
}
