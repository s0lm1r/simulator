import {InitialValuesConfig} from "../configs/InitialValuesConfig";

export class PlayerModel {
    get healthModifier(): number {
        return this._healthModifier;
    }

    set healthModifier(value: number) {
        this._healthModifier = value;
    }

    get timeModifier(): number {
        return this._timeModifier;
    }

    set timeModifier(value: number) {
        this._timeModifier = value;
    }

    get energyModifier(): number {
        return this._energyModifier;
    }

    set energyModifier(value: number) {
        this._energyModifier = value;
    }

    get satietyModifier(): number {
        return this._satietyModifier;
    }

    set satietyModifier(value: number) {
        this._satietyModifier = value;
    }

    get moodModifier(): number {
        return this._moodModifier;
    }

    set moodModifier(value: number) {
        this._moodModifier = value;
    }

    get reactionModifier(): number {
        return this._reactionModifier;
    }

    set reactionModifier(value: number) {
        this._reactionModifier = value;
    }

    get strategyModifier(): number {
        return this._strategyModifier;
    }

    set strategyModifier(value: number) {
        this._strategyModifier = value;
    }

    get synergyModifier(): number {
        return this._synergyModifier;
    }

    set synergyModifier(value: number) {
        this._synergyModifier = value;
    }
    get health(): number {
        return this._health;
    }

    set health(value: number) {
        this._health = value;
    }

    get time(): number {
        return this._time;
    }

    set time(value: number) {
        this._time = value;
    }

    get energy(): number {
        return this._energy;
    }

    set energy(value: number) {
        this._energy = value;
    }

    get satiety(): number {
        return this._satiety;
    }

    set satiety(value: number) {
        this._satiety = value;
    }

    get mood(): number {
        return this._mood;
    }

    set mood(value: number) {
        this._mood = value;
    }

    get reaction(): number {
        return this._reaction;
    }

    set reaction(value: number) {
        this._reaction = value;
    }

    get strategy(): number {
        return this._strategy;
    }

    set strategy(value: number) {
        this._strategy = value;
    }

    get synergy(): number {
        return this._synergy;
    }

    set synergy(value: number) {
        this._synergy = value;
    }

    private _health: number;
    private _time: number;
    private _energy: number;
    private _satiety: number;
    private _mood: number;
    private _reaction: number;
    private _strategy: number;
    private _synergy: number;

    private _healthModifier: number;
    private _timeModifier: number;
    private _energyModifier: number;
    private _satietyModifier: number;
    private _moodModifier: number;
    private _reactionModifier: number;
    private _strategyModifier: number;
    private _synergyModifier: number;

    public init(): void {
        this._health = InitialValuesConfig.health;
        this._time = InitialValuesConfig.time;
        this._energy = InitialValuesConfig.energy;
        this._satiety = InitialValuesConfig.satiety;
        this._mood = InitialValuesConfig.mood;
        this._reaction = InitialValuesConfig.reaction;
        this._strategy = InitialValuesConfig.strategy;
        this._synergy = InitialValuesConfig.synergy;

        this._healthModifier = InitialValuesConfig.healthModifier;
        this._timeModifier = InitialValuesConfig.timeModifier;
        this._energyModifier = InitialValuesConfig.energyModifier;
        this._satietyModifier = InitialValuesConfig.satietyModifier;
        this._moodModifier = InitialValuesConfig.moodModifier;
        this._reactionModifier = InitialValuesConfig.reactionModifier;
        this._strategyModifier = InitialValuesConfig.strategyModifier;
        this._synergyModifier = InitialValuesConfig.synergyModifier;
    }
}