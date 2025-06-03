import { useState } from 'react' // reactライブラリからuseSateフックをインポート フック：Reactの機能を部品内で使用する方法
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' // fromがない=副作用インポート ブラウザに描画時に必要と明示的に指定


// 大文字で開始
// jsxを返す
// classNameでCSSのクラスを指定
function App() { // 大文字スタートで小文字のパスカルケースで命名すること
  const [count, setCount] = useState(0)

  return (
    <> {/* フラグメント：グループ化 */}
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

// App関数を他からも利用できるようにする
export default App
