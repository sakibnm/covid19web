import React, { Component, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize, scaleSqrt, scaleLog } from "d3-scale";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class LoadEmptyMap extends Component {

    render() {
        return(
            <div>
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => 
                                <Geography key={geo.rsmKey} geography={geo}/>
                            )
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        );
    }
}

export default LoadEmptyMap;