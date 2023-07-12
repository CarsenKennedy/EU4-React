import React from "react";
import FilterableAchievementTable from "./FilterableAchievementTable";
import SearchBarForm from "./SearchBarForm";
import Results from "../Results";

export default class SearchAndTableContainer extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            searchTerm: '',
            searchSubmitted: false,
        };
    }

    handleSearch = (searchTerm) => {
        this.setState({ searchTerm: searchTerm, searchSubmitted: true });
    }




    render() {
        const { searchSubmitted } = this.state;
        return( 

            <div class ={`placeholder ${searchSubmitted ? '' : 'highlight'}`}>
                { searchSubmitted ? (
                <div class="functioncontainer">
                    <SearchBarForm onSearch={this.handleSearch} searchSubmitted={this.state.searchSubmitted} />
                    <FilterableAchievementTable stateProp={this.state.searchTerm} searchSubmitted={this.state.searchSubmitted} />
                </div>
                ): (

                    <div class="functioncontainer">
                    <SearchBarForm onSearch={this.handleSearch} searchSubmitted={this.state.searchSubmitted} />
                </div>
                )}
            </div>
        )
    }
}