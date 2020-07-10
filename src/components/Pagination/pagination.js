import React from 'react';
import './pagination.css';

const pagination = (props) => {

    let prevBtn = null;
    let nextBtn = null;

    let lastPage = Math.ceil(props.totalProducts/props.prodPerPage);
    console.log(lastPage);

    if(lastPage > props.currentPage) {
        nextBtn = <button className="pagination" onClick={props.next}>Next</button>;
    }

    if(props.currentPage !== 1) {
        prevBtn = <button className="pagination" onClick={props.previous}>Prev</button>;
    }

    return (
        <div className="paginationH">
            { prevBtn }
            { nextBtn }
        </div>
    );
}

export default pagination;
