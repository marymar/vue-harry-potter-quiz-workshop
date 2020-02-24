<template>
  <div>
    <img
      :src="image"
      alt
    />
    <h1 class="quiz-heading">{{ title }}</h1>
    <button class="quiz-button" v-if="stage==='welcome'" @click="initQuizStage">Start Quiz</button>
    <ul class="quiz-choices" v-if="stage==='quiz'">
      <li v-for="answerNumber in answers" :key="answerNumber">
        <button
          @click="handleAnswer(answerNumber)"
          class="quiz-button"
          :class="{ 'correct': isCorrectAnswer(answerNumber) && currentUserAnswer === answerNumber,
            'wrong': !isCorrectAnswer(answerNumber) && currentUserAnswer === answerNumber
          }">{{ movies[answerNumber - 1] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movies: {
      type: Array,
      required: true
    },
    questionsUrl: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      questions: [],
      currentQuestionNumber: 0,
      currentUserAnswer: null,
      userAnswers: [],
    }
  },
  async mounted() {
    const res = await fetch(this.questionsUrl);
    this.questions = (await res.json()).questions;
    console.log(this.questions);
  },
  computed: {
    stage() {
        return this.currentQuestionNumber === 0 ? 'welcome' : 'quiz';
    },
    image() {
      return this.currentQuestionNumber
      ? this.questions[this.currentQuestionNumber].img
      : "https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67";
    },
    title() {
      return this.currentQuestionNumber
      ? 'Which movie is this?'
      : 'How Well Do You Know the Harry Potter Movies?';
    },
    answers() {
    return this.currentQuestionNumber
        ? this.questions[this.currentQuestionNumber - 1].answers
        : [];
    }
  },
  methods: {
    initQuizStage() {
      this.currentQuestionNumber = 1;
    },
    isCorrectAnswer(answerNumber) {
      return (
        this.currentUserAnswer &&
        answerNumber === this.questions[this.currentQuestionNumber - 1].correct
      );
    },
    handleAnswer(answerNumber) {
      this.currentUserAnswer = answerNumber;
      this.userAnswers.push(answerNumber);

      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      this.currentUserAnswer = null;
      ++this.currentQuestionNumber;
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
.quiz-button.wrong {
  background-color: red;
}
.quiz-button.correct {
  background-color: green;
}
.quiz-choices {
  list-style: none;
  margin: 0;
}
.quiz-choices li {
  padding: .5em;
}
</style>
