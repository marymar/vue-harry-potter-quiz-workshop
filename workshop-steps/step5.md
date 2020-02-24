# Step 5: Evaluate the option which was clicked

Once placed all possibilities we need to add the click event listener to the options and evaluate, if the right choice was made by the user.

Define two more methods which evaluates the choice and handles the answer.

```html
<!-- Quiz.vue --->
<button
          @click="handleAnswer(answerNumber)"
          class="quiz-button"
          :class="{ 'correct': isCorrectAnswer(answerNumber) && currentUserAnswer === answerNumber,
            'wrong': !isCorrectAnswer(answerNumber) && currentUserAnswer === answerNumber
          }">{{ movies[answerNumber - 1] }}
</button>
```

```javascript
// Quiz.vue
data() {
    return {
      // ...
      currentUserAnswer: null
}
// ...
methods: {
// ...
  isCorrectAnswer(answerNumber) {
    return (
      this.currentUserAnswer &&
      answerNumber === this.questions[this.currentQuestionNumber - 1].correct
    );
  },
  handleAnswer(answerNumber) {
    this.currentUserAnswer = answerNumber;
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

