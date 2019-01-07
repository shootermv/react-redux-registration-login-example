import * as actions from './alert.actions';
import * as types from '../_constants/alert.constants';

describe('actions', () => {
  it('should create an action success', () => {
    const message = 'success!'
    const expectedAction = {
      type: types.alertConstants.SUCCESS,
      message
    }
    expect(actions.alertActions.success(message)).toEqual(expectedAction)
  })
})