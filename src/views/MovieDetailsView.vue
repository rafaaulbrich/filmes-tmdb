<script setup>
  import { defineProps, onMounted } from 'vue';
  import { useMovieStore } from '@/stores/movie';
  
  const movieStore = useMovieStore();

  const props = defineProps({
    movieId: {
      type: Number,
      required: true,
    },
  });

  onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
  });
</script>

<template>
  
  <div class="main">
    <div class="content">
      <img class="img"
        :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
      />

      <div class="details">
        <h1>Filme - {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }} {{ movieStore.currentMovie.overview }}</p> 
        <p>Orçamento: ${{ movieStore.currentMovie.budget }} </p>        
        <p>Avaliação: {{ movieStore.currentMovie.vote_average.toFixed(0) }}</p> 
      </div>
    </div>
  </div>

  <h3>Produtoras:</h3>
  <div class="companies">
    <template
      v-for="company in movieStore.currentMovie.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
  
</template>

<style scoped>
  .companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
  }
  .img{
    margin-top: 15px;
    margin-left: 40%;
    height: 350px;
    width: 250px;
  }
</style>