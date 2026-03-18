import React from 'react';

export default function ProfileCard({ data }) {
  // Simulating a crash if 'data' or 'data.metrics' is null/undefined
  // In a real scenario, you'd want optional chaining (data?.metrics?.followers)
  const followers = data && data.metrics ? data.metrics.followers : 'N/A';
  const views = data && data.metrics ? data.metrics.views : 'N/A';

  return (
    <div className="w-80 border rounded-xl shadow-lg p-6 bg-white flex flex-col items-center text-center">
      <img 
        src={data?.avatar} 
        alt="User Avatar" 
        className="w-24 h-24 rounded-full mb-4 bg-gray-200"
      />
      <h2 className="text-xl font-bold text-gray-800">{data?.name}</h2>
      <p className="text-sm font-semibold text-blue-600 mb-2">{data?.role}</p>
      <p className="text-gray-600 text-sm mb-4">{data?.bio}</p>
      
      <div className="flex w-full justify-between border-t pt-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Followers</span>
          <span className="font-bold text-gray-800">{followers}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">Views</span>
          <span className="font-bold text-gray-800">{views}</span>
        </div>
      </div>
    </div>
  );
}
