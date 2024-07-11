import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {
      title,
      description,
      imageURL,
      newsURL,
    
      author,
      date,
      source,
    } = this.props;

    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-dark">
            {source}
          </span>
          <img
            src={imageURL}
            className="card-img-top"
            alt="..."
            style={{ height: "200px" }}
          />
          <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"> <small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}.</small></p>
    <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-link">Read More</a>
  </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
