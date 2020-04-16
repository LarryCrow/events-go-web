import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import {
  ValidationErrorCode,
  MatchErrorData,
  LengthErrorData,
  PatternErrorData,
  AppErrorData,
  MinValueErrorData,
  MaxValueErrorData,
} from '../../../core/models/validation-error-code';

/**
 * Validation error messages.
 */
const ValidationErrorMessageFactories = {
  [ValidationErrorCode.Email]: () => 'Некорректный email',
  [ValidationErrorCode.Required]: () => 'Поле является обязательным',
  [ValidationErrorCode.Match]: ({ controlName, controlTitle }: MatchErrorData) => `Значение не совпадает со значением "${controlTitle}"`,
  [ValidationErrorCode.MinLength]: ({ actualLength, requiredLength }: LengthErrorData) => `Минимальная длина ${requiredLength}`,
  [ValidationErrorCode.MaxLength]: ({ actualLength, requiredLength }: LengthErrorData) => `Максимальная длина ${requiredLength} символов`,
  [ValidationErrorCode.Pattern]: ({ actualValue, requiredPattern }: PatternErrorData) => 'Значение не удовлетворяет шаблону',
  [ValidationErrorCode.AppError]: ({ message }: AppErrorData) => message,
  [ValidationErrorCode.Min]: ({ actual, min }: MinValueErrorData) => `Минимальное значение ${min}`,
  [ValidationErrorCode.Max]: ({ actual, max }: MaxValueErrorData) => `Максимальное значение ${max}`,
  [ValidationErrorCode.IncorrectAddress]: () => 'Некорректный адрес.',
};

/**
 * Validation error renderer component.
 */
@Component({
  selector: 'ego-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
  /**
   * Validation errors.
   */
  @Input()
  public errors: ValidationErrors | null = null;

  /**
   * Error message as a string.
   */
  public get errorMessage(): string | null {
    if (this.errors == null) {
      return null;
    }
    const errorCode = Object.keys(this.errors)[0] as ValidationErrorCode;
    return this.getErrorMessage(errorCode, this.errors[errorCode]);
  }

  /**
   * Get error message for specific validation error.
   * @param errorCode Error code (minlength, required and etc.)
   * @param errorData Data of error. See details of HTTP validation errors or implementation of custom.
   * For instance data of minlength error is: { actualLength, requiredLength }.
   */
  private getErrorMessage(errorCode: ValidationErrorCode, errorData: any): string {
    const factory = ValidationErrorMessageFactories[errorCode];
    if (factory == null) {
      console.warn(`Can not find validation message factory for error: ${errorCode}`);
      return 'Некорректное значение';
    }
    return factory(errorData);
  }
}
