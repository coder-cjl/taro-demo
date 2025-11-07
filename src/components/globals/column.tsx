import { View } from "@tarojs/components";
import { CSSProperties } from "react";

interface LucaColumnProps extends React.PropsWithChildren {
    alignItems?: 'left' | 'center' | 'right';
    justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    itemMargin?: string;  // 子元素之间的间隔
    style?: CSSProperties;  // 支持额外样式
}

// 对齐方式映射
const alignItemsMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
} as const;

const justifyContentMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    'space-between': 'space-between',
    'space-around': 'space-around'
} as const;

export default function LucaColumn(props: LucaColumnProps) {
    
    return (
        <View style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: alignItemsMap[props.alignItems || 'center'],
            justifyContent: justifyContentMap[props.justifyContent || 'center'],
            gap: props.itemMargin || '0',
            ...props.style  // 允许覆盖或添加其他样式
        }}>
            {props.children}
        </View>
    )
}