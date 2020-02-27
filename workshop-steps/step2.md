# Step 2: Create the first own Vue component "Quiz.vue"

Now we are going to write our first own component in Vue. All components are also called Vue instances.

Our Vue project actually provides a folder structure which is almost valid for many JS frameworks.
In the components folder all vue components are stored. There you can also find the **HelloWorld.vue** component which contains all the helping text.

Let's create a quiz component **Quiz.vue** inside the components folder.

![components folder](img/components.png)

The file will be empty so far.

Normally Vue components contain:
- A template
- A script
- A style section

The smallest Vue component looks like this:

```html
<template>
  <div></div>
</template>

<script>export default {};</script>

<style></style>
```

This doesn’t provide any meaningful output, but let's put some text within the `<div>` containers, and see when we are using it what it will output on the screen.

```html
<template>
  <div>Quiz</div>
</template>
```

Now, we'll include a brand new component in the App.vue.
Remove the `<HelloWorld />` component, and add the Quiz component instead.

To use our Quiz component some steps are needed. First we have to import the component within the script section.

```javascript
import Quiz from "./components/Quiz.vue";
```

After that, the Quiz component has to be registered within the App.vue, which is done by adding the imported Quiz to the App components options.

```javascript
components: {
    Quiz
}
```

This above is the easiest way to do that. It will map your component Quiz to the component element `<Quiz />`.
But is also possible to register the component with more settings. E.g. With a custom name or key property for the component.

```javascript
components: {
    'quiz': Quiz
}
```

The last thing to do is to add the component element `<quiz />` in the template.

```html
<template>
  <div id="app">
    <quiz/>
  </div>
</template>
```

Before the Quiz starts, we need a welcome view displayed to the user.
In the **Quiz.vue** template section we'll remove the previous content, and place a picture, a title and a link via HTML, which finally will start the quiz.

```html
<div>
    <img
      src="https://media0.giphy.com/media/Bh3YfliwBZNwk/giphy.gif?cid=3640f6095c852266776c6f746fb2fc67"
      alt="A castle at the top of a mountain in a gray day with thunders."
    >
    <h1 class="quiz-heading">How Well Do You Know the Harry Potter Movies?</h1>
    <button class="quiz-button">Start Quiz</button>
</div>
```

For more styling you can use the style section and write your CSS.

Within the App.vue we already set some general CSS styling, like having a dark background and defining the main text color:

```css
/* App.vue */
<style>
* {
  box-sizing: border-box;
}
html {
  height: 100%;
}
body {
  height: 100%;
  background: #020815; /* Black */
  color: #eee; /* Gray */
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
```

For the **Quiz.vue** we can make some simple stylings like the following.

```css
/* Quiz.vue */
<style>
.quiz-heading {
  margin: -40px 0 30px;
  font-size: 30px;
  text-shadow: 1px 1px 2px #020815;
  line-height: 1.2;
}

.quiz-button {
  color: #eee; /* Gray */
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  padding: 10px 30px;
  border: 1px solid rgba(238, 238, 238, 0.3);
  background: none;
  transition: border-color 0.5s;
}
.quiz-button:hover {
  border-color: #eee; /* Gray */
}
</style>
```

When you click on the button "Start Quiz" to start the quiz, nothing happens.
In order to make something happen when the link is clicked, we need to bind an action to the button.
This can be achieved by adding the shorthand event modifier `@click` to the button inside **Quiz.vue's** `<template>` section.

```javascript
<button class="quiz-button" @click="initQuizStage">Start Quiz</button>
```

You can read more about Vue Modifiers here:
- https://vuejs.org/v2/guide/events.html#Event-Modifiers

And read about Vue Shorthands here:
- https://vuejs.org/v2/guide/syntax.html#Shorthands

This shorthand event modifier contains `initQuizStage` as a value, which is expected to be a method for Vue.
Such method will be called when a user clicks the button.
Therefore we are going to define a method with the same name in the script's section of our component:

```javascript
// Quiz.vue
<script>
  export default {
    methods: {
      initQuizStage() {
        console.log("Start the quiz....");
      }
    }
  };
</script>
```

This method only prints “Start the quiz…” to the console. Before moving on and implementing the `initQuizStage` we need more data. We need the movie titles of all Harry Potter movies. But also the data for quiz questions.

Next, we're going to provide all movie titles for our Quiz component.
Providing data to child components can be done with so-called props in Vue.
Props are custom attributes you can register on a component to be able to pass data to them from a parent component. A value can be passed to a prop attribute, which becomes a property on that component instance.

You can read more about Vue Props here:
- https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props

In the App.vue let's extend the quiz element with a props attribute called “movies” and provide it with movies' data, which you get from the `data()` method. With the colon in front of the prop name, you are telling Vue that the value inside the brackets is not just a string but a variable, which in this case is an array.

```html
<!-- App.vue -->
<template>
  <div id="app">
    <quiz :movies="movies"/>
  </div>
</template>

<script>
  export default {
    // ...
    data() {
      return {
        movies: [
          "Harry Potter and the Philosopher's Stone",
          "Harry Potter and the Chamber of Secrets",
          "Harry Potter and the Prisoner of Azkaban",
          "Harry Potter and the Goblet of Fire",
          "Harry Potter and the Order of the Phoenix",
          "Harry Potter and the Half-Blood Prince",
          "Harry Potter and the Deathly Hallows - Part 1",
          "Harry Potter and the Deathly Hallows - Part 2",
        ]
      };
    }
  }
  // ...
```

If you provide a prop to a component, the receiving component has to define that property on the other side before you can use it. This is done by introducing the prop in the `props: {}` section inside **Quiz.vue**:

```html
<!-- Quiz.vue -->
<script>
  export default {
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
  // ...
</script>
```

To see if it works, we can use a simple list and iterate over the entries of movies.

```html
<!-- Quiz.vue -->
<ul>
    <li v-for="movie in movies" :key="movie">{{ movie }}</li>
</ul>
```

With the `v-for` directive we can tell vue to iterate over the values in movies and to repeat the `<li>` element with each value provided during each iteration.

You can read more about Vue Directives here:
- https://vuejs.org/v2/guide/syntax.html#Directives

The `{{ movie }}` is the most basic form of data binding called text interpolation using the “Mustache” syntax (double curly braces). The mustache tag will be replaced with movie names, which are saved in the property movies (which we defined earlier). It will also be updated whenever the component's movies property changes.

You can read more about Vue Text Interpolation here:
- https://vuejs.org/v2/guide/syntax.html#Interpolations

Let’s ensure that the part with the printed movies list is only shown when `initQuizStage` is clicked.
This can be achieved by using the `stage` computed property and with the `v-if` directive in the template.
The `v-if` directive validates the expression of its content. When it is true, the component is rendered and shown, if false, it is not rendered.

You can read more about Vue Computed Properties here:
- https://vuejs.org/v2/guide/computed.html#Computed-Properties

```html
<!-- Quiz.vue -->
<template>
  <ul class="quiz-choices" v-if="stage==='quiz'">
<template>

<script>
  export default {
    props: {
      movies: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentQuestionNumber: 0
      };
    },
    computed: {
      // ....
      stage() {
          return this.currentQuestionNumber === 0 ? 'welcome' : 'quiz';

          /*
            FYI: We're using a ternary operator in JS.
            The above code is equal to this:
            if (this.currentQuestionNumber === 0) {
              'welcome'
            } else {
              'quiz'
            }

            Learn about ternary operators here:
            - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
          */
      }
    },
    methods: {
      initQuizStage() {
        this.currentQuestionNumber = 1;
    }
  };
</script>
```

Also let's ensure that the “Start Quiz” button disappears when the Quiz is started.
We can again use the `stage` property for it.

```html
<button class="quiz-button" v-if="stage==='welcome'" @click="initQuizStage">Start Quiz</button>
```

---
[Prev: Step #1 - Setting up the Vue App with CodeSandbox](step1.md)

[Next: Step #3 - Using the Quiz data](step3.md)
