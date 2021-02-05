export default function({ store, redirect }) {
    if (!store.getters.getIsAdmin){
      return redirect("/");
    }
  } 
  