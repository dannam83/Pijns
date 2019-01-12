
// export const googleLogin = () => async dispatch => {
//   let token = await AsyncStorage.getItem('auth_token');
//
//   if (token) {
//     dispatch({ type: LOGIN_SUCCESS, payload: token });
//   } else {
//     await doGoogleLogin(dispatch);
//   }
// };
//
// const doGoogleLogin = async dispatch => {
//   let { type, accessToken } = await Google.logInAsync({
//     androidClientId: '800234801651-eo6nj683dgn5b8otcpft96k3itfbe5in.apps.googleusercontent.com',
//     iosClientId: '800234801651-00t8f3m9ju45hmt3fj5jorduolmjpjie.apps.googleusercontent.com',
//     scopes: ['profile', 'email'],
//   });
//
//   if (type === 'cancel') {
//     console.log('cancelled');
//     return dispatch({ type: LOGIN_FAIL });
//   }
//
//   const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);
//
//   firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
//     console.warn(error);
//   });
//
//   await AsyncStorage.setItem('auth_token', accessToken);
//   dispatch({ type: LOGIN_SUCCESS, payload: accessToken });
// };
