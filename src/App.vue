<template>
  <div id="app">
    <quiz
      :movies="movies"
      questions-url="https://api.jsonbin.io/b/5e3f0514f47af813bad11ac5"
      :resultsInfo="resultsInfo"
    />
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
      ],
      resultsInfo: {
        0: {
          text: "Practice, practice, practice! <br>You'll be a clever as Dumbledore in no time!",
          img: "https://media0.giphy.com/media/720g7C1jz13wI/giphy.gif?cid=3640f6095c869951776a4a7a5110b5dc"
        },
        1: {
          text: "You still have to practice!",
          img: "https://media0.giphy.com/media/720g7C1jz13wI/giphy.gif?cid=3640f6095c869951776a4a7a5110b5dc"
        },
        2: {
          text: "Not too shabby! <br>Have a Harry Potter movie marathon and then try again!",
          img: "https://media2.giphy.com/media/UeeJAeey9GJjO/giphy.gif?cid=3640f6095c869e703631634241b759c1"
        },
        3: {
          text: "Very good! <br>Have another go and you'll be getting full marks!",
          img: "https://media.giphy.com/media/TGLLaCKWwxUVq/giphy.gif"
        },
        4: {
          text: "TOP MARKS! Nice work! <br>You have some serious wizard wisdom!",
          img: "https://media.giphy.com/media/9H279yb0blggo/giphy.gif"
        }
      }
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
