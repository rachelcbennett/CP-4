<template>
  <div class="admin">
    
    <div id = 'users'>
        <button v-for='user in users' :key=user.id @click=selectUser(user)>{{user.name}}</button>
    </div>
    <ul>

        <li v-for="recipe in recipes" :key="recipe.id">
            {{recipe.title}}
            
        </li>

    </ul>
    <div class='add'>
        <form @submit.prevent="addUser">
            <input type="text" v-model="userName">

            <button type="submit">Add a New User</button>
        </form>
        <div class='form'>
            <input v-model="title" placeholder="Recipe Title">
            <br>
            <br>
            <textarea v-model="ingredients" placeholder="Ingredients"></textarea>
            <br>
            <textarea v-model="instructions" placeholder="Instructions"></textarea>
            <br>
            <input type="file" name="photo" @change="fileChanged">
            <br>
            <button @click="addRecipe">Upload Recipe</button>
        </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Admin',
  components: {
    
  },
  data(){
      return {
          user: '',
          users: [],
          recipes:[],
          userName:'',
          ingredients:'',
          instructions:'',
          title:'',
      }
  },
  created() {
    this.getUsers();
  },
  methods: {
      async addRecipe(){
          try {
            
            const formData = new FormData();
            formData.append('photo', this.file,this.file.name)
            let r1 = await axios.post('/api/photos', formData);
            await axios.post(`/api/users/${this.user._id}/recipes`,{
                title:this.title,
                ingredients: this.ingredients,
                instructions: this.instructions,
                path: r1.data.path,
            });
            this.getRecipes();
          }catch(error){
              console.log(error)
          }
      },

      async getRecipes(){
        try {
            const response = await axios.get(`/api/users/${this.user._id}/recipes`);
            this.recipes = response.data;
        } catch (error) {
            console.log(error);
        }
      },
      async addUser(){
          console.log('Attempting to add user')
          try{
              await axios.post("/api/users", {
                  name: this.userName,
              });
              await this.getUsers();
          } catch (error){
              console.log(error);
          }
      },
      async getUsers(){
          try {
              const response = await axios.get('/api/users');
              this.users = response.data;
          }catch (error ){
              console.log(error);
          }
      },
      selectUser(user){
          this.user = user;
          this.getRecipes();
      },
      fileChanged(event){
         this.file = event.target.files[0]
      },
      async upload(){
          try{
            const formData = new FormData();
            formData.append('photo', this.file,this.file.name)
            let r1 = await axios.post('/api/photos', formData);
            let r2 = await axios.post('/api/items', {
                title: this.title,
                ingredients: this.ingredients,
                instructions: this.instructions,
                path: r1.data.path
            });
            this.addItem=r2.data;
          } catch(error){
            console.log("Error in upload")
          }
      } 
      

  }
}
</script>
