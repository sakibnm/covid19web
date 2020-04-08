import React, {Component} from 'react';
import LoadMap from './components/LoadMap';
import './App.css';
import SkeletonLoader from "tiny-skeleton-loader-react";
import { Container, Header, List } from "semantic-ui-react";
import Item from "./components/Item";
import VitalStats from "./components/VitalStats";
import LoadEmptyMap from "./components/LoadEmptyMap";
import SearchBar from "./components/SearchBar";
import SearchEmptyBar from "./components/SearchEmptyBar";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class App extends Component{
    state = {
        mapData : [],
        isFetching: true,
        json: null,
        dataList: [],
        itemList: [Item],
        selectedItem: "",
        showing: true,
        buttonText: "Hide Map"
    }

    callbackSelectedCountry = (selectedItemData) => {
        this.setState({selectedItem: selectedItemData})
    }

    callbackSearchCountry = (searchedItemData) => {
        this.setState({selectedItem: searchedItemData})
        console.log(searchedItemData)
    }

    componentDidMount() {
        this.getData();
        this.timer = setInterval(()=> this.getData(), 5*60*1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        console.log(this.state.selectedItem)
        const handleToggle = (showing)=>{
            {
                showing? this.setState({ buttonText: "Show Map" }):
                    this.setState({ buttonText: "Hide Map" })
            }
            this.setState({ showing: !showing })
        };
        return (
            <div id= "layoutDefault_content" className="App">
                <nav className="navbar navbar-marketing navbar-expand-lg fixed-top navbar-red">
                    <div className="container">
                        <a className="navbar-brand text-gray-100" href="index.html">Covid19WorldMap</a>
                    </div>
                </nav>
                <div className="container-vspace-4">

                </div>
                <div className="container">
                    <h3>Search the country,</h3>
                </div>
                <div className="container">
                    {this.state.isFetching ?
                        <SearchEmptyBar/>:
                        <SearchBar callBackSearchCountry = {this.callbackSearchCountry} itemList={this.state.itemList}></SearchBar>
                    }
                </div>
                <div className="container-vspace-4">

                </div>
                <div className="container">
                    <h3>Or, use the map select country</h3>
                </div>
                <div className="container">
                    <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation" onClick={() => handleToggle(this.state.showing)}>{this.state.buttonText}</button>
                    {/*{ showing*/}
                    {/*    ? <div>This is visible</div>*/}
                    {/*    : null*/}
                    {/*}*/}
                </div>
                <div id="loaderContainer">
                    {this.state.isFetching ?
                        <SkeletonLoader
                            containerStyle={{
                                width: "fit-content",
                                height: "100%",
                                "text-align": "center",
                                float: "center"
                            }}
                        />
                        :
                        <div/>
                    }
                </div>
                <div className="container">
                    {/*{this.state.isFetching?*/}
                    {/*    <LoadEmptyMap/>*/}
                    {/*    : <LoadMap callBackCountry = {this.callbackSelectedCountry} itemList={this.state.itemList}/>*/}
                    {/*}*/}
                    {!this.state.showing?
                        <div/>:this.state.isFetching?<LoadEmptyMap/>
                            : <LoadMap callBackCountry = {this.callbackSelectedCountry} itemList={this.state.itemList}/>

                    }
                </div>
                <div id="vitalContainer">
                    {this.state.isFetching ?
                        <SkeletonLoader
                            containerStyle={{
                                width: "fit-content",
                                height: "100%",
                                "text-align": "center",
                                float: "center"
                            }}
                        />
                        :
                        <VitalStats itemSend = {this.state.selectedItem}></VitalStats>
                    }
                </div>
                {/*<div>{console.log(this.state.itemList)}</div>*/}


            </div>
        );
    }
    getData = () => {

        this.state.isFetching = true;

        fetch('http://107.152.37.166:8080/107.152.37.166:5000/')
            .then(results => {
                // console.log(results.json())
                this.json = results.json()
                // console.log(this.json)
                return this.json
            }).then(itemsArray => {
            this.dataList = itemsArray["data"]
            // console.log(this.dataList)
            // console.log(this.dataList)
            return this.dataList;

        })
            .then(items => {
                this.itemList = []
                this.markers = []
                Object.keys(items).forEach(key => {
                    let item;
                    if (items[key].country === "US") {
                        item = new Item(
                            items[key].id,
                            "United States of America",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Iran") {
                        item = new Item(
                            items[key].id,
                            "Iran, Islamic Republic Of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Korea, South") {
                        item = new Item(
                            items[key].id,
                            "Korea, Republic of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "United Kingdom") {
                        item = new Item(
                            items[key].id,
                            "United Kingdom of Great Britain and Northern Ireland",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Russia") {
                        item = new Item(
                            items[key].id,
                            "Russian Federation",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Moldova") {
                        item = new Item(
                            items[key].id,
                            "Moldova, Republic of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Taiwan*") {
                        item = new Item(
                            items[key].id,
                            "Taiwan, Province of China",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Cote d'Ivoire") {
                        item = new Item(
                            items[key].id,
                            "Côte d'Ivoire",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Vietnam") {
                        item = new Item(
                            items[key].id,
                            "Viet Nam",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "West Bank and Gaza") {
                        item = new Item(
                            items[key].id,
                            "Palestine, State of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Venezuela") {
                        item = new Item(
                            items[key].id,
                            "Venezuela, Bolivarian Republic of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Congo (Kinshasa)") {
                        item = new Item(
                            items[key].id,
                            "Congo",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Congo (Brazzaville)") {
                        for (var i = 0; i < items.length; i++) {
                            if (items[i].country === "Congo") {
                                item = items[i];
                                item.confirmed = item.getConfirmed() + items[key].getConfirmed()
                                item.deaths = item.getDeaths() + items[key].getDeaths()
                                item.recovered = item.getRecovered() + items[key].getRecovered()
                            }
                            return;
                        }
                    } else if (items[key].country === "Bolivia") {
                        item = new Item(
                            items[key].id,
                            "Bolivia, Plurinational State of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Burma") {
                        item = new Item(
                            items[key].id,
                            "Myanmar",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Tanzania") {
                        item = new Item(
                            items[key].id,
                            "Tanzania, United Republic of",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Syria") {
                        item = new Item(
                            items[key].id,
                            "Syrian Arab Republic",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Laos") {
                        item = new Item(
                            items[key].id,
                            "Lao People'S Democratic Republic",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Brunei") {
                        item = new Item(
                            items[key].id,
                            "Brunei Darussalam",
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    } else if (items[key].country === "Kosovo") {
                        return;
                    } else if (items[key].country === "Diamond Princess") {
                        return;
                    } else if (items[key].country === "MS Zaandam") {
                        return;
                    } else {
                        item = new Item(
                            items[key].id,
                            items[key].country,
                            items[key].confirmed,
                            items[key].active,
                            items[key].deaths,
                            items[key].recovered,
                            items[key].latitude,
                            items[key].longitude,
                            items[key].last_update
                        )
                    }
                    this.itemList.push(item)
                });
                // console.log(this.itemList)
                this.setState({...this.state, isFetching: false,itemList: this.itemList})
            }).then(itemsArray => {
            // this.state.itemList = this.itemList;
            // console.log(this.state.itemList)
            this.state.isFetching = false;
        })
    }
}

export default App;
