import React, { useState } from 'react';
import Scene from '../components/Scene';
import EndPage from '../pages/end-page';


const minsu = {
    name: "민수",
    image: "/image/char3.webp"
}

const narration = {
    name: "나레이션"
}

function GamePage() {
    // 현재 chat(대사) 상태(인덱스)
    const [currentChatIndex, setCurrentChatIndex] = useState(0);
    // 현재 Scene 상태
    const [currentSceneLabel, setCurrentSceneLabel] = useState("Scene 1");
    // 엔딩씬 여부
    const [isEnding, setIsEnding] = useState(false);

    const scenes = [
        {
            label: "Scene 1", // index 역할을 한다.
            backgroundUrl: "/image/bg3.webp",
            chats: [
                {
                    character: minsu,
                    message: "벌써 오전 10시네 잘 잤다."
                },
                {
                    character: narration,
                    message: "민수가 아침에 일어났다. 휴대폰에는 100개가 넘는 알림이 와 있다."
                }
            ],
            nextScene: "Scene 2"
        },
        {
            label: "Scene 2",
            backgroundUrl: "/image/bg4.webp",
            chats: [
                {
                    character: minsu,
                    message: "이런!!!"
                }
            ],
            // 일단은 Scene 2가 마지막 씬이라고 가정하고 nextScene이 없다.
            // nextScene: "Scene 3"
        }
    ]
    // 현재 Scene
    const currentScene = scenes.find(scene => scene.label === currentSceneLabel);
    // 현재 chat(대사)
    const currentChat = currentScene.chats[currentChatIndex];
    
    const handleOnEnded = () => {
        if(currentChatIndex >= currentScene.chats.length - 1) { // 해당 Scene에서 보여줄 대사 더 이상 없음
            const {nextScene} = currentScene; // {nextScene} = currentScene.nextScene
            // 현재 Scene 기준, 더 이상 다음 Scene 없음
            if(!nextScene) {
                setIsEnding(true);
                return;
            }
            // 다음 Scene으로 넘어가기
            setCurrentChatIndex(0);
            setCurrentSceneLabel(nextScene);
            return;
        }
        // 다음 chat으로 이동
        setCurrentChatIndex(prev => prev + 1);
        // setCurrentSceneLabel
    }

    return (
        <>
            {
                isEnding
                ? <EndPage /> // 엔딩페이지는 Routes로 처리중이긴 하다.(App.jsx 참고)
                : (
                    <Scene
                        backgroundUrl={currentScene.backgroundUrl}
                        chats={currentScene.chats}
                        chatIndex={currentChatIndex}
                        onEnded={handleOnEnded}
                    />
                )
            }
        </>
    )
}

export default GamePage;