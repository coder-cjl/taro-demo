# LucaFixedBottom 组件使用指南

## 📱 安全区域适配说明

### 什么是安全区域？

在 iPhone X 及以上机型中，屏幕底部有一个"小黑条"（Home Indicator），如果按钮或内容放在这个区域，会被遮挡或难以点击。安全区域（Safe Area）就是避开这些特殊区域的可用空间。

### 组件如何处理安全区域？

```
┌─────────────────────────┐
│                         │
│   topChildren           │  ← 可滚动内容区
│   (ScrollView)          │
│                         │
├─────────────────────────┤
│                         │
│   bottomChildren        │  ← 按钮内容区（60px）
│                         │
├─────────────────────────┤
│   Safe Area Bottom      │  ← 安全区域（自动计算）
└─────────────────────────┘
```

---

## 🎯 使用方式

### 基础用法（默认启用安全区域）

```typescript
import LucaFixedBottom from 'src/components/views/fixed-bottom'
import LucaButton from 'src/components/globals/button'

function MyPage() {
  return (
    <LucaFixedBottom
      bottomHeight={60}  // 按钮区域高度 60px（不含安全区域）
      topChildren={
        <View>
          <Text>这里是可滚动的内容</Text>
          {/* 长列表... */}
        </View>
      }
      bottomChildren={
        <View style={{ padding: '10px 16px' }}>
          <LucaButton>提交订单</LucaButton>
        </View>
      }
    />
  )
}
```

**效果**：

- iPhone X/11/12 等：底部总高度 = 60px + 34px（安全区域）= 94px
- iPhone 8 及以下：底部总高度 = 60px + 0px = 60px
- 按钮内容始终在安全区域之上，不会被遮挡

---

### 禁用安全区域（不推荐）

```typescript
<LucaFixedBottom
  bottomHeight={60}
  useSafeArea={false}  // 禁用安全区域适配
  topChildren={<View>内容</View>}
  bottomChildren={<Button>提交</Button>}
/>
```

**说明**：只有在特殊情况下才禁用，比如底部已经有其他组件处理了安全区域。

---

### 自定义背景色

```typescript
<LucaFixedBottom
  bottomHeight={60}
  backgroundColor="#f5f5f5"  // 自定义底部背景色
  topChildren={<View>内容</View>}
  bottomChildren={<Button>提交</Button>}
/>
```

---

## 📋 Props 参数

| 参数              | 类型               | 默认值 | 必填 | 说明                           |
| ----------------- | ------------------ | ------ | ---- | ------------------------------ |
| `topChildren`     | `ReactNode`        | -      | ✅   | 顶部可滚动内容                 |
| `bottomChildren`  | `ReactNode`        | -      | ✅   | 底部固定内容（按钮等）         |
| `bottomHeight`    | `number \| string` | -      | ✅   | 底部内容区高度（不含安全区域） |
| `backgroundColor` | `string`           | `#fff` | ❌   | 底部背景色                     |
| `useSafeArea`     | `boolean`          | `true` | ❌   | 是否启用安全区域适配           |

---

## 🎨 常见场景示例

### 1️⃣ 单按钮提交

```typescript
<LucaFixedBottom
  bottomHeight={60}
  topChildren={
    <View style={{ padding: '20px' }}>
      <LucaText>订单详情</LucaText>
      {/* 订单信息... */}
    </View>
  }
  bottomChildren={
    <View style={{ padding: '10px 16px' }}>
      <LucaButton type="primary" block>
        立即支付 ¥299.00
      </LucaButton>
    </View>
  }
/>
```

### 2️⃣ 多按钮布局

```typescript
<LucaFixedBottom
  bottomHeight={70}
  topChildren={<View>商品详情</View>}
  bottomChildren={
    <LucaRow
      style={{
        padding: '10px 16px',
        gap: '10px'
      }}
    >
      <LucaButton style={{ flex: 1 }}>
        加入购物车
      </LucaButton>
      <LucaButton type="primary" style={{ flex: 1 }}>
        立即购买
      </LucaButton>
    </LucaRow>
  }
/>
```

### 3️⃣ 底部带价格信息

```typescript
<LucaFixedBottom
  bottomHeight={80}
  backgroundColor="#fff"
  topChildren={<View>购物车列表</View>}
  bottomChildren={
    <View style={{ padding: '15px 16px' }}>
      <LucaRow
        justifyContent="space-between"
        alignItems="center"
      >
        <View>
          <LucaText size="12px" color="#999">
            共 3 件商品
          </LucaText>
          <LucaText size="18px" color="#ff4444" weight="bold">
            ¥899.00
          </LucaText>
        </View>
        <LucaButton type="primary">
          去结算
        </LucaButton>
      </LucaRow>
    </View>
  }
/>
```

---

## ⚠️ 注意事项

### 1. bottomHeight 设置建议

- **单按钮**：60px
- **多按钮**：70-80px
- **带价格信息**：80-100px
- **不要设置过大**：建议不超过 120px

### 2. 内容区域 padding

在 `bottomChildren` 中记得添加合适的 padding：

```typescript
<View style={{ padding: '10px 16px' }}>
  {/* 按钮内容 */}
</View>
```

### 3. 兼容性

- ✅ 微信小程序（自动获取安全区域）
- ✅ H5（无安全区域，自动降级）
- ✅ 支付宝小程序
- ✅ 其他小程序平台

### 4. 性能优化

组件已做性能优化：

- 使用 `useMemo` 缓存样式计算
- 安全区域高度只在组件挂载时获取一次
- 避免不必要的重渲染

---

## 🔧 高级用法

### 动态调整底部高度

```typescript
function DynamicHeightExample() {
  const [showExtra, setShowExtra] = useState(false)

  return (
    <LucaFixedBottom
      bottomHeight={showExtra ? 120 : 60}  // 动态高度
      topChildren={<View>内容</View>}
      bottomChildren={
        <View>
          <LucaButton onClick={() => setShowExtra(!showExtra)}>
            {showExtra ? '收起' : '展开'}
          </LucaButton>
          {showExtra && <View>额外内容</View>}
        </View>
      }
    />
  )
}
```

### 与 TabBar 配合使用

如果页面有 TabBar，bottomHeight 需要加上 TabBar 高度：

```typescript
const TAB_BAR_HEIGHT = 50

<LucaFixedBottom
  bottomHeight={60 + TAB_BAR_HEIGHT}
  topChildren={<View>内容</View>}
  bottomChildren={
    <View>
      <View style={{ height: '60px' }}>
        {/* 按钮区域 */}
      </View>
      <View style={{ height: `${TAB_BAR_HEIGHT}px` }}>
        {/* TabBar 占位 */}
      </View>
    </View>
  }
/>
```

---

## 📱 不同机型效果预览

| 机型               | 安全区域高度 | 底部总高度（60px 内容） |
| ------------------ | ------------ | ----------------------- |
| iPhone X/XS/11 Pro | 34px         | 94px                    |
| iPhone XR/11/12/13 | 34px         | 94px                    |
| iPhone 8/SE        | 0px          | 60px                    |
| Android（大部分）  | 0px          | 60px                    |

---

## 🎯 总结

✅ **默认启用 `useSafeArea={true}`**，无需手动处理  
✅ **自动适配所有机型**，iPhone X 及以上自动留出安全区域  
✅ **组件内部处理计算**，只需关注内容区高度  
✅ **性能优化**，缓存计算结果，避免重复渲染

**推荐用法**：

```typescript
<LucaFixedBottom
  bottomHeight={60}  // 只设置内容高度
  topChildren={<View>内容</View>}
  bottomChildren={<Button>按钮</Button>}
  // useSafeArea 默认为 true，自动处理
/>
```
