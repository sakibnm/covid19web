import React, {Component} from 'react';
import { VectorMap } from "react-jvectormap"

class LoadEmptyMap extends Component {

    render() {
        return(
            <div id="mapContainer">

                <div id="map">
                    <VectorMap
                        map={"world_mill"}
                        backgroundColor="" //change it to ocean blue: #0077be
                        containerStyle={{
                            width: "100%",
                            height: "520px"
                        }}
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
                        regionsSelectableOne={true}
                        regionsSelectable={true}
                        zoomOnScroll = {true}
                        zoomAnimate={true}
                    />
                </div>
            </div>
        )
    }
}

export default LoadEmptyMap;