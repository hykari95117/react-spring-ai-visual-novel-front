import React, { useEffect, useRef } from "react";

function PlaySong({src, loop = false}) {
    const audioRef = useRef(null);
    const sourceRef = useRef(null);

    const playAudio = () => {
        const audio = audioRef.current;
        if(!audio) {
            return;
        }
        // 0. 오디오 재생
        audio.play().catch(error => {
            console.log(error);
            const handler = () => {
                // 2. 그래도 오류 발생하면 error 로그 출력하고 끝
                audio.play().catch(error => console.log(error));
                document.removeEventListener('click', handler);
            }
            // 1. 0번에서 audio.play() 실행 시 error가 났을 때 다시 한 번 audio.play() 시도
            document.addEventListener('click', handler);
        });
    }

    useEffect(() => {
        playAudio();
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        const source = sourceRef.current;
        if(!audio || !source) {
            return;
        }
        // src가 바뀌면 기존 오디오는 종료
        if(!audio.paused || audio.duration > 0) {
            audio.pause();
            audio.currentTime = 0;
        }
        // 새로운 src로 연결
        source.src = src || '';
        audio.load();
        playAudio();
    }, [src]);

    return (
        // 오디오 자동 플레이는 브라우저 정책상 불가
        // 따라서 이벤트가 일어날 때 오디오가 재생되도록 한다.
        <audio ref={audioRef} loop={loop} autoPlay={true} preload={'auto'}>
            <source ref={sourceRef} src={src} type={'audio/mpeg'}/>
            Your browser does not support the audio element.
        </audio>
    )
}

export default PlaySong;