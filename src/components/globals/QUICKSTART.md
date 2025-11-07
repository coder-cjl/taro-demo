# Luca UI 快速开始

## 🚀 5分钟上手

### 第一步：导入组件
```tsx
import { 
  LucaButton, 
  LucaColumn, 
  LucaRow, 
  LucaText, 
  LucaContainer, 
  LucaImage 
} from 'src/components/globals'
```

### 第二步：使用组件
```tsx
export default function MyPage() {
  return (
    <LucaContainer padding="16px">
      <LucaColumn itemMargin="16px">
        <LucaText size="20px" weight="bold">欢迎使用 Luca UI</LucaText>
        <LucaButton color="primary" onClick={() => console.log('clicked')}>
          点击我
        </LucaButton>
      </LucaColumn>
    </LucaContainer>
  )
}
```

## 📚 组件速查

| 组件 | 用途 | 常用属性 |
|------|------|---------|
| `<LucaColumn>` | 垂直布局 | `itemMargin`, `alignItems` |
| `<LucaRow>` | 横向布局 | `itemMargin`, `justifyContent` |
| `<LucaText>` | 文字显示 | `size`, `color`, `weight` |
| `<LucaContainer>` | 容器包装 | `padding`, `shadow`, `backgroundColor` |
| `<LucaImage>` | 图片显示 | `src`, `width`, `height`, `round` |
| `<LucaButton>` | 按钮 | `color`, `size`, `onClick` |

## 🎯 常见布局

### 垂直居中
```tsx
<LucaColumn alignItems="center" justifyContent="center">
  <LucaText>内容</LucaText>
</LucaColumn>
```

### 横向两端对齐
```tsx
<LucaRow justifyContent="space-between">
  <LucaText>左侧</LucaText>
  <LucaText>右侧</LucaText>
</LucaRow>
```

### 卡片布局
```tsx
<LucaContainer backgroundColor="white" shadow padding="16px">
  <LucaText>卡片内容</LucaText>
</LucaContainer>
```

---

详细文档请查看 [README.md](./README.md)
