import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, taskActions } from '../_actions';


class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.reload = false;
        this.state = {
          summary: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.save = this.save.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(taskActions.getAll());
    }

    save(e) {
        e.preventDefault();
        this.state.summary && this.props.dispatch(taskActions.createTask(this.state.summary));
    }

    render() {
        const { user, users, tasks } = this.props;
        return (<div>
                <form>
                    <input name="summary" name="summary" value={this.state.summary} placeholder="what is the task"
         onChange={this.handleInputChange}/>
                    <button onClick={e => this.save(e)}>Save</button>
                </form>
                <hr/>
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