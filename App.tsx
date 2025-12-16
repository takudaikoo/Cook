import React, { useState, useEffect } from 'react';
import { IngredientInput } from './components/IngredientInput';
import { PantrySettings } from './components/PantrySettings';
import { RecipeCard } from './components/RecipeCard';
import { Settings, UtensilsCrossed, Sparkles } from 'lucide-react';
import { DEFAULT_PANTRY_ITEMS } from './constants';
import { PantryItem, Recipe } from './types';
import { generateRecipes, generateRecipeImage } from './services/geminiService';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(DEFAULT_PANTRY_ITEMS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePantryItem = (id: string) => {
    setPantryItems(items => 
      items.map(item => 
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const selectedPantry = pantryItems
        .filter(item => item.isSelected)
        .map(item => item.name);
      
      const generatedRecipes = await generateRecipes(ingredients, selectedPantry);
      setRecipes(generatedRecipes);

      // Trigger image generation in background for each recipe
      generatedRecipes.forEach(async (recipe) => {
        try {
          const imageUrl = await generateRecipeImage(recipe.visualPrompt);
          if (imageUrl) {
            setRecipes(currentRecipes => 
              currentRecipes.map(r => 
                r.id === recipe.id ? { ...r, imageUrl, isImageLoading: false } : r
              )
            );
          } else {
             setRecipes(currentRecipes => 
              currentRecipes.map(r => 
                r.id === recipe.id ? { ...r, isImageLoading: false } : r
              )
            );
          }
        } catch (e) {
          console.error(`Failed to generate image for ${recipe.name}`, e);
           setRecipes(currentRecipes => 
              currentRecipes.map(r => 
                r.id === recipe.id ? { ...r, isImageLoading: false } : r
              )
            );
        }
      });

    } catch (e) {
      setError("レシピの生成に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-500">
            <UtensilsCrossed size={28} />
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Raku-Recipe AI</h1>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Settings size={18} />
            <span>常備リスト</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Intro / Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            今ある食材で、<br className="md:hidden" />
            <span className="text-orange-500">パパッと</span>美味しいごはん。
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            冷蔵庫の余り物と家の調味料だけで作れる、簡単なレシピをAIが提案します。
          </p>
        </div>

        {/* Input Section */}
        <section className="mb-12">
          <IngredientInput 
            ingredients={ingredients}
            setIngredients={setIngredients}
            onGenerate={handleGenerateRecipes}
            isLoading={isLoading}
          />
        </section>

        {/* Loading State */}
        {isLoading && recipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
            <p className="text-orange-600 font-medium animate-pulse">AIシェフがレシピを考案中...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center p-6 bg-red-50 rounded-2xl mb-8">
            <p className="text-red-600 font-bold">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {recipes.length > 0 && (
          <section className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-yellow-400" />
              <h3 className="text-xl font-bold text-gray-800">おすすめのレシピ</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </main>

      <PantrySettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        items={pantryItems}
        toggleItem={togglePantryItem}
      />
    </div>
  );
};

export default App;