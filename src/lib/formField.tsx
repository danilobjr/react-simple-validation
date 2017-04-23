import * as React from 'react';

export const formField = (WrappedComponent: any) => {
  interface Props extends React.HTMLProps<HTMLElement> { }

  interface State {
    isValid: boolean;
    looseFocus: boolean;
    wasChanged: boolean;
  }

  return class FormField extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        isValid: true,
        wasChanged: this.props.onChange ? false : true,
        looseFocus: this.props.onBlur ? false : true
      };
    }

    static contextTypes = {
      errorClass: React.PropTypes.string,
      isFieldValid: React.PropTypes.func
    };

    render() {
      const { className } = this.props;
      const { isValid } = this.state;
      const { errorClass } = this.context;

      return (
        <WrappedComponent
          className={`${className ? className : ''} ${isValid ? '' : errorClass}`}
          {...this.props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          canValidate={this.canValidate()}
        />
      );
    }

    handleChange = (e: React.ChangeEvent<HTMLElement>) => {
      this.props.onChange && this.props.onChange(e);
      this.setState({ wasChanged: true });
      this.tryValidate(e);
    }

    handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      this.props.onBlur && this.props.onBlur(e);
      this.setState({ looseFocus: true });
      this.tryValidate(e);
    }

    tryValidate(e: any) {
      const { looseFocus, wasChanged } = this.state;

      if (looseFocus || wasChanged) {
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const isValid = this.context.isFieldValid(fieldName, fieldValue);
        this.setState({ isValid });
      }
    }

    canValidate = () => {
      const { isValid, looseFocus, wasChanged } = this.state;
      return !isValid && (looseFocus || wasChanged);
    }
  };
};
