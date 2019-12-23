import React from 'react';
import {connect} from 'react-redux';
import { recipeActions } from '../js/actions';
import queryString from 'query-string'  
import Pagination from "react-js-pagination";

import Recipe from './Recipe';
import styles from '../styles/recipeList.module.scss';
import Loading from './Loading';

class RecipeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 1
        };
    }
    componentDidMount() {   
       this.fetchAllRecipes();
       console.log(this.props);
    }
    componentDidUpdate(prevProps) { // same route, but prop changes
        if(this.props.location.search !== prevProps.location.search) {
            this.fetchAllRecipes();
        }
    }
    getQueryValues() {
        const values = queryString.parse(this.props.location.search)
        return values;
    }
    getCurrentPage() {
        if(!this.getQueryValues().page)
            return 1;
        else
            return Number(this.getQueryValues().page);
    }
    fetchAllRecipes() {
        const {fetchAllRecipes} = this.props;
        const page = this.getCurrentPage();
        fetchAllRecipes(page); // get the recipes of the all users.
    }
    getRecipeList() { // invoked if recipes has been obtained.
        const {result,} = this.props;  // recipes is in defined status while it's invoked.
        if(result) {
            const recipeList = result.map((recipe,index) => <div key={index} className="col-lg-3 col-md-4 col-6 mb-4">
                <Recipe recipe={recipe}/>
                </div>);
            return recipeList;   
        }
       
    }
    handlePageChange(pageNumber) {
        this.props.history.push(`/recipes?page=${pageNumber}`);
    }
    
    render(){
    
        const {loading, totalPage, pagingOffSet,result, alert} = this.props;
     
        if(alert.type && alert.type === "alert-danger") {
            return (
                <div className={`${styles.alertContainer}`}>
                    <h3 className={`alert ${alert.type} ${styles.alert}`}>{alert.message}</h3>
                </div>
            )
        }
        else if(loading) {
            return <Loading/>
        }
        else if(result)
        {
            return(
                <>
                    <div className={`${styles.container} container`}>
                        <h3 className={`${styles.title}`}>{this.props.pageTitle}</h3>
                        <div className="row">
                            {this.getRecipeList()}
                        </div>
                        <Pagination
                            activePage={this.getCurrentPage()} // it wants just a number not a function(no need to bind)
                            itemsCountPerPage={16}
                            totalItemsCount={totalPage && pagingOffSet ? totalPage * pagingOffSet : 16}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                            innerClass={styles['pagination']}
                            activeLinkClass={styles['pagination--active-element']}
                        />
                    </div>
                    
                </>
            )
        }
        return null;
    }
}
function mapState(state,) {
    const { loading, totalPage, pagingOffSet, result} = state.recipes;
    const { alert } = state;
    return { loading, totalPage, pagingOffSet, result, alert };
}

const actionCreators = {
    fetchAllRecipes: recipeActions.fetchAllRecipes
};

export default connect(mapState, actionCreators)(RecipeList);