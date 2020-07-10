import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Spinner from '../../../components/Spinner/spinner';
import Aux from '../../../hoc/Aux';
import * as actionCreators from '../../../store/actions';
import '../Form.css';

class Password extends Component {

    submitNewPassword = (values) => {
        this.props.setPassword(values);
    }

    render() {

        let Style = this.props.error ? "errorsFail" : "errorsSuccess";

        const validationSchema = Yup.object().shape({
            password: Yup.string().min(6).required()
        });

        let output = <Spinner/>;
        if(this.props.loading === false) {
            output = 
                <Formik initialValues={{password: ""}} validationSchema={validationSchema}>
                    {({values, touched, handleSubmit, handleChange, handleBlur, isSubmitting, errors}) => ( 
                        <Aux>
                            { this.props.error ? <div className={Style}>{this.props.error.response.data}</div> : null }
                            { this.props.msg ? <div className={Style}>{this.props.msg}</div> : null }
                            <div className="myForm">
                                <form onSubmit={() => this.submitNewPassword(values)}>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input name="password" type="password" onBlur={handleBlur} onChange={handleChange}
                                        value={values.password} placeholder="Enter a new password"/>
                                        { touched.password && errors.password ? <div className="error">{errors.password}</div> : null }
                                    </div>
                                    <div className="form-group-opt">
                                        <button disabled={isSubmitting} type="submit">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </Aux>
                    )}
                </Formik>
        }

        return output;
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        msg: state.auth.msg
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setPassword: (values) => dispatch(actionCreators.postNewPassword(values, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);