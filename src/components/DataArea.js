import React, { Component } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";

export default class DataArea extends Component {
  state = {
    users: [{}],
    order: "descend",
    filteredUsers: [{}]
  };

  headings = [
    { name: "Image", width: "10%" },
    { name: "Name", width: "10%" },
    { name: "Phone", width: "20%" },
    { name: "Email", width: "20%" },
    { name: "DOB", width: "10%" }
  ];

  // Sorts workers by name
  sort = heading => {
    if (this.state.order === "descend") {
      this.setState({
        order: "ascend"
      });
    } else {
      this.setState({
        order: "descend"
      });
    };

    // Compare heading values and check for missing data
    const compare = (headingOne, headingTwo) => {
      if (this.state.order === "ascend") {
        if (headingOne[heading] === undefined) {
          return 1;
        } else if (headingTwo[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return headingOne[heading].first.localeCompare(headingTwo[heading].first);
        } else {
          return headingOne[heading] - headingTwo[heading];
        };
      } else {
        if (headingOne[heading] === undefined) {
          return 1;
        } else if (headingTwo[heading] === undefined) {
          return -1;
        } else if (heading === "name") {
          return headingTwo[heading].first.localeCompare(headingOne[heading].first);
        } else {
          return headingTwo[heading] - headingOne[heading];
        };
      };
    };

    const sortedWorkers = this.state.filteredUsers.sort(compare);
    this.setState({ filteredUsers: sortedWorkers });
  };

  // handleSearchChange function merges data and checks for user input inside filtered list
  handleSearchChange = event => {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = this.state.users.filter(item => {
      let values = Object.values(item).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    this.setState({ filteredUsers: filteredList });
  };

  // Pulls random users from the API provided
  componentDidMount() {
    API.getUsers().then(results => {
      this.setState({
        users: results.data.results,
        filteredUsers: results.data.results
      });
    });
  };

  render() {
    return (
      <>
        <Nav handleSearchChange={this.handleSearchChange} />
        <div className="data-area">
          <DataTable
            headings={this.headings}
            users={this.state.filteredUsers}
            handleSort={this.sort}
          />
        </div>
      </>
    );
  };
};
