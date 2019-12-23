import React from 'react';
import {connect} from 'react-redux';
import { userActions, alertActions } from '../js/actions';
import styles from '../styles/authentication.module.scss';
import '../styles/authentication.css';
import {Link} from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: '',
            loginFailed: {
                status: false,
                message: []  // message coming from the web service if login fails
            },
            loginSucceed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleElementValidation = this.handleElementValidation.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    componentDidMount() {
        this.redirect();
    }
    redirect() {
        const {loggedIn} = this.props;
        if(loggedIn) {
            this.props.history.push('/recipes');
        }
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
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    handleElementValidation(event) {
        const name = event.target.name;
        const value = event.target.value;
        const id=event.target.id;
        const el = document.getElementById(id);
        if(name === 'email') {
            if(!value || !this.validateEmail(value)) {
                el.classList.add("auth-input-error");
            }
            else 
                el.classList.remove("auth-input-error");
        }
        else if(name === 'password') {
            if(!value || value.length < 8) {
                el.classList.add("auth-input-error");
            }
            else 
                 el.classList.remove("auth-input-error");
        }
    }
    
    formValidation() {
        let formIsValid = true;
        if(!this.state.email || !this.validateEmail(this.state.email)) {
            formIsValid = false;
            document.getElementById("loginEmail").classList.add("auth-input-error");
        }
        if(!this.state.password || this.state.password.length < 8) {
             formIsValid = false;
             document.getElementById("loginPassword").classList.add("auth-input-error");
        }
        return formIsValid; 
    }
    handleLoginSubmit(event) {
        event.preventDefault();
        if(this.formValidation()) {
            let redirectUrl =  "/recipes";
            const {state} = this.props.location
            if(state && state.prevLocation) {
                const {prevLocation} = state;
                redirectUrl = prevLocation;
            }
            
            new Promise((resolve,reject) => {
                this.props.login(this.state.email,this.state.password, redirectUrl);
                resolve('LOGGED IN');
            })
            .catch(err => {
                console.error(err);
            })

        }
    }
    alert() {
        const { state} = this.props.location;
        const { alert } = this.props;
        console.log(state);
        if(alert.message) {  // alerts coming from server(API).
            return (
                <div className={`alert ${alert.type} auth-alert`}>
                    {
                        alert.type === "alert-danger" ?
                        alert.message[0].msg
                        :
                        alert.message
                    }
                </div> 
            )
        }
        else if(state && state.error) {  // alerts coming from protected route attemps.
            const {error} = state;
            console.log(error);
            return (
                <div className={`alert alert-danger auth-alert`}>
                    {
                       error
                    }
                </div> 
            )
        }
        else 
            return null;
    }
    render() {
        const { loggingIn } = this.props;
        return (
            <div className={`${styles.container} container-fluid`}>
                <div className = {`row`}>
                        <div className={`col-md-4 offset-md-4 p-0`}>
                            <div className={`${styles.card}`}>
                                <div className={`${styles.heading}`}>
                                    <h2>Login</h2>
                                    <span>Please fill in this form to login!</span>
                                </div>
                                {
                                    this.alert()
                                }
                                <div className={`${styles.form}`}>
                                    <form>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="email" className={`form-control ${styles.inputText}`} id="loginEmail" name="email"
                                             value= {this.state.email} onChange= {this.handleInputChange.bind(this)} 
                                             onBlur= {this.handleElementValidation} aria-describedby="emailHelp" placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-envelope mr-2"></i>Email</span>
                                        </div>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="password" className={`form-control ${styles.inputText}`} id="loginPassword" name="password" value= {this.state.password} onChange= {this.handleInputChange} onBlur= {this.handleElementValidation} placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-key mr-2"></i>Password</span>
                                        </div>
                                        <div className={`${styles.buttonContainer}`}>
                                            <button type="submit" className={`btn btn-block btn-primary ${styles.submitBtn}`} 
                                            onClick = {this.handleLoginSubmit}
                                            disabled= {loggingIn}>
                                            {
                                                loggingIn ?  
                                                <img src={require("../assets/oval.svg")} height="22" alt="loading..."/>
                                                : "Submit"
                                             } 
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.footer}>
                                    <Link to="/signup">Don't you have an account, Sign Up?</Link>
                                </div>
                            </div>
                    
                        </div>
                    </div>
            </div>
        )
    }
}
function mapState(state) {
    const { loggingIn, loggedIn } = state.authentication;
    const { alert } = state;
    return { loggingIn, loggedIn, alert };
}
const actionCreators = {
    login: userActions.login,
    logout: userActions.logout,
    authenticatedUser: userActions.authenticatedUser
};

export default connect(mapState, actionCreators)(Login);
