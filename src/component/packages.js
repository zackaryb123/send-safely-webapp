import React, {Component} from 'react';
import { connect } from 'react-redux';
import './package.css'
import {hasAuthData, isSuccessResponse} from "../common/util";
import {deletePackage} from "../service/package";
import {getAuthKeys} from "../selector/auth";

class Packages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Navbar Container'
        }
    }

    componentDidMount() {
    }

    loadMore() {
    }

    deletePackage(packageId) {
        const {keys} = this.props;
        console.log(keys);
        if (hasAuthData(keys)) {
            deletePackage(keys.apiKey, keys.apiSecret, packageId)
                .then(res => {
                    if (isSuccessResponse(res.data)) {
                        this.props.deletePackageEvent(packageId);
                    } else {
                        this.props.errorEvent(res.data);
                    }
                }).catch(err => {
                    this.props.errorEvent(err);
            })
        }
    }

    render() {
        const {packages} = this.props;
        return (
            <div ref="myscrolls" className="list-group container">
                { packages && packages.map(pkg =>
                    <li id={pkg.packageId} className="list-group-item bg-black">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{pkg.packageUserName}</h5>
                            <small>{pkg.packageUpdateTimestamp}</small>
                        </div>
                        <p>Files :</p>
                        <ul className="list-group">
                            { pkg.filenames && pkg.filenames.map((file, i) =>
                                <li id={pkg.packageId + 'f' + i} className="list-group-item d-flex justify-content-between align-items-center">
                                    {file}
                                </li> )}
                        </ul>
                        <p>Recipients :</p>
                        <ul className="list-group">
                            { pkg.recipients && pkg.recipients.map((recipient, i) =>
                                <li id={pkg.packageId + 'r' + i} className="list-group-item">{recipient}</li>
                            )}
                        </ul>
                        <button onClick={() => this.deletePackage(pkg.packageId)} type="button" className="btn btn-danger">Delete</button>
                    </li> )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    keys: getAuthKeys(state)
});

export default connect(mapStateToProps,
    {}
)(Packages);
