import React from 'react';
import './end-page.css';
import PlaySong from '../components/PlaySong';

function EndPage() {
    const imageLodingCompleted = true;
    return (
        <div className={'end-page-container'}>
            <PlaySong src={'/music/end.mp3'} loop={true}/>
            {
                imageLodingCompleted
                ? (<img className={'end-page-result-image'} src={"/image/bg1.png"} />)
                : (<div className={'end-page-loading'}>이미지 생성 중...</div>)
            }
        </div>
    )
}

export default EndPage;