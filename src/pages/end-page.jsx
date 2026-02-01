import React from 'react';
import './end-page.css';

function EndPage() {
    const imageLodingCompleted = true;
    return (
        <div className={'end-page-container'}>
            {
                imageLodingCompleted
                ? (<img className={'end-page-result-image'} src={"/image/bg1.png"} />)
                : (<div className={'end-page-loading'}>이미지 생성 중...</div>)
            }
        </div>
    )
}

export default EndPage;