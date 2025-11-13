/**
 * 通用样式属性
 * 所有 Luca 组件都继承这些基础样式属性
 */

import { CSSProperties } from 'react'

export interface BaseStyleProps {
  // 外边距
  margin?: string | number
  marginX?: string | number // 左右外边距
  marginY?: string | number // 上下外边距
  marginTop?: string | number
  marginBottom?: string | number
  marginLeft?: string | number
  marginRight?: string | number

  // 内边距
  padding?: string | number
  paddingX?: string | number // 左右内边距
  paddingY?: string | number // 上下内边距
  paddingTop?: string | number
  paddingBottom?: string | number
  paddingLeft?: string | number
  paddingRight?: string | number

  // 尺寸
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  maxWidth?: string | number
  maxHeight?: string | number

  // 背景和边框
  backgroundColor?: string
  borderRadius?: string | number
  border?: string

  // 其他
  style?: CSSProperties
  onClick?: () => void
}

/**
 * 解析样式属性为 CSSProperties
 * @param props 样式属性
 * @returns CSSProperties 对象
 */
export function parseStyleProps(props: BaseStyleProps): CSSProperties {
  const style: CSSProperties = {}

  // 处理数字类型,自动添加 rpx 单位
  const toRpx = (value: string | number | undefined) => {
    if (value === undefined) return undefined
    return typeof value === 'number' ? `${value}rpx` : value
  }

  // 外边距
  if (props.margin !== undefined) {
    style.margin = toRpx(props.margin)
  }
  if (props.marginX !== undefined) {
    const value = toRpx(props.marginX)
    style.marginLeft = value
    style.marginRight = value
  }
  if (props.marginY !== undefined) {
    const value = toRpx(props.marginY)
    style.marginTop = value
    style.marginBottom = value
  }
  if (props.marginTop !== undefined) style.marginTop = toRpx(props.marginTop)
  if (props.marginBottom !== undefined) style.marginBottom = toRpx(props.marginBottom)
  if (props.marginLeft !== undefined) style.marginLeft = toRpx(props.marginLeft)
  if (props.marginRight !== undefined) style.marginRight = toRpx(props.marginRight)

  // 内边距
  if (props.padding !== undefined) {
    style.padding = toRpx(props.padding)
  }
  if (props.paddingX !== undefined) {
    const value = toRpx(props.paddingX)
    style.paddingLeft = value
    style.paddingRight = value
  }
  if (props.paddingY !== undefined) {
    const value = toRpx(props.paddingY)
    style.paddingTop = value
    style.paddingBottom = value
  }
  if (props.paddingTop !== undefined) style.paddingTop = toRpx(props.paddingTop)
  if (props.paddingBottom !== undefined) style.paddingBottom = toRpx(props.paddingBottom)
  if (props.paddingLeft !== undefined) style.paddingLeft = toRpx(props.paddingLeft)
  if (props.paddingRight !== undefined) style.paddingRight = toRpx(props.paddingRight)

  // 尺寸
  if (props.width !== undefined) style.width = toRpx(props.width)
  if (props.height !== undefined) style.height = toRpx(props.height)
  if (props.minWidth !== undefined) style.minWidth = toRpx(props.minWidth)
  if (props.minHeight !== undefined) style.minHeight = toRpx(props.minHeight)
  if (props.maxWidth !== undefined) style.maxWidth = toRpx(props.maxWidth)
  if (props.maxHeight !== undefined) style.maxHeight = toRpx(props.maxHeight)

  // 背景和边框
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor
  if (props.borderRadius !== undefined) style.borderRadius = toRpx(props.borderRadius)
  if (props.border) style.border = props.border

  // 合并自定义样式(优先级最高)
  if (props.style) {
    Object.assign(style, props.style)
  }

  return style
}
