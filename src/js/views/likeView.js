import {elements} from './base';


export const toggleBtn = isLiked =>{
    const like = isLiked ?'icon-heart':'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${like}`);
};

export const toggleLikeMenu = numLikes =>{
    elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLikeList = like =>{
    const markup = `
                     <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.img}" alt="${like.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${like.title}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>
                `;
    elements.likeList.insertAdjacentHTML('beforeend',markup);

}

export const deleteLikeList = (id) =>{
    const el = document.querySelector(`.likes__link[href*="${id}"]`);
    if(el) el.parentElement.removeChild(el);
}