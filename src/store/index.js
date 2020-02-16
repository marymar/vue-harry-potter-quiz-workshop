import Vue from "vue";


export const store = Vue.observable({
  questions: [],
  stage: null,
  title: null,
  currentQuestion: {
    img: null,
    correct: null,
    answers: []
  },
  currentQuestionNo: null,
  userAnswers: []
});


export const mutations = {
  setStage(stage) {
    store.stage = stage;
    localStorage.stage = stage;
  },
  setQuestions(questions) {
    store.questions = questions;
  },
  setTitle(title) {
    store.title = title;
  },
  setCurrentQuestion(questionNo) {
    store.currentQuestionNo = questionNo;
    store.currentQuestion = { ...store.questions[questionNo - 1] };
    localStorage.currentQuestionNo = questionNo;
  },
  addUserAnswer(userAnswer) {
    store.userAnswers.push(userAnswer);
    localStorage.userAnswers = JSON.stringify(store.userAnswers);
  },
  setUserAnswers(userAnswers) {
    store.userAnswers = userAnswers;
    localStorage.userAnswers = JSON.stringify(store.userAnswers);
  },
  resetUserAnswers() {
    store.userAnswers = [];
    localStorage.userAnswers = JSON.stringify([]);
  }
};

export const actions = {
  async fetchData(url) {
    let res = await fetch(url);
    res = await res.json();
    mutations.setQuestions(res.questions);
    mutations.setStage(localStorage.stage || "welcome");

    const no = Number(localStorage.currentQuestionNo) || null;
    mutations.setCurrentQuestion(no);

    const answers = localStorage.userAnswers
      ? JSON.parse(localStorage.userAnswers)
      : [];

    mutations.setUserAnswers(answers);
  }
};
