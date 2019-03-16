export const getCurrentTime = () => {
  let hour = new Date().getHours();
  const minute = new Date().getMinutes().toString();
  const end = hour/12 < 1 ? 'am' : 'pm';
  hour = hour % 12 === 0 ? '12' : (hour % 12).toString();

  return `${hour}:${minute} ${end}`;
};
