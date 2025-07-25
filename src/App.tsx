import './App.css'
import ReducerList from './components/dataBindings/ReducerList'
import ReducerObject from './components/dataBindings/ReducerObject'
import ReducerTodoList from './components/Reducer/ReducerTodoList'
import StateTodoList from './components/State/StateTodoList'

function App() {

  return (
    <>
      <StateTodoList />
      <ReducerTodoList />
      <ReducerObject />
      <ReducerList />
    </>
  )
}

export default App
