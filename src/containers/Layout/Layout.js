import React, { Component } from 'react';
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
        var backdrop;

        if(this.state.open === true) {
            backdrop = (<Backdrop/>);
        } 

        return (
            <Aux>
                <Navbar clicked={this.onToggleHandler} />
                <Sidedrawer show={this.state.open} click={this.closeDrawerHandler}/>
                {backdrop}
            </Aux>
        );
    }
}

export default Layout;