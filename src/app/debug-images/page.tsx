'use client';

import { useEffect, useState } from 'react';

export default function DebugImages() {
  const [data, setData] = useState<any>(null);
  const [imageTests, setImageTests] = useState<any>({});

  useEffect(() => {
    // Get localStorage data
    const stored = localStorage.getItem('portfolio-storage');
    if (stored) {
      setData(JSON.parse(stored));
    }

    // Test image loading
    const testImages = ['act1.png', 'act2.png', 'act3.png', 'act4.png', 'cer1.png', 'cer2.png', 'cer3.png'];
    const results: any = {};

    testImages.forEach(img => {
      const imgElement = new Image();
      imgElement.onload = () => {
        results[img] = { status: 'success', width: imgElement.width, height: imgElement.height };
        setImageTests({...results});
      };
      imgElement.onerror = () => {
        results[img] = { status: 'error', error: 'Failed to load' };
        setImageTests({...results});
      };
      imgElement.src = `/image/${img}`;
    });
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Portfolio Images</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* localStorage Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">localStorage Data</h2>
          {data ? (
            <div>
              <p><strong>Students:</strong> {data.state?.students?.length || 0}</p>
              {data.state?.students?.[0] && (
                <div className="mt-4">
                  <p><strong>Student:</strong> {data.state.students[0].firstName} {data.state.students[0].lastName}</p>
                  <p><strong>Activities:</strong> {data.state.students[0].activities?.length || 0}</p>
                  <p><strong>Certificates:</strong> {data.state.students[0].certificates?.length || 0}</p>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">Activity Images:</h3>
                    {data.state.students[0].activities?.map((act: any, i: number) => (
                      <div key={i} className="ml-4">
                        <p>{act.title}: {JSON.stringify(act.images)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold">Certificate Images:</h3>
                    {data.state.students[0].certificates?.map((cer: any, i: number) => (
                      <div key={i} className="ml-4">
                        <p>{cer.title}: {JSON.stringify(cer.images)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">Raw Data</summary>
                <pre className="text-xs bg-gray-100 p-2 mt-2 overflow-auto max-h-64">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          ) : (
            <p className="text-red-600">No localStorage data found</p>
          )}
        </div>

        {/* Image Loading Tests */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Image Loading Tests</h2>
          <div className="space-y-2">
            {Object.entries(imageTests).map(([img, result]: [string, any]) => (
              <div key={img} className="flex items-center justify-between p-2 border rounded">
                <span>{img}</span>
                <span className={result.status === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {result.status === 'success' ? `✓ ${result.width}x${result.height}` : '✗ Failed'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Visual Test:</h3>
            <div className="grid grid-cols-2 gap-2">
              {['act1.png', 'cer1.png'].map(img => (
                <div key={img} className="border p-2">
                  <p className="text-sm">{img}</p>
                  <img 
                    src={`/image/${img}`}
                    alt={img}
                    className="w-full h-20 object-contain bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.style.background = 'red';
                      e.currentTarget.alt = 'FAILED TO LOAD';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button 
          onClick={() => {
            localStorage.removeItem('portfolio-storage');
            window.location.reload();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Clear localStorage & Reload
        </button>
        
        <button 
          onClick={() => window.location.href = '/init'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4"
        >
          Force Re-initialize
        </button>
      </div>
    </div>
  );
}