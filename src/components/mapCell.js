import React from 'react';
import Cell from '../styled/cellContainer'

const CellComponent = ({row, column, size, selected, alphCoord, ...rest}: {
    row: number,
    column: number,
    size: number,
    selected: boolean,
    alphCoord: string,
}) => {
    return (
        <Cell
            size={size}
            data-coord={`${row},${column}`}
            data-alphcoord={alphCoord}
            selected={selected}
            {...rest}
        />
    )
}

// CellComponent.whyDidYouRender = true

export default CellComponent
