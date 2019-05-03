export const getTimestampDate = () => {
  const daysOnTimestamp = Math.floor(Date.now()/(1000*60*60*24));
  const timestampDate = daysOnTimestamp * (1000*60*60*24);

  return timestampDate;
};
