import { useState } from "react";
import { nanoid } from "nanoid"; // 一意のID生成用
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  // main.jsxのDATAがtasksとして渡ってくる
  console.log(props);
  const [tasks, setTasks] = useState(props.tasks);

  // コールバック関数
  function addTask(name) {
    //alert(name);
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }; // 新しいタスクの作成
    setTasks([...tasks, newTask]); // 配列更新（...スプレッド構文で全ての既存の配列を並べ、そこにnewTaskを追加する）
  }

  // Todo.jsxでinputタグ変更時に呼び出すように設定
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      console.log('task =', task, ', id =', id, ', task.id = ', task.id);
      // このタスクが編集されたタスクと同じIDを持っている場合
      if (id === task.id) {
        // taskオブジェクトをコピーして、completed だけ反転させた新しいオブジェクトを返す
        // task に completed があれば更新、なければ新しく追加される
        // ...スプレッド構文で全ての既存の配列を並べる
        console.log('...task =', {...task});
        console.log('completed: !task.completed =', {completed: !task.completed});
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    console.log('updatedTasks =', updatedTasks);
    setTasks(updatedTasks);
  }

  // props.tasks が undefined または null であるかどうかを確認してから、タスク名の新しい配列を作成
  //const taskList = props.tasks?.map((task) => task.name);
  //const taskList = props.tasks?.map((task) => <Todo />);
  // ?.にすることでオプションチェーンでtasksにmap関数がなかった場合（Arrayじゃなかった場合）にエラーにならない
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} // keyはReactで管理されている特別なプロップ 反復処理でレンダリングするものには常に固有なキーが必要
      toggleTaskCompleted={toggleTaskCompleted}
    />
  ));
  console.log(taskList);

  // なぜFormでSubmitするたびに、headingTextが更新されるか
  // tasksのsetTasksが呼ばれると、React は App コンポーネントを再レンダー する。つまり関数Appを最初からもう一度実行する。
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  console.log(headingText);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* わかりやすいようにaddTask=で関数と同じ名前でプロップを設定 */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText}</h2>
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
