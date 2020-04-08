import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import Item from "./Item";

const countryOptions = [
    { key: '', value: '', flag: '', text: '' }
]

class SearchEmptyBar extends Component{
    state = {
        items: [Item],
        countryOptions: {}
    }
    render() {
        return (
            <Dropdown
                placeholder='Loading data'
                fluid
                search
                selection
                options={this.state.countryOptions}
            />
        )
    }

}

export default SearchEmptyBar