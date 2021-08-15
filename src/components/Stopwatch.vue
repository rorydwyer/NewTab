<template>
  <div>
    <div class="stopwatch text-center mb-2">
      <span id="time" class="text-7xl w-full text-gray-600 dark:text-gray-200 focus:outline-none text-center bg-transparent">{{ hms }}</span>
      <span class="w-4 inline-block">{{ m }}</span>
    </div>

    <div class="flex">
      <button
        v-if="!stopwatchInterval"
        v-on:click="start()"
        class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300"
      >
        <span>Start Stopwatch</span>
      </button>

      <button
        v-else
        v-on:click="pause()"
        class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
      >
        <span>Stop Stopwatch</span>
      </button>

      <button
        v-on:click="reset()"
        class="py-1 px-3 ml-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
      >
        <span>
          Reset
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "stopwatch",
  data() {
    return {
      hms: "0:00",
      m: "00",
      elapsedTime: 0,
      prevTime: 0,
      stopwatchInterval: 0,
    };
  },
  methods: {
    update: function() {
      let tempTime = this.elapsedTime;

      let milliseconds = tempTime % 1000;
      tempTime = Math.floor(tempTime / 1000);
      let seconds = tempTime % 60;
      tempTime = Math.floor(tempTime / 60);
      let minutes = tempTime % 60;
      tempTime = Math.floor(tempTime / 60);
      let hours = tempTime % 60;

      this.hms = `${hours ? hours + ":" : ""}${minutes}:${seconds.toString().padStart(2, "0")}`;
      this.m = milliseconds
        .toString()
        .substring(0, 2)
        .padStart(2, "0");
      document.title = `${hours ? hours + ":" : ""}${minutes}:${seconds.toString().padStart(2, "0")}`;
    },

    start: function() {
      if (!this.stopwatchInterval) {
        this.stopwatchInterval = setInterval(() => {
          if (!this.prevTime) {
            this.prevTime = Date.now();
          }

          this.elapsedTime += Date.now() - this.prevTime;
          this.prevTime = Date.now();
          this.update();
        }, 100);
      }
    },

    pause: function() {
      if (this.stopwatchInterval) {
        clearInterval(this.stopwatchInterval);
        this.stopwatchInterval = null;
      }
      this.prevTime = null;
    },

    reset: function() {
      this.pause();
      this.elapsedTime = 0;
      this.update();
      document.title = `NewTab`;
    },
  },
};
</script>
