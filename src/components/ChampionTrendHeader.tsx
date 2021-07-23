import styled, {css} from "styled-components";

export const ChampionTrendItemCss = css`
    display: flex;
    align-items: center;
`

const ChampionTrendHeader = styled.div`
    ${ChampionTrendItemCss}
    padding: 15px;
    color: #777;

    & > div {
        flex: 1;
        font-size: 12px;
        &.rank {
            flex: 0.5;
            text-align: center;
        }
        &.champ {
            flex: 3;
        }
    }
`;

export default ChampionTrendHeader;