import React from 'react';

interface TodoItemProps {
  name: string;
  idx: number;
  checked: boolean;
  checkedDate: string;
  onDelete(idx: number): void;
  onCheck(e: React.MouseEvent<HTMLButtonElement>, idx: number): void;
}

const uncheckedStyle = { color: "#006500" };
const checkedStyle = { color: "#33ff33" };

function TodoItem(props: TodoItemProps) {
  return(
    <div>
      <div>{props.name}</div>
      <div>
        <span>{props.checkedDate}</span>
        <button 
          onClick={e => {
            props.onCheck(e, props.idx);
          }} 
          style={props.checked ? checkedStyle: uncheckedStyle}
        >
          {props.checked ? "O": "V"}
        </button>
        <button onClick={e=>{
          props.onDelete(props.idx);
        }}>X</button>
      </div>
    </div>
  )
}

export default TodoItem;