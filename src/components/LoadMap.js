import React, { Component, useState, useEffect } from "react";
import { Graticule,ZoomableGroup, ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize, scaleSqrt, scaleLog, scaleBand, scaleLinear, scaleSequential, scaleQuantile, scaleOrdinal } from "d3-scale";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const { getCode, getName } = require('country-list');
const colorScale = scaleLog()
  .domain([1, 6])
  .range([
    "#ffedea",
    "#ffcec5",
    // "#ffad9f",
    "#ff8a75",
    // "#ff5533",
    "#e2492d",
    // "#be3d26",
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
    
    setTooltipContent = (item) =>{
        this.props.callBackCountry(item);
    }

    setSelectedCountry = (item) =>{
        console.log("From the Selected Country"+item.toString())
        this.props.callbackSelectCountry(item);
    }

    state = {
        mapData: {},
        countries: [],
        itemList: this.props.itemList,
        data: [],
        cur: null,
        hoveredItem: null,
        selectedItem: null
    }



    render() {
        return (
            <div>
                <ComposableMap >
                    <ZoomableGroup>
                    <Graticule stroke="#EAEAEC" />
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo => {
                                    // console.log(getCode("Congo"))
                                    for(var i =0;i<this.state.itemList.length;i++){
                                        if(this.state.itemList[i].country!="Antarctica" || this.state.itemList[i].country!="Tajikistan")
                                            if (getCode(this.state.itemList[i].country) === geo.properties.ISO_A2){
                                                this.state.cur = this.state.itemList[i];
                                                break;
                                            }
                                    }
                                    // console.log(this.state.cur)
                                    // console.log(this.state.cur)
                                    // const cur = this.data.find(s => s.id === geo.id);
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={
                                                colorScale(this.state.cur ? this.state.cur.confirmed : "#FAF0EE")
                                            }
                                            style={{
                                                hover: {
                                                   fill: "#362EE3",
                                                   stroke: "#607D8B",
                                                   strokeWidth: 1,
                                                   outline: "none",
                                                },
                                                pressed: {
                                                   fill: "#362EE3",
                                                   stroke: "#607D8B",
                                                   strokeWidth: 1,
                                                   outline: "none",
                                                }
                                            }}
                                            stroke="#EAEAEC"
                                            onMouseEnter = {() => {                                        
                                                this.state.ISO_A2 = geo.properties.ISO_A2;
                                                // console.log(this.state.ISO_A3)
                                                
                                                for(var i =0;i<this.state.itemList.length;i++){
                                                    if(getCode(this.state.itemList[i].country)==="CG" && this.state.ISO_A2==="CD"){
                                                        this.state.hoveredItem = this.state.itemList[i];
                                                        break;
                                                    }
                                                    if(this.state.itemList[i].country!="Antarctica"|| this.state.itemList[i].country!="Tajikistan")if (getCode(this.state.itemList[i].country) === this.state.ISO_A2){
                                                        this.state.hoveredItem = this.state.itemList[i];
                                                        break;
                                                    }else{
                                                        this.state.hoveredItem = null
                                                    }
                                                }
                                                this.setTooltipContent(this.state.hoveredItem);
                                                // console.log(`${this.state.NAME} — ${rounded(this.state.CONFIRMED)}`)
                                            }}
                                            onClick = {() =>{
                                                for(var i =0;i<this.state.itemList.length;i++){
                                                    if(getCode(this.state.itemList[i].country)==="CG" && this.state.ISO_A2==="CD"){
                                                        this.state.selectedItem = this.state.itemList[i];
                                                        this.setSelectedCountry(this.state.selectedItem) 
                                                        break;
                                                    }
                                                    if(this.state.itemList[i].country!="Antarctica" || this.state.itemList[i].country!="Tajikistan")if (getCode(this.state.itemList[i].country) === this.state.ISO_A2){
                                                        this.state.selectedItem = this.state.itemList[i];
                                                        this.setSelectedCountry(this.state.selectedItem) 
                                                        break;
                                                    }
                                                }  
                                                   
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