// FAQ サイト - メインスクリプト
(function() {
  'use strict';
  
  // 状態管理
  let currentFilter = '';
  let currentTheme = 'light';
  
  /**
   * 初期化関数
   */
  function init() {
    initTheme();
    renderFAQ(faqData);
    setupEventListeners();
  }
  
  /**
   * テーマを初期化
   */
  function initTheme() {
    // localStorage からテーマを取得
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      currentTheme = savedTheme;
    } else {
      // システムのダークモード設定を確認
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    applyTheme(currentTheme);
  }
  
  /**
   * テーマを適用
   * @param {string} theme - 'light' または 'dark'
   */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    // トグルボタンのアイコンを更新
    const toggleButton = document.getElementById('themeToggle');
    const icon = toggleButton.querySelector('.theme-toggle__icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    // localStorage に保存
    localStorage.setItem('theme', theme);
  }
  
  /**
   * テーマを切り替え
   */
  function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }
  
  /**
   * FAQ をレンダリング
   * @param {Array} data - FAQ データ
   */
  function renderFAQ(data) {
    const container = document.getElementById('faqContainer');
    const noResults = document.getElementById('noResults');
    container.innerHTML = '';
    
    let hasResults = false;
    
    // 各カテゴリーをレンダリング
    data.forEach(category => {
      // フィルタリングされた質問を取得
      const visibleQuestions = category.questions.filter(q => 
        matchesFilter(q, currentFilter)
      );
      
      // 表示する質問がない場合はスキップ
      if (visibleQuestions.length === 0) return;
      
      hasResults = true;
      
      // カテゴリー要素を作成
      const categoryDiv = createCategoryElement(category, visibleQuestions);
      container.appendChild(categoryDiv);
    });
    
    // 検索結果なしメッセージの表示/非表示
    noResults.style.display = hasResults ? 'none' : 'block';
  }
  
  /**
   * カテゴリー要素を作成
   * @param {Object} category - カテゴリーデータ
   * @param {Array} questions - 質問の配列
   * @returns {HTMLElement} カテゴリー要素
   */
  function createCategoryElement(category, questions) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'faq-category';
    
    // カテゴリータイトル
    const title = document.createElement('h2');
    title.className = 'faq-category__title';
    title.textContent = category.category;
    categoryDiv.appendChild(title);
    
    // FAQ リスト
    const listDiv = document.createElement('div');
    listDiv.className = 'faq-list';
    
    // 各質問を追加
    questions.forEach(q => {
      const itemDiv = createFAQItem(q);
      listDiv.appendChild(itemDiv);
    });
    
    categoryDiv.appendChild(listDiv);
    return categoryDiv;
  }
  
  /**
   * FAQ アイテム要素を作成
   * @param {Object} question - 質問データ
   * @returns {HTMLElement} FAQ アイテム要素
   */
  function createFAQItem(question) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'faq-item';
    itemDiv.setAttribute('data-id', question.id);
    
    // 質問ボタン
    const questionButton = document.createElement('button');
    questionButton.className = 'faq-item__question';
    questionButton.setAttribute('aria-expanded', 'false');
    questionButton.innerHTML = `
      ${escapeHtml(question.question)}
      <span class="faq-item__icon">▼</span>
    `;
    
    // 回答エリア
    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-item__answer';
    
    const answerP = document.createElement('p');
    answerP.textContent = question.answer;
    answerDiv.appendChild(answerP);
    
    itemDiv.appendChild(questionButton);
    itemDiv.appendChild(answerDiv);
    
    return itemDiv;
  }
  
  /**
   * イベントリスナーを設定
   */
  function setupEventListeners() {
    // 検索入力
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // テーマ切り替えボタン
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // アコーディオンクリック（イベント委譲）
    const container = document.getElementById('faqContainer');
    container.addEventListener('click', (event) => {
      const button = event.target.closest('.faq-item__question');
      if (button) {
        toggleAccordion(button);
      }
    });
    
    // キーボード操作（Enter/Space でアコーディオン開閉）
    container.addEventListener('keydown', (event) => {
      const button = event.target.closest('.faq-item__question');
      if (button && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        toggleAccordion(button);
      }
    });
  }
  
  /**
   * アコーディオンの開閉を切り替え
   * @param {HTMLElement} button - 質問ボタン要素
   */
  function toggleAccordion(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-item__icon');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // 状態を切り替え
    button.setAttribute('aria-expanded', !isExpanded);
    answer.classList.toggle('active');
    icon.textContent = isExpanded ? '▼' : '▲';
  }
  
  /**
   * 検索処理
   * @param {Event} event - 入力イベント
   */
  function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    currentFilter = query;
    
    // 全データを再レンダリング（renderFAQ内でフィルタリング）
    renderFAQ(faqData);
  }
  
  /**
   * 質問がフィルタに一致するかチェック
   * @param {Object} question - 質問データ
   * @param {string} filter - フィルタ文字列
   * @returns {boolean} 一致する場合 true
   */
  function matchesFilter(question, filter) {
    if (!filter) return true;
    
    const lowerFilter = filter.toLowerCase();
    return question.question.toLowerCase().includes(lowerFilter) ||
           question.answer.toLowerCase().includes(lowerFilter);
  }
  
  /**
   * HTML エスケープ
   * @param {string} text - エスケープするテキスト
   * @returns {string} エスケープされたテキスト
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // DOM 読み込み完了後に初期化
  document.addEventListener('DOMContentLoaded', init);
})();

// Made with Bob
