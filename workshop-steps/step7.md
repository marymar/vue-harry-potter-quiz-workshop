# Step 7: Introducing usage of store and saving data in local storage

Maybe you've realized that every time you're making changes in your code or you do a refresh in the preview, the state has gone away and you have to start the quiz from the beginning.  

Currently, we're not storing our data, so we can’t load information about the current question for the user to answer, or what answers the user has given so far.  

To change this and improve saving our data, we're going to use the local Storage and state management in Vue.  
This will help us to mutate (change) data and state in our app.  

State management becomes really useful for larger apps.  
Apps can often grow in complexity, due to multiple pieces of state scattered across many components and interactions between them. State management serves as a centralized store for all the components in an app, with rules ensuring that the state can only be mutated (changed) in a predictable fashion. The convention is that components are never allowed to directly mutate (change) state that belongs to the store, but should instead dispatch events that notify the store to perform actions.  

We're going to use a lightweight implementation of state management in Vue.js, which is done with observables.  
This is a function that returns a reactive instance of a given object.

You can read more about Vue Observables here:  
- https://vuejs.org/v2/api/#Vue-observable

The following is the data we want to handle via the store:
- questions
- currentQuestion
  - img
  - correct
  - answers
- userAnswers
- ...

First, we're defining the store with Vue observables which expects an object with all properties we want to observe.  

Create a directory "store" and inside it, a file called "index.js" with the following content:

```javascript
// store/index.js
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
  currentQuestionNumber: null,
  userAnswers: []
});
```

For changing our values in the store we have to use a defined way for it, and do it over a set of methods, which are defined within the mutation property.  

Therefore, we have to define further each property inside the store as a set method if we want to mutate those values.  
We'll also store the data in the `localStorage` of the browser.

You can read more about window local storage here:  
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Local_storage

```javascript
// store/index.js
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
  setCurrentQuestion(questionNumber) {
    store.currentQuestionNumber = questionNumber;
    store.currentQuestion = { ...store.questions[questionNumber - 1] };
    localStorage.currentQuestionNumber = questionNumber;
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
// store/index.js
// ...
export const actions = {
  async fetchData(url) {
    let res = await fetch(url);
    res = await res.json();
    mutations.setQuestions(res.questions);
    mutations.setStage(localStorage.stage || "welcome");

    const number = Number(localStorage.currentQuestionNumber) || null;
    mutations.setCurrentQuestion(number);

    const answers = localStorage.userAnswers
      ? JSON.parse(localStorage.userAnswers)
      : [];

    mutations.setUserAnswers(answers);
  }
};
```

Now, that we defined our store we need to use it from the components side.
First replace the contents of the mounted function in the Quiz.vue with the action `fetchData()` from the store.
Second we will extract the initialization of the quiz stage depending on which is active. Although we are going to store data, we have to do some additional work, for initialization at the beginning and maybe, if we want to play the quiz again from the beginning.

So write two additional methods: `initWelcomeStage()` and `initQuizStage()`.
later on we will need a third one, for the score stage.

```html
<!-- Quiz.vue -->
<!-- ... --->
<script>
import { mutations, store, actions } from "../store";
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
Therefore, we have to add the computed properties for img(), title() and answers().

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

Within the template where we check, if the welcome stage has to be shown or the quiz actually started and we want to show the question instead, we are using the `stage` for evaluation. But the `stage` is now part of the store. And before looking up `stage` in the store we would have to check if the store is initialized. To avoid this, we are introducing another computed property `stage`. This helps not being forced to check if the store can be used so far.

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
      mutations.setCurrentQuestion(+store.currentQuestionNumber || 1);
      mutations.setTitle("Which movie is this?");
    },
    isCorrectAnswer(answerNumber) {
      return this.currentUserAnswer && answerNumber === store.currentQuestion.correct;
    },
    handleAnswer(answerNumber) {
      this.currentUserAnswer = answerNumber;
      mutations.addUserAnswer(answerNumber);

      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    },
    nextQuestion() {
      this.currentUserAnswer = null;
      mutations.setCurrentQuestion(store.currentQuestionNumber + 1);
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

