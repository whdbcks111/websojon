import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import tierStay from "../assets/icon-championtier-stay.png";
import tierDown from "../assets/icon-championtier-down.png";
import tierUp from "../assets/icon-championtier-up.png";
import champion32 from "../assets/champion32.png";
import ChampionTrendHeader from "./ChampionTrendHeader";

const ChampionTrendWrapper = styled(ChampionTrendHeader)`
    color: #b6b6b6;
    background-color: white;
    border: 1px solid #e9eff4;

    &::not(:last-child) {
        border-bottom: none;
    }

    & > .rank {
        font-style: italic;
        font-size: 16px;
        color: #8b8b8b;
    }

    & > .champ {
        display: flex;
        align-items: center;
        text-align: left;

        & > .change {
            width: 50px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            font-size: 12px;
            line-height: 12px;
            padding: 0 10px;
            & > img {
                margin-right: 2px;
                margin-left: 5px;
            }

            &.up {
                color: #1da900
            }

            &.down {
                color: #d0021b
            }
        }

        & > .champ-img {
            width: 32px;
            height: 32px;
            background-image: url(${champion32});
        }

        & > .champ-desc {
            font-size: 12px;
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            & > :first-child {
                color: #4a4a4a;
            }
        }
    }
`;

interface ChampionTrendItemProps {
    championID: number;
    change: number;
    name: string;
    position: string;
    win: string;
    pick: string;
    ban: string;
    tier: string;
    rank: number;
    trendItemPreset: string[][];
    trendType: string;
}

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = (props) => {
    const addition = props.trendItemPreset
    .filter(preset => !(['rank', 'champ'].includes(preset[0])))
    .map(preset => {
        if(preset[0] === 'tier') return (
            <div className="tier">
                <img src={props.tier} alt="" />
            </div>
        );
        let innerValue;
        switch(preset[0]) {
            case 'pick': innerValue = props.pick; break;
            case 'win': innerValue = props.win; break;
            case 'ban': innerValue = props.ban; break;
            default: innerValue = '';
        }
        return (<div className={preset[0]}>{innerValue}</div>);
    });

    return (
    <ChampionTrendWrapper className="list-item">
        <div className="rank">{props.rank}</div>
        <div className="champ">
            {
                props.trendType === 'tier' ? (
                    <div className={classNames("change", {down: props.change < 0, up: props.change > 0})}>
                        <img src={props.change === 0 ? tierStay : (props.change > 0 ? tierUp : tierDown)} alt=""/>
                        {Math.abs(props.change)}
                    </div>
                ) : []
            }
            <div className={`champ-img __spc32-${props.championID}`}/>
            <div className="champ-desc">
                <div>{props.name}</div>
                <div>{props.position}</div>
            </div>
        </div>
        {addition}
    </ChampionTrendWrapper>
    );
}

export default ChampionTrendItem;