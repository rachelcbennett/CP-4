<template>
  <div class="jobs">
    <JobListings />
  </div>
</template>

<script>
// @ is an alias to /src


import JobListings from '../components/JobListings.vue'

export default {
  name: 'RecipeIndex',
  components: {
    JobListings
  }
}
</script>

    JobListings