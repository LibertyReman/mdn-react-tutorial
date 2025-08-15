function Form(props) {
  // formのAddボタン押下時に呼び出し
  function handleSubmit(event) {
    // デフォルト動作の無効化
    event.preventDefault();
    alert("Hello, world!");
    props.addTask("Say hello!"); // App.jsxのaddTask関数を呼び出し
  }

  return (
    <form onSubmit={handleSubmit}> {/* onSubmitはjsxのキーワード */}
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
