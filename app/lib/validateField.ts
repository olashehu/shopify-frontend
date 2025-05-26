// constants.ts (or you can keep these in the same file)
export const USERNAME_REGEX = /^[a-zA-Z0-9_-]{4,20}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^(?:\+234|0)([789][01]\d{8})$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  export type FieldName = "userName" | "email" | "phoneNumber" | "password";

  /**
   * Validates a single form field by name and value.
   * @param fieldName The field name (e.g., "email")
   * @param inputValue The user's input value
   * @returns An error message string if invalid, or an empty string if valid.
   */
  export const validateField = (
    fieldName: FieldName,
    inputValue: string
  ): string => {
    switch (fieldName) {
      case "userName":
        return USERNAME_REGEX.test(inputValue)
          ? ""
          : "Username must be 4–20 characters";
      case "email":
        return EMAIL_REGEX.test(inputValue)
          ? ""
          : "Please enter a valid email address.";
      case "phoneNumber":
        return PHONE_REGEX.test(inputValue)
          ? ""
          : "Phone number must be valid and (11) digits";
      case "password":
        return PASSWORD_REGEX.test(inputValue)
          ? ""
          : "Password must be at least 6 characters and include uppercase, lowercase and number.";
      default:
        return "";
    }
  };
