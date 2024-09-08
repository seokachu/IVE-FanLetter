export const getFormattedDate = (date: Date) => {
  const koreaOffset = 9 * 60;
  const localDate = new Date(date.getTime() + koreaOffset * 60 * 1000);

  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
