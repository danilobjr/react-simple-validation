import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { FormValidationEventEmitter } from './utils';
import { ChangeEvent, Component, FocusEvent, HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLElement> { }

interface State {
  isValid: boolean;
  touched: boolean;
  changed: boolean;
}

interface Context {
  errorClass: string;
  isFieldValid: (fieldName: string, fieldValue: string) => boolean;
}

export const formField = (WrappedComponent: any) => {
  return class FormField extends Component<Props, State> {
    private eventEmitter: FormValidationEventEmitter;
    context: Context;

    constructor(props: Props, context: Context) {
      super(props, context);

      const { name, value } = props;
      const { isFieldValid } = context;

      const isValid = isFieldValid && isFieldValid(name, value as any);

      this.state = {
        isValid,
        changed: false,
        touched: false,
      };

      this.eventEmitter = FormValidationEventEmitter.getInstance();
    }

    static contextTypes: any = {
      errorClass: PropTypes.string,
      isFieldValid: PropTypes.func,
    };

    static childContextTypes: any = {
      canDisplayValidationErrors: PropTypes.func,
    };

    getChildContext() {
      return {
        canDisplayValidationErrors: this.canDisplayValidationErrors,
      };
    }

    componentDidMount() {
      this.eventEmitter.listenFormFieldValidationEvent(() => {
        const { name, value } = this.props;
        const isValid = this.context.isFieldValid(name, value as any);

        this.setState({
          isValid,
          changed: true,
          touched: true,
        });
      });
    }

    componentWillUnmount() {
      this.eventEmitter.removeAllListeners();
    }

    render() {
      const { className } = this.props;
      const { isValid } = this.state;
      const { errorClass } = this.context;

      return (
        <WrappedComponent
          className={classNames(`${className}`, {
            [`${errorClass}`]: isValid,
          })}
          {...this.props}
          isValid={!this.canDisplayValidationErrors()}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
      );
    }

    handleChange = (e: ChangeEvent<HTMLElement>) => {
      if (this.props.onChange) {
        this.props.onChange(e);
      }

      this.setState({ changed: true } as State);
      this.validate(e);
    }

    handleBlur = (e: FocusEvent<HTMLElement>) => {
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }

      this.setState({ touched: true } as State);
      this.validate(e);
    }

    validate(e: any) {
      if (this.hasNoContext()) { return; }

      const { touched, changed } = this.state;
      const { isFieldValid } = this.context;

      const fieldName = e.target.getAttribute('name');
      const fieldValue = e.target.value;
      const isValid = isFieldValid(fieldName, fieldValue);
      this.setState({ isValid });
    }

    canDisplayValidationErrors = () => {
      if (this.hasNoContext()) { return false; }

      const { isValid, touched, changed } = this.state;
      return !isValid && touched && changed;
    }

    hasNoContext = () => {
      const contextPropertiesHasUndefinedValues = Object
        .keys(this.context)
        .every(key => !this.context[key]);

      return contextPropertiesHasUndefinedValues;
    }
  } as any;
};
