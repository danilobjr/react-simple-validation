import * as React from 'react';
import { formValidation, ValidationFormProps } from 'lib';
import { InputField } from './InputField';

interface State {
  name: string;
}

const rules = {
  name: 'Name is required'
};

@formValidation({ rules })
export class MyCustomForm extends React.Component<ValidationFormProps, State> {
  state = {
    name: ''
  };

  render() {
    const { name } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <InputField name="name" value={name} onChange={this.handleFieldChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    this.setState({ [fieldName]: fieldValue } as any);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('form submitted');
  }
}
