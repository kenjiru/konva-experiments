import type { FC } from 'react';
import { Rect } from 'react-konva';
import { Figure } from '../../model/useEditorContent';

interface Props {
    figure: Figure;
}

const DEFAULT_STROKE = 'red';

export const FigureComp: FC<Props> = ({
    figure: { x, y, width, height },
}) => <Rect x={x} y={y} width={width} height={height} stroke={DEFAULT_STROKE} />
