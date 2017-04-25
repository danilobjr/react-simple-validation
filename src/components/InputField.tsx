import * as React from 'react';
import { formField, ValidationMessage, FormFieldComponent } from 'lib';

@formField
export class InputField extends FormFieldComponent<HTMLInputElement> {
  render() {
    const { className, label, name, value, ...otherProps } = this.props;

    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <br />
        <input id={name} name={name} value={value} {...otherProps} />
        <br />
        <ValidationMessage fieldName={name} value={value} />
      </div>
    );
  }
}
