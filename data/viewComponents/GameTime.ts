import {chmod} from "fs";
import {GameConstants} from "../gameConstants/GameContants";

export default class GameTime extends PIXI.Container {
    protected clock: PIXI.Container;
    protected days: PIXI.Container;
    protected shape: PIXI.Graphics

    private _currentDay: number = GameConstants.startlocalTime.day;
    private _currentTime: number = GameConstants.startlocalTime.time;
    private _globalTime: number = 0;

    constructor() {
        super();
        this.shape = this.addChild(this.createShape());
        this.days = this.shape.addChild(this.createDaysView(GameConstants.startlocalTime.day));
        this.days.position.set(60, 10);
        this.clock = this.shape.addChild(this.createTimerView(GameConstants.startlocalTime.time));
        this.clock.position.set(60, 40);


    }

    protected createShape() {
        const graphics = new PIXI.Graphics()
        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0x650A5A, 0.7);
        graphics.drawRoundedRect(0, 0, 200, 80, 32);
        graphics.endFill();
        return graphics;
    }

    protected createDaysView(day) {
        const container =  new PIXI.Container;
        const time = new PIXI.Text(`Day ${day}`, GameTime.STYLE);
        container.addChild(time);

        return  container;
    }

    protected createTimerView(time) {
        const container =  new PIXI.Container;
        const timer = new PIXI.Text(`${time}`, GameTime.STYLE);
        container.addChild(timer);

        return  container;
    }
    get currentDay(): number {
        return this._currentDay;
    }
    set currentDay(value) {
        this._currentDay = value;
    }

    public updateTime(ticks) {
        let time = this._currentTime;
        // this._currentTime
        let hours: any = Math.floor(this._currentTime);
        let minutes: any = 0;
        if (this._currentTime % 1 !== 1) {
            minutes = 30;
        }
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        this.shape.removeChild( this.clock);

        this.clock = new PIXI.Text(`${hours}:${minutes}`, GameTime.STYLE);
        this.shape.addChild(    this.clock)
    }

    static STYLE = {
        fontFamily: 'Arial',
        fontSize: 24,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#1fd0ff', '#ffff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    };
}

// export const clock = new Clock(`12:00`);