export interface IApiResponse<T> {
  isSuccess: boolean;
  message: string;
  code: number;
  payload: T;
}
