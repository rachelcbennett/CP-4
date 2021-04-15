<template>
<div class="wrapper">
  <div v-if = "jobview" >
      <div class="job">
      {{this.job.title}}
        <br>
        <img class="job-pic" :src="this.job.path" />

        <p> {{this.job.description}} </p> 
        <p> {{this.job.startdate}}</p>
      </div>
  </div>
  <div v-else class= "jobs">
    <div class='masonry'>
        <div class='masonry-item' v-for='job in jobs' :key='job.id'>
            <div @click="viewJob(job)" class="image">
                <a href ="#"><img :src="job.path" /></a>
            </div>
            <div class= "info">
                <a href ="#"><h2 @click="viewJob(job)">{{job.title}}</h2> </a>
                <a href ="#"><p @click="viewJob(job)"> View Job Listing </p></a>
            </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'JobListings',
    props: {
        products: Array
    },
    data(){
      return {
          jobs:[],
          job:'',
          userName:'',
          description:'',
          startdate:'',
          title:'',
          jobview: false,
      }
    },
    created() {
       this.getJobs();
    },
    methods: {
      async getJobs(){
          try {
              const response = await axios.get('/api/jobs');
              this.jobs = response.data;
          } catch (error ){
              console.log(error);
          }
      },
      async viewJob(job){
          try {
              console.log("HEy");
              console.log(job._id);
              const response = await axios.get(`/api/job/${job._id}`);
              this.job = response.data;
              this.title = job.title;
              this.description = job.description;
              this.startdate = job.startdate;
              this.jobview=true;
          } catch (error ){
              console.log(error);
          }
      }
    }
}

</script>


<style scoped >
    img{
        width:100%;
    }


.masonry{
  column-gap: 1.5em;
}

.masonry-item{
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
    background-color:aliceblue;
}




/* RECIPE DISPLAY*/
.job-pic{
    width:40%;
}


/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .masonry {
    column-count: 4;
  }
  .job{
      width:40%;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .masonry {
    column-count: 3;
  }
  .job{
      width:100%;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .masonry {
    column-count: 2;
  }
  .job{
      width:100%;
  }
}

p{
    text-align: left;
}

.job{
    margin-left:auto;
    margin-right:auto;
}
</style>