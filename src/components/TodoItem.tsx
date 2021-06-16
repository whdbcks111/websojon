import React from 'react';

interface TodoItemProps {
  name: string;
  idx: number;
  onDelete(idx: number): void;
}

function TodoItem(props: TodoItemProps) {
  return(
    <div>
      <div>{props.name}</div> 
      <button onClick={e=>{
        props.onDelete(props.idx);
      }}>X</button>
    </div>
  )
}

export default TodoItem;