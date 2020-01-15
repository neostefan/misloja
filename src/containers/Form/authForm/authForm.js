import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import '../Form.css';

class Form extends Component {

    state = {
        registered: true
    }

    onClickHandler = () => {
        this.setState(prevState => {
            return { registered: !prevState.registered }
        });
    }

    render(){

        let option = ( <button>Log In!</button> );
        let extras = null;

        let tag = "Sign Up!"; 

        if (!this.state.registered) {
            option = ( <button>Sign Up!</button> );
        }

        if(this.state.registered === false) {
            tag = 'Log In!';
            extras =  ( 
                <Aux>
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="tel"/>
                    </div>
                    <div className="form-group">
                        <label>Package</label>
                        <select>
                            <option value="Free">Free</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Institution</label>
                        <select>
                            <option value="University of Lagos">UNILAG</option>
                        </select>
                    </div>
                </Aux>
            );
        }

        return (
            <Aux>
                <div className="myForm">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input placeholder="enter email" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input placeholder="enter password"/>
                        </div>
                        { extras }
                        <div className="form-group-opt">
                            <div onClick={this.onClickHandler}>Switch to { tag }</div>
                            { option }
                        </div>
                    </form>
                </div>
            </Aux>
        );
    }
}

export default Form;