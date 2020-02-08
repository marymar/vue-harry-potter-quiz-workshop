# Step 6: Proceed with next question

After evaluation was done. We will show the result to the user for a short time but than to continue with the next question. So after evaluation wait a second and than just increase the `currentQuestionNo` by one. Because Vue recognizes changes in components data, it will update all dependencies and the values in the component are going to be updated, which in our case means that the next question will be shown to the user.

Additional to that we should store the given answer  into an array, which we will use to calculate the score at the end of the quiz.

```javascript
<!-- Quiz.vue --->
handleAnswer(answerNo) {
    this.userAnswer = answerNo;
    this.userAnswers.push(answerNo);

    setTimeout(() => {
        this.nextQuestion();
    }, 1000);
},
nextQuestion() {
    this.userAnswer = null;
    ++this.currentQuestionNo;
}
```
