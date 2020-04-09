import React, { Component, useState, useEffect } from "react";
import { ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize, scaleSqrt, scaleLog } from "d3-scale";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLog()
  .domain([1, 7])
  .range([
    "#ffedea",
    "#ffcec5",
    "#ffad9f",
    "#ff8a75",
    "#ff5533",
    "#e2492d",
    "#be3d26",
    "#9a311f",
    "#782618"
  ]);
  const rounded = num => {
    if (num > 1000000000) {
        return Math.round(num / 100000000) / 10 + "Bn";
    } else if (num > 1000000) {
        return Math.round(num / 100000) / 10 + "M";
    } else if (num > 1000){
        return Math.round(num / 100) / 10 + "K";
    } else{
        return num+""
    }
  };
class LoadMap extends Component {
    
    setTooltipContent = (string) =>{
        this.props.callBackCountry(string);
    }

    state = {
        mapData: {},
        countries: [],
        itemList: this.props.itemList,
        data: [],
        cur: null,
        NAME: "",
        CONFIRMED: "",
    }



    render() {
        return (
            <div>
                <ComposableMap >
                    <ZoomableGroup>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo => {

                                    for(var i =0;i<this.state.itemList.length;i++){
                                        if(this.state.itemList[i].country === geo.properties.NAME){
                                            this.state.cur = this.state.itemList[i];
                                        }
                                    }
                                    // console.log(this.state.cur)
                                    // const cur = this.data.find(s => s.id === geo.id);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={colorScale(this.state.cur ? this.state.cur.confirmed : "#EEE")}
                                            onMouseEnter = {() => {
                                                this.state.NAME = geo.properties.NAME;
                                                this.state.CONFIRMED = 0;
                                                for(var i =0;i<this.state.itemList.length;i++){
                                                    if(this.state.itemList[i].country === this.state.NAME){
                                                        this.state.CONFIRMED = this.state.itemList[i].confirmed;
                                                    }
                                                }
                                                this.setTooltipContent(`${this.state.NAME} — ${rounded(this.state.CONFIRMED)}`);
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>

            </div>
        )
    }
}
// Testing
export default LoadMap;