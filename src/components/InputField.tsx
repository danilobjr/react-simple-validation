import * as React from 'react';
import * as classNames from 'classnames';
import { formField, ValidationMessage, FormFieldComponent } from 'lib';

@formField
export class InputField extends FormFieldComponent<HTMLInputElement> {
  render() {
    const { className, name, value, fieldIsValid, ...otherProps } = this.props;

    return (
      <div
        className={classNames({
          'has-danger': !fieldIsValid
        })}
      >
        <label htmlFor={name}>Name</label>
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
