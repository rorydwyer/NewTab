<template>
  <div id="quote" v-if="settings.quote" class="text-right mb-3">
    <p id="qContent" class="italic border-r pr-4 transition-all duration-400">
      {{ q }}
    </p>
    <p id="qAuthor" class="pt-2 border-r pr-4 h-0 opacity-0 transition-all delay-500 duration-400">&#8212; {{ a }}</p>
  </div>
</template>

<script>
const Quote = require("inspirational-quotes");

export default {
  name: "quote",
  props: {
    settings: Object,
  },
  data() {
    return {
      q: "foo",
      a: "bar",
    };
  },
  mounted() {
    let quote = Quote.getQuote();
    this.q = quote.text;
    this.a = quote.author;
  },
};
</script>

<style scoped>
#quote:hover #qAuthor {
  height: 28px;
  opacity: 1;
}

#qContent,
#qAuthor {
  border-color: #ff5c5c;
}
</style>
