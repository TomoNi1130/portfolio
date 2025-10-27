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