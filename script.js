// 滚动动画
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有 Swiper 实例
    const swiperInstances = {
        // 作品展示轮播
        projectSwiper: new Swiper('.project-swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        }),

        // 摄影作品轮播
        photoSwiper: new Swiper('.photo-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        })
    };

    // 滚动进度条
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = `${progress}%`;
    });

    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.padding = '1rem 0';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 项目过滤功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 数据统计动画
    const statsCards = document.querySelectorAll('.stats-card');
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const number = card.querySelector('.stats-number');
                const progressBar = card.querySelector('.progress-bar');
                const targetValue = parseInt(number.getAttribute('data-value'));
                let currentValue = 0;

                const updateValue = () => {
                    if (currentValue < targetValue) {
                        currentValue += Math.ceil(targetValue / 50);
                        if (currentValue > targetValue) currentValue = targetValue;
                        number.textContent = currentValue.toLocaleString();
                        progressBar.style.width = (currentValue / targetValue * 100) + '%';
                        requestAnimationFrame(updateValue);
                    }
                };

                updateValue();
                observer.unobserve(card);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    statsCards.forEach(card => statsObserver.observe(card));

    // 滚动渐入动画
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // 作品集卡片3D效果
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // 内容网格动画
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // 页面加载完成后的动画
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // 标题动画
        const titles = document.querySelectorAll('.main-title, .sub-title');
        titles.forEach((title, index) => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                title.style.transition = 'all 0.8s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 300 * index);
        });

        // 导航项目动画
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500 + (100 * index));
        });
    });

    // 动态背景效果
    const heroSection = document.querySelector('.hero-section');
    heroSection.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.hero-bg-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const offset = index * 10;
            shape.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
        });
    });

    // 技能标签动画
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 联系表单动画
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // 提交表单处理
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 添加提交动画
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
        submitBtn.disabled = true;
        
        // 模拟提交延迟
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> 发送成功！';
            submitBtn.classList.add('btn-success');
            
            // 重置表单
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = '发送消息';
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
            }, 2000);
        }, 1500);
    });

    // 导航项目悬停效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 标签页切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');
            const targetTab = this.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 个性标签云动画
    const tagItems = document.querySelectorAll('.tag-item');
    tagItems.forEach(tag => {
        tag.addEventListener('mouseover', function() {
            this.style.transform = `scale(1.1) rotate(${Math.random() * 10 - 5}deg)`;
        });

        tag.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // 兴趣卡片悬停效果
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // 滚动显示动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    });

    document.querySelectorAll('.fade-in-section').forEach((section) => {
        observer.observe(section);
    });

    // 打字机效果
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // 当元素进入视口时开始打字效果
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    typingObserver.unobserve(entry.target);
                }
            });
        });

        typingObserver.observe(typingText);
    }

    // 装饰元素动画
    function animateDecorations() {
        const decorations = document.querySelectorAll('.decoration-element');
        decorations.forEach(decoration => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomRotate = Math.random() * 360;
            
            decoration.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        });
    }

    setInterval(animateDecorations, 3000);

    // 处理视频加载和错误
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        const wrapper = video.closest('.video-wrapper');
        const loading = wrapper?.querySelector('.video-loading');
        const fallback = wrapper?.querySelector('.video-fallback');

        // 初始化时隐藏fallback
        if (fallback) {
            fallback.style.display = 'none';
        }

        // 视频可以播放时
        video.addEventListener('canplay', function() {
            if (loading) {
                loading.style.display = 'none';
            }
            video.style.opacity = '1';
        });

        // 视频加载失败时
        video.addEventListener('error', function(e) {
            console.error('Video error:', e);
            if (loading) {
                loading.style.display = 'none';
            }
            if (fallback) {
                fallback.style.display = 'flex';
            }
        });

        // 视频加载超时处理
        let loadTimeout = setTimeout(() => {
            if (video.readyState === 0) { // 如果视频还没有加载
                console.log('Video load timeout');
                if (loading) {
                    loading.style.display = 'none';
                }
                if (fallback) {
                    fallback.style.display = 'flex';
                }
            }
        }, 5000); // 5秒超时

        // 视频开始加载时
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
            if (loading) {
                loading.style.display = 'flex';
            }
        });

        // 视频加载完成时
        video.addEventListener('loadeddata', function() {
            console.log('Video loaded');
            clearTimeout(loadTimeout);
            if (loading) {
                loading.style.display = 'none';
            }
        });
    });

    // 相册翻页功能
    const book = document.getElementById('book');
    const pages = document.getElementById('pages');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageNumber = document.querySelector('.page-number');
    const totalPages = document.querySelectorAll('.page').length;
    let currentPage = 0;

    function updatePageNumber() {
        pageNumber.textContent = `${currentPage + 1} / ${totalPages}`;
    }

    function updateButtons() {
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    function turnPage(direction) {
        const angle = direction === 'next' ? -180 : 0;
        const pages = document.querySelectorAll('.page');
        
        pages.forEach((page, index) => {
            if (index < currentPage) {
                page.style.transform = 'rotateY(-180deg)';
            } else if (index === currentPage) {
                page.style.transform = `rotateY(${angle}deg)`;
            } else {
                page.style.transform = 'rotateY(0deg)';
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            turnPage('prev');
            updatePageNumber();
            updateButtons();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            turnPage('next');
            updatePageNumber();
            updateButtons();
        }
    });

    // 初始化相册状态
    updatePageNumber();
    updateButtons();

    // 添加页面悬停效果
    const photoPages = document.querySelectorAll('.page');
    photoPages.forEach(page => {
        page.addEventListener('mousemove', (e) => {
            if (!page.style.transform.includes('180deg')) {  // 只在页面未翻转时添加效果
                const rect = page.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 30;  // 减小角度范围
                const angleY = (x - centerX) / 30;
                
                page.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
            }
        });
        
        page.addEventListener('mouseleave', () => {
            if (!page.style.transform.includes('180deg')) {  // 只在页面未翻转时重置
                page.style.transform = 'rotateX(0) rotateY(0)';
            }
        });
    });

    // 添加翻页音效
    function playPageTurnSound() {
        const audio = new Audio('page-turn.mp3');  // 需要添加翻页音效文件
        audio.volume = 0.3;  // 设置音量
        audio.play().catch(() => {});  // 忽略可能的自动播放限制错误
    }

    prevBtn.addEventListener('click', playPageTurnSound);
    nextBtn.addEventListener('click', playPageTurnSound);
}); 