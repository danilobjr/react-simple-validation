interface ValidationMessageProps extends CanValidate, React.HTMLProps<HTMLElement> {
    fieldName: string;
}

export const ValidationMessage: React.SFC<any> = (props: ValidationMessageProps, context: ValidationFormOptions) => {
    const { canValidate, fieldName, ...otherProps } = props;
    const { isValid, messages } = getValidationResultFor(props.fieldName, props.value, context.rules);

    if (isValid || !canValidate) {
        return null;
    }

    return (
        <span {...otherProps}>{messages[0]}</span>
    )
}

ValidationMessage.contextTypes = {
    rules: React.PropTypes.object
};