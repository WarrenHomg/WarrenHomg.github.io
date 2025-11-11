# 作品视频文件夹

这个文件夹用于存放您的作品视频文件。

## 使用方法

1. **添加视频文件**
   - 将您的作品视频文件（MP4、WebM等格式）放入此文件夹
   - 建议视频尺寸为 16:9 比例，分辨率 1920x1080 或 1280x720

2. **在网站中引用视频**
   - 打开 `index.html` 文件
   - 找到作品展示部分的代码
   - 修改 `data-video` 属性为您的视频文件名：

```html
<!-- 示例：将 demo-video.mp4 替换为您的视频文件名 -->
<div class="work-item loading" data-video="works/your-video-file.mp4">
    <div class="work-media">
        <img src="https://via.placeholder.com/400x250/1a1a2e/00f3ff?text=Your+Project" alt="项目名称" class="work-image">
        <div class="work-overlay">
            <span class="work-type">视频演示</span>
        </div>
        <button class="play-btn">▶</button>
    </div>
    <div class="work-info">
        <h3 class="work-title">项目名称</h3>
        <p class="work-description">项目描述文字</p>
        <a href="#" class="work-link">查看详情</a>
    </div>
</div>
```

3. **视频格式建议**
   - 推荐使用 MP4 格式（H.264编码）
   - 文件大小建议控制在 50MB 以内
   - 时长建议 30秒-3分钟

4. **更换现有视频**
   - 将新视频文件放入此文件夹
   - 在 `index.html` 中更新对应的 `data-video` 属性
   - 刷新网页即可看到新视频

## 注意事项

- 请确保视频文件路径正确
- 视频文件名称不要使用中文或特殊字符
- 建议为每个作品准备一张预览图片
- 视频加载可能需要一些时间，请耐心等待

## 示例视频

此文件夹中包含一个示例视频文件 `demo-video.mp4`，您可以参考其设置方式。

如果您需要添加更多作品，只需复制现有的作品项目代码块并修改相应内容即可。