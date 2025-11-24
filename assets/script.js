// 科幻风格个人简介网站脚本

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initLoadingAnimation();
    initSmoothScroll();
    initParticleEffect();
    initWorkItemHover();
    initVideoPlayback();
    initNavbarScroll();
    initTypingEffect();
    loadWorksFromConfig();
});

// 加载动画
function initLoadingAnimation() {
    const elements = document.querySelectorAll('.loading');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 200);
    });
}

// 平滑滚动
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 粒子效果增强
function initParticleEffect() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // 创建额外的粒子
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    // 随机大小和黑白颜色
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.8 + 0.2;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        opacity: ${opacity};
        border-radius: 50%;
        left: ${startX}px;
        top: ${startY}px;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// 添加浮动动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 作品项目悬停效果
function initWorkItemHover() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // 添加简约黑白光效
            const glow = document.createElement('div');
            glow.className = 'item-glow';
            glow.style.cssText = `
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                background: rgba(153, 153, 153, 0.1);
                border: 1px solid #999;
                border-radius: 0;
                z-index: -1;
                opacity: 0.3;
            `;
            
            this.style.position = 'relative';
            this.appendChild(glow);
        });
        
        item.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.item-glow');
            if (glow) {
                glow.remove();
            }
        });
    });
}

// 添加光效动画（已移除，使用简约静态效果）

// 视频播放功能
function initVideoPlayback() {
    const videos = document.querySelectorAll('.work-video');
    videos.forEach(video => {
        video.classList.add('work-media');
        video.playsInline = true;
        video.muted = true;
        video.loop = true;
        video.load();
    });
    
    // 为作品项添加悬停时播放视频的逻辑
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        const video = item.querySelector('.work-video');
        if (video) {
            // 悬停时尝试播放视频
            item.addEventListener('mouseenter', function() {
                try {
                    video.play().catch(error => {
                        // 自动播放受限处理已删除
                    });
                } catch (e) {
                    // 播放错误处理已删除
                    // 播放视频时出错，静默处理
                }
            });
            
            // 移出时暂停视频
            item.addEventListener('mouseleave', function() {
                try {
                    video.pause().catch(e => {
                        // 暂停错误处理已删除
                    });
                } catch (e) {
                    // 自动播放阻止处理已删除
                    video.play().catch(e => {
                        // 播放错误处理已删除
                    });
                }
            });
        }
    });
    
    // 播放按钮点击事件
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const workItem = this.closest('.work-item');
            const videoSrc = workItem.dataset.video;
            
            if (videoSrc) {
                showVideoModal(videoSrc);
            }
        });
    });
}

function showVideoModal(videoSrc) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    `;
    
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 800px;
        background: #000;
        border: 1px solid #999;
        border-radius: 0;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(153, 153, 153, 0.2);
    `;
    
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        width: 30px;
        height: 30px;
        background: transparent;
        border: 2px solid #999;
        border-radius: 0;
        color: #999;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = '#999';
        this.style.color = '#fff';
        this.style.boxShadow = '0 0 5px rgba(153, 153, 153, 0.5)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.color = '#999';
        this.style.boxShadow = 'none';
    });
    
    closeBtn.addEventListener('click', function() {
        video.pause();
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            video.pause();
            modal.remove();
        }
    });
    
    videoContainer.appendChild(closeBtn);
    videoContainer.appendChild(video);
    modal.appendChild(videoContainer);
    document.body.appendChild(modal);
    
    // 自动播放
    video.play().catch(() => {
        // 自动播放被阻止，静默处理
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 打字机效果
function initTypingEffect() {
    const bioText = document.querySelector('.bio-text');
    if (!bioText) return;
    
    const originalText = bioText.textContent;
    bioText.textContent = '';
    bioText.style.opacity = '1';
    
    let index = 0;
    const speed = 30; // 打字速度（毫秒）
    
    function typeWriter() {
        if (index < originalText.length) {
            bioText.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // 延迟开始打字效果
    setTimeout(typeWriter, 1000);
}

// 鼠标跟随效果
function initMouseFollow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        background: #999;
        clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 12 + 'px';
        cursor.style.top = e.clientY - 12 + 'px';
    });
    
    // 鼠标悬停效果
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .info-item, .social-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.opacity = '0.7';
        });

        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '1';
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.profile-card, .work-item, .info-item, .social-link');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// 添加滚动动画样式
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .profile-card, .work-item, .info-item, .social-link {
        opacity: 0;
    }
`;
document.head.appendChild(scrollStyle);

// 键盘导航支持
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC键关闭视频模态框
        if (e.key === 'Escape') {
            const modal = document.querySelector('.video-modal');
            if (modal) {
                const video = modal.querySelector('video');
                if (video) video.pause();
                modal.remove();
            }
        }
        
        // 方向键导航
        if (e.key === 'ArrowDown') {
            window.scrollBy({ top: 100, behavior: 'smooth' });
        }
        if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -100, behavior: 'smooth' });
        }
    });
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    // 可以在这里添加滚动时的其他逻辑
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // 根据滚动位置调整背景动画速度
    const gridBg = document.querySelector('.grid-bg');
    if (gridBg) {
        gridBg.style.animationDuration = `${20 - scrollPercent * 0.1}s`;
    }
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        const videos = document.querySelectorAll('video');
        videos.forEach(video => video.pause());
    } else {
        // 页面可见时恢复动画
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (video.closest('.video-modal')) {
                video.play().catch(() => {});
            }
        });
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    // 静默处理错误
});

// 图片加载错误处理
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWExYTFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=';
    }
}, true);

// 初始化所有功能
function initializeAllFeatures() {
    try {
        initLoadingAnimation();
        initSmoothScroll();
        initParticleEffect();
        initWorkItemHover();
        initVideoPlayback();
        initNavbarScroll();
        initTypingEffect();
        initMouseFollow();
        initScrollAnimations();
        initKeyboardNavigation();
        loadWorksFromConfig();
    } catch (error) {
        // 初始化失败，静默处理
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
    initializeAllFeatures();
}

// 导出主要函数（如果需要在外部调用）
// 从配置表加载作品数据
async function loadWorksFromConfig() {
    // 添加状态指示器
    const statusIndicator = document.createElement('div');
    statusIndicator.id = 'loading-status';
    statusIndicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: rgba(0,0,0,0.8); color: white; padding: 10px; z-index: 1000; font-family: monospace;';
    document.body.appendChild(statusIndicator);
    
    try {
        statusIndicator.textContent = '开始加载作品数据...';
        
        const response = await fetch('works/works.json');
        statusIndicator.textContent = `获取到响应: ${response.status} ${response.statusText}`;
        
        if (!response.ok) {
            throw new Error(`HTTP错误! 状态码: ${response.status}`);
        }
        
        const data = await response.json();
        statusIndicator.textContent = `解析后的数据: ${JSON.stringify(data).substring(0, 100)}...`;
        
        if (data && typeof data === 'object') {
            const works = data.works || data;
            
            if (Array.isArray(works) && works.length > 0) {
                statusIndicator.textContent = `找到 ${works.length} 个作品，开始渲染...`;
                renderWorks(works);
                statusIndicator.textContent = '作品渲染完成!';
                // 5秒后移除状态指示器
                setTimeout(() => {
                    if (statusIndicator.parentNode) {
                        statusIndicator.parentNode.removeChild(statusIndicator);
                    }
                }, 5000);
            } else {
                statusIndicator.textContent = '未找到有效的作品数据!';
            }
        } else {
            statusIndicator.textContent = '数据格式不正确!';
        }
    } catch (error) {
        statusIndicator.textContent = `错误: ${error.message}`;
    }
}

// 渲染作品列表
function renderWorks(works) {
    const worksGrid = document.getElementById('works-grid');
    
    if (!worksGrid) {
        return;
    }
    
    // 清空现有内容
    worksGrid.innerHTML = '';
    
    // 创建并添加每个作品项
    works.forEach((work, index) => {
        try {
            const workItem = createWorkItem(work);
            if (workItem) {
                worksGrid.appendChild(workItem);
                
                // 添加动画类以显示作品项（解决opacity: 0的问题）
                // 使用setTimeout确保DOM已更新
                setTimeout(() => {
                    workItem.classList.add('animate-in');
                }, index * 100); // 错开添加动画的时间，创造级联效果
            }
        } catch (error) {
            // 渲染作品出错，静默处理
        }
    });
    
    // 重新初始化作品项的交互效果
    try {
        initWorkItemHover();
    } catch (error) {
        // 初始化作品项交互效果失败，静默处理
    }
}

// 创建单个作品项
function createWorkItem(work) {
    // 验证必要属性是否存在
    if (!work || !work.media || !work.media.src) {
        return null;
    }
    
    try {
        const workItem = document.createElement('div');
        workItem.className = 'work-item';
        
        // 确保视频路径正确，移除可能的重复路径
        let mediaSrc = work.media.src;
        if (!mediaSrc.startsWith('http') && !mediaSrc.startsWith('/')) {
            // 如果是相对路径，添加正确的前缀
            if (mediaSrc.startsWith('works/')) {
                mediaSrc = `/${mediaSrc}`;
            } else {
                mediaSrc = `/works/${mediaSrc}`;
            }
        }
        
        const mediaHtml = work.media.type === 'video' 
            ? `<video src="${mediaSrc}" class="work-video" muted loop autoplay></video>
               <button class="play-btn">▶</button>`
            : `<img src="${mediaSrc}" alt="${work.media.alt || work.title}" class="work-image">`;
        
        const techTags = Array.isArray(work.techStack) 
            ? work.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')
            : '';
        
        // 构建工作信息HTML，包括可选的起始时间
        let workInfoHtml = `
            <h3 class="work-title">${work.title || ''}</h3>
            <p class="work-description">${work.description || ''}</p>
            <div class="work-tech">
                ${techTags}
            </div>
        `;
        
        // 添加开发起始时间
        if (work.startTime) {
            workInfoHtml += `<div class="work-time">项目时间: ${work.startTime}</div>`;
        }
        
        workItem.innerHTML = `
            <div class="work-media">
                ${mediaHtml}
                <div class="work-overlay">
                    <div class="work-type">${work.type || ''}</div>
                </div>
            </div>
            <div class="work-info">
                ${workInfoHtml}
            </div>
        `;
        
        // 如果是视频，添加数据集
        if (work.media.type === 'video') {
            workItem.dataset.video = work.media.src;
        }
        
        return workItem;
    } catch (error) {
        return null;
    }
}

window.SciFiPortfolio = {
    showVideoModal,
    initializeAllFeatures,
    loadWorksFromConfig,
    renderWorks
};