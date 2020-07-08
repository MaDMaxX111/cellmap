import React, { useRef, useEffect } from 'react'
import useComponentSize from '@rehooks/component-size'

import Metter from './metter'
import MapWrapContainer from '../styled/mapWrap'
import MapBackground from '../styled/mapBackground'
import MapGrid from './mapGrid'
import useLegacyState from  './../hooks/legacyState'

const MapWrapper = ({mapSize, baseCellSize} : {
    mapSize: [number, number],
    baseCellSize: number,
}) => {

    const clickedRef = useRef();

    const coordDataRef : {
        current: Object,
    } = useRef();

    useEffect(() => {
        clickedRef.current = false;
        coordDataRef.current = {
            clickX: null,
            clickY: null,
            oldOffsetX: 0,
            oldOffsetY: 0,
        }
    },[]);

    // ссылка на контейнер и хук на ресайз
    const ref = useRef(null)
    const size = useComponentSize(ref)
    const { width, height } = size

    const [state, setState] = useLegacyState({
        offset: [0,0],
        zoom: 1,
        mapSize: null,
    })

    const { offset , zoom, mapSize: mapSizeState } = state

    mapSize = mapSizeState || mapSize

    const [offsetX, offsetY] = offset

    const baseCellSizeZoom = baseCellSize * zoom

    // проверяем зум
    if (zoom * mapSize[0] * baseCellSize < width) {
        setState({
            zoom: Math.ceil(width / (mapSize[0] * baseCellSize) * 100) / 100,
        })
    }

    if (zoom * mapSize[1] * baseCellSize < height) {
        setState({
            zoom: Math.ceil(height / (mapSize[1] * baseCellSize) * 100) / 100,
        })
    }

    const checkOffset = (newOffset, zoom) => {

        let [offsetX, offsetY] = newOffset

        if (offsetX > 0) {
            offsetX = 0;
        }

        if (offsetX < 0 - baseCellSize * mapSize[0] * zoom + width) {
            offsetX = 0 - baseCellSize * mapSize[0] * zoom + width
        }

        if (offsetY > 0) {
            offsetY = 0;
        }

        if (offsetY < 0 - baseCellSize * mapSize[1] * zoom + height) {
            offsetY = 0 - baseCellSize * mapSize[1] * zoom + height
        }

        return [offsetX, offsetY]

    }

    const handleMouseDown = (e) => {
        //сохраняем координаты клика/тапа и смещение карты на момент клика
        const isTouch = typeof e.pageX === 'undefined';
        const x = isTouch ? e.touches[0].pageX : e.pageX;
        const y = isTouch ? e.touches[0].pageY : e.pageY;

        const [offsetX, offsetY] = offset

        coordDataRef.current = {
            clickX: x,
            clickY: y,
            oldOffsetX: offsetX,
            oldOffsetY: offsetY,
        }

        clickedRef.current = true
    }

    const handleMouseUp = () => {
        clickedRef.current = false
    }

    const handleMouseMove = (e) => {
        if (!clickedRef.current) return;
        //расчитываем новые значения для смещения карты

        const isTouch = typeof e.pageX === 'undefined';
        const x = isTouch ? e.touches[0].pageX : e.pageX;
        const y = isTouch ? e.touches[0].pageY : e.pageY;

        let offsetX = coordDataRef.current.oldOffsetX + x - coordDataRef.current.clickX;
        let offsetY = coordDataRef.current.oldOffsetY + y - coordDataRef.current.clickY || 0;

        const [oldOffsetX, oldOffsetY] = offset

        // чтобы избежать ненужных re-render
        if (offsetX !== oldOffsetX || offsetY !== oldOffsetY) {
            setState({offset: checkOffset([offsetX, offsetY], zoom)})
        }

    }

    const handleMouseLeave = () => {
        clickedRef.current = false;
    }

    const handleMouseWheel = (e) => {

        const {deltaY, screenX, screenY} = e

        const coef = Math.round((deltaY / 1000) * 1000) / 1000

        let newZoom = Math.round((zoom - coef) * 1000) / 1000

        // ограничение масштабирования в зависимости от размера карты
        if (newZoom * mapSize[0] * baseCellSize < width) {
            newZoom = width / (mapSize[0] * baseCellSize)
        }

        // ограничение масштабирования в зависимости от размера карты
        if (newZoom * mapSize[1] * baseCellSize < height) {
            newZoom = height / (mapSize[1] * baseCellSize)
        }

        if (newZoom < 0.001) {
            newZoom = 0.001;
        }


        if (newZoom > 3) {
            newZoom = 3;
        }

        // ищем смещение на фокус зума
        const moreWidth = width * (newZoom - zoom);
        const moreHeight = height * (newZoom - zoom);

        const scrollX = -moreWidth / (width / screenX)

        const scrollY = -moreHeight / (height / screenY)

        const [oldOffsetX, oldOffsetY] = offset

        let offsetX = oldOffsetX + scrollX;
        let offsetY = oldOffsetY + scrollY;

        setState({
            offset: checkOffset([offsetX, offsetY], newZoom),
            zoom: newZoom,
        })
    }

    const setMapSize = (mapSize) => {
        setState({mapSize});
    }
    return (
        <MapWrapContainer ref={ref}>
            <MapGrid
                mapSize={mapSize}
                baseCellSize={baseCellSize}
                zoom={zoom}
                offset={offset}
                widthParent={width}
                heightParent={height}
                handleMouseDown={handleMouseDown}
                handleMouseUp={handleMouseUp}
                handleMouseMove={handleMouseMove}
                handleMouseLeave={handleMouseLeave}
                handleMouseWheel={handleMouseWheel}
            />
            <MapBackground
                offsetX={offsetX}
                offsetY={offsetY}
                width={mapSize[0] * baseCellSizeZoom}
                height={mapSize[1] * baseCellSizeZoom}
            />
            <Metter
                mapSize={mapSize}
                baseCellSize={baseCellSize}
                zoom={zoom}
                offset={offset}
                widthParent={width}
                heightParent={height}
                onSetMapSize={setMapSize}
            />
        </MapWrapContainer>
    )
}

MapWrapper.defaultProps = {
    baseCellSize: 100,
    mapSize: [1000, 1000],
}

MapWrapper.whyDidYouRender = true

export default MapWrapper

