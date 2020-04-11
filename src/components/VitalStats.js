import React, {Component} from 'react';
import FeatherIcon from 'feather-icons-react';
import Item from "./Item";
class VitalStats extends Component {
    state = {
        item: Item
    }
    render() {
        this.state.item = this.props.itemSend;
        // let confirmedCases = this.state.item.getConfirmed();
        // let deaths = this.state.item.getDeaths();
        // let recovered = this.state.item.getRecovered();
        // console.log(this.state.item.confirmed)
        return (
            <div>
            
                <div>
                    <div className="row">
                        <div className="col-lg-4 mb-5 mb-lg-n10">
                            <a className="card lift h-100" href="#!"
                            >
                                <div className="card-body p-3">
                                    <div className="card-title small mb-0">
                                        <h4 style={{color: "orange"}}>Confirmed Cases</h4>
                                    </div>
                                    <div style={{color: "orange"}}>
                                        {this.state.item.confirmed}
                                    </div>
                                </div>
                            </a
                            >
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-n10">
                            <a className="card lift h-100" href="#!"
                            >
                                <div className="card-body p-3">
                                    <div className="card-title small mb-0">
                                        <h4 style={{color: "red"}}>Deaths</h4>
                                    </div>
                                    <div style={{color: "red"}}>
                                        {this.state.item.deaths}
                                    </div>
                                </div>
                            </a
                            >
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-n10">
                            <a className="card lift h-100" href="#!"
                            >
                                <div className="card-body p-3">
                                    <div className="card-title small mb-0">
                                        <h4 style={{color: "green"}}>Recovered</h4>
                                    </div>
                                    <div style={{color: "green"}}>
                                        {this.state.item.recovered}
                                    </div>
                                </div>
                            </a
                            >
                        </div>
                        {/*<div className="col-xl-3 col-lg-4 col-md-6 mb-5">*/}
                        {/*    <a className="card lift h-100" href="#!"*/}
                        {/*    >*/}
                        {/*        <div className="card-flag card-flag-dark card-flag-top-right card-flag-lg">$19</div>*/}
                        {/*        <img className="card-img-top" src="https://source.unsplash.com/MCUOp3o4dgk/800x500"*/}
                        {/*             alt="..."/>*/}
                        {/*        <div className="card-body p-3">*/}
                        {/*            <div className="card-title small mb-0">Assorted Skin Care</div>*/}
                        {/*            <div className="text-xs text-gray-500">Waterlow, CO &middot; 29 minutes ago</div>*/}
                        {/*        </div>*/}
                        {/*    </a*/}
                        {/*    >*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div id="layoutDefault_teaching" className="container-vspace-6">

                </div>

                {/*<div className="container-vspace">*/}

                {/*</div>*/}
            </div>
            
        );
    }
}
export default VitalStats;