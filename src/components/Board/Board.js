import React from 'react';
import img from '../../assets/mislojaM.png';
import './Board.css';

const Board = (props) => {
    // let formatter = new Intl.NumberFormat('en-NG', {
    //     style: "currency",
    //     currency: 'NGN'
    // });

    // let price = formatter.format(1200);

    let signUpHandler = () => {
        props.history.push('/merchant/signup');
    }

    return (
        <div className="Board">
            <img alt="mainimage" src={img}/>
            <div className="Content">
                <h2>Are you a small business owner thinking of making your own brand ?</h2>
                <h2>Are you interested in owning your own website but not enough cash on hand ?</h2>
                <h2>Interested in having some insight on what product sells, how many customers do i have ?</h2>
                <h1>Then join us today by creating a merchant account</h1>
                <button className="Board_btn" onClick={signUpHandler}>JOIN</button>
            </div>
        </div>
    )
}

export default Board;