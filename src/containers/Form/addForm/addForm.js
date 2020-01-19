import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Aux from '../../../hoc/Aux';
import '../Form.css';

class AddForm extends Component {

    state = {
        hasErrors: true
    };

    componentDidMount() {
        console.log(this.props);
    }

    render() {

        const validationSchema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.mixed().required(),
            description: Yup.string().min(10).required()
        });

        return (
            <Formik initialValues={{name: '', price: '', description: ''}} validationSchema={validationSchema} 
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    let url = 'http://localhost:8080' + this.props.match.url;
                    const token = localStorage.getItem('token');

                    axios.post(url, values, { headers: { "Authorization": token } }).then(Response => {
                        console.log(Response);
                    }).catch(err => {
                        console.log(err);
                    })

                    actions.setSubmitting(false);
                    actions.resetForm();
            }}>
                { ({ handleSubmit, values, handleChange, handleBlur, isSubmitting, touched, errors }) => (
                    <Aux>
                        <div className="myForm">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input onChange={handleChange} onBlur={handleBlur} value={values.name} placeholder="product name" type="text" name="name"/>
                                    { touched.name && errors.name ? <div className="error">{ errors.name }</div> : null }
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input onChange={handleChange} onBlur={handleBlur} value={values.price} placeholder="product price in naira" type="text" name="price"/>
                                    { touched.price && errors.price ? <div className="error">{ errors.price }</div> : null }
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select onChange={handleChange} onBlur={handleBlur} name="category">
                                        <option value="clothes">Clothes</option>
                                        <option value="phones">Phones</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="accessories">Accessories</option>
                                        <option value="cosmetics">Cosmetics</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea onChange={handleChange} onBlur={handleBlur} value={values.description} name="description" placeholder="product description" rows="20" cols="30"></textarea>
                                    { touched.name && errors.name ? <div className="error">{ errors.description }</div> : null }
                                </div>
                                <div className="form-group-opt">
                                    <button type="submit" disabled={isSubmitting} onSubmit={handleSubmit}>Add</button>
                                </div>
                            </form>
                        </div>
                    </Aux>
                )}
            </Formik>
        );
    }
}

export default AddForm;