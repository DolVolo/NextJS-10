'use client';

import { useEffect } from 'react';
import { usePortfolioData, usePortfolioActions } from '../store/portfolio';

export default function DebugPage() {
  const { students } = usePortfolioData();
  const { initializeData } = usePortfolioActions();

  useEffect(() => {
    console.log('Debug: Current students count:', students.length);
    console.log('Debug: Students data:', students);
    
    // Force initialization
    initializeData();
    
    // Check localStorage
    const stored = localStorage.getItem('portfolio-storage');
    console.log('Debug: localStorage data:', stored);
  }, [students, initializeData]);

  const handleClearStorage = () => {
    localStorage.removeItem('portfolio-storage');
    window.location.reload();
  };

  const handleForceInit = () => {
    initializeData();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Portfolio Data</h1>
      
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold">Current State:</h2>
        <p>Students Count: {students.length}</p>
        <p>First Student: {students[0]?.firstName || 'None'}</p>
      </div>
      
      <div className="space-x-4">
        <button 
          onClick={handleClearStorage}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Storage & Reload
        </button>
        
        <button 
          onClick={handleForceInit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Force Initialize
        </button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold">Students List:</h3>
        <pre className="bg-gray-100 p-2 text-xs overflow-auto">
          {JSON.stringify(students, null, 2)}
        </pre>
      </div>
    </div>
  );
}