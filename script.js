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

    document.querySelectorAll(".skill-item").forEach(item => {
        const link = item.querySelector('a');
        let tooltipVisible = false;

        function showTooltip() {
            if (currentTooltip) {
                currentTooltip.remove();
                currentTooltip = null;
            }

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

            currentTooltip = tooltip;
            tooltipVisible = true;

            function onClickOutside(e) {
                if (!item.contains(e.target) && !tooltip.contains(e.target)) {
                    hideTooltip();
                    document.removeEventListener('click', onClickOutside);
                }
            }
            setTimeout(() => {
                // ここでイベント登録。setTimeoutはクリックイベントの伝播を防ぐための工夫
                document.addEventListener('click', onClickOutside);
            }, 0);
        }

        function hideTooltip() {
            if (currentTooltip) {
                currentTooltip.classList.remove("show");
                setTimeout(() => {
                    currentTooltip?.remove();
                    currentTooltip = null;
                    tooltipVisible = false;
                }, 200);
            }
        }

        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // これを追加して伝播を止める

            if (tooltipVisible) {
                hideTooltip();
            } else {
                showTooltip();
            }
        });

        item.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation(); // こちらも伝播を止める

            const href = link.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        });
    });
});