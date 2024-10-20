# Vanilla JS Performance

## The Myth of VDOM Speed

There is a common belief that using the Virtual DOM (VDOM) is much more efficient compared to direct manipulations of the real DOM because changes in it accumulate and are applied in one big update, unlike direct operations with the real DOM, which are considered slow. But let’s see if this holds true in practice.

### Single vs Multiple DOM Updates

Let’s take two examples of adding a large number of elements to a list. In the first example, we create a fragment, add elements to it, and then append the fragment to the DOM in a single batch:

```js
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100_000; i++) {
  const item = document.createElement('li');
  fragment.appendChild(item);
}

// single DOM update
list.appendChild(fragment);
```

In the second example, we directly add each element to the list inside the loop:

```js
const list = document.getElementById('list');

for (let i = 0; i < 100_000; i++) {
  const item = document.createElement('li');

  // multiple DOM update inside loop
  list.appendChild(item);
}
```

It’s logical to assume that the second option would be slower due to the multiple DOM operations, which is the primary reason for the popularity of VDOM. _However, modern browsers are so well-optimized that the execution time of these two approaches is often about the same._

### Modern Browser Optimizations

Modern browsers efficiently manage DOM changes using optimizations like batching and reconciliation. As a result, adding elements directly may not be significantly slower than using a fragment, as browsers delay and merge small changes to optimize execution.

Thanks to these optimizations, both approaches take roughly the same amount of time. Browsers group operations and handle DOM updates efficiently, reducing the performance difference between VDOM and direct DOM manipulations, especially in modern environments.
