import { Image } from "@nutui/nutui-react-taro";
import { ImageProps } from "@nutui/nutui-react-taro";

interface LucaImageProps extends Partial<ImageProps> {
    src: string;                     // 图片源地址
    alt?: string;                    // 替代文本
    width?: string | number;         // 宽度，如 '100px', '50%', 100
    height?: string | number;        // 高度
    borderRadius?: string | number;  // 圆角
    fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'; // 图片适应方式
    round?: boolean;                 // 是否显示为圆形
    onClick?: () => void;            // 点击事件
    style?: React.CSSProperties;     // 额外样式
}

export default function LucaImage(props: LucaImageProps) {

    const imageStyle: React.CSSProperties = {
        width: typeof props.width === 'number' ? `${props.width}px` : props.width,
        height: typeof props.height === 'number' ? `${props.height}px` : props.height,
        borderRadius: props.round ? '50%' : (typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius),
        objectFit: props.fit,
        display: 'block',  // 避免图片底部空隙
        ...props.style
    };

    return (
        <Image 
            src={props.src}
            style={imageStyle}
            onClick={props.onClick}
        />
    );
}