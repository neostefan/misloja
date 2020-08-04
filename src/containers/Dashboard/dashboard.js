import React, { Component } from 'react';
import c3 from 'c3';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Spinner from '../../components/Spinner/spinner';
import Error from '../../components/ErrorPage/Error';
import * as actionCreators from '../../store/actions';
import './dashboard.css';

class DashBoard extends Component {

    componentDidMount() {
        this.props.initDashBoard();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.merchData !== prevProps.merchData) {
            this.chartGeneratorHandler('#prodChart', this.props.prodData, 'name', ['views'], this.props.prodData.length);
            this.timeChartGeneratorHandler(this.props.merchData, '#visitChart', "display", ["views"], 'timeseries', this.props.merchData.length);
        }
    }

    timeChartGeneratorHandler = (data, location, xAxis, yAxis, type, count) => {
        
        let format = null;

        if(type === 'timeseries') {
            format = '%y-%m-%d'
        }

        return c3.generate({
            bindto: location,
            data: {
                json: data,
                keys: {
                    x: xAxis,
                    value: yAxis
                },
                type: 'bar'
            },

            bar: {
                width: {
                    ratio: 0.3
                }
            },

            axis: {
                x: {
                    label: {
                        text: 'Date',
                        position: 'outer-center'
                    },
                    type: type,
                    tick: {
                        rotate: 60,
                        format: format,
                        count: count
                    }
                },

                y: {
                    label: {
                        text: 'No Of Visits',
                        position: 'outer-middle'
                    }
                }
            },

            legend: {
                show: false
            }
        });
    }

    chartGeneratorHandler = (location, data, xAxis, yAxis, count) => {
        return c3.generate({
            bindto: location,
            data: {
                json: data,
                keys: {
                    x: xAxis,
                    value: yAxis
                },
                type: 'bar'
            },

            bar: {
                width: {
                    ratio: 0.3
                }
            },

            axis: {
                x: {
                    type: 'category',
                    label: {
                        text: 'Products',
                        position: 'outer-right'
                    },
                    tick: {
                        rotate: 15,
                        count: count
                    }
                },

                y: {
                    label: {
                        text: 'No Of Views',
                        position: 'outer-middle'

                    }
                }
            }, 

            legend: {
                show: false
            }
        })
    }

    addHandler = () => {
        let url = this.props.match.params.store + "/admin/add";
        this.props.history.push("/" + url);
    }

    render() {
        let merchChart;
        let prodChart;

        if(this.props.merchData !== null) {
            if(this.props.merchData.length < 1) {
                merchChart = <div>No data</div>;
            } else {
                merchChart = ( 
                    <div className="top">
                        <h3>Number of visitors per day</h3>
                        <div className="chart" id="visitChart"></div>
                    </div>
                );
            }
        } else {
            merchChart = <Spinner/>;
        }

        if(this.props.prodData !== null) {
            if(this.props.prodData.length < 1) {
                prodChart = <div>No data</div>;
            } else {
                prodChart = ( 
                    <div className="top">
                        <h3>Number of views per product</h3>
                        <div className="chart" id="prodChart"></div>
                    </div>
                );
            }
        } else {
            prodChart = <Spinner/>;
        }

        return this.props.error ? <Error response={this.props.error.response.data} 
        status={this.props.error.response.status}/> : (
            <Aux>
                <div className="upper">
                    <div className="prodviews">
                        { prodChart }
                    </div>
                </div>
                <div className="mid">
                    <div className="visitorviews">
                       { merchChart }
                    </div>
                    <button onClick={this.addHandler}>Add Product</button>
                </div>
            </Aux>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        prodData: state.products.products,
        error: state.products.error,
        merchData: state.products.merchantData,
        loading: state.products.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        initDashBoard: () => dispatch(actionCreators.fetchMerchantData(ownProps)),
        deleteProduct: (id) => dispatch(actionCreators.deleteProduct(ownProps, id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);