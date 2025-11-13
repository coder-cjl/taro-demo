/**
 * LucaSpace - 间距组件
 * 用于统一管理子元素之间的间距
 */

import { View } from '@tarojs/components'
import { CSSProperties, useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'

type SpaceDirection = 'horizontal' | 'vertical'
type SpaceSize = 'small' | 'medium' | 'large' | number | string
type SpaceAlign = 'start' | 'center' | 'end' | 'baseline'

interface LucaSpaceProps extends BaseStyleProps, React.PropsWithChildren {
  direction?: SpaceDirection // 方向
  size?: SpaceSize // 间距大小
  align?: SpaceAlign // 对齐方式
  wrap?: boolean // 是否换行
}

export default function LucaSpace(props: LucaSpaceProps) {
  const { direction = 'horizontal', size = 'medium', align = 'center', wrap = false } = props

  // 尺寸映射
  const sizeMap = {
    small: '16rpx',
    medium: '32rpx',
    large: '48rpx',
  }

  // 获取间距值
  const getGap = () => {
    if (typeof size === 'string' && size in sizeMap) {
      return sizeMap[size as keyof typeof sizeMap]
    }
    if (typeof size === 'number') {
      return `${size}rpx`
    }
    return size
  }

  // 对齐方式映射
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    baseline: 'baseline',
  }

  const containerStyle: CSSProperties = useMemo(() => {
    const baseStyle = parseStyleProps(props)

    Object.assign(baseStyle, {
      display: 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      alignItems: alignMap[align],
      gap: getGap(),
      flexWrap: wrap ? 'wrap' : 'nowrap',
    })

    return baseStyle
  }, [props, direction, size, align, wrap])

  return <View style={containerStyle}>{props.children}</View>
}
