import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, taskActions } from '../_actions';
import {DeveloperDropZone} from './DeveloperDropZone';
 
class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.reload = false;
        this.state = {
          summary: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAssignTaskToUser = this.handleAssignTaskToUser.bind(this);
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
    
    handleAssignTaskToUser(user, task, e) {
        e && e.preventDefault();
        console.log(user, task);
        this.props.dispatch(userActions.assign(user, task));
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(taskActions.getAll());
    }

    save(e) {
        e.preventDefault();
        this.state.summary && this.props.dispatch(taskActions.createTask(this.state.summary));
        this.setState({summary:''});
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
                 <h3>Unassigned tasks:</h3>
                {tasks.loading && <em>Loading tasks...</em>}
                {tasks.error && <span className="text-danger">ERROR: {tasks.error}</span>}
                {tasks.items && tasks.items.length ?
                    <ul>
                        {tasks.items.map((task, index) =>
                            <li key={task.id} draggable="true">
                                {task.summary} 
                                <a onClick={e => this.handleAssignTaskToUser(users.items[1], task, e)}>Assign</a>
                            </li>
                        )}
                    </ul> : 'No tasks yet'
                }    
                <hr/>   
                <h3>Developers:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <div className='row'>
                        {users.items.filter(u => u.role !== 'admin').map((user, index) =>
                            <DeveloperDropZone user={user} key={user.id} />
                        )}
                    </div>
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