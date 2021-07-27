<template>
  <div class="flex flex-col px-4 pb-4 text-white">
    <h2 class="text-xl text-center font-bold"># NewTab Settings</h2>
    <div class="flex-grow py-8 px-4">
      <div class="flex flex-col items-center justify-center w-full mb-6">
        <!-- Dark Mode -->
        <label for="darkMode" class="flex border-b border-white justify-between cursor-pointer w-full py-4">
          <div class="mr-3 text-base">
            Dark Mode
          </div>
          <div class="relative">
            <input id="darkMode" type="checkbox" class="sr-only" v-model="settings.darkMode" v-on:change="setTheme()" />
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
            <input id="toggleTodo" type="checkbox" class="sr-only" v-model="settings.toggleTodo" v-on:change="changeSettings" />
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
            <input id="toggleTimer" type="checkbox" class="sr-only" v-model="settings.toggleTimer" v-on:change="changeSettings" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <div v-if="settings.toggleTimer" class="w-full border-b border-white">
          <label for="timerDefault">Timer Default (Minutes)</label>
          <input
            id="timerDefault"
            v-model="settings.timerDefault"
            v-on:keyup="changeSettings"
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
            v-on:keyup="changeBgTheme()"
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
  data() {
    return {
      settings: {
        darkMode: false,
        toggleTimer: true,
        timerDefault: "15:00",
        toggleTodo: true,
        bgImage: true,
        bgImageTheme: "Nature",
        bgImageURL: "",
        bgImageDate: new Date().toDateString(),
      },
      timeout: null,
    };
  },
  mounted() {
    chrome.storage.sync.get("newtabSettings", (res) => {
      if (!res.newtabSettings) res.newtabSettings = this.settings;

      this.settings.darkMode = res.newtabSettings.darkMode;
      this.settings.toggleTodo = res.newtabSettings.toggleTodo;
      this.settings.toggleTimer = res.newtabSettings.toggleTimer;
      this.settings.timerDefault = res.newtabSettings.timerDefault;
      this.settings.bgImage = res.newtabSettings.bgImage;
      this.settings.bgImageTheme = res.newtabSettings.bgImageTheme;
      this.settings.bgImageURL = res.newtabSettings.bgImageURL;
      this.settings.bgImageDate = res.newtabSettings.bgImageDate;

      chrome.storage.sync.set(res);

      // Dark Mode
      if (this.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Background Image
      if (this.settings.bgImage) this.backgroundImage();

      this.$emit("emitSettings", this.settings);
    });
  },
  methods: {
    setTheme: function() {
      if (this.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      if (this.settings.bgImage) this.backgroundImage();

      chrome.storage.sync.get("newtabSettings", (res) => {
        res.newtabSettings.darkMode = this.settings.darkMode;
        chrome.storage.sync.set(res);
      });
    },
    backgroundImage: function(changeBgTheme) {
      changeBgTheme;
      // if (this.settings.bgImage) {
      //   if (changeBgTheme || this.settings.bgImageURL == "" || this.settings.bgImageDate !== new Date().toDateString()) {
      //     fetch(`https://source.unsplash.com/1920x1080/?${this.settings.bgImageTheme}`).then((response) => {
      //       this.settings.bgImageDate = new Date().toDateString();
      //       this.settings.bgImageURL = response.url;

      //       chrome.storage.sync.get("newtabSettings", (res) => {
      //         res.newtabSettings.bgImage = this.settings.bgImage;
      //         res.newtabSettings.bgImageDate = this.settings.bgImageDate;
      //         res.newtabSettings.bgImageURL = this.settings.bgImageURL;
      //         res.newtabSettings.bgImageTheme = this.settings.bgImageTheme;
      //         chrome.storage.sync.set(res);
      //       });

      //       if (document.documentElement.classList.contains("dark")) {
      //         document.getElementById(
      //           "main"
      //         ).style.background = `linear-gradient(0deg, rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9)), url(${this.settings.bgImageURL})`;
      //       } else {
      //         document.getElementById(
      //           "main"
      //         ).style.background = `linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${this.settings.bgImageURL})`;
      //       }
      //     });
      //   } else {
      //     if (document.documentElement.classList.contains("dark")) {
      //       document.getElementById(
      //         "main"
      //       ).style.background = `linear-gradient(0deg, rgba(31, 41, 55, 0.9), rgba(31, 41, 55, 0.9)), url(${this.settings.bgImageURL})`;
      //     } else {
      //       document.getElementById(
      //         "main"
      //       ).style.background = `linear-gradient(0deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${this.settings.bgImageURL})`;
      //     }
      //     document.getElementById("main").style.background = "";
      //     chrome.storage.sync.get("newtabSettings", (res) => {
      //       res.newtabSettings.bgImage = this.settings.bgImage;
      //       chrome.storage.sync.set(res);
      //     });
      //   }
      // } else {
      //   document.getElementById("main").style.background = "";
      //   chrome.storage.sync.get("newtabSettings", (res) => {
      //     console.log("bar");
      //     res.newtabSettings.bgImage = this.settings.bgImage;
      //     chrome.storage.sync.set(res);
      //   });
      // }
    },
    changeBgTheme: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => this.backgroundImage(true), 800);
    },
    changeSettings: function() {
      chrome.storage.sync.get("newtabSettings", (res) => {
        this.$emit("emitSettings", this.settings);
        res.newtabSettings = this.settings;
        chrome.storage.sync.set(res);
      });
    },
  },
};
</script>

<style>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #5cff8a;
}

#bgTheme {
  caret-color: white;
}
</style>
