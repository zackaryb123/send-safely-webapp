import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getAuthKeys, getAuthState} from "../selector/auth";
import Navbar from "../component/navbar";
import LoginForm from "../component/login-form";
import './login.css';
import {authenticate} from "../service/auth";
import {hasAuthData, isSuccessResponse} from "../common/util";
import {setAuthKeys} from "../action/auth";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Login',
            errorData: null
        }
    }

    componentDidMount() {
        let {keys} = this.props;
        if (hasAuthData(keys)) {
            // this.props.history.push('/home/');
        }
    }

    submit = values => {
        if (values && values.username && values.password) {
            authenticate(values.username, values.password)
                .then(auth => {
                    if (isSuccessResponse(auth.data)) {
                        this.props.setAuthKeys(auth.data.apiKey, auth.data.apiSecret);
                        this.setState({errorData: null});
                        // this.props.history.push('/home/');
                    } else {
                        this.setState({errorData: auth.data});
                    }
                }).catch(err => {
                    console.error(err);
                    this.setState({
                        errorData:  { message: 'Error occurred during authentication! Please contact customer service.'}
                    })
                });
        }
    }

    render() {
        const {errorData, name} = this.state;
        return (
            <div>
                <Navbar page={name}/>
                <LoginForm errorData={errorData} onSubmit={this.submit}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: getAuthState(state),
    keys: getAuthKeys(state)
});
const mapDispatchToProps = state => ({

});

export default connect(
    mapStateToProps,
    {setAuthKeys}
)(Login);