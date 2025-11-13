import { View } from '@tarojs/components'
import { CSSProperties } from 'react'

interface LucaRowProps extends React.PropsWithChildren {
  alignItems?: 'top' | 'center' | 'bottom' | 'stretch'
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  gap?: string // 子元素之间的间隔
  style?: CSSProperties // 支持额外样式
}

// 对齐方式映射
const alignItemsMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch', // 拉伸子元素撑满高度
} as const

const justifyContentMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
} as const

export default function LucaRow(props: LucaRowProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: alignItemsMap[props.alignItems || 'center'], // 默认居中对齐比较合理
        justifyContent: justifyContentMap[props.justifyContent || 'start'], // 默认改为 start
        gap: props.gap || '0',
        ...props.style, // 允许覆盖或添加其他样式
      }}
    >
      {props.children}
    </View>
  )
}
