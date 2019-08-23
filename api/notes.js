import firebase from 'firebase';

export const readPostNotes = (postId) => {
  firebase.database().ref(`/postNotes/${postId}`)
    .on('value', snapshot => {
      const postNotes = snapshot.val();
      const keys = Object.keys(postNotes);
      const sent = {};
      keys.forEach(key => {
        const uid = postNotes[key].uid;
        if (sent[uid]) { return; }

        console.log('k', uid);
        sent[uid] = true;
      });
    }
  );
};
