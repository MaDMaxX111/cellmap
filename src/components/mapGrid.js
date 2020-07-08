import React, { useState } from 'react';
import MapCell from './mapCell'
import { mapAlphabet } from '../utils'
import GridContainer from '../styled/gridContainer'
import {
    CoordColumn,
    CoordColumnItem,
    CoordRow,
    CoordRowItem,
} from '../styled/mapCoord'

const MapGrid = ({
                     baseCellSize,
                     zoom,
                     offset,
                     widthParent,
                     heightParent,
                     handleMouseDown,
                     handleMouseUp,
                     handleMouseMove,
                     handleMouseLeave,
                     handleMouseWheel,
} : {
    baseCellSize : number,
    zoom : number,
    offset : [number, number],
    widthParent : number,
    heightParent : number,
    handleMouseDown : Function,
    handleMouseUp : Function,
    handleMouseMove : Function,
    handleMouseLeave : Function,
    handleMouseWheel : Function,
}) => {
    // const start = performance.now();

    const [selectedCell, setSelectedCell] = useState([])

    const baseCellSizeZoom = baseCellSize * zoom;

    const [offsetX, offsetY] = offset;

    const cells = [];

    let startRowIndex = Math.floor(Math.abs(offsetY) / baseCellSizeZoom);
    const endRowIndex = Math.ceil(heightParent / baseCellSizeZoom) + startRowIndex - 1 + (offsetY % baseCellSizeZoom ? 1 : 0);

    let startColumnIndex = Math.floor(Math.abs(offsetX) / baseCellSizeZoom);
    const endColumnIndex = Math.ceil(widthParent / baseCellSizeZoom) + startColumnIndex - 1 + (offsetX % baseCellSizeZoom ? 1 : 0);

    const [selectedRow, selectedColumn] = selectedCell

    const reduceFactor = Math.ceil((endColumnIndex - startColumnIndex + 1) / 20) || 1;

    startColumnIndex = Math.floor(startColumnIndex / reduceFactor) * reduceFactor;
    startRowIndex = Math.floor(startRowIndex / reduceFactor) * reduceFactor;

    for (let i = startRowIndex; i <= endRowIndex; i += reduceFactor) {
        for (let j = startColumnIndex; j <= endColumnIndex; j += reduceFactor) {

            let cellMarker = reduceFactor > 1 ? `${mapAlphabet(j)}${i + 1}-${mapAlphabet(j + reduceFactor - 1)}${i + reduceFactor}` : `${mapAlphabet(j)}${i + 1}`;

            cells.push(
                <MapCell
                    key={`row${i},column${j}`}
                    alphCoord={cellMarker}
                    size={baseCellSizeZoom * reduceFactor}
                    row={i}
                    column={j}
                    onMouseEnter={() => setSelectedCell([i, j])}
                    selected={(i === selectedRow || j === selectedColumn) ? true : false}
                />
            )
        }
    }
// console.log(performance.now() - start);
    return (
        <GridContainer
            width={(Math.ceil((endColumnIndex - startColumnIndex + 1) / reduceFactor) * reduceFactor * baseCellSizeZoom)}
            height={Math.ceil((endRowIndex - startRowIndex + 1) / reduceFactor) * reduceFactor * baseCellSizeZoom}
            top={offsetY % (baseCellSizeZoom * reduceFactor)}
            left={offsetX % (baseCellSizeZoom * reduceFactor)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onWheel={handleMouseWheel}
        >
            <CoordColumn
                top={offsetY % (baseCellSizeZoom * reduceFactor) * -1}
            >
                {
                    (endColumnIndex - startColumnIndex + 1) > 0 &&
                    Array(Math.ceil((endColumnIndex - startColumnIndex + 1)/reduceFactor)).fill(1).map((v, i) => reduceFactor > 1 ? `${mapAlphabet(startColumnIndex + i * reduceFactor)}-${mapAlphabet(startColumnIndex + (i + 1) * reduceFactor - 1)}` : `${mapAlphabet(startColumnIndex + i * reduceFactor)}`).map((i, index) => <CoordColumnItem key={index} size={baseCellSizeZoom * reduceFactor} data-coord={i} />)
                }
            </CoordColumn>
            <CoordRow
                left={offsetX % (baseCellSizeZoom * reduceFactor) * -1}
            >
                {
                    (endRowIndex - startRowIndex + 1) > 0 &&
                    Array(Math.ceil((endRowIndex - startRowIndex + 1)/reduceFactor)).fill(1).map((v, i) => reduceFactor > 1 ? `${startRowIndex + i * reduceFactor + 1}-${startRowIndex + (i + 1) * reduceFactor}` : `${startRowIndex + i * reduceFactor + 1}`).map((i, index) => <CoordRowItem key={index} size={baseCellSizeZoom * reduceFactor} data-coord={i} />)
                }
            </CoordRow>
            {cells}
        </GridContainer>
    )
}

MapGrid.whyDidYouRender = true

export default MapGrid
