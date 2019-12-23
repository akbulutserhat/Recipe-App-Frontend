import React from 'react';
import {connect} from 'react-redux';
import styles from '../styles/authentication.module.scss';
import '../styles/authentication.css';
import {Link} from 'react-router-dom';
import {userActions} from '../js/actions';
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            loading: false,
            fistname: "",
            lastname: "",
            email: '',
            password1: '',
            password2: '',
            registerFailed: {
                status: false,
                message: []  // message coming from the web service if login fails
            },
            registerSucceed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleElementValidation = this.handleElementValidation.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }
    componentDidMount() {
        this.redirect();
    }
    redirect() {
        const {loggedIn} = this.props;
        if(loggedIn) {
            this.props.history.push('/');
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
        if(name==="firstname") {
            if(!value) {
                el.classList.add("auth-input-error");
            }
            else {
                el.classList.remove("auth-input-error");
            }
        } 

         else if(name==="lastname") {
            if(!value) {
                el.classList.add("auth-input-error");
            }
            else 
                el.classList.remove("auth-input-error");

        }
        
        else if(name === 'email') {
            if(!value || !this.validateEmail(value)) {
                el.classList.add("auth-input-error");
            }
            else 
                el.classList.remove("auth-input-error");
        }
        else if(name === 'password1') {
            if(!value || value.length < 8) {
                el.classList.add("auth-input-error");
            }
            else 
                 el.classList.remove("auth-input-error");

        }
        else if(name === 'password2') {
            if(!value || value.length < 8) {
                el.classList.add("auth-input-error");
            }
            else 
                el.classList.remove("auth-input-error");
        } 
    }
    
    formValidation() {
        let formIsValid = true;
        if(!this.state.firstname) {
            formIsValid = false;
            document.getElementById("signupFirstname").classList.add("auth-input-error");
        }
        if(!this.state.lastname) {
            formIsValid = false;
            document.getElementById("signupLastname").classList.add("auth-input-error");
        }
        if(!this.state.email || !this.validateEmail(this.state.email)) {
            formIsValid = false;
            document.getElementById("signupEmail").classList.add("auth-input-error");
        }
        if(!this.state.password1 || this.state.password1.length < 8) {
             formIsValid = false;
             document.getElementById("signupPassword1").classList.add("auth-input-error");

        }
        if(!this.state.password2 || this.state.password2.length < 8) {
            formIsValid = false;
            document.getElementById("signupPassword2").classList.add("auth-input-error");

        }
        else if(this.state.password1 !== this.state.password2) {
            formIsValid = false;
            document.getElementById("signupPassword1").classList.add("auth-input-error");
            document.getElementById("signupPassword2").classList.add("auth-input-error");
        }
        return formIsValid; 
    }
    handleRegisterSubmit(event) {
        event.preventDefault();
        if(this.formValidation()) {
            const user = {firstname: this.state.firstname,lastname: this.state.lastname,
            email: this.state.email, password: this.state.password1};
            this.props.register(user);
        }
        
    }
    render() {
        const { alert, registering } = this.props;
        return (
            <div className={`${styles.container} container-fluid`}>
                <div className = {`row`}>
                        <div className={`col-md-4 offset-md-4 p-0`}>
                            <div className={`${styles.card}`}>
                                <div className={`${styles.heading}`}>
                                    <h2>Sign Up</h2>
                                    <span>Please fill in this form to create an account!</span>
                                </div>
                                {
                                    alert.message && 
                                    <div className={`alert ${alert.type} auth-alert`}>
                                    {
                                        alert.message.constructor === Array ?
                                        alert.message[0].msg
                                        :
                                        alert.message
                                    }
                                    </div>
                                }
                                <div className={` ${styles.form}`}>
                                    <form>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="text" className={`form-control  ${styles.inputText}`} id="signupFirstname" onBlur= {this.handleElementValidation} name='firstname' value= {this.state.firstName} onChange= {this.handleInputChange} aria-describedby="fnameHelp" placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-user mr-2"></i>First name</span>
                                        </div>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="text" className={`form-control ${styles.inputText}`} id="signupLastname" onBlur= {this.handleElementValidation} name='lastname' value= {this.state.lastName} onChange= {this.handleInputChange} aria-describedby="lnameHelp" placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-user mr-2"></i>Last name</span>
                                        </div>
                                       
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="email" className={`form-control ${styles.inputText}`} id="signupEmail" name="email" value= {this.state.email} onChange= {this.handleInputChange} onBlur= {this.handleElementValidation} aria-describedby="emailHelp" placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-envelope mr-2"></i>Email</span>
                                        </div>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="password" className={`form-control ${styles.inputText}`} id="signupPassword1" name="password1" value= {this.state.password1} onChange= {this.handleInputChange} onBlur= {this.handleElementValidation} placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-key mr-2"></i>Password</span>
                                        </div>
                                        <div className={`form-group ${styles.formGroup}`}>
                                            <input type="password" className={`form-control ${styles.inputText}`} id="signupPassword2" name="password2" value= {this.state.password2} onChange= {this.handleInputChange} onBlur= {this.handleElementValidation} placeholder=" "/>
                                            <span className={`${styles.placeholder}`}><i className="fa fa-key mr-2"></i>Confirm password</span>
                                        </div>     
                                        <div className={`${styles.buttonContainer}`}>
                                            <button type="submit" className={`btn btn-block btn-primary ${styles.submitBtn}`}
                                             onClick = {this.handleRegisterSubmit} disabled= {registering}>
                                            {
                                                 registering ?  
                                                 <img src={require("../assets/oval.svg")} height="22" alt="loading..."/>
                                                 : "Submit"
                                            }
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.footer}>
                                    <Link to="/login">Do you already have an accout?</Link>
                                </div>
                            </div>
                    
                        </div>
                    </div>
            </div>
        )
    }
}

function mapState(state) {
    const { registering} = state.registration;
    const { loggedIn} = state.authentication;
    const { alert } = state;
    return { registering, loggedIn, alert };
}
const actionCreators = {
    register: userActions.register
};

export default connect(mapState, actionCreators)(Signup);
