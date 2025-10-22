export interface FormState {
  name: string;
  email: string;
  password: string;
  link?: string;
  date: string;
}

export interface ValidationState {
  name: boolean | null;
  email: boolean | null;
  password: boolean | null;
  link?: boolean | null;
  date: boolean | null;
}

export const initialFormState: FormState = {
  name: '',
  email: '',
  password: '',
  link: '',
  date: '',
};

export const initialValidationState: ValidationState = {
  name: null,
  email: null,
  password: null,
  link: null,
  date: null,
};