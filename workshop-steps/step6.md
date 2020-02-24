# Step 6: Proceed with next question

After evaluating the answer, we will show the result to the user for a short time but then to continue with the next question.
So after evaluation wait a second and then just increase the `currentQuestionNumber` by one. Because Vue recognizes changes in component's data, it will update all dependencies and the values in the component are going to be updated, which in our case means that the next question will be shown to the user.

Additionally we should store the given answer in an array, which we will use to calculate the user's score at the end of the quiz.

Also add another variable inside data, which holds all given answers.

```javascript
data() {
  return {
    ...
    userAnswers: []
  }
}
```

```javascript
<!-- Quiz.vue --->
handleAnswer(answerNo) {
    this.currentUserAnswer = answerNo;
    this.userAnswers.push(answerNo);

    setTimeout(() => {
        this.nextQuestion();
    }, 1000);
},
nextQuestion() {
    this.currentUserAnswer = null;
    ++this.currentQuestionNumber;
}
```

---

[Prev: Step #5 - Evaluate the option which was clicked](step5.md)

[Next: Step #7 - Introducing usage of store and saving data in local storage](step7.md)
