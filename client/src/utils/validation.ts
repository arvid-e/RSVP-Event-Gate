import {
  DateValidator,
  EmailValidator,
  PasswordValidator,
  UrlValidator,
  UsernameValidator,
} from 'common-string-validator';

const emailValidator = new EmailValidator();
const usernameValidator = new UsernameValidator();
const passwordValidator = new PasswordValidator();
const urlValidator = new UrlValidator();
const dateValidator = new DateValidator();

export function validateField(fieldName: string, value: string) {
  switch (fieldName) {
    case 'email':
      return emailValidator.isValidEmail(value);

    case 'name':
      return usernameValidator.isValidUsername(value);

    case 'password':
      return passwordValidator.isValidPassword(value);

    case 'link':
      return urlValidator.isValidUrl(value);

    case 'date':
      return dateValidator.isValidDate(value);

    default:
        return true;
  }
}
