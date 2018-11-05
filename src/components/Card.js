import React from 'react';
import { getImageUrl } from '../../config';


/*
* Nespejau....
*
* */
export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false,
      liked: this.props.like
    };
  }

  toggleSummary = () => {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  };

  changeLikeState = () => {
      const { liked } = this.state;
      this.setState({
          liked: !liked,
      });
      const { movie: {id}, movieLikeStatusChangedCallback } = this.props;
      movieLikeStatusChangedCallback(id, !liked);
      alert(!liked);
  };

  render() {
    const {
      movie: {
        backdrop_path,
        original_title,
        overview,
        release_date,
        vote_average,
        vote_count,
      },
    } = this.props;
    const { opened, liked } = this.state;
    return (
      <div className="card">
        <div
          className="card__image"
          style={{ backgroundImage: `url(${getImageUrl(backdrop_path)})` }}
        />

        <div className="card__title">
          {original_title}
        </div>

        <div className="card__like">
          <i className="fa fa-heart-o" onClick={this.changeLikeState}/>
        </div>

        <div className="card__subtitle">
          <span>{release_date}</span>
          <span>{vote_average} ({vote_count} votes)</span>
        </div>

        <div className="card-info">
          <div className="card-info__header" onClick={this.toggleSummary}>
            Summary
          </div>

          {opened
            ? <div className="card-info__description">{overview}</div>
            : null
          }

        </div>
      </div>
    );
  }
}
