import React from 'react';


class DeveloperDropZone extends React.Component {
    constructor(props){
        super(props);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onFileDrop = this.onFileDrop.bind(this);
    }

    onDragOver (e)  {
        e.stopPropagation();
        e.preventDefault();
    }
    
    onDragEnter (e)  {
        e.stopPropagation();
    }
    
    onFileDrop (e) {
        e.stopPropagation();

        console.log("onFileDrop");
        alert("dropped")
    }

    render() {
        const { user} = this.props;
        return (
            <div className='col-xs-4' 
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDrop={e => this.props.assignTaskToUser(user, e)}>
               <div>{user.firstName + ' ' + user.lastName}</div>
               <div className='well'>
               {user.tasks && user.tasks.length>0 ? user.tasks.map(task => <li key={task._id} draggable="true">{task.summary}</li>):'no tasks yet'}
               </div>
            </div>
        );
    }
}



export  {DeveloperDropZone};