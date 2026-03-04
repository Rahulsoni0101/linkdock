import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureOne from './components/FeatureOne';
import Templates from './components/Templates';

function App() {
  return (
    <div className="font-sans antialiased selection:bg-[#d2e823] selection:text-[#2665d6] bg-[#2665d6] min-h-screen">
      <Navbar />
      <Hero />
      <FeatureOne />
      <Templates />
    </div>
  );
}

export default App;
