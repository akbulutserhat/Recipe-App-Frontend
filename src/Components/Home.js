import React from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
class Home extends React.Component {
    componentDidMount() {
    }
    redirect() {
        const {loggedIn} = this.props;
        if(!loggedIn) {
            this.props.history.push('/login');
        }
    }
    render() {
        return(
            <Loading/>
        )
    }
}
function mapState(state) {
    const { loggedIn } = state.authentication;
    return {loggedIn};
}

export default connect(mapState, null)(Home);
