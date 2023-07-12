import React, { Component } from "react";
import Pagination from "./Pagination";

export default class FilterableAchievementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: [],
      achievements: [],
      currentPage: 1,
      pageSize: 10, // Define the desired page size
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stateProp !== this.props.stateProp) {
      this.fetchAchievements(this.props.stateProp);
    }
  }

  componentDidMount() {
    const { stateProp } = this.props;
    if (stateProp !== "") {
      this.fetchAchievements(stateProp);
    }
  }

  fetchAchievements(searchTerm) {
    fetch(`http://127.0.0.1:5000/api/v1/achievement/search/${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ achievements: data });
      });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { achievements, currentPage, pageSize } = this.state;

    // Calculate pagination-related variables
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentAchievements = achievements.slice(startIndex, endIndex);

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Index</th>
              <th>Version</th>
              <th>Name</th>
              <th>Difficulty</th>
              <th>DLC Required</th>
              <th>Description</th>
              <th>Starting Conditions</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            {currentAchievements.length > 0 ? (
              currentAchievements.map((achievement) => (
                <Achievement key={achievement.id} data={achievement} />
              ))
            ) : (
              <tr>
                <td colSpan="8">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalCount={achievements.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

class Achievement extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.version}</td>
        <td>{this.props.data.name}</td>
        <td>{this.props.data.difficulty}</td>
        <td>{this.props.data.dlc}</td>
        <td>{this.props.data.description}</td>
        <td>{this.props.data.starting_conditions}</td>
        <td>{this.props.data.requirements}</td>
      </tr>
    );
  }
}