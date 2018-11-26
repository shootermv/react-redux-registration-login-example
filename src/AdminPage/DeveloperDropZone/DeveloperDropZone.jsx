import React from 'react';


class DeveloperDropZone extends React.Component {
    render() {
        const { user} = this.props;
        return (
            <div className='col-xs-4'>
               <div>{user.firstName + ' ' + user.lastName}</div>
               <div className='well'>
               {user.tasks && user.tasks.length>0 ? user.tasks.map(task => <li key={task._id}>{task.summary}</li>):'no tasks yet'}
               </div>
            </div>
        );
    }
}



export  {DeveloperDropZone};