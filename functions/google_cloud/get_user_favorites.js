const admin = require('firebase-admin');

module.exports = (req, res) => {
  const userId = req.body.userId;
  const db = admin.database();

  if (!userId) {
    return res.status(422).send({ error: 'No userId' });
  }

  const favoritesArray = [];

  db.ref('userFavorites/' + userId)
  .on('value', snapshot => {
    let favoritesPromises = [];
    const favorites = snapshot.val();

    if (favorites) {
      const favoritesKeys = Object.keys(favorites);

      favoritesPromises = favoritesKeys.map((key) => {
        return (
          db.ref('posts/' + key).on('value', snapshot => {
            const post = snapshot.val();

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

            if (allowedToSee(post)) {
              post['postId'] = key
              favoritesArray.push(post)
            }
          })
        )
      })
    }

    Promise.all(favoritesPromises).then(() => {
      favoritesArray.sort((a, b) => a.timestamp - b.timestamp);
      const favoritesMap = {}
      favoritesArray.forEach(({ postId }, i) => favoritesMap[postId] = i);
      res.send({ favoritesArray, favoritesMap });
      return null;
    })
    .catch(err => console.warn(err))
  })
  return null;
}
