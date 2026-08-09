#!/usr/bin/env python3
"""中国美食站 — 一键构建+部署脚本"""
import os, subprocess, sys

BASE = os.path.dirname(os.path.abspath(__file__))

def run(cmd, cwd=None):
    result = subprocess.run(cmd, shell=True, cwd=cwd or BASE, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  FAIL: {cmd}\n  {result.stderr.strip()}")
    return result.returncode == 0

print("=" * 50)
print("  中国美食站 — 一键构建+部署")
print("=" * 50)

# Step 1: Build
print("\n[1/3] 构建中...")
result = subprocess.run([sys.executable, "build_single.py"], cwd=BASE, capture_output=True, text=True)
print(result.stdout)
if result.returncode != 0:
    print(f"ERROR: {result.stderr}")
    sys.exit(1)

# Step 2: Git commit
print("[2/3] 提交到 Git...")
if not run("git add -A"):
    sys.exit(1)

# Check if there are changes
result = subprocess.run("git diff --cached --quiet", shell=True, cwd=BASE)
if result.returncode == 0:
    print("  无变更，跳过提交")
else:
    import datetime
    msg = f"auto-deploy: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}"
    if not run(f'git commit -m "{msg}"'):
        sys.exit(1)
    print("  提交成功")

# Step 3: Push
print("[3/3] 推送到 GitHub...")
if run("git push"):
    print("\n✅ 部署完成！food.eastculture.top 将在1-2分钟内更新")
else:
    print("\n⚠️ 推送失败(GitHub连接问题)，请稍后手动 git push")
