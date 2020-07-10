import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as actionCreators from '../../../store/actions/auth';
import Aux from '../../../hoc/Aux';
import Spinner from '../../../components/Spinner/spinner';
import '../Form.css';

class Form extends Component {

    handleSubmit = (values) => {
        this.props.postEmail(values);
    }

    render(){
        let Class = this.props.error ? "errorsFail" : "errorsSuccess";

        const validationSchema = Yup.object().shape({
            email: Yup.string().required()
        });

        let output = 
            <Formik initialValues={{email: ""}} validationSchema={validationSchema}>
            {({values, touched, isSubmitting, handleBlur, handleChange, handleSubmit, errors}) => (
                <Aux>
                    { this.props.msg ? <div className={Class}>{this.props.msg}</div> : null }
                    { this.props.error ? <div className={Class}>{this.props.error.response.data}</div> : null }
                    <div className="myForm">
                        <form onSubmit={() => this.handleSubmit(values)}>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="text" placeholder="enter email" value={values.email} 
                                onChange={handleChange} onBlur={handleBlur}/>
                                { touched.email && errors.email ? <div className="error">{errors.email}</div> : null }
                            </div>
                            <div className="form-group-opt">
                                <button type="submit" disabled={isSubmitting}>SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </Aux>
            )}
        </Formik>

        return ( this.props.loading ? <Spinner/> : output );
    }
}

const MapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        msg: state.auth.msg
    }
}

const MapDispatchToProps = (dispatch, ownProps) => {
    return {
        postEmail: (values) => dispatch(actionCreators.postResetEmail(values, ownProps))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Form);