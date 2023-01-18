import './styles/global.css';
import { Habits } from './components/Habits';


export function App() {
  return (
    <div>
      <Habits completed={2} />
      <Habits completed={20} />
      <Habits completed={200} />
    </div>
  )
}


