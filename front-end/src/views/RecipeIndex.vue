<template>
  <div class="recipes">
    <RecipeList />
  </div>
</template>

<script>
// @ is an alias to /src

import RecipeList from '@/components/RecipeList.vue'

export default {
  name: 'RecipeIndex',
  components: {
    RecipeList
  }
}
</script>
