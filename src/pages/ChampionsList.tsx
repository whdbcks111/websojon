import axios from "axios";
import React from "react";
import styled from "styled-components";
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import classNames from "classnames";
import ChampionTrendItem from "../components/ChampionTrendItem";
import ChampionTrendHeader from "../components/ChampionTrendHeader";

import championIcon_N from "../assets/icon-champion-n.png";
import championIcon_P from "../assets/icon-champion-p.png";
import champion32 from "../assets/champion32.png";
import ChampionTrendToolbar from "../components/ChampionTrendToolder";
import ChampionTrendModel from "../models/ChampionTrendModel";

const ChampionListPageWrapper = styled.div`
    display: flex;
    width: 1080px;
    margin: 0 auto;
    margin-top: 100px;
`

const ChampionsWrapper = styled.div`
    border-right: 1px solid #e9eff4;

    & > .list {
        background-color: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 32px;
        width: 544px;
    }

    & > .header {
        background-color: white;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px solid #e9eff4;
    }

    & > .header > .item-wrap {
        display: flex;
    }

    & > .header > input {
        position: relative;
        right: 0;
        margin: 10px 0;
        width: 180px;
        padding: 0 10px;
        border: none;
        background-color: #f7f7f7
    }

    & > .header > .item-wrap > .item {
        line-height: 60px;
        padding: 0 12px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.6);

        &.select {
            box-shadow: 0px -3px 0px 0px #5383e8 inset;
            color: #5383e8;
            font-weight: bold;
        }
    }
`

const ChampionsTrendWrapper = styled.div`
    flex: 1;
    background-color: white;

    & > .list {
        background-color: #f7f7f7;
        padding: 20px;
        text-align: center;
    }

    & > .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e9eff4;
    }

    & > .header:first-child {
        line-height: 60px;
        padding-left: 20px;
        font-size: 14px;
        font-weight: bold;
    }

    & > .header > .item-wrap {
        display: flex;
    }

    & > .header > .item-wrap > .item {
        line-height: 60px;
        margin: 0 12px;
        padding: 0 3px;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.6);
        font-weight: normal;

        &.select {
            box-shadow: 0px -3px 0px 0px #5383e8 inset;
            color: #5383e8;
            font-weight: bold;
        }

        &.select > .image {
            background-image: url(${championIcon_P});
        }

        & > .image {
            background-image: url(${championIcon_N});
            width: 14px;
            height: 17px;
            margin: 5px;
            vertical-align: middle;
            display: inline-block;
        }
    }

    & > .header > .item-wrap > .item:not(:first-child)::before {
        display: inline-block;
        position: relative;
        right: 15px;
        margin-right: 0px;
        content: "";
        border-left: 1px solid #eee;
        height: 14px;
    }

`

interface ChampionListProps {

}

interface ChampionListState {
    allChampions: ChampionModel[];
    champions: ChampionModel[];
    type: string;
    searchText: string;
    trendType: string;
    trendChampions: ChampionTrendModel[];
    trendPosition: string;
}

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {

    constructor(props: ChampionListProps) {
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: 'all',
            searchText: '',
            trendType: 'tier' /*winratio, pickratio, banratio*/,
            trendChampions: [],
            trendPosition: 'top'
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map(
            (data: any) => new ChampionModel({
                id: data.id,
                key: data.key, 
                name: data.name, 
                position: data.position
            }));

        const trendChampions = await this.getTrendList('tier');
        const newState = {
            champions: allChampions,
            allChampions,
            trendChampions
        };
        this.setState(newState);
    }

    onChangeType = (type: string) => () => {
        this.setState({
            type,
            champions: this.filterChampions(type, this.state.searchText)
        });
    }

    filterChampions = (type: string, searchText?: string) => {
        let typeName = '';
        switch(type) {
            case 'top': typeName = '탑'; break;
            case 'jug': typeName = '정글'; break;
            case 'mid': typeName = '미드'; break;
            case 'adc': typeName = '바텀'; break;
            case 'sup': typeName = '서포터'; break;
        }
        return this.state.allChampions.filter(model => 
            (type === 'all' || model.position!!.includes(typeName)) 
            && model.name.includes(searchText || ''));
    }

    onChangeTrendType = (type: string) => async () => {

        const trendChampions = await this.getTrendList(type);
        this.setState({
            trendType: type, trendChampions, trendPosition: type === 'tier' ? 'top' : 'all'
        });
    }

    onChangeTrendPosition = (position: string) => async () => {

        const trendChampions = await this.getTrendList(this.state.trendType, position);
        this.setState({
            trendChampions, trendPosition: position
        });
    }

    getTrendList = async (type: string, position?: string) => {

        if(!position) {
            if(type === 'tier') position = 'top';
            else position = 'all';
        }

        const responseTrend = await axios.get(`http://opgg.dudco.kr/champion/trend/${type}/${position}`);
        const trendChampions = responseTrend.data.map(
            (data: any) => new ChampionTrendModel({
                id: data.id,
                rank: data.rank,
                change: data.change,
                name: data.name,
                position: data.position,
                winRate: data.winRate,
                pickRate: data.pickRate,
                banRate: data.banRate,
                tierIcon: data.tierIcon
            }));
        return trendChampions;
    }

    onChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const champions = this.filterChampions(this.state.type, e.target.value);
        console.log(champions);
        this.setState({champions, searchText: e.target.value});
    }

    getTrendHeaderItemPreset = (trendType: string): string[][] => {
        const base = [['rank', '#'], ['champ', '챔피언']];
        switch(trendType) {
            case 'tier':
                return base.concat([['win', '승률'], ['pick', '픽률'], ['tier', '티어']]);
            case 'winratio':
                return base.concat([['win', '승률'], ['pick', '픽률']]);
            case 'pickratio':
                return base.concat([['pick', '픽률'], ['win', '승률']]);
            case 'banratio':
                return base.concat([['ban', '밴률']]);
            default: 
                return [];
        }
    }

    render() {
        return (
            <ChampionListPageWrapper>
                <ChampionsWrapper>
                    <div className="header">
                        <div className="item-wrap"> 
                            <div className={classNames("item",{select: this.state.type === 'all'})} onClick={this.onChangeType('all')}>전체</div>
                            <div className={classNames("item",{select: this.state.type === 'top'})} onClick={this.onChangeType('top')}>탑</div>
                            <div className={classNames("item",{select: this.state.type === 'jug'})} onClick={this.onChangeType('jug')}>정글</div>
                            <div className={classNames("item",{select: this.state.type === 'mid'})} onClick={this.onChangeType('mid')}>미드</div>
                            <div className={classNames("item",{select: this.state.type === 'adc'})} onClick={this.onChangeType('adc')}>바텀</div>
                            <div className={classNames("item",{select: this.state.type === 'sup'})} onClick={this.onChangeType('sup')}>서포터</div>
                        </div>
                        <input type="text" placeholder="챔피언 검색 (가렌, ㄱㄹ, ...)" onChange={this.onChangeSearchInput} />
                    </div>
                    <div className="list">
                        {
                            this.state.champions.map(model => 
                                <Champion
                                    key={model.id}
                                    id={Number(model.id) || 0}
                                    position={model.position || []}
                                    name={model.name || ""}
                                />
                            )
                        }
                        {
                            new Array(6).fill(
                                <div style={{width: "82px", height: "0"}}/>
                            )
                        }
                    </div>
                </ChampionsWrapper>
                <ChampionsTrendWrapper>
                    <div className="header">
                        <div>챔피언 순위</div>
                        <div className="item-wrap">
                            <div className={classNames("item", {select: this.state.trendType === 'tier'})} onClick={this.onChangeTrendType('tier')}>
                                <div className="image"/>
                                티어
                            </div>
                            <div className={classNames("item", {select: this.state.trendType === 'winratio'})} onClick={this.onChangeTrendType('winratio')}>
                                승률
                            </div>
                            <div className={classNames("item", {select: this.state.trendType === 'pickratio'})} onClick={this.onChangeTrendType('pickratio')}>
                                픽률
                            </div>
                            <div className={classNames("item", {select: this.state.trendType === 'banratio'})} onClick={this.onChangeTrendType('banratio')}>
                                밴률
                            </div>
                        </div>
                    </div>
                    <div className="list">
                        <ChampionTrendToolbar>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'all'})}
                                onClick={this.onChangeTrendPosition('all')} 
                                hidden={this.state.trendType === 'tier'}>전체</div>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'top'})}
                                onClick={this.onChangeTrendPosition('top')}>탑</div>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'jungle'})}
                                onClick={this.onChangeTrendPosition('jungle')}>정글</div>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'mid'})}
                                onClick={this.onChangeTrendPosition('mid')}>미드</div>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'adc'})}
                                onClick={this.onChangeTrendPosition('adc')}>바텀</div>
                            <div 
                                className={classNames({select: this.state.trendPosition === 'support'})}
                                onClick={this.onChangeTrendPosition('support')}>서포터</div>
                        </ChampionTrendToolbar>
                        <ChampionTrendHeader>
                            {
                                this.getTrendHeaderItemPreset(this.state.trendType).map(s => {
                                    return (<div className={s[0]}>{s[1]}</div>);
                                })
                            }
                        </ChampionTrendHeader>
                        {
                            this.state.trendChampions.map(model => (
                                <ChampionTrendItem 
                                    championID={model.id}
                                    change={model.change}
                                    name={model.name}
                                    position={model.position}
                                    win={model.winRate}
                                    pick={model.pickRate}
                                    tier={model.tierIcon}
                                    ban={model.banRate}
                                    rank={model.rank}
                                    trendItemPreset={this.getTrendHeaderItemPreset(this.state.trendType)}
                                    trendType={this.state.trendType}
                                />
                            ))
                        }
                    </div>
                </ChampionsTrendWrapper>
            </ChampionListPageWrapper>    
        )
    }
}