import { BaseValidator } from "./validator";

/**
 * @export
 * @class MaxValueValidator
 * @implements {Validator}
 */
export class MaxValueValidator extends BaseValidator {
  limitValue: number;
  message: string;

  constructor(limitValue: number, message: string = "") {
    super();
    this.limitValue = limitValue;
    this.message = message || `${this.limitValue}文字以下にする必要があります`;
  }

  public getSuccessMessage = (): string => "";
  public getErrorMessage = (): string => this.message;
  public runValid = (value: any, option?: any): boolean => {
    const valueType = typeof value;
    if (valueType === "string") {
      return value.length <= this.limitValue;
    } else if (valueType === "number") {
      return value <= this.limitValue;
    } else {
      this.message = `MaxValueValidatorに対応していない型: ${valueType} が指定されました`;
      return false;
    }
  };
}
