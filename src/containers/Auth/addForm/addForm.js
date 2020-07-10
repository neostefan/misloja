import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions';
import axios from '../../../axios-inst';
import Aux from '../../../hoc/Aux';
import '../Form.css';

class AddForm extends Component {

    state = { 
        name: "",
        description: "",
        category: "clothes",
        price: 0,
        file: null
    }

    componentDidMount() {
        if(this.props.location.search) {
            let url = this.props.match.url + this.props.location.search; 
            
            const token = localStorage.getItem('token');

            axios.get(url, { headers: { "Authorization": token } }).then(Response => {
                this.setState({ name: Response.data.product.name, description: Response.data.product.description,
                category: Response.data.product.category, price: Response.data.product.price });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    handleChange = (e) => {
        this.setState({images: e.target.files});
    }

    render() {

        const validationSchema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            description: Yup.string().min(10).required()
        });

        return (
            <Formik enableReinitialize initialValues={{name: this.state.name, price: +this.state.price, description: this.state.description, category: 'clothes' || this.state.category, image: null}} validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true);

                    let fd = new FormData();

                    fd.append('name', values.name);
                    fd.append('category', values.category);
                    fd.append('description', values.description);
                    fd.append('price', values.price);
                    if(this.state.images !== undefined) {
                        for(let i = 0; i < this.state.images.length; i++) {
                            fd.append("images", this.state.images[i]);
                        }
                    }
                    
                    if(this.props.location.search) {
                        this.props.EditProduct(this.props.location.search.id, fd);
                    } else {
                        this.props.CreateProduct(fd);
                    }

                    actions.setSubmitting(false);
                    actions.resetForm(); }}>
                {({ handleSubmit, values, handleChange, handleBlur, isSubmitting, touched, errors }) => (
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
                                    <label>Images</label>
                                    <input name="images" onChange={this.handleChange} accept=".png, .jpg, .jpeg" onBlur={handleBlur} type="file" multiple/>
                                </div>
                                <div className="form-group">
                                    <label>Category</label>
                                    <select onChange={handleChange} value={values.category}  onBlur={handleBlur} name="category">
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
                                    <button type="submit" disabled={isSubmitting}>Add</button>
                                </div>
                            </form>
                        </div>
                    </Aux>
                )}
            </Formik>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.products.error
    }
} 

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        EditProduct: (id, fd) => dispatch(actionCreators.editProduct(ownProps, id, fd)),
        CreateProduct: (fd) => dispatch(actionCreators.createProduct(ownProps, fd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);