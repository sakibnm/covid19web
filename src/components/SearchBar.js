import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import Item from "./Item";

// const countryOptions = []
    // { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
    // { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
    // { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
    // { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
    // { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
    // { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
    // { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
    // { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
    // { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
    // { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
    // { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
    // { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
    // { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
    // { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
    // { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
    // { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
    // { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
    // { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
    // { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
    // { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
    // { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
    // { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
    // { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
const ASC = 'ascending';
const DSC = 'descending';

class SearchBar extends Component{
    state = {
        items: [Item],
        countryOptions: [{}],
        value : ''
    }
    sendCountry = (country) => {
        this.props.callBackSearchCountry(country);
    }
    render() {
        const { getCode, getName } = require('country-list');
        this.state.items = this.props.itemList
        for (var i=0;i<this.state.items.length;i++){
            // console.log(this.state.items[i].country+" "+getCode(this.state.items[i].country).toLowerCase())
            let dict = {}
            dict['key'] = getCode(this.state.items[i].country).toLowerCase()
            dict['value'] = getCode(this.state.items[i].country).toLowerCase()
            dict['flag'] = getCode(this.state.items[i].country).toLowerCase()
            dict['text'] = this.state.items[i].country
            // console.log(dict)
            this.state.countryOptions[i] = dict
        }

        this.state.countryOptions = this.state.countryOptions.sort((a,b) => sortByText(a,b, ASC))

        function sortByText(a, b, order = ASC) {
            // console.log(a['text']+" "+b['text'])
            const diff = a['text'].toLowerCase().localeCompare(b['text'].toLowerCase());

            if (order === ASC) {
                return diff;
            }

            return -1 * diff;
        }

        // console.log(this.state.countryOptions.sort((a,b) => sortByText(a,b, ASC)))
        // console.log(this.state.countryOptions)
        const { value } = this.state;
        this.handleChange = (e, { value }) => {
            this.setState({ value })
            // console.log(value)
            for (var i=0;i< this.state.items.length;i++){
                let item = this.state.items[i]
                if (getCode(item.getCountry()) === value.toUpperCase()){
                    this.sendCountry(item)
                }
            }
        }
        console.log(this.state.value)
        return (
            <Dropdown
                placeholder='Select Country'
                fluid
                search
                selection
                onChange={this.handleChange}
                options={this.state.countryOptions}
                value={value}
            />
        )
    }

}

export default SearchBar