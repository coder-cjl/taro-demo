import { View } from '@tarojs/components'
import { useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'

interface LucaRowProps extends BaseStyleProps, React.PropsWithChildren {
  alignItems?: 'top' | 'center' | 'bottom' | 'stretch'
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around'
  gap?: string // 子元素之间的间隔
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
  const rowStyle = useMemo(() => {
    // 1. 基础样式(来自 BaseStyleProps)
    const baseStyle = parseStyleProps(props)

    // 2. Flex 布局样式
    Object.assign(baseStyle, {
      display: 'flex',
      flexDirection: 'row',
      alignItems: alignItemsMap[props.alignItems || 'center'], // 默认居中对齐
      justifyContent: justifyContentMap[props.justifyContent || 'start'], // 默认左对齐
      gap: props.gap || '0',
    })

    return baseStyle
  }, [props, props.alignItems, props.justifyContent, props.gap])

  return <View style={rowStyle}>{props.children}</View>
}
