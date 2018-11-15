import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, taskActions } from '../_actions';


class AdminPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(taskActions.getAll());
    }

    render() {
        const { user, users, tasks } = this.props;
        return (<div>
                 <h3>All tasks:</h3>
                {tasks.loading && <em>Loading tasks...</em>}
                {tasks.error && <span className="text-danger">ERROR: {tasks.error}</span>}
                {tasks.items &&
                    <ul>
                        {tasks.items.map((task, index) =>
                            <li key={task.id}>
                                {task.summary}
                            </li>
                        )}
                    </ul>
                }    
                <hr/>   
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                            </li>
                        )}
                    </ul>
                }
        </div>);
    }
}
function mapStateToProps(state) {
    const { users, authentication, tasks } = state;
    const { user } = authentication;
    return {
        user,
        users,
        tasks
    };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };