<template>
  <div id="quote" v-show="settings.quote" class="text-right mb-3">
    <p id="qContent" class="italic border-r pr-4 transition-all duration-400">
      {{ q }}
    </p>
    <p id="qAuthor" class="pt-2 border-r pr-4 h-0 opacity-0 transition-all delay-500 duration-400">&#8212; {{ a }}</p>
  </div>
</template>

<script>
import Quote from "inspirational-quotes";

export default {
  name: "quote",
  props: {
    settings: Object,
  },
  data() {
    return {
      q: "",
      a: "",
    };
  },
  mounted() {
    this.getQuote();
  },
  methods: {
    getQuote: function() {
      let quote = Quote.getRandomQuote();
      console.log(quote);

      this.q = quote.text;
      this.a = quote.author;
      // this.settings.quoteDate = new Date().toDateString();
      // this.settings.today = new Date().toDateString();
      // this.$emit("updateSettings", this.settings);
    },
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
