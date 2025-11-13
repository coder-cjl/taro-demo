import {
  LucaColumn,
  LucaContainer,
  LucaRow,
  LucaText,
  LucaCard,
  LucaList,
  LucaSpace,
} from 'src/components/luca-ui'

function GaintPlanHeaderComponent() {
  return (
    <LucaRow justifyContent="space-between" width="100%">
      <LucaText variant="h3">术后-出院康复方案</LucaText>
      <LucaSpace size="small">
        <LucaText variant="body" color="#49869E">
          调整方案
        </LucaText>
        <LucaContainer width={40} height={40} backgroundColor="red" />
      </LucaSpace>
    </LucaRow>
  )
}

function GaintPlanItemComponent() {
  return (
    <LucaCard backgroundColor="#F6F6F6" marginBottom={28} borderRadius={32}>
      <LucaRow justifyContent="space-between">
        <LucaSpace size="medium">
          <LucaContainer width={40} height={40} backgroundColor="red" />
          <LucaText variant="h2" color="#1F1F1F">
            调整方案
          </LucaText>
        </LucaSpace>
        <LucaColumn justifyContent="center" alignItems="center">
          <LucaText variant="small" color="#444444">
            一级强度
          </LucaText>
          <LucaText variant="small" color="#444444">
            每周2天，每天2组
          </LucaText>
        </LucaColumn>
      </LucaRow>
    </LucaCard>
  )
}

function GaintPlanSectionComponent() {
  // 模拟数据(实际使用时从 props 传入)
  const items = [1, 2, 3] // 3个康复项目

  return (
    <LucaColumn justifyContent="start" alignItems="stretch">
      <LucaText variant="h3" weight="normal" marginTop={24} marginBottom={16}>
        膝关节
      </LucaText>
      <LucaList
        data={items}
        renderItem={() => <GaintPlanItemComponent />}
        gap="0rpx"
        emptyText="暂无康复项目"
      />
    </LucaColumn>
  )
}

function GaintPlanComponent() {
  // 模拟数据(实际使用时从 props 或 state 获取)
  const sections = [1, 2, 3, 4] // 4个关节部位

  return (
    <LucaContainer fullWidth paddingX={48}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent />
        <LucaList data={sections} renderItem={() => <GaintPlanSectionComponent />} gap="0rpx" />
      </LucaColumn>
    </LucaContainer>
  )
}

function PingGuToolCellComponent() {
  return (
    <LucaCard
      width={312}
      height={180}
      borderRadius={32}
      backgroundColor="#FFF4F4"
      variant="filled"
      padding={28}
    >
      <LucaColumn justifyContent="space-between" alignItems="stretch" height="100%">
        <LucaText variant="body" color="#1F1F1F">
          HSS评分
        </LucaText>
        <LucaSpace size="small" align="end">
          <LucaText variant="h1" color="#FF4444">
            差
          </LucaText>
          <LucaText variant="body" color="#1F1F1F" marginBottom={8}>
            HSS评分
          </LucaText>
        </LucaSpace>
      </LucaColumn>
    </LucaCard>
  )
}

function PingGuSectionComponent() {
  const cellsRow1 = [1, 2] // 第一行 2 个卡片
  const cellsRow2 = [1, 2] // 第二行 2 个卡片

  return (
    <LucaColumn gap="30rpx" marginTop={24}>
      <LucaSpace size={30} wrap>
        {cellsRow1.map((_, index) => (
          <PingGuToolCellComponent key={`row1-${index}`} />
        ))}
      </LucaSpace>
      <LucaSpace size={30} wrap>
        {cellsRow2.map((_, index) => (
          <PingGuToolCellComponent key={`row2-${index}`} />
        ))}
      </LucaSpace>
    </LucaColumn>
  )
}

function PingGuToolComponent() {
  return (
    <LucaContainer fullWidth paddingX={48} marginBottom={32}>
      <LucaColumn alignItems="stretch">
        <GaintPlanHeaderComponent />
        <PingGuSectionComponent />
      </LucaColumn>
    </LucaContainer>
  )
}

export { PingGuToolComponent, GaintPlanComponent }
