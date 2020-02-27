# Step 8: Create the score view

When all questions are answered and the user arrives at the end of the quiz, we want to show them their score.

We have already some text prepared, which is displayed to the user with their score achieved.

We're enhancing the App.vue with the `resultsInfo` data which is provided to the **Quiz.vue** as property.

```html
<!-- App.vue -->
<quiz
      :movies="movies"
      :resultsInfo="resultsInfo"
      questions-url="https://api.jsonbin.io/b/5cdd1762dbffad51f8aa85a5"
/>
```

```javascript
// App.vue
data: {
  // ...
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
```

From the `quiz stage` we have to switch to the `result stage`.  
To do this, we'll define a method for it.  

We have to consider when a refresh by the user is done and the application needs to initialize again when the component is mounted.

```javascript
  // ...
  async mounted() {
    await actions.fetchData(this.questionsUrl);
    if (store.stage === "result") {
      this.initResultStage();
    } else if (store.stage === "quiz") {
      this.initQuizStage();
    } else {
      this.initWelcomeStage();
    }
  },
  computed: {
    // ...
    result() {
      const correctAnswers = this.correctAnswers();
      const resultInfo = this.resultsInfo[Math.floor(correctAnswers / 5)];
      const result = {
        title: `Your Score: ${correctAnswers} out of ${
          store.questions.length
        }`,
        ...resultInfo
      };

      return result;
    }
    // ...
  }
  methods: {
    // ...
    initResultStage() {
      mutations.setStage("result");
      mutations.setTitle(this.result.title);
    }
    // ...
  }
  // ...
```

When switching to the next question, we additionally have to check if the user arrived at the end of the quiz. If so, we have to change the stage.

```javascript
// ...
handleAnswer(answerNo) {
  // ...
  setTimeout(() => {
      if (store.currentQuestionNumber < store.questions.length) {
        this.nextQuestion();
      } else {
        this.initResultStage();
      }
  }, 1000);
  // ...
}
```

In the Quiz.vue we have to define the new property.

```javascript

// Quiz.vue
props: {
  // ....
  resultsInfo: {
    type: Object,
    required: true
  }
},
```

First we are going to calculate the correct answers the user gave.

```javascript
// Quiz.vue
correctAnswers() {
  let count = 0;
  store.questions.forEach((q, i) => {
    if (q.correct === store.userAnswers[i]) {
      count++;
    }
  });
  return count;
},
```

Now we have to evaluate which result info has to be shown to the user.
Add the detail result text in an extra element, only shown if the user is on the result page.

```html
<p v-if="this.stage === 'result'" v-html="this.result.text"/>
```

Maybe you also don't want to keep the last quiz question image. If not, enhance the img computed property and check if the stage is result.

```javascript
// ...
image() {
  switch (store.stage) {
    case "result":
      return this.result.img;
    case "quiz":
      return store.currentQuestion.img;
    default:
      return "https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67";
  }
}
// ...
```


That's it! You've completed your very first Harry Potter movie quiz app with Vue.js!
Well done :)

PS: Please let us know if you have any feedback on this tutorial, we would really appreciate it.

---
[Prev: Step #7 - Introducing usage of store and saving data in local storage](step7.md)
