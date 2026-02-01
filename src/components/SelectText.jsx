import React, { useEffect, useState } from "react";

/**
 * 사용자가 선택을 하는 텍스트
 */
function SelectText({texts, onEnded}) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // texts가 변경됐을 때 변수 초기화
    useEffect(() => {
        setSelectedIndex(0);
    }, [texts])

    // 키보드로 --> 선택지 왔다 갔다, 선택지 선택하기
    useEffect(() => {
        window.onkeydown = e => {
            if(e.key === 'Enter' || e.key === ' ') {
                onEnded(selectedIndex);
            }
            if(e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                if(selectedIndex > 0) {
                    setSelectedIndex(prev => prev - 1);
                } else if(selectedIndex === 0) {
                    setSelectedIndex(texts.length - 1); // 마지막 선택지로 이동
                }
            } else if(e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                if(selectedIndex < texts.length - 1) {
                    setSelectedIndex(prev => prev + 1);
                } else if(selectedIndex === texts.length - 1) {
                    setSelectedIndex(0); // 첫번째 선택지로 이동(25분 2초)
                }
            }
        }
    }, [onEnded, selectedIndex, texts.length])

    return (
        <ul>
            {texts.map((text, index) => {
                return (
                    <li key={index}>
                        <span style={{
                            opacity: index === selectedIndex ? 1 : 0.5
                        }}>{text}</span>
                        {/* 현재 포커스가 있는 메뉴에 indicator 표시 */}
                        {index === selectedIndex && (
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
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

export default SelectText;