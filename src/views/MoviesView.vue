<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import genreStore from '@/stores/genres'
import { useTemplateStore } from '@/stores/template'
import { useRouter } from 'vue-router'

const router = useRouter()
const templateStore = useTemplateStore()
const movies = ref([])

function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')
const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  templateStore.setIsLoading(true)
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  })
  movies.value = response.data.results
  templateStore.setIsLoading(false)
}

onMounted(async () => {
  templateStore.setIsLoading(true)
  await genreStore.getAllGenres('movie')
  templateStore.setIsLoading(false)
})
</script>

<template>
  <h1>Filmes</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listMovies(genre.id)"
      class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }"
    >
      {{ genre.name }}
    </li>
  </ul>
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span
            v-for="genre_id in movie.genre_ids"
            :key="genre_id"
            @click="listMovies(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #272883;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #595bf5;
  box-shadow: 0 0 0.5rem #272883;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
  margin: 3px;
  background-color: #f0f0f0;
  padding: 6px;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.movie-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  margin-top: 4px;
}

.movie-genres span {
  background-color: #272883;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #595bf5;
  box-shadow: 0 0 0.5rem #272883;
}
.active {
  background-color: #595bf5;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #595bf5;
  color:#fff;
  font-weight: bolder;
}
</style>
