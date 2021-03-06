import { BaseValidator } from "./validator";

/**
 * @export
 * @class MultiValueValidator
 * @implements {Validator}
 */
export class MultiValueValidator extends BaseValidator {
  message?: string;

  public getSuccessMessage = (): string => "";
  public getErrorMessage = (): string => this.message || "";
  public runValid = (value: any, option?: any): boolean => {
    const values = value as { value: any; validators: BaseValidator[] }[];
    for (let i = 0; i < values.length; i++) {
        for(let j=0; j< values[i].validators.length; j++){
            const v = values[i].validators[j].runValid(values[i].value)
            if(!v){
                this.message = values[i].validators[j].getErrorMessage()
                return false;
            }
        }
    }
    return true;
  };
}
