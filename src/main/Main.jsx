import React, { useEffect, useRef, useState } from 'react';
import './Main.scss';

export default function Main () {
    const canvasRef = useRef(null);
    const [sceneInfo, setSceneInfo] = useState([
        {
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                canvas: null,
                context: null,
                videoImages: []
            },
            values: {
                videoImageCount: 85,
                imageSequence: [0, 84],
            }
        }
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const currentScene = sceneInfo[0];
        currentScene.objs.canvas = canvas;
        currentScene.objs.context = context;

        const newImages = [];
        let loadedImages = 0;

        for (let i = 0; i < currentScene.values.videoImageCount; i++) {
            const imgElem = new Image();
            imgElem.src = `/mainImg/${178 + i}.jpg`;
            imgElem.onload = () => {
                loadedImages++;
                newImages.push(imgElem);
                if (loadedImages === currentScene.values.videoImageCount) {
                    // 이미지가 모두 로드되면 캔버스에 그리기
                    newImages.forEach(img => {
                        context.drawImage(img, 0, 0, canvas.width, canvas.height); // 캔버스 크기에 맞춰 이미지 그리기
                    });
                    setSceneInfo(prev => [
                        {
                            ...prev[0],
                            objs: {
                                ...prev[0].objs,
                                videoImages: newImages
                            }
                        }
                    ]);
                }
            };
        }
    }, []);


    useEffect(() => {
        // 레이아웃과 크기 설정
        const handleResize = () => {
            const height = window.innerHeight * sceneInfo[0].heightNum;
            setSceneInfo(prev => [
                {
                    ...prev[0],
                    scrollHeight: height
                }
            ]);
            canvasRef.current.style.height = `${height}px`;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // 스크롤 효과
        const scrollAnimation = () => {
            // 스크롤 관련 애니메이션 구현
        };

        window.addEventListener('scroll', scrollAnimation);

        return () => {
            window.removeEventListener('scroll', scrollAnimation);
        };
    }, [sceneInfo]);

    return (
        <div className={'main'}>
            <div className="sticky-canvas">
                <canvas ref={canvasRef} width="1920" height="1080"></canvas>
            </div>
            <h2>
                <strong>make money</strong>
                <p>고객 스스로 돈을 버는 기회를 제공합니다</p>
            </h2>
            <div className={'app-wrap'}>
            </div>
            {/*<img src='/mainImg/178.jpg' alt='logo'/>*/}
        </div>
    );
};
