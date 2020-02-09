<template>
  <div>
    <img
      src="https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67"
      alt
    />
    <h1 class="quiz-heading">How Well Do You Know the Harry Potter Movies?</h1>
    <button class="quiz-button" v-if="stage==='welcome'" @click="initQuizStage">Start Quiz</button>
    <ul class="quiz-choices" v-if="stage==='quiz'">
      <li v-for="movie in movies" :key="movie">{{ movie }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentQuestionNo: 0,
    }
  },
  computed: {
    stage() {
        return !this.currentQuestionNo ? 'welcome' : 'quiz';
    }
  },
  methods: {
    initQuizStage() {
      this.currentQuestionNo = 1;
    }
  }
};
</script>

<style>
.quiz-heading {
  margin: -40px 0 30px;
  font-size: 30px;
  text-shadow: 1px 1px 2px #020815;
  line-height: 1.2;
}

.quiz-button {
  color: #eee;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  padding: 10px 30px;
  border: 1px solid rgba(238, 238, 238, 0.3);
  background: none;
  transition: border-color 0.5s;
}
.quiz-button:hover {
  border-color: #eee;
}
</style>
