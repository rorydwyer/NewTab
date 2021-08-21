<template>
  <div id="settings" class="flex flex-col px-4 pb-4 text-white max-h-screen">
    <h2 class="text-xl text-center font-bold"># NewTab Settings</h2>
    <div class="flex-grow mt-8 mb-2 px-4 overflow-y-scroll relative">
      <div class="flex flex-col items-center justify-center w-full -mb-4">
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
            <label for="bgTheme"
              >Background Image Theme
              <span id="bgImageNext" v-on:click="backgroundTheme()" class="float-right">
                <div v-if="bgLoading" class="spinner inline-block m-auto h-3 w-3 mr-2"></div>
                <span class="underline">
                  Next Image
                </span>
              </span>
            </label>
            <input
              id="bgTheme"
              v-model="settings.bgImageTheme"
              v-on:keyup="backgroundTheme()"
              type="text"
              placeholder="Nature, abstract, gradient..."
              class="capitalize color-white w-full focus:outline-none bg-transparent text-sm border border-white placeholder-gray-100 placeholder-opacity-50 p-1 mb-4"
            />
            <label for="bgOpacity"
              >Background Image Opacity
              <span id="bgImageOpacityReset" class="underline float-right" v-on:click="backgroundOpacity({ reset: true })">Reset</span></label
            >

            <vue-slider
              class="w-full p-1 mx-1"
              :process-style="{ backgroundColor: '#5cff8a' }"
              :tooltip-style="{ backgroundColor: 'rgb(75, 85, 99)' }"
              :dotSize="18"
              :min="1"
              :max="99"
              v-model="settings.bgImageOpacity"
              v-on:change="backgroundOpacity()"
            />
          </div>
        </div>

        <!-- Toggle To do -->
        <div class="border-b border-white w-full py-4">
          <label for="toggleTodo" class="flex justify-between cursor-pointer">
            <div class="mr-3 text-base">
              To Do List
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
              Quote
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
              Clock
            </div>
            <div class="relative">
              <input id="toggleTimer" type="checkbox" class="sr-only" v-model="settings.timerClock" v-on:change="timerClock()" />
              <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
            </div>
          </label>

          <!-- RADIO -->
          <div v-if="settings.timerClock" class="mb-2">
            <div class="flex items-center mr-4 my-2">
              <input id="radio1" type="radio" name="radio" class="hidden" value="clock" v-model="settings.timerClock" v-on:change="updateSettings" />
              <label for="radio1" class="flex items-center cursor-pointer">
                <span class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                Clock</label
              >
            </div>

            <div class="flex items-center mr-4 my-2">
              <input id="radio2" type="radio" name="radio" class="hidden" value="stopwatch" v-model="settings.timerClock" v-on:change="updateSettings" />
              <label for="radio2" class="flex items-center cursor-pointer">
                <span class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                Stopwatch</label
              >
            </div>

            <div class="flex items-center mr-4 my-2">
              <input id="radio3" type="radio" name="radio" class="hidden" value="timer" v-model="settings.timerClock" v-on:change="updateSettings" />
              <label for="radio3" class="flex items-center cursor-pointer">
                <span class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                Timer</label
              >
            </div>
          </div>

          <div v-if="settings.timerClock == 'timer'" class="w-full">
            <label for="timerDefault">Timer Default</label>
            <p v-on:click="focusInput" ref="input" class="w-full border border-grey text-gray-200 text-sm p-1">
              <!-- Hours -->
              <span v-bind:class="{ placeholder: !getPlaceholder(5) }">{{ settings.timerDefault[5] || "0" }}</span>
              <span v-bind:class="{ placeholder: !getPlaceholder(4) }">{{ settings.timerDefault[4] || "0" }}:</span>

              <!-- Minutes -->
              <span v-bind:class="{ placeholder: !getPlaceholder(3) }">{{ settings.timerDefault[3] || "0" }}</span>
              <span v-bind:class="{ placeholder: !getPlaceholder(2) }">{{ settings.timerDefault[2] || "0" }}:</span>

              <!-- Seconds -->
              <span v-bind:class="{ placeholder: !getPlaceholder(1) }">{{ settings.timerDefault[1] || "0" }}</span>
              <span v-bind:class="{ placeholder: !getPlaceholder(0) }">{{ settings.timerDefault[0] || "0" }}</span>

              <!-- Cursor -->
              <span class=" border-r-gray" v-bind:class="{ inputFocus: inputFocus }"></span>
            </p>
            <input
              ref="timer"
              class="opacity-0 w-0 h-0 overflow-hidden focus:outline-none"
              type="number"
              id="timerDefault"
              @keypress="tInput"
              @focus="inputFocus = true"
              v-on:keyup.delete="tDelete()"
              v-on:blur="tBlur()"
            />
          </div>
        </div>

        <!-- Load Blank Note -->
        <div class=" w-full py-4">
          <div class="mr-3 text-base pb-2">
            Note Editor
          </div>
          <div class="mb-2">
            <label for="lastNoteRadio">Load note on new tab</label>
            <div class="flex items-center mr-4 mt-2">
              <input
                id="lastNoteRadio"
                type="radio"
                name="radioNote"
                class="hidden"
                v-bind:value="false"
                v-model="settings.loadBlankNote"
                v-on:change="updateSettings"
              />
              <label for="lastNoteRadio" class="flex items-center cursor-pointer">
                <span class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                Load recently edited note</label
              >
            </div>

            <div class="flex items-center mr-4 my-2">
              <input
                id="blankNoteRadio"
                type="radio"
                name="radioNote"
                class="hidden"
                v-bind:value="true"
                v-model="settings.loadBlankNote"
                v-on:change="updateSettings"
              />
              <label for="blankNoteRadio" class="flex items-center cursor-pointer">
                <span class="w-5 h-5 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
                Load blank note</label
              >
            </div>
          </div>

          <!-- View Trash -->
          <div class="w-full pt-4">
            <label for="viewTrash" class="flex justify-between cursor-pointer">
              <div class="text-base mr-3">
                View Trash
              </div>
              <div class="relative">
                <input id="viewTrash" type="checkbox" class="sr-only" v-model="settings.viewTrash" />
                <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div id="settings-overflow" class="w-full h-16 sticky bottom-0 left-0 "></div>
    </div>
    <div class="text-right">
      <p><a href="https://rory-dwyer.com" target="_blank" class="underline">About the developer</a></p>
      <p>
        <font-awesome-icon icon="heart" />
        <a href="https://www.paypal.com/donate?business=AHBCN7RUN39R4&no_recurring=0&currency_code=USD" target="_blank" class="underline ml-2"
          >Donate (Buy me a beer)</a
        >
      </p>
      <div class="w-full flex justify-between mt-4">
        <button v-on:click="reset()" class="text-sm underline">Reset all</button>
        <button v-on:click="$emit('settings')" class="text-sm underline">Close settings</button>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

// Font Awesome
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHeart);

export default {
  components: { VueSlider, FontAwesomeIcon },
  props: {
    settings: Object,
  },
  data() {
    return {
      timeout: null,
      inputFocus: false,
      bgLoading: false,
    };
  },
  computed: {
    searchTerm: function() {
      return this.settings.bgImageTheme.replace(" ", "-");
    },
    bgCssOpacity: function() {
      return `0.${this.settings.bgImageOpacity.toString().padStart(2, "0")}`;
    },
    fallbackBg: function() {
      let imgNum = Math.floor(Math.random() * 5) + 1;

      return `/images/bgImage-${imgNum}.jpg`;
    },
  },
  methods: {
    updateSettings: function() {
      this.$emit("updateSettings", this.settings);
    },

    //Timer Clock
    timerClock: function() {
      if (this.settings.timerClock === true) this.settings.timerClock = "clock";
      this.updateSettings();
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
    getPlaceholder: function(i) {
      let result = true;
      let tempArray = [];
      for (i; i < this.settings.timerDefault.length; i++) {
        tempArray.push(this.settings.timerDefault[i]);
      }
      if (tempArray.every((e) => e == "0")) result = false;
      return result;
    },

    focusInput: function() {
      this.settings.timerDefault = ["0", "0", "0", "0", "0", "0"];
      this.$refs.timer.focus();
    },

    tClear: function() {
      this.settitimer = [];
    },

    tInput: function(e) {
      if (!(e.charCode >= 48 && e.charCode <= 57)) {
        // Only allow numbers, backspace or arrows
        e.preventDefault();
      } else {
        this.settings.timerDefault.unshift(e.key);
        this.settings.timerDefault = this.settings.timerDefault.slice(0, 6);
        this.updateSettings();
      }
    },

    tDelete: function() {
      this.settings.timerDefault.push("0");
      this.settings.timerDefault = this.settings.timerDefault.slice(1, 7);
      this.updateSettings();
    },

    tBlur: function() {
      let tempArray = this.settings.timerDefault;
      this.inputFocus = false;
      if (tempArray[1] > 6) {
        tempArray[1] = 6;
        tempArray[0] = 0;
      }

      if (tempArray[3] > 6) {
        tempArray[3] = 6;
        tempArray[2] = 0;
      }

      if (tempArray.every((e) => e == "0")) {
        tempArray = [0, 0, 5, 2];
      }

      this.settings.timerDefault = tempArray;
      this.updateSettings();
    },

    // Background Image
    backgroundImage: function() {
      const root = document.querySelector(":root");

      if (this.settings.bgImage) {
        fetch(`https://source.unsplash.com/1920x1080/?${this.searchTerm}`)
          .then((response) => {
            this.settings.bgImageURL = response.url;
          })
          .catch(() => {
            this.settings.bgImageURL = this.fallbackBg;
          })
          .then(() => {
            this.settings.today = new Date().toDateString();
            root.style.setProperty("--bgImage", `url(${this.settings.bgImageURL})`);
            this.bgLoading = false;
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
      this.bgLoading = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => this.backgroundImage(), 800);
    },

    backgroundOpacity: function(reset = false) {
      if (reset) this.settings.bgImageOpacity = 30;

      const root = document.querySelector(":root");
      root.style.setProperty("--bgOpacity", this.bgCssOpacity);
      this.updateSettings();
    },

    // Reset
    reset: function() {
      if (confirm("Are you sure you want to reset everything (deletes all notes and to do items)?")) {
        chrome.storage.local.clear();
        location.reload();
      }
    },
  },
};
</script>

<style>
#settings {
  background-color: #ff5c5c;
}

#settings-overflow {
  background: linear-gradient(rgba(255, 92, 92, 0), rgba(255, 92, 92, 1));
}

input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #5cff8a;
}

#settings input {
  caret-color: white !important;
}

#bgImageOpacityReset:hover,
#bgImageNext:hover,
p.underline:hover {
  cursor: pointer;
}

/* Slider */
.vue-slider-dot {
  border: none;
}

.vue-slider-dot-tooltip-inner-top::after {
  border-top-color: rgb(75, 85, 99);
}

/* Radio */
input[type="radio"] + label span {
  transition: all 0.2s, transform 0.2s;
}

input[type="radio"]:checked + label span {
  background-color: #5cff8a;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.placeholder {
  opacity: 0.5;
}

.inputFocus {
  animation: cursor 1.5s linear infinite;
}

.spinner {
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: rotation 0.6s infinite linear;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
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
