'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const tabs = [
  { label: 'New', name: 'new' },
  { label: 'Ukraine', name: 'ukraine' },
  { label: 'Oscars', name: 'oscars' },
  { label: 'Trump Presidency', name: 'trump' },
];

const predictions = [
  {
    id: '1',
    title: 'Trump ends Ukraine war in first 90 days?',
    image: '/path/to/image.jpg',
    probability: 18,
    volume: '22m',
    options: [
      { id: 1, text: 'Yes' },
      { id: 2, text: 'No' },
    ],
  },
  // ... other predictions (same structure as original)
];

function PredictionTabs() {
  const [activeTab, setActiveTab] = useState('new');
  const router = useRouter();

  const filteredPredictions = predictions.filter((prediction) => {
    if (activeTab === 'ukraine') return prediction.title.toLowerCase().includes('ukraine');
    if (activeTab === 'oscars') return prediction.title.toLowerCase().includes('oscars');
    if (activeTab === 'trump') return prediction.title.toLowerCase().includes('trump');
    return true;
  });

  const getPredictionsForRow = (row: number) => {
    const startIndex = (row - 1) * 4;
    return filteredPredictions.slice(startIndex, startIndex + 4);
  };

  const navigateToEvent = (id: string) => {
    router.push(`/event/${id}`);
  };

  const rows = Array.from({ length: Math.ceil(filteredPredictions.length / 4) }, (_, i) => i + 1);

  return (
    <div className="w-full px-8 py-4">
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={classNames(
              'px-4 py-2 rounded-md border text-sm font-medium',
              activeTab === tab.name ? 'bg-blue-500 text-white' : 'bg-white border-gray-300 text-gray-700'
            )}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {rows.map((row) => (
        <div className="flex gap-5 mb-5" key={row}>
          {getPredictionsForRow(row).map((prediction, index) => (
            <div key={prediction.id} className="flex flex-col w-1/4 h-[300px] rounded-xl shadow bg-white overflow-hidden">
              <div className="p-3 border-b">
                <a href={`/event/${prediction.id}`} className="flex items-center gap-3">
                  <img src={prediction.image} className="w-10 h-10 rounded-full" alt="Prediction" />
                  <div className="text-sm font-semibold flex-1">{prediction.title}</div>
                  {prediction.options.length <= 2 && (
                    <div className="w-20 text-xs text-center text-gray-500">{prediction.probability}%</div>
                  )}
                </a>
              </div>
              <div className="flex-1 p-3 overflow-hidden hover:overflow-y-auto">
                {prediction.options.length <= 2 ? (
                  <div className="flex gap-2 mb-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => navigateToEvent(prediction.id)}>
                      Buy Yes
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => navigateToEvent(prediction.id)}>
                      Buy No
                    </button>
                  </div>
                ) : null}
                <ul className={classNames('list-none p-0 m-0 space-y-1', { 'overflow-y-auto': prediction.options.length > 2 })}>
                  {prediction.options.map((option) => (
                    <li key={option.id} className="border-b py-1 text-sm text-gray-700">
                      {option.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
                <span className="text-sm text-gray-500">Vol. ${prediction.volume}</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                    <i className="el-icon-star" />
                  </button>
                  <button className="w-8 h-8 rounded-full border flex items-center justify-center">
                    <i className="el-icon-share" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PredictionTabs;
