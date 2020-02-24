# Step 4: Displaying possible movie options to user

So, as you surely remember, we have displayed in the list with the answers, simply all the movies that exist.
But what we actually want, is, to provide some suggestions to the user and let here guess, which one of this is the right answer. To achieve this, we will use the buttons, once clicked one of it, it turns into green, when the answer is right or red if not.

We also need to change the data over which we iterate and use instead the data of the  current question. We are going to use again a computed property which just returns the possible answers from the current question.

```html
<!--Quiz.vue -->
<ul class="quiz-choices" v-if="stage===’quiz’">
      <li v-for="answerNumber in answers" :key="answerNumber">
            <button class="quiz-button">{{ movies[answerNumber] }}</button>
      </li>
</ul>
```

```javascript
// Quiz.vue
answers() {
    return this.currentQuestionNumber
        ? this.questions[this.currentQuestionNumber - 1].answers
        : [];
}
```

---
[Prev: Step #3 - Using the Quiz data](step3.md)

[Next: Step #5 - Evaluate the option which was clicked](step5.md)
