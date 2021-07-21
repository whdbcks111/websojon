export default class ChampionModel {
    id: number;
    key: string;
    name: string;
    position: string[];

    constructor({id, key, name, position=[]}: ChampionModel) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.position = position;
    }
}