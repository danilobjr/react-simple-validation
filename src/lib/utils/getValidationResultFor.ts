export const getValidationResultFor = (fieldName: string, fieldValue: string | number | string[], rules: { [fieldName: string]: any }) => {
  const result = {
    isValid: true,
    messages: [] as string[]
  };

  if (!!rules[fieldName]['required'] || typeof rules[fieldName] === 'string') {
    if (typeof fieldValue === 'string' && fieldValue.length === 0) {
      result.isValid = false;
      result.messages.push(rules[fieldName]['required'] || rules[fieldName]);
    }
  }

  return result;
};
