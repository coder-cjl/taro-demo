# Luca UI 组件库升级指南

## 🎉 新特性

### 1. 通用样式属性 (BaseStyleProps)

所有组件现在都支持通用样式属性,无需再写 `style` 对象:

```tsx
// ❌ 之前
<LucaText style={{ marginLeft: '12rpx', marginBottom: '8rpx' }}>

// ✅ 现在
<LucaText marginLeft="12rpx" marginBottom="8rpx">
```

**支持的属性:**

- `margin`, `marginX`, `marginY`, `marginTop`, `marginBottom`, `marginLeft`, `marginRight`
- `padding`, `paddingX`, `paddingY`, `paddingTop`, `paddingBottom`, `paddingLeft`, `paddingRight`
- `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`
- `backgroundColor`, `borderRadius`, `border`

**快捷属性:**

```tsx
// marginX = marginLeft + marginRight
<LucaText marginX="24rpx">  // 等同于 marginLeft="24rpx" marginRight="24rpx"

// paddingY = paddingTop + paddingBottom
<LucaContainer paddingY="48rpx">  // 等同于 paddingTop="48rpx" paddingBottom="48rpx"
```

---

### 2. 语义化变体 (Variant)

#### LucaText 变体

```tsx
// ❌ 之前
<LucaText size="48rpx" weight="bold">标题</LucaText>
<LucaText size="32rpx" color="#333">正文</LucaText>

// ✅ 现在
<LucaText variant="h1">标题</LucaText>
<LucaText variant="body" colorScheme="secondary">正文</LucaText>
```

**可用变体:**

- `h1` - 超大标题 (24px, bold)
- `h2` - 大标题 (20px, bold)
- `h3` - 小标题 (18px, medium)
- `body` - 正文 (16px, normal)
- `caption` - 辅助文字 (14px, normal)
- `small` - 小字 (12px, normal)

**颜色方案:**

- `primary` - 主要文字色 (#000)
- `secondary` - 次要文字色 (#333)
- `tertiary` - 三级文字色 (#666)
- `success` - 成功色
- `warning` - 警告色
- `danger` - 危险色

#### LucaContainer 变体

```tsx
// ❌ 之前
<LucaContainer
  backgroundColor="#FFF"
  borderRadius="32rpx"
  padding="28rpx"
  shadow
>

// ✅ 现在
<LucaContainer variant="card">
  内容
</LucaContainer>
```

**可用变体:**

- `default` - 默认(无样式)
- `card` - 卡片样式(白底、圆角、内边距、阴影)
- `section` - 区块样式(灰底、圆角、大内边距)

#### LucaCard 组件

专门的卡片组件:

```tsx
<LucaCard variant="elevated">
  卡片内容
</LucaCard>

<LucaCard variant="outlined" hoverable>
  带悬停效果的卡片
</LucaCard>
```

**可用变体:**

- `default` - 默认卡片
- `outlined` - 描边卡片
- `elevated` - 带阴影卡片
- `filled` - 填充背景卡片

---

### 3. 新增组件

#### LucaInput - 输入框

```tsx
<LucaInput
  value={value}
  placeholder="请输入"
  clearable
  onChange={setValue}
/>

// 带前后缀
<LucaInput
  prefix={<LucaText>￥</LucaText>}
  suffix={<LucaText>元</LucaText>}
  type="number"
/>

// 错误状态
<LucaInput
  error
  errorMessage="手机号格式不正确"
/>

// 变体
<LucaInput variant="filled" size="large" />
```

**Props:**

- `variant`: 'outlined' | 'filled' | 'standard'
- `size`: 'small' | 'medium' | 'large'
- `clearable`: 显示清除按钮
- `prefix/suffix`: 前缀后缀内容
- `error`: 错误状态
- `type`: 'text' | 'number' | 'password' | 'tel' 等

#### LucaList - 列表渲染

```tsx
// ❌ 之前
<>
  <GaintPlanSectionComponent />
  <GaintPlanSectionComponent />
  <GaintPlanSectionComponent />
  <GaintPlanSectionComponent />
</>

// ✅ 现在
<LucaList
  data={sections}
  renderItem={(section, index) => (
    <GaintPlanSectionComponent {...section} />
  )}
  gap="32rpx"
  divider
/>
```

**Props:**

- `data`: 数据数组
- `renderItem`: 渲染函数
- `gap`: 间距
- `direction`: 'column' | 'row'
- `divider`: 显示分割线
- `emptyText`: 空数据提示

#### LucaSpace - 间距容器

```tsx
// 水平间距
<LucaSpace direction="horizontal" size="large">
  <LucaButton>按钮1</LucaButton>
  <LucaButton>按钮2</LucaButton>
  <LucaButton>按钮3</LucaButton>
</LucaSpace>

// 垂直间距,支持换行
<LucaSpace direction="vertical" size={48} wrap>
  {tags.map(tag => <Tag>{tag}</Tag>)}
</LucaSpace>
```

**Props:**

- `direction`: 'horizontal' | 'vertical'
- `size`: 'small' | 'medium' | 'large' | number
- `align`: 'start' | 'center' | 'end' | 'baseline'
- `wrap`: 是否换行

#### LucaDivider - 分割线

```tsx
// 普通分割线
<LucaDivider />

// 虚线
<LucaDivider dashed />

// 带文字
<LucaDivider text="或" textAlign="center" />

// 垂直分割线
<LucaDivider direction="vertical" />
```

---

## 📝 迁移示例

### 示例 1: PingGuToolCellComponent

```tsx
// ❌ 之前
function PingGuToolCellComponent() {
  return (
    <LucaContainer
      width={'312rpx'}
      height={'180rpx'}
      backgroundColor="#FFF4F4"
      borderRadius={'32rpx'}
      padding={'28rpx'}
    >
      <LucaColumn justifyContent="space-between" alignItems="stretch">
        <LucaText size={'32rpx'} color="#1F1F1F">
          HSS评分
        </LucaText>
        <LucaRow style={{ marginTop: '16rpx' }} alignItems="bottom">
          <LucaText size={'48rpx'} weight={'bold'} color="#FF4444">
            差
          </LucaText>
          <LucaText
            size={'32rpx'}
            color="#1F1F1F"
            style={{ marginLeft: '12rpx', marginBottom: '8rpx' }}
          >
            HSS评分
          </LucaText>
        </LucaRow>
      </LucaColumn>
    </LucaContainer>
  )
}

// ✅ 现在(方案1: 使用 BaseStyleProps)
function PingGuToolCellComponent() {
  return (
    <LucaContainer
      width={312}
      height={180}
      backgroundColor="#FFF4F4"
      borderRadius={32}
      padding={28}
    >
      <LucaColumn justifyContent="space-between" alignItems="stretch">
        <LucaText variant="body" color="#1F1F1F">
          HSS评分
        </LucaText>
        <LucaRow marginTop={16} alignItems="bottom">
          <LucaText variant="h1" color="#FF4444">
            差
          </LucaText>
          <LucaText variant="body" color="#1F1F1F" marginLeft={12} marginBottom={8}>
            HSS评分
          </LucaText>
        </LucaRow>
      </LucaColumn>
    </LucaContainer>
  )
}

// ✅ 现在(方案2: 使用 LucaCard)
function PingGuToolCellComponent() {
  return (
    <LucaCard width={312} height={180} backgroundColor="#FFF4F4" variant="default">
      <LucaColumn justifyContent="space-between" alignItems="stretch">
        <LucaText variant="body" color="#1F1F1F">
          HSS评分
        </LucaText>
        <LucaSpace direction="horizontal" size="small" align="end">
          <LucaText variant="h1" color="#FF4444">
            差
          </LucaText>
          <LucaText variant="body" marginBottom={8}>
            HSS评分
          </LucaText>
        </LucaSpace>
      </LucaColumn>
    </LucaCard>
  )
}
```

### 示例 2: GaintPlanComponent

```tsx
// ❌ 之前
function GaintPlanComponent() {
  return (
    <LucaContainer fullWidth padding={'0rpx 48rpx 0rpx 48rpx'}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent />
        <GaintPlanSectionComponent />
        <GaintPlanSectionComponent />
        <GaintPlanSectionComponent />
        <GaintPlanSectionComponent />
      </LucaColumn>
    </LucaContainer>
  )
}

// ✅ 现在
function GaintPlanComponent() {
  const sections = [
    { name: '膝关节', items: [...] },
    { name: '髋关节', items: [...] },
    { name: '肩关节', items: [...] },
    { name: '踝关节', items: [...] },
  ]

  return (
    <LucaContainer fullWidth paddingX={48}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent />
        <LucaList
          data={sections}
          renderItem={(section) => (
            <GaintPlanSectionComponent {...section} />
          )}
        />
      </LucaColumn>
    </LucaContainer>
  )
}
```

---

## 🎯 最佳实践

### 1. 优先使用语义化属性

```tsx
// ✅ 好
<LucaText variant="h2" colorScheme="primary">

// ⚠️ 可以,但不推荐
<LucaText size="48rpx" color="#000">
```

### 2. 使用快捷属性简化代码

```tsx
// ✅ 好
<LucaContainer paddingX={48} paddingY={32}>

// ⚠️ 可以,但啰嗦
<LucaContainer paddingLeft={48} paddingRight={48} paddingTop={32} paddingBottom={32}>
```

### 3. 使用 LucaList 替代重复组件

```tsx
// ✅ 好
<LucaList data={items} renderItem={(item) => <Item {...item} />} />

// ❌ 不好
<Item />
<Item />
<Item />
<Item />
```

### 4. 使用 LucaSpace 统一间距

```tsx
// ✅ 好
<LucaSpace size="large">
  <Button1 />
  <Button2 />
  <Button3 />
</LucaSpace>

// ❌ 不好
<>
  <Button1 style={{ marginRight: '48rpx' }} />
  <Button2 style={{ marginRight: '48rpx' }} />
  <Button3 />
</>
```

---

## 🔄 向下兼容

所有旧代码**100% 兼容**,无需修改:

```tsx
// ✅ 旧代码依然可用
<LucaText size="32rpx" color="#333" style={{ marginLeft: '12rpx' }}>
  文字
</LucaText>

// ✅ 但建议迁移到新写法
<LucaText variant="body" colorScheme="secondary" marginLeft={12}>
  文字
</LucaText>
```

---

## 📚 完整组件列表

| 组件              | 说明     | 新特性                                  |
| ----------------- | -------- | --------------------------------------- |
| **LucaText**      | 文本     | ✅ variant, colorScheme, BaseStyleProps |
| **LucaContainer** | 容器     | ✅ variant, BaseStyleProps              |
| **LucaColumn**    | 垂直布局 | ✅ stretch 支持                         |
| **LucaRow**       | 水平布局 | ✅ stretch 支持                         |
| **LucaCard**      | 卡片     | ✨ 新增                                 |
| **LucaInput**     | 输入框   | ✨ 新增                                 |
| **LucaList**      | 列表     | ✨ 新增                                 |
| **LucaSpace**     | 间距     | ✨ 新增                                 |
| **LucaDivider**   | 分割线   | ✨ 新增                                 |
| LucaButton        | 按钮     | 向下兼容                                |
| LucaImage         | 图片     | 向下兼容                                |
| LucaTextArea      | 文本域   | 向下兼容                                |
| LucaPopup         | 弹窗     | 向下兼容                                |
| LucaEmpty         | 空状态   | 向下兼容                                |
| LucaToast         | 提示     | 向下兼容                                |

---

## 🚀 下一步

建议逐步迁移现有代码:

1. 先在新页面使用新组件和新写法
2. 旧页面在维护时逐步重构
3. 重点使用 `LucaList` 减少重复代码
4. 使用 `variant` 统一视觉风格

Happy Coding! 🎉
