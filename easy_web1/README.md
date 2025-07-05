# 数据可视化展示平台

本项目是一个轻量级的前端+后端（主要前端，后端就只有登录注册和日志记录）的数据可视化平台，
支持用户上传数据文件并进行图表分析与交互操作，具有较强的扩展性与用户友好性。

## 📌 项目简介

该平台集成了如下核心模块功能：

- ✅ 登录 / 注册（支持用户身份验证）
- 📊 双列数据图表展示（折线图、柱状图、饼图等）
- 📈 多列数据图表展示（支持多维字段选择）
- 🔁 文件格式转换（CSV ⇄ JSON）
- 📑 简易数据分析（字段统计与筛选）
- 🧾 操作日志记录与展示（支持数据库写入）
- 🧍 用户中心（查看基本信息与偏好）
- 💡 使用帮助页面（图文引导与FAQ）
- 💬 用户反馈模块（提交建议/问题）

## 🔧 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | HTML5, CSS3, JavaScript (ES6), ECharts, PapaParse |
| 后端 | Node.js + Express |
| 数据库 | MySQL |
| 部署方式 | 本地运行，支持局域网部署 |

## 📁 项目结构

project-root/
├── public/
│ ├──data //测试功能使用的数据文件夹
│ ├──image //存放图像资源
│ ├──js //存放前端脚本
│ ├──node_modules // Node.js 依赖包
│ ├──package-lock.json // 依赖锁定文件
│ ├──package.json // Node.js 项目配置文件
│ ├── index.html // 项目首页（介绍 + 登录注册入口）
│ ├── dashboard.html // 模块选择页面
│ ├── dualview.html // 双列图表页面
│ ├── multiview.html // 多列图表页面
│ ├── convert.html // 格式转换模块
│ ├── simple_analysis.html // 简易分析模块
│ ├── log.html // 操作日志页面
│ ├── help.html // 使用帮助页面
│ ├── feedback.html // 用户反馈页面
│ ├── user_center.html // 用户个人中心
│ ├── server.js // Node.js 后端入口文件
│ └── README.md

### 安装依赖
```bash
npm install express mysql2 cors body-parser
```

### 启动服务
```bash
node server.js
运行   home.html
```

💡 开发者说明
默认用户名保存在 localStorage
所有图表由 ECharts 动态渲染
支持 token 登录验证（可拓展为 JWT）

📮 联系方式
若您在使用过程中有任何问题或建议，欢迎通过邮箱联系开发者：
📧fangjk183@gmail.com

