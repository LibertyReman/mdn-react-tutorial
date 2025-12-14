import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 定数なので大文字
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false },
];

createRoot(document.getElementById('root')).render(
  // StrictModeで2回実行して壊れないかチェックするため、console.logが2回表示される
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
