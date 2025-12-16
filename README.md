<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Raku-Recipe AI

冷蔵庫にある食材からレシピを提案してくれるAIアプリケーションです。

## セットアップ

1. リポジリをクローン
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. `.env.local` ファイルを作成し、Gemini APIキーを設定
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. 開発サーバーを起動
   ```bash
   npm run dev
   ```

## デプロイ

GitHubへのプッシュでデプロイされます。
