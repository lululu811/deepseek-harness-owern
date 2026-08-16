# Personal Workspace — Publisher Workbench

个人工作台：将「小陈的每日夜报」流水线封装为 dsh `publisher` preset，提供 18 个工具 + 1 个 skill + 3 个 UI 面板。

## 架构概览

```
personal/
├── plugins/
│   ├── publisher-pipeline/     # HOST: 10 个流水线工具 + 2 个 projection
│   ├── publisher-mgmt/         # HOST: 4 个管理工具
│   ├── publisher-backend/      # HOST: 4 个 WeChat 后台工具 + 1 个 projection
│   └── publisher-ui/           # CLIENT: 3 个像素风面板
├── skills/
│   └── publisher-skill/        # SOP 方法论（视角选择、QC 标准、合规检查）
└── presets/
    └── publisher/              # preset 配置（加载所有 4 个插件）
```

## 工具清单（18 个）

### 流水线工具（10 个）— `publisher-pipeline`

| 工具 | 参数 | 作用 |
|---|---|---|
| `pull_zsxq` | `<date> [--hours N]` | 拉取知识星球素材到 `drafts/raw/<date>/` |
| `build_full_md` | `<date>` | 拼接 `output/md/<date>/full.md` |
| `split_articles` | `<date>` | 拆分成 11 篇独立文章 `articles/<slug>.md` |
| `rewrite_viewpoint` | `<date> <viewpoint>` | 用指定视角改写（9 个已注册视角） |
| `qc_viewpoint` | `<date> <viewpoint>` | 6 维度质检（persona/independent/anti_pattern/fidelity/readability/compliance） |
| `deep_dive` | `<date> [--themes N]` | LLM 选深度主题并生成深度解读 |
| `push_to_ima` | `<date>` | 推送到 IMA 知识库 |
| `render_wechat_html` | `<date> <viewpoint>` | 生成精排版 HTML（inline CSS） |
| `publish_to_wechat` | `<date> <viewpoint> [--remote]` | 发布到微信公众号（需 SSH 隧道） |
| `send_feishu_poster` | `<date>` | 发送飞书海报 |

### 管理工具（4 个）— `publisher-mgmt`

| 工具 | 参数 | 作用 |
|---|---|---|
| `nightly_status` | `<date>` | 查看当天流水线状态（文件清单 + QC verdict + 发布状态） |
| `list_viewpoints` | — | 列出 9 个已注册视角（付鹏/常士杉/芒格/塔勒布/Naval/Z 哥/笨总/BOSS 墨/白毛股神） |
| `list_wechat_drafts` | — | 列出 WeChat 草稿箱（stub） |
| `delete_wechat_draft` | `<mediaId>` | 删除 WeChat 草稿（stub） |

### WeChat 后台工具（4 个）— `publisher-backend`

| 工具 | 参数 | 作用 |
|---|---|---|
| `wechat_article_stats` | `<msgId> <refDate>` | 查询文章阅读/分享/在看/收藏数 |
| `wechat_article_comments` | `<msgId> [offset] [limit]` | 列出读者评论 |
| `wechat_data_trends` | `<days>` | 多日趋势分析（日均阅读量、文章拆解、里程碑检测） |
| `wechat_top_articles` | `<beginDate> <endDate> [limit]` | 按阅读量排序 Top N 文章 |

## Projections（3 个）

| Key | 类型 | 触发工具 |
|---|---|---|
| `publisher.status` | `PublisherStatus \| null` | `nightly_status`, `qc_viewpoint`, `publish_to_wechat` |
| `publisher.articles` | `PublisherArticle[] \| null` | `split_articles` |
| `publisher.stats` | `PublisherStats \| null` | `wechat_data_trends` |

Projection 是 host 计算的 push-model 状态：工具执行后，`tool/result` event 进入 session log，projection 单元 fold 这个 event，计算新 state，通过 `session/projection` frame 推到 client。UI 面板通过 `useProjection(key)` 读取 state，自动 re-render。

## Skill — 夜报 SOP

`publisher-skill/SKILL.md` 包含：

### 视角选择指南
- **付鹏**（默认）— 宏观事件驱动，齿轮/缩圈/传导链框架
- **常士杉** — A 股实操，3221 止盈/温度系统
- **芒格** — 逆向思考，认知偏误/激励机制
- **塔勒布** — 反脆弱，风险管理/黑天鹅
- **Naval** — 长期思维模型，杠杆/特定知识
- **Z 哥/万千** — 周期/稀缺性，板块轮动
- **笨总** — 景气投资，A 股三段式/四维选股
- **BOSS 墨** — 盈亏比，交易心理/执行纪律
- **白毛股神** — AI 供应链，科技赛道翻译版

### QC 六维度
1. **persona_fidelity** — 人设术语/框架/语气一致性
2. **independent_judgment** — 独立观点占比（**最核心**）
3. **anti_pattern** — 无"作为 XX 我"元叙事/无纯复述
4. **fidelity** — 未编造 source 中没有的关键事实
5. **readability** — 篇幅 2000-3500 字，公众号友好
6. **compliance** — 未泄露来源/知识星球（规避 45166 下架）

判词规则：
- **PASS**: overall >= 7.5 且无维度 < 6
- **WARN**: overall >= 6.4 但某维度 < 6
- **FAIL**: overall < 6.4 或任一维度 < 4

### 18 项发布前合规检查
内容合规（4 项）+ 格式合规（4 项）+ 视角合规（3 项）+ 技术合规（4 项）+ 发布合规（3 项）

### 数据解读
- WeChat 阅读量基准：正常 800-2000，优秀 > 3000，异常 < 500
- 关键指标：readCount（标题+封面+时间）, shareCount（内容质量）, likeCount（共鸣度）, favoriteCount（实用性）
- 发布时间优化：最佳 21:30-22:00，次佳 12:00-13:00，避免 08:00-09:00 和 23:30+

### 自动调度
发布后注册 24h 定时任务：agent 自动调用 `wechat_article_stats` 获取数据，分析后向用户报告。使用 dsh `schedule` 系统，agent 编排，工具执行。

## 标准工作流

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
10. schedule_after 24h "24h 数据报告：调用 wechat_article_stats 检查今天发布的文章数据，与用户分享阅读量、分享量、在看量等关键指标，并对比历史基准给出解读"
11. send_feishu_poster <date>         # 发飞书海报
```

## UI 面板（3 个）— 像素风 lattice 视觉语言

所有面板延续 dsh web UI 的 `color-mix` 半透明 + 16px 方格 lattice 风格：

### StatusBoard
- 7 步 pipeline 横向进度条（像素方块）
- QC verdict 像素印章（PASS 绿 / WARN 黄 / FAIL 红）
- 显示在右侧 `details` 列

### ArticleList
- 11 张 lattice 背景卡片
- 视角像素头像小图标（付鹏/常士杉/...）
- 操作按钮：换视角重写、发布
- 作为新的 view tab 出现在 center column

### StatsChart
- 折线：最近 7 天阅读量趋势
- 柱状：今日 11 篇文章阅读量对比
- 像素化数据点 + 阅读量里程碑徽章（破 1k / 5k / 1w）
- 使用 dataviz skill 的 7 步程序验证调色板

### 数据流
```
用户点按钮 → panel 调 session.prompt() → agent 收到 prompt → agent 调工具 → tool/result event → projection fold → state 推到 client → useProjection() re-render
```

**关键约束**：UI 不能直接调工具，必须通过 agent 编排。所有按钮点击 → `session.prompt()` → agent 调工具 → projection 更新 → UI re-render。

## 扩展指南

### 添加新视角
1. 在 `/Users/chenlei/001_project/小陈的每日夜报/scripts/rewrite_viewpoint.py` 的 `PROMPTS` dict 中添加新视角
2. 在 `publisher-mgmt/src/index.ts` 的 `list_viewpoints` 工具中更新硬编码列表
3. 在 `publisher-skill/SKILL.md` 中补充视角选择指南

### 添加新 datacube endpoint
1. 在 `publisher-backend/src/wechat-datacube.ts` 中实现 API 调用
2. 在 `publisher-backend/src/index.ts` 中注册新工具（使用 `defineTool()`）
3. 如需 projection，在 `types.ts` 中扩展 `SessionProjectionMap`，在 `index.ts` 中注册

### 修改 QC 阈值
1. 在 `qc_viewpoint.py` 中调整 `--threshold` 和 `--min-dim` 默认值
2. 在 `publisher-skill/SKILL.md` 中更新判词规则说明

## 凭证配置

WeChat API 凭证从以下位置读取（优先级：文件 > config）：
- `~/.config/wechat/app_id`
- `~/.config/wechat/app_secret`

SSH 隧道：
- Host: `43.155.210.74`
- User: `root`
- SOCKS5 端口: `1080`

## 构建与验证

```bash
# 构建所有 personal 插件
pnpm --filter "@personal/*" run build

# 安装 preset
cp -r personal/presets/publisher ~/.dsh/.agent-presets/publisher

# 启动 dsh web，选择 publisher preset
dsh --profile web

# 验证工具可用
nightly_status 2026-08-15
list_viewpoints
```

## 故障排查

### SSH 隧道断开
```bash
ps aux | grep "ssh -N -D 1080"
ssh -N -D 1080 root@43.155.210.74 &
```

### WeChat access_token 失效
`wechat-datacube.ts` 的 `clearTokenCache()` 会在下次调用时重新获取（7200s TTL）。

### QC 持续 FAIL
1. 检查 prompt 文件是否完整（`prompts/<viewpoint>.md`）
2. 降低 threshold（`--threshold 6.5 --min-dim 5`）
3. 人工润色后重新 QC

## 设计决策

1. **4 个插件包按职责拆分**：pipeline（流水线）、mgmt（管理）、backend（WeChat 后台）、ui（面板）
2. **Host/Client 分离**：前 3 个是 Host 插件（tsconfig.host.json），ui 是 Client 插件（tsconfig.client.json）
3. **SSH 隧道复用**：`tunnel.ts` 管理隧道生命周期，wechat-backend 工具共用同一隧道
4. **凭证文件优先**：`~/.config/wechat/*` 优先于 config，便于本地开发
5. **Personal 层独立**：`personal/` 目录不在 `packages/` 内，不是上游材料
6. **UI 通过 projection 读状态**：不直接调工具，符合 dsh 架构
7. **像素风 lattice 视觉语言**：延续 dsh web UI 现有风格

## 待办（Follow-up）

- [ ] 凭证统一到 `~/.dsh/credentials.toml`
- [ ] 从 `mmx` 迁移到 dsh-native LLM
- [ ] content-factory 集成（平行项目）
- [ ] research preset + 知识库层（独立计划）
- [ ] Web UI preset picker 自定义（使用现有 picker，自定义 UX 是后续工作）
- [ ] 多语言支持（当前仅中文）
- [ ] 将 `details` slot 从 `single` 改为 `chain`（当前用 priority override，invasive 变更是后续工作）
