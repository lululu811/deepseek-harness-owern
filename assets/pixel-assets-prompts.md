# 小陈的工作室 — 像素素材生成提示词

给 AI 生图工具的即用提示词集。目标：为 dsh Web UI 生成**像素风品牌资产**，
统一浅色（cream）/ 深色（deep-night-purple）双主题。

> **状态：核心资产已落地（2026-08-16）。** 银渐层小猫主 Logo 已接入
> `favicon.svg`、新会话空状态与侧栏折叠轨；`FishLogo.tsx` 已是像素小猫 mark。
> 本文件保留为**衍生素材与高清版本**的生成指南——按需生成新尺寸、新角度
> 或衍生图标时使用，落位路径见文末「落位表」。

所有素材遵守 Z 家军 pixel 规格：零圆角硬边框、2-3px 实线、像素字体、
蜜金焦点、樱花粉品牌色、步进动画（不做平滑缓动）。

## 设计令牌（生成时作为色板传入）

| 用途 | 浅色主题 | 深色主题 |
|---|---|---|
| 品牌粉（主色/强调） | `#F46EAC` | `#FF7FA6` |
| 蜜金（焦点/警告） | `#FBD38D` | `#FBD38D` |
| 奶油底（页面底色） | `#FDF8FD` | — |
| 深夜紫（页面底色） | — | `#1C1622` |
| 紫罗兰描边 | `#F9A8D4` | `#6B4F96` |
| 次级紫罗兰 | `#FF9EC6` | `#9B7FD1` |
| 像素字体 | Fusion Pixel / VT323 / Press Start 2P | 同左 |

通用负面提示（全部生图任务都加）：`no anti-aliasing, no smooth gradients, no blur, no 3D, no photorealistic, no text watermark`

---

## 1. 主品牌 Logo（动态，三处复用）

**用途**：新会话空状态 34px 字标、侧栏折叠轨 20px、浏览器 favicon。

**设计意象**：CRT 终端屏幕里一只由像素方块拼成的**银渐层小猫咪**，圆脸圆眼短耳，
银白渐变毛色带深色毛尖，胸前的像素吊牌刻着「陈」字，眼睛是翡翠绿像素点。
替换掉原版 harness 的鱼形 logo，读得出「陈」，像素质感一眼可辨。

英文主提示词（生图用）：

```
pixel art logo mark, 32x32 pixel grid, a cute silver chinchilla British
Shorthair kitten built from chunky square pixels, round face with big
emerald-green pixel eyes, small round ears, short muzzle, silver-white fur
with darker silver-tipped pixels, wearing a small pixel tag pendant with
the Chinese character "陈" on its chest, one honey-gold accent pixel in
the eyes, hard pixel edges, flat colors only, brand pink (#FF7FA6) accents
on deep night purple (#1C1622) background, retro arcade game sprite style,
centered, symmetrical, clean, minimal, high contrast, square canvas,
transparent background version and dark background version
```

变体 A（浅色主题版）：把背景换成奶油白 `#FDF8FD`，点缀用 `#F46EAC`，描边用灰蓝 `#9B7FD1`。
变体 B（纯符号版）：去掉 CRT 屏幕，只留猫脸 + 陈字吊牌，用于 16px favicon 缩到最小仍可读。
变体 C（反白版）：深色底上金色小猫（`#FBD38D` 主体 + 粉描边），用于高亮场景。

输出规格：`PNG 透明底，512×512 导出，主体占画布 70%，留 8px 安全边距`。

## 2. 动态动画帧（Web 落地的两个方案，选一个）

**方案 A — sprite sheet（推荐，最像素）**：生 4 帧「呼吸浮动」序列。

```
4-frame sprite sheet animation, each frame 32x32, same pixel silver
chinchilla kitten logo, gentle idle animation: frame 1 base position,
frame 2 lifted 2px with a tiny ear twitch, frame 3 back to base, frame 4
dipped 1px with a blink, pixel-perfect frame alignment, no motion blur
between frames, numbered frames left to right in one row, dark background
(#1C1622)
```

落地：`steps(2, jump-none)` + `steps(4)` 逐帧切换即可，和全站步进动效一致。

**方案 B — 单帧 + CSS 位移动画**：用方案 1 的单帧，CSS `translate` 做 2px 步进 bob
（当前占位字标就是这个做法，直接换掉 `heroMark` 里的「陈」字符即可）。

## 3. 缺失图标：sparkle（工具行 others 占位）

现状：`ui-primitives` 里 tools 行的 sparkle 是手绘近似（README Known Limitations
有记录），设计稿矢量无法导出。

```
16x16 pixel art sparkle icon, four-point star made of chunky pixels,
brand pink (#FF7FA6) with one honey-gold (#FBD38D) accent pixel on the
top point, hard edges, no anti-aliasing, transparent background, crisp
at 16px and 32px
```

输出：PNG 透明底 32×32（16px 2x 缩放）一份，后续替换 `ui-primitives` 的图标组件。

## 4. 次级小猫 mark（侧栏、空状态小图，可选）

保留「猫」基因的独立小 mark，用于不需要文字的场景：

```
16x16 pixel art small silver chinchilla kitten head, round face, two big
emerald-green pixel eyes, small round ears, silver-white fur, brand pink
(#FF7FA6) collar accent, hard square pixels, transparent background,
round-nothing, retro game sprite
```

## 5. 空状态像素装饰（可选加分项）

新会话空状态背景目前是两团高斯模糊光斑，和像素风略冲突，可换成像素点缀：

```
pixel art decorative elements set, sprite sheet 64x64: small retro stars,
a blinking underscore cursor, horizontal scanline rows, tiny 8x8 squares,
limited palette pink (#FF7FA6) gold (#FBD38D) violet (#9B7FD1) on
transparent, evenly spaced in a grid, hard edges, no anti-aliasing
```

落地：切成单元素 PNG 放进 `HeroShell.module.css` 的 `.body` 区域做背景点缀。

---

## 落位表（生成后把文件放这里）

| 素材 | 落位文件 | 替换点 |
|---|---|---|
| 主 Logo（方案 1 或 2） | `apps/web/public/favicon.svg`（转 SVG） | 新会话 `EmptyHero.tsx` 的 `.heroMark`、侧栏 `SidebarRoot.tsx` 的 `.railMark` |
| sprite sheet（方案 2A） | `apps/web/public/logo-idle.png` | 新 CSS 动画引用，替换 `hero-mark-bob` 平移动画 |
| sparkle 图标 | `packages/client/ui-primitives/src/icons/` | 新增像素 sparkle 图标组件 |
| 小猫 mark | `packages/client/ui-primitives/src/FishLogo.tsx` | 组件名暂保留（避免连锁改动），内部 SVG 换成银渐层小猫 mark |
| 像素装饰 | `apps/web/public/hero-decor/` | `HeroShell.module.css` `.body` 背景 |

生成时如有拿不准的方向（logo 意象、配色浓淡、动画幅度），先发一版给我看，
我在代码里对样式和动画参数微调后再定稿。
