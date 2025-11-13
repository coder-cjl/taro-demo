import { View } from '@tarojs/components'
import { useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'

interface LucaColumnProps extends BaseStyleProps, React.PropsWithChildren {
  alignItems?: 'left' | 'center' | 'right' | 'stretch'
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  gap?: string // 子元素之间的间隔
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
  const columnStyle = useMemo(() => {
    // 1. 基础样式(来自 BaseStyleProps)
    const baseStyle = parseStyleProps(props)

    // 2. Flex 布局样式
    Object.assign(baseStyle, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignItemsMap[props.alignItems || 'stretch'], // 默认 stretch
      justifyContent: justifyContentMap[props.justifyContent || 'start'],
      gap: props.gap || '0',
    })

    return baseStyle
  }, [props, props.alignItems, props.justifyContent, props.gap])

  return <View style={columnStyle}>{props.children}</View>
}
