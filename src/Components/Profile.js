import React,{Component} from 'react';
import {connect} from 'react-redux';
import styles from '../styles/profile.module.scss';
import {  userActions} from '../js/actions';

class Profile extends Component {
    constructor(props) {
        super(props);
        const {user} = this.props;
        this.state= {
            email: user ? user.email : '',
            firstname: user ? user.firstName : "",
            lastname:  user ? user.lastName : '',
            prevPropsUser: this.props.user,
            formErrors: {}

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    static getDerivedStateFromProps(props, state) {
          // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.user !== state.prevPropsUser) {
        console.log(props.user);
        return {
            email: props.user.email,
            firstname: props.user.firstName,
            lastname: props.user.lastName,
            prevPropsUser: props.user
        };
      }
      return null;
    }
   
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        new Promise((resolve,reject) => {
            this.setState({
                [name]: value
                });
            resolve();
        }).then(this.handleElementValidation(event))
        .catch(err => {
            console.error(err);
        })
    }
    handleElementValidation(event) {
        const name = event.target.name;
        const value = event.target.value;
        const {formErrors} = this.state; 
        if(name==="firstname" || name==="lastname") {
            if(!value) {
                formErrors[name] = styles['input-error'];
            }
            else 
                formErrors[name] = '';
        }
        //this.setState(formErrors);
    }
    formValidation() {
        let {firstname, lastname,formErrors} = this.state;
        let formIsValid = true;
        if(!firstname) {
            formErrors['firstname'] = styles['input-error'];
            formIsValid = false;
        }
        if(!lastname) {
            formErrors['lastname'] = styles['input-error'];
            formIsValid = false;
        }
        this.setState({formErrors});
        return formIsValid;
    }
    submit(event) {
        event.preventDefault();
        if(this.formValidation()) {
            // connect to redux action 
            const {firstname,lastname} = this.state;
            const user = {firstname, lastname}; // this can be improved lated.
            const {update} = this.props;
            update(user);
        }

    }
    alert() {
        const {alert} = this.props;
        if(alert.message) {  // alerts coming from server(API).
            return (
                <div className={`alert ${alert.type} auth-alert ml-0 mr-0`}>
                    {
                        alert.type === "alert-danger" ?
                        alert.message[0].msg
                        :
                        alert.message
                    }
                </div> 
            )
        }
    }
    render() {
        const {email, firstname,lastname, formErrors} = this.state;
        const {updating} = this.props;
        console.log(this.props);
        return (
        <div className={styles['profile-container']}> 
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    {this.alert()}
                    <form>
                        <div className={`form-group ${styles['form-group']}`}>
                            <label>Email</label>
                            <input type="email" name="email" className={`form-control`} value={email} disabled/>
                        </div>
                        <div className={`form-group ${styles['form-group']}`}>
                            <label>First Name</label>
                            <input type="text" name="firstname" className={`form-control ${formErrors['firstname']}`} value={firstname}
                            onChange={this.handleInputChange}/>
                        </div>
                        <div className={`form-group ${styles['form-group']}`}>
                            <label>Last Name</label>
                            <input type="text" name="lastname" className={`form-control ${formErrors['lastname']}`} value={lastname}
                            onChange={this.handleInputChange}/>
                        </div>
                        <button className="btn btn-md btn-info" type="submit"
                        onClick={this.submit}>
                            {
                                updating ?
                                <img src={require("../assets/oval.svg")} height="22" alt="loading..."/>
                                : "Update"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
function mapState(state) {
    const { updating, user} = state.authenticatedUser;
    const { alert } = state;
    return { updating, user, alert };
}

const actionCreators = {
    update: userActions.updateUser
};

export default connect(mapState, actionCreators)(Profile);
