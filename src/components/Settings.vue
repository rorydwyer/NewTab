<template>
  <div class="flex flex-col px-4 pb-4 text-white">
    <h2 class="text-xl text-center"># NewTab Settings</h2>
    <div class="flex-grow py-8">
      <div class="flex flex-col items-center justify-center w-full mb-6">
        <!-- Dark Mode -->
        <label for="darkMode" class="flex items-center cursor-pointer pb-4">
          <div class="mr-3 text-base">
            Dark Mode
          </div>
          <div class="relative">
            <input id="darkMode" type="checkbox" class="sr-only" v-model="settings.darkMode" v-on:change="setTheme()" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>

        <!-- Toggle Timer -->
        <label for="toggleTimer" class="flex items-center cursor-pointer pb-4">
          <div class="mr-3 text-base">
            Show Timer
          </div>
          <div class="relative">
            <input id="toggleTimer" type="checkbox" class="sr-only" v-model="settings.toggleTimer" v-on:change="changeSettings" />
            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow-md -left-1 -top-1 transition"></div>
          </div>
        </label>
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
      },
    };
  },
  mounted() {
    chrome.storage.sync.get("newtabSettings", (res) => {
      if (!res.newtabSettings)
        res.newtabSettings = {
          darkMode: false,
          toggleTimer: true,
        };
      this.settings.darkMode = res.newtabSettings.darkMode;
      this.settings.toggleTimer = res.newtabSettings.toggleTimer;

      this.$emit("emitSettings", this.settings);
      this.setTheme();
      chrome.storage.sync.set(res);
    });
  },
  methods: {
    setTheme: function() {
      if (this.settings.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      chrome.storage.sync.get("newtabSettings", (res) => {
        res.newtabSettings.darkMode = this.settings.darkMode;
        chrome.storage.sync.set(res);
      });
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
</style>
