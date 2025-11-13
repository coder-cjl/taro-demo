/**
 * LucaInput - 输入框组件
 * 支持清除按钮、前缀后缀、验证状态等
 */

import { Input, View } from '@tarojs/components'
import { useState, useMemo, CSSProperties } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import { theme } from 'src/styles/theme'
import LucaText from './text'

type InputVariant = 'outlined' | 'filled' | 'standard'
type InputSize = 'small' | 'medium' | 'large'

interface LucaInputProps extends Omit<BaseStyleProps, 'onClick'> {
  value?: string
  placeholder?: string
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'password'
  maxLength?: number
  disabled?: boolean
  readOnly?: boolean

  // 样式变体
  variant?: InputVariant
  size?: InputSize

  // 功能
  clearable?: boolean // 显示清除按钮
  prefix?: React.ReactNode // 前缀内容
  suffix?: React.ReactNode // 后缀内容
  error?: boolean // 错误状态
  errorMessage?: string // 错误提示

  // 事件
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onConfirm?: (value: string) => void
}

export default function LucaInput(props: LucaInputProps) {
  const {
    value = '',
    placeholder,
    type = 'text',
    maxLength,
    disabled = false,
    readOnly = false,
    variant = 'outlined',
    size = 'medium',
    clearable = false,
    prefix,
    suffix,
    error = false,
    errorMessage,
    onChange,
    onFocus,
    onBlur,
    onConfirm,
  } = props

  const [isFocused, setIsFocused] = useState(false)

  // 尺寸映射
  const sizeMap = {
    small: { height: '64rpx', fontSize: '28rpx', padding: '0 24rpx' },
    medium: { height: '80rpx', fontSize: '32rpx', padding: '0 32rpx' },
    large: { height: '96rpx', fontSize: '36rpx', padding: '0 40rpx' },
  }

  // 变体样式映射
  const variantStyleMap = {
    outlined: {
      border: `2rpx solid ${error ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border}`,
      borderRadius: theme.borderRadius.sm,
      backgroundColor: theme.colors.bgPrimary,
    },
    filled: {
      border: 'none',
      borderBottom: `2rpx solid ${error ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border}`,
      borderRadius: `${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0`,
      backgroundColor: theme.colors.bgSecondary,
    },
    standard: {
      border: 'none',
      borderBottom: `2rpx solid ${error ? theme.colors.danger : isFocused ? theme.colors.primary : theme.colors.border}`,
      borderRadius: 0,
      backgroundColor: 'transparent',
    },
  }

  // 容器样式
  const containerStyle: CSSProperties = useMemo(() => {
    const baseStyle = parseStyleProps(props)
    Object.assign(baseStyle, {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease',
      ...sizeMap[size],
      ...variantStyleMap[variant],
    })

    if (disabled) {
      baseStyle.opacity = 0.6
      baseStyle.cursor = 'not-allowed'
    }

    return baseStyle
  }, [props, size, variant, isFocused, error, disabled])

  // 输入框样式
  const inputStyle: CSSProperties = {
    flex: 1,
    fontSize: sizeMap[size].fontSize,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: theme.colors.textPrimary,
  }

  const handleInput = (e: any) => {
    onChange?.(e.detail.value)
  }

  const handleClear = () => {
    onChange?.('')
  }

  const handleFocus = () => {
    setIsFocused(true)
    onFocus?.()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur?.()
  }

  const handleConfirm = (e: any) => {
    onConfirm?.(e.detail.value)
  }

  return (
    <View>
      <View style={containerStyle}>
        {/* 前缀 */}
        {prefix && <View style={{ marginRight: '16rpx' }}>{prefix}</View>}

        {/* 输入框 */}
        <Input
          style={inputStyle}
          value={value}
          placeholder={placeholder}
          type={type as any}
          maxlength={maxLength}
          disabled={disabled || readOnly}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onConfirm={handleConfirm}
        />

        {/* 清除按钮 */}
        {clearable && value && !disabled && !readOnly && (
          <View
            style={{
              marginLeft: '16rpx',
              width: '32rpx',
              height: '32rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.colors.borderLight,
            }}
            onClick={handleClear}
          >
            <LucaText size="24rpx" color={theme.colors.textTertiary}>
              ×
            </LucaText>
          </View>
        )}

        {/* 后缀 */}
        {suffix && <View style={{ marginLeft: '16rpx' }}>{suffix}</View>}
      </View>

      {/* 错误提示 */}
      {error && errorMessage && (
        <LucaText
          size="24rpx"
          color={theme.colors.danger}
          style={{ marginTop: '8rpx', marginLeft: '8rpx' }}
        >
          {errorMessage}
        </LucaText>
      )}
    </View>
  )
}
