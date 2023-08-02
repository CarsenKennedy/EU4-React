import React from "react";
import './../styles/style.css';

export default class SearchBarForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm : '',
            searchSubmitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
        this.setState({searchSubmitted: true})
    }

    render() {
        return (
            <form className="search-bar" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search Achievements" value={this.state.searchTerm} onChange={this.handleChange} />
                <input type="submit" style={{ display: "none" }} />
            </form>
        );
    }
}