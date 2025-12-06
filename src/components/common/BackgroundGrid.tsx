interface BackgroundGridProps {
    opacity?: 'light' | 'medium' | 'heavy'
    size?: number
}

export default function BackgroundGrid({opacity = 'light', size = 48}: BackgroundGridProps) {
    const opacityMap = {
        light: '02',
        medium: '05',
        heavy: '10',
    }

    return (
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                backgroundImage: `linear-gradient(to right, #ffffff${opacityMap[opacity]} 1px, transparent 1px), linear-gradient(to bottom, #ffffff${opacityMap[opacity]} 1px, transparent 1px)`,
                backgroundSize: `${size}px ${size}px`,
            }}
        />
    )
}
