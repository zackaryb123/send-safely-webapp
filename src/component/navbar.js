import React, {Component} from 'react';
import { connect } from 'react-redux';
import './navbar.css'
import {getAuthState} from "../selector/auth";

class Navbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Navbar Container'
        }
    }

    componentDidMount() {
    }

    logout = () => {
        this.props.onLogout();
    }

    render() {
        const {page} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="#" className="navbar-brand">
                    <img src="https://www.sendsafely.com/img/ss_logo_dark_60_343.png" width="30" height="30"
                         className="d-inline-block align-top logo" alt="" loading="lazy"/>
                </a>
                { page && page === 'Home' &&
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button> }
                {page && page === 'Home' &&
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/*<li className="nav-item active">*/}
                        {/*    <a href="#" className="nav-link">Home <span className="sr-only">(current)</span></a>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <a href="#" className="nav-link">Features</a>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <a onClick={this.logout} href="#" className="nav-link" tabIndex="-1" aria-disabled="true">Logout</a>
                        </li>
                    </ul>
                </div> }
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    // auth: getAuthState(state)
});

export default connect(mapStateToProps,
    {}
)(Navbar);
