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
import { useDispatch } from 'react-redux';
import { useGetRandomClientQuery } from '../../store/api/clients.api';
import { actions } from '../../store/clientSlice/clientSlice';
import { useEffect } from 'react';

function App() {

  const {data, refetch} = useGetRandomClientQuery();
  const dispatch = useDispatch();

  dispatch(actions.createClient(data));

  // useEffect(() => {
  //   refetch();
  //   console.log(data);
    
  // }, [])
  

  return (
    <div>
      <Navigation />
      <Content />
    </div>
  );
}

export default App;
