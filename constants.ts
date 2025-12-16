import { PantryItem } from './types';

export const DEFAULT_PANTRY_ITEMS: PantryItem[] = [
  // Seasonings
  { id: 'p1', name: '醤油', category: 'seasoning', isSelected: true },
  { id: 'p2', name: '塩', category: 'seasoning', isSelected: true },
  { id: 'p3', name: 'こしょう', category: 'seasoning', isSelected: true },
  { id: 'p4', name: '砂糖', category: 'seasoning', isSelected: true },
  { id: 'p5', name: 'みりん', category: 'seasoning', isSelected: true },
  { id: 'p6', name: '酒（料理酒）', category: 'seasoning', isSelected: true },
  { id: 'p7', name: '味噌', category: 'seasoning', isSelected: true },
  { id: 'p8', name: '酢', category: 'seasoning', isSelected: true },
  { id: 'p9', name: 'マヨネーズ', category: 'seasoning', isSelected: true },
  { id: 'p10', name: 'ケチャップ', category: 'seasoning', isSelected: true },
  { id: 'p11', name: 'コンソメ', category: 'seasoning', isSelected: false },
  { id: 'p12', name: '鶏ガラスープの素', category: 'seasoning', isSelected: false },
  { id: 'p13', name: 'ポン酢', category: 'seasoning', isSelected: false },
  { id: 'p14', name: 'めんつゆ', category: 'seasoning', isSelected: false },

  // Oils
  { id: 'o1', name: 'サラダ油', category: 'oil', isSelected: true },
  { id: 'o2', name: 'オリーブオイル', category: 'oil', isSelected: false },
  { id: 'o3', name: 'ごま油', category: 'oil', isSelected: false },
  { id: 'o4', name: 'バター', category: 'oil', isSelected: false },

  // Grains/Carbs
  { id: 'g1', name: '白米', category: 'grain', isSelected: true },
  { id: 'g2', name: 'パスタ', category: 'grain', isSelected: false },
  { id: 'g3', name: '食パン', category: 'grain', isSelected: false },
  { id: 'g4', name: 'うどん', category: 'grain', isSelected: false },

  // Others
  { id: 'x1', name: 'にんにく（チューブ含む）', category: 'other', isSelected: false },
  { id: 'x2', name: 'しょうが（チューブ含む）', category: 'other', isSelected: false },
  { id: 'x3', name: '片栗粉', category: 'other', isSelected: false },
  { id: 'x4', name: '小麦粉', category: 'other', isSelected: false },
];