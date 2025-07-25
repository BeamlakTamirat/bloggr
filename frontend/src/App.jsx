import {Outlet} from 'react-router-dom';
import Header from './components/Header.jsx';

const App = ()=>{
  return (
    <>
      <Header />
      <main style={{padding:'1rem'}}>
        <Outlet />
      </main>
    </>
  );
};

export default App;