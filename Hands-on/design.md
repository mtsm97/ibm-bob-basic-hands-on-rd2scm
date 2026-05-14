# FAQ サイト 設計書

## 技術スタック

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: スタイリング（Flexbox / Grid レイアウト）
- **Vanilla JavaScript (ES6+)**: インタラクティブ機能

### 制約
- フレームワーク・ライブラリ不使用
- バックエンド不要
- 外部依存なし

## アーキテクチャ概要

```
┌─────────────────────────────────────┐
│         index.html                  │
│  (構造・レイアウト・DOM)              │
└──────────┬──────────────────────────┘
           │
           ├──────────────────────────┐
           │                          │
┌──────────▼──────────┐    ┌─────────▼──────────┐
│     style.css       │    │    script.js        │
│  (スタイル・デザイン)  │    │  (インタラクション)  │
└─────────────────────┘    └─────────┬──────────┘
                                     │
                          ┌──────────▼──────────┐
                          │      data.js        │
                          │   (FAQ データ)       │
                          └─────────────────────┘
```

## ファイル構成

```
faq-site/
├── index.html      # メインHTML（構造）
├── style.css       # スタイルシート（デザイン）
├── script.js       # JavaScript（機能）
└── data.js         # FAQ データ（日本語コンテンツ）
```

### ファイル役割

| ファイル | 役割 | 想定行数 |
|---------|------|---------|
| index.html | ページ構造、SEO、メタ情報 | 50-70行 |
| style.css | レイアウト、デザイン、レスポンシブ | 150-200行 |
| script.js | DOM操作、イベント処理、検索ロジック | 80-100行 |
| data.js | FAQ データ定義 | 100-150行 |

## データ構造

### FAQ データ形式（data.js）

```javascript
const faqData = [
  {
    category: "一般",
    categoryId: "general",
    questions: [
      {
        id: "q1",
        question: "Bob とは何ですか？",
        answer: "Bob は AI を活用したコーディング支援ツールで..."
      },
      {
        id: "q2",
        question: "Bob はどのように動作しますか？",
        answer: "Bob は大規模言語モデル（LLM）を使用して..."
      }
      // ... 他の質問
    ]
  },
  {
    category: "使い方",
    categoryId: "usage",
    questions: [
      // ...
    ]
  },
  {
    category: "高度な機能",
    categoryId: "advanced",
    questions: [
      // ...
    ]
  },
  {
    category: "トラブルシューティング",
    categoryId: "troubleshooting",
    questions: [
      // ...
    ]
  }
];
```

### データ構造の設計理由

1. **カテゴリー単位の配列**: カテゴリーごとにグループ化し、表示順序を制御
2. **ID の付与**: DOM 要素との紐付けを容易にする
3. **フラットな構造**: ネストを最小限にし、検索処理を簡素化

## HTML 構造設計

### 全体構造

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <!-- メタ情報、CSS読み込み -->
</head>
<body>
  <header>
    <!-- タイトル、検索バー -->
  </header>
  
  <main>
    <!-- FAQ コンテンツ -->
  </main>
  
  <footer>
    <!-- フッター情報 -->
  </footer>
  
  <!-- JavaScript 読み込み -->
</body>
</html>
```

### 詳細構造

```html
<body>
  <!-- ヘッダー -->
  <header class="header">
    <div class="container">
      <h1 class="header__title">Bob FAQ</h1>
      <div class="search-box">
        <input 
          type="text" 
          id="searchInput" 
          class="search-box__input"
          placeholder="FAQ を検索..."
          aria-label="FAQ を検索"
        >
      </div>
    </div>
  </header>

  <!-- メインコンテンツ -->
  <main class="main">
    <div class="container">
      <div id="faqContainer" class="faq-container">
        <!-- JavaScript で動的生成 -->
      </div>
      <div id="noResults" class="no-results" style="display: none;">
        該当する FAQ が見つかりませんでした
      </div>
    </div>
  </main>

  <!-- フッター -->
  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 Bob FAQ</p>
    </div>
  </footer>
</body>
```

### FAQ アイテムの構造（JavaScript で生成）

```html
<div class="faq-category">
  <h2 class="faq-category__title">カテゴリー名</h2>
  <div class="faq-list">
    <div class="faq-item" data-id="q1">
      <button class="faq-item__question" aria-expanded="false">
        質問テキスト
        <span class="faq-item__icon">▼</span>
      </button>
      <div class="faq-item__answer">
        <p>回答テキスト</p>
      </div>
    </div>
    <!-- 他の質問 -->
  </div>
</div>
```

## CSS 設計

### 設計方針

1. **BEM 命名規則**: Block__Element--Modifier
2. **モバイルファースト**: 小さい画面から設計
3. **CSS カスタムプロパティ**: 色やサイズを変数化
4. **Flexbox / Grid**: モダンなレイアウト手法

### カラースキーム

```css
:root {
  /* プライマリカラー（IBM ブルー系） */
  --color-primary: #0f62fe;
  --color-primary-dark: #0043ce;
  --color-primary-light: #4589ff;
  
  /* グレースケール */
  --color-text: #161616;
  --color-text-secondary: #525252;
  --color-background: #ffffff;
  --color-background-alt: #f4f4f4;
  --color-border: #e0e0e0;
  
  /* ステータスカラー */
  --color-hover: #e8f4ff;
  --color-active: #d0e2ff;
  
  /* シャドウ */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  /* スペーシング */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* タイポグラフィ */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                 'Helvetica Neue', Arial, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;
  
  /* トランジション */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}
```

### レスポンシブブレークポイント

```css
/* スマートフォン: デフォルト（〜767px） */

/* タブレット */
@media (min-width: 768px) {
  /* タブレット用スタイル */
}

/* デスクトップ */
@media (min-width: 1024px) {
  /* デスクトップ用スタイル */
}

/* 大画面 */
@media (min-width: 1440px) {
  /* 大画面用スタイル */
}
```

### 主要コンポーネントのスタイル

#### ヘッダー
```css
.header {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-md) 0;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

#### 検索ボックス
```css
.search-box__input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 2px solid var(--color-border);
  border-radius: 4px;
  font-size: var(--font-size-base);
  transition: border-color var(--transition-fast);
}

.search-box__input:focus {
  outline: none;
  border-color: var(--color-primary);
}
```

#### FAQ アイテム
```css
.faq-item {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: var(--spacing-sm);
  overflow: hidden;
  transition: box-shadow var(--transition-fast);
}

.faq-item:hover {
  box-shadow: var(--shadow-sm);
}

.faq-item__question {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-background);
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-base);
  font-weight: 600;
  transition: background-color var(--transition-fast);
}

.faq-item__question:hover {
  background: var(--color-hover);
}

.faq-item__answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-base);
  background: var(--color-background-alt);
}

.faq-item__answer.active {
  max-height: 1000px;
  padding: var(--spacing-md);
}
```

## JavaScript 設計

### モジュール構成

```javascript
// data.js - データ定義
const faqData = [ /* ... */ ];

// script.js - メインロジック
(function() {
  'use strict';
  
  // 状態管理
  let currentFilter = '';
  
  // 初期化
  function init() {
    renderFAQ(faqData);
    setupEventListeners();
  }
  
  // FAQ レンダリング
  function renderFAQ(data) { /* ... */ }
  
  // イベントリスナー設定
  function setupEventListeners() { /* ... */ }
  
  // アコーディオン制御
  function toggleAccordion(element) { /* ... */ }
  
  // 検索機能
  function handleSearch(query) { /* ... */ }
  function filterFAQ(data, query) { /* ... */ }
  
  // ユーティリティ
  function escapeHtml(text) { /* ... */ }
  
  // DOM 読み込み完了後に初期化
  document.addEventListener('DOMContentLoaded', init);
})();
```

### 主要機能の実装方針

#### 1. FAQ レンダリング

```javascript
function renderFAQ(data) {
  const container = document.getElementById('faqContainer');
  container.innerHTML = '';
  
  let hasResults = false;
  
  data.forEach(category => {
    const visibleQuestions = category.questions.filter(q => 
      !currentFilter || matchesFilter(q, currentFilter)
    );
    
    if (visibleQuestions.length === 0) return;
    
    hasResults = true;
    
    const categoryDiv = createCategoryElement(category, visibleQuestions);
    container.appendChild(categoryDiv);
  });
  
  document.getElementById('noResults').style.display = 
    hasResults ? 'none' : 'block';
}
```

#### 2. アコーディオン制御

```javascript
function toggleAccordion(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector('.faq-item__icon');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // 状態を切り替え
  button.setAttribute('aria-expanded', !isExpanded);
  answer.classList.toggle('active');
  icon.textContent = isExpanded ? '▼' : '▲';
}
```

#### 3. 検索機能

```javascript
function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  currentFilter = query;
  
  const filteredData = filterFAQ(faqData, query);
  renderFAQ(filteredData);
}

function filterFAQ(data, query) {
  if (!query) return data;
  
  return data.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(query) ||
      q.answer.toLowerCase().includes(query)
    )
  })).filter(category => category.questions.length > 0);
}
```

#### 4. イベントリスナー設定

```javascript
function setupEventListeners() {
  // 検索入力
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  
  // アコーディオンクリック（イベント委譲）
  const container = document.getElementById('faqContainer');
  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('faq-item__question')) {
      toggleAccordion(event.target);
    }
  });
}
```

### パフォーマンス最適化

1. **イベント委譲**: 個別の FAQ アイテムではなく、コンテナにイベントリスナーを設定
2. **デバウンス**: 検索入力に対してデバウンス処理（オプション）
3. **最小限の DOM 操作**: innerHTML を使った一括更新
4. **CSS トランジション**: JavaScript ではなく CSS でアニメーション

## UI/UX デザイン

### レイアウト構成

```
┌─────────────────────────────────────┐
│  Header (固定)                       │
│  ┌─────────────────────────────┐   │
│  │ Bob FAQ                      │   │
│  │ [検索ボックス]                │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Main Content                       │
│  ┌─────────────────────────────┐   │
│  │ カテゴリー1                   │   │
│  │  ▼ 質問1                     │   │
│  │  ▼ 質問2                     │   │
│  ├─────────────────────────────┤   │
│  │ カテゴリー2                   │   │
│  │  ▼ 質問1                     │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Footer                             │
│  © 2026 Bob FAQ                     │
└─────────────────────────────────────┘
```

### インタラクション設計

#### アコーディオン動作
1. **初期状態**: すべての回答が折りたたまれている
2. **クリック時**: 
   - 回答エリアがスムーズに展開（300ms）
   - アイコンが ▼ から ▲ に変化
   - 背景色が微妙に変化
3. **再クリック時**: 回答が折りたたまれる

#### 検索動作
1. **入力中**: リアルタイムでフィルタリング
2. **一致なし**: 「該当する FAQ が見つかりませんでした」を表示
3. **クリア時**: 全 FAQ を再表示

### アクセシビリティ対応

1. **セマンティック HTML**: 
   - `<header>`, `<main>`, `<footer>` の使用
   - 適切な見出しレベル（h1, h2）

2. **ARIA 属性**:
   - `aria-expanded`: アコーディオンの状態
   - `aria-label`: 検索ボックスのラベル

3. **キーボード操作**:
   - Tab キーでフォーカス移動
   - Enter/Space でアコーディオン開閉

4. **コントラスト比**: WCAG AA 基準を満たす色の組み合わせ

## 実装手順

### フェーズ1: 基本構造（1分）
1. index.html の作成
2. 基本的な HTML 構造の実装
3. data.js の作成とデータ定義

### フェーズ2: スタイリング（2分）
1. style.css の作成
2. レイアウトとデザインの実装
3. レスポンシブ対応

### フェーズ3: 機能実装（2分）
1. script.js の作成
2. FAQ レンダリング機能
3. アコーディオン機能
4. 検索機能

### フェーズ4: 調整とテスト（30秒）
1. 動作確認
2. スタイル微調整
3. ブラウザ互換性確認

## テスト計画

### 機能テスト

| テスト項目 | 確認内容 | 期待結果 |
|-----------|---------|---------|
| FAQ 表示 | ページ読み込み | 全カテゴリーと質問が表示される |
| アコーディオン | 質問クリック | 回答が展開/折りたたみされる |
| 検索（一致） | 「Bob」と入力 | 関連 FAQ のみ表示 |
| 検索（不一致） | 「xyz」と入力 | 「該当なし」メッセージ表示 |
| 検索クリア | 検索語削除 | 全 FAQ が再表示 |

### レスポンシブテスト

| デバイス | 画面幅 | 確認内容 |
|---------|-------|---------|
| iPhone SE | 375px | 1カラム、読みやすいフォント |
| iPad | 768px | 1カラム、適切な余白 |
| Desktop | 1920px | 最大幅制限、見やすいレイアウト |

### ブラウザテスト

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## セキュリティ考慮事項

### XSS 対策
- ユーザー入力（検索語）を直接 HTML に挿入しない
- `textContent` を使用（`innerHTML` は避ける）
- 必要に応じて HTML エスケープ関数を使用

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### その他
- 外部リソースの読み込みなし（CDN 不使用）
- インラインスクリプトの最小化
- Content Security Policy の考慮（将来的に）

## 保守性とスケーラビリティ

### コードの保守性
1. **明確な命名**: 変数・関数名は目的を明示
2. **コメント**: 複雑なロジックには説明を追加
3. **モジュール化**: 機能ごとに関数を分離
4. **定数の集約**: カラーやサイズは CSS 変数で管理

### データの更新方法
1. data.js を編集
2. 新しい質問を追加する場合:
   ```javascript
   {
     id: "q17",
     question: "新しい質問",
     answer: "新しい回答"
   }
   ```
3. ブラウザをリロード

### 将来の拡張性
- **多言語対応**: data.js を言語別に分離
- **カテゴリー追加**: faqData 配列に新しいカテゴリーを追加
- **テーマ切替**: CSS 変数を動的に変更
- **バックエンド連携**: fetch API でデータ取得に変更可能

## 成果物チェックリスト

### ファイル
- [ ] index.html
- [ ] style.css
- [ ] script.js
- [ ] data.js

### 機能
- [ ] FAQ 表示
- [ ] カテゴリー分類
- [ ] アコーディオン
- [ ] 検索機能
- [ ] レスポンシブデザイン

### 品質
- [ ] コメント記載
- [ ] コードフォーマット
- [ ] ブラウザ互換性
- [ ] パフォーマンス

### ドキュメント
- [ ] README.md（オプション）
- [ ] コード内コメント

## 参考資料

### 技術仕様
- HTML5: https://html.spec.whatwg.org/
- CSS3: https://www.w3.org/Style/CSS/
- JavaScript ES6+: https://tc39.es/ecma262/

### デザインガイドライン
- IBM Design Language: https://www.ibm.com/design/language/
- Material Design: https://material.io/design

### アクセシビリティ
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- ARIA: https://www.w3.org/WAI/ARIA/apg/