<template>
<div class="wrapper">
  <div class="recipes">
    <div class='recipe' v-for='recipe in recipes' :key='recipe.id'>
      <div class="image">
        <img :src="recipe.path" />
      </div>
      <div class= "info">
          <h2>{{recipe.title}}</h2>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'RecipeList',
    props: {
        products: Array
    },
    create: {
       
    },
    methods:{
      addProductToCart(product){
          this.$root.$data.cart.push(product);
          return;
      },
  },
}
</script>

