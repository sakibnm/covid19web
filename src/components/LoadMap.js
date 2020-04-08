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
        console.log(this.state.itemList)
        const { getCode, getName } = require('country-list');

        setTimeout(()=> { Array.from(document.getElementsByClassName("jvectormap-tip")).forEach((el) => { el.style.display = 'none' }); },100);

        for (var i=0;i<this.state.itemList.length;i++){
            let item = this.state.itemList[i];
            console.log(this.state.itemList)
            // this.setState({...this.state, isFetching: false,itemList: this.itemList})
            this.state.mapData[getCode(item.getCountry())] = item.getConfirmed()
            this.state.countries[i] = getCode(item.getCountry())
        }
        // console.log(this.state.mapData)

        const handleClick = (e, countryCode) => {
            // console.log(selectedRegions)
            for (var i=0;i< this.state.itemList.length;i++){
                let item = this.state.itemList[i]
                if (getCode(item.getCountry()) === countryCode){
                    this.sendCountry(item)
                }
            }
        };

        return(
            <div id="mapContainer">

                <div className="map">
                <VectorMap
                    map={"world_mill"}

                    backgroundColor="" //change it to ocean blue: #0077be
                    containerStyle={{
                        width: "100%",
                        height: "520px"
                    }}

                    onRegionClick={handleClick} //gets the country code
                    containerClassName="map"
                    regionStyle={{
                        initial: {
                            fill: "#e4e4e4",
                            "fill-opacity": 0.9,
                            stroke: "1px",
                            "stroke-width": 0,
                            "stroke-opacity": 0
                        },
                        hover: {
                            fill: "#0403ee",
                            "fill-opacity": 0.5,

                        },
                        selected: {

                            fill: "#2938bc" //color for the clicked country
                        }
                    }}
                    panOnDrag={true}
                    regionsSelectableOne={true}
                    regionsSelectable={true}
                    series={{
                        regions: [
                            {
                                values: this.state.mapData, //this is your data
                                scale: ["#fff9c6", "#ff002a"], //your color game's here
                                normalizeFunction: "polynomial"
                            }
                        ]
                    }}
                    zoomOnScroll = {true}
                    zoomAnimate={true}

                    // labels={
                    //     {
                    //         regions: {
                    //             render: function (code) {
                    //                 // var doNotShow = ['US-RI', 'US-DC', 'US-DE', 'US-MD'];
                    //
                    //                 return code;
                    //
                    //             },
                    //             offsets: function (code) {
                    //                 return {
                    //                     'US': [-270, 25],
                    //                     'FR': [60, -55],
                    //                     'IN': [-10, 0]
                    //
                    //                 }[code];
                    //             }
                    //         }
                    //     }
                    // }
                    // regionLabelStyle={
                    //     {
                    //         initial: {
                    //             'font-family': 'Verdana',
                    //             'font-size': '8',
                    //             'font-weight': 'regular',
                    //             cursor: 'default',
                    //             fill: 'black'
                    //         },
                    //         hover: {
                    //             cursor: 'pointer',
                    //             'font-family': 'Verdana',
                    //             'font-size': '12',
                    //             'font-weight': 'regular',
                    //             fill: 'red'
                    //         }
                    //     }
                    // }
                />
                </div>
            </div>
        )
    }
}

export default LoadMap;