# 日期时间工具库使用文档

> 适用于 Taro 小程序开发的完整日期时间处理方案

## 📦 导入

```typescript
import {
  formatDate,
  formatRelativeTime,
  formatFriendlyTime,
  isToday,
  addDays,
  // ... 按需导入
} from 'src/utils/date'
```

---

## 🎯 快速开始

### 常用场景

```typescript
// 格式化日期
formatDate(new Date(), 'YYYY-MM-DD hh:mm:ss')  // '2025-11-10 14:30:25'

// 相对时间（社交场景）
formatRelativeTime(Date.now() - 60000)  // '1分钟前'

// 友好时间（聊天消息）
formatFriendlyTime(timestamp)  // '昨天 14:30'

// 判断今天
isToday(new Date())  // true

// 日期计算
addDays(new Date(), 7)  // 7天后
```

---

## 📚 API 文档

### 1️⃣ 日期格式化

#### `formatDate(date, format?)`

格式化日期对象

**参数**:
- `date: Date` - 日期对象
- `format?: string` - 格式化模板（默认：'YYYY-MM-DD hh:mm:ss'）

**格式化符号**:
| 符号 | 说明 | 示例 |
|------|------|------|
| `YYYY` | 四位年份 | 2025 |
| `MM` | 两位月份 | 01-12 |
| `DD` | 两位日期 | 01-31 |
| `hh` | 两位小时 | 00-23 |
| `mm` | 两位分钟 | 00-59 |
| `ss` | 两位秒数 | 00-59 |
| `SSS` | 三位毫秒 | 000-999 |
| `W` | 星期几 | 日-六 |

**示例**:
```typescript
formatDate(new Date(), 'YYYY-MM-DD')           // '2025-11-10'
formatDate(new Date(), 'YYYY年MM月DD日')      // '2025年11月10日'
formatDate(new Date(), 'hh:mm:ss')             // '14:30:25'
formatDate(new Date(), 'YYYY-MM-DD 星期W')     // '2025-11-10 星期日'
formatDate(new Date(), 'MM-DD hh:mm')          // '11-10 14:30'
```

---

#### `getCurrentDateString(format?)`

获取当前日期时间字符串

**参数**:
- `format?: string` - 格式化模板（默认：'YYYY-MM-DD hh:mm:ss'）

**示例**:
```typescript
getCurrentDateString()                  // '2025-11-10 14:30:25'
getCurrentDateString('YYYY-MM-DD')      // '2025-11-10'
getCurrentDateString('hh:mm:ss')        // '14:30:25'
```

---

#### `formatRelativeTime(timestamp)`

格式化为相对时间（"刚刚"、"3分钟前"）

**参数**:
- `timestamp: number` - 时间戳（毫秒）

**返回规则**:
- < 60秒 → "刚刚"
- < 60分钟 → "N分钟前"
- < 24小时 → "N小时前"
- < 30天 → "N天前"
- < 12个月 → "N个月前"
- ≥ 12个月 → "N年前"

**示例**:
```typescript
formatRelativeTime(Date.now() - 30000)      // '刚刚'
formatRelativeTime(Date.now() - 120000)     // '2分钟前'
formatRelativeTime(Date.now() - 7200000)    // '2小时前'
formatRelativeTime(Date.now() - 86400000)   // '1天前'
```

**适用场景**: 社交动态、评论时间、通知时间

---

#### `formatFriendlyTime(timestamp)`

格式化为友好时间显示

**参数**:
- `timestamp: number` - 时间戳（毫秒）

**返回规则**:
- 今天 → "14:30"
- 昨天 → "昨天 14:30"
- 今年 → "11-08 14:30"
- 往年 → "2024-11-08 14:30"

**示例**:
```typescript
// 假设今天是 2025-11-10
formatFriendlyTime(todayTimestamp)       // '14:30'
formatFriendlyTime(yesterdayTimestamp)   // '昨天 14:30'
formatFriendlyTime(thisYearTimestamp)    // '11-08 14:30'
formatFriendlyTime(lastYearTimestamp)    // '2024-11-08 14:30'
```

**适用场景**: 聊天消息列表、订单列表

---

#### `formatCountdown(seconds)`

格式化倒计时

**参数**:
- `seconds: number` - 剩余秒数

**示例**:
```typescript
formatCountdown(3661)    // '01:01:01'
formatCountdown(125)     // '00:02:05'
formatCountdown(59)      // '00:00:59'
```

**适用场景**: 秒杀倒计时、验证码倒计时

---

### 2️⃣ 时间戳转换

#### `timestampToDate(timestamp)`

时间戳转日期对象

**示例**:
```typescript
timestampToDate(1699603200000)  // Date对象
```

---

#### `dateToTimestamp(date)`

日期对象转时间戳

**示例**:
```typescript
dateToTimestamp(new Date())  // 1699603200000
```

---

#### `timestampToFormattedString(timestamp, format?)`

时间戳转格式化字符串

**示例**:
```typescript
timestampToFormattedString(1699603200000, 'YYYY-MM-DD')  // '2023-11-10'
```

---

#### `formattedStringToTimestamp(dateString)`

日期字符串转时间戳

**示例**:
```typescript
formattedStringToTimestamp('2023-11-10')  // 1699603200000
```

---

### 3️⃣ 日期计算

#### `dateDiffInDays(date1, date2)`

计算天数差

**示例**:
```typescript
const date1 = new Date('2023-11-01')
const date2 = new Date('2023-11-10')
dateDiffInDays(date1, date2)  // 9
```

---

#### `dateDiffInHours(date1, date2)`

计算小时差

**示例**:
```typescript
dateDiffInHours(date1, date2)  // 216 (9天 * 24小时)
```

---

#### `dateDiffInMinutes(date1, date2)`

计算分钟差

**示例**:
```typescript
dateDiffInMinutes(date1, date2)  // 12960 (9天 * 24小时 * 60分钟)
```

---

#### `addDays(date, days)`

添加天数

**示例**:
```typescript
addDays(new Date(), 7)   // 7天后
addDays(new Date(), -3)  // 3天前
```

---

#### `addHours(date, hours)`

添加小时

**示例**:
```typescript
addHours(new Date(), 2)   // 2小时后
addHours(new Date(), -1)  // 1小时前
```

---

#### `addMinutes(date, minutes)`

添加分钟

**示例**:
```typescript
addMinutes(new Date(), 30)   // 30分钟后
addMinutes(new Date(), -15)  // 15分钟前
```

---

### 4️⃣ 日期判断

#### `isToday(date)`

判断是否为今天

**示例**:
```typescript
isToday(new Date())  // true
isToday(new Date('2023-11-10'))  // false
```

---

#### `isYesterday(date)`

判断是否为昨天

**示例**:
```typescript
isYesterday(yesterdayDate)  // true
```

---

#### `isThisWeek(date)`

判断是否为本周

**示例**:
```typescript
isThisWeek(new Date())  // true
```

---

#### `isThisMonth(date)`

判断是否为本月

**示例**:
```typescript
isThisMonth(new Date())  // true
```

---

#### `isWeekday(date)`

判断是否为工作日（周一到周五）

**示例**:
```typescript
isWeekday(new Date())  // true/false
```

---

#### `isWeekend(date)`

判断是否为周末（周六或周日）

**示例**:
```typescript
isWeekend(new Date())  // true/false
```

---

#### `isLeapYear(year)`

判断是否为闰年

**示例**:
```typescript
isLeapYear(2024)  // true
isLeapYear(2023)  // false
```

---

### 5️⃣ 实用工具

#### `getDaysInMonth(year, month)`

获取月份天数

**示例**:
```typescript
getDaysInMonth(2024, 2)  // 29 (闰年2月)
getDaysInMonth(2023, 2)  // 28
getDaysInMonth(2024, 1)  // 31
```

---

#### `getStartOfDay(date)`

获取一天的开始时间（00:00:00）

**示例**:
```typescript
getStartOfDay(new Date())  // 2025-11-10 00:00:00.000
```

---

#### `getEndOfDay(date)`

获取一天的结束时间（23:59:59）

**示例**:
```typescript
getEndOfDay(new Date())  // 2025-11-10 23:59:59.999
```

---

#### `getStartOfWeek(date)`

获取本周开始时间（周日 00:00:00）

**示例**:
```typescript
getStartOfWeek(new Date())  // 本周日 00:00:00
```

---

#### `getStartOfMonth(date)`

获取本月开始时间

**示例**:
```typescript
getStartOfMonth(new Date())  // 2025-11-01 00:00:00
```

---

#### `getEndOfMonth(date)`

获取本月结束时间

**示例**:
```typescript
getEndOfMonth(new Date())  // 2025-11-30 23:59:59.999
```

---

#### `parseISODate(isoString)`

解析 ISO 8601 日期字符串（兼容小程序）

**说明**: 小程序某些平台不支持标准 ISO 格式，此方法做了兼容处理

**示例**:
```typescript
parseISODate('2023-11-10T14:30:25.000Z')  // Date对象
```

---

## 🎨 实战案例

### 案例1: 聊天消息列表

```typescript
interface Message {
  id: string
  content: string
  createTime: number
}

function MessageItem({ message }: { message: Message }) {
  const timeDisplay = formatFriendlyTime(message.createTime)
  
  return (
    <LucaRow justifyContent="space-between">
      <LucaText>{message.content}</LucaText>
      <LucaText size="12px" color="#999">{timeDisplay}</LucaText>
    </LucaRow>
  )
}

// 显示效果:
// "14:30"        (今天发送)
// "昨天 14:30"    (昨天发送)
// "11-08 14:30"  (今年早些时候)
```

---

### 案例2: 社交动态时间

```typescript
interface Post {
  id: string
  content: string
  publishTime: number
}

function PostCard({ post }: { post: Post }) {
  const timeAgo = formatRelativeTime(post.publishTime)
  
  return (
    <LucaContainer>
      <LucaText>{post.content}</LucaText>
      <LucaText size="12px" color="#999">{timeAgo}</LucaText>
    </LucaContainer>
  )
}

// 显示效果:
// "刚刚"
// "3分钟前"
// "2小时前"
// "1天前"
```

---

### 案例3: 秒杀倒计时

```typescript
import { useState, useEffect } from 'react'

function SeckillCountdown({ endTime }: { endTime: number }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const updateCountdown = () => {
      const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000))
      setSeconds(diff)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <LucaRow itemMargin="4px">
      <LucaText color="red" weight="bold">距结束</LucaText>
      <LucaText color="red" weight="bold">{formatCountdown(seconds)}</LucaText>
    </LucaRow>
  )
}

// 显示效果: "距结束 01:23:45"
```

---

### 案例4: 订单筛选

```typescript
function OrderList() {
  const [filter, setFilter] = useState<'today' | 'week' | 'month' | 'all'>('all')
  
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createTime)
    
    switch (filter) {
      case 'today':
        return isToday(orderDate)
      case 'week':
        return isThisWeek(orderDate)
      case 'month':
        return isThisMonth(orderDate)
      default:
        return true
    }
  })

  return (
    <LucaColumn>
      <LucaRow itemMargin="8px">
        <LucaButton onClick={() => setFilter('today')}>今天</LucaButton>
        <LucaButton onClick={() => setFilter('week')}>本周</LucaButton>
        <LucaButton onClick={() => setFilter('month')}>本月</LucaButton>
        <LucaButton onClick={() => setFilter('all')}>全部</LucaButton>
      </LucaRow>
      
      {filteredOrders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </LucaColumn>
  )
}
```

---

### 案例5: 会员到期提醒

```typescript
function VipStatus({ user }: { user: User }) {
  const vipEndDate = new Date(user.vipEndTime)
  const daysLeft = dateDiffInDays(new Date(), vipEndDate)
  
  const getStatusText = () => {
    if (daysLeft <= 0) return '会员已过期'
    if (daysLeft <= 7) return `即将过期，剩余${daysLeft}天`
    return `有效期至 ${formatDate(vipEndDate, 'YYYY-MM-DD')}`
  }
  
  const getStatusColor = () => {
    if (daysLeft <= 0) return '#999'
    if (daysLeft <= 7) return 'red'
    return '#52c41a'
  }

  return (
    <LucaText color={getStatusColor()}>
      {getStatusText()}
    </LucaText>
  )
}
```

---

### 案例6: 日期范围选择

```typescript
function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date>(getStartOfMonth(new Date()))
  const [endDate, setEndDate] = useState<Date>(getEndOfMonth(new Date()))

  const handlePresetRange = (range: 'week' | 'month' | 'lastMonth') => {
    const today = new Date()
    
    switch (range) {
      case 'week':
        setStartDate(getStartOfWeek(today))
        setEndDate(getEndOfDay(today))
        break
      case 'month':
        setStartDate(getStartOfMonth(today))
        setEndDate(getEndOfMonth(today))
        break
      case 'lastMonth':
        const lastMonth = addDays(getStartOfMonth(today), -1)
        setStartDate(getStartOfMonth(lastMonth))
        setEndDate(getEndOfMonth(lastMonth))
        break
    }
  }

  return (
    <LucaColumn itemMargin="12px">
      <LucaRow itemMargin="8px">
        <LucaButton onClick={() => handlePresetRange('week')}>本周</LucaButton>
        <LucaButton onClick={() => handlePresetRange('month')}>本月</LucaButton>
        <LucaButton onClick={() => handlePresetRange('lastMonth')}>上月</LucaButton>
      </LucaRow>
      
      <LucaText>
        {formatDate(startDate, 'YYYY-MM-DD')} 至 {formatDate(endDate, 'YYYY-MM-DD')}
      </LucaText>
    </LucaColumn>
  )
}
```

---

### 案例7: 工作日计算

```typescript
// 计算两个日期之间的工作日天数
function getWorkdaysBetween(startDate: Date, endDate: Date): number {
  let count = 0
  let currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    if (isWeekday(currentDate)) {
      count++
    }
    currentDate = addDays(currentDate, 1)
  }
  
  return count
}

// 使用示例
function DeliveryEstimate({ orderDate }: { orderDate: Date }) {
  const deliveryDate = addDays(orderDate, 3) // 3个工作日后
  const workdays = getWorkdaysBetween(orderDate, deliveryDate)
  
  return (
    <LucaText>
      预计 {workdays} 个工作日送达
      （{formatDate(deliveryDate, 'MM月DD日')}）
    </LucaText>
  )
}
```

---

## 💡 最佳实践

### 1. 统一使用工具函数

```typescript
// ✅ 好 - 使用工具函数
const dateStr = formatDate(new Date(), 'YYYY-MM-DD')

// ❌ 差 - 手动拼接
const date = new Date()
const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
```

---

### 2. 选择合适的时间格式

```typescript
// 聊天消息 - 使用友好时间
<LucaText>{formatFriendlyTime(message.time)}</LucaText>

// 社交动态 - 使用相对时间
<LucaText>{formatRelativeTime(post.time)}</LucaText>

// 订单详情 - 使用完整时间
<LucaText>{formatDate(order.time, 'YYYY-MM-DD hh:mm:ss')}</LucaText>
```

---

### 3. 避免重复创建 Date 对象

```typescript
// ✅ 好 - 复用 Date 对象
const now = new Date()
const today = formatDate(now, 'YYYY-MM-DD')
const time = formatDate(now, 'hh:mm:ss')

// ❌ 差 - 重复创建
const today = formatDate(new Date(), 'YYYY-MM-DD')
const time = formatDate(new Date(), 'hh:mm:ss')
```

---

### 4. 时区注意事项

```typescript
// 小程序环境统一使用 UTC+8，无需特殊处理
const timestamp = Date.now()  // ✅ 正确

// 如果接口返回 ISO 格式，使用兼容方法
const date = parseISODate(apiResponse.createTime)  // ✅ 兼容所有平台
```

---

### 5. 性能优化

```typescript
// ✅ 使用 useMemo 缓存格式化结果
const formattedDate = useMemo(() => 
  formatDate(order.createTime, 'YYYY-MM-DD'),
  [order.createTime]
)

// ✅ 倒计时使用防抖
const [countdown, setCountdown] = useState('')

useEffect(() => {
  const timer = setInterval(() => {
    const seconds = Math.floor((endTime - Date.now()) / 1000)
    setCountdown(formatCountdown(seconds))
  }, 1000)
  
  return () => clearInterval(timer)
}, [endTime])
```

---

## ⚠️ 注意事项

### 1. ISO 日期兼容性

小程序某些平台不支持 ISO 8601 格式：

```typescript
// ❌ 可能在某些平台失败
new Date('2023-11-10T14:30:25.000Z')

// ✅ 使用兼容方法
parseISODate('2023-11-10T14:30:25.000Z')
```

---

### 2. 月份从 0 开始

```typescript
// ❌ 错误 - 月份从 0 开始
new Date(2023, 11, 10)  // 实际是 2023-12-10

// ✅ 正确
new Date(2023, 10, 10)  // 2023-11-10
```

---

### 3. 时间戳精度

```typescript
// JavaScript 时间戳是毫秒级
Date.now()  // 1699603200000 (13位)

// 如果接口返回秒级时间戳，需要转换
const timestamp = apiTimestamp * 1000
```

---

### 4. 日期不可变性

```typescript
// Date 对象是可变的，需要创建新对象
const tomorrow = addDays(new Date(), 1)  // ✅ 返回新对象，不修改原对象

// 如果需要修改，先复制
const newDate = new Date(originalDate)
newDate.setDate(newDate.getDate() + 1)
```

---

## 📊 API 速查表

| 分类 | 方法 | 用途 |
|------|------|------|
| **格式化** | `formatDate()` | 通用格式化 |
| | `getCurrentDateString()` | 当前时间 |
| | `formatRelativeTime()` | 相对时间 |
| | `formatFriendlyTime()` | 友好时间 |
| | `formatCountdown()` | 倒计时 |
| **转换** | `timestampToDate()` | 时间戳→日期 |
| | `dateToTimestamp()` | 日期→时间戳 |
| | `timestampToFormattedString()` | 时间戳→字符串 |
| | `formattedStringToTimestamp()` | 字符串→时间戳 |
| **计算** | `dateDiffInDays()` | 天数差 |
| | `dateDiffInHours()` | 小时差 |
| | `dateDiffInMinutes()` | 分钟差 |
| | `addDays()` | 添加天数 |
| | `addHours()` | 添加小时 |
| | `addMinutes()` | 添加分钟 |
| **判断** | `isToday()` | 是否今天 |
| | `isYesterday()` | 是否昨天 |
| | `isThisWeek()` | 是否本周 |
| | `isThisMonth()` | 是否本月 |
| | `isWeekday()` | 是否工作日 |
| | `isWeekend()` | 是否周末 |
| | `isLeapYear()` | 是否闰年 |
| **工具** | `getDaysInMonth()` | 月份天数 |
| | `getStartOfDay()` | 一天开始 |
| | `getEndOfDay()` | 一天结束 |
| | `getStartOfWeek()` | 本周开始 |
| | `getStartOfMonth()` | 本月开始 |
| | `getEndOfMonth()` | 本月结束 |
| | `parseISODate()` | 解析ISO日期 |

---

**版本**: v2.0.0  
**更新日期**: 2025-11-10  
**兼容**: Taro 3.x + 微信/支付宝/抖音小程序

---

## 🔗 相关文档

- [组件库文档](../components/globals/README.md)
- [样式系统文档](../styles/STYLING-GUIDE.md)
- [工具函数索引](./README.md)
