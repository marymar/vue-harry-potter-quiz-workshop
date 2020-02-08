# Step2: Using the Quiz data

Beside the movie data we need also the quiz data with the movie clip and the choices which movie it is actually.
This data we will get from a JSON (Javascript Object Notation). JSON is the description of an Object in more Human readable way. It is mainly used to transfer information between systems.
https://en.wikipedia.org/wiki/JSON

It contains a list (array) of question. Each question contains 4 different numbers, which matches to the movies we are going to provide as labels to the buttons of choices. It also contains the correct answer and furthermore the movie scene as link to the giphy image, which has to be guessed.


```json
{
  "questions": [
    {
      "correct": 3,
      "answers": [2, 3, 4, 5],
      "img": "https://media1.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif"
    },
    {
      "correct": 7,
      "answers": [6, 5, 7, 8],
      "img": "https://media2.giphy.com/media/Th8FaGYsmPMwU/giphy.gif"
    },
    {...}
  ]
}
```

To learn more about data primitives, like string, numbers and arrays, which are useful to understand the JSON structure better, we warmly recommend Lydia Hallie. She has written a very good explanation about it. https://www.theavocoder.com/complete-javascript/2018/12/18/primitive-data-types

To load the questions we are going again to provide the Quiz component with the `questions-url` props from where the question can be loaded from. Which we will then use to fetch the data from there. This we will do in the mounted() method  of our Quiz component. The mounted() methods is a Lifecycle Hook, which is called after the instance has been mounted.


```html
<!-- App.vue -->
<quiz :movies="movies" questions-url="https://api.jsonbin.io/b/5e3f0514f47af813bad11ac5"/>
```

```javascript
// Quiz.vue
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
      currentQuestionNo: 0
    };
  },

// ...
async mounted() {
    const res = await fetch(this.questionsUrl);
    this.questions = (await res.json()).questions;
    console.log(this.questions);
},
```

Now we are able to use this loaded questions and to enhance the `initQuizStage` and to use this data and provide the first question to the user.

Will start to replace the image we use so far in the Quiz component to be changed dynamically in terms of the question we are showing.
To do so some steps are needed. First we need to know which question is in order. We will store the information within the `currentQuestionNo` instance property. When we have to provide the right image which we can do by using a computed property. A computed property in Vue is a instance property as well, but the main advantage of it, is that it can be build by different properties together. Vue will watch for changes in dependent properties, and if they changes the computed property will be evaluated again. On the ove hand it will be kept cached and only the cached value is provided.

```html
<!-- Quiz.vue -->
<template>
    <div>
    <img :src="image" alt>
    ...

<script>
export default {
// ...
computed: {
    image() {
      return this.currentQuestionNo
        ? this.questions[this.currentQuestionNo].img
        : "https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67";
    }
  },
// ...
```

We are going to do the similar for the headline. Because with the start of the script we want to change the headline from “How Well Do You Know the Harry Potter Movies?” to “Which movie is this?”

```javascript
// Quiz.vue
computed: {
    headline() {
      return this.currentQuestionNo
        ? "Which movie is this?"
        : "How Well Do You Know the Harry Potter Movies?";
    }
},
```

---

[Prev: Step #2 - Create the first own Vue component "Quiz.vue"](./workshop-steps/step2.md)

[Next: Step #4 - Displaying possible movie options to user](./workshop-steps/step4.md)
