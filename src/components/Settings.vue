<template>
  <div class="flex flex-col px-4 pb-4 text-white">
    <h2 class="text-xl text-center"># NewTab Settings</h2>
    <div class="flex-grow py-8">
      <div class="flex items-center justify-center w-full mb-6">
        <!-- Dark Mode -->
        <label for="darkMode" class="flex items-center cursor-pointer">
          <div class="mr-3 text-base">
            Dark Mode
          </div>
          <div class="relative">
            <input id="darkMode" type="checkbox" class="sr-only" v-model="darkmode" v-on:change="setTheme" />
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
      darkmode: false,
    };
  },
  mounted() {
    chrome.storage.sync.get("newtabTheme", (res) => {
      if (!res.newtabTheme) res.newtabTheme = false;
      this.darkmode = res.newtabTheme;
      this.setTheme();
      chrome.storage.sync.set(res);
    });
  },
  methods: {
    setTheme: function() {
      if (this.darkmode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      chrome.storage.sync.get("newtabTheme", (res) => {
        res.newtabTheme = this.darkmode;
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
