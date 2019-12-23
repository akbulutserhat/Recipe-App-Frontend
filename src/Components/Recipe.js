import React from 'react';
import {connect} from 'react-redux';
import styles from '../styles/recipe.module.scss';
import {Link, withRouter} from 'react-router-dom';
import {recipeActions, userActions} from '../js/actions';
class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
    }
    removeSpaces(str) {
        return str.replace(/\s/g, '-')
    }
    getImageRecipe() {
        const {recipe} = this.props;
        console.log(recipe);
       const img = recipe.RecipeImages.length > 0 && recipe.RecipeImages[0].image ? <img src={`data:image/jpg;base64,${recipe.RecipeImages[0].image}`} alt="rec_img"/> 
       : <img src={require("../assets/not_found.png")} className={styles["img-not-found"]} alt="recipe_img"/>;
       return img;
    }
    isFavorite() {
        const {recipe, user} = this.props;
        const {id} = recipe;
        if(user) {
            const {favoriteRecipes} = user;
            for(let i=0; i<favoriteRecipes.length; i++) {
                if(favoriteRecipes[i].id===id)
                {
                    return true;
                }
            }
        }
        return false;
    }
    handleAddFavorite(e) {
        const {user,addFavorites,deleteFromFavorites, recipe, loading, loadingId} = this.props;
        const {id} = recipe;
        if(!user) {
            this.redirectIfNotAuthorized();
        }
        else {
            if(loading && loadingId === id) {
                e.preventDefault();
            }
            if(!this.isFavorite()) { // if movie has not already been in the favorites.
                addFavorites(id);
            } 
            else {
                deleteFromFavorites(id);
            }
        }
      
    }
    async handleDeleteRecipe(e) {
        const {user, recipe,deleteRecipe} = this.props;
        const {id} = recipe;
        if(!user) {
            this.redirectIfNotAuthorized();
        }
        else {
            await deleteRecipe(id);
            window.location.reload(false);
        }
      
    }
    redirectIfNotAuthorized() {
        this.props.history.push('/login');
    }
   
    render() {
        this.isFavorite();
        const {recipe, user, loading, loadingId} = this.props;
        return(
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    {this.getImageRecipe()}
                    <div className={`${styles['like-recipe']} ${this.isFavorite() &&  styles['like-recipe-unfav']}`}
                    onClick = {this.handleAddFavorite}>
                        {
                           <i className={`fas fa-heart ${styles['like-recipe--icon']}`}></i>
                        }
                    </div>
                    <div className={`${styles['delete-recipe']}`}
                    onClick = {this.handleDeleteRecipe}>
                        {
                           <i className={`fas fa-trash ${styles['delete-recipe--icon']}`}></i>
                        }
                    </div>
                </div>
             
                <div className={styles.textContainer}>
                    <Link to={`/${this.removeSpaces(recipe.name)}-recipe/${recipe.id}`} className={styles['textContainer--link']} >
                        {this.props.recipe.name}
                    </Link>
                </div>
                
            </div>
        )
    }
} 

function mapState(state) {
    const { user} = state.authenticatedUser;
    const {loading, loadingId} = state.addFavorites; // loading while adding or deleting from list.
    const { alert } = state;
    return { user, alert, loading, loadingId};
}

const actionCreators = {
    addFavorites: recipeActions.addFavorites,
    deleteFromFavorites: recipeActions.deleteFromFavorites,
    authenticatedUser: userActions.authenticatedUser,
    deleteRecipe:recipeActions.deleteRecipe
};

export default connect(mapState, actionCreators)(withRouter(Recipe));