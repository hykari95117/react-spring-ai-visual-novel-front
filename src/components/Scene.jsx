import React from 'react';
import './scene.css';
import TypingText from './TypingText';
import SelectText from './SelectText';


const chat = {
    character: {
        name: "민수",
        image: "image/char3.webp"
    },
    message: "가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사",
    vibration: true
}

const backgroundUrl = "https://image.utoimage.com/preview/cp870075/2020/09/202009028948_500.jpg";

/**
 * [Scene의 구성요소]
 * - 배경화면
 * - 콘텐츠
 *      - 캐릭터
 *      - 대사
 */
function Scene() {
    return (
        <div className={'scene-container'}>
            <div className={'scene-background'} style={{
                backgroundImage: `url(${backgroundUrl})`
            }}
            ></div>
            <div className={'scene-content-wrapper'}> {/* scene-content-wrapper: 포지션을 잡아주는 역할 */}
                <div className={`scene-content ${chat.vibration ? 'vibration' : 'fade-in-up'}`}>
                    <img src={chat.character.image} alt={'캐릭터 이미지'} className={'scene-character-image'} width={120}/>
                    <div className={'scene-chat'}>
                        <div className={'scene-name'}>{chat.character.name}</div>
                        {/* <TypingText text={chat.message} speed={50} onEnded={() => console.log(`end`)}></TypingText> */}
                        <SelectText texts={["1. 첫 번째 선택지", "2. 두 번째 선택지", "3. 세 번째 선택지"]}></SelectText>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scene;