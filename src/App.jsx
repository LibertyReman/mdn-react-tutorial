import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {
  // コールバック関数
  function addTask(name) {
    alert(name);
  }

  // main.jsxのDATAが渡ってくる
  console.log(props);
  // props.tasks が undefined または null であるかどうかを確認してから、タスク名の新しい配列を作成
  //const taskList = props.tasks?.map((task) => task.name);
  //const taskList = props.tasks?.map((task) => <Todo />);
  // ?.にすることでオプションチェーンでtasksにmap関数がなかった場合（Arrayじゃなかった場合）にエラーにならない
  const taskList = props.tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} // keyはReactで管理されている特別なプロップ 反復処理でレンダリングするものには常に固有なキーが必要
    />
  ));
  console.log(taskList);
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} /> {/* わかりやすいようにaddTask=で関数と同じ名前でプロップを設定 */}
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
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
