<template>
  <div id="settings" class="flex flex-col px-4 pb-4 text-white">
    <h2 class="text-xl text-center font-bold"># NewTab Settings</h2>
    <div class="flex-grow py-8 px-4">
      <div class="flex flex-col items-center justify-center w-full mb-6">
        <!-- Dark Mode -->
        <div class="border-b border-white w-full py-4">
          <label for="darkMode" class="flex justify-between cursor-pointer">
            <div class="mr-3 text-base">
              Dark Mode
            </div>
            <div class="relative">
              <input id="darkMode" type="checkbox" class="sr-only" v-model="settings.darkMode" v-on:change="darkMode()" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>
        </div>

        <!-- Toggle To do -->
        <div class="border-b border-white w-full py-4">
          <label for="toggleTodo" class="flex justify-between cursor-pointer">
            <div class="mr-3 text-base">
              Show To Do List
            </div>
            <div class="relative">
              <input id="toggleTodo" type="checkbox" class="sr-only" v-model="settings.todo" v-on:change="updateSettings" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>
        </div>

        <!-- Toggle To do -->
        <div class="border-b border-white w-full py-4">
          <label for="toggleQuote" class="flex justify-between cursor-pointer">
            <div class="mr-3 text-base">
              Show Quote
            </div>
            <div class="relative">
              <input id="toggleQuote" type="checkbox" class="sr-only" v-model="settings.quote" v-on:change="updateSettings" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>
        </div>

        <!-- Toggle Timer -->
        <div class="border-b border-white w-full py-4">
          <label for="toggleTimer" class="flex justify-between cursor-pointer">
            <div class="mr-3 text-base">
              Show Timer
            </div>
            <div class="relative">
              <input id="toggleTimer" type="checkbox" class="sr-only" v-model="settings.timer" v-on:change="updateSettings" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>

          <div v-if="settings.timer" class="w-full">
            <label for="timerDefault">Timer Default</label>
            <input
              id="timerDefault"
              v-model="settings.timerDefault"
              v-on:change="updateSettings()"
              v-on:blur="timerBlur()"
              @keypress="timerInput"
              type="text"
              placeholder="25:00"
              class="color-white w-full focus:outline-none bg-transparent text-sm border border-white placeholder-gray-100 placeholder-opacity-50 p-1 mb-4"
            />
          </div>
        </div>

        <!-- Background Image -->
        <div class="border-b border-white w-full py-4">
          <label for="bgImage" class="flex justify-between cursor-pointer pb-2">
            <div class="mr-3 text-base">
              Background Image
            </div>
            <div class="relative">
              <input id="bgImage" type="checkbox" class="sr-only" v-model="settings.bgImage" v-on:change="backgroundImage(true)" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>

          <div v-if="settings.bgImage" class="w-full ">
            <label for="bgTheme">Background Image Theme</label>
            <input
              id="bgTheme"
              v-model="settings.bgImageTheme"
              v-on:keyup="backgroundTheme()"
              type="text"
              placeholder="Nature"
              class="capitalize color-white w-full focus:outline-none bg-transparent text-sm border border-white placeholder-gray-100 placeholder-opacity-50 p-1 mb-4"
            />
            <label for="bgOpacity"
              >Background Image Opacity
              <span id="bgImageOpacityReset" class="underline float-right" v-on:click="backgroundOpacity({ reset: true })">Reset</span></label
            >
            <range-slider class="slider block w-full p-1" min="1" max="99" step="1" v-on:change="backgroundOpacity()" v-model="settings.bgImageOpacity">
            </range-slider>
          </div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <button v-on:click="$emit('settings')" class="text-sm underline text-right">Close settings</button>
    </div>
  </div>
</template>

<script>
import RangeSlider from "vue-range-slider";
// you probably need to import built-in style
import "vue-range-slider/dist/vue-range-slider.css";

export default {
  components: { RangeSlider },
  props: {
    settings: Object,
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    searchTerm: function() {
      return this.settings.bgImageTheme.replace(" ", "-");
    },
    bgCssOpacity: function() {
      return `0.${this.settings.bgImageOpacity.toString().padStart(2, "0")}`;
    },
  },
  methods: {
    updateSettings: function() {
      this.$emit("updateSettings", this.settings);
    },

    // Dark Mode
    darkMode: function() {
      if (this.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      this.updateSettings();
    },

    // Timer
    timerInput: function(e) {
      if ((e.charCode == 8 && e.charCode != 0) || !(e.charCode >= 48 && e.charCode <= 58)) {
        // Only allow numbers, backspace, colon or arrows
        e.preventDefault();
      }
    },

    timerBlur: function() {
      // If timer was not set
      if (this.settings.timerDefault == "") {
        this.settings.timerDefault = "25:00";
      } else if (!this.settings.timerDefault.includes(":")) {
        this.settings.timerDefault += ":00";
      }
      this.updateSettings();
    },

    // Background Image
    backgroundImage: function() {
      const root = document.querySelector(":root");

      if (this.settings.bgImage) {
        // NEED TO CREATE FALLBACK IMAGE IF  NOT CONNECTED TO INTERNET
        fetch(`https://source.unsplash.com/1920x1080/?${this.searchTerm}`).then((response) => {
          this.settings.today = new Date().toDateString();
          this.settings.bgImageURL = response.url;

          root.style.setProperty("--bgImage", `url(${this.settings.bgImageURL})`);
          this.updateSettings();
        });
      } else {
        // Remove Background Image
        this.settings.bgImageURL = "";

        root.style.setProperty("--bgImage", "url()");
        this.updateSettings();
      }
    },

    backgroundTheme: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => this.backgroundImage(), 800);
    },

    backgroundOpacity: function(reset = false) {
      if (reset) this.settings.bgImageOpacity = 15;

      const root = document.querySelector(":root");
      root.style.setProperty("--bgOpacity", this.bgCssOpacity);
      this.updateSettings();
    },
  },
};
</script>

<style>
#settings {
  background-color: #ff5c5c;
}

input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #5cff8a;
}

#settings input {
  caret-color: white !important;
}

#bgImageOpacityReset:hover {
  cursor: pointer;
}

/* Slider */
.range-slider-knob {
  width: 24px;
  height: 24px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.range-slider-fill {
  background-color: #5cff8a;
}

.range-slider-rail {
  /* background-color: #9ca3af; */
}
</style>
