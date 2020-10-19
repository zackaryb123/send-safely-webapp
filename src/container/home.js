import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "../component/navbar";
import {deleteAuthKeys} from "../action/auth";
import {hasAuthData, isNewChange, isSuccessResponse} from "../common/util";
import Packages from "../component/packages";
import {getReceivedPackages, getSentPackages} from "../service/package";
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
            page: 'SENT',
            row: 1,
            loading: false
        }
    }

    componentDidMount() {
        const {keys} = this.props;
        const {batchSize, row} = this.state;
        if (hasAuthData(keys)) {
            this.setState({loading: true});
            const pageSize = batchSize;
            this.fetchSentPackages(keys, row, batchSize, pageSize);
        }
        // Detect when scrolled to bottom.
        this.refs.myscroll.addEventListener("scroll", () => {
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
        if (isNewChange(prevState.page, this.state.page)) {
            const {keys} = this.props;
            const {page, loading, packages, batchSize, row} = this.state;
            if (page === 'SENT') {
                const pageSize = packages ? packages.length + batchSize : batchSize;
                return this.fetchSentPackages(keys, row, batchSize, pageSize);
           } else {
                const pageSize = packages ? packages.length + batchSize : batchSize;
                return this.fetchReceivedPackages(keys, row, batchSize, pageSize);
           }
        }
    }

    logout = () => {
        this.props.deleteAuthKeys();
    }

    handleLoadMoreEvent =  () => {
        const {keys} = this.props;
        const {page, loading, packages, batchSize, row} = this.state;
        if (hasAuthData(keys) && !loading) {
            this.setState({loading: true});
            if (page === 'SENT') {
                const pageSize = packages ? packages.length + batchSize : batchSize;
                return this.fetchSentPackages(keys, row, batchSize, pageSize);
            } else {
                const pageSize = packages ? packages.length + batchSize : batchSize;
                return this.fetchReceivedPackages(keys, row, batchSize, pageSize);
            }
        }
    }

    handlePackageDelete = (pkgId) => {
        const newPackages = this.state.packages.filter(pkg => pkg.packageId !== pkgId);
        this.setState({packages: newPackages, errorData: null});
    }

    handleErrorEvent = (err) => {
        this.setState({errorData: err});
    }

    handleTabNavigate = (e) => {
        this.setState({page: e, row: 1, packages: null})

    }

    fetchSentPackages(keys, row, batchSize, pageSize) {
        return getSentPackages(keys.apiKey, keys.apiSecret, null, pageSize)
            // getSentPackages(keys.apiKey, keys.apiSecret, row, batchSize)
            .then(res => {
                if (isSuccessResponse(res.data)) {
                    this.setState({
                        errorData: null,
                        packages: [...res.data.packages], row: row + batchSize, loading: false
                    });
                } else {
                    this.setState({errorData: res.data, loading: false});
                }
            }).catch(err => {
            this.setState({errorData: err, loading: false});
        })
    }

    fetchReceivedPackages(keys, row, batchSize, pageSize) {
        return getReceivedPackages(keys.apiKey, keys.apiSecret, null, pageSize)
            // getSentPackages(keys.apiKey, keys.apiSecret, row, batchSize)
            .then(res => {
                if (isSuccessResponse(res.data)) {
                    this.setState({
                        errorData: null,
                        packages: [...res.data.packages], row: row + batchSize, loading: false
                    });
                } else {
                    this.setState({errorData: res.data, loading: false});
                }
            }).catch(err => {
            this.setState({errorData: err, loading: false});
        })
    }

    render() {
        const {name, packages, errorData, items} = this.state;
        return (
            <div className="container-scroll mt-5" ref="myscroll">
                <Navbar
                    handleTabNavigate={this.handleTabNavigate}
                    onLogout={this.logout}
                    page={name}
                />
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