<template>
  <div class="timer">
    <input
      class="w-full text-7xl text-gray-400 focus:outline-none text-center bg-transparent"
      ref="timer"
      v-model="timer"
      type="text"
      id="timer"
      @keypress="timerInput"
      v-on:click="clearTime"
      v-on:blur="timerBlur"
    />
    <button v-on:click="startTimer" class="w-full py-1 border border-gray-300 rounded hover:bg-gray-200 text-sm text-center">
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
      timer: "",
      timerSet: true, // Makes sure the input does clear if the user clicks on a spot to edit
      timerOn: false,
      timerOver: false,
    };
  },
  mounted() {
    this.timer = this.settings.timerDefault;
  },
  methods: {
    timerInput: function(e) {
      if ((e.charCode == 8 && e.charCode != 0) || !(e.charCode >= 48 && e.charCode <= 58) || this.timer.length >= 5) {
        // Only allow numbers, backspace, colon or arrows
        e.preventDefault();
      }
    },

    clearTime: function() {
      if (this.timerSet) {
        this.timer = "";
        this.timerOn = false;
        this.timerSet = false;
      }
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
