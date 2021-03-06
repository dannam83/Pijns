const admin = require('firebase-admin');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const db = admin.database();

  if (!userId) {
    return res.status(422).send({ error: 'No userId' });
  }

  const friendPostsArray = [];

  db.ref('friends/' + userId)
  .orderByChild('status')
  .equalTo('Unfriend')
  .on('value', snapshot => {
    let friendPromises = [];
    const friends = snapshot.val();

    if (friends) {
      const friendKeys = Object.keys(friends);
      friendKeys.push(userId);

      friendPromises = friendKeys.map((key) => {
        return (
          db.ref('users/' + key + '/posts').on('value', snapshot => {
            const posts = snapshot.val();
            const postKeys = Object.keys(posts);

            const allowedToSee = post => {
              if (post.deleted) { return false; }
              if (post.author.id === userId) { return true; }
              if (post.visibleTo === 'Only Me') { return false; }
              if (post.visibleTo === 'Tagged Friends') {
                const { taggedFriends } = post;
                if (!taggedFriends || !taggedFriends[userId]) { return false; }
              }
              return true;
            }

            postKeys.forEach((key) => {
              if (allowedToSee(posts[key])) {
                posts[key]['postId'] = key;
                friendPostsArray.push(posts[key]);
              }
            });
          })
        )
      })
    }

    Promise.all(friendPromises).then(() => {
      friendPostsArray.sort((a, b) => a.timestamp - b.timestamp);
      const friendPostsMap = {}
      friendPostsArray.forEach(({ postId }, i) => friendPostsMap[postId] = i);
      res.send({ friendPostsArray, friendPostsMap });
      return null;
    })
    .catch(err => console.warn(err))
  })
  return null;
}
