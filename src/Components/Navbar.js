import React, { Component } from "react";
import { Link } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg  fixed-top navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/general">
            CurrentBeat
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} aria-current="page" to="/general">Home</Link>
        </li>
        
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/business">Business</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/entertainment">Entertainment</Link>
          </li>
          
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/health">Health</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/science">Science</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/sports">Sports</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" style={{ color: 'white', cursor: 'pointer' }} to="/technology">Technology</Link>
        </li>

        
        
      </ul>
     
    </div>


          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
