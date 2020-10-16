import React, {Component} from 'react';
import { connect } from 'react-redux';

class Shell extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: 'Shell Container'
        }
    }

    componentDidMount(){
    }

    render() {
        const {children} = this.props;
        return (
            <div>
                {children}
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps,
    {}
)(Shell);