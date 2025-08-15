import { useState } from "react";

function Form(props) {
  // useState() は、 2 つのアイテムを含む配列を返します。
  // 最初のアイテムは現在の状態の値であり、 2 番目のアイテムは状態を更新するために使用できる関数です。
  const [name, setName] = useState("");

  // 入力時に呼ばれる
  function handleChange(event) {
    console.log(event.target.value);
    // 状態の更新
    setName(event.target.value);
  }

  // formのAddボタン押下時に呼び出し
  function handleSubmit(event) {
    // デフォルト動作の無効化
    event.preventDefault();
    if (!name) return;

    //alert("Hello, world!");
    props.addTask(name); // App.jsxのaddTask関数を呼び出し
    setName(""); // nameの初期化
  }

  return (
    <form onSubmit={handleSubmit}> {/* onSubmitはjsxのキーワード */}
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      {/* nameにはsetNameで更新された値が入る */}
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
