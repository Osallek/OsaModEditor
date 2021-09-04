export const getEmperor = (date: Date | null, hreEmperors?: Record<string, string>): string => {
  let emperor = "---";
  const dateString = date ? date.toJSON().slice(0, 10) : null;

  if (hreEmperors && Object.keys(hreEmperors).length > 0) {
    if (dateString) {
      for (const [key, value] of Object.entries(hreEmperors)) {
        if (key <= dateString) {
          emperor = value;
        } else {
          break;
        }
      }
    } else {
      emperor = Object.values(hreEmperors)[0];
    }
  }

  return emperor;
};
