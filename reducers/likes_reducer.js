// import _ from 'lodash';
// import { REHYDRATE } from 'redux-persist/lib/constants';
// import {
//   LIKE_JOB,
//   CLEAR_LIKED_JOBS
// } from '../actions/types';
//
// export default function (state = [], action) {
//   switch (action.type) {
//     case REHYDRATE:
//       if (action.payload) {
//         return action.payload.likedJobs;
//       }
//       return [];
//     case LIKE_JOB:
//       return _.uniqBy([
//         action.payload, ...state
//       ], 'jobkey');
//     case CLEAR_LIKED_JOBS:
//       return [];
//     default:
//       return state;
//   }
// }
