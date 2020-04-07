import {Component} from "react";

class Item extends Component{
    id;
    country;
    confirmed;
    active;
    deaths;
    recovered;
    latitude;
    longitude;
    last_update;

    constructor(id, country, confirmed, active, deaths, recovered, latitude, longitude, last_update) {
        super();
        this.id = id;
        this.country = country;
        this.confirmed = confirmed;
        this.active = active;
        this.deaths = deaths;
        this.recovered = recovered;
        this.latitude = latitude;
        this.longitude = longitude;
        this.last_update = last_update;
    }

    toString(){
        return "{ "+ this.id+ ", "
            + this.country+ ", "
            + this.confirmed+ ", "
            + this.active+ ", "
            + this.deaths+ ", "
            + this.recovered+ ", "
            + this.latitude+ ", "
            + this.longitude+ ", "
            + this.last_update+ " "
            +"}";
    }

    getId(){
        return this.id;
    }
    getCountry(){
        return this.country;
    }
    getConfirmed(){
        return this.confirmed;
    }
    getActive(){
        return this.active;
    }
    getDeaths(){
        return this.deaths;
    }
    getRecovered(){
        return this.recovered;
    }
    getLatitude(){
        return this.latitude;
    }
    getLongitude(){
        return this.longitude;
    }
    getLastUpdate(){
        return this.last_update;
    }

}
export default Item;