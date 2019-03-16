export const getCurrentDate = () => {
  const monthNumber = new Date().getMonth();
  const day = new Date().getDate().toString();
  const year = new Date().getFullYear().toString();

  return `${monthString(monthNumber)} ${day}, ${year}`;
};

const monthString = (monthNumber) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return months[monthNumber];
}
