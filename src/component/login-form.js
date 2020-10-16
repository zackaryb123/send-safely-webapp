import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from "redux-form";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Login Form Component'
        }
    }

    componentDidMount() {
    }

    render() {
        const {handleSubmit, errorData} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <form onSubmit={handleSubmit} className="box">
                                <h1>Login</h1>
                                <p className="text-muted">
                                    Please enter your login and password!
                                </p>
                                {errorData && <div className="alert alert-danger" role="alert">
                                    {errorData.message}
                                </div>}
                                <label htmlFor="username">
                                    <Field className="field" type="text" name="username" component="input" placeholder="Username"/>
                                </label>
                                <label htmlFor="username">
                                    <Field className="field" type="password" name="password" component="input" placeholder="Password"/>
                                </label>
                                {/*<a href="#" className="forgot text-muted">Forgot password?</a>*/}
                                <input type="submit" value="Login" />
                                {/*<div className="col-md-12">*/}
                                {/*    <ul className="social-network social-circle">*/}
                                {/*        <li>*/}
                                {/*            <a href="#" className="icoFacebook" title="Facebook">*/}
                                {/*                <i className="fab fa-facebook-f"/>*/}
                                {/*            </a>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <a href="#" className="icoTwitter" title="Twitter">*/}
                                {/*                <i className="fab fa-twitter"/>*/}
                                {/*            </a>*/}
                                {/*        </li>*/}
                                {/*        <li>*/}
                                {/*            <a href="#" className="icoGoogle" title="Google +">*/}
                                {/*                <i className="fab fa-google-plus"/>*/}
                                {/*            </a>*/}
                                {/*        </li>*/}
                                {/*    </ul>*/}
                                {/*</div>*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

LoginForm = connect(mapStateToProps,
    {}
)(LoginForm);

export default reduxForm({
    form: 'login'
})(LoginForm)