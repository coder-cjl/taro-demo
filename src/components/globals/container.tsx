import { View } from '@tarojs/components'
import { CSSProperties, useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import { theme } from 'src/styles/theme'

type ContainerVariant = 'default' | 'card' | 'section'

interface LucaContainerProps extends BaseStyleProps, React.PropsWithChildren {
  // 原有属性(向下兼容)
  shadow?: boolean // 是否显示阴影
  fullWidth?: boolean // 是否占满父容器宽度（默认 false）

  // 新增语义化变体
  variant?: ContainerVariant
}

export default function LucaContainer(props: LucaContainerProps) {
  const { variant = 'default', shadow = false, fullWidth = false } = props

  // 变体样式映射
  const variantStyleMap = {
    default: {},
    card: {
      backgroundColor: theme.colors.bgPrimary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      boxShadow: theme.shadow.sm,
    },
    section: {
      backgroundColor: theme.colors.bgSecondary,
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.lg,
    },
  }

  // 使用 useMemo 缓存样式对象,避免每次渲染都创建新对象
  const containerStyle: CSSProperties = useMemo(() => {
    // 1. 应用变体样式(默认样式,优先级最低)
    const baseStyle: CSSProperties = {
      boxSizing: 'border-box',
      ...variantStyleMap[variant],
    }

    // 2. 应用用户自定义样式(优先级最高,会覆盖变体样式)
    const customStyle = parseStyleProps(props)
    Object.assign(baseStyle, customStyle)

    // 3. fullWidth 优先级更高
    if (fullWidth && !props.width) {
      baseStyle.width = '100%'
    }

    // 4. shadow 优先级更高
    if (shadow) {
      baseStyle.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
    }

    return baseStyle
  }, [
    props,
    variant,
    shadow,
    fullWidth,
    // BaseStyleProps 依赖项
    props.padding,
    props.margin,
    props.backgroundColor,
    props.borderRadius,
    props.width,
    props.height,
    props.border,
    props.style,
  ])

  return (
    <View style={containerStyle} onClick={props.onClick}>
      {props.children}
    </View>
  )
}
