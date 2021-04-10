<template>
    <div class="container mx-auto">
    <h1 class="mt-8 text-2xl">Todos</h1>

    <div class="mt-3">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 space-y-4 px-1"
             style="height: 500px">
        
          <div 
               v-for="(todo,index) in state.todos" :key="index"
               :class="{'bg-green-200' :todo.done}"

               class="p-8 bg-white shadow-md rounded flex items-center justify-between"
               >
            <div>
              <div>{{todo.text}}</div>
              <div class="text-gray-500 text-sm">{{todo.createdAt}}</div>
            </div>
            <div class="space-x-2">
              <button class="px-2 text-red-600"
                      @click="removeNote(todo)"
                      title="Remove todo">&times;</button>
              <button 
                      v-if="!todo.done"
                      @click="markAsDone(todo)"
                      class="px-2 text-green-600"
                      title="Mark as done">&check;</button>
              <button 
                      v-else
                      @click="markAsUndone(todo)"
                      class="px-2 text-orange-600"
                      title="Mark as undone">&#8630;</button>
            </div>
          </div>
          <div 
               v-if="state.todos.length==0"
               class="px-8 py-16 bg-white text-gray-700 shadow-md rounded text-sm">
            You dont have any task to do.
          </div>
        </div>

        <div class="col-span-6">
          <div class="p-8 bg-white shadow-md rounded">
            <h2 class="text-xl">Add a todo</h2>
            <input type="text"
                   v-model="state.todoText"
                   @keydown.enter="addTodo"
                   
                   class="p-2 mt-4 border rounded w-full">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {

    const state = reactive({
      todos: [],
      todoText: "",
    });

    function getTodos(){
      axios.get('http://127.0.0.1:8000/api/todos')
      .then(response =>{
        console.log(response);
        state.todos = response.data;
      });
    }

    getTodos();

    function addTodo(){
       axios.post('http://127.0.0.1:8000/api/store_todo',{
           text : state.todoText,
       }).then(()=>{
          state.todoText = ""
          getTodos()
              
       });  
    }

    function markAsDone(todo){
        axios.post('http://127.0.0.1:8000/api/markasdone',{
        id:todo.id
      }).then(()=>getTodos());
    }

    function markAsUndone(todo){
         axios.post('http://127.0.0.1:8000/api/markasUndone',{
        id:todo.id
      }).then(()=>getTodos());
    }

    function removeNote(todo){
      if(!confirm("Are You Sure ?!")){
        return;
      }

      axios.post('http://127.0.0.1:8000/api/delete',{
        id:todo.id
      }).then(()=>getTodos());


    }
    return{
        state,
        addTodo,
        markAsDone,
        markAsUndone,
        removeNote,
        getTodos
    }
  }

});
</script>
