# Luca UI 组件库使用文档

> 基于 Taro + React + NutUI 的小程序通用组件库

## 📦 安装与导入

### 单个组件导入
```tsx
import LucaButton from 'src/components/globals/button'
import LucaText from 'src/components/globals/text'
```

### 批量导入（推荐）
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

---

## 🧩 组件列表

### 1. LucaButton - 按钮组件

**功能**：继承 NutUI Button 所有属性的封装按钮

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 按钮文字或内容 |
| color | string | - | 按钮颜色 |
| size | 'large' \| 'normal' \| 'small' | 'normal' | 按钮尺寸 |
| type | 'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger' | 'default' | 按钮类型 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| onClick | () => void | - | 点击事件 |
| ...其他 | ButtonProps | - | 继承 NutUI Button 所有属性 |

**示例**：
```tsx
// 基础按钮
<LucaButton>点击</LucaButton>

// 自定义样式
<LucaButton color="primary" size="large" onClick={handleClick}>
  提交
</LucaButton>

// 加载状态
<LucaButton loading disabled>
  加载中...
</LucaButton>
```

---

### 2. LucaColumn - 垂直布局组件

**功能**：垂直方向的 Flex 布局容器

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 子元素 |
| alignItems | 'left' \| 'center' \| 'right' | 'center' | 横向对齐方式 |
| justifyContent | 'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' | 'center' | 纵向对齐方式 |
| itemMargin | string | '0' | 子元素间隔（gap） |
| style | CSSProperties | - | 额外样式 |

**示例**：
```tsx
// 基础垂直布局
<LucaColumn itemMargin="16px">
  <LucaText>项目1</LucaText>
  <LucaText>项目2</LucaText>
  <LucaText>项目3</LucaText>
</LucaColumn>

// 左对齐 + 顶部对齐
<LucaColumn 
  alignItems="left" 
  justifyContent="start" 
  itemMargin="12px"
  style={{ padding: '16px' }}
>
  <LucaText>标题</LucaText>
  <LucaText>内容</LucaText>
</LucaColumn>
```

---

### 3. LucaRow - 横向布局组件

**功能**：横向方向的 Flex 布局容器

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 子元素 |
| alignItems | 'top' \| 'center' \| 'bottom' | 'center' | 垂直对齐方式 |
| justifyContent | 'start' \| 'center' \| 'end' \| 'space-between' \| 'space-around' | 'center' | 横向对齐方式 |
| itemMargin | string | '0' | 子元素间隔（gap） |
| style | CSSProperties | - | 额外样式 |

**示例**：
```tsx
// 基础横向布局
<LucaRow itemMargin="10px">
  <LucaButton>按钮1</LucaButton>
  <LucaButton>按钮2</LucaButton>
</LucaRow>

// 两端对齐
<LucaRow justifyContent="space-between">
  <LucaText>左侧</LucaText>
  <LucaText>右侧</LucaText>
</LucaRow>

// 顶部对齐
<LucaRow alignItems="top" itemMargin="8px">
  <LucaImage src="..." width={40} height={40} />
  <LucaColumn>
    <LucaText>标题</LucaText>
    <LucaText>描述</LucaText>
  </LucaColumn>
</LucaRow>
```

---

### 4. LucaText - 文字组件

**功能**：文字显示组件，支持省略、样式定制

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 文字内容 |
| size | string \| number | - | 字体大小，如 '14px' 或 14 |
| color | string | - | 文字颜色 |
| weight | 'normal' \| 'bold' \| 'lighter' \| number | 'normal' | 字重 |
| align | 'left' \| 'center' \| 'right' | 'left' | 文字对齐 |
| lineHeight | string \| number | - | 行高 |
| ellipsis | boolean | false | 单行省略 |
| lines | number | - | 多行省略行数 |
| style | CSSProperties | - | 额外样式 |
| onClick | () => void | - | 点击事件 |

**示例**：
```tsx
// 基础文字
<LucaText>普通文字</LucaText>

// 标题样式
<LucaText size="18px" weight="bold" color="#000">
  标题
</LucaText>

// 单行省略
<LucaText size="14px" color="#666" ellipsis>
  这是一段很长的文字，超出会显示省略号...
</LucaText>

// 多行省略（2行）
<LucaText size="14px" lines={2}>
  这是一段很长的描述文字，
  会在第二行结束时显示省略号，
  超出部分会被隐藏
</LucaText>

// 可点击文字
<LucaText color="blue" onClick={() => navigate('/detail')}>
  查看详情 >
</LucaText>
```

---

### 5. LucaContainer - 容器组件

**功能**：通用容器组件，支持背景、圆角、阴影等

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| children | ReactNode | - | 子元素 |
| padding | string \| number | - | 内边距 |
| margin | string \| number | - | 外边距 |
| backgroundColor | string | - | 背景色 |
| borderRadius | string \| number | - | 圆角 |
| width | string \| number | - | 宽度 |
| height | string \| number | - | 高度 |
| shadow | boolean | false | 是否显示阴影 |
| border | string | - | 边框，如 '1px solid #ddd' |
| style | CSSProperties | - | 额外样式 |
| onClick | () => void | - | 点击事件 |

**示例**：
```tsx
// 基础容器
<LucaContainer padding="16px" backgroundColor="#f5f5f5">
  <LucaText>内容</LucaText>
</LucaContainer>

// 卡片样式
<LucaContainer 
  backgroundColor="white" 
  shadow 
  borderRadius="12px"
  padding="16px"
>
  <LucaColumn itemMargin="12px">
    <LucaText size="16px" weight="bold">卡片标题</LucaText>
    <LucaText size="14px" color="#666">卡片内容</LucaText>
  </LucaColumn>
</LucaContainer>

// 带边框的信息框
<LucaContainer 
  backgroundColor="#fff3e0"
  border="1px solid #ffb74d"
  borderRadius="8px"
  padding="12px"
>
  <LucaText size="14px" color="#f57c00">提示信息</LucaText>
</LucaContainer>
```

---

### 6. LucaImage - 图片组件

**功能**：图片显示组件，支持圆角、圆形、适应方式等

**Props**：
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| src | string | **必填** | 图片地址 |
| width | string \| number | - | 宽度 |
| height | string \| number | - | 高度 |
| borderRadius | string \| number | - | 圆角 |
| fit | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | 'cover' | 图片适应方式 |
| round | boolean | false | 是否显示为圆形 |
| style | CSSProperties | - | 额外样式 |
| onClick | () => void | - | 点击事件 |
| ...其他 | ImageProps | - | 继承 NutUI Image 所有属性 |

**示例**：
```tsx
// 基础图片
<LucaImage src="https://example.com/image.jpg" />

// 指定尺寸
<LucaImage 
  src="https://example.com/image.jpg" 
  width="200px" 
  height="150px" 
/>

// 圆形头像
<LucaImage 
  src="https://avatar.url" 
  width={50} 
  height={50}
  round
/>

// 圆角图片
<LucaImage 
  src="https://product.url" 
  width="100%" 
  height="200px"
  borderRadius="12px"
  fit="cover"
/>
```

---

## 🎨 实战案例

### 案例1：商品卡片
```tsx
<LucaContainer 
  backgroundColor="white" 
  shadow 
  borderRadius="12px"
  padding="16px"
  onClick={() => navigate('/product/123')}
>
  <LucaColumn itemMargin="12px">
    <LucaImage 
      src="https://product.url" 
      width="100%" 
      height="180px"
      borderRadius="8px"
    />
    <LucaText size="16px" weight="bold">商品名称</LucaText>
    <LucaText size="14px" color="#999" lines={2}>
      这是商品的详细描述信息，可能很长...
    </LucaText>
    <LucaRow justifyContent="space-between" alignItems="bottom">
      <LucaText size="20px" color="red" weight="bold">¥299</LucaText>
      <LucaButton color="primary" size="small">购买</LucaButton>
    </LucaRow>
  </LucaColumn>
</LucaContainer>
```

### 案例2：用户信息卡
```tsx
<LucaContainer backgroundColor="white" padding="16px">
  <LucaRow itemMargin="12px" alignItems="center">
    <LucaImage 
      src="https://avatar.url" 
      width={60} 
      height={60}
      round
    />
    <LucaColumn alignItems="left" itemMargin="8px">
      <LucaText size="18px" weight="bold">用户名</LucaText>
      <LucaText size="14px" color="#999">个性签名...</LucaText>
    </LucaColumn>
  </LucaRow>
</LucaContainer>
```

### 案例3：表单页面
```tsx
<LucaContainer backgroundColor="#f5f5f5" style={{ minHeight: '100vh' }}>
  <LucaColumn itemMargin="16px" style={{ padding: '16px' }}>
    
    <LucaContainer backgroundColor="white" padding="20px" shadow>
      <LucaColumn itemMargin="16px">
        <LucaText size="20px" weight="bold">登录</LucaText>
        
        <Input placeholder="请输入用户名" />
        <Input placeholder="请输入密码" type="password" />
        
        <LucaButton color="primary" size="large" block>
          登录
        </LucaButton>
        
        <LucaRow justifyContent="space-between">
          <LucaText size="14px" color="blue">忘记密码？</LucaText>
          <LucaText size="14px" color="blue">注册账号</LucaText>
        </LucaRow>
      </LucaColumn>
    </LucaContainer>
    
  </LucaColumn>
</LucaContainer>
```

### 案例4：列表项
```tsx
<LucaContainer backgroundColor="white">
  <LucaColumn itemMargin="0">
    {list.map(item => (
      <LucaRow 
        key={item.id}
        justifyContent="space-between"
        style={{ 
          padding: '16px', 
          borderBottom: '1px solid #f0f0f0' 
        }}
      >
        <LucaRow itemMargin="12px">
          <LucaImage src={item.icon} width={40} height={40} round />
          <LucaColumn alignItems="left" itemMargin="4px">
            <LucaText size="16px">{item.title}</LucaText>
            <LucaText size="12px" color="#999">{item.desc}</LucaText>
          </LucaColumn>
        </LucaRow>
        <LucaText size="14px" color="#999">›</LucaText>
      </LucaRow>
    ))}
  </LucaColumn>
</LucaContainer>
```

---

## 💡 最佳实践

### 1. 组件组合原则
- **LucaContainer** 用于最外层容器或卡片
- **LucaColumn/LucaRow** 用于布局排列
- **LucaText** 用于所有文字显示
- **LucaImage** 用于图片显示
- **LucaButton** 用于按钮

### 2. 间距规范
建议使用 4 的倍数作为间距值：
- 小间距：`4px`, `8px`
- 中间距：`12px`, `16px`
- 大间距：`20px`, `24px`, `32px`

### 3. 颜色规范
```tsx
// 主色调
primary: '#1890ff'
success: '#52c41a'
warning: '#faad14'
danger: '#f5222d'

// 文字色
titleColor: '#000000'
textColor: '#333333'
descColor: '#666666'
disabledColor: '#999999'

// 背景色
bgColor: '#f5f5f5'
whiteColor: '#ffffff'
```

### 4. 字体规范
```tsx
// 标题
<LucaText size="20px" weight="bold">一级标题</LucaText>
<LucaText size="18px" weight="bold">二级标题</LucaText>
<LucaText size="16px" weight="bold">三级标题</LucaText>

// 正文
<LucaText size="14px">正文内容</LucaText>
<LucaText size="12px" color="#999">辅助文字</LucaText>
```

---

## 🔧 TypeScript 支持

所有组件都有完整的 TypeScript 类型定义，支持智能提示：

```tsx
import { LucaButton, LucaText } from 'src/components/globals'

// TypeScript 会提示所有可用属性
<LucaButton 
  color="primary"  // ✅ 类型提示
  size="large"     // ✅ 类型提示
  onClick={handleClick}
>
  按钮
</LucaButton>
```

---

## 📝 注意事项

1. **路径别名**：项目已配置 `src/*` 别名，可直接使用
2. **样式覆盖**：所有组件都支持 `style` 属性覆盖样式
3. **事件处理**：支持的组件都提供 `onClick` 属性
4. **尺寸单位**：支持 `px`、`%`、`vh`、`vw` 等单位，数字会自动转换为 `px`
5. **小程序兼容**：所有组件都经过小程序环境测试

---

## 🤝 贡献指南

如需新增组件或修改现有组件，请遵循以下原则：

1. 组件命名以 `Luca` 开头
2. 必须提供 TypeScript 类型定义
3. 支持 `style` 属性用于样式扩展
4. 使用解构和默认值提高可读性
5. 添加清晰的注释说明

---

## 📮 联系方式

如有问题或建议，请联系开发团队。

**文档版本**：v1.0.0  
**最后更新**：2025-11-07
