import React,{Component} from 'react';
import styles from '../styles/account.module.scss';
import Profile from '../Components/Profile';
class Account extends Component {
    render() {
        return (
        <div className={styles['account-container']}> 
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#myrecipes" role="tab" aria-controls="myrecipes" aria-selected="false">My Recipes</a>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <Profile/>
                </div>
                <div class="tab-pane fade" id="myrecipes" role="tabpanel" aria-labelledby="contact-tab">
                    
                </div>
            </div>
        </div>
        
        )
    }
}

export default Account;