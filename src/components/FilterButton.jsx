function FilterButton(props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      // スクリーンリーダーに「このボタンは選択中」と伝える
      // クリックされた要素に枠線がつく
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}

export default FilterButton;
