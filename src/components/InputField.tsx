import * as React from 'react';
import * as classNames from 'classnames';
import { formField, ValidationMessage, FormFieldComponent } from 'lib';

@formField
export class InputField extends FormFieldComponent<HTMLInputElement> {
  render() {
    const { className, label, name, value, fieldIsValid, ...otherProps } = this.props;

    return (
      <div
        className={classNames({
          'has-danger': !fieldIsValid
        })}
      >
        <label htmlFor={name}>{label}</label>
        <br />
        <input
          className={classNames({ 'custom-error': !fieldIsValid })}
          id={name}
          name={name}
          value={value}
          {...otherProps}
        />
        <br />
        <ValidationMessage fieldName={name} value={value} />
      </div>
    );
  }
}
