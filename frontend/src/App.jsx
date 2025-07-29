import { Outlet } from 'react-router-dom';
import Header from './components/Header'; 

export default function App() {
  return (
    <div className="bg-[#121212] text-white min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet /> 
      </main>
    </div>
  );
}