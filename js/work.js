// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });


    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('.left-fixed .image-wrapper img');
      const rightScroll = document.querySelector('.right-scroll');
    
      rightScroll.addEventListener('scroll', () => {
        const scrollTop = rightScroll.scrollTop;
        const scrollHeight = rightScroll.scrollHeight - rightScroll.clientHeight;
        const scrollPercent = scrollTop / scrollHeight;
    
        let index;
        if (scrollPercent < 0.25) {
          index = 0;
        } else if (scrollPercent < 0.5) {
          index = 1;
        } else if (scrollPercent < 0.75) {
          index = 2;
        } else {
          index = 3;
        }
    
        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
      });
    });
    
    


