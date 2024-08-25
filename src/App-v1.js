import 'bootstrap/dist/css/bootstrap.min.css'; // 3rd party
import './App.css'; // my styles

import Button from 'react-bootstrap/Button';

function App() {
  return (
   <div>
     <p>hello skriptx</p>
     <button className='clickMeButton'>Vanilla Button</button>
     <Button variant='danger'>React BS button</Button>
     <button className="btn btn-danger">BS Button</button>
   </div>
  
  );
}

export default App;
