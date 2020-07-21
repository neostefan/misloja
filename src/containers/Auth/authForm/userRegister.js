import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as actionCreators from '../../../store/actions';
import Aux from '../../../hoc/Aux';
import '../Form.css';

class UserForm extends Component {

    onClickHandler = () => {
        this.props.history.push('/login');
    }

    render() {

        let Style = this.props.error ? "errorsFail" : "errorsSuccess";

        const validationSchema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(7)
        });

        return (
            <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    
                    this.props.onAuth(values);

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}>
                {({values, touched, handleSubmit, handleBlur, handleChange, errors, isSubmitting}) => (
                    <Aux>
                        { this.props.error ? <div className={Style}>{this.props.error}</div> : null }
                        { this.props.msg ? <div className={Style}>{this.props.msg}</div> : null }
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input name="email" type="text" placeholder="enter email" value={values.email} 
                                    onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.email && errors.email && <div className="error">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input name="password" type="password" placeholder="enter password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.password && errors.password && <div className="error">{errors.password}</div>}
                                </div>
                                <div className="form-group-opt">
                                    <div onClick={this.onClickHandler}>Switch to Log In!</div>
                                    <button type="submit" disabled={isSubmitting}>Sign Up!</button> 
                                </div>
                            </form>
                        </div>
                    </Aux>
                )}
            </Formik>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        msg: state.auth.msg,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAuth: (values) => dispatch(actionCreators.auth(values, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);