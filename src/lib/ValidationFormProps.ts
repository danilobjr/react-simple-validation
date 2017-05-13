export interface ValidationFormProps {
  isFormValid?: (model: {[fieldName: string]: string | number | boolean}) => boolean;
  validateFormFields?: () => void;
}
