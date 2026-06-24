// グローバル状態
let currentView = 'interactive';
let trainingProgress = 15;
let trainingInterval = null;
let currentUser = null;

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
});

// ログイン機能
function initializeLogin() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }
}

function handleLogin() {
    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;
    
    // デモ用: 任意のIDとパスワードでログイン可能
    if (userId && password) {
        currentUser = userId;
        
        // ログイン画面を非表示
        document.getElementById('login-screen').style.display = 'none';
        
        // メインアプリを表示
        document.getElementById('main-app').style.display = 'block';
        
        // ユーザー名を表示
        const userNameElement = document.querySelector('.user-name');
        if (userNameElement) {
            userNameElement.textContent = `👤 ${userId}`;
        }
        
        // メインアプリの初期化
        initializeNavigation();
        initializeInteractiveUI();
        initializeFineTuneUI();
        
        // ログイン成功通知
        setTimeout(() => {
            showNotification(
                'ログイン成功',
                `${userId} としてログインしました`,
                'success'
            );
        }, 500);
    }
}

// ナビゲーション
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view;
            switchView(viewName);
        });
    });
}

function switchView(viewName) {
    // ナビゲーションボタンの更新
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        }
    });
    
    // ビューの切り替え
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        currentView = viewName;
    }
}

// 対話型UI
function initializeInteractiveUI() {
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const startFineTuneBtn = document.getElementById('start-finetune-btn');
    
    // 送信ボタン
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            sendMessage();
        });
    }
    
    // Enterキーで送信
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Fine-Tune開始ボタン
    if (startFineTuneBtn) {
        startFineTuneBtn.addEventListener('click', () => {
            showNotification(
                '画面遷移',
                'Fine-Tune UIに移動します',
                'info'
            );
            
            setTimeout(() => {
                switchView('finetune');
                showNotification(
                    'コンテキスト引き継ぎ',
                    'モデルとデータが自動選択されました',
                    'success'
                );
            }, 500);
        });
    }
    
    // 結果を表示（デモ用）
    setTimeout(() => {
        showResult();
    }, 3000);
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        // メッセージを追加（実装例）
        showNotification(
            'メッセージ送信',
            'メッセージが送信されました',
            'success'
        );
        chatInput.value = '';
    }
}

function showResult() {
    const resultMessage = document.getElementById('result-message');
    if (resultMessage) {
        resultMessage.style.display = 'flex';
        
        // タスクの進捗を更新
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach((task, index) => {
            setTimeout(() => {
                task.classList.remove('pending', 'in-progress');
                task.classList.add('completed');
                const icon = task.querySelector('.task-icon');
                if (icon) {
                    icon.textContent = '✓';
                }
            }, index * 1000);
        });
    }
}

// Fine-Tune UI
function initializeFineTuneUI() {
    const nextStepBtn = document.getElementById('next-step-btn');
    const backToModelBtn = document.getElementById('back-to-model-btn');
    const startOptimizationBtn = document.getElementById('start-optimization-btn');
    const completeTrainingBtn = document.getElementById('complete-training-btn');
    const testNewModelBtn = document.getElementById('test-new-model-btn');
    
    // 次へボタン（ステップ1→2）
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', () => {
            showParameterStep();
        });
    }
    
    // 戻るボタン（ステップ2→1）
    if (backToModelBtn) {
        backToModelBtn.addEventListener('click', () => {
            document.getElementById('finetune-step2').style.display = 'none';
            document.getElementById('finetune-step1').style.display = 'block';
        });
    }
    
    // 最適化開始ボタン（ステップ2→3）
    if (startOptimizationBtn) {
        startOptimizationBtn.addEventListener('click', () => {
            startOptimization();
        });
    }
    
    // 学習完了ボタン
    if (completeTrainingBtn) {
        completeTrainingBtn.addEventListener('click', () => {
            completeTraining();
        });
    }
    
    // 新モデルテストボタン
    if (testNewModelBtn) {
        testNewModelBtn.addEventListener('click', () => {
            showNotification(
                '画面遷移',
                '対話型UIに移動します',
                'info'
            );
            
            setTimeout(() => {
                switchView('interactive');
                showNotification(
                    '新モデル適用',
                    '新しいモデル v2.1 が適用されました',
                    'success'
                );
            }, 500);
        });
    }
    
    // パラメーター入力のイベントリスナー
    initializeParameterInputs();
}

function initializeParameterInputs() {
    // スライダーの値表示更新
    const trainingRatioSlider = document.getElementById('training-data-ratio');
    const validationRatioSlider = document.getElementById('validation-data-ratio');
    
    if (trainingRatioSlider) {
        trainingRatioSlider.addEventListener('input', (e) => {
            document.getElementById('training-ratio-value').textContent = e.target.value + '%';
            updateParameterSummary();
        });
    }
    
    if (validationRatioSlider) {
        validationRatioSlider.addEventListener('input', (e) => {
            document.getElementById('validation-ratio-value').textContent = e.target.value + '%';
            updateParameterSummary();
        });
    }
    
    // その他のパラメーター変更時にサマリーを更新
    const parameterInputs = [
        'optimization-target',
        'target-accuracy',
        'learning-rate',
        'batch-size',
        'epochs',
        'optimization-method',
        'constraint-type',
        'cpu-cores'
    ];
    
    parameterInputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', updateParameterSummary);
        }
    });
}

function updateParameterSummary() {
    // 最適化手法
    const method = document.getElementById('optimization-method');
    if (method) {
        const methodText = method.options[method.selectedIndex].text;
        document.getElementById('summary-method').textContent = methodText;
    }
    
    // 目標精度
    const targetAccuracy = document.getElementById('target-accuracy');
    if (targetAccuracy) {
        document.getElementById('summary-target').textContent = targetAccuracy.value + '%';
    }
    
    // 推定時間（エポック数に基づく）
    const epochs = document.getElementById('epochs');
    if (epochs) {
        const hours = Math.ceil(epochs.value / 50);
        document.getElementById('summary-time').textContent = `約${hours}-${hours + 1}時間`;
    }
    
    // 使用リソース
    const cpuCores = document.getElementById('cpu-cores');
    if (cpuCores) {
        document.getElementById('summary-resource').textContent = `IBM Cloud CPU (${cpuCores.value}コア)`;
    }
}

function showParameterStep() {
    document.getElementById('finetune-step1').style.display = 'none';
    document.getElementById('finetune-step2').style.display = 'block';
    
    showNotification(
        'パラメーター設定',
        '最適化パラメーターを設定してください',
        'info'
    );
    
    // 初期サマリーを更新
    updateParameterSummary();
}

function startOptimization() {
    // パラメーターを取得
    const params = {
        optimizationTarget: document.getElementById('optimization-target').value,
        targetAccuracy: document.getElementById('target-accuracy').value,
        learningRate: document.getElementById('learning-rate').value,
        batchSize: document.getElementById('batch-size').value,
        epochs: document.getElementById('epochs').value,
        optimizationMethod: document.getElementById('optimization-method').value,
        constraintType: document.getElementById('constraint-type').value,
        cpuCores: document.getElementById('cpu-cores').value,
        trainingRatio: document.getElementById('training-data-ratio').value,
        validationRatio: document.getElementById('validation-data-ratio').value,
        dataAugmentation: document.getElementById('data-augmentation').checked
    };
    
    console.log('最適化パラメーター:', params);
    
    document.getElementById('finetune-step2').style.display = 'none';
    document.getElementById('finetune-step3').style.display = 'block';
    
    showNotification(
        'Decision Optimization開始',
        `${params.optimizationMethod}を使用して最適化を開始しました`,
        'success'
    );
    
    // 学習進捗のシミュレーション
    startTrainingSimulation();
}

function startTrainingSimulation() {
    trainingProgress = 15;
    
    trainingInterval = setInterval(() => {
        trainingProgress += 5;
        
        if (trainingProgress > 100) {
            trainingProgress = 100;
            clearInterval(trainingInterval);
        }
        
        updateTrainingProgress();
    }, 1000);
}

function updateTrainingProgress() {
    const progressFill = document.getElementById('progress-fill');
    const currentEpoch = document.getElementById('current-epoch');
    const progressPercent = document.getElementById('progress-percent');
    const lossValue = document.getElementById('loss-value');
    const accuracyValue = document.getElementById('accuracy-value');
    
    if (progressFill) {
        progressFill.style.width = `${trainingProgress}%`;
    }
    
    if (currentEpoch) {
        currentEpoch.textContent = trainingProgress;
    }
    
    if (progressPercent) {
        progressPercent.textContent = trainingProgress;
    }
    
    // メトリクスの更新（シミュレーション）
    if (lossValue) {
        const loss = (0.5 - (trainingProgress / 100) * 0.3).toFixed(3);
        lossValue.textContent = loss;
    }
    
    if (accuracyValue) {
        const accuracy = (75 + (trainingProgress / 100) * 17).toFixed(1);
        accuracyValue.textContent = `${accuracy}%`;
    }
}

function completeTraining() {
    if (trainingInterval) {
        clearInterval(trainingInterval);
    }
    
    document.getElementById('finetune-step2').style.display = 'none';
    document.getElementById('finetune-step3').style.display = 'block';
    
    showNotification(
        'Fine-Tune完了',
        '新しいモデル v2.1 が利用可能です',
        'success'
    );
}

// 通知システム
function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    container.appendChild(notification);
    
    // 3秒後に自動削除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// アニメーション用のCSSを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// デモ用：ページロード時の通知
window.addEventListener('load', () => {
    setTimeout(() => {
        showNotification(
            'プロトタイプアプリ',
            '画面遷移とUIのイメージを確認できます',
            'info'
        );
    }, 1000);
});

// Made with Bob
