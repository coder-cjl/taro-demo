import { View, ScrollView } from '@tarojs/components'
import { useMemo, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { getGlobalBottomMarginBottom, getGlobalBottomMarginTop } from '../constant'
import logger from 'src/utils/log'

interface LucaFixedBottomProps {
  topChildren: React.ReactNode // 顶部可滚动内容
  bottomChildren: React.ReactNode // 底部固定内容（按钮等）
  bottomHeight: number | string // 底部固定区域高度（不含安全区域）
  backgroundColor?: string // 底部背景色（默认 #fff）
  useSafeArea?: boolean // 是否启用底部安全区域适配（默认 true）
}

/**
 * 固定底部布局组件
 * 适用场景：底部固定按钮，顶部内容可滚动
 * 支持安全区域适配（iPhone X 系列底部黑条）
 *
 * @example
 * <LucaFixedBottom
 *   bottomHeight="60px"
 *   useSafeArea={true}
 *   topChildren={<View>可滚动内容</View>}
 *   bottomChildren={<Button>提交</Button>}
 * />
 */
export default function LucaFixedBottom(props: LucaFixedBottomProps) {
  const { useSafeArea = true } = props

  // 获取底部安全区域高度
  const [safeAreaBottom, setSafeAreaBottom] = useState(0)

  useEffect(() => {
    if (useSafeArea) {
      const systemInfo = Taro.getSystemInfoSync()
      const safeBottom =
        systemInfo.screenHeight - (systemInfo.safeArea?.bottom || systemInfo.screenHeight)
      setSafeAreaBottom(safeBottom)
    }
  }, [useSafeArea])

  // 计算实际底部高度（内容高度 + 安全区域）
  const actualBottomHeight = useMemo(() => {
    const baseHeight =
      typeof props.bottomHeight === 'number' ? props.bottomHeight : parseFloat(props.bottomHeight)

    const marginTop = getGlobalBottomMarginTop()
    const marginBottom = getGlobalBottomMarginBottom()

    return useSafeArea
      ? baseHeight + safeAreaBottom + marginTop
      : baseHeight + marginTop + marginBottom
  }, [props.bottomHeight, safeAreaBottom, useSafeArea])

  // 计算顶部内容区域高度（100vh - 底部总高度）
  const topContentHeight = useMemo(() => {
    return `calc(100vh - ${actualBottomHeight}px)`
  }, [actualBottomHeight])

  // 底部固定区域样式
  const bottomContainerStyle: React.CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: `${actualBottomHeight}`,
      backgroundColor: props.backgroundColor || '#fff',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.03)',
      zIndex: 100,
      paddingBottom: useSafeArea ? `${safeAreaBottom}px` : 0,
      boxSizing: 'border-box',
    }),
    [actualBottomHeight, props.backgroundColor, useSafeArea, safeAreaBottom]
  )

  // 顶部内容区域样式 - ScrollView 需要固定高度
  const topContainerStyle: React.CSSProperties = useMemo(
    () => ({
      width: '100%',
      height: topContentHeight,
    }),
    [topContentHeight]
  )

  return (
    <View
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    >
      {/* 顶部可滚动内容区域 */}
      <ScrollView scrollY style={topContainerStyle}>
        {props.topChildren}
      </ScrollView>

      {/* 底部固定区域 */}
      <View style={bottomContainerStyle}>{props.bottomChildren}</View>
    </View>
  )
}
