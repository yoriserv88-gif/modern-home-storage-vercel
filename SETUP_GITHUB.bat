@echo off
echo ========================================
echo GitHub + Vercel 部署设置脚本
echo ========================================
echo.
echo 重要: 如果之前创建过同名仓库，需要先删除
echo 访问: https://github.com/您的用户名?tab=repositories
echo 找到 modern-home-storage-vercel → Settings → Danger Zone
echo 点击 "Delete this repository" 并确认
echo.
echo 或者使用新名称: modern-home-storage-deploy
echo.
echo 请按以下步骤操作:
echo.
echo 1. 确保已安装 GitHub Desktop
echo    下载地址: https://desktop.github.com/
echo.
echo 2. 打开 GitHub Desktop
echo.
echo 3. 点击 "Add" -> "Add Existing Repository"
echo.
echo 4. 选择路径:
echo    e:\kiro-amz\modern-home-storage-vercel
echo.
echo 5. 点击 "Create a Repository"
echo.
echo 6. 设置:
echo    - Name: modern-home-storage-vercel (必须与GitHub仓库名一致)
echo    - Local Path: e:\kiro-amz\modern-home-storage-vercel
echo    - 取消勾选 "Initialize this repository with a README"
echo.
echo 7. 点击 "Create Repository"
echo.
echo 8. 在左侧勾选所有文件
echo.
echo 9. 填写提交信息:
echo    "Initial commit: Modern home storage website"
echo.
echo 10. 点击 "Commit to main"
echo.
echo 11. 点击 "Publish repository"
echo.
echo 完成后，请访问:
echo https://vercel.com/new
echo 导入仓库进行部署
echo.
echo ========================================
pause