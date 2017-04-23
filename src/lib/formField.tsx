import * as React from 'react';
import * as classNames from 'classnames';

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
      getFieldValidationResult: React.PropTypes.func
    };

    static childContextTypes = {
      isDirty: React.PropTypes.func
    };

    getChildContext() {
      return {
        isDirty: this.isDirty
      };
    }

    render() {
      const { className } = this.props;
      const { isValid } = this.state;
      const { errorClass } = this.context;

      return (
        <WrappedComponent
          className={classNames(`${className || ''}`, {
            [`${errorClass}`]: !isValid
          })}
          {...this.props}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
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
      const { getFieldValidationResult } = this.context;

      if (looseFocus || wasChanged) {
        const fieldName = e.target.getAttribute('name');
        const fieldValue = e.target.value;
        const isValid = getFieldValidationResult(fieldName, fieldValue).isValid;
        this.setState({ isValid });
      }
    }

    isDirty = () => {
      const { isValid, looseFocus, wasChanged } = this.state;
      return !isValid && (looseFocus || wasChanged);
    }
  } as any;
};
