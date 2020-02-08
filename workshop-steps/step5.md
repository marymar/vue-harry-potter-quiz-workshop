#Step 5: Evaluate the option which was clicked

Once placed all possibilities we need to add the click event listener to the options and evaluate, if the right choice was made by the user.

Define two more methods which evaluates the choice
and handles the answer.

```html
<!-- Quiz.vue --->
<button
          @click="handleAnswer(answerNo)"
          class="quiz-button"
          :class="{ 'correct': evaluate(answerNo) && userAnswer === answerNo,
            'wrong': !evaluate(answerNo) && userAnswer === answerNo
          }">{{ movies[answerNo] }}
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
        answerNo === this.questions[this.questionNo - 1].correct
      );
    },
    handleAnswer(answerNo) {
      this.userAnswer = answerNo;
    }
}
```

---

[Prev: #4 - Displaying possible movie options to user](./workshop-steps/step4.md)

[Next: Step #6 - Proceed with next question](./workshop-steps/step6.md)

