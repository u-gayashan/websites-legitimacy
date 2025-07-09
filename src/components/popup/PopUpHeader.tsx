import React from 'react'
import { DNA } from 'react-loader-spinner'
// Update the path below to the correct relative path from this file to your logo.png
import wif from '~assets/wif.png'
import '~style.css'

const PopUpHeader = () => {
    return (
        <div className='plasmo-flex plasmo-items-center plasmo-justify-between plasmo-mb-4 plasmo-bg-blue-100 plasmo-rounded-md plasmo-p-3'>
            <img
                src={wif}
                alt='Web Insights Finder Logo'
                className='plasmo-h-20 plasmo-w-20 plasmo-rounded-full'
            />
            <p className='plasmo-text-blue-600 plasmo-text-lg plasmo-font-semibold plasmo-text-center plasmo-rounded-lg'>
                Web Insights Finder
            </p>
            <DNA height="40" width="40" />
        </div>
    )
}

export default PopUpHeader