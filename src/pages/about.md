<script setup>
  definePage({
    meta: {
      name: 'about',
      keepAlive: true
    }
  })
</script>

<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-lucide-book-open-text class="text-4xl -mb-6 m-auto" />
  <h3>About</h3>
</div>

[Visue Starter](https://github.com/jinghaihan/visue-starter) is an opinionated [Vite](https://github.com/vitejs/vite) starter template inspired by [Vitesse](https://github.com/antfu/vitesse) for mocking apps swiftly. With **file-based routing**, **components auto importing**, **markdown support**, I18n and uses **UnoCSS** for styling and icons.

```js
// syntax highlighting example
function foobar() {
  const foo = 'bar'
  console.log(foo)
}
```

Check out the [GitHub repo](https://github.com/jinghaihan/visue-starter) for more details.
