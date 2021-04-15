<template>
  <div class="admin">
    
    <div id = 'users'>
        <button v-for='user in users' :key=user.id @click=selectUser(user)>{{user.name}}</button>
    </div>
    <ul>

        <li v-for="job in jobs" :key="job.id">
            {{job.title}} <button @click="deleteJob(job)"> Delete </button>
        </li>

    </ul>
    <div class='add'>
        <form @submit.prevent="addUser">
            <input type="text" v-model="userName">

            <button type="submit">Add a New User</button>
        </form>
        <div class='form'>
            <input v-model="title" placeholder="Job Title">
            <br>
            <br>
            <textarea v-model="description" placeholder="Description"></textarea>
            <br>
            <textarea v-model="startdate" placeholder="Start Date"></textarea>
            <br>
            <input type="file" name="photo" @change="fileChanged">
            <br>
            <button @click="addJob">Upload Job</button>
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
          jobs:[],
          userName:'',
          description:'',
          startdate:'',
          title:'',
      }
  },
  created() {
    this.getUsers();
  },
  methods: {
      async addJob(){
          try {
            
            const formData = new FormData();
            formData.append('photo', this.file,this.file.name)
            let r1 = await axios.post('/api/photos', formData);
            await axios.post(`/api/users/${this.user._id}/job`,{
                title:this.title,
                description: this.description,
                startdate: this.startdate,
                path: r1.data.path,
            });
            this.getJobs();
          }catch(error){
              console.log(error)
          }
      },
      async deleteJob(job){
          try {
              await axios.delete(`/api/users/${this.user._id}/jobs/${job._id}`)
              this.getJobs();
          }
          catch(error){
              console.log(error)
          }
      },

      async getJobs(){
        try {
            const response = await axios.get(`/api/users/${this.user._id}/jobs`);
            this.jobs = response.data;
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
          this.getJobs();
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
                description: this.description,
                startdate: this.startdate,
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