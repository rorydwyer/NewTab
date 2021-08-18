<template>
  <div class="commands-menu items prose text-left flex flex-col bg-white dark:bg-gray-700 rounded shadow py-4 px-2 h-64 max-h-64 overflow-y-scroll">
    <button class="item" :class="{ 'is-active': index === selectedIndex }" v-for="(item, index) in items" :key="index" @click="selectItem(index)">
      <div>
        <font-awesome-icon :icon="item.icon" />
        <span class="px-2">
          <span class="opacity-50">{{ item.pBefore }}</span>
          {{ item.title }}
          <span class="opacity-50">{{ item.pAfter }}</span>
        </span>
      </div>
      <span class="opacity-50 pl-2">{{ getShortcut(item.shortcut) }}</span>
    </button>
  </div>
</template>

<script>
// Font Awesome
import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faHeading,
  faListUl,
  faListOl,
  faFileCode,
  faQuoteLeft,
  faGripLines,
  faUnderline,
  faImage,
  faCheckSquare,
  faLink,
  faUnlink,
  faHighlighter,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faHeading,
  faListUl,
  faListOl,
  faFileCode,
  faQuoteLeft,
  faGripLines,
  faUnderline,
  faImage,
  faCheckSquare,
  faLink,
  faUnlink,
  faHighlighter,
  faAlignLeft,
  faAlignCenter,
  faAlignRight,
  faAlignJustify
);

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  watch: {
    items() {
      this.selectedIndex = 0;
    },
  },
  methods: {
    getShortcut(keys) {
      let shortcut = "";

      // PowerKey
      if (keys[0] === "cmd") {
        if (navigator.appVersion.indexOf("Mac") != -1) {
          shortcut += "⌘";
        } else {
          shortcut += "Ctrl+";
        }
      }

      // SecondKey
      if (keys[1] === "opt") {
        if (navigator.appVersion.indexOf("Mac") != -1) {
          shortcut += "⌥";
        } else {
          shortcut += "Alt+";
        }
      } else if (keys[1] === "shift") shortcut += "⇧";

      shortcut += keys[2];
      return shortcut;
    },
    onKeyDown({ event }) {
      if (event.key === "ArrowUp") {
        this.upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        this.downHandler();
        return true;
      }
      if (event.key === "Enter") {
        this.enterHandler();
        return true;
      }
      return false;
    },
    upHandler() {
      this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
      this.$nextTick(() => {
        let selected = document.querySelector(".commands-menu > .is-active");
        selected.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      });
    },
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
      this.$nextTick(() => {
        let selected = document.querySelector(".commands-menu > .is-active");
        selected.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      });
    },
    enterHandler() {
      this.selectItem(this.selectedIndex);
    },
    selectItem(index) {
      const item = this.items[index];
      if (item) {
        this.command(item);
      }
    },
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor
          .chain()
          .focus()
          .setImage({ src: url })
          .run();
      }
    },
    setLink() {
      const url = window.prompt("URL");

      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },
};
</script>

<style lang="scss" scoped></style>
