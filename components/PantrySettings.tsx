import React from 'react';
import { X, Check } from 'lucide-react';
import { PantryItem } from '../types';

interface PantrySettingsProps {
  isOpen: boolean;
  onClose: () => void;
  items: PantryItem[];
  toggleItem: (id: string) => void;
}

export const PantrySettings: React.FC<PantrySettingsProps> = ({ isOpen, onClose, items, toggleItem }) => {
  if (!isOpen) return null;

  const categories = {
    seasoning: '調味料',
    oil: '油・バター',
    grain: '米・麺・パン',
    other: 'その他'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden zoom-in">

        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">家に常備しているもの</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <p className="text-sm text-gray-500 mb-6">
            チェックを入れた食材は、常備されているものとしてレシピ提案時に使用されます。
          </p>

          {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => (
            <div key={catKey} className="mb-8 last:mb-0">
              <h3 className="text-sm font-bold text-orange-500 mb-3 px-1">{categories[catKey]}</h3>
              <div className="grid grid-cols-2 gap-3">
                {items
                  .filter(item => item.category === catKey)
                  .map(item => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${item.isSelected
                          ? 'bg-orange-50 border-orange-200 text-orange-900 shadow-sm'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.isSelected ? 'bg-orange-400 border-orange-400 text-white' : 'border-gray-300 bg-white'
                        }`}>
                        {item.isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
};