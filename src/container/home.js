import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "../component/navbar";
import {deleteAuthKeys} from "../action/auth";
import {hasAuthData, isNewChange, isSuccessResponse} from "../common/util";
import Packages from "../component/packages";
import {getPackages} from "../service/package";
import {getAuthKeys, getAuthState} from "../selector/auth";
import './home.css';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Home',
            errorData: null,
            packages: null,
            batchSize: 3,
            page: 1,
            loading: false
        }
    }

    componentDidMount() {
        const {keys} = this.props;
        const {batchSize} = this.state;
        if (hasAuthData(keys)) {
            this.setState({loading: true});
            getPackages(keys.apiKey, keys.apiSecret, batchSize)
                .then(res => {
                    if (isSuccessResponse(res.data)) {
                        this.setState({errorData: null, packages: res.data.packages, loading: false});
                    } else {
                        this.setState({errorData: res.data, loading: false});
                    }
                }).catch(err => {
                    this.setState({errorData: err, loading: false});
            })
        }
        // Detect when scrolled to bottom.
        this.refs.myscroll.addEventListener("scroll", () => {
            console.log('home event')
            if (
                this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
                this.refs.myscroll.scrollHeight
            ) {
                this.handleLoadMoreEvent();
            }
        });
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

    handleLoadMoreEvent =  () => {
        console.log('handleLoadMoreEvent');
        const {keys} = this.props;
        const {packages, batchSize} = this.state;
        if (hasAuthData(keys)) {
            this.setState({loading: true});
            getPackages(keys.apiKey, keys.apiSecret, packages.length + batchSize)
                .then(res => {
                    if (isSuccessResponse(res.data)) {
                        this.setState({errorData: null, packages: [...res.data.packages], loading: false});
                    } else {
                        this.setState({errorData: res.data, loading: false});
                    }
                }).catch(err => {
                    this.setState({errorData: err, loading: false});
            })
        }
    }

    handlePackageDelete = (pkgId) => {
        const newPackages = this.state.packages.filter(pkg => pkg.packageId !== pkgId);
        this.setState({packages: newPackages, errorData: null});
    }

    handleErrorEvent = (err) => {
        this.setState({errorData: err});
    }

    render() {
        const {name, packages, errorData, items} = this.state;
        return (
            <div className="container-scroll mt-5" ref="myscroll">
                <Navbar onLogout={this.logout} page={name}/>
                { errorData && <div className="alert alert-danger d-flex justify-content-around" role="alert">
                    {errorData.message}
                </div> }
                <Packages
                    items={items}
                    packages={packages}
                    loadMoreEvent={this.handleLoadMoreEvent}
                    deletePackageEvent={this.handlePackageDelete}
                    errorEvent={this.handleErrorEvent}
                />
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