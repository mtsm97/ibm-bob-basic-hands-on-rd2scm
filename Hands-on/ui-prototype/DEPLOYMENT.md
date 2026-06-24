# MaterialDX UIプロトタイプ - デプロイメントガイド

このドキュメントでは、MaterialDX UIプロトタイプを他の人と共有する方法を説明します。

## 方法1: GitHub Pagesを使用（推奨）

最も簡単で無料の方法です。

### 手順

1. **GitHubリポジトリを作成**
   ```bash
   # リポジトリを初期化（まだの場合）
   cd /Users/riomatsushima/Bob-handson/ibm-bob-basic-hands-on-rd2scm/Hands-on
   git init
   git add ui-prototype/
   git commit -m "Add MaterialDX UI prototype"
   ```

2. **GitHubにプッシュ**
   ```bash
   # GitHubでリポジトリを作成後
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

3. **GitHub Pagesを有効化**
   - GitHubリポジトリのページに移動
   - Settings → Pages
   - Source: "Deploy from a branch"を選択
   - Branch: "main"を選択、フォルダ: "/ui-prototype"を選択
   - Save

4. **アクセス**
   - 数分後、`https://YOUR_USERNAME.github.io/YOUR_REPO/`でアクセス可能

### メリット
- 無料
- 簡単
- HTTPSで安全
- 自動デプロイ

---

## 方法2: ローカルサーバーを起動

同じネットワーク内の人と共有する場合。

### Python 3を使用

```bash
cd /Users/riomatsushima/Bob-handson/ibm-bob-basic-hands-on-rd2scm/Hands-on/ui-prototype
python3 -m http.server 8000
```

アクセス: `http://YOUR_LOCAL_IP:8000`

### Node.jsを使用

```bash
# http-serverをインストール（初回のみ）
npm install -g http-server

# サーバー起動
cd /Users/riomatsushima/Bob-handson/ibm-bob-basic-hands-on-rd2scm/Hands-on/ui-prototype
http-server -p 8000
```

アクセス: `http://YOUR_LOCAL_IP:8000`

### ローカルIPアドレスの確認

**macOS:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**
```cmd
ipconfig
```

### メリット
- 簡単
- インターネット接続不要

### デメリット
- 同じネットワーク内のみ
- PCを起動し続ける必要がある

---

## 方法3: Netlifyを使用

プロフェッショナルなホスティング。

### 手順

1. **Netlifyアカウント作成**
   - https://www.netlify.com/ にアクセス
   - 無料アカウントを作成

2. **デプロイ**
   - "Add new site" → "Deploy manually"
   - `ui-prototype`フォルダをドラッグ&ドロップ

3. **アクセス**
   - 自動生成されたURL（例: `https://random-name-123.netlify.app`）でアクセス可能
   - カスタムドメインも設定可能

### メリット
- 無料
- 高速
- HTTPSで安全
- カスタムドメイン対応

---

## 方法4: Vercelを使用

開発者向けホスティング。

### 手順

1. **Vercelアカウント作成**
   - https://vercel.com/ にアクセス
   - GitHubアカウントで登録

2. **デプロイ**
   ```bash
   # Vercel CLIをインストール
   npm install -g vercel
   
   # デプロイ
   cd /Users/riomatsushima/Bob-handson/ibm-bob-basic-hands-on-rd2scm/Hands-on/ui-prototype
   vercel
   ```

3. **アクセス**
   - 自動生成されたURL（例: `https://your-project.vercel.app`）でアクセス可能

### メリット
- 無料
- 高速
- 自動デプロイ
- プレビュー機能

---

## 方法5: ZIPファイルで共有

最もシンプルな方法。

### 手順

1. **ZIPファイルを作成**
   ```bash
   cd /Users/riomatsushima/Bob-handson/ibm-bob-basic-hands-on-rd2scm/Hands-on
   zip -r materialdx-ui-prototype.zip ui-prototype/
   ```

2. **共有**
   - メール、Slack、Google Driveなどで共有

3. **使用方法（受け取った人）**
   - ZIPファイルを解凍
   - `index.html`をブラウザで開く

### メリット
- 最もシンプル
- インターネット不要

### デメリット
- 各自がローカルで開く必要がある
- 更新時に再配布が必要

---

## 推奨方法の比較

| 方法 | 難易度 | コスト | 公開範囲 | 更新 | 推奨度 |
|------|--------|--------|----------|------|--------|
| GitHub Pages | 低 | 無料 | インターネット全体 | 自動 | ⭐⭐⭐⭐⭐ |
| ローカルサーバー | 低 | 無料 | 同じネットワーク | 手動 | ⭐⭐⭐ |
| Netlify | 低 | 無料 | インターネット全体 | 手動 | ⭐⭐⭐⭐ |
| Vercel | 中 | 無料 | インターネット全体 | 自動 | ⭐⭐⭐⭐ |
| ZIPファイル | 低 | 無料 | 個別配布 | 手動 | ⭐⭐ |

---

## セキュリティに関する注意

このプロトタイプは**デモ用**です。本番環境で使用する場合は、以下を実装してください：

1. **実際の認証システム**
   - 現在は任意のIDとパスワードでログイン可能
   - 本番では適切な認証（OAuth、JWT等）を実装

2. **HTTPS**
   - GitHub Pages、Netlify、Vercelは自動的にHTTPS

3. **アクセス制限**
   - 必要に応じてBasic認証やIP制限を追加

---

## トラブルシューティング

### CORSエラーが発生する場合

ローカルで`file://`プロトコルを使用すると、一部の機能が動作しない場合があります。
必ずHTTPサーバー経由でアクセスしてください。

### ファイルが見つからない場合

相対パスが正しいか確認してください：
```
ui-prototype/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## サポート

問題が発生した場合は、以下を確認してください：

1. ブラウザのコンソールでエラーを確認
2. ファイル構造が正しいか確認
3. HTTPサーバー経由でアクセスしているか確認

---

## まとめ

**最も簡単な方法:**
- 社内共有: ローカルサーバー（方法2）
- 外部共有: GitHub Pages（方法1）

**最もプロフェッショナルな方法:**
- Netlify または Vercel（方法3、4）

ご質問があれば、お気軽にお問い合わせください。