/**
 * @export
 * @interface ValidateManager
 */
export interface ValidateManager {
  setTargets: (targets: Array<{
    value: any;
    validators: Array<Validator>;
  }>) => ValidateManager;
  run: () => { state: boolean; result: Array<ValidState> };
}
/**
 * @export
 * @interface Validator
 */
export interface Validator {
  run: (value: any, option?: any) => ValidState;
  getSuccessMessage: () => string;
  getErrorMessage: () => string;
}
/**
 * @export
 * @interface ValidState
 */
export interface ValidState {
  isValid: boolean;
  helperText: string;
}

export class BaseValidateManager implements ValidateManager {
  private targets: { value: any; validators: Validator[]; }[] = [];

  public setTargets(targets: { value: any; validators: Validator[]; }[]){
    this.targets = targets;
    return this;
  }

  public run(): { state: boolean; result: ValidState[] } {
    const targets = this.targets;

    const result = targets.map((target) => {
      const result: ValidState = { isValid: true, helperText: "" };
      for (let i = 0; i < target.validators.length; i++) {
        const state = target.validators[i].run(target.value);
        if (!state.isValid) {
          result.isValid = false;
          result.helperText = state.helperText;
          break;
        }
      }
      return result;
    });

    return {
      state: result.every((r) => r.isValid),
      result: result,
    };
  }
}

export abstract class BaseValidator implements Validator {
  private state: ValidState = { isValid: false, helperText: "" };
  public abstract getSuccessMessage: () => string;
  public abstract getErrorMessage: () => string;
  public abstract runValid: (value: any, option?: any) => boolean;
  public run(value: any, option?: any): ValidState {
    this.state.isValid = this.runValid(value, option);
    this.state.helperText = this.state.isValid
      ? this.getSuccessMessage()
      : this.getErrorMessage();
    return this.state;
  }
}
