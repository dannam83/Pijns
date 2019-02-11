const admin = require('firebase-admin');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const db = admin.database();

  if (!userId) {
    return res.status(422).send({ error: 'No userId' });
  }

  let friendKeys;
  let friendPostsArray = [];

  db.ref('friends/' + userId)
    .orderByChild('status')
    .equalTo('Unfriend')
    .once('value', snapshot => {
      const friends = snapshot.val();
      friendKeys = Object.keys(friends);

      const getFriendPosts = async () => {
        await Promise.all(friendKeys.map(async key => {
          await db.ref('users/' + userId + '/posts')
          .once('value', snapshot => {
            const posts = snapshot.val();
            const postKeys = Object.keys(posts);

            postKeys.forEach((key) => {
              posts[key]['postId'] = key;
              friendPostsArray.push(posts[key]);
            });
          })
        }))
        res.send({ friendPostsArray });
      }

      getFriendPosts();
    })
  .then(() => {
    friendPostsArray.sort((a, b) => a.timestamp - b.timestamp);
    return null;
  })
  .catch((err) => {
    console.log(err);
  })
  return null;
}
