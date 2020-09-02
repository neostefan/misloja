import React, { Component } from  'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../../axios-inst';
import Aux from '../../../hoc/Aux';
import '../Form.css';
import Spinner from '../../../components/Spinner/spinner';

class Register extends Component {

    state = {
        msg: null,
        err: null,
        loading: false
    }

    componentDidMount() {
        this.setState({msg: null, err: null, loading: false});
    }

    submitHandler = (values) => {
        let url = this.props.match.url;

        this.setState({loading: true});

        axios.post(url, values).then(response => {
            this.setState({msg: response.data.msg, err: null, loading: false});
        }).catch(err => {
            this.setState({err: err.response.data, msg: null, loading: false});
        });
    }
    
    render() {

        let cssStyle = "errorsFail";
        if(this.state.err === null) {
            cssStyle = "errorsSuccess"
        }
        
        const validationSchema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(7, 'password should be a min of 7').required(),
            mobile: Yup.string().min(11).max(11).required(),
            store: Yup.string().min(5).required()
        });

        let output = 
        <Formik 
            initialValues={{password: "", email: "", mobile: "", package: "Free", store: '' }}
            validationSchema={validationSchema}>
            {({values, handleChange, errors, touched, handleBlur, isSubmitting }) => (
                <Aux>
                    { this.state.msg ? <div className={cssStyle}>{this.state.msg}</div> : null }
                    { this.state.err ? <div className={cssStyle}>{this.state.err}</div> : null }
                    <div className="myForm">
                        <form onSubmit={() => this.submitHandler(values)}>
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
                            <div className="form-group">
                                <label>Store Name</label>
                                <input name="store" type="text" placeholder="enter a store name" value={values.store} onChange={handleChange} onBlur={handleBlur}/>
                                {touched.store && errors.store && <div className="error">{errors.store}</div>}
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input type="tel" name="mobile" placeholder="enter your mobile number" value={values.mobile} onChange={handleChange} onBlur={handleBlur}/>
                                {touched.mobile && errors.mobile && <div className="error">{errors.mobile}</div>}
                            </div>
                            <div className="form-group">
                                <label>Package</label>
                                <select name="package" value={values.package} onChange={handleChange}>
                                    <option value="Free">Free</option>
                                </select>
                            </div>
                            <div className="form-group-opt">
                                <button type="submit" disabled={isSubmitting}>Sign Up!</button>
                            </div>
                        </form>
                    </div>
                </Aux>
            )}
        </Formik>

        if(this.state.loading === true) {
            output = <Spinner/>
        }

        return output;
    }
}

export default Register;