import React from 'react';
import {connect} from 'react-redux';
import { recipeActions} from '../js/actions';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import styles from '../styles/recipeDetail.module.scss';


class RecipeDetail extends React.Component {
    componentDidMount() {
        this.fetchRecipe();
     }
     getRecipeIdParam() {
        return this.props.match.params.recipeId;    
     }
     fetchRecipe() {
         const {fetchRecipeByID} = this.props;
         const id = this.getRecipeIdParam();
         fetchRecipeByID(id);
     }
     getRecipeCreationDate(date) {
        var javaDate = new Date(date).toISOString();
        var arr = javaDate.split("T");
        //return arr[0]; // this is d/m/y
        var timezone = arr[1].split(":");
        var result;
        result = arr[0];
        result = result + " "+ timezone[0]+ ":" + timezone[1];
        return result;
     }
     getRecipeDirections(directions) {
         const arr = directions.split("\n");
         return arr;
     }

    getImageRecipe() {
        const {recipe} = this.props;
        const img =  recipe.recipe.image ? <img src={`data:image/jpg;base64,${recipe.recipe.image}`} alt="rec_img"/> 
        : 
        <img src={require("../assets/not_found.png")} alt="recipe_img"/>
        return img;
    }
    render() {
        console.log(this.props.recipe);
        const {loading, recipe, alert} = this.props;
        if(loading ||  (!recipe && alert.type !== "alert-danger")) {
            return(
                <Loading/>
            )
        }else if(alert.type === "alert-danger") {
            return (
                <div className={`alert ${alert.type} auth-alert`}>{alert.message}</div>
            )
        } 
        else 
            return(
                <div className={`container ${styles.container}`}>
                    <div className="row">
                        <div className={`col-sm-7 ${styles.recipeContainer}`}>
                            <h2 className ={`d-none d-md-block ${styles.title}`}>{recipe.recipe.name} ({(recipe.recipe.categoryName.toLowerCase())})</h2>
                            <h5 className={`d-block d-md-none  ${styles.title}`}>{recipe.recipe.name} ({(recipe.recipe.categoryName.toLowerCase())}</h5>
                            <div className={styles.imgContainer}>
                               { this.getImageRecipe()}
                            </div>
                            <div className={`${styles.information}`}>
                               <div>
                                    <i className="fas fa-table"></i>
                                    <span className={styles.text}>{this.getRecipeCreationDate(recipe.recipe.createdAt)}</span>
                                </div>
                                <div>
                                    <i className="fas fa-utensils"></i>
                                    <span className={styles.text}>{recipe.recipe.yieldServingsLow}-{recipe.recipe.yieldServingsHigh} servings</span>
                                </div>
                                <div>
                                    <img src={require("../assets/prep-time.svg")} height="22" alt="prep-time-icon"/>
                                    <span className={styles.text}>{recipe.recipe.prepTimeMins} minutes</span>
                                </div>
                                <div>
                                    <i className="fas fa-clock"></i>
                                    <span className={styles.text}>{recipe.recipe.cookTimeMins} minutes</span>
                                </div>
                                <div>
                                    <i class="fas fa-hourglass"></i>
                                    <span className={styles.text}>{recipe.recipe.totalTime} minutes</span>
                                </div>
                            </div>
                            <div className={`${styles.ingredients}`}>
                                <h3 className ={`d-none d-md-block ${styles.ingredientsTitle}`}>Ingredients</h3>
                                <h5 className={`d-block d-md-none  ${styles.ingredientsTitle}`}>Ingredients</h5>
                                <hr/>
                                <ul className={`row ${styles.ingredientsList}`}>
                                    {
                                        recipe.Ingredients.constructor === Array &&
                                        recipe.Ingredients.map((ingredient,index) =>
                                        <li key={index} className="col-sm-6">
                                            <i className="fas fa-dot-circle mr-3"></i>
                                            {ingredient.amount.toLowerCase()} {ingredient.name.toLowerCase()}
                                        </li>)
                                    }
                                </ul>
                            </div>
                            <div className={`${styles.directions}`}>
                                <h3 className ={`d-none d-md-block ${styles.directionsTitle}`}>Directions</h3>
                                <h5 className={`d-block d-md-none  ${styles.directionsTitle}`}>Directions</h5>
                                <hr/>
                                <ol className={styles.recipeDirectionsList}>
                                    { 
                                        this.getRecipeDirections(recipe.recipe.directions).map((direction,index) =>
                                        <li key={index} className="">
                                            {direction}
                                        </li>)
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

function mapState(state) {
    const { loading, recipe } = state.recipes;
    const { alert } = state;
    return { loading, recipe, alert };
}
const actionCreators = {
    fetchRecipeByID: recipeActions.fetchRecipeByID
};

export default connect(mapState, actionCreators)(RecipeDetail);
