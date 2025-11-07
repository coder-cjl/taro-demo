/**
 * Luca UI 组件示例页面
 * 展示所有组件的基本用法
 */

import { View } from "@tarojs/components"
import { 
  LucaButton, 
  LucaColumn, 
  LucaRow, 
  LucaText, 
  LucaContainer, 
  LucaImage 
} from './luca-ui'

export default function ComponentsExample() {
  return (
    <View style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '16px' }}>
      <LucaColumn itemMargin="16px">
        
        {/* 按钮示例 */}
        <LucaContainer backgroundColor="white" padding="16px">
          <LucaColumn itemMargin="12px">
            <LucaText size="16px" weight="bold">按钮 LucaButton</LucaText>
            <LucaRow itemMargin="8px">
              <LucaButton color="primary">主要按钮</LucaButton>
              <LucaButton color="success">成功按钮</LucaButton>
              <LucaButton color="warning">警告按钮</LucaButton>
            </LucaRow>
            <LucaRow itemMargin="8px">
              <LucaButton size="large">大按钮</LucaButton>
              <LucaButton size="normal">普通</LucaButton>
              <LucaButton size="small">小按钮</LucaButton>
            </LucaRow>
          </LucaColumn>
        </LucaContainer>

        {/* 文字示例 */}
        <LucaContainer backgroundColor="white" padding="16px">
          <LucaColumn itemMargin="12px" alignItems="left">
            <LucaText size="16px" weight="bold">文字 LucaText</LucaText>
            <LucaText size="18px" weight="bold">这是标题</LucaText>
            <LucaText size="14px">这是正文内容</LucaText>
            <LucaText size="12px" color="#999">这是辅助文字</LucaText>
            <LucaText size="14px" ellipsis>
              这是一段很长的文字，超出部分会显示省略号...这是一段很长的文字
            </LucaText>
            <LucaText size="14px" lines={2}>
              这是多行省略的示例，这是多行省略的示例，这是多行省略的示例，这是多行省略的示例，这是多行省略的示例
            </LucaText>
          </LucaColumn>
        </LucaContainer>

        {/* 布局示例 */}
        <LucaContainer backgroundColor="white" padding="16px">
          <LucaColumn itemMargin="12px">
            <LucaText size="16px" weight="bold">布局 LucaRow & LucaColumn</LucaText>
            
            <LucaText size="14px" color="#666">横向布局：</LucaText>
            <LucaRow itemMargin="8px">
              <View style={{ width: '60px', height: '60px', backgroundColor: '#1890ff' }} />
              <View style={{ width: '60px', height: '60px', backgroundColor: '#52c41a' }} />
              <View style={{ width: '60px', height: '60px', backgroundColor: '#faad14' }} />
            </LucaRow>

            <LucaText size="14px" color="#666">垂直布局：</LucaText>
            <LucaColumn itemMargin="8px">
              <View style={{ width: '100%', height: '40px', backgroundColor: '#1890ff' }} />
              <View style={{ width: '100%', height: '40px', backgroundColor: '#52c41a' }} />
              <View style={{ width: '100%', height: '40px', backgroundColor: '#faad14' }} />
            </LucaColumn>
          </LucaColumn>
        </LucaContainer>

        {/* 图片示例 */}
        <LucaContainer backgroundColor="white" padding="16px">
          <LucaColumn itemMargin="12px">
            <LucaText size="16px" weight="bold">图片 LucaImage</LucaText>
            <LucaRow itemMargin="12px">
              <LucaImage 
                src="https://via.placeholder.com/100" 
                width={80} 
                height={80}
                borderRadius="8px"
              />
              <LucaImage 
                src="https://via.placeholder.com/100" 
                width={80} 
                height={80}
                round
              />
            </LucaRow>
          </LucaColumn>
        </LucaContainer>

        {/* 卡片示例 */}
        <LucaContainer backgroundColor="white" shadow borderRadius="12px" padding="16px">
          <LucaColumn itemMargin="12px">
            <LucaText size="16px" weight="bold">综合示例 - 商品卡片</LucaText>
            
            <LucaImage 
              src="https://via.placeholder.com/300x200" 
              width="100%" 
              height="160px"
              borderRadius="8px"
            />
            
            <LucaText size="16px" weight="bold">商品名称</LucaText>
            
            <LucaText size="14px" color="#666" lines={2}>
              这是商品的详细描述信息，可能会很长，超过两行会显示省略号
            </LucaText>
            
            <LucaRow justifyContent="space-between" alignItems="bottom">
              <LucaColumn alignItems="left" itemMargin="4px">
                <LucaText size="12px" color="#999" style={{ textDecoration: 'line-through' }}>
                  ¥399
                </LucaText>
                <LucaText size="20px" color="red" weight="bold">¥299</LucaText>
              </LucaColumn>
              <LucaButton color="primary" size="small">立即购买</LucaButton>
            </LucaRow>
          </LucaColumn>
        </LucaContainer>

        {/* 列表示例 */}
        <LucaContainer backgroundColor="white" padding="0">
          <LucaColumn itemMargin="0">
            <View style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
              <LucaText size="16px" weight="bold">列表示例</LucaText>
            </View>
            
            {[1, 2, 3].map(item => (
              <LucaRow 
                key={item}
                justifyContent="space-between"
                style={{ 
                  padding: '12px 16px', 
                  borderBottom: '1px solid #f0f0f0' 
                }}
              >
                <LucaRow itemMargin="12px">
                  <LucaImage 
                    src={`https://via.placeholder.com/40`}
                    width={40} 
                    height={40}
                    round
                  />
                  <LucaColumn alignItems="left" itemMargin="4px">
                    <LucaText size="14px">列表项标题 {item}</LucaText>
                    <LucaText size="12px" color="#999">副标题描述</LucaText>
                  </LucaColumn>
                </LucaRow>
                <LucaText size="14px" color="#999">›</LucaText>
              </LucaRow>
            ))}
          </LucaColumn>
        </LucaContainer>

      </LucaColumn>
    </View>
  )
}
