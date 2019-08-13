export const displayTimeAgoShort = (timestamp) => {
  return timeAgo(timestamp);
};

// designed to work with a negative timestamp
const timeAgo = (timestamp) => {
  const secondsAgoPosted = Math.floor((Date.now() + timestamp) / 1000);
  if (secondsAgoPosted < 60) {
    return `${secondsAgoPosted}s`;
  }

  const minutesAgoPosted = Math.floor(secondsAgoPosted / 60);
  if (minutesAgoPosted < 60) {
    return `${minutesAgoPosted}m`;
  }

  const hoursAgoPosted = Math.floor(minutesAgoPosted / 60);
  if (hoursAgoPosted < 24) {
    return `${hoursAgoPosted}h`;
  }

  const daysAgoPosted = Math.floor(hoursAgoPosted / 24);
  if (daysAgoPosted < 7) {
    return `${daysAgoPosted}d`;
  }

  const weeksAgoPosted = Math.floor(daysAgoPosted / 7);

  return `${weeksAgoPosted}w`;
}
