import { throwError } from "./errorHandler";

export const validateEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = pattern.test(email);

  if (!isEmailValid) throwError("Email is invalid");

  return isEmailValid;
};
