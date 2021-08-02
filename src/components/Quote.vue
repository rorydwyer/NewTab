<template>
  <div id="quote" v-if="settings.quote" class="text-right mb-3">
    <p id="qContent" class="italic border-r border-white pr-4">
      {{ settings.quoteContent }}
    </p>
    <p id="qAuthor" class="pt-2 border-r border-white pr-4">&#8212; {{ settings.quoteAuthor }}</p>
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
        const response = await fetch("https://zenquotes.io/api/today");
        var data = await response.json();
        this.settings.quoteContent = data[0].q;
        this.settings.quoteAuthor = data[0].a;
        this.settings.today = new Date().toDateString();

        this.$emit("updateSettings", this.settings);
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
</style>
