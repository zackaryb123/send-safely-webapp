import React, {Component} from 'react';
import { connect } from 'react-redux';
import './navbar.css'

class Packages extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Navbar Container'
        }
    }

    componentDidMount() {
    }

    render() {
        const {packages} = this.props;
        return (
            <div className="list-group">
                { packages && packages.map(pkg =>
                    <a href="#" className="list-group-item list-group-item-action active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{pkg.packageUserName}</h5>
                            <small>pkg.packageUpdateTimestamp</small>
                        </div>
                        <p>Files:</p>
                        <ul className="list-group">
                            { pkg.filenames && pkg.filenames.map(file =>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    {file}
                                </li> )}
                        </ul>
                        <ul className="list-group list-group-flush">
                            { pkg.recipients && pkg.recipients.map(recipient =>
                                <li className="list-group-item">{recipient}</li>
                            )}
                        </ul>
                    </a> )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // auth: getAuthState(state)
});

export default connect(mapStateToProps,
    {}
)(Packages);
