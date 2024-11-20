import '../styles/App.css';
import { Navigation } from './Navigation';
import { Content } from './Content';

function App() {
  return (
    <div className='content'>
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
