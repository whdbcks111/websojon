import React from "react";
import TodoItem from "./components/TodoItem";
import './TodoApp.css';

interface TodoAppProps {}
interface TodoAppState {
  todoItems: string[];
  newTodo: string;
}

class TodoApp extends React.Component<TodoAppProps, TodoAppState> {
  constructor(props: TodoAppProps) {
    super(props);
    
    this.state = {
      todoItems: [],
      newTodo: "",
    };
  }

  handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodo: e.target.value,
    });
  }

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = this.state.todoItems.concat(this.state.newTodo)

    this.setState({
      todoItems: items,
      newTodo: "",
    })
  }

  delete = (idx: number) => {
    this.state.todoItems.splice(idx, 1);

    this.setState({
      todoItems: this.state.todoItems,
      newTodo: "",
    })

    console.log(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <form onSubmit={this.handleSubmit}>
          <div>Input your what TO DO.</div>
          <br />
          <input type="text" id="new-todo" value={this.state.newTodo} onChange={this.handleNewTodo} /> <br />
          <button>Add #{this.state.todoItems.length + 1}</button>
        </form>
        <br />
        <br />
        <div id="items">
          {
            this.state.todoItems.map((item, idx) => (
              <TodoItem 
              name={item}
              key={idx} 
              idx={idx} 
              onDelete={this.delete}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default TodoApp;