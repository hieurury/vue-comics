<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<script setup>
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://anime-db.p.rapidapi.com/anime',
  params: {
    page: '1',
    size: '10',
    search: 'Fullmetal',
    genres: 'Fantasy,Drama',
    sortBy: 'ranking',
    sortOrder: 'asc'
  },
  headers: {
    'x-rapidapi-key': '1109e57f88msh8b9cfe8ef5ca2cep1ae5c1jsn2d9d0e28fcf4',
    'x-rapidapi-host': 'anime-db.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
</script>

<style lang="scss" scoped>

</style>