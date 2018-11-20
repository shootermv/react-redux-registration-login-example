import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
   // STATUS
    case userConstants.CHANGE_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case userConstants.CHANGE_STATUS_SUCCESS:
    console.log('reducer: chnage status success')
      return {
        ...state,
        loading: false,
        user: { ...state.user, tasks: state.user.tasks.map(task =>
          task.id === action.task.id
            ? { ...task }
            : task
        )}
      };
    case userConstants.CHANGE_STATUS_FAILURE:
      return {
        ...state,
        loading: false
      };


    default:
      return state
  }
}