<template>
  <div id="app">
     <quiz :movies="movies"/>
  </div>
</template>

<script>
import Quiz from "./components/Quiz.vue";

export default {
  name: 'App',
  components: {
    Quiz
  },
  data() {
    return {
      movies: [
        "Harry Potter and the Philosopher's Stone",
        "Harry Potter and the Chamber of Secrets",
        "Harry Potter and the Prisoner of Azkaban",
        "Harry Potter and the Goblet of Fire",
        "Harry Potter and the Order of the Phoenix",
        "Harry Potter and the Half-Blood Prince",
        "Harry Potter and the Deathly Hallows - Part 1",
        "Harry Potter and the Deathly Hallows - Part 2"
      ]
    };
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  height: 100%;
  background: #020815;
  color: #eee;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
