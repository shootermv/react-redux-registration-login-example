import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class PrivatePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    changeStatus(user, task) {
        return () => this.props.dispatch(userActions.changeStatus(user, task));
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>Tasks for you:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {user.tasks && user.tasks.length ?
                    <ul>
                        {user.tasks.map((task, index) =>
                            <li key={task._id}>
                                {task.summary} <a onClick={this.changeStatus(user, task)}>{task.status === 0 ? 'new' : task.status === 1 ? 'in process' : 'done'}</a>                      
                            </li>
                        )}
                    </ul> : 'No tasks yet'
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedPrivatePage = connect(mapStateToProps)(PrivatePage);
export { connectedPrivatePage as PrivatePage };