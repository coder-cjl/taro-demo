# Luca UI 样式系统使用指南

## 📦 为什么选择 CSS-in-JS 而非 Less?

### ✅ 当前方案优势

1. **类型安全**: TypeScript 智能提示,减少拼写错误
2. **组件化**: 样式与组件紧密结合,更易维护
3. **动态样式**: 轻松根据 props 变化样式
4. **无样式冲突**: 避免全局 CSS 污染
5. **小程序友好**: Taro 对 inline style 支持更好

### ⚠️ Less 方案的局限

1. **类型检查弱**: 没有智能提示,容易拼错类名
2. **样式隔离难**: 容易出现全局污染
3. **动态样式麻烦**: 需要大量条件类名
4. **小程序限制**: 部分 Less 特性不支持

---

## 🎨 新的样式系统

### 1. 主题系统 (`theme.ts`)

提供统一的设计规范:

```tsx
import theme from 'src/styles/theme'

// 使用主题颜色
<LucaText color={theme.colors.primary}>主色文字</LucaText>

// 使用主题字号
<LucaText size={theme.fontSize.lg}>大标题</LucaText>

// 使用主题间距
<LucaColumn itemMargin={theme.spacing.lg}>
  <LucaText>内容</LucaText>
</LucaColumn>
```

**主题配置**:
```tsx
theme.colors      // 颜色系统
theme.fontSize    // 字体大小
theme.spacing     // 间距系统
theme.borderRadius // 圆角
theme.shadow      // 阴影
theme.fontWeight  // 字重
```

---

### 2. 样式工具函数 (`style-helpers.ts`)

快速生成常用样式:

```tsx
import { ellipsis, shadow, rounded, flexCenter } from 'src/styles/style-helpers'

// 文字省略
<LucaText style={ellipsis(2)}>多行省略文字</LucaText>

// 阴影 + 圆角
<LucaContainer style={{ ...shadow('md'), ...rounded('lg') }}>
  <LucaText>卡片内容</LucaText>
</LucaContainer>

// Flex 居中
<View style={flexCenter()}>
  <LucaText>居中内容</LucaText>
</View>
```

**工具函数列表**:
- `toPx()` - 转换为 px
- `flexCenter()` - Flex 居中
- `ellipsis()` - 文字省略
- `shadow()` - 阴影
- `rounded()` - 圆角
- `spacing()` - 间距
- `hairline()` - 1px 边框
- `combineStyles()` - 组合样式
- `conditionalStyle()` - 条件样式

---

## 💡 最佳实践

### ✅ 推荐做法

#### 1. 使用主题变量
```tsx
// ✅ 好 - 统一主题
<LucaText color={theme.colors.textPrimary} size={theme.fontSize.md}>
  文字
</LucaText>

// ❌ 差 - 硬编码
<LucaText color="#333" size="16px">
  文字
</LucaText>
```

#### 2. 使用工具函数
```tsx
// ✅ 好 - 复用工具
<LucaText style={ellipsis(2)}>长文本</LucaText>

// ❌ 差 - 重复代码
<LucaText style={{
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
}}>
  长文本
</LucaText>
```

#### 3. 组件 Props 优先于 Style
```tsx
// ✅ 好 - 使用组件 API
<LucaText size={theme.fontSize.lg} color={theme.colors.primary}>
  标题
</LucaText>

// ❌ 差 - 直接写样式
<LucaText style={{ fontSize: '18px', color: '#1890ff' }}>
  标题
</LucaText>
```

#### 4. 性能优化 - 使用 useMemo
```tsx
// ✅ 好 - 缓存样式对象
const containerStyle = useMemo(() => ({
  ...shadow('md'),
  ...rounded('lg'),
  padding: theme.spacing.lg
}), [])

<LucaContainer style={containerStyle}>内容</LucaContainer>

// ❌ 差 - 每次渲染都创建新对象
<LucaContainer style={{
  ...shadow('md'),
  ...rounded('lg'),
  padding: theme.spacing.lg
}}>内容</LucaContainer>
```

---

## 🔄 迁移指南

### 从 Less 迁移到当前方案

#### Before (Less)
```less
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #000;
  }
  
  .content {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
  }
}
```

#### After (CSS-in-JS)
```tsx
<LucaContainer 
  backgroundColor={theme.colors.bgPrimary}
  borderRadius={theme.borderRadius.lg}
  shadow
  padding={theme.spacing.lg}
>
  <LucaColumn itemMargin={theme.spacing.sm}>
    <LucaText 
      size={theme.fontSize.lg} 
      weight={theme.fontWeight.bold}
      color={theme.colors.textPrimary}
    >
      标题
    </LucaText>
    <LucaText 
      size={theme.fontSize.sm}
      color={theme.colors.textTertiary}
    >
      内容
    </LucaText>
  </LucaColumn>
</LucaContainer>
```

---

## 🎯 实战案例

### 案例1: 商品卡片

```tsx
import theme from 'src/styles/theme'
import { shadow, rounded } from 'src/styles/style-helpers'
import { useMemo } from 'react'

export default function ProductCard({ product }) {
  const cardStyle = useMemo(() => ({
    ...shadow('md'),
    ...rounded('lg'),
  }), [])

  return (
    <LucaContainer 
      backgroundColor={theme.colors.bgPrimary}
      padding={theme.spacing.lg}
      style={cardStyle}
    >
      <LucaColumn itemMargin={theme.spacing.md}>
        <LucaImage 
          src={product.image}
          width="100%"
          height="180px"
          borderRadius={theme.borderRadius.md}
        />
        <LucaText 
          size={theme.fontSize.lg}
          weight={theme.fontWeight.bold}
        >
          {product.name}
        </LucaText>
        <LucaRow justifyContent="space-between">
          <LucaText 
            size={theme.fontSize.xl}
            color={theme.colors.danger}
            weight={theme.fontWeight.bold}
          >
            ¥{product.price}
          </LucaText>
          <LucaButton color="primary">购买</LucaButton>
        </LucaRow>
      </LucaColumn>
    </LucaContainer>
  )
}
```

### 案例2: 主题切换

```tsx
// 定义多套主题
const lightTheme = {
  colors: {
    bg: '#ffffff',
    text: '#000000',
  }
}

const darkTheme = {
  colors: {
    bg: '#1a1a1a',
    text: '#ffffff',
  }
}

// 使用主题
const [isDark, setIsDark] = useState(false)
const currentTheme = isDark ? darkTheme : lightTheme

<LucaContainer 
  backgroundColor={currentTheme.colors.bg}
  padding={theme.spacing.lg}
>
  <LucaText color={currentTheme.colors.text}>
    主题切换示例
  </LucaText>
</LucaContainer>
```

---

## 🆚 对比总结

| 特性 | CSS-in-JS (当前方案) | Less |
|------|---------------------|------|
| 类型安全 | ✅ 完整支持 | ❌ 无 |
| 智能提示 | ✅ 自动提示 | ❌ 需插件 |
| 动态样式 | ✅ 轻松实现 | ⚠️ 需多个类名 |
| 样式隔离 | ✅ 天然隔离 | ⚠️ 需 CSS Modules |
| 主题切换 | ✅ JS 变量 | ✅ Less 变量 |
| 性能 | ⚠️ 需优化 | ✅ 编译时处理 |
| 学习成本 | ⚠️ 中等 | ✅ 低 |
| 小程序支持 | ✅ 完美 | ⚠️ 部分限制 |

---

## 📚 扩展阅读

- [主题配置文档](./theme.ts)
- [工具函数文档](./style-helpers.ts)
- [组件库文档](../components/globals/README.md)

---

**结论**: 对于小程序项目,当前的 CSS-in-JS 方案比 Less 更合适 ✅
