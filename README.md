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

You can view examples of [Document Fragment](https://petersolopov.github.io/vanilla-js-performance/dom-updates/document-fragment) and [Multiple Append](https://petersolopov.github.io/vanilla-js-performance/dom-updates/multiple-append) directly in your browser.

> [!CAUTION]  
> Loading this page in Safari may take longer than expected. For a faster experience, please use modern browsers like Chrome or Firefox.

### Modern Browser Optimizations

Modern browsers efficiently manage DOM changes using optimizations like batching and reconciliation. As a result, adding elements directly may not be significantly slower than using a fragment, as browsers delay and merge small changes to optimize execution.

Thanks to these optimizations, both approaches take roughly the same amount of time. Browsers group operations and handle DOM updates efficiently, reducing the performance difference between VDOM and direct DOM manipulations, especially in modern environments.

### Fun Fact

Even advanced language models like ChatGPT o1-preview "think" incorrectly and [suggest](https://chatgpt.com/share/671e2e68-8430-8009-adfe-e4643e4f76cd) that appending multiple elements directly to the DOM **significantly slows down performance**.

### Instead of Conclusion

It's crucial to recognize that blindly following common advice can lead to unnecessary complexity and suboptimal solutions. Test your assumptions, conduct experiments, and draw conclusions based on concrete data and observations.

### Some Links

- [Virtual DOM is pure overhead](https://svelte.dev/blog/virtual-dom-is-pure-overhead) and its [Hackernews discussion](https://news.ycombinator.com/item?id=34612162)
- [Virtual DOM: What problem does it solve?](https://dev.to/marciofrayze/virtual-dom-what-problem-does-it-solve-4b20)
- [Why did react chose virtual DOM instead of using real DOM, when other frameworks are more fast even after using real DOM?](https://www.reddit.com/r/reactjs/comments/w943ly/why_did_react_chose_virtual_dom_instead_of_using/) (Reddit discussion)
