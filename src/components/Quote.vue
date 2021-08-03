<template>
  <div id="quote" v-if="settings.quote" class="text-right mb-3">
    <p id="qContent" class="italic border-r pr-4">
      {{ settings.quoteContent }}
    </p>
    <p id="qAuthor" class="pt-2 border-r pr-4">&#8212; {{ settings.quoteAuthor }}</p>
  </div>
</template>

<script>
export default {
  name: "quote",
  props: {
    settings: Object,
  },
  mounted() {
    this.getQuote();
  },
  methods: {
    getQuote: async function() {
      if (this.settings.quote) {
        let q;
        let a;
        fetch("https://quotes.rest/qod?language=en")
          .then((response) => response.json())
          .then((data) => {
            q = data.contents.quotes[0].quote;
            a = data.contents.quotes[0].author;
          })
          .catch(() => {
            q = "The adventure doesn't start until something goes wrong.";
            a = "Rory Dwyer";
          })
          .then(() => {
            this.settings.quoteContent = q;
            this.settings.quoteAuthor = a;
            this.settings.today = new Date().toDateString();
            this.$emit("updateSettings", this.settings);
          });
      }
    },
  },
};
</script>

<style scoped>
#qAuthor {
  position: relative;
  opacity: 0;
  transition: all 0.2s;
  transition-delay: 0.2s;
}

#quote:hover #qAuthor {
  /* top: 0px; */
  opacity: 1;
}

#qContent,
#qAuthor {
  border-color: #ff5c5c;
}
</style>
