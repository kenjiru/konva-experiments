import Konva from 'konva';
import type { FC } from 'react';
import { RefObject, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

const TRANSFORMER_PADDING = 5;

interface Props {
    figureRef: RefObject<Konva.Rect>;
}

export const ResizeTransformer: FC<Props> = ({ figureRef }) => {
    const transformerRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (transformerRef.current && figureRef.current) {
            transformerRef.current.nodes([ figureRef.current ]);
            transformerRef.current.getLayer()?.batchDraw();
        }
    });

    return (
        <Transformer
            ref={transformerRef}
            rotateEnabled={false}
            padding={TRANSFORMER_PADDING}
            ignoreStroke
        />
    );
}
