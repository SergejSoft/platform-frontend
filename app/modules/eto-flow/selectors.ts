import * as Yup from "yup";

function getErrorsNumber(validator: Yup.Schema, data: any): number {
  try {
    validator.validateSync(data, { abortEarly: false });
    return 0;
  } catch (e) {
    return e.errors.length;
  }
}

export const selectFormFractionDone = (
  validator: Yup.Schema,
  formState: any,
  initialFormState: any,
): number => {
  const errors = getErrorsNumber(validator, formState);
  const maximumErrors = getErrorsNumber(validator, initialFormState.data);

  if (maximumErrors === 0) {
    return 1;
  }

  return 1 - errors / maximumErrors;
};
