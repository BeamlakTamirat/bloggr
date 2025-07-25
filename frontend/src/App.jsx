import {Outlet} from 'react-router-dom';
import Header from './components/Header.jsx';

const App = ()=>{
  return (
    <div className='bg-[#121212] text-white min-h-screen'>
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default App;