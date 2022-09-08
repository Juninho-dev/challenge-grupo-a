import axios from "axios";

const timeoutErrors = ["ECONNABORTED", "TIMEDOUT"];

interface ErrorRequest {
  msg: string;
}

export const getError = (err: unknown, alternativeMessage: string) => {
  if (axios.isAxiosError(err)) {
    if (err.code && timeoutErrors.includes(err.code)) {
      return {
        title: "Conexão ruim ou inexistente",
        message: "Tente novamente mais tarde",
      };
    }

    const errorResponse = err.response?.data;
    const errorMessage = errorResponse?.message;
    const messagePayload = errorResponse?.payload;
    const message = messagePayload
      ? messagePayload.map((item: ErrorRequest) => item.msg).join("\n")
      : null;

    return {
      title: "Erro",
      message: message || errorMessage || alternativeMessage,
    };
  }

  return {
    title: "Erro",
    message: alternativeMessage,
  };
};
