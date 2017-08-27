import * as React from 'react';
import { Container, Button, Col, Form, FormGroup } from 'reactstrap';
import { formValidation, ValidationFormProps } from 'lib';
import { MyCustomInputField } from './MyCustomInputField';

interface State {
  email: string;
  name: string;
}

const rules = {
  name: 'Name is required',
  email: {
    required: 'Email is required',
    email: 'Please enter a valid email address',
  },
};

@formValidation({ rules })
export class MyCustomForm extends React.Component<ValidationFormProps, State> {
  state: State = {
    email: '',
    name: '',
  };

  render() {
    const { email, name } = this.state;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <MyCustomInputField label="Name" name="name" value={name} onChange={this.handleFieldChange} />
          <MyCustomInputField label="Email" name="email" value={email} onChange={this.handleFieldChange} />

          <FormGroup row>
            <Col md={{ offset: 2, size: 10 }}>
              <Button color="primary" type="submit">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }

  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    this.setState({ [fieldName]: fieldValue } as any);
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {isFormValid, validateFormFields} = this.props;

    validateFormFields();

    if (isFormValid(this.state as any)) {
      alert('submit form');
    }
  }

  isFormValid = () => this.props.isFormValid(this.state as any);
}
