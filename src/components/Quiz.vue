<template>
  <div>
    <img
      :src="image"
      alt
    />
    <h1 class="quiz-heading">{{ title }}</h1>
    <button class="quiz-button" v-if="stage==='welcome'" @click="initQuizStage">Start Quiz</button>
    <ul class="quiz-choices" v-if="stage==='quiz'">
      <li v-for="answerNo in answers" :key="answerNo">
        <button
          @click="handleAnswer(answerNo)"
          class="quiz-button"
          :class="{ 'correct': evaluate(answerNo) && userAnswer === answerNo,
            'wrong': !evaluate(answerNo) && userAnswer === answerNo
          }">{{ movies[answerNo - 1] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mutations, store, actions } from "../store";

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
      currentQuestionNo: 0,
      userAnswer: null,
      userAnswers: [],
    }
  },
  async mounted() {
    await actions.fetchData(this.questionsUrl);
    if (store.stage === "welcome") {
      this.initWelcomeStage();
    } else if (store.stage === "quiz") {
      this.initQuizStage();
    }

  },
  computed: {
    stage() {
        return store.stage;
    },
    image() {
      return store.currentQuestionNo
      ? store.currentQuestion.img
      : "https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67";
    },
    title() {
      return store.title
    },
    answers() {
      return store.currentQuestion.answers
        ? store.currentQuestion.answers
        : [];
    },
  },
  methods: {
    initWelcomeStage() {
      mutations.setStage("welcome");
      mutations.resetUserAnswers();
      mutations.setCurrentQuestion(null);
      mutations.setTitle("How Well Do You Know the Harry Potter Movies?");

    },
    initQuizStage() {
      mutations.setStage("quiz");
      mutations.setCurrentQuestion(+store.currentQuestionNo || 1);
      mutations.setTitle("Which movie is this?");
    },
    evaluate(answerNo) {
      return (
        this.userAnswer &&
        answerNo === store.currentQuestion.correct);
    },
    handleAnswer(answerNo) {
      this.userAnswer = answerNo;
      mutations.addUserAnswer(answerNo);

      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      this.userAnswer = null;
      mutations.setCurrentQuestion(store.currentQuestionNo + 1);
    }
  }
}
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
