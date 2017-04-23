export interface ValidationForm {
  isFormValid?: (model: { [fieldName: string]: string | number | boolean }) => boolean;
}
