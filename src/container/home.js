import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "../component/navbar";
import {deleteAuthKeys} from "../action/auth";
import {hasAuthData, isNewChange, isSuccessResponse} from "../common/util";
import Packages from "../component/packages";
import {getPackages} from "../service/package";
import {getAuthKeys, getAuthState} from "../selector/auth";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Home',
            errorData: null
        }
    }

    componentDidMount() {
        const {keys} = this.props;
        console.log('Keys: ', keys);
        if (hasAuthData(keys)) {
            getPackages(keys.apiKey, keys.apiSecret)
                .then(data => {
                    console.log('Packages: ', data)
                    if (isSuccessResponse(data.data)) {
                        this.setState({errorData: null});
                    } else {
                        this.setState({errorData: data.data});
                    }
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (isNewChange(prevProps.auth, this.props.auth)) {
            if (this.props.auth.apiKey == null && this.props.auth.apiSecret == null) {
                this.props.history.push('/');
            }
        }
    }

    logout = () => {
        this.props.deleteAuthKeys();
    }

    render() {
        const {name, packages, errorData} = this.state;
        return (
            <div>
                <Navbar onLogout={this.logout} page={name}/>
                {errorData ? <div className="alert alert-danger d-flex justify-content-around" role="alert">
                    {errorData.message}
                </div>
                    : <Packages packages={packages} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: getAuthState(state),
    keys: getAuthKeys(state)
});

export default connect(mapStateToProps,
    {deleteAuthKeys}
)(Home);