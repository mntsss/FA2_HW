import React from 'react';

export default class Genre extends React.Component {
  constructor() {
      super();
  }

  clickHandler = () => {
    const { id, genreCallback} = this.props;
    genreCallback(id);
  }

  render() {
    const {name} = this.props;

    return (
        <div type="button" className="genre" onClick={this.clickHandler}>{name}</div>
    );
  }
}
