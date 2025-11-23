// ==============================================
// 1. ハンバーガーメニューの開閉制御
// ==============================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

// ハンバーガーボタンをクリックしたらメニューの開閉
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// メニュー内のリンクをクリックしたらメニューを閉じる
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ==============================================
// 2. ドロップダウンメニューの制御
// ==============================================
const navItem = document.querySelector('.nav-item');
const aboutLink = navItem.querySelector('a');
let hideTimeout;

// PC表示(768px以上)での動作
navItem.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
        // 既存のタイムアウトをキャンセル
        clearTimeout(hideTimeout);
        // サブメニューを表示
        navItem.classList.add('show-submenu');
    }
});

navItem.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
        // 1秒後にサブメニューを閉じる
        hideTimeout = setTimeout(() => {
            navItem.classList.remove('show-submenu');
        }, 1000);
    }
});

// モバイル表示(768px以下)での動作
aboutLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        // リンク遷移を防ぎ、クリックでサブメニュー開閉
        e.preventDefault();
        navItem.classList.toggle('active');
    }
});

// ==============================================
// 3. スキルアイテムのツールチップ機能
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
    // 現在表示中のツールチップとアイテムを管理
    let currentTooltip = null;
    let currentItem = null;

    /**
     * ツールチップを非表示にする関数
     */
    function hideTooltip() {
        if (currentTooltip) {
            const tooltipToRemove = currentTooltip;
            // 先に変数をクリアしてから削除
            currentTooltip = null;
            currentItem = null;
            
            // フェードアウト開始
            tooltipToRemove.classList.remove("show");
            
            // アニメーション完了後に要素を削除
            setTimeout(() => {
                tooltipToRemove.remove();
            }, 200);
        }
    }

    /**
     * 外側クリック時の処理
     */
    function onClickOutside(e) {
        // クリック対象がアイテムでもツールチップでもない場合は閉じる
        if (currentItem && 
            !currentItem.contains(e.target) && 
            currentTooltip && 
            !currentTooltip.contains(e.target)) {
            hideTooltip();
        }
    }

    // ドキュメント全体でクリックを監視
    document.addEventListener('click', onClickOutside);

    /**
     * スクロール時にツールチップを閉じる
     */
    window.addEventListener('scroll', hideTooltip, true);

    /**
     * 各スキルアイテムにイベントを設定
     */
    document.querySelectorAll(".skill-item").forEach(item => {
        const link = item.querySelector('a');

        /**
         * ツールチップを表示する関数
         */
        function showTooltip() {
            // 既存のツールチップを閉じる
            hideTooltip();

            // データ属性から情報を取得
            const duration = item.dataset.duration || "";
            const description = item.dataset.description || "説明がありません。";

            // ツールチップ要素を作成
            const tooltip = document.createElement("div");
            tooltip.className = "skill-tooltip";

            // 期間表示(あれば)
            if (duration) {
                const durationEl = document.createElement("div");
                durationEl.className = "tooltip-duration";
                durationEl.textContent = duration;
                tooltip.appendChild(durationEl);
            }

            // 説明文
            const descEl = document.createElement("div");
            descEl.className = "tooltip-description";
            descEl.textContent = description;
            tooltip.appendChild(descEl);

            // body に追加
            document.body.appendChild(tooltip);

            // アイテムの下に配置
            const rect = item.getBoundingClientRect();
            tooltip.style.position = "fixed";
            tooltip.style.top = `${rect.bottom + 8}px`;
            tooltip.style.left = `${rect.left}px`;

            // フェードイン
            setTimeout(() => tooltip.classList.add("show"), 10);

            // 現在のツールチップとして記録
            currentTooltip = tooltip;
            currentItem = item;
        }

        /**
         * シングルクリック: ツールチップ表示/非表示
         */
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 同じアイテムをクリックした場合は閉じる
            if (currentTooltip && currentItem === item) {
                hideTooltip();
            } else {
                showTooltip();
            }
        });

        /**
         * ダブルクリック: リンク先に遷移
         */
        item.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const href = link.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});

//猫を毎回ランダムな場所に置く

function setRandomPosition(el) {
  const maxTop = 80;
  const minTop = 20;
  const maxRight = 80;
  const minRight = 20;

  const top = Math.random() * (maxTop - minTop) + minTop;

  const isRight = Math.random() >= 0.5;
  let right;
  if (isRight) {
    // 右側（70〜）
    right = Math.random() * (maxRight - 70) + 70;
    el.classList.add("flip-horizontal"); // 右側なら反転
  } else {
    // 左側（〜30）
    right = Math.random() * (30 - minRight) + minRight;
    el.classList.remove("flip-horizontal"); // 左側なら反転解除
  }

  el.style.top = top + "vh";
  el.style.right = right + "vw";
}

const imgs = document.querySelectorAll(".fly-cat");

imgs.forEach(img => {
  setRandomPosition(img);

  img.addEventListener("click", function () {
      // 現在のtransformの値を取得
      const computedStyle = window.getComputedStyle(this);
      const currentTransform = computedStyle.transform;
      
      // transformMatrixからscaleXの値を抽出
      let scaleX = 1;
      if (currentTransform && currentTransform !== 'none') {
        const matrix = currentTransform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
          const values = matrix[1].split(',').map(parseFloat);
          scaleX = values[0]; // matrix(a, b, c, d, tx, ty)のa値がscaleX
        }
      }
      
      // まず上に飛び上がる
      this.style.transition = "transform 0.3s ease-out";
      this.style.transform = `translateY(-15vh) rotate(-30deg) scaleX(${scaleX})`;
      
      // 0.3秒後に落下開始
      setTimeout(() => {
        this.style.transition = "transform 2.0s cubic-bezier(0.2, 0.0, 0.2, 0.98)";
        this.style.transform = `translateY(200vh) rotate(540deg) scaleX(${scaleX})`;
        this.classList.add("cat-falling");
      }, 300);
    });
});