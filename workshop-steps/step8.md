# Step 8: Create the score view

When all question are answered and the user arrived the end of the quiz, we want to show the result to the user.

We have some nice texts which are shown to the user up to the score she achieved.

We are enhancing the App.vue with the resultData data which is provided to the Quiz.vue as property.

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
      text:
        "Practice, practice, practice! <br>You'll be a clever as Dumbledore in no time!",
      img:
        "https://media0.giphy.com/media/720g7C1jz13wI/giphy.gif?cid=3640f6095c869951776a4a7a5110b5dc"
    },
    2: {
      text:
        "Not too shabby! <br>Have a Harry Potter movie marathon and then try again!",
      img:
        "https://media2.giphy.com/media/UeeJAeey9GJjO/giphy.gif?cid=3640f6095c869e703631634241b759c1"
    },
    3: {
      text:
        "Very good! <br>Have another go and you'll be getting full marks!",
      img: "https://media.giphy.com/media/TGLLaCKWwxUVq/giphy.gif"
    },
    4: {
      text:s
        "TOP MARKS! Nice work! <br>You have some serious wizard wisdom!",
      img: "https://media.giphy.com/media/9H279yb0blggo/giphy.gif"
    }
  }
};
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

When we first have to calculate the correct answers the user gave. We will use a computed property for it again.

````javascript
// Quiz.vue
correctAnswers() {
      let count = 0;
      store.questions.forEach((q, i) => {
        if (q.correct == this.answers[i]) count++;
      });
      return count;
},
```

Now we have to evaluate which result info has to be shown to the user.

---
[Prev: Step #7 - Introducing usage of store and saving data in local storage](step7.md)
