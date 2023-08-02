import React from "react";
import FilterableAchievementTable from "./FilterableAchievementTable";
import SearchBarForm from "./SearchBarForm";

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

            <div className ={`placeholder ${searchSubmitted ? '' : 'highlight'}`}>
                { searchSubmitted ? (
                <div className="functioncontainer">
                    <SearchBarForm onSearch={this.handleSearch} searchSubmitted={this.state.searchSubmitted} />
                    <FilterableAchievementTable stateProp={this.state.searchTerm} searchSubmitted={this.state.searchSubmitted} />
                </div>
                ): (

                    <div className="functioncontainer">
                    <SearchBarForm onSearch={this.handleSearch} searchSubmitted={this.state.searchSubmitted} />
                </div>
                )}
            </div>
        )
    }
}