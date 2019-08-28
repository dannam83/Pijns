export const formatChatKey = (userId, friendId) => {
  let small; let big;

  if (userId < friendId) {
    [small, big] = [userId, friendId];
  } else {
    [small, big] = [friendId, userId];
  }
  return (small + big);
};
