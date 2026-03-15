import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="font-sans antialiased text-white bg-[#030614] min-h-screen overflow-x-hidden selection:bg-[#d2e823] selection:text-[#030614]">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
