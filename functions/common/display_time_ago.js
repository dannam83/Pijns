export const displayTimeAgo = (timestamp, createdOn) => {
  // const secondsAgoPosted = Math.floor((Date.now() + timestamp) / 1000);
  // if (secondsAgoPosted < 60) {
  //   return `${secondsAgoPosted} second${secondsAgoPosted === 1 ? '' : 's'} ago`;
  // }
  // const minutesAgoPosted = Math.floor(secondsAgoPosted / 60);
  // if (minutesAgoPosted < 60) {
  //   return `${minutesAgoPosted} minute${minutesAgoPosted === 1 ? '' : 's'} ago`;
  // }
  // const hoursAgoPosted = Math.floor(minutesAgoPosted / 60);
  // if (hoursAgoPosted < 24) {
  //   return `${hoursAgoPosted} hour${hoursAgoPosted === 1 ? '' : 's'} ago`;
  // }
  // const daysAgoPosted = Math.floor(hoursAgoPosted / 24);
  // if (daysAgoPosted <= 30) {
  //   return `${daysAgoPosted} day${daysAgoPosted === 1 ? '' : 's'} ago`;
  // }
  // return createdOn;
  const ago = timeAgo(timestamp);
  return ago === 'x' ? formatDate(createdOn) : ago;
};

const timeAgo = (timestamp) => {
  const secondsAgoPosted = Math.floor((Date.now() + timestamp) / 1000);
  if (secondsAgoPosted < 60) {
    return `${secondsAgoPosted} second${secondsAgoPosted === 1 ? '' : 's'} ago`;
  }

  const minutesAgoPosted = Math.floor(secondsAgoPosted / 60);
  if (minutesAgoPosted < 60) {
    return `${minutesAgoPosted} minute${minutesAgoPosted === 1 ? '' : 's'} ago`;
  }

  const hoursAgoPosted = Math.floor(minutesAgoPosted / 60);
  if (hoursAgoPosted < 24) {
    return `${hoursAgoPosted} hour${hoursAgoPosted === 1 ? '' : 's'} ago`;
  }

  const daysAgoPosted = Math.floor(hoursAgoPosted / 24);
  if (daysAgoPosted <= 30) {
    return `${daysAgoPosted} day${daysAgoPosted === 1 ? '' : 's'} ago`;
  }

  return 'x';
}

const formatDate = (date) => {
  const monthDay = date.slice(4, 10);
  const year = date.slice(11, 16);
  return `${monthDay}, ${year}`;
}
