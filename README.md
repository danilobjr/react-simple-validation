# React Simple Validation

Easy form validations using decorators for React apps.

Inpiration: jQuery Validation.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quickstart)
- [Support](#support)
- [Contributing](#contributing)

## Installation

```sh
npm install react-simple-validation --save
```

## Quick Start

Define some rules using `@formValidation` decorator.

_Note: Code below uses Typescript, but you can use ES6 classes as well._

```JSX
import {formValidation} from 'react-simple-validation';

@formValidation({
  rules: {
    name: 'Name is required'
  }
})
```

Use this decorator in a component.

```JSX
import * as React from 'react';
import {formValidation} from 'react-simple-validation';
const {Component} = React;

@formValidation({
  rules: {
    name: 'Name is required'
  }
})
export class MyFormComponent extends Component<{}, {}> {
  render() {
    <form>
      {/* form fields here */}
      <button type="submit">Submit</button>
    </form>
  }
}
```

Create a custom field component.

```JSX

```

## Support

Please [open an issue](https://github.com/fraction/readme-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).
