# react-simple-validation

Easy form validations using decorators for React apps.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Support](#support)
- [Contributing](#contributing)

## Installation

```sh
npm install react-simple-validation --save
```

## Quick Start

Define some rules using `@formValidation` decorator.

_Note: Code below uses Typescript, but you can use vanilla Javascript as well._

```JSX
import {formValidation} from 'react-simple-validation';

@formValidation({
  rules: {
    email: {
      required: 'Email is required'
    }
  }
})
```

Every property inside `rules` object is the `name` attribute of a form input. We'll define some input later. So we defined that an input with `name="email"` is required. 

_Tip: `required` is the default rule. So we can rewrite it:_

```JSX
import {formValidation} from 'react-simple-validation';

@formValidation({
  rules: {
    email: 'Email is required'
  }
})
```

Use this decorator in a class component containing a form.

```JSX
import * as React from 'react';
import {formValidation} from 'react-simple-validation';
const {PureComponent} = React;

interface State {
  email: string;
}

@formValidation({
  rules: {
    email: 'Email is required'
  }
})
export class MyFormComponent extends PureComponent<{}, State> {
  state: State = {
    email: ''
  };

  render() {
    <form>
      {/* ... */}
      <button type="submit">Submit</button>
    </form>
  }
}
```

Create a custom field component.

```JSX
import * as React from 'react';
import { formField, ValidationFormFieldProps, ValidationMessage } from 'react-simple-validation';
const { PureComponent, HTMLProps } = React;

const styles = {
  input: {
    required: {
      color: 'white',
      backgroundColor: 'indianred',
    }
  }
}

interface Props extends HTMLProps<HTMLInputElement>, ValidationFormFieldProps {}

@formField
export class MyCustomInputField extends Component<Props, {}> {
  render() {
    const { isValid, label, name, value, ...otherProps } = this.props;
    const inputStyle = isValid ? {} : styles.input.required;

    return (
      <div>
        <label for={name}>{label}</label>

        <div>
          <input
            style={inputStyle}
            id={name}
            name={name}
            type="text"
            value={value}
            {...otherProps}
          />

          <ValidationMessage
            fieldName={name}
            fieldValue={value}
          />
        </div>
      </div>
    );
  }
}
```

Ok, some explanation for this.

First you have to decorate the component with `@formField`. This will give you an extra prop called `isValid` inside your custom component. It's a _boolean_ prop. With this prop you can style your component, for example. 

Another important piece is `ValidationMessage` component. This simply show the error message based on `fieldName` and `fieldValue`.

_Note: if you're using vanilla Javascript, `ValidationFormFieldProps` is not necessary. This is an interface used with Typescript._

Now you can use your custom field in form component created previously as follows.

```JSX
@formValidation({
  rules: {
    email: 'Email is required'
  }
})
export class MyFormComponent extends Component<{}, State> {
  state: State = {
    email: ''
  };

  render() {
    const { email } = this.state;

    <form>
      <MyCustomInputField
        name="email"
        value={email}
        onChange={e => this.setState({email: e.target.value})}
      />

      <button type="submit">Submit</button>
    </form>
  }
}
```

That's it!

## Support

Please take a look if a [similar issue](https://github.com/danilobjr/react-simple-validation/issues/new) is already open. If not, [open a new one](https://github.com/danilobjr/react-simple-validation/issues/new).

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/danilobjr/react-simple-validation/compare/).
