/**
 * 全局主题配置
 * 统一管理颜色、字体、间距等设计规范
 */

export const theme = {
  // 颜色系统
  colors: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#f5222d',
    
    // 文字颜色
    textPrimary: '#000000',
    textSecondary: '#333333',
    textTertiary: '#666666',
    textDisabled: '#999999',
    
    // 背景颜色
    bgPrimary: '#ffffff',
    bgSecondary: '#f5f5f5',
    bgTertiary: '#fafafa',
    
    // 边框颜色
    border: '#d9d9d9',
    borderLight: '#f0f0f0',
  },
  
  // 字体系统
  fontSize: {
    xs: '12px',   // 辅助文字
    sm: '14px',   // 正文
    md: '16px',   // 小标题
    lg: '18px',   // 标题
    xl: '20px',   // 大标题
    xxl: '24px',  // 超大标题
  },
  
  // 字重
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700,
  },
  
  // 间距系统
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  
  // 圆角
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  
  // 阴影
  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 2px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  
  // 层级
  zIndex: {
    base: 1,
    dropdown: 10,
    modal: 100,
    toast: 1000,
  },
} as const

export type Theme = typeof theme

// 导出类型
export type ColorKey = keyof typeof theme.colors
export type FontSizeKey = keyof typeof theme.fontSize
export type SpacingKey = keyof typeof theme.spacing
export type BorderRadiusKey = keyof typeof theme.borderRadius

export default theme
