// ハンバーガーメニューの制御
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// メニュー内のリンクをクリックしたら閉じる
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ドロップダウンメニューの遅延制御
const navItem = document.querySelector('.nav-item');
const aboutLink = navItem.querySelector('a');
let hideTimeout;

// PC表示での動作
navItem.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
        clearTimeout(hideTimeout);
        navItem.classList.add('show-submenu');
    }
});

navItem.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
        // 1秒後に閉じる（ミリ秒単位で調整可能）
        hideTimeout = setTimeout(() => {
            navItem.classList.remove('show-submenu');
        }, 1000);
    }
});

// モバイルでのドロップダウンメニュー制御
aboutLink.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        navItem.classList.toggle('active');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    let currentTooltip = null;
    let hideTimeout = null;
    let currentItem = null;

    document.querySelectorAll(".skill-item").forEach(item => {

        const clearHideTimeout = () => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        };

        const scheduleHideTooltip = () => {
            clearHideTimeout();
            hideTimeout = setTimeout(() => {
                if (currentTooltip) {
                    currentTooltip.classList.remove("show");
                    setTimeout(() => {
                        currentTooltip?.remove();
                        currentTooltip = null;
                        currentItem = null;
                    }, 200);
                }
            }, 200); // 200ms後に消す
        };

        item.addEventListener("mouseenter", () => {
            clearHideTimeout();

            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }

            currentItem = item;

            const duration = item.dataset.duration || "";
            const description = item.dataset.description || "説明がありません。";

            const tooltip = document.createElement("div");
            tooltip.className = "skill-tooltip";

            if (duration) {
                const durationEl = document.createElement("div");
                durationEl.className = "tooltip-duration";
                durationEl.textContent = duration;
                tooltip.appendChild(durationEl);
            }

            const descEl = document.createElement("div");
            descEl.className = "tooltip-description";
            descEl.textContent = description;
            tooltip.appendChild(descEl);

            document.body.appendChild(tooltip);

            const rect = item.getBoundingClientRect();
            tooltip.style.position = "fixed";
            tooltip.style.top = `${rect.bottom + 8}px`;
            tooltip.style.left = `${rect.left}px`;

            setTimeout(() => tooltip.classList.add("show"), 10);

            // ツールチップにマウスが入ったら消すタイマーをキャンセル
            tooltip.addEventListener("mouseenter", () => {
                clearHideTimeout();
            });

            // ツールチップからマウスが出たら消すタイマーをセット
            tooltip.addEventListener("mouseleave", () => {
                scheduleHideTooltip();
            });

            currentTooltip = tooltip;
        });

        item.addEventListener("mouseleave", () => {
            // マウスがツールチップに移動する可能性があるため少し遅延させて判定
            scheduleHideTooltip();
        });
    });
});