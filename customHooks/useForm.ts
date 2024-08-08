import { useState } from "react";

export interface IFormRequire {
  [key: string]: {
    isRequired?: {
      value: boolean;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
    validate?: {
      value: Function;
      message: string;
    };
  };
}
interface IFormError {
  [key: string]: {
    message: string;
  } | null;
}
interface IValidate {
  [key: string]: Function;
}
export interface IForm {
  [key: string]: string | number | boolean;
}
export const useForm = <T>(initForm: IForm, initFormRequire: IFormRequire) => {
  const [requires, setRequires] = useState(initFormRequire);
  const [errors, setErrors]: [IFormError, Function] = useState({});
  const [form, setForm] = useState<IForm>(initForm);

  const validate: IValidate = {
    isRequired: (input: string | number | boolean, isRequired: boolean) => {
      return !isRequired || Boolean(input.toString().trim());
    },
    min: (input: number, min: number) => {
      return input >= min;
    },
    max: (input: number, max: number) => {
      return input <= max;
    },
    minLength: (input: string, min: number) => {
      return input.length >= min;
    },
    maxLength: (input: string, max: number) => {
      return input.length <= max;
    },
    pattern: (input: string, pattern: RegExp) => {
      return pattern.test(input);
    },
    validate: (
      input: string | number | boolean,
      validate: Function,
      form: IForm
    ) => {
      return validate(input, form);
    },
  };

  const handleSetForm = (field: string, value: number | string | boolean) => {
    setForm({
      ...form,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: {
        message: handleValidate(field, value),
      },
    });
  };

  const handleValidate = (field: string, value: string | number | boolean) => {
    const require: any = requires[field];
    if (!require) {
      return null;
    }
    const requireKeys = Object.keys(require);
    const requireLength = requireKeys.length;
    let i = 0;
    for (i = 0; i < requireLength; i++) {
      const requireKey = requireKeys[i];
      const validateFunc = validate[requireKey];
      if (!validateFunc(value, require[requireKey]?.value, form)) {
        const message = require[requireKey]?.message;
        return message;
      }
    }
    return null;
  };

  const onSubmit = (submit: Function) => {
    const errorObj: IFormError = {};
    const keys = Object.keys(form);
    const length = keys.length;
    let i = 0;
    for (i = 0; i < length; i++) {
      const key = keys[i];
      const message = handleValidate(key, form[key]);
      if (message) {
        errorObj[key] = {
          message,
        };
      }
    }
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      submit(form);
    }
  };

  return {
    handleSetForm,
    handleValidate,
    setForm,
    onSubmit,
    errors,
    form: form as T,
  };
};
