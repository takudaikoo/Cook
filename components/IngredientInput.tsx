import React, { useState, KeyboardEvent } from 'react';
import { Plus, X } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ 
  ingredients, 
  setIngredients, 
  onGenerate,
  isLoading
}) => {
  const [inputValue, setInputValue] = useState('');

  const addIngredient = () => {
    if (inputValue.trim()) {
      if (!ingredients.includes(inputValue.trim())) {
        setIngredients([...ingredients, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          冷蔵庫にある食材を入力してください
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="例: トマト、卵、豚肉"
            className="flex-1 appearance-none border border-gray-300 rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            onClick={addIngredient}
            disabled={!inputValue.trim() || isLoading}
            className="bg-orange-100 text-orange-600 hover:bg-orange-200 p-3 rounded-xl transition-colors disabled:opacity-50"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 min-h-[40px]">
        {ingredients.length === 0 && (
          <p className="text-gray-400 text-sm py-2">まだ食材が追加されていません</p>
        )}
        {ingredients.map((ing, index) => (
          <div key={index} className="flex items-center bg-orange-50 text-orange-800 px-3 py-1.5 rounded-full border border-orange-200">
            <span className="mr-2">{ing}</span>
            <button 
              onClick={() => removeIngredient(index)}
              className="text-orange-400 hover:text-orange-600 focus:outline-none"
              disabled={isLoading}
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onGenerate}
        disabled={ingredients.length === 0 || isLoading}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
          ingredients.length === 0 || isLoading
            ? 'bg-gray-300 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500'
        }`}
      >
        {isLoading ? 'レシピを考案中...' : 'レシピを提案する'}
      </button>
    </div>
  );
};