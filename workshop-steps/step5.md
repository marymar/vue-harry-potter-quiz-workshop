# Step 5: Evaluate the option which was clicked

Now that we offered the user all possible quiz answers, we need to add a click event listener to the option buttons and evaluate, if the right choice was made by the user.

Define two more methods which evaluate the choice
and handle the answer.

```html
<!-- Quiz.vue --->
<button
          @click="handleAnswer(answerNo)"
          class="quiz-button"
          :class="{ 'correct': evaluate(answerNo) && userAnswer === answerNo,
            'wrong': !evaluate(answerNo) && userAnswer === answerNo
          }">{{ movies[answerNo - 1] }}
</button>
```

```javascript
// Quiz.vue
data() {
    return {
      // ...
      userAnswer: null
}
// ...
methods: {
// ...
  evaluate(answerNo) {
    return (
      this.userAnswer &&
      answerNo === this.questions[this.currentQuestionNo - 1].correct
    );
  },
  handleAnswer(answerNo) {
    this.userAnswer = answerNo;
  }
// ...
}
```

Don't forget to enhance the button style, for the wrong and correct answer.
Otherwise you wouldn't see any changes in the browser.

```css
.quiz-button.wrong {
  background-color: red;
}
.quiz-button.correct {
  background-color: green;
}
```

---

[Prev: #4 - Displaying possible movie options to user](step4.md)

[Next: Step #6 - Proceed with next question](step6.md)
