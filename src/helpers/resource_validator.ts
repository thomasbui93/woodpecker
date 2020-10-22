import InvalidInputException from '../exceptions/validation/InvalidInputException';

export default function validateBody<T>(body: Partial<T>, requireFields: string[], typeName: string) {
  const errors: string[] = [];
  requireFields.forEach((field) => {
    if (!(body as any)[field]) errors.push(`${typeName}: Invalid ${field} request input.`);
  });

  if (errors.length > 0) {
    throw new InvalidInputException(errors.join(' '));
  }
  return true;
}
