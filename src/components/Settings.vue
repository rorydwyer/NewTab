<template>
  <div id="settings" class="flex flex-col px-4 pb-4 text-white">
    <h2 class="text-xl text-center font-bold"># NewTab Settings</h2>
    <div class="flex-grow py-8 px-4">
      <div class="flex flex-col items-center justify-center w-full mb-6">
        <!-- Dark Mode -->
        <label for="darkMode" class="flex border-b border-white justify-between cursor-pointer w-full py-4">
          <div class="mr-3 text-base">
            Dark Mode
          </div>
          <div class="relative">
            <input id="darkMode" type="checkbox" class="sr-only" v-model="settings.darkMode" v-on:change="darkMode()" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <!-- Toggle To do -->
        <label for="toggleTodo" class="flex border-b border-white justify-between cursor-pointer w-full py-4">
          <div class="mr-3 text-base">
            Show To Do List
          </div>
          <div class="relative">
            <input id="toggleTodo" type="checkbox" class="sr-only" v-model="settings.todo" v-on:change="updateSettings" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <!-- Toggle Timer -->
        <label for="toggleTimer" class="flex justify-between cursor-pointer w-full pt-4">
          <div class="mr-3 text-base">
            Show Timer
          </div>
          <div class="relative">
            <input id="toggleTimer" type="checkbox" class="sr-only" v-model="settings.timer" v-on:change="updateSettings" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <div v-if="settings.timer" class="w-full border-b border-white">
          <label for="timerDefault">Timer Default (Minutes)</label>
          <input
            id="timerDefault"
            v-model="settings.timerDefault"
            v-on:keyup="updateSettings()"
            type="text"
            placeholder="25"
            class="color-white w-full focus:outline-none bg-transparent text-sm border border-white placeholder-gray-100 placeholder-opacity-50 p-1 mb-4"
          />
        </div>

        <!-- Background Image -->
        <label for="bgImage" class="flex justify-between cursor-pointer w-full pt-4 pb-2">
          <div class="mr-3 text-base">
            Background Image
          </div>
          <div class="relative">
            <input id="bgImage" type="checkbox" class="sr-only" v-model="settings.bgImage" v-on:change="backgroundImage(true)" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <div v-if="settings.bgImage" class="w-full border-b border-white">
          <label for="bgTheme">Background Image Theme</label>
          <input
            id="bgTheme"
            v-model="settings.bgImageTheme"
            v-on:keyup="backgroundTheme()"
            type="text"
            placeholder="Nature"
            class="color-white w-full focus:outline-none bg-transparent text-sm border border-white placeholder-gray-100 placeholder-opacity-50 p-1 mb-4"
          />
        </div>
      </div>
    </div>
    <div class="text-right">
      <button v-on:click="$emit('settings')" class="text-sm underline text-right">Close settings</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    settings: Object,
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    updateSettings: function() {
      this.$emit("updateSettings", this.settings);
    },
    darkMode: function() {
      if (this.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      this.updateSettings();
    },

    backgroundImage: function(load = false) {
      const root = document.querySelector(":root");
      if (this.settings.bgImage) {
        console.log("foo");
        fetch(`https://source.unsplash.com/1920x1080/?${this.settings.bgImageTheme}`).then((response) => {
          this.settings.bgImageDate = new Date();
          this.settings.bgImageURL = response.url;

          root.style.setProperty("--bgImage", `url(${this.settings.bgImageURL})`);
        });
      } else {
        console.log("bar");
        root.style.setProperty("--bgImage", "url()");
      }

      if (!load) this.updateSettings();
    },

    backgroundTheme: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => this.backgroundImage(true), 800);
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

#bgTheme {
  caret-color: white;
}
</style>
