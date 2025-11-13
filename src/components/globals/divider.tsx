/**
 * LucaDivider - 分割线组件
 */

import { View } from '@tarojs/components'
import { CSSProperties, useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import { theme } from 'src/styles/theme'
import LucaText from './text'

type DividerDirection = 'horizontal' | 'vertical'

interface LucaDividerProps extends BaseStyleProps {
  direction?: DividerDirection // 方向
  color?: string // 颜色
  thickness?: number | string // 粗细
  dashed?: boolean // 虚线
  text?: string // 文字
  textAlign?: 'left' | 'center' | 'right' // 文字位置
}

export default function LucaDivider(props: LucaDividerProps) {
  const {
    direction = 'horizontal',
    color = theme.colors.border,
    thickness = '1rpx',
    dashed = false,
    text,
    textAlign = 'center',
  } = props

  const containerStyle: CSSProperties = useMemo(() => {
    const baseStyle = parseStyleProps(props)

    if (direction === 'horizontal') {
      Object.assign(baseStyle, {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '32rpx 0',
      })
    } else {
      Object.assign(baseStyle, {
        display: 'inline-block',
        height: '100%',
        margin: '0 16rpx',
      })
    }

    return baseStyle
  }, [props, direction])

  const lineStyle: CSSProperties = {
    flex: 1,
    height: direction === 'horizontal' ? thickness : '100%',
    width: direction === 'horizontal' ? 'auto' : thickness,
    backgroundColor: color,
    borderStyle: dashed ? 'dashed' : 'solid',
  }

  // 水平分割线带文字
  if (direction === 'horizontal' && text) {
    return (
      <View style={containerStyle}>
        {textAlign !== 'left' && (
          <View style={{ ...lineStyle, flex: textAlign === 'center' ? 1 : 3 }} />
        )}
        <LucaText
          size="24rpx"
          color={theme.colors.textTertiary}
          style={{ padding: '0 16rpx', whiteSpace: 'nowrap' }}
        >
          {text}
        </LucaText>
        {textAlign !== 'right' && (
          <View style={{ ...lineStyle, flex: textAlign === 'center' ? 1 : 3 }} />
        )}
      </View>
    )
  }

  // 普通分割线
  return <View style={{ ...containerStyle, ...lineStyle }} />
}
