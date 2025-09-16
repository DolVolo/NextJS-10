// Example of how to integrate real image uploads
// This would replace the static image references

import { useState } from 'react';
// import ImageUpload from '@/components/ImageUpload'; // Uncomment when ImageUpload is available

// Modified Student interface
export interface Activity {
  id: string;
  title: string;
  description: string;
  year: string;
  level: 'school' | 'district' | 'province' | 'national' | 'international';
  rank?: string;
  images: string[]; // Now can contain either:
                   // - Static paths: "image/act1.svg"
                   // - Base64 data: "data:image/jpeg;base64,/9j/4AAQ..."
}

// Usage in form component
export function ActivityForm() {
  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    description: '',
    year: '',
    level: 'school',
    images: []
  });

  const handleImageUpload = (base64Image: string) => {
    setActivity(prev => ({
      ...prev,
      images: [...prev.images, base64Image]
    }));
  };

  return (
    <div>
      {/* Other form fields */}
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          รูปภาพกิจกรรม
        </label>
        
        {/* Display current images */}
        <div className="grid grid-cols-3 gap-3">
          {activity.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image} // Works for both static paths and base64
                alt={`Activity ${index + 1}`}
                className="w-full h-24 object-cover rounded border"
              />
              <button
                onClick={() => {
                  setActivity(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== index)
                  }));
                }}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {/* Upload new image */}
        {/* Uncomment when ImageUpload component is available
        <ImageUpload
          onImageSelect={handleImageUpload}
          placeholder="เพิ่มรูปภาพกิจกรรม"
        />
        */}
      </div>
    </div>
  );
}