import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions, taskActions } from '../_actions';
import {DeveloperDropZone} from './DeveloperDropZone';
import socketIOClient from "socket.io-client";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          summary: '',
          response: false,
          endpoint: "http://localhost:4000"
        }
        
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("status-change", data => {
            console.log('from socket:', data)
            this.setState({ response: data })
        });

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAssignTaskToUser = this.handleAssignTaskToUser.bind(this);
        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
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
    
    handleAssignTaskToUser(user, e) {
        e && e.preventDefault();
        this.props.dispatch(userActions.assign(user, this.props.draggedTask));
    }

    deleteTask(task, e) {
        e && e.preventDefault();
        this.props.dispatch(taskActions.delete(task._id));;
    }

    componentDidMount() {
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(taskActions.getAll());
    }
    
    dragStartHandler(task) {
        this.props.dispatch(taskActions.taskStartedDragging(task));
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
                            <li key={task.id} draggable="true" onDragStart={e => this.dragStartHandler(task)}>
                                <span className="glyphicon glyphicon-th-list"></span> {task.summary} 
                                <a onClick={e => this.deleteTask(task, e)}><span className="glyphicon glyphicon-remove"></span></a>
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
                            <DeveloperDropZone user={user} key={user.id} assignTaskToUser={this.handleAssignTaskToUser}/>
                        )}
                    </div>
                }
        </div>);
    }
}
function mapStateToProps(state) {
    const { users, authentication:{user}, tasks, tasks:{draggedTask} } = state;
    return {
        user,
        users,
        tasks,
        draggedTask
    };
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };