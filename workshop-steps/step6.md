# Step 6: Proceed with next question

After evaluating the answer we'll show the result to the user for a short time and then follow up with the next question.

To wait for a second after the evaluation, we'll need to create a `setTimeout` function indicating the amount of waiting in milliseconds. E.g. 1 second = 1000 milliseconds.

And to display the next question we'll need to increase the `currentQuestionNumber` by one.

Because Vue recognizes changes in the component's data, these additions will update all dependencies, and the values in the component will be updated by showing the next question to the user.

Additionally, we should store the given answer in an array, which we'll use to calculate the user's score at the end of the quiz. To do this, add another variable inside data, which will hold all given answers.

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
handleAnswer(answerNumber) {
    this.currentUserAnswer = answerNumber;
    this.userAnswers.push(answerNumber);

    setTimeout(() => {
        this.nextQuestion();
    }, 1000);

    /*
      Learn about setTimeout functions here:
      - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
    */
},
nextQuestion() {
    this.currentUserAnswer = null;
    ++this.currentQuestionNumber;

    /*
    FYI: We're increating a variable by one with an unary operator:
    ++this.currentQuestionNumber;

    The above line of code is equal to this:

    this.currentQuestionNumber = this.currentQuestionNumber + 1;

    or

    this.currentQuestionNumber += 1;

    Learn about expressions and operators here:
    - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
    */
}
```

---

## Achievement

At the end of step 6, a user can answer all questions. Every time she makes a choice, the application forwards to the next question after a short time.

![Stepping threw questions](img/step6-result.gif)

---

[Prev: Step #5 - Evaluate the option which was clicked](step5.md)

[Next: Step #7 - Introducing usage of store and saving data in local storage](step7.md)
