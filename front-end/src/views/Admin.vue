<template>
  <div class="admin">
    <h1>This is an about page</h1>


    <div class='add'>
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
            <button @click="upload">Upload Recipe</button>
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
  methods:{
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
