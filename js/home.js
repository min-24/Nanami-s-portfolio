// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  

// heroセクションタイトル
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = 300;
    const progress = Math.min(scrollY / maxScroll, 1);

    const titleLeft = document.getElementById('titleLeft');
    const titleRight = document.getElementById('titleRight');

    const leftPos = 18 - 8 * progress;         // ← 18% は OK
    const rightPos = 18 - 8 * progress;        // ← 18% は OK
    const fontSize = 6 - 3.5 * progress;       // ← 6rem は OK
    const topLeftStart = 60;                   // ← CSS と合わせる
    const topRightStart = 62;                 // ← CSS と合わせる
    const topLeftPos = topLeftStart - 35 * progress;
    const topRightPos = topRightStart - 35 * progress;

    titleLeft.style.left = `${leftPos}%`;
    titleLeft.style.top = `${topLeftPos}%`;
    titleLeft.style.fontSize = `${fontSize}rem`;

    titleRight.style.right = `${rightPos}%`;
    titleRight.style.top = `${topRightPos}%`;
    titleRight.style.fontSize = `${fontSize}rem`;


    const fadeOutEls = document.querySelectorAll('.fade-out');
    const fadeOpacity = 1 - progress * 1.2;

    fadeOutEls.forEach(el => {
        el.style.opacity = fadeOpacity < 0 ? 0 : fadeOpacity;

       if (el.classList.contains('lightblue-p')) {
        el.style.transform = `translateX(-50%) rotate(90deg) translateY(${progress * -20}px)`;

    // purple-p は translateX を維持しつつ translateY のみ更新
    } else if (el.classList.contains('purple-p')) {
        el.style.transform = `translateX(-50%) translateY(${progress * -20}px)`;

    // それ以外は縦方向移動のみ
    } else {
        el.style.transform = `translateY(${progress * -20}px)`;
    }
    });

    const addInfoContainer = document.querySelector('.add-info-container');
    const overlay = document.querySelector('.overlay');

    if (progress >= 1) {
        addInfoContainer.style.opacity = 1;
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    } else {
        addInfoContainer.style.opacity = 0;
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    }
});



// 4つの画像をまとめる
window.addEventListener('scroll', () => {
    const blocks = document.querySelectorAll('.menu-block');
    const screenCenter = window.innerHeight / 2;

    blocks.forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        const blockCenter = rect.top + rect.height / 8;
        const img = block.querySelector('img');
        if (!img) return;

        const distanceFromCenter = blockCenter - screenCenter;

        // 基本の動き
        let moveX = distanceFromCenter * 0.2;

        let speedAdjust = 1 + (index - blocks.length / 2) * 0.3;

        // 最後の画像だけさらに加速
        if (index === blocks.length - 1) {
            speedAdjust += 0.3;
        }

        moveX *= speedAdjust;

        // --- ここを追加 ---
        // 中心に近づいたら自動で横ずれを0に寄せていく
        const maxOffset = 100; // 横ずれの最大px（必要なら調整）
        moveX = Math.max(Math.min(moveX, maxOffset), -maxOffset); // moveXを制限
        if (Math.abs(distanceFromCenter) < 150) { 
            moveX *= Math.abs(distanceFromCenter) / 150; 
            // 中心に近づくほどX移動をゼロに近づける
        }

        img.style.transform = `translateX(${moveX}px)`;
    });
});
 



// 無限スクロール
document.addEventListener("DOMContentLoaded", function () {
    const marquee = document.getElementById("marquee");
    const marqueeWrapper = document.getElementById("marquee-wrapper");
    const speed = 0.3; // スクロール速度

    // コンテンツを無限スクロールするために複製する
    const clone = marquee.cloneNode(true);
    marqueeWrapper.appendChild(clone); // クローンを横に並べる

    function animate() {
        let currentX = parseFloat(getComputedStyle(marqueeWrapper).transform.split(",")[4]) || 0;

        // 左へスクロール
        marqueeWrapper.style.transform = `translateX(${currentX - speed}px)`;

        const contentWidth = marquee.scrollWidth; // 元のコンテンツの幅

        // もし元のコンテンツが完全に消えたらリセット
        if (Math.abs(currentX) >= contentWidth) {
            marqueeWrapper.style.transform = `translateX(0px)`; // リセット
        }

        requestAnimationFrame(animate);
    }

    animate();
});

// 右向き無限スクロール（marquee2）
document.addEventListener("DOMContentLoaded", function () {
    const marquee2 = document.getElementById("marquee2");
    const marqueeWrapper2 = document.getElementById("marquee-wrapper2");
    const speed2 = 0.4;

    const clone2 = marquee2.cloneNode(true);
    marqueeWrapper2.insertBefore(clone2, marquee2); // クローンを先頭に追加

    let currentX2 = -marquee2.scrollWidth;

    function animateRight() {
        currentX2 += speed2;
        marqueeWrapper2.style.transform = `translateX(${currentX2}px)`;

        const contentWidth2 = marquee2.scrollWidth;

        if (currentX2 >= 0) {
            currentX2 = -contentWidth2;
        }

        requestAnimationFrame(animateRight);
    }

    animateRight();
});


//ページ切り替え
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
});

  
  
  



