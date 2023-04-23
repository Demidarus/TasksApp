// src/utils.js
export function getErrorMessage(response) {
  if (response.error) {
    const errorKeys = Object.keys(response.error);

    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      const errorMessages = response.error[firstErrorKey];

      if (errorMessages && errorMessages.length > 0) {
        return errorMessages[0];
      }
    }
  }
  return "An unknown error occurred.";
}
