import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div<{height: number}>`
    width: 100vw;
    height: ${(props)=>props.height}px;
    display: flex;
    flex-direction: column;

    & > div {
        flex: 1;
        line-height: ${(props)=>props.height/2.0}px;
        color: white;
    }

    & > div:first-child {
        background-color: #5383e8;
        border-bottom: 1px solid #5383e8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
    }

    & > div:last-child {
        background-color: rgba(0, 0, 0, 0.5);
        font-weight: bold;
        padding: 0 80px;
    }
`;

const HeaderItemWrapper = styled.div`
    display: flex;
`;
const HeaderItem = styled.div<{active?: boolean}>`
    color: rgba(255, 255, 255,${(props) => props.active ? 1: .7});
    font-weight: bold;
    margin: 0 16px;
    box-shadow: 0px -${props => props.active? 3: 0}px 0px 0px white inset;
    cursor: pointer;
`;
const HeaderInput = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    height: 40px;
    border-radius: 5px;

    & > div:first-child {
        color: #4171d6;
        position: relative;
        background-color: #ecf2ff;
        font-weight: bold;
        line-height: 40px;
        padding: 0 12px;
        padding-right: 30px;
        font-size: 13px;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            right: 12px;
            top: 50%;
            margin-top: -2px;
            border-top: 4px solid #4171d6;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
        }
    }

    & > input {
        border: none;
        outline: none;
        padding: 0 10px;
    }

    & img {
        height: 14px;
        margin-right: 10px;
        cursor: pointer;
    }
`

interface HeaderProps {
    headerHeight: number
}

export default function Header(props: HeaderProps) {
    return (
        <HeaderWrapper height={props.headerHeight}>
            <div>
                <HeaderItemWrapper>
                    <HeaderItem>#집에있자</HeaderItem>
                    <HeaderItem active={true}>챔피언 분석</HeaderItem>
                    <HeaderItem>칼바람</HeaderItem>
                    <HeaderItem>우르프</HeaderItem>
                    <HeaderItem>통계</HeaderItem>
                    <HeaderItem>랭킹</HeaderItem>
                    <HeaderItem>프로관전</HeaderItem>
                    <HeaderItem>멀티서치</HeaderItem>
                    <HeaderItem>OP셜</HeaderItem>
                    <HeaderItem>커뮤니티</HeaderItem>
                </HeaderItemWrapper>
                <HeaderInput>
                    <div>KR</div>
                    <input type="text" placeholder="소환사명, 소환사명..." />
                    <div>
                        <img src="https://opgg-static.akamaized.net/images/gnb/svg/00-icon-gg.svg" />
                    </div>
                </HeaderInput>
            </div>
            <div>해당 사이트는 교육을 위해 클론 코딩 된 것 입니다.</div>
        </HeaderWrapper>
    );
}