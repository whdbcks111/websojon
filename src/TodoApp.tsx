import React from "react";
import TodoItem from "./components/TodoItem";
import './TodoApp.css';

interface ItemContent {
  content: string,
  isChcked: boolean,
  date: string
}

interface TodoAppProps {}
interface TodoAppState {
  todoItems: ItemContent[];
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
    const items = this.state.todoItems.concat({content: this.state.newTodo, isChcked: false, date: ""});

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

  check = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    const result = !this.state.todoItems[idx].isChcked;
    this.state.todoItems[idx].isChcked = result;
    if(result)
      this.state.todoItems[idx].date = new Date().toLocaleString() + "에 완료함";
    else
      this.state.todoItems[idx].date = "";
    this.setState({todoItems: this.state.todoItems});
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
              name={item.content}
              key={idx}
              idx={idx}
              onDelete={this.delete}
              onCheck={this.check}
              checked={item.isChcked}
              checkedDate={item.date}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default TodoApp;