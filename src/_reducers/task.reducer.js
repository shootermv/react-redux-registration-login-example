import { taskConstants } from '../_constants';

export function tasks(state = {}, action) {
  switch (action.type) {
    case taskConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case taskConstants.GETALL_SUCCESS:
      console.log(`action: `, action.tasks)
      return {
        items: action.tasks
      };
    case taskConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case taskConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(task =>
          task.id === action.id
            ? { ...task, deleting: true }
            : task
        )
      };
    case taskConstants.DELETE_SUCCESS:
      // remove deleted task from state
      return {
        items: state.items.filter(task => task.id !== action.id)
      };
    case taskConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to task
      return {
        ...state,
        items: state.items.map(user => {
          if (task.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...taskCopy } = task;
            // return copy of user with 'deleteError:[error]' property
            return { ...taskCopy, deleteError: action.error };
          }

          return task;
        })
      };
    default:
      return state
  }
}