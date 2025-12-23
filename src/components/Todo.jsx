import { useEffect, useRef, useState } from "react";

// 自作カスタムフック関数
function usePrevious(value) {
  // useRefは再レンダーされても値を保持する
  const ref = useRef();
  // レンダー後に実行され、レンダー時点の value を保存する
  useEffect(() => {
    ref.current = value;
  });
  // 前回レンダー時の value を返す
  return ref.current;
}

function Todo(props) {
  //console.log(props);
  // falseはisEditingの初期値
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  // wasEditingはisEditingの前回の値
  const wasEditing = usePrevious(isEditing);
  console.log('isEditing =', isEditing, 'wasEditing =', wasEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          // ref は React の機能
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );

  // useEffect(処理, [依存値]); 依存値が変更されてレンダー後にuseEffectを実行
  useEffect(() => {
    //console.log("side effect");
    if (!wasEditing && isEditing) {
      // editFieldRef.currentでDOM要素にアクセス. focus()はJSの機能
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  //console.log("main render");
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;

