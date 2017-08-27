import * as React from 'react';
import { Component, HTMLProps } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { formField, ValidationFormFieldProps, ValidationMessage } from 'lib';

const ReactstrapInput: any = Input;

interface Props extends HTMLProps<HTMLInputElement>, ValidationFormFieldProps {}

@formField
export class MyCustomInputField extends Component<Props, {}> {
  render() {
    const { className, isValid, label, name, value, ...otherProps } = this.props;
    const formGroupColor = isValid ? '' : 'danger';

    return (
      <FormGroup
        color={formGroupColor}
        row
      >
        <Label md={2} for={name}>{label}</Label>

        <Col md={10}>
          <ReactstrapInput
            id={name}
            name={name}
            value={value}
            {...otherProps}
          />

          <ValidationMessage
            className="form-control-feedback"
            fieldName={name}
            fieldValue={value}
          />
        </Col>
      </FormGroup>
    );
  }
}
