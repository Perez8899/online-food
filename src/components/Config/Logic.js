//if it is on the list it is deleted and if it is not on the list we add it
export const isPresentInFavorites=(favorities,restaurants)=>{
    for(let data of favorities){
      if(restaurants.id===data.id)return true
    }
    return false;
  }