<template>
  <div class="text-center">
    <span id="time" class="w-full text-gray-600 dark:text-gray-200 focus:outline-none text-center bg-transparent">{{ time }}</span>
    <span>{{ meridiem }}</span>
  </div>
</template>

<script>
export default {
  name: "clock",
  data() {
    return {
      time: "",
      meridiem: "",
    };
  },
  mounted() {
    this.clock();
  },
  methods: {
    clock: function() {
      let date = new Date();
      let h = date.getHours(); // 0 - 23
      let m = date.getMinutes(); // 0 - 59
      let meridiem;

      if (h == 0) h = 12;

      if (h > 12) {
        h = h - 12;
        meridiem = "PM";
      } else {
        meridiem = "AM";
      }

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;

      this.time = `${h}:${m}`;
      this.meridiem = meridiem;

      setTimeout(this.clock, 1000);
    },
  },
};
</script>

<style scoped>
#time {
  font-size: 6.5vw;
  line-height: 1rem;
}
</style>
