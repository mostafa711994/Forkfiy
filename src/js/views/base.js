export const elements = {
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector('.search__field'),
    searchList:document.querySelector('.results__list'),
    dataRes:document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    viewRecipe:document.querySelector('.recipe'),
    shopping:document.querySelector('.shopping__list'),
    likeMenu:document.querySelector('.likes__field'),
    likeList:document.querySelector('.likes__list'),


};

export const spinner = parent => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearSpinner = () =>{
    const loader = document.querySelector('.loader');
    if(loader) loader.parentElement.removeChild(loader);
};
