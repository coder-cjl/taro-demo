import { View } from '@tarojs/components'
import { CSSProperties } from 'react'

interface LucaColumnProps extends React.PropsWithChildren {
  alignItems?: 'left' | 'center' | 'right' | 'stretch'
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  gap?: string // 子元素之间的间隔
  style?: CSSProperties // 支持额外样式
}

// 对齐方式映射
const alignItemsMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  stretch: 'stretch', // 拉伸子元素撑满宽度
} as const

const justifyContentMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
} as const

export default function LucaColumn(props: LucaColumnProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: alignItemsMap[props.alignItems || 'stretch'], // 默认改为 stretch
        justifyContent: justifyContentMap[props.justifyContent || 'start'],
        gap: props.gap || '0',
        ...props.style, // 允许覆盖或添加其他样式
      }}
    >
      {props.children}
    </View>
  )
}
