/**
 * LucaList - 列表组件
 * 用于渲染数组数据,避免手动重复写组件
 */

import { View } from '@tarojs/components'
import { useMemo } from 'react'
import { BaseStyleProps, parseStyleProps } from './base-props'
import LucaColumn from './column'
import LucaRow from './row'

type ListDirection = 'column' | 'row'

interface LucaListProps<T> extends BaseStyleProps {
  data: T[] // 数据数组
  renderItem: (item: T, index: number) => React.ReactNode // 渲染函数
  gap?: string | number // 间距
  direction?: ListDirection // 方向
  emptyText?: string // 空数据提示
  divider?: boolean // 是否显示分割线
}

export default function LucaList<T>(props: LucaListProps<T>) {
  const {
    data,
    renderItem,
    gap = '0rpx',
    direction = 'column',
    emptyText = '暂无数据',
    divider = false,
  } = props

  const containerStyle = useMemo(() => {
    return parseStyleProps(props)
  }, [props])

  // 空数据
  if (!data || data.length === 0) {
    return (
      <View style={containerStyle}>
        <View
          style={{
            padding: '80rpx',
            textAlign: 'center',
            color: '#999',
            fontSize: '28rpx',
          }}
        >
          {emptyText}
        </View>
      </View>
    )
  }

  // 渲染列表项
  const renderItems = () => {
    return data.map((item, index) => {
      const itemNode = (
        <View key={index}>
          {renderItem(item, index)}
          {/* 分割线 */}
          {divider && index < data.length - 1 && (
            <View
              style={{
                height: '1rpx',
                backgroundColor: '#f0f0f0',
                margin: `${gap} 0`,
              }}
            />
          )}
        </View>
      )
      return itemNode
    })
  }

  return (
    <View style={containerStyle}>
      {direction === 'column' ? (
        <LucaColumn gap={typeof gap === 'number' ? `${gap}rpx` : gap}>{renderItems()}</LucaColumn>
      ) : (
        <LucaRow gap={typeof gap === 'number' ? `${gap}rpx` : gap}>{renderItems()}</LucaRow>
      )}
    </View>
  )
}
