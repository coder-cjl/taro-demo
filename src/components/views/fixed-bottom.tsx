import { View, ScrollView } from '@tarojs/components'
import { useMemo } from 'react'

interface LucaFixedBottomProps {
  topChildren: React.ReactNode // 顶部可滚动内容
  bottomChildren: React.ReactNode // 底部固定内容（按钮等）
  bottomHeight: number | string // 底部固定区域高度
  backgroundColor?: string // 底部背景色（默认 #fff）
}

/**
 * 固定底部布局组件
 * 适用场景：底部固定按钮，顶部内容可滚动
 *
 * @example
 * <LucaFixedBottom
 *   bottomHeight="60px"
 *   topChildren={<View>可滚动内容</View>}
 *   bottomChildren={<Button>提交</Button>}
 * />
 */
export default function LucaFixedBottom(props: LucaFixedBottomProps) {
  // 计算顶部内容区域高度（100vh - 底部高度）
  const topContentHeight = useMemo(() => {
    if (typeof props.bottomHeight === 'number') {
      return `calc(100vh - ${props.bottomHeight}px)`
    } else {
      return `calc(100vh - ${props.bottomHeight})`
    }
  }, [props.bottomHeight])

  // 底部固定区域样式
  const bottomContainerStyle: React.CSSProperties = useMemo(
    () => ({
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: props.bottomHeight,
      backgroundColor: props.backgroundColor || '#fff',
      boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.03)',
      zIndex: 100,
    }),
    [props.bottomHeight, props.backgroundColor]
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
