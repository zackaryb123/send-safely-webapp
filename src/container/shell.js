import React, {Component} from 'react';
import { connect } from 'react-redux';
import Login from "./login";
import {hasAuthData, isNewChange} from "../common/util";
import {getAuthKeys} from "../selector/auth";
import Home from "./home";

class Shell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Shell Container',
            isLoggedIn: false
        }
    }

    componentDidMount(){
        let {keys} = this.props;
        if (hasAuthData(keys)) {
            this.setState({isLoggedIn: true})
        } else {
            this.setState({isLoggedIn: false})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (isNewChange(prevProps.keys, this.props.keys)) {
            if (this.props.keys.apiKey == null && this.props.keys.apiSecret == null) {
                this.setState({isLoggedIn: false})
            } else {
                this.setState({isLoggedIn: true})
            }
        }
    }

    render() {
        const {children} = this.props;
        const {isLoggedIn} = this.state;
        return (
            <div>
                {!isLoggedIn && <Login/>}
                {isLoggedIn && <Home/>}
                {children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    keys: getAuthKeys(state)
});

export default connect(mapStateToProps,
    {}
)(Shell);