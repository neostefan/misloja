import React from 'react';

const Error = props => {

    let errorMsg;

    Object.keys(props.touched).forEach(key => {
        switch(key) {
            case 'email':
                errorMsg = props.errors.email;
                console.log(key);
                break;
            case 'password':
                errorMsg = props.errors.password;
                break;
            case 'number':
                errorMsg = props.errors.number;
                break;
            default:
                errorMsg = null;
        }
    })

    return (
        <div>
            { errorMsg }
        </div>
    )
}

export default Error;