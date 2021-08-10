<template>
  <div v-if="settings.todo" class="flex flex-col max-h-full">
    <div class="w-full relative mb-4">
      <input
        v-on:keyup.enter="addTodo"
        v-model="todos.newText"
        type="text"
        id="newTodo"
        placeholder="Create new to do item..."
        class="w-full focus:outline-none bg-transparent text-sm border-b  border-gray-400 dark:border-gray-500 p-1"
      />
      <span class="focus-border absolute left-0 bottom-0 w-0 bg-gray-800 dark:bg-gray-200 transition"></span>
    </div>
    <draggable v-model="todos.collection" @end="moveTodo()" class="flex-grow draggable overflow-y-auto overflow-x-hidden">
      <transition-group name="flip-list">
        <div v-for="(todo, index) in todos.collection" :key="todo.id" class="todo-item my-2 flex">
          <input class="checkbox relative" type="checkbox" v-on:click="deleteTodo(index)" />
          <span class="todoContent ml-3 text-sm flex-grow">{{ todo.content }}</span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    todos: Object,
    settings: Object,
  },
  methods: {
    addTodo: function() {
      if (this.todos.newText.length > 0) {
        this.todos.newId++;
        this.todos.collection.unshift({
          id: this.todos.newId,
          content: this.todos.newText,
        });

        this.todos.newText = "";
        this.$emit("updateTodos", this.todos);
      }
    },

    deleteTodo: function(index) {
      this.todos.collection.splice(index, 1);
      this.$emit("updateTodos", this.todos);
    },

    moveTodo: function() {
      this.$emit("updateTodos", this.todos);
    },
  },
};
</script>

<style scoped>
.todo-item > span {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.checkbox {
  bottom: -2px;
}

.todo-item > input {
  cursor: pointer;
}

.sortable-chosen {
  background-color: #ddd;
  opacity: 0.5;
  padding: 2px;
  margin-bottom: -4px !important;
  color: black !important;
  border-radius: 2px;
}

.sortable-chosen:hover {
  cursor: grabbing !important;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.draggable:active,
.todo-item:active {
  cursor: grabbing !important;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.focus-border {
  height: 1px;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

#newTodo:focus ~ .focus-border {
  width: 100%;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 150ms;
}

.todoContent:first-letter {
  text-transform: uppercase;
}
</style>
