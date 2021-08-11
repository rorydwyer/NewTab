<template>
  <div>
    <div class="timer w-full text-center">
      <p id="timer" v-on:click="focusInput" ref="input" class="w-full text-7xl text-gray-600 dark:text-gray-200 text-center -mb-3 transition">
        <!-- Hours -->
        <span v-if="getPlaceholder(5)" v-bind:class="{ placeholder: !getPlaceholder(5) }">{{ timer[5] }}</span>
        <span v-if="getPlaceholder(4)" v-bind:class="{ placeholder: !getPlaceholder(4) }">{{ timer[4] }}:</span>

        <!-- Minutes -->
        <span v-bind:class="{ placeholder: !getPlaceholder(3) }">{{ timer[3] || "0" }}</span>
        <span v-bind:class="{ placeholder: !getPlaceholder(2) }">{{ timer[2] || "0" }}:</span>

        <!-- Seconds -->
        <span v-bind:class="{ placeholder: !getPlaceholder(1) }">{{ timer[1] || "0" }}</span>
        <span v-bind:class="{ placeholder: !getPlaceholder(0) }">{{ timer[0] || "0" }}</span>

        <!-- Cursor -->
        <span class=" h-1/2  text-6xl relative bottom-2 dark:border-r-gray-200 border-r-gray-600" v-bind:class="{ inputFocus: inputFocus }"></span>
      </p>
      <input
        ref="timer"
        class="opacity-0 w-0 h-0 overflow-hidden focus:outline-none"
        type="number"
        @keypress="input"
        v-on:keyup.delete="tDelete()"
        v-on:keyup.enter="
          if (!timerInterval) {
            $refs.timer.blur();
            start();
          }
        "
        @focus="inputFocus = true"
        v-on:blur="blur()"
      />
    </div>
    <div v-if="!alertInterval">
      <button
        v-on:click="start"
        v-if="!timerInterval"
        class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
      >
        <span>Start Timer</span>
      </button>
      <button
        v-on:click="pause"
        v-else
        class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
      >
        <span>Pause Timer</span>
      </button>
    </div>
    <button
      v-else
      v-on:click="endAlarm"
      class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
    >
      <span>Ok</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "timer",
  props: {
    settings: Object,
  },
  watch: {
    settings: {
      deep: true,
      handler() {
        this.clear();
        this.timer = this.settings.timerDefault;
      },
    },
  },
  data() {
    return {
      audio: new Audio("/timer.mp3"),
      timer: [],
      inputFocus: false,
      prevTime: "",
      remainingTime: 0,
      timerInterval: 0,
      alertInterval: 0,
    };
  },
  mounted() {
    this.timer = this.settings.timerDefault;
  },
  methods: {
    focusInput: function() {
      this.clear();
      this.endAlarm();
      this.$refs.timer.focus();
    },

    getPlaceholder: function(i) {
      let result = true;
      let tempArray = [];
      for (i; i < this.timer.length; i++) {
        tempArray.push(this.timer[i]);
      }
      if (tempArray.every((e) => e == "0")) result = false;
      return result;
    },

    input: function(e) {
      if (!(e.charCode >= 48 && e.charCode <= 57)) {
        // Only allow numbers, backspace or arrows
        e.preventDefault();
      } else {
        this.timer.unshift(e.key);
        this.timer = this.timer.slice(0, 6);
      }
    },

    tDelete: function() {
      this.timer.push("0");
      this.timer = this.timer.slice(1, 7);
    },

    blur: function() {
      this.inputFocus = false;
      if (this.timer[1] > 6) {
        this.timer[1] = 6;
        this.timer[0] = 0;
      }

      if (this.timer[3] > 6) {
        this.timer[3] = 6;
        this.timer[2] = 0;
      }

      if (this.timer.every((e) => e == "0")) {
        this.timer = ["0", "0", "5", "2", "0", "0"];
      }
    },

    clear: function() {
      this.timer = ["0", "0", "0", "0", "0", "0"];
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.prevTime = null;
      document.title = `NewTab`;
    },

    start: function() {
      // check if input has value
      this.prevTime = new Date();

      this.prevTime.setHours(this.prevTime.getHours() + parseInt(`${this.timer[5] || 0}${this.timer[4] || 0}`));
      this.prevTime.setMinutes(this.prevTime.getMinutes() + parseInt(`${this.timer[3] || 0}${this.timer[2] || 0}`));
      this.prevTime.setSeconds(this.prevTime.getSeconds() + parseInt(`${this.timer[1] || 0}${this.timer[0] || 0}`));

      if (!this.timerInterval) {
        this.timerInterval = setInterval(() => {
          this.remainingTime = this.prevTime - Date.now();
          this.update();
        }, 100);
      }
    },

    update: function() {
      if (this.timer.every((e) => e == 0)) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.done();
      } else {
        let tempTime = this.remainingTime;
        let tempTimer = [];

        tempTime = Math.floor(tempTime / 1000);
        let s = (tempTime % 60).toString().padStart(2, "0");
        tempTimer[1] = s.charAt(0);
        tempTimer[0] = s.charAt(1);

        tempTime = Math.floor(tempTime / 60);
        let m = (tempTime % 60).toString().padStart(2, "0");
        tempTimer[3] = m.charAt(0);
        tempTimer[2] = m.charAt(1);

        tempTime = Math.floor(tempTime / 60);
        let h = (tempTime % 60).toString().padStart(2, "0");
        tempTimer[5] = h.charAt(0);
        tempTimer[4] = h.charAt(1);

        this.timer = tempTimer;
        document.title = `${this.timer[5]}${this.timer[4]}:${this.timer[3]}${this.timer[2]}:${this.timer[1]}${this.timer[0]}`;
      }
    },

    pause: function() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
      this.prevTime = null;
    },

    done: function() {
      this.audio.play();
      document.querySelector("#timer").classList.toggle("timer-alert");

      this.timerInterval = null;
      let alertLength = 0;
      this.alertInterval = setInterval(() => {
        this.audio.play();
        document.querySelector("#timer").classList.toggle("timer-alert");
        alertLength++;
        if (alertLength >= 9) {
          clearInterval(this.alertInterval);
          this.alertInterval = null;
        }
      }, 500);
    },

    endAlarm: function() {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
      document.querySelector("#timer").classList.remove("timer-alert");
    },
  },
};
</script>

<style scoped>
.placeholder {
  opacity: 0.5;
}

.timer-alert {
  opacity: 0;
}

.inputFocus {
  animation: cursor 1.5s linear infinite;
}

@keyframes cursor {
  0% {
    border-right: solid 2px;
    margin-right: -2px;
  }
  50% {
    border-right: solid 2px;
    margin-right: -2px;
  }
  51% {
    border-right: none;
    margin-right: 0px;
  }
  100% {
    border-right: none;
    margin-right: 0px;
  }
}
</style>
