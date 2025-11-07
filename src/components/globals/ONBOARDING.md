# 📦 Luca UI 组件库 - 开发者对接指南

> 面向开发团队的快速对接文档

## 📋 目录结构

```
src/components/globals/
├── index.ts              # 统一导出文件
├── button.tsx            # 按钮组件
├── column.tsx            # 垂直布局组件
├── row.tsx               # 横向布局组件
├── text.tsx              # 文字组件
├── container.tsx         # 容器组件
├── image.tsx             # 图片组件
├── example.tsx           # 示例页面
├── README.md             # 详细文档
├── QUICKSTART.md         # 快速开始
├── CHEATSHEET.md         # 速查表
└── ONBOARDING.md         # 本文件
```

---

## 🚀 快速开始（3 步）

### 1️⃣ 导入组件
```tsx
import { LucaButton, LucaText, LucaColumn } from 'src/components/globals'
```

### 2️⃣ 使用组件
```tsx
<LucaColumn itemMargin="16px">
  <LucaText size="20px" weight="bold">标题</LucaText>
  <LucaButton color="primary">按钮</LucaButton>
</LucaColumn>
```

### 3️⃣ 完成！ ✅

---

## 📚 必读文档

### 新手必看
1. **[QUICKSTART.md](./QUICKSTART.md)** - 5分钟快速上手
2. **[CHEATSHEET.md](./CHEATSHEET.md)** - 组件速查表（建议打印）

### 进阶学习
3. **[README.md](./README.md)** - 完整 API 文档
4. **[example.tsx](./example.tsx)** - 实战示例代码

---

## 🎯 核心概念

### 1. 组件分类

| 类别 | 组件 | 用途 |
|------|------|------|
| **布局** | LucaColumn, LucaRow, LucaContainer | 页面结构 |
| **内容** | LucaText, LucaImage | 内容展示 |
| **交互** | LucaButton | 用户操作 |

### 2. 设计原则

✅ **组合优于配置** - 通过组合简单组件构建复杂 UI  
✅ **属性优于样式** - 优先使用组件属性而非 style  
✅ **类型安全** - 完整的 TypeScript 支持  
✅ **灵活扩展** - 所有组件支持 style 覆盖

### 3. 命名规范

- 所有组件以 `Luca` 开头
- 使用驼峰命名法（PascalCase）
- 属性名使用小驼峰（camelCase）

---

## 💡 最佳实践

### ✅ 推荐写法

```tsx
// ✅ 使用组件属性
<LucaText size="16px" color="#333" weight="bold">
  标题
</LucaText>

// ✅ 使用 itemMargin 控制间隔
<LucaColumn itemMargin="16px">
  <LucaText>项目1</LucaText>
  <LucaText>项目2</LucaText>
</LucaColumn>

// ✅ 组件组合
<LucaContainer backgroundColor="white" shadow>
  <LucaColumn itemMargin="12px">
    <LucaText>内容</LucaText>
  </LucaColumn>
</LucaContainer>
```

### ❌ 不推荐写法

```tsx
// ❌ 直接写样式（除非必要）
<View style={{ fontSize: '16px', color: '#333' }}>
  标题
</View>

// ❌ 给每个子元素加 margin
<View>
  <View style={{ marginBottom: '16px' }}>项目1</View>
  <View style={{ marginBottom: '16px' }}>项目2</View>
</View>

// ❌ 过度嵌套
<View>
  <View>
    <View>
      <Text>内容</Text>
    </View>
  </View>
</View>
```

---

## 🎨 常见场景

### 场景1：列表页面
```tsx
<LucaContainer backgroundColor="#f5f5f5" padding="0">
  <LucaColumn itemMargin="12px" style={{ padding: '16px' }}>
    {list.map(item => (
      <LucaContainer key={item.id} backgroundColor="white" shadow>
        <LucaRow justifyContent="space-between" style={{ padding: '16px' }}>
          <LucaText>{item.title}</LucaText>
          <LucaText color="#999">›</LucaText>
        </LucaRow>
      </LucaContainer>
    ))}
  </LucaColumn>
</LucaContainer>
```

### 场景2：详情页面
```tsx
<LucaColumn itemMargin="16px" style={{ padding: '16px' }}>
  <LucaImage src={detail.cover} width="100%" height="200px" />
  <LucaText size="20px" weight="bold">{detail.title}</LucaText>
  <LucaText size="14px" color="#666">{detail.content}</LucaText>
  <LucaButton color="primary" block onClick={handleSubmit}>
    提交
  </LucaButton>
</LucaColumn>
```

### 场景3：表单页面
```tsx
<LucaContainer backgroundColor="white" padding="20px">
  <LucaColumn itemMargin="16px">
    <Input placeholder="用户名" />
    <Input placeholder="密码" type="password" />
    <LucaButton color="primary" size="large">登录</LucaButton>
  </LucaColumn>
</LucaContainer>
```

---

## 🔧 开发规范

### 1. 导入规范
```tsx
// ✅ 使用统一导出
import { LucaButton, LucaText } from 'src/components/globals'

// ❌ 分别导入
import LucaButton from 'src/components/globals/button'
import LucaText from 'src/components/globals/text'
```

### 2. 间距规范
使用 4 的倍数：
```tsx
itemMargin="4px"   // 超小间距
itemMargin="8px"   // 小间距
itemMargin="12px"  // 中间距
itemMargin="16px"  // 标准间距（推荐）
itemMargin="20px"  // 大间距
itemMargin="24px"  // 超大间距
```

### 3. 字体规范
```tsx
size="12px"   // 辅助文字
size="14px"   // 正文（推荐）
size="16px"   // 小标题
size="18px"   // 标题
size="20px"   // 大标题
```

### 4. 颜色规范
```tsx
color="#000"      // 主标题
color="#333"      // 正文
color="#666"      // 次要文字
color="#999"      // 辅助文字
color="red"       // 强调/价格
color="blue"      // 链接
```

---

## 🐛 常见问题

### Q1: 组件没有提示？
**A**: 确保导入路径正确，TypeScript 会自动提供类型提示。

### Q2: 样式不生效？
**A**: 检查 style 属性是否在最后，后面的 style 会覆盖前面的。

### Q3: 间距不对？
**A**: 使用 `itemMargin` 而不是给每个子元素加 margin。

### Q4: 组件报错？
**A**: 检查必填属性（如 LucaImage 的 src）是否提供。

### Q5: 如何自定义组件？
**A**: 可以基于现有组件封装，或直接使用 style 属性覆盖。

---

## 📞 技术支持

### 遇到问题？

1. **查看文档** - README.md 有详细说明
2. **参考示例** - example.tsx 有实战代码
3. **查看源码** - 组件代码简洁易懂
4. **联系团队** - 无法解决时联系开发团队

### 提供反馈

- 组件缺陷 → 提交 Bug
- 功能建议 → 提交需求
- 文档问题 → 提交改进建议

---

## ✅ 上手检查清单

- [ ] 阅读 QUICKSTART.md
- [ ] 查看 example.tsx 示例
- [ ] 打印 CHEATSHEET.md 速查表
- [ ] 在自己的页面中使用 3 个以上组件
- [ ] 理解组件组合原则
- [ ] 掌握常用间距和字体规范

**完成以上内容，你就可以熟练使用 Luca UI 了！** 🎉

---

## 📈 进阶学习

### 想要深入了解？

1. 学习组件源码实现
2. 了解 Taro 组件化最佳实践
3. 掌握 TypeScript 类型定义
4. 研究组件性能优化

---

**版本**: v1.0.0  
**更新日期**: 2025-11-07  
**维护团队**: Luca 开发组

🎯 **现在就开始使用 Luca UI，提升开发效率！**
