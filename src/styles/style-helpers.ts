/**
 * 样式工具函数
 * 提供常用样式的快速生成方法
 */

import { CSSProperties } from "react";
import theme from "./theme";

/**
 * 转换尺寸值为 px 字符串
 */
export function toPx(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
}

/**
 * 创建 flex 居中样式
 */
export function flexCenter(): CSSProperties {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
}

/**
 * 创建文字省略样式
 */
export function ellipsis(lines?: number): CSSProperties {
  if (!lines || lines === 1) {
    // 单行省略
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    };
  }
  
  // 多行省略
  return {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
  };
}

/**
 * 创建绝对定位居中样式
 */
export function absoluteCenter(): CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

/**
 * 创建固定宽高比容器样式
 */
export function aspectRatio(ratio: number): CSSProperties {
  return {
    position: 'relative',
    paddingTop: `${(1 / ratio) * 100}%`,
  };
}

/**
 * 创建阴影样式
 */
export function shadow(level: 'sm' | 'md' | 'lg' = 'md'): CSSProperties {
  return {
    boxShadow: theme.shadow[level],
  };
}

/**
 * 创建圆角样式
 */
export function rounded(size: keyof typeof theme.borderRadius = 'md'): CSSProperties {
  return {
    borderRadius: theme.borderRadius[size],
  };
}

/**
 * 创建间距样式
 */
export function spacing(size: keyof typeof theme.spacing): string {
  return theme.spacing[size];
}

/**
 * 创建安全区域样式(适配 iPhone X 等刘海屏)
 */
export function safeAreaInset(position: 'top' | 'bottom' = 'bottom'): CSSProperties {
  if (position === 'top') {
    return {
      paddingTop: 'env(safe-area-inset-top)',
    };
  }
  return {
    paddingBottom: 'env(safe-area-inset-bottom)',
  };
}

/**
 * 创建 1px 边框样式(解决小程序 0.5px 问题)
 */
export function hairline(
  color: string = theme.colors.border,
  position: 'top' | 'bottom' | 'left' | 'right' | 'all' = 'all'
): CSSProperties {
  const borderStyle = `1px solid ${color}`;
  
  if (position === 'all') {
    return { border: borderStyle };
  }
  
  return {
    [`border${position.charAt(0).toUpperCase()}${position.slice(1)}`]: borderStyle,
  } as CSSProperties;
}

/**
 * 组合多个样式对象
 */
export function combineStyles(...styles: (CSSProperties | undefined)[]): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * 条件样式
 */
export function conditionalStyle(
  condition: boolean,
  trueStyle: CSSProperties,
  falseStyle?: CSSProperties
): CSSProperties {
  return condition ? trueStyle : (falseStyle || {});
}
