import React from 'react';
import {connect} from 'react-redux';
import {recipeActions} from '../js/actions';
import styles from '../styles/createRecipe.module.scss';

class CreateRecipe extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            categoryId: -1,
            recipeName: "",
            prepTimeMins: '',
            cookTimeMins: "",
            yieldServingsLow: "",
            yieldServingsHigh: "",
            directions: [{ direction: "" }],
            recipeImage: null,
            ingredientId: -1,
            ingredients: []   /// {ingredientId:1, amount: "250gram"}
            ,formErrors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleIngredientAmountChange = this.handleIngredientAmountChange.bind(this);
        this.handleIngredientAmountRemove = this.handleIngredientAmountRemove.bind(this);
        this.handleAddDirection = this.handleAddDirection.bind(this);
        this.handleRemoveDirection = this.handleRemoveDirection.bind(this);
        this.handleDirectionChange = this.handleDirectionChange.bind(this); 
        this.handleElementValidation = this.handleElementValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.uploadImageFile = this.uploadImageFile.bind(this);
    }
    componentDidMount() {
        this.props.fetchAllCategories();
        this.props.fetchAllIngredients();
    }
    alert() {
        const {created_recipe, alert} = this.props;
        if(created_recipe && alert && alert.message)
        {
          return(
            <div className={`alert ${alert.type} ${styles.alertMsg}`}>
                {
                    alert.message
                }
            </div>
          ) 
        }
    }
    handleAddDirection = () => {
        this.setState({
          directions: this.state.directions.concat([{ direction: "" }])
        });
      };
    
      handleRemoveDirection = idx => () => {
        if(this.state.directions.length > 1)
        this.setState({
          directions: this.state.directions.filter((s, sidx) => idx !== sidx)
        },()=> {
            if(idx === 0) {
                const {formErrors} = this.state;
                formErrors[`direction${idx}`] = '';
                this.setState({formErrors});
            }
        });
      };
      handleDirectionChange = idx => evt => {
        const newDirections = this.state.directions.map((direction, sidx) => {
          if (idx !== sidx) return direction;
          return { ...direction, direction: evt.target.value };

        });
        this.setState({ directions: newDirections });
        this.handleElementValidation(evt);
      };
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
        this.handleElementValidation(event);
      }
    categoryListOptions() {
        const {categories} = this.props;
        if(categories) {
            const mapped = categories.map((c,index) =>{
                return <option key={c.id} value={c.id}>{c.name}</option>       
            });
            return [<option key={-1} value={-1} disabled>Select your recipe category</option>,...mapped];
        }
    }

    ingredientListOptions() {
        const {ingredients} = this.props; 
        if(ingredients) {
            const mapped = ingredients.map((c,index) =>{
                return <option key={c.id} value={c.id}>{c.name}</option>       
            });
            return [<option key={-1} value={-1} disabled>Add a new ingredient</option>,...mapped];
        }
    }
    handleAddIngredient(event) {
        const selectedIngID = Number(event.target.value);
        this.setState({
            ingredients: this.state.ingredients.concat([{id: selectedIngID, amount: "" }])
        });
        document.getElementById(`addIngredient`).classList.remove(styles.recipeInputError);
    }

    handleIngredientAmountRemove = idx => () => {
        this.setState({
          ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
        },()=> {
            const {formErrors} = this.state;
            formErrors[`ingredientAmount${idx}`] = '';
            this.setState({formErrors});
        });
      };
    getIngredientName(id) {
      const {ingredients} = this.props; 
        if(ingredients) {
            for(let i=0; i<ingredients.length; i++) {
                if(ingredients[i].id === id) {
                    return ingredients[i].name;
                }
            }
        }
    }
    ingredientAmountInputs() {
        return (
            this.state.ingredients.map((ingredient,idx) => (
                <div className={`form-group ${styles.formGroup} ${styles.ingredientAmountContainer}`} key={idx}>
                    <label>{this.getIngredientName(ingredient.id)}</label>
                    <div className={styles.ingredientAmount}>
                        <input type="text"
                        className= {`form-control shadow-sm ${this.formError_css_class(`ingredientAmount${idx}`)}`}
                        placeholder={`Please specify the amount`}
                        id={`ingredientAmount${idx}`}
                        name={`ingredientAmount${idx}`}
                        value={ingredient.amount}
                        onChange = {this.handleIngredientAmountChange(idx)}
                        onBlur = {this.handleElementValidation}
                        />
                        <button
                        type="button"
                        onClick={this.handleIngredientAmountRemove(idx)}
                        className={`btn btn-sm btn-danger shadow-sm ${styles.removeElementBtn}`}
                    >
                        <i className="fa fa-minus-circle"></i>
                    </button>
                    </div>
                  
                </div>
            ))
        )
    }
    handleIngredientAmountChange = idx => evt => {
        const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
          if (idx !== sidx) return ingredient;
          return { ...ingredient, amount: evt.target.value };
        });
        this.setState({ ingredients: newIngredients },(()=> {
            this.handleElementValidation(evt);
        })(evt));
    };
    
    directions() {
        return(
            this.state.directions.map((direction, idx) => (
                <div className={styles.direction} key={idx}>
                  <input
                    type="text"
                    className= {`form-control  shadow-sm ${this.formError_css_class(`direction${idx}`)}`}
                    placeholder={`Direction#${idx + 1}`}
                    id={`direction${idx}`}
                    name={`direction${idx}`}
                    value={direction.direction}
                    onChange = {this.handleDirectionChange(idx)}
                    onBlur = {this.handleElementValidation}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveDirection(idx)}
                    className={`btn btn-sm btn-danger shadow-sm ${styles.removeElementBtn}`}
                  >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                </div>
            ))
        );
    }

    handleElementValidation(event) {
        const name = event.target.name;
        const value = event.target.value;
        const {formErrors} = this.state; 

        if(name === 'categoryId' || name === "prepTimeMins" ||
            name === "cookTimeMins" || name=== "yieldServingsLow" ||name === "yieldServingsHigh" ) {
            if(!value) {
                formErrors[name] = styles.recipeInputError;
            }
            else 
                formErrors[name] = '';
        }
        else if(name === 'recipeName' || name === 'direction0' || name.includes('ingredientAmount')) {
            if(!value) {
                formErrors[name] = styles.recipeInputError;
            }
            else  
                formErrors[name] = '';
        }
        this.setState({formErrors: formErrors});
    }
    uploadImageFile(event) {
        this.setState({
            recipeImage: event.target.files[0],
            loaded: 0
          })
    }
    formValidation() {
        let formIsValid = true;
        let formErrors= {};
        if(this.state.categoryId === -1) {
            formIsValid = false;
            formErrors['categoryId'] = styles.recipeInputError;
        }
        if(!this.state.recipeName) {
             formIsValid = false;
             formErrors['recipeName'] = styles.recipeInputError;
        }
        if(!this.state.prepTimeMins) {
            formIsValid = false;
            formErrors['prepTimeMins'] = styles.recipeInputError;
        }
        if(!this.state.cookTimeMins) {
            formIsValid = false;
            formErrors['cookTimeMins'] = styles.recipeInputError;
        }
        if(!this.state.yieldServingsLow) {
            formIsValid = false;
            formErrors['yieldServingsLow'] = styles.recipeInputError;
        }
        if(!this.state.yieldServingsHigh) {
            formIsValid = false;
            formErrors['yieldServingsHigh'] = styles.recipeInputError;
        }
        // validate direction list
        if(!this.state.directions[0].direction) {
            formIsValid = false;
            formErrors['direction0'] = styles.recipeInputError;
        }  
        if(this.state.ingredients.length === 0 ) {
            formIsValid = false;
            formErrors['addIngredient'] = styles.recipeInputError;
        }
        else{
            for(let i=0; i<this.state.ingredients.length; i++) 
            {
                if(!this.state.ingredients[i].amount) {
                    formIsValid = false;
                    formErrors[`ingredientAmount${i}`] = styles.recipeInputError;
                }
            }
        }
        this.setState({formErrors});
        return formIsValid; 
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.formValidation()) {
            const {createRecipe} = this.props;
            const recipe = {...this.state};
            delete recipe["ingredientId"];
            delete recipe["formErrors"];
            const formData = new FormData(); 
            const data = this.toFormData(recipe,formData, '');
            console.log(data);
            createRecipe(data);
        } 
       

    }
    toFormData(obj, form, namespace) {
        let fd = form || new FormData();
        let formKey;
        
        for(let property in obj) {
          if(obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
              formKey = namespace + '[' + property + ']';
            } else {
              formKey = property;
            }
           
            // if the property is an object, but not a File, use recursivity.
            if (obj[property] instanceof Date) {
              fd.append(formKey, obj[property].toISOString());
            }
            else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
              this.toFormData(obj[property], fd, formKey);
            } else { // if it's a string or a File object
              fd.append(formKey, obj[property]);
            }
          }
        }
        
        return fd;
      }
    formError_css_class(name) {
        if(this.state.formErrors[name]) {
            return this.state.formErrors[name];
        }
    }
    render() {
        const {creating_recipe} = this.props;
        return(
            <div className={`row ${styles.container}`}>
                <div className="col-sm-6 offset-sm-3">
                    <h2 className={`d-none d-md-block ${styles.pageTitle}`}>Create a new recipe</h2>
                    <h5 className={`d-block d-md-none ${styles.pageTitle}`}>Create a new recipe</h5>
                    {this.alert()}
                    <form method="post" enctype="multipart/formdata" onSubmit={this.handleSubmit} className={styles.recipeForm}>
                        <div className={`form-group`}>
                            <select name="categoryId" id="categoryId" className={`form-control shadow-sm ${this.formError_css_class('categoryId')}`}
                             value={this.state.categoryId} onChange = {this.handleInputChange}>
                                {this.categoryListOptions()}
                            </select>
                        </div>
                        <div className={`form-group`}>
                            <input type="text" name="recipeName" id="recipeName" placeholder="Recipe title"  onBlur={this.handleElementValidation}
                            className={`form-control shadow-sm ${this.formError_css_class('recipeName')}`} value={this.state.recipeName}  onChange = {this.handleInputChange}/>
                        </div>
                        <div className={`form-group`}>
                            <input type="number" name="prepTimeMins"  id="prepTimeMins" placeholder= "Preparation time in minutes"
                             min='0' max='300' className={`form-control shadow-sm ${this.formError_css_class('prepTimeMins')}`}
                             value={this.state.prepTimeMins} onChange={this.handleInputChange} onBlur={this.handleElementValidation}
                            />
                        </div>
                        <div className={`form-group`}>
                            <input type="number" name="cookTimeMins"  id="cookTimeMins" placeholder= "Cooking time in minutes"
                             min='0' max='300' className={`form-control shadow-sm ${this.formError_css_class('cookTimeMins')}`}
                             value={this.state.cookTimeMins} onChange={this.handleInputChange} onBlur={this.handleElementValidation}
                            />
                        </div>
                        <div className={`form-group`}>
                          
                            <input type="number" name="yieldServingsLow"  id="yieldServingsLow" placeholder= "Yield servings low"
                             min='0' max='300' className={`form-control shadow-sm ${this.formError_css_class('yieldServingsLow')}`}
                             value={this.state.yieldServingsLow} onChange={this.handleInputChange} onBlur={this.handleElementValidation}
                            />
                        </div>
                        <div className={`form-group`}>
                            <input type="number" name="yieldServingsHigh"  id="yieldServingsHigh" placeholder= "Yield servings high"
                             min={this.state.yieldServingsLow} max='300' className={`form-control shadow-sm ${this.formError_css_class('yieldServingsHigh')}`}
                             value={this.state.yieldServingsHigh} onChange={this.handleInputChange} onBlur={this.handleElementValidation}
                            />
                        </div>
                        <div className={`${styles.ingredientContainer}`}>
                            <h6>ingredients</h6>
                            <div className={`form-group`}>
                                <select name="addIngredient" id="addIngredient" className={`form-control shadow-sm ${this.formError_css_class('addIngredient')}`}
                                 value={this.state.ingredientId} onChange = {this.handleAddIngredient}  onBlur={this.handleElementValidation}> 
                                    {this.ingredientListOptions()}
                                </select>
                            </div>
                            {this.ingredientAmountInputs()}
                        </div>
                        <div className={`form-group ${styles.directionContainer}`}>
                            <h6>Directions</h6>
                            {this.directions()}
                            <button type="button" onClick={this.handleAddDirection} 
                            className={`btn btn-info btn-block shadow-sm ${styles.addDirection}`}>
                             Add a new direction
                            </button>
                        </div>
                        <div className={`form-group`}>
                            <h6>Upload an image for your recipe</h6>
                           <input type="file" name="file" className={`${styles['upload-input']}`} onChange={this.uploadImageFile}/>
                        </div>
                        <button type="submit" className={`btn btn-primary btn-block ${styles.submitBtn}`}>
                        {
                            creating_recipe ?  
                            <img src={require("../assets/oval.svg")} height="22" alt="loading..."/>
                            : "Post Recipe"
                        } 
                        </button>
                    </form>
                </div>
               
            </div>
        )
    }
}

function mapState(state) {
    const { categories_loading, categories } = state.recipeCategories;
    const { ingredients_loading, ingredients} = state.recipeIngredients;
    const { creating_recipe, created_recipe } = state.createRecipe;
    const { alert } = state;
    return { categories_loading, categories, ingredients_loading, ingredients, creating_recipe,
         created_recipe, alert };
}
const actionCreators = {
    fetchAllCategories: recipeActions.fetchAllRecipeCategories,
    fetchAllIngredients: recipeActions.fetchAllIngredients,
    createRecipe: recipeActions.createRecipe
};

export default connect(mapState, actionCreators)(CreateRecipe);

