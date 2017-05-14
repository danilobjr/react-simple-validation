import {EventEmitter} from 'events';

class ValidationFormEventEmitter extends EventEmitter {
  private static instance: ValidationFormEventEmitter;
  private VALIDATE_ALL_FORM_FIELDS = 'validateAllFormFields';

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ValidationFormEventEmitter();
    }

    return this.instance;
  }

  triggerFormFieldValidationEvent() {
    this.emit(this.VALIDATE_ALL_FORM_FIELDS);
  }

  listenFormFieldValidationEvent(listener: Function) {
    this.on(this.VALIDATE_ALL_FORM_FIELDS, listener);
  }

  dispose() {
    this.removeAllListeners();
  }
}

export {ValidationFormEventEmitter};
