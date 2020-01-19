import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import * as Yup from 'yup';
import '../Form.css';

class Form extends Component {

    state = {
        hasErrors: false
    }

    onClickHandler = () => {
        this.props.history.push("/signup");
    }

    componentDidMount() {
        console.log(this.props);
    }


    render(){

        const validationSchema = Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().min(6).required()
        })

        return (
            <Formik initialValues={{email: "", password: ""}} validationSchema={validationSchema} 
                onSubmit={(values, actions) => {

                    let url = 'http://localhost:8080' + this.props.match.url;
                    actions.setSubmitting(true);
                    console.log(url);
                    axios.post(url, values).then(Response => {
                        localStorage.setItem('token', Response.data.token);
                        if(Response.data.isUser) {
                            this.props.history.push({
                                pathname: '/'
                            });
                        }
                        
                        this.props.history.push({
                            pathname: '/' + this.props.match.params.store + '/admin/',
                            state: { isMerchant: true }
                        })
                        
                    }).catch(err => {
                        console.log(err);
                    });

                    actions.setSubmitting(false);
                    actions.resetForm();
                }}>
                {({values, touched, isSubmitting, handleBlur, handleChange, handleSubmit, errors}) => (
                    <Aux>
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
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
                                    <div onClick={this.onClickHandler}>Switch to Sign Up!</div>
                                    <button type="submit" disabled={isSubmitting}>Log In!</button>
                                </div>
                            </form>
                        </div>
                    </Aux>
                )}
            </Formik>
        );
    }
}

export default Form;