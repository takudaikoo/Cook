export interface Ingredient {
  id: string;
  name: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  timeInMinutes: number;
  ingredients: string[];
  steps: string[];
  visualPrompt: string; // Used to generate the image
  imageUrl?: string; // Populated after image generation
  isImageLoading?: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'seasoning' | 'grain' | 'oil' | 'other';
  isSelected: boolean;
}
