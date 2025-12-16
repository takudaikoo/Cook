import React from 'react';
import { Recipe } from '../types';
import { Clock, ChefHat } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full transform transition-all hover:shadow-xl hover:-translate-y-1 duration-300">
      <div className="relative h-56 bg-gray-200 overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.name} 
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
            {recipe.isImageLoading ? (
              <div className="flex flex-col items-center animate-pulse">
                <ChefHat className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-xs font-medium">料理写真を生成中...</span>
              </div>
            ) : (
               <div className="flex flex-col items-center">
                 <ChefHat className="w-12 h-12 mb-2 opacity-30" />
                 <span className="text-xs">No Image</span>
               </div>
            )}
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-800 px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-sm">
          <Clock size={14} className="mr-1.5 text-orange-500" />
          {recipe.timeInMinutes}分
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{recipe.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{recipe.description}</p>

        <div className="mb-4">
          <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">材料</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {recipe.ingredients.slice(0, 5).map((ing, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-orange-300">•</span>
                {ing}
              </li>
            ))}
            {recipe.ingredients.length > 5 && (
              <li className="text-xs text-gray-400 italic pl-3">他 {recipe.ingredients.length - 5} 品...</li>
            )}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <h4 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2">手順</h4>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
             {recipe.steps.slice(0, 3).map((step, i) => (
               <li key={i} className="line-clamp-2">{step}</li>
             ))}
          </ol>
        </div>
      </div>
    </div>
  );
};