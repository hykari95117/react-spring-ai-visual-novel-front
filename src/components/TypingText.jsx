import React, { useState, useEffect } from "react";

/**
 * @param {object} props
 * @param {string} props.text 타이핑될 텍스트
 * @param {number} props.speed 타이핑 효과 속도
 * @param {() => void} props.onEnded 타이핑 종료 시 호출될 콜백 함수
 * @returns {React.ReactElement}
 */
function TypingText({text, speed = 50, onEnded}) {
    const [displayText, setDisplayText] = useState('');
    const [isEnded, setIsEnded] = useState(false);

    // text가 변경됐을 때 변수 초기화
    useEffect(() => {
        setDisplayText('');
        setIsEnded(false);
    }, [text])

    // 타이핑 효과가 진행 중일 때 엔터키나 스페이스바를 누르면 타이핑 효과가 멈추고 텍스트가 한 번에 다 보이는 효과
    // 혹시 이미 텍스트가 다 보였다면 다음 텍스트로 넘어가는 효과
    useEffect(() => {
        window.onkeydown = e => {
            if(e.key === 'Enter' || e.key === ' ') { 
                if(isEnded) {
                    // 다 입력이 됐으면 callback function 호출
                    onEnded();
                } else {
                    // 아직 입력이 다 안 됐으면 텍스트를 완성시킨다.
                    setDisplayText(text);
                    setIsEnded(true);
                }
            }
        }
    }, [isEnded, onEnded, text]);

    // 타이핑 효과
    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            const character = text[currentIndex]; // 문자열 변수
            if(character !== undefined && !isEnded) {
                setDisplayText(prev => prev + character);
                currentIndex += 1;
            }
            if(currentIndex === text.length) {
                clearInterval(intervalId);
                setIsEnded(true);
            }
        }, speed);

        return () => { clearInterval(intervalId); }
    }, [speed, isEnded, text]);

    return (
        <div style={{
            display: "flex",
            gap: 8
        }}>
            <span>{displayText}</span>
            {
                isEnded && (
                    <img
                        style={{
                            alignSelf: 'center'
                        }}
                        src={'polygon/chat-indicator.png'}
                        width={7}
                        height={10}
                        className={'blinking-text'}
                        alt={'chat-indicator'}
                    ></img>
                )
            }
        </div>
    )
}

export default TypingText;