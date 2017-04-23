import * as React from 'react';

interface Props<THtmlElement> extends React.HTMLProps<THtmlElement> {
  fieldIsValid?: boolean;
}

export class FormFieldComponent<THtmlElement> extends React.Component<Props<THtmlElement>, {}> { }
