import { LucaColumn, LucaContainer, LucaRow, LucaText } from 'src/components/luca-ui'

function GaintPlanHeaderComponent() {
  return (
    <LucaRow justifyContent="space-between" style={{ width: '100%' }}>
      <LucaText size={'36rpx'}>术后-出院康复方案</LucaText>
      <LucaRow>
        <LucaText size={'32rpx'} color="#49869E">
          调整方案
        </LucaText>
        <LucaContainer width={'40rpx'} height={'40rpx'} backgroundColor="red"></LucaContainer>
      </LucaRow>
    </LucaRow>
  )
}

function GaintPlanItemComponent() {
  return (
    <LucaColumn alignItems="stretch">
      <LucaContainer
        padding={'24rpx'}
        margin={'0 0 28rpx 0'}
        backgroundColor="#F6F6F6"
        borderRadius={'32rpx'}
      >
        <LucaRow justifyContent="space-between">
          <LucaRow>
            <LucaContainer width={'40rpx'} height={'40rpx'} backgroundColor="red"></LucaContainer>
            <LucaText size={'44rpx'} color="##1F1F1F" style={{ marginLeft: '28rpx' }}>
              调整方案
            </LucaText>
          </LucaRow>
          <LucaColumn justifyContent="center" alignItems="center">
            <LucaText size={'24rpx'} color="#444444">
              一级强度
            </LucaText>
            <LucaText size={'24rpx'} color="#444444">
              每周2天，每天2组
            </LucaText>
          </LucaColumn>
        </LucaRow>
      </LucaContainer>
    </LucaColumn>
  )
}

function GaintPlanSectionComponent() {
  return (
    <LucaColumn justifyContent="start" alignItems="stretch">
      <LucaText
        size={'36rpx'}
        weight={'normal'}
        style={{ marginTop: '24rpx', marginBottom: '16rpx' }}
      >
        膝关节
      </LucaText>
      <GaintPlanItemComponent></GaintPlanItemComponent>
      <GaintPlanItemComponent></GaintPlanItemComponent>
      <GaintPlanItemComponent></GaintPlanItemComponent>
    </LucaColumn>
  )
}

function GaintPlanComponent() {
  return (
    <LucaContainer fullWidth padding={'0rpx 48rpx 0rpx 48rpx'}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent></GaintPlanHeaderComponent>
        <GaintPlanSectionComponent></GaintPlanSectionComponent>
        <GaintPlanSectionComponent></GaintPlanSectionComponent>
        <GaintPlanSectionComponent></GaintPlanSectionComponent>
        <GaintPlanSectionComponent></GaintPlanSectionComponent>
      </LucaColumn>
    </LucaContainer>
  )
}

function PingGuToolCellComponent() {
  return (
    <LucaContainer
      width={'312rpx'}
      height={'180rpx'}
      backgroundColor="#FFF4F4"
      borderRadius={'32rpx'}
      padding={'28rpx'}
    >
      <LucaColumn justifyContent="space-between" alignItems="stretch">
        <LucaText size={'32rpx'} color="#1F1F1F">
          HSS评分
        </LucaText>
        <LucaRow style={{ marginTop: '16rpx' }} alignItems="bottom">
          <LucaText size={'48rpx'} weight={'bold'} color="#FF4444">
            差
          </LucaText>
          <LucaText
            size={'32rpx'}
            color="#1F1F1F"
            style={{ marginLeft: '12rpx', marginBottom: '8rpx' }}
          >
            HSS评分
          </LucaText>
        </LucaRow>
      </LucaColumn>
    </LucaContainer>
  )
}

function PingGuSectionComponent() {
  return (
    <LucaColumn gap="30rpx" style={{ margin: '24rpx 0 0 0' }}>
      <LucaRow gap="30rpx">
        <PingGuToolCellComponent></PingGuToolCellComponent>
        <PingGuToolCellComponent></PingGuToolCellComponent>
      </LucaRow>
      <LucaRow gap="30rpx">
        <PingGuToolCellComponent></PingGuToolCellComponent>
        <PingGuToolCellComponent></PingGuToolCellComponent>
      </LucaRow>
    </LucaColumn>
  )
}

function PingGuToolComponent() {
  return (
    <LucaContainer fullWidth padding={'0rpx 48rpx 0rpx 48rpx'} margin={'0 0 32rpx 0'}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent />
        <PingGuSectionComponent />
      </LucaColumn>
    </LucaContainer>
  )
}

export { PingGuToolComponent, GaintPlanComponent }
