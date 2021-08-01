<template>
  <div v-if="settings.quote" class="border-r border-white text-right pr-4 mb-6">
    <p class="italic">
      The law of harvest is to reap more than you sow. Sow an act, and you reap a habit. Sow a habit and you reap a character. Sow a character and you reap a
      destiny.
    </p>
    <p class="pt-2">- James Allen</p>
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
      const response = await fetch("https://zenquotes.io/api/today");
      var data = await response.json();
      console.log(data[0].q);
    },
  },
};
</script>
