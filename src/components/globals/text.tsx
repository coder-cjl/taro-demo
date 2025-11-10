import { Text } from "@tarojs/components";
import { CSSProperties, useMemo } from "react";

interface LucaTextProps extends React.PropsWithChildren {
    size?: string | number;  // 字体大小,如 '14px', 16
    color?: string;  // 文字颜色
    weight?: 'normal' | 'bold' | 'lighter' | number;  // 字重
    align?: 'left' | 'center' | 'right';  // 文字对齐
    lineHeight?: string | number;  // 行高
    ellipsis?: boolean;  // 是否显示省略号(单行)
    lines?: number;  // 多行省略,指定行数
    style?: CSSProperties;  // 额外样式
    onClick?: () => void;  // 点击事件
}

export default function LucaText(props: LucaTextProps) {

    // 使用 useMemo 缓存样式对象,避免每次渲染都创建新对象
    const textStyle: CSSProperties = useMemo(() => {
        const baseStyle: CSSProperties = {
            fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
            color: props.color,
            fontWeight: props.weight,
            textAlign: props.align,
            lineHeight: typeof props.lineHeight === 'number' ? `${props.lineHeight}px` : props.lineHeight,
            ...props.style
        };

        // 单行省略
        if (props.ellipsis && !props.lines) {
            Object.assign(baseStyle, {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            });
        }

        // 多行省略
        if (props.lines && props.lines > 0) {
            Object.assign(baseStyle, {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: props.lines,
                WebkitBoxOrient: 'vertical'
            });
        }

        return baseStyle;
    }, [props.size, props.color, props.weight, props.align, props.lineHeight, props.ellipsis, props.lines, props.style]);

    return (
        <Text style={textStyle} onClick={props.onClick}>
            {props.children}
        </Text>
    );
}
