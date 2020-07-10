import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as actionCreators from '../../../store/actions/auth';
import Aux from '../../../hoc/Aux';
import Spinner from '../../../components/Spinner/spinner';
import '../Form.css';

class Form extends Component {

    state = {
        isSignUp: false
    }

    resetHandler = () => {
        this.props.history.push("/reset-password");
    }

    switchHandler = () => {
        this.setState(prevState => !prevState.isSignUp);
        this.props.history.push("/signup");
    }

    submitHandler = (values) => {
        this.props.onAuth(values);
    }

    render(){
        let Class = this.props.error ? "errorsFail" : "errorsSuccess";

        const validationSchema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().min(6).required()
        })

        let output = 
            <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema}>
            {({values, touched, isSubmitting, handleBlur, handleChange, handleSubmit, errors}) => (
                <Aux>
                    { this.props.error ? <div className={Class}>{this.props.error.response.data}</div> : null }
                    <div className="myForm">
                        <form onSubmit={() => this.submitHandler(values)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="text" placeholder="enter email" value={values.email} 
                                onChange={handleChange} onBlur={handleBlur}/>
                                { touched.email && errors.email ? <div className="error">{errors.email}</div> : null }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" placeholder="enter password" value={values.password}
                                onBlur={handleBlur} onChange={handleChange}/>
                                { touched.password && errors.password ? <div className="error">{errors.password}</div> : null }
                            </div>
                            <div className="form-group-opt">
                                <div onClick={this.switchHandler}>Switch to {this.state.isSignUp ? "Log-In" : "Sign-Up"}</div>
                                <button type="submit" disabled={isSubmitting}>Log In!</button>
                                <div onClick={this.resetHandler}>Forgot Password ?</div>
                            </div>
                        </form>
                    </div>
                </Aux>
            )}
        </Formik>

        if(this.props.loading) {
            output = <Spinner/>
        }

        return ( output );
    }
}

const MapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.token != null
    }
}

const MapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAuth: (values) => dispatch(actionCreators.auth(values, ownProps))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Form);