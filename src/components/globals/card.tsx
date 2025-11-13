/**
 * LucaCard - 卡片容器组件
 * 封装常见卡片样式,提供语义化的 variant 属性
 */

import { View } from '@tarojs/components'
import { CSSProperties, useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import { theme } from 'src/styles/theme'

type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled'

interface LucaCardProps extends BaseStyleProps, React.PropsWithChildren {
  variant?: CardVariant // 卡片变体
  hoverable?: boolean // 是否有悬停效果
}

export default function LucaCard(props: LucaCardProps) {
  const { variant = 'default', hoverable = false } = props

  // 变体样式映射
  const variantStyleMap = {
    default: {
      backgroundColor: theme.colors.bgPrimary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
    },
    outlined: {
      backgroundColor: theme.colors.bgPrimary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      border: `1px solid ${theme.colors.border}`,
    },
    elevated: {
      backgroundColor: theme.colors.bgPrimary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      boxShadow: theme.shadow.md,
    },
    filled: {
      backgroundColor: theme.colors.bgSecondary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
    },
  }

  const cardStyle: CSSProperties = useMemo(() => {
    // 1. 应用变体样式(默认样式,优先级最低)
    const baseStyle: CSSProperties = { ...variantStyleMap[variant] }

    // 2. 应用用户自定义样式(优先级最高,会覆盖变体样式)
    const customStyle = parseStyleProps(props)
    Object.assign(baseStyle, customStyle)

    // 3. 悬停效果
    if (hoverable) {
      baseStyle.transition = 'all 0.3s ease'
      baseStyle.cursor = 'pointer'
    }

    // 4. 默认使用 border-box
    baseStyle.boxSizing = 'border-box'

    return baseStyle
  }, [props, variant, hoverable])

  return (
    <View style={cardStyle} onClick={props.onClick}>
      {props.children}
    </View>
  )
}
