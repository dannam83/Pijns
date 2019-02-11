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
    const friends = snapshot.val();
    const friendKeys = Object.keys(friends);
    const friendPromises = friendKeys.map((key) => {
      return (
        db.ref('users/' + key + '/posts').on('value', snapshot => {
          const posts = snapshot.val();
          const postKeys = Object.keys(posts);

          postKeys.forEach((key) => {
            posts[key]['postId'] = key;
            friendPostsArray.push(posts[key]);
          });
        })
      )
    });

    const results = Promise.all(friendPromises);

    Promise.all(friendPromises)
    .then(() => {
      friendPostsArray.sort((a, b) => a.timestamp - b.timestamp);
      res.send({ friendPostsArray });
      return null;
    })
    .catch(err => console.warn(err))
  })
  return null;
}
