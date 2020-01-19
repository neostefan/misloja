import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import '../Form.css';
import axios from 'axios';
import Aux from '../../../hoc/Aux';

class UserForm extends Component {

    state = {
        hasErrors: false,
        hasMessage: false,
        message: null
    }

    onClickHandler = () => {
        console.log(this.props.match.url);
        this.props.history.push('/login');
    }

    render() {
        const validationSchema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(7)
        });

        return (
            <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    let url = "http://localhost:8080" + this.props.match.url;
                    axios.post(url, values).then(Response => {
                        this.setState({ hasMessage: true, message: Response.data.msg });
                    }).catch(err =>  {
                        this.setState({hasErrors: true, message: err});
                    })
                    actions.setSubmitting(false);
                    actions.resetForm();
                }}>
                {({values, touched, handleSubmit, handleBlur, handleChange, errors, isSubmitting}) => (
                    <Aux>
                        { this.state.hasMessage ? <div>{this.state.message}</div> : null }
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

export default UserForm;