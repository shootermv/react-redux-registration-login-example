import { taskConstants } from '../_constants';
import { taskService } from '../_services';
/*
import { alertActions } from './';
import { history } from '../_helpers';
*/

export const taskActions = {
    getAll,
    delete: _delete
};


function getAll() {
    return dispatch => {
        dispatch(request());

        taskService.getAll()
            .then(
                tasks => dispatch(success(tasks)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: taskConstants.GETALL_REQUEST } }
    function success(tasks) { 
        console.log(`tasks service:`, tasks)
        return { type: taskConstants.GETALL_SUCCESS, tasks }
     }
    function failure(error) { return { type: taskConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        taskService.delete(id)
            .then(
                task => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: taskConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: taskConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: taskConstants.DELETE_FAILURE, id, error } }
}