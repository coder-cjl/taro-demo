/**
 * Luca UI 新组件使用示例
 * 展示所有新特性的用法
 */

import {
  LucaCard,
  LucaInput,
  LucaList,
  LucaSpace,
  LucaDivider,
  LucaText,
  LucaContainer,
  LucaColumn,
  LucaRow,
} from 'src/components/luca-ui'

// ================== 示例 1: LucaText 语义化变体 ==================
export function TextVariantExample() {
  return (
    <LucaColumn gap="32rpx" padding={48}>
      <LucaText variant="h1">这是 H1 标题</LucaText>
      <LucaText variant="h2" colorScheme="primary">
        这是 H2 标题
      </LucaText>
      <LucaText variant="h3" colorScheme="secondary">
        这是 H3 标题
      </LucaText>
      <LucaText variant="body">这是正文内容</LucaText>
      <LucaText variant="caption" colorScheme="tertiary">
        这是辅助文字
      </LucaText>
      <LucaText variant="small" colorScheme="danger">
        这是小字提示
      </LucaText>
    </LucaColumn>
  )
}

// ================== 示例 2: BaseStyleProps 快捷属性 ==================
export function BaseStylePropsExample() {
  return (
    <LucaColumn gap="32rpx">
      {/* 使用 marginX/marginY 快捷属性 */}
      <LucaText marginX={48} marginY={24} backgroundColor="#f0f0f0" padding={16}>
        marginX={48} marginY={24}
      </LucaText>

      {/* 使用 paddingX/paddingY 快捷属性 */}
      <LucaContainer paddingX={48} paddingY={24} backgroundColor="#e0e0e0">
        <LucaText>
          paddingX={48} paddingY={24}
        </LucaText>
      </LucaContainer>

      {/* 直接使用数字,自动转换为 rpx */}
      <LucaText marginLeft={12} marginBottom={8} size={32}>
        自动 rpx 转换
      </LucaText>
    </LucaColumn>
  )
}

// ================== 示例 3: LucaCard 卡片变体 ==================
export function CardVariantExample() {
  return (
    <LucaColumn gap="32rpx" paddingX={48}>
      <LucaCard variant="default">
        <LucaText>默认卡片</LucaText>
      </LucaCard>

      <LucaCard variant="outlined">
        <LucaText>描边卡片</LucaText>
      </LucaCard>

      <LucaCard variant="elevated">
        <LucaText>带阴影卡片</LucaText>
      </LucaCard>

      <LucaCard variant="filled" hoverable>
        <LucaText>填充卡片(带悬停效果)</LucaText>
      </LucaCard>
    </LucaColumn>
  )
}

// ================== 示例 4: LucaInput 输入框 ==================
export function InputExample() {
  return (
    <LucaColumn gap="32rpx" paddingX={48}>
      {/* 基础输入框 */}
      <LucaInput placeholder="请输入" />

      {/* 带清除按钮 */}
      <LucaInput placeholder="带清除按钮" clearable />

      {/* 带前后缀 */}
      <LucaInput
        placeholder="金额"
        prefix={<LucaText>¥</LucaText>}
        suffix={<LucaText>元</LucaText>}
        type="number"
      />

      {/* 错误状态 */}
      <LucaInput placeholder="手机号" error errorMessage="手机号格式不正确" />

      {/* 不同变体 */}
      <LucaInput variant="outlined" placeholder="Outlined" />
      <LucaInput variant="filled" placeholder="Filled" />
      <LucaInput variant="standard" placeholder="Standard" />

      {/* 不同尺寸 */}
      <LucaInput size="small" placeholder="Small" />
      <LucaInput size="medium" placeholder="Medium" />
      <LucaInput size="large" placeholder="Large" />
    </LucaColumn>
  )
}

// ================== 示例 5: LucaList 列表渲染 ==================
interface TodoItem {
  id: number
  title: string
  completed: boolean
}

export function ListExample() {
  const todos: TodoItem[] = [
    { id: 1, title: '学习 Luca UI', completed: true },
    { id: 2, title: '完成项目开发', completed: false },
    { id: 3, title: '代码审查', completed: false },
  ]

  return (
    <LucaContainer paddingX={48}>
      {/* 垂直列表 */}
      <LucaList
        data={todos}
        renderItem={todo => (
          <LucaRow justifyContent="space-between" paddingX={16} paddingY={16}>
            <LucaText>{todo.title}</LucaText>
            <LucaText colorScheme={todo.completed ? 'success' : 'tertiary'}>
              {todo.completed ? '✓' : '○'}
            </LucaText>
          </LucaRow>
        )}
        divider
        gap="16rpx"
      />

      <LucaDivider marginY={48} />

      {/* 水平列表 */}
      <LucaList
        data={['标签1', '标签2', '标签3']}
        renderItem={tag => (
          <LucaContainer backgroundColor="#f0f0f0" borderRadius={16} paddingX={24} paddingY={12}>
            <LucaText variant="small">{tag}</LucaText>
          </LucaContainer>
        )}
        direction="row"
        gap="16rpx"
      />
    </LucaContainer>
  )
}

// ================== 示例 6: LucaSpace 间距管理 ==================
export function SpaceExample() {
  return (
    <LucaColumn gap="48rpx" paddingX={48}>
      {/* 水平间距 */}
      <LucaSpace direction="horizontal" size="large">
        <LucaContainer width={100} height={100} backgroundColor="red" />
        <LucaContainer width={100} height={100} backgroundColor="green" />
        <LucaContainer width={100} height={100} backgroundColor="blue" />
      </LucaSpace>

      {/* 垂直间距 */}
      <LucaSpace direction="vertical" size="medium">
        <LucaText>项目 1</LucaText>
        <LucaText>项目 2</LucaText>
        <LucaText>项目 3</LucaText>
      </LucaSpace>

      {/* 自定义间距 + 换行 */}
      <LucaSpace size={32} wrap>
        {['标签1', '标签2', '标签3', '标签4', '标签5'].map(tag => (
          <LucaContainer
            key={tag}
            backgroundColor="#e0e0e0"
            borderRadius={16}
            paddingX={24}
            paddingY={12}
          >
            <LucaText variant="small">{tag}</LucaText>
          </LucaContainer>
        ))}
      </LucaSpace>
    </LucaColumn>
  )
}

// ================== 示例 7: LucaDivider 分割线 ==================
export function DividerExample() {
  return (
    <LucaColumn paddingX={48}>
      <LucaText>内容 1</LucaText>
      <LucaDivider />
      <LucaText>内容 2</LucaText>
      <LucaDivider dashed />
      <LucaText>内容 3</LucaText>
      <LucaDivider text="或" textAlign="center" />
      <LucaText>内容 4</LucaText>
      <LucaDivider text="更多" textAlign="right" />
      <LucaText>内容 5</LucaText>
    </LucaColumn>
  )
}

// ================== 示例 8: 综合应用 - 用户卡片 ==================
interface User {
  name: string
  role: string
  email: string
  avatar: string
}

export function UserCardExample() {
  const user: User = {
    name: '张三',
    role: '前端工程师',
    email: 'zhangsan@example.com',
    avatar: 'https://via.placeholder.com/100',
  }

  return (
    <LucaCard variant="elevated" marginX={48} marginY={24}>
      <LucaColumn gap="32rpx">
        {/* 头部 */}
        <LucaRow gap="32rpx" alignItems="center">
          <LucaContainer width={100} height={100} borderRadius={50} backgroundColor="#f0f0f0" />
          <LucaColumn gap="16rpx">
            <LucaText variant="h2">{user.name}</LucaText>
            <LucaText variant="caption" colorScheme="tertiary">
              {user.role}
            </LucaText>
          </LucaColumn>
        </LucaRow>

        <LucaDivider />

        {/* 信息 */}
        <LucaColumn gap="24rpx">
          <LucaRow gap="16rpx">
            <LucaText variant="body" colorScheme="tertiary">
              邮箱:
            </LucaText>
            <LucaText variant="body">{user.email}</LucaText>
          </LucaRow>
        </LucaColumn>

        {/* 操作按钮 */}
        <LucaSpace size="medium">
          <LucaContainer backgroundColor="#1890ff" borderRadius={8} paddingX={32} paddingY={16}>
            <LucaText color="#fff">关注</LucaText>
          </LucaContainer>
          <LucaContainer border="1px solid #1890ff" borderRadius={8} paddingX={32} paddingY={16}>
            <LucaText color="#1890ff">私信</LucaText>
          </LucaContainer>
        </LucaSpace>
      </LucaColumn>
    </LucaCard>
  )
}
