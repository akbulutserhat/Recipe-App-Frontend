import React from 'react';
import '../styles/loading.scss';
export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading-container">
                <div className="cp-spinner cp-bubble"></div>    
            </div>
        )
    }
}