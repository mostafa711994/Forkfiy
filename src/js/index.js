import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import {elements, spinner, clearSpinner} from "./views/base";
import * as searchView from './views/viewSearch'
import * as listView from './views/listView'
import * as recipeView from './views/recipeView'
import * as likeView from './views/likeView'


const state = {}

/* Search controller */
const controlSearch = async () => {
    //get query from the view
    const query = searchView.getInput();
    if (query) {
        //new search object and add to state
        state.search = new Search(query);

        // prepare ui for results
        searchView.clearInput();
        searchView.clearResult();
        spinner(elements.dataRes);
        // search for recipes
        await state.search.getResult();

        // render results on ui
        clearSpinner();
        searchView.searchResList(state.search.result);
    }
}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.searchResList(state.search.result, goToPage);
    }
});


/* recipe controller */

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        //prepare ui for recipe
        recipeView.clearRecipe();
        spinner(elements.viewRecipe);
        // highlight the selected recipe
        if (state.search) searchView.highlightSelected(id);
        // create new recipe
        state.recipe = new Recipe(id);


        try {
            // get recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            //calc servings and time
            state.recipe.calServings();
            state.recipe.calcTime();

            // render recipe
            clearSpinner();
            recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));

        } catch (error) {
            alert(error)
        }

    }
}

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));


const controlList  = () =>{
    // create a new list if there is not yet
    if(!state.list) state.list = new List();

    //add each ingredient to the list
    state.recipe.ingredients.forEach(el =>{
        const item = state.list.addItem(el.count,el.unit,el.ingredient);
        //render to ui
        listView.renderItem(item);
    });

}

elements.shopping.addEventListener('click',e=>{

    const id = e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete,.shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);

    } // Handle the count update
    else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateList(id, val);
}

});

state.likes = new Likes();
likeView.toggleLikeMenu(state.likes.numLikes());

/* Likes controller */
const controlLike = () =>{
    if(!state.likes) state.likes = new Likes();

    if(!state.likes.isLiked(state.recipe.id)){
        //add like ti the state
        const addLike = state.likes.addLike(
            state.recipe.id,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img,
        );

        // toggle th like button
        likeView.toggleBtn(true);
        // add likes to UI
        likeView.renderLikeList(addLike);
        console.log(state.likes);
    }else{
        //add like ti the state
            state.likes.deleteLike(state.recipe.id)
        // toggle th like button
        likeView.toggleBtn(false);

        // add likes to UI
        likeView.deleteLikeList(state.recipe.id)
        console.log(state.likes);


    }
    likeView.toggleLikeMenu(state.likes.numLikes());

};

// Restore liked recipes on page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    // Restore likes
    state.likes.restoreLikes();

    // Toggle like menu button
    likeView.toggleLikeMenu(state.likes.numLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likeView.renderLikeList(like));
});






elements.viewRecipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {

        state.recipe.updateServings('inc');
        recipeView.updateIngredients(state.recipe);

    }else if(e.target.matches('.recipe__btn-add,.recipe__btn-add *')){
        controlList();
    }else if(e.target.matches('.recipe__love,.recipe__love *')){
        controlLike();
    }
});












