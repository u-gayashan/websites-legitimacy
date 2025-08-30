import React from 'react'

import {
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner
} from "@radix-ui/react-scroll-area";

const ScrollAreaProperties = () => {
    return (
        <>
            <ScrollAreaScrollbar
                className="plasmo-flex plasmo-select-none plasmo-touch-none plasmo-p-0.5 plasmo-bg-gray-100 plasmo-transition-colors"
                orientation="vertical"
            >
                <ScrollAreaThumb className="plasmo-flex-1 plasmo-bg-gray-400 plasmo-rounded-[10px] plasmo-relative" />
            </ScrollAreaScrollbar>

            <ScrollAreaCorner className="plasmo-bg-gray-200" />
        </>
    )
}

export default ScrollAreaProperties