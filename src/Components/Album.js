import React, { Component } from "react";
import axios from "axios";

class Album extends Component {
  state = {
    albums: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUserId)
      axios
        .get(
          `https://jsonplaceholder.typicode.com/albums?userId=${nextProps.selectedUserId}`
        )
        .then((res) => {
          this.setState({
            albums: res.data,
          });
        })
        .catch((err) => console.log(err));
  }

  change = (event) => {
    this.props.onAlbumSelected(event.target.value);
  };

  render() {
    const albumData = this.state.albums;
    return (
      <div >
        <select onChange={this.change}>
          <option selected disabled>
            Albums
          </option>
          {!albumData} ? <p>...Loading</p> :
          {albumData.map((albumItem) => {
            return (
              <option value={albumItem.id}>
                {albumItem.title}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default Album;
