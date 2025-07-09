import React from 'react';
import { Audio, Vortex, DNA, Oval } from 'react-loader-spinner'
import '~style.css';

type GoogleSignInButtonProps = {
    loading: boolean;
    onClick: () => void;
};

export const GoogleSignInButton = ({ loading, onClick }) => (
    <button
        onClick={onClick}
        disabled={loading}
        className="plasmo-p-2 plasmo-bg-blue-500 plasmo-text-white plasmo-border-none plasmo-rounded plasmo-cursor-pointer plasmo-text-sm flex items-center justify-center gap-2"
    >
        <div className='plasmo-flex plasmo-items-center plasmo-gap-2'>
            <p className='plasmo-p-2 plasmo-items-center'>Sign in with Google</p>
            {loading && (
                <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="white"
                    secondaryColor="white"
                    ariaLabel="oval-loading"
                />
            )}
        </div>
    </button>
);

