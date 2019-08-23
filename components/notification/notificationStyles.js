import { Dimensions } from 'react-native';

import { buttonBlue } from '../../assets/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = {
  requestStyle: {
    flexDirection: 'row',
    flex: 1
  },
  messageStyle: {
    width: SCREEN_WIDTH - 300,
    fontSize: 15
  },
  nameStyle: {
    fontWeight: '600'
  },
  actionsViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  acceptButtonStyle: {
    width: 75,
    height: 25,
    backgroundColor: buttonBlue,
    borderColor: buttonBlue,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 17
  },
  acceptTextStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    color: 'white',
    fontWeight: '500',
    fontSize: 14
  },
  xStyle: {
    paddingBottom: 2,
    fontWeight: '700',
    fontSize: 14
  },
};
