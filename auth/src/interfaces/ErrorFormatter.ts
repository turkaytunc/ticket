export interface ErrorFormatter {
  statusCode: number;
  formatError: () => { message: string; field?: string }[];
}
