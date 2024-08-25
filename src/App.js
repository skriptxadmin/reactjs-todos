import 'bootstrap/dist/css/bootstrap.min.css'; // 3rd party
import './App.css'; // my styles
import PrimaryNavbar from './components/PrimaryNavbar';
import TodoList from './components/TodoList';

function App() {
  return (
   <div>
     <PrimaryNavbar />
      <TodoList />
   </div>
  
  );
}

export default App;






