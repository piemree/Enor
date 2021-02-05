 export default function({ store, redirect }) {
  if (store.getters.getIsAuth){
    return redirect("/");
  }
} 
