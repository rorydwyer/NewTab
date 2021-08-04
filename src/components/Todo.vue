<template>
  <div v-if="settings.todo">
    <input
      v-on:keyup.enter="addTodo"
      v-model="todos.newText"
      type="text"
      id="newTodo"
      placeholder="Create new to do item..."
      class="w-full focus:outline-none bg-transparent text-sm border-b  border-gray-400 dark:border-gray-500 p-1 mb-4"
    />
    <draggable v-model="todos.collection" @end="moveTodo()" class="draggable">
      <transition-group name="flip-list">
        <div v-for="(todo, index) in todos.collection" :key="todo.id" class="todo-item">
          <input type="checkbox" v-on:click="deleteTodo(index)" />
          <span class="pl-1 text-sm">{{ todo.content }}</span>
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

.todo-item > input {
  cursor: pointer;
}

.sortable-chosen {
  background-color: #ddd;
}

.draggable:active,
.todo-item:active {
  cursor: grabbing !important;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}
</style>
