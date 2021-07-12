<template>
    <div class="px-4 pb-4">
        <input v-on:keyup.enter="addNewTodo" v-model="newTodoText" type="text" id="newTodo" placeholder="Create new to do item..." class="w-full focus:outline-none bg-transparent text-sm border rounded border-gray-300 p-1 mb-1">
        <draggable v-model="todos" @start="drag=true" @end="drag=false">
            <div v-for="(todo, index) in todos" :key="todo.id">
                <input type="checkbox" v-on:click="removeTodo(index)">
                <span class="text-sm">{{ todo.todo }}</span>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
    components: {
        draggable
    },
    data(){
        return {
            todos: [
                { id: 0, todo: 'To do item one', done: false },
                { id: 1, todo: 'To do item two', done: false },
                { id: 2, todo: 'To do item three', done: true }
            ],
            nextTodoId: 3,
            newTodoText: '',
        }
    },
    methods: {
        addNewTodo: function() {
            this.todos.unshift({
                id: this.nextTodoId++,
                todo: this.newTodoText,
                done: false
            });
            this.newTodoText = '';
        },
        removeTodo: function(index) {
            this.todos.splice(index, 1);
        }
    }
}
</script>
