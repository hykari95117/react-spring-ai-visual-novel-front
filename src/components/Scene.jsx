import React from 'react';
import './scene.css';
import TypingText from './TypingText';
import SelectText from './SelectText';
import PlaySong from './PlaySong';

// const chat = {
//     character: {
//         name: "민수",
//         image: "image/char3.webp"
//     },
//     message: "가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사가나다라마바사",
//     vibration: true
// }

// const backgroundUrl = "https://image.utoimage.com/preview/cp870075/2020/09/202009028948_500.jpg";

/**
 * [Scene의 구성요소]
 * - 배경화면
 * - 콘텐츠
 *      - 캐릭터
 *      - 대사
 */
function Scene({backgroundUrl, chats, chatIndex, onEnded}) {
    const chat = chats[chatIndex];
    
    return (
        <div className={'scene-container'}>
            <PlaySong src={chat.music} loop={true}/>
            <div className={'scene-background'} style={{
                backgroundImage: `url(${backgroundUrl})`
            }}
            ></div>
            <div className={'scene-content-wrapper'}> {/* scene-content-wrapper: 포지션을 잡아주는 역할 */}
                <div className={`scene-content ${chat?.vibration ? 'vibration' : 'fade-in-up'}`}>
                    <img src={chat.character.image} alt={'캐릭터 이미지'} className={'scene-character-image'} width={120}/>
                    <div className={'scene-chat'}>
                        <div className={'scene-name'}>{chat.character.name}</div>
                        {chat.select ? (
                            <SelectText
                                texts={chat.select.data}
                                onEnded={index => {
                                    chat.select.onSelect(index);
                                    onEnded();
                                }}
                            ></SelectText>
                        ) : (
                            <TypingText
                                text={chat.message}
                                speed={50}
                                onEnded={onEnded}
                            ></TypingText>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scene;