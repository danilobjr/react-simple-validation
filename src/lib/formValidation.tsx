const formValidation = (validationProps: ValidationFormOptions) => (WrappedComponent: any) => {
    return class FormValidation extends React.Component<any, any> {
        static isFieldValid = (fieldName: string, fieldValue: string | number | string[]) => {
            const { isValid } =  GetValidationResultFor(fieldName, fieldValue, validationProps.rules);
            return isValid;
        }

        static defaultProps = {
            errorClass: 'error',
            isFieldValid: FormValidation.isFieldValid
        }

        static childContextTypes = {
            rules: React.PropTypes.object,
            errorClass: React.PropTypes.string,
            isFieldValid: React.PropTypes.func
        }

        getChildContext() {
            return { ...FormValidation.defaultProps, ...validationProps };
        }

        render() {
            return <WrappedComponent {...this.props} isFormValid={this.isFormValid} />;
        }

        isFormValid = (model: { [fieldName: string]: string | number | string[] }) => {
            return Object
                .keys(model)
                .map(fieldName => FormValidation.isFieldValid(fieldName, model[fieldName]))
                .every(item => item === true);
        }
    } as any;
}