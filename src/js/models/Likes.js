

export default class Likes{
    constructor() {
        this.likes = [];

    }
    addLike(id,title,author,img){
        const like = {id,title,author,img};
        this.likes.push(like);
        this.storeLikes();
        return like;
    }
    deleteLike(id){
        const index = this.likes.findIndex(el =>el.id === id);
        this.likes.splice(index,1);
        this.storeLikes();
    }
    isLiked(id){
        return  this.likes.findIndex(el => el.id ===id) !== -1;
    }
    numLikes(){
        return this.likes.length;
    }
    storeLikes(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    restoreLikes(){
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) this.likes = storage;
    }

}