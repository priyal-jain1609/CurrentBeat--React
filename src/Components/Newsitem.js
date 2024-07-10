import React, { Component } from 'react'

export class Newsitem extends Component {
  
  render() {
    let {title, description, imageUrl,newsUrl,author,date,source}=this.props;
    if (!title) {
      return null;
    }
    return (
      <div>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left: '50%', zIndex:1}}>
        {source}</span>
  <img src={!imageUrl?"https://media.zenfs.com/en/bloomberg_markets_842/d815c3413122a894dcfc3cd3fba165f5":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"> <small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}.</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-link">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitem
