import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid"; // 一意のID生成用
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

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

// JSオブジェクト
const FILTER_MAP = {
  // 無名関数 trueを返す
  All: () => true,
  // 無名関数 完了taskのみを返す
  //function (task) {
  //  return !task.completed;
  //}
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
// FILTER_MAPのキーのみ取得しフィルター名の配列を作成
const FILTER_NAMES = Object.keys(FILTER_MAP);

// Appはコンポーネント. 再レンダリングで呼び出される
function App(props) {
  const [filter, setFilter] = useState("All");

  // main.jsxのDATAがtasksとして渡ってくる
  console.log('props = ', props);

  // コールバック関数
  function addTask(name) {
    //alert(name);
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }; // 新しいタスクの作成
    setTasks([...tasks, newTask]); // 配列更新（...スプレッド構文で全ての既存の配列を並べ、そこにnewTaskを追加する）
  }

  // Todo.jsxでinputタグ変更時に呼び出すように設定
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      //console.log('task =', task, ', id =', id, ', task.id = ', task.id);
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // taskオブジェクトをコピーして、completed だけ反転させた新しいオブジェクトを返す
        // task に completed があれば更新、なければ新しく追加される
        // ...スプレッド構文で全ての既存の配列を並べる
        //console.log('...task =', {...task});
        //console.log('completed: !task.completed =', {completed: !task.completed});
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    //console.log('updatedTasks =', updatedTasks);
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    // id !== task.idがtrueのときremainingTasksに代入. 削除対象のみ削除
    const remainingTasks = tasks.filter((task) => id !== task.id);
    //console.log('remainingTasks = ', remainingTasks);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // タスクをコピーし、名前を更新する
        return { ...task, name: newName };
      }
      // 編集されたタスクでない場合は、元のタスクを返します。
      return task;
    });
    setTasks(editedTaskList);
  }

  const [tasks, setTasks] = useState(props.tasks);
  // props.tasks が undefined または null であるかどうかを確認してから、タスク名の新しい配列を作成
  //const taskList = props.tasks?.map((task) => task.name);
  //const taskList = props.tasks?.map((task) => <Todo />);
  // ?.にすることでオプションチェーンでtasksにmap関数がなかった場合（Arrayじゃなかった場合）にエラーにならない
  const taskList = tasks
    // .filterはループでTrueの物だけを返す
    // FILTER_MAPで呼び出す無名関数を指定 filterはループ時に要素を渡し無名関数の引数になる
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  console.log('taskList =', taskList);
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  // なぜFormでSubmitするたびに、headingTextが更新されるか
  // tasksのsetTasksが呼ばれると、React は App コンポーネントを再レンダー する。つまり関数Appを最初からもう一度実行する。
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  //console.log(headingText);
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    // タスクが減った場合に<h2>をフォーカス
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* わかりやすいようにaddTask=で関数と同じ名前でプロップを設定 */}
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {/* name,completedなどはプロップ（プロパティ） */}
        {/*
        <Todo name="Eat" id="todo-0" completed />
        <Todo name="Sleep" id="todo-1" />
        <Todo name="Repeat" id="todo-2" />
        */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;

