# Step 7: Introducing usage of store and saving data in local storage

Maybe you have realized that everytime you are making changes in your code or you do a refresh in the preview, the state is gone away and you have to start the quiz from the beginning again. Currently we are not storing our data, so that we can’t load information, e.g. about the current question for the user to answer, or what answers the user has given so far.

To change this and improve and save data, we are going to use the local Storage and a state management in Vue. It helps us to mutate data and state in our app.

A state management becomes really useful for larger apps. Apps can often grow in complexity, due to multiple pieces of state scattered across many components and the interactions between them. A state management serves a centralized store for all the components in an app, with rules ensuring that the state can only be mutated in a predictable fashion. The convention is, that components are never allowed to directly mutate state that belongs to the store, but should instead dispatch events that notify the store to perform actions.

We are going to use a lightweight implementation of state management in Vue.js with realized with Observables. This is a function that returns a reactive instance of a given object.

Some of the following data we want to handle via the store:
- questions
- currentQuestion
  - img
  - correct
  - answers
- userAnswers
- ...

First we are defining the store with Vue observables which expects an object with all properties we want to observe.

```javascript
// store.js
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
```

For changing our values in the store we have to use a defined way for it and to do it over set methods, which are defined within the mutation property. Therefore we have to define further for each property in the store a set method, if we want to mutate those values.
We will also store the data in the localStorage of the browser.

```javascript
// store.js
// ...
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
```

As we are using a store now it makes also sense to move the fetching of data away from the Quiz component to the store, too. Fetching the data is an action and it is defined within the action object of the store. Also in this action we are handling to load stored data from the localStorage.

```javascript
// store.js
// ...
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
```

Now, that we defined our store we need to use it from the components side.
First replace the `fetchData` in the Quiz.vue with the action `fetchData()` from the store.

```html
<!-- Quiz.vue -->
<!-- ... --->
<script>
import { actions } from "../store";
async mounted() {
    await actions.fetchData(this.questionsUrl);
    if (store.stage === "welcome") {
      this.initWelcomeStage();
    } else if (store.stage === "quiz") {
      this.initQuizStage();
    }
}
// ...
</script>
```

Then we want to use all data from the store.

```javascript
// Quiz.vue
import { store, actions } from "../store";
// ...
computed: {
    img() {
      return store.stage === "quiz"
        ? store.currentQuestion.img
        : "https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67";
    },
    title() {
      return store.title;
    },
    answers() {
      return store.currentQuestion.answers ?
        store.currentQuestion.answers
        : [];
    },
  },
```

Within the template where we check, if the welcome stage have to be shown or the quiz actually started and we want to show the question instead, we are using the `stage` for evaluation. But the `stage` is now part of the store. And before looking up `stage` in the store we would have to check if the store is initialized. To avoid this, we are introducing another computed property `stage`. This helps not being forced to check if the store can be used so far.

```javascript
// Quiz.vue
computed: {
  // ...
  stage() {
      return store.stage;
  }
  // ...
}
```

```html
<!-- Quiz.vue -->
<button class="quiz-button" v-if="stage === 'welcome'" @click="initQuizStage">Start Quiz</button>
<ul class="quiz-choices" v-else-if="stage === 'quiz'">...</ul>
```

If the user makes a choice we have to change some values in the store to continue with next question and to keep in mind, which answers the user gave. Now we have to do that in the defined way and to use the mutation methods from the store.

We also have to import the mutations from the store.

```javascript
// Quiz.vue
import { store, actions, mutations } from "../store";
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
      return this.userAnswer && answerNo === store.currentQuestion.correct;
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
    //...
```

<span style="color:#900;">
<strong>Hint:</strong>
In the CodeSandbox we are running into a problem when using localStorage. This is up to the iFrames which are needed by CodeSandbox. To get our QuizApp running again, we need to open the vie in a new browser window.
</span>

---

[Prev: Step #6 - Proceed with next question](step6.md)

[Next: Step #8 - Create the score view](step8.md)

