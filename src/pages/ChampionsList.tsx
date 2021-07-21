import axios from "axios";
import React from "react";
import styled from "styled-components";
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import classNames from "classnames";

const ChampionListPageWrapper = styled.div`
    display: flex;
    width: 1080px;
    margin: 0 auto;
    margin-top: 100px;
`

const ChampionsWrapper = styled.div`
    background-color: white;
    border-right: 1px solid #e9eff4;

    & > .list {
        background-color: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 70px;
        width: 564px;
    }

    & > .header {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        border-bottom: 1px solid #e9eff4;
    }

    & > .header > .item-wrap {
        display: flex;
    }

    & > .header > input {
        margin: 10px 0;
        width: 200px;
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

        &.rotation {
            color: #5383e8;
        }
    }
`

const ChampionsTrendWrapper = styled.div`
    background-color: white;
    flex: 1;
`

interface ChampionListProps {

}

interface ChampionListState {
    allChampions: ChampionModel[];
    champions: ChampionModel[];
    type: string;
    searchText: string;
}

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {

    constructor(props: ChampionListProps) {
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: 'all',
            searchText: ''
        }
    }

    async componentDidMount() {
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map(
            (data: any, idx: number) => new ChampionModel({
                id: data.id,
                key: data.key, 
                name: data.name, 
                position: data.position
            }));
        const newState = {
            champions: allChampions,
            allChampions
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

    onChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e: React.ChangeEvent<HTMLInputElement>) => {
        const champions = this.filterChampions(this.state.type, e.target.value);
        console.log(champions);
        this.setState({champions, searchText: e.target.value});
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
                    trends
                </ChampionsTrendWrapper>
            </ChampionListPageWrapper>    
        )
    }
}