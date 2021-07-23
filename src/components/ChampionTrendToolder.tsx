import styled from "styled-components";
import { ChampionTrendItemCss } from "./ChampionTrendHeader";

const ChampionTrendToolbar = styled.div`
    ${ChampionTrendItemCss}
    & > div {
        flex: 1;
        background-color: white;
        border: 1px solid #e9eff4;
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
        color: rgba(0, 0, 0, .6);

        &:not(:first-child) {
            border-left: none;
        }

        &.select {
            color: black;
            font-weight: bold;
        }
    }
`;

export default ChampionTrendToolbar;