import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Navbar from '../../components/Navigation/Navbar';
import Backdrop from '../../components/Backdrop/Backdrop';
import Sidedrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        open: false
    };

    onToggleHandler = () => {
        this.setState(prevState => {
            return {open: !prevState.open};
        });
    }

    closeDrawerHandler = () => {
        this.setState({open: false});
    }


    render() {
        let backdrop;
       

        if(this.state.open === true) {
            backdrop = (<Backdrop/>);
        }

        return (
            <Aux>
                <Navbar clicked={this.onToggleHandler} isLoggedIn={this.props.isLoggedIn}
                logOut={() => this.props.logOut()} isAuth={this.props.isAuthenticated}/>
                <Sidedrawer show={this.state.open} click={this.closeDrawerHandler} isLoggedIn={this.props.isLoggedIn}
                isAuth={this.props.isAuthenticated}/>
                {backdrop}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null,
        isAuthenticated: state.auth.merchantToken !== null
    }
}
export default connect(mapStateToProps)(Layout);