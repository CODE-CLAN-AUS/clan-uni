import { message } from 'ant-design-vue';

export function useErrorHandler(error: any, customMessage: string) {
  const defaultErrorMessage = "An unexpected error occurred.";

  const errorMessage = customMessage || (error && error.message) || defaultErrorMessage;

  message.error(errorMessage);

  if (error) {
    console.error(error);
  }
}
