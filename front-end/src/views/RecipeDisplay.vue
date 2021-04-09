<template>
  <div class="recipe">
      <RecipeList/>
  </div>
</template>

<script>
// @ is an alias to /src

import RecipeList from '@/components/RecipeList.vue'
export default {
  name: 'RecipeDisplay',
  components: {
    RecipeList
  }
}
</script>
