import * as React from 'react';
import { formValidation, ValidationFormProps } from 'lib';
import { InputField } from './InputField';

interface State {
  email: string;
  name: string;
}

const rules = {
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address',
  },
  name: 'Name is required',
};

@formValidation({ rules })
export class MyCustomForm extends React.Component<ValidationFormProps, State> {
  state = {
    email: '',
    name: '',
  };

  render() {
    const { email, name } = this.state;
    debugger;

    return (
      <form onSubmit={this.handleSubmit}>
        <InputField label="Name" name="name" value={name} onChange={this.handleFieldChange} />
        <InputField label="Email" name="email" value={email} onChange={this.handleFieldChange} />
        <button type="submit" disabled={!this.isFormValid()}>Submit</button>
      </form>
    );
  }

  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    this.setState({ [fieldName]: fieldValue } as any);
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form is valid', this.props.isFormValid(this.state));
  }

  isFormValid = () => this.props.isFormValid(this.state);
}
