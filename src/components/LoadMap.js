import React, {Component} from 'react';
import { VectorMap } from "react-jvectormap"

class LoadMap extends Component {
    sendCountry = (country) => {
        this.props.callBackCountry(country);
    }

    state = {
        mapData: {},
        countries: [],
        itemList: this.props.itemList
    }



    render() {
        return (
            <div></div>
        )
    }
}
// Testing
export default LoadMap;