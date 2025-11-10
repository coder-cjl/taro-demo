import { View } from "@tarojs/components";
import { CSSProperties, useMemo } from "react";

interface LucaContainerProps extends React.PropsWithChildren {
    padding?: string | number;  // 内边距，如 '16px', 16
    margin?: string | number;   // 外边距
    backgroundColor?: string;   // 背景色
    borderRadius?: string | number;  // 圆角
    width?: string | number;    // 宽度
    height?: string | number;   // 高度
    shadow?: boolean;           // 是否显示阴影
    border?: string;            // 边框，如 '1px solid #ddd'
    style?: CSSProperties;      // 额外样式
    onClick?: () => void;       // 点击事件
}

export default function LucaContainer(props: LucaContainerProps) {

    // 使用 useMemo 缓存样式对象，避免每次渲染都创建新对象
    const containerStyle: CSSProperties = useMemo(() => {
        const baseStyle: CSSProperties = {
            padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding,
            margin: typeof props.margin === 'number' ? `${props.margin}px` : props.margin,
            backgroundColor: props.backgroundColor,
            borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius,
            width: typeof props.width === 'number' ? `${props.width}px` : props.width,
            height: typeof props.height === 'number' ? `${props.height}px` : props.height,
            border: props.border,
            ...props.style
        };

        // 添加阴影
        if (props.shadow) {
            baseStyle.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }

        return baseStyle;
    }, [
        props.padding,
        props.margin,
        props.backgroundColor,
        props.borderRadius,
        props.width,
        props.height,
        props.shadow,
        props.border,
        props.style
    ]);

    return (
        <View style={containerStyle} onClick={props.onClick}>
            {props.children}
        </View>
    );
}
