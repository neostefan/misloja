import React from 'react';
import Aux from '../../hoc/Aux';
import './Error.css';

const Error = props => {
    console.log("I rendered");
    let output = props.show ?  
    <Aux>
        <div className="Error">
            <div className="eCode">
                { props.status }
            </div>
            <div className="eMessage">
                { props.message }
            </div>
        </div>
    </Aux> : null;

    return output
}

export default Error;