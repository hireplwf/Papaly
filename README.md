# MyPapaly - Static Bookmark Panel (Cloudflare Pages)

## 快速部署
1. 新建 GitHub 仓库，把本 repo 的文件 push 到 `main` 分支。
2. 登录 Cloudflare → Pages → Create a project → 选择刚才的仓库。
   - Framework preset: **None**
   - Build command: **(leave empty)**
   - Build output directory: `.` (根目录)
3. Deploy！

## 更新书签
- 编辑 `bookmarks.json` 并 push -> Cloudflare Pages 自动重新部署并刷新页面。

## 可选：与 Floccus 联动
- 在 Floccus 中选择 Git 同步到本仓库（建议私有仓库）。
- 配置后，每次浏览器同步会把书签 push 到仓库；你可以用 GitHub Action 转换为本模板的 `bookmarks.json`（若需要我可提供）。

## 许可证
MIT
