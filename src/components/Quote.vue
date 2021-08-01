<template>
  <div v-if="settings.quote" class="border-r border-white text-right pr-4 mb-6">
    <p class="italic">
      {{ settings.quoteContent }}
    </p>
    <p class="pt-2">&#8212; {{ settings.quoteAuthor }}</p>
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
        console.log(data[0].q);
      }
    },
  },
};
</script>
