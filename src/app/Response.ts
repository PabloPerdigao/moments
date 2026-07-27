export interface response<Any> {
  message?: string,
  data: Any; // pd retornar qualquer tipo de dado, por isso o uso do generics
}