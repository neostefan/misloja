import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import '../Form.css';

class AddForm extends Component {

    state = {
        hasErrors: true
    };

    render() {

        let error;

        if(this.state.hasErrors) {
            error = (<div className="error">message some very long something</div>)
        }

        return (
            <Aux>
                { error }
                <div className="myForm">
                    <form>
                        <div className="form-group">
                            <label>Name</label>
                            <input placeholder="product name" type="text"/>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input placeholder="product price in naira" type="text"/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select>
                                <option value="clothes">Clothes</option>
                                <option value="phones">Phones</option>
                                <option value="shoes">Shoes</option>
                                <option value="accessories">Accessories</option>
                                <option value="cosmetics">Cosmetics</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea placeholder="product description" rows="20" cols="30"></textarea>
                        </div>
                        <div className="form-group-opt">
                            <button type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </Aux>
        );
    }
}

export default AddForm;