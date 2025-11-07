# Luca UI 组件对照表

## 🎨 布局组件

### LucaColumn - 垂直布局
```tsx
<LucaColumn 
  alignItems="left|center|right"           // 横向对齐
  justifyContent="start|center|end|..."    // 纵向对齐
  itemMargin="16px"                        // 子元素间隔
  style={{}}                                // 额外样式
>
  {children}
</LucaColumn>
```

### LucaRow - 横向布局
```tsx
<LucaRow 
  alignItems="top|center|bottom"           // 垂直对齐
  justifyContent="start|center|end|..."    // 横向对齐
  itemMargin="16px"                        // 子元素间隔
  style={{}}                                // 额外样式
>
  {children}
</LucaRow>
```

### LucaContainer - 容器
```tsx
<LucaContainer 
  padding="16px"                   // 内边距
  margin="16px"                    // 外边距
  backgroundColor="white"          // 背景色
  borderRadius="8px"               // 圆角
  width="100%"                     // 宽度
  height="200px"                   // 高度
  shadow={true}                    // 阴影
  border="1px solid #ddd"          // 边框
  style={{}}                        // 额外样式
  onClick={() => {}}               // 点击事件
>
  {children}
</LucaContainer>
```

---

## 📝 内容组件

### LucaText - 文字
```tsx
<LucaText 
  size="14px"                      // 字体大小
  color="#333"                     // 文字颜色
  weight="normal|bold"             // 字重
  align="left|center|right"        // 对齐
  lineHeight="20px"                // 行高
  ellipsis={true}                  // 单行省略
  lines={2}                        // 多行省略
  style={{}}                        // 额外样式
  onClick={() => {}}               // 点击事件
>
  文字内容
</LucaText>
```

### LucaImage - 图片
```tsx
<LucaImage 
  src="https://..."                // 图片地址 [必填]
  width="100px"                    // 宽度
  height="100px"                   // 高度
  borderRadius="8px"               // 圆角
  fit="cover|contain|fill"         // 适应方式
  round={true}                     // 圆形
  style={{}}                        // 额外样式
  onClick={() => {}}               // 点击事件
/>
```

---

## 🎛️ 交互组件

### LucaButton - 按钮
```tsx
<LucaButton 
  color="primary"                  // 颜色
  size="large|normal|small"        // 尺寸
  type="default|primary|..."       // 类型
  disabled={false}                 // 禁用
  loading={false}                  // 加载中
  onClick={() => {}}               // 点击事件
  ...                              // NutUI Button 所有属性
>
  按钮文字
</LucaButton>
```

---

## 🎯 属性值速查

### alignItems (对齐)
**LucaColumn**: `'left'` | `'center'` | `'right'`  
**LucaRow**: `'top'` | `'center'` | `'bottom'`

### justifyContent (分布)
`'start'` | `'center'` | `'end'` | `'space-between'` | `'space-around'`

### 颜色值
```tsx
'primary'      // 主色
'success'      // 成功
'warning'      // 警告
'danger'       // 危险
'#1890ff'      // 十六进制
'rgb(0,0,0)'   // RGB
```

### 尺寸值
```tsx
'16px'         // 像素
'50%'          // 百分比
'100vw'        // 视口宽度
16             // 数字（自动转px）
```

### 字重值
```tsx
'normal'       // 400
'bold'         // 700
'lighter'      // 300
600            // 数字
```

---

## 🔄 组件组合示例

### 信息卡片
```
LucaContainer (容器)
└── LucaColumn (垂直布局)
    ├── LucaImage (图片)
    ├── LucaText (标题)
    ├── LucaText (描述)
    └── LucaRow (横向布局)
        ├── LucaText (价格)
        └── LucaButton (按钮)
```

### 列表项
```
LucaRow (横向布局)
├── LucaImage (图标)
└── LucaColumn (垂直布局)
    ├── LucaText (标题)
    └── LucaText (副标题)
```

### 表单
```
LucaContainer (容器)
└── LucaColumn (垂直布局)
    ├── Input (输入框)
    ├── Input (输入框)
    └── LucaButton (提交按钮)
```

---

## 💡 Tips

1. **所有组件都支持 `style` 属性**，可覆盖默认样式
2. **数字会自动转为 `px`**，如 `width={100}` = `width="100px"`
3. **使用 `itemMargin` 控制间隔**，而不是给每个子元素加 margin
4. **优先使用组件属性**，减少 style 的使用
5. **善用组件组合**，构建复杂 UI

---

**打印此表备用** 📄
