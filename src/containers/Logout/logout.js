import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actionCreators from '../../store/actions';


class LogOut extends Component {

    componentDidMount() {
        this.props.logOut();
    }

    render() {
        return <Redirect to="/"/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(actionCreators.logOut())
    }
}

export default connect(null, mapDispatchToProps)(LogOut);