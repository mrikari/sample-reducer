import { BaseValidator } from "./validator";

/**
 * @export
 * @class RequiredValidator
 * @implements {Validator}
 */
export class RequiredValidator extends BaseValidator {
  message: string;

  constructor(message: string = "") {
    super();
    this.message = message || `この項目は必須です`;
  }

  public getSuccessMessage = ():string => "";
  public getErrorMessage = ():string => this.message;

  public runValid = (value: any, option?: any): boolean => {
    return value === null ||
      value === undefined ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
      ? false
      : true;
  };
}
