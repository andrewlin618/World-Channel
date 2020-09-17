import React from 'react';

const Pool = ({ users }) => {

    return (
        <div className="pool">
            <div className="onlineSign">
                {users.length}
            </div>
            {users.map((user, index) => {
                return (<Card key={index} user={user} />)
            })}
        </div>
    );
}

const Card = ({ user }) => {
    return (
        <div className="status">
            <img src={require("../../../data/avatars/" + user.avatar + ".png")} className='avatar' alt="avatar" />
        </div>
    )
}

export default Pool;