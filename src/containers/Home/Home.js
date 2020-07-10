import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Board from '../../components/Board/Board';
import img1 from '../../assets/datapic.jpg';
import img2 from '../../assets/unique.png';
import './Home.css';

class Home extends Component {
    render() {
        // const formatter = new Intl.NumberFormat('en-NG', {
        //     style: 'currency',
        //     currency: 'NGN'
        // });

        // let package1 = formatter.format(500);
        // let package2 = formatter.format(24000);

        return (
            <Aux>
                <Board {...this.props}/>
                {/* <div className="Packages">
                    <div className="package_card">
                        <h1 id="h1">Lite</h1>
                        <h2>{package1}/Month</h2>
                        <h3 id="h3">Store Url</h3>
                        <h3 id="h3">Analysis of visitors</h3>
                        <h3 id="h3">Analysis of Product views</h3>
                        <h3 id="h3">24/7 support</h3>
                        <button>Sign Up</button>
                    </div>
                    <div className="package_card">
                        <h1 id="h1">Advanced</h1>
                        <h2 id="h3">{package2} once</h2>
                        <h3 id="h3">Marketer</h3>
                        <h3 id="h3">Payments integration</h3>
                        <h3 id="h3">Fully Functional online store</h3>
                        <h3 id="h3">24/7 support</h3>
                        <button>Sign Up</button>
                    </div>
                </div> */}
                <section className="Info">
                    <div className="container">
                        <div className="media">
                            <div className="textbox">
                                <h3 className="textbox-header">Valuable Data</h3>
                                <div className="textbox-body">
                                    Valuable statistical data provided for decision making,
                                    the data provided helps you to further better your brand.
                                </div>
                            </div>
                            <div className="img">
                                <img src={img1} alt="statisticsimg"/>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="Info2">
                    <div className="container">
                        <div className="media">
                            <div className="img">
                                <img src={img2} alt="statisticsimg"/>
                            </div>
                            <div className="textbox">
                                <h3 className="textbox-header">Unique and Personal</h3>
                                <div className="textbox-body">
                                    Here at windo you are given your own brand website, each 
                                    brand gets their own unique url where only your customers
                                    can visit no interference with any other brand.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Aux>
        )
    }
}

export default Home;