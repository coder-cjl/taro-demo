import { Text } from '@tarojs/components'
import { CSSProperties, useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import { theme } from 'src/styles/theme'

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small'
type ColorScheme = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'

interface LucaTextProps extends BaseStyleProps, React.PropsWithChildren {
  // 语义化变体(优先级高于 size)
  variant?: TextVariant
  // 颜色方案(优先级高于 color)
  colorScheme?: ColorScheme

  // 原有属性(向下兼容)
  size?: string | number // 字体大小,如 '14px', 16
  color?: string // 文字颜色
  weight?: 'normal' | 'bold' | 'lighter' | number // 字重
  align?: 'left' | 'center' | 'right' // 文字对齐
  lineHeight?: string | number // 行高
  ellipsis?: boolean // 是否显示省略号(单行)
  lines?: number // 多行省略,指定行数
}

export default function LucaText(props: LucaTextProps) {
  // 语义化变体映射
  const variantMap: Record<TextVariant, CSSProperties> = {
    h1: { fontSize: theme.fontSize.xxl, fontWeight: theme.fontWeight.bold },
    h2: { fontSize: theme.fontSize.xl, fontWeight: theme.fontWeight.bold },
    h3: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.medium },
    body: { fontSize: theme.fontSize.md, fontWeight: theme.fontWeight.normal },
    caption: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.normal },
    small: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.normal },
  }

  // 颜色方案映射
  const colorSchemeMap: Record<ColorScheme, string> = {
    primary: theme.colors.textPrimary,
    secondary: theme.colors.textSecondary,
    tertiary: theme.colors.textTertiary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
  }

  // 使用 useMemo 缓存样式对象,避免每次渲染都创建新对象
  const textStyle: CSSProperties = useMemo(() => {
    // 1. 基础样式(来自 BaseStyleProps)
    const baseStyle = parseStyleProps(props)

    // 2. 应用变体样式
    if (props.variant) {
      Object.assign(baseStyle, variantMap[props.variant])
    }

    // 3. 应用颜色方案
    if (props.colorScheme) {
      baseStyle.color = colorSchemeMap[props.colorScheme]
    }

    // 4. 应用自定义属性(优先级更高,覆盖变体)
    if (props.size !== undefined) {
      baseStyle.fontSize = typeof props.size === 'number' ? `${props.size}rpx` : props.size
    }
    if (props.color) {
      baseStyle.color = props.color
    }
    if (props.weight !== undefined) {
      baseStyle.fontWeight = props.weight
    }
    if (props.align) {
      baseStyle.textAlign = props.align
    }
    if (props.lineHeight !== undefined) {
      baseStyle.lineHeight =
        typeof props.lineHeight === 'number' ? `${props.lineHeight}rpx` : props.lineHeight
    }

    // 5. 单行省略
    if (props.ellipsis && !props.lines) {
      Object.assign(baseStyle, {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      })
    }

    // 6. 多行省略
    if (props.lines && props.lines > 0) {
      Object.assign(baseStyle, {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: props.lines,
        WebkitBoxOrient: 'vertical',
      })
    }

    return baseStyle
  }, [
    props.variant,
    props.colorScheme,
    props.size,
    props.color,
    props.weight,
    props.align,
    props.lineHeight,
    props.ellipsis,
    props.lines,
    // BaseStyleProps 依赖
    props.margin,
    props.marginX,
    props.marginY,
    props.marginTop,
    props.marginBottom,
    props.marginLeft,
    props.marginRight,
    props.padding,
    props.paddingX,
    props.paddingY,
    props.paddingTop,
    props.paddingBottom,
    props.paddingLeft,
    props.paddingRight,
    props.width,
    props.height,
    props.backgroundColor,
    props.borderRadius,
    props.border,
    props.style,
  ])

  return (
    <Text style={textStyle} onClick={props.onClick}>
      {props.children}
    </Text>
  )
}
