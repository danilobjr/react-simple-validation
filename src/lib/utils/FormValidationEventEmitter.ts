import { EventEmitter } from 'events';

class FormValidationEventEmitter extends EventEmitter {
  private static instance: FormValidationEventEmitter;
  private VALIDATE_ALL_FORM_FIELDS: string = 'validateAllFormFields';

  private constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new FormValidationEventEmitter();
      this.instance.setMaxListeners(64);
    }

    return this.instance;
  }

  triggerFormFieldValidationEvent() {
    this.emit(this.VALIDATE_ALL_FORM_FIELDS);
  }

  listenFormFieldValidationEvent(listener: any) {
    this.on(this.VALIDATE_ALL_FORM_FIELDS, listener);
  }

  dispose() {
    this.removeAllListeners();
  }
}

export { FormValidationEventEmitter };
