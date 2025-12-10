import type {ReactNode} from 'react'

type GridCols = 1 | 2 | 3 | 4
type Spacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface GridProps {
    children: ReactNode
    cols?: GridCols
    smCols?: GridCols
    mdCols?: GridCols
    lgCols?: GridCols
    gap?: 'sm' | 'md' | 'lg'
    mb?: Spacing
    className?: string
}

const colsMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
}

const smColsMap = {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
}

const mdColsMap = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
}

const lgColsMap = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
}

const gapMap = {
    sm: 'gap-3 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
}

const mbMap: Record<Spacing, string> = {
    none: '',
    sm: 'mb-4',
    md: 'mb-8',
    lg: 'mb-12',
    xl: 'mb-16 sm:mb-20',
}

export default function Grid({
    children,
    cols = 1,
    smCols,
    mdCols,
    lgCols,
    gap = 'md',
    mb = 'none',
    className = '',
}: GridProps) {
    const classes = [
        'grid',
        colsMap[cols],
        smCols ? smColsMap[smCols] : '',
        mdCols ? mdColsMap[mdCols] : '',
        lgCols ? lgColsMap[lgCols] : '',
        gapMap[gap],
        mbMap[mb],
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return <div className={classes}>{children}</div>
}
