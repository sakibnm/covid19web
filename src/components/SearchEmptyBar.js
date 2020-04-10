import React, {Component} from 'react'
import { Dropdown } from 'semantic-ui-react'

const countryOptions = [
    { key: '', value: '', flag: '', text: '' }
]

class SearchEmptyBar extends Component{
    state = {
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