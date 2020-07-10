import React, { Component } from  'react';
import { Formik } from 'formik';
import * as actionCreators from '../../../store/actions';
import * as Yup from 'yup';
import Aux from '../../../hoc/Aux';
import '../Form.css';
import { connect } from 'react-redux';
import Spinner from '../../../components/Spinner/spinner';

class Register extends Component {

    state = {
        hasMessage: false,
        message: null
    }

    switchHandler = () => {
       this.props.history.push("/login");
    }

    submitHandler = (values) => {
        this.props.onAuth(values);
    }
    
    render() {
        let cssStyle = 'errorsSuccess';

        if(this.props.error !== null) {
            cssStyle = 'errorsFail';
        }

        
        const validationSchema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(7).required(),
            mobile: Yup.string().min(11).max(11).required(),
            store: Yup.string().min(5).required()
        });

        let output = 
        <Formik 
            initialValues={{password: "", email: "", mobile: "", package: "Free", store: '' }}
            validationSchema={validationSchema}>
            {({values, handleChange, errors, touched, handleBlur, isSubmitting, handleSubmit}) => (
                <Aux>
                    { this.props.error !== null ? <div className={cssStyle}>{this.props.error.response.data}</div> : null }
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
                                <div onClick={this.switchHandler}>Switch to Log In!</div>
                                <button type="submit" disabled={isSubmitting}>Sign Up!</button>
                            </div>
                        </form>
                    </div>
                </Aux>
            )}
        </Formik>

        if(this.props.loading === true) {
            output = <Spinner/>
        }

        return output;
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAuth: (values) => dispatch(actionCreators.auth(values, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);