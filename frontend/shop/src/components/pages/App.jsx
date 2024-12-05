import '../../styles/App.css';
import '../../styles/ActionBar.css';
import '../../styles/Content.css';
import '../../styles/index.css';
import '../../styles/Item.css';
import '../../styles/Product.css';
import '../../styles/components/Button.css';
import '../../styles/components/Input.css';
import '../../styles/components/InputNumber.css';
import '../../styles/components/Modal.css';
import '../../styles/components/Table.css';
import '../../styles/components/Select.css';
import { Navigation } from './Navigation';
import { Content } from './Content';

function App() {
  return (
    <div>
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
