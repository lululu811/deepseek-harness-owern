---
name: publisher-skill
description: 小陈的每日夜报 SOP — 视角选择、质量标准、合规检查、数据解读
whenToUse: Use when orchestrating the nightly report pipeline, evaluating viewpoint rewrites, interpreting WeChat article stats, or making publish decisions.
---

# 夜报工作流方法论

## 视角选择

9 个已注册视角，按使用场景分类：

### 宏观-交易派
- **付鹏 (fupeng)** — 默认视角。齿轮/缩圈/传导链框架。适合宏观事件驱动的市场解读。温度 0.7，max_tokens 16000（饱满版）。
- **Z 哥/万千 (zettaranc)** — 少妇战法/周期/稀缺性。适合板块轮动和周期性机会。

### 价值投资派
- **芒格 (munger)** — 逆向思考/认知偏误/激励机制。适合反思市场共识和.behavioral biases。
- **塔勒布 (taleb)** — 反脆弱/Skin in the Game/林迪效应。适合风险管理和黑天鹅事件。
- **Naval** — 杠杆/特定知识/重新定义术。适合长期思维模型和创业视角。

### A 股实战派
- **常士杉/三哥 (changshishan)** — 私募一哥，3221 止盈/温度系统/实战派。温度 0.75（更生动），max_tokens 16000。适合 A 股实操和止盈策略。
- **笨总 (benben)** — 景气投资/A 股三段式/四维选股。适合景气度追踪和选股逻辑。

### 另类视角
- **BOSS 墨 (boss-mo)** — 盈亏比/刻舟求剑/做法大于看法。适合交易心理和执行纪律。
- **白毛股神 (serenity)** — AI 供应链瓶颈/A 股翻译版。适合科技赛道和 AI 产业链。

**选择原则**：
1. 默认付鹏（覆盖面最广）
2. 重大风险事件 → 塔勒布
3. A 股实操 → 常士杉或笨总
4. 反思共识 → 芒格
5. 科技/AI → serenity

## QC 六维度

质检器 `qc_viewpoint.py` 按 6 维度打分（每项 0-10）：

1. **persona_fidelity** 人格一致性 — 是否用上了人设的术语/框架/语气
2. **independent_judgment** 独立观点 — 是否对人设做重新解读，而非研报翻译（**最核心**）
3. **anti_pattern** 反模式规避 — 无"作为 XX 我"元叙事/无纯复述/无过度结构化
4. **fidelity** 信息保真 — 未编造 source 中没有的关键事实
5. **readability** 可读性与结构 — 篇幅/节奏/公众号友好度（2000-3500 字为佳）
6. **compliance** 原创合规 — 未泄露 乐晴/知识星球/来源/转载（规避 45166 下架）

**判词规则**：
- **PASS**: overall >= 7.5 且 无维度 < 6
- **WARN**: overall >= 6.4 但某维度 < 6（或有明显短板）
- **FAIL**: overall < 6.4 或 任一维度 < 4

**常见问题修复**：
- independent_judgment < 6 → 加更多主观判断，减少研报复述
- anti_pattern < 6 → 删掉"作为 XX 视角"开头，减少分点罗列
- compliance < 6 → 删掉"乐晴""知识星球"等字样

## 发布前合规

18 项检查（发布前必须全部通过）：

### 内容合规
1. ✅ 无"乐晴""知识星球""来源""转载"字样
2. ✅ 无原文大段复制（改写幅度 > 60%）
3. ✅ 无具体股票代码推荐（可谈板块/逻辑）
4. ✅ 无收益承诺或预测性语言（"将涨""必跌"）

### 格式合规
5. ✅ 篇幅 2000-3500 字（公众号友好）
6. ✅ 无 XML 标签残留（`<e type="hashtag"/>` 等）
7. ✅ 标题用 `#` 开头（ baobyu 识别为文章标题）
8. ✅ 图片路径 `./assets/x.png`（相对路径，baobyu 自动上传）

### 视角合规
9. ✅ 人设术语使用正确（付鹏的"齿轮"、常士杉的"温度"）
10. ✅ 无跨视角混用（付鹏文章不出现芒格术语）
11. ✅ 独立观点占比 > 40%（非纯复述研报）

### 技术合规
12. ✅ full.md 存在且非空
13. ✅ 视角 prompt 文件存在（prompts/<viewpoint>.md）
14. ✅ QC verdict = PASS 或 WARN（FAIL 禁止发布）
15. ✅ 封面图存在（output/images/<date>/cover-*.png）

### 发布合规
16. ✅ SSH 隧道正常（`ssh -N -D 1080 root@43.155.210.74`）
17. ✅ WeChat access_token 有效（7200s TTL）
18. ✅ baobyu 已登录（`run-baoyu-publish.sh` 可执行）

## 数据解读

### WeChat 阅读量基准

- **正常范围**: 800-2000 reads（粉丝基数决定）
- **优秀**: > 3000 reads（破圈传播）
- **异常低**: < 500 reads（标题/封面/发布时间问题）

### 关键指标解读

- **readCount** 阅读量 — 标题 + 封面 + 发布时间决定
- **shareCount** 分享量 — 内容质量决定（分享率 > 5% 为佳）
- **likeCount** 在看量 — 共鸣度决定（在看率 > 2% 为佳）
- **favoriteCount** 收藏量 — 实用性决定（收藏率 > 1% 为佳）

### 趋势分析

- **7 天滑动平均** — 平滑周末/节假日波动
- **里程碑检测** — 破 1k / 5k / 1w 时记录（成就激励）
- **异常预警** — 阅读量突降 > 50% 时检查：
  - 是否被限流（敏感词）
  - 发布时间是否过晚（> 23:00）
  - 标题是否过于晦涩

### 发布时间优化

- **最佳**: 21:30-22:00（用户睡前刷手机）
- **次佳**: 12:00-13:00（午休时间）
- **避免**: 08:00-09:00（通勤忙碌）、23:30+（太晚）

## 工作流编排

### 标准流程（每日）

```
1. nightly_status <date>              # 检查当天状态
2. pull_zsxq <date>                   # 拉取知识星球素材
3. build_full_md <date>               # 拼接 full.md
4. split_articles <date>              # 拆分成单篇文章
5. rewrite_viewpoint <date> fupeng    # 用付鹏视角改写
6. qc_viewpoint <date> fupeng         # 质检
7. if verdict == FAIL:
     - 检查 fixes，调整 prompt 或手动编辑
     - 重新改写或人工润色
8. render_wechat_html <date> fupeng   # 生成精排版 HTML
9. publish_to_wechat <date> fupeng --remote  # 发布
10. send_feishu_poster <date>         # 发飞书海报
```

### 多视角流程

```
1-4. 同上
5. for viewpoint in [fupeng, changshishan, munger]:
     rewrite_viewpoint <date> <viewpoint>
     qc_viewpoint <date> <viewpoint>
6. 选择 QC 最高的视角发布（或发多篇）
```

### 深度解读流程

```
1-4. 同上
5. deep_dive <date> --themes 3        # LLM 选人 + 生成深度解读
6. 检查 output/md/<date>/deep-dive/ 下的产物
7. 选择最佳深度解读发布（或作为补充材料）
```

## 故障排查

### SSH 隧道断开
```bash
# 检查隧道
ps aux | grep "ssh -N -D 1080"

# 重建隧道
ssh -N -D 1080 root@43.155.210.74 &
```

### WeChat access_token 失效
```bash
# 清除缓存（自动重新获取）
# 代码中 clearTokenCache() 会在下次调用时重新获取
```

### QC 持续 FAIL
1. 检查 prompt 文件是否完整（prompts/<viewpoint>.md）
2. 降低 threshold（`--threshold 6.5 --min-dim 5`）
3. 人工润色后重新 QC
4. 最后手段：手动编辑后跳过 QC（不推荐）

### 发布失败
1. 检查 baobyu 登录状态
2. 检查 HTML 文件大小（> 5MB 会失败）
3. 检查封面图是否存在
4. 查看 `run-baoyu-publish.sh` 的 stderr 输出
