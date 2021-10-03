export const dateToLocalDate = (date: Date | null): string | null => {
  return date ? date.toJSON().slice(0, 10) : null;
};
export const stringToLocalDate = (date: string | null): string | null => {
  return date ? new Date(date).toLocaleDateString() : null;
};
