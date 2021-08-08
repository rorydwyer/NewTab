<template>
  <div>
    <div class="timer w-full text-center">
      <span v-on:click="focusInput" ref="timerInput" class="w-full text-7xl text-gray-600 dark:text-gray-200 focus:outline-none text-center bg-transparent">
        <span v-if="timer.h">{{ formatTimer.h }}:</span>
        <span>{{ formatTimer.m }}:</span>
        <span>{{ formatTimer.s }}</span>
        <span v-if="inputFocus">|</span>
      </span>
      <input
        ref="timer"
        class="opacity-0 w-0 h-0 overflow-hidden"
        type="number"
        id="timer"
        @keypress="timerInput"
        @focus="inputFocus = true"
        v-on:blur="
          timerBlur;
          inputFocus = false;
        "
      />
    </div>
    <button
      v-on:click="startTimer"
      class="w-full py-1 border border-gray-400 dark:border-gray-500 rounded hover:bg-gray-400 hover:dark:bg-gray-100 hover:bg-opacity-10 text-sm text-center text-gray-600 dark:text-gray-300 transition"
    >
      <span v-if="timerOn">Stop Timer</span>
      <span v-else>Start Timer</span>
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
      handler(newValue, oldValue) {
        if (newValue.timerDefault != oldValue.timerDefault);
        this.timer = this.settings.timerDefault;
        this.timerOn = false;
        this.timerSet = false;
      },
    },
  },
  data() {
    return {
      timer: {
        h: 0,
        m: 0,
        s: 0,
      },
      timerRaw: [0, 0, 0, 0, 0],
      inputFocus: false,
      startTime: "",
      timerSet: true, // Makes sure the input does clear if the user clicks on a spot to edit
      timerOn: false,
      timerOver: false,
    };
  },
  computed: {
    formatTimer: function() {
      let formatTimer;

      formatTimer = this.timer;

      return {
        h: formatTimer.h,
        m: formatTimer.m.toString().padStart(2, "0"),
        s: formatTimer.s.toString().padStart(2, "0"),
      };
    },
  },
  mounted() {
    // this.timer = this.settings.timerDefault;
  },
  methods: {
    focusInput: function() {
      this.clearTime();
      this.$refs.timer.focus();
    },

    timerInput: function(e) {
      if ((e.charCode == 8 && e.charCode != 0) || !(e.charCode >= 48 && e.charCode <= 58) || this.timer.length >= 5) {
        // Only allow numbers, backspace, colon or arrows
        e.preventDefault();
      }

      this.timerRaw.unshift(e.key);
      this.timerRaw = this.timerRaw.slice(0, 6);

      this.timer.h = this.timerRaw[5] + this.timerRaw[4];
      this.timer.m = this.timerRaw[3] + this.timerRaw[2];
      this.timer.s = this.timerRaw[1] + this.timerRaw[0];
    },

    clearTime: function() {
      this.timer = {
        h: 0,
        m: 0,
        s: 0,
      };
      this.timerRaw = [0, 0, 0, 0, 0];
      this.timerOn = false;
      this.timerSet = false;
      document.title = `NewTab`;
    },

    timerBlur: function() {
      // If timer was not set
      if (this.timer == "") {
        this.timer = this.settings.timerDefault;
        this.timerSet = true;
      } else if (!this.timer.includes(":")) {
        this.timer += ":00";
      }
    },

    startTimer: function() {
      if (this.timerOver) {
        this.timer = this.timerDefault;
        this.timerOver = false;

        // Set timer in Date()
        this.startTime = new Date();
        this.startTime.setHours(this.startTime.getHours + 0);
        this.startTime.setMinutes(this.startTime.getMinutes + 0);
        this.startTime.setSeconds(this.startTime.getSeconds + 0);
      }

      this.timerOn = !this.timerOn;
      this.timerSet = true;

      if (this.timerOn) {
        //check this.timer for validation
        let minutes = this.timer.split(":")[0];
        let seconds = this.timer.split(":")[1];

        let timer = setInterval(() => {
          if (this.timerOn) {
            if (seconds != 0) {
              seconds--;
              seconds = seconds.toString().padStart(2, "0");
            } else if (minutes != 0) {
              minutes--;
              seconds = "59";
            } else if (seconds == 0 && minutes == 0) {
              // If timer is over
              this.timerDone();
            }
            this.timer = `${minutes}:${seconds}`;
            document.title = `${this.timer}`;
          } else {
            clearInterval(timer);
          }
        }, 1000);
      }
    },

    timerDone: function() {
      let audio = new Audio("/timer.mp3");
      audio.play();

      let alertLength = 0;
      document.querySelector("#timer").classList.toggle("timer-alert");
      let alert = setInterval(() => {
        document.querySelector("#timer").classList.toggle("timer-alert");
        alertLength++;
        if (alertLength >= 5) {
          clearInterval(alert);
        }
      }, 800);

      this.timerOn = false;
      this.timerOver = true;
    },
  },
};
</script>
