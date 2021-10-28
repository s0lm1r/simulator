import {PlayerModel} from "../model/PlayerModel";
import {IDefaultTickActions} from "../interfaces/IDefaultTickActions";
import {IDefaultTaskActions} from "../interfaces/IDefaultTaskActions";

export class PlayerEntity {
    private playerModel: PlayerModel;
    public defaultTickActions: IDefaultTickActions;
    public defaultTaskActions: IDefaultTaskActions;

    public init(): void {
        this.playerModel = new PlayerModel();

        this.defaultTickActions = {
            calcSatiety: this.calculateSatiety(),
            calcEnergy: this.calculateEnergy(),
            calcMood: this.calculateMood(),
            calcHealth: this.calculateHealth()
        }

        this.defaultTaskActions = {
            doHometasks: this.doHometasks(),
            eatDadsFood: this.eatDadsFood(),
            eatMomsFood: this.eatMomsFood(),
            eatPizza: this.eatPizza(),
            goToSchool: this.goToSchool(),
            helpMom: this.helpMom(),
            playGameForFun: this.playGameForFun(),
            playOtherGames: this.playOtherGames(),
            procrastination: this.procrastination(),
            restWithFriends: this.restWithFriends(),
            showerAndCleaning: this.showerAndCleaning(),
            sleep: this.sleep(),
            trainGameWithBots: this.trainGameWithBots(),
            trainReaction: this.trainReaction(),
            trainStrategy: this.trainStrategy(),
            trainSynergy: this.trainSynergy()
        }
    }

    public runDefaultTickActions(): void {
        for( let actionName in this.defaultTickActions ) {
            this.defaultTickActions[actionName]();
        }
    }

    private runDefaultTickChanges(time: number, energy: number, satiety: number): void {
        this.playerModel.time -= time;
        this.playerModel.energy -= energy;
        this.playerModel.satiety -= satiety;
    }

    private doHometasks(): void {
        this.runDefaultTickChanges(4, 3, 7);

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += 1 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= 1 / this.playerModel.moodModifier;
        }

    }

    private eatDadsFood(): void {
        this.runDefaultTickChanges(1, 3, 0);

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += 25 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= 25 / this.playerModel.satietyModifier;
        }
    }

    private eatMomsFood(): void {
        this.runDefaultTickChanges(1, 3, 0);

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += 75 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= 75 / this.playerModel.satietyModifier;
        }
    }

    private eatPizza(): void {
        this.runDefaultTickChanges(1, 3, 0);

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += 50 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= 50 / this.playerModel.satietyModifier;
        }

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += 5 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= 5 / this.playerModel.moodModifier;
        }

        if( this.playerModel.health > 0 ) {
            this.playerModel.health += -5 * this.playerModel.healthModifier;
        } else {
            this.playerModel.health -= -5 / this.playerModel.healthModifier;
        }

        this.checkWhetherPlayerAlive();
    }

    private goToSchool(): void {
        this.runDefaultTickChanges(12, 3, 0);

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += -1.5 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= -1.5 / this.playerModel.satietyModifier;
        }

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += -0.2 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= -0.2 / this.playerModel.moodModifier;
        }
    }

    private helpMom(): void {
        this.runDefaultTickChanges(2, 3, 7);

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += -2 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= -2 / this.playerModel.moodModifier;
        }
    }

    private playGameForFun(): void {
        this.runDefaultTickChanges(1, 3, 0);

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += 1 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= 1 / this.playerModel.satietyModifier;
        }

        if( this.playerModel.reaction > 0 ) {
            this.playerModel.reaction += 0.75 * this.playerModel.reactionModifier;
        } else {
            this.playerModel.reaction -= 0.75 / this.playerModel.reactionModifier;
        }

        if( this.playerModel.strategy > 0 ) {
            this.playerModel.strategy += 0.75 * this.playerModel.strategyModifier;
        } else {
            this.playerModel.strategy -= 0.75 / this.playerModel.strategyModifier;
        }

        if( this.playerModel.synergy > 0 ) {
            this.playerModel.synergy += 0.75 * this.playerModel.synergyModifier;
        } else {
            this.playerModel.synergy -= 0.75 / this.playerModel.synergyModifier;
        }
    }

    private playOtherGames(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += 3 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= 3 / this.playerModel.moodModifier;
        }
    }

    private procrastination(): void {
        this.runDefaultTickChanges(1, 3, 7);
    }

    private restWithFriends(): void {
        this.runDefaultTickChanges(4, 3, 7);

        if( this.playerModel.mood > 0 ) {
            this.playerModel.mood += 4 * this.playerModel.moodModifier;
        } else {
            this.playerModel.mood -= 4 / this.playerModel.moodModifier;
        }
    }

    private showerAndCleaning(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.health > 0 ) {
            this.playerModel.health += 1 * this.playerModel.healthModifier;
        } else {
            this.playerModel.health -= 1 / this.playerModel.healthModifier;
        }
    }

    private sleep(): void {
        this.runDefaultTickChanges(16, 0, 0);

        if( this.playerModel.energy > 0 ) {
            this.playerModel.energy += 12.5 * this.playerModel.energyModifier;
        } else {
            this.playerModel.energy -= 12.5 / this.playerModel.energyModifier;
        }

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.satiety += -2.2 * this.playerModel.satietyModifier;
        } else {
            this.playerModel.satiety -= -2.2 / this.playerModel.satietyModifier;
        }

        if( this.playerModel.health > 0 ) {
            this.playerModel.health += 0.2 * this.playerModel.healthModifier;
        } else {
            this.playerModel.health -= 0.2 / this.playerModel.healthModifier;
        }
    }

    private trainGameWithBots(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.reaction > 0 ) {
            this.playerModel.reaction += 1 * this.playerModel.reactionModifier;
        } else {
            this.playerModel.reaction -= 1 / this.playerModel.reactionModifier;
        }

        if( this.playerModel.strategy > 0 ) {
            this.playerModel.strategy += 1 * this.playerModel.strategyModifier;
        } else {
            this.playerModel.strategy -= 1 / this.playerModel.strategyModifier;
        }
    }

    private trainReaction(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.reaction > 0 ) {
            this.playerModel.reaction += 2.5 * this.playerModel.reactionModifier;
        } else {
            this.playerModel.reaction -= 2.5 / this.playerModel.reactionModifier;
        }
    }

    private trainStrategy(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.strategy > 0 ) {
            this.playerModel.strategy += 2.5 * this.playerModel.strategyModifier;
        } else {
            this.playerModel.strategy -= 2.5 / this.playerModel.strategyModifier;
        }
    }

    private trainSynergy(): void {
        this.runDefaultTickChanges(1, 3, 7);

        if( this.playerModel.reaction > 0 ) {
            this.playerModel.reaction += 0.25 * this.playerModel.reactionModifier;
        } else {
            this.playerModel.reaction -= 0.25 / this.playerModel.reactionModifier;
        }

        if( this.playerModel.strategy > 0 ) {
            this.playerModel.strategy += 0.25 * this.playerModel.strategyModifier;
        } else {
            this.playerModel.strategy -= 0.25 / this.playerModel.strategyModifier;
        }

        if( this.playerModel.synergy > 0 ) {
            this.playerModel.synergy += 2.5 * this.playerModel.synergyModifier;
        } else {
            this.playerModel.synergy -= 2.5 / this.playerModel.synergyModifier;
        }
    }

    private calculateSatiety(): void {
        if( this.playerModel.satiety >= 10 ) {
            this.playerModel.energy -= 3;
            this.playerModel.moodModifier = 1;

            return;
        }

        if( this.playerModel.satiety > 0 ) {
            this.playerModel.energy -= 5;
            this.playerModel.health -= 0.25;

            this.playerModel.moodModifier = 0.75;

            this.checkWhetherPlayerAlive();

            return;
        }

        this.playerModel.energy -= 6.5;
        this.playerModel.health -= 1;

        this.playerModel.moodModifier = 0.5;

        this.checkWhetherPlayerAlive();
    }

    private calculateEnergy(): void {
        if( this.playerModel.energy >= 10 ) {
            this.playerModel.satiety -= 7;
            this.playerModel.moodModifier = 1;

            return;
        }

        if( this.playerModel.energy > 0 ) {
            this.playerModel.satiety -= 12;
            this.playerModel.health -= 1;

            this.playerModel.moodModifier = 0.75;

            this.checkWhetherPlayerAlive();

            return;
        }

        this.playerModel.satiety -= 18;
        this.playerModel.health -= 4;

        this.playerModel.moodModifier = 0.5;

        this.checkWhetherPlayerAlive();
    }

    private calculateMood(): void {
        if( this.playerModel.mood = 100 ) {
            this.playerModel.reactionModifier = 1.25;
            this.playerModel.strategyModifier = 1.25;
            this.playerModel.synergyModifier = 1.25;
            this.playerModel.energyModifier = 1.5;
            this.playerModel.satietyModifier = 1.5;
            this.playerModel.healthModifier = 1.5;

            return;
        }

        if( this.playerModel.mood >= 90 ) {
            this.playerModel.reactionModifier = 1.1;
            this.playerModel.strategyModifier = 1.1;
            this.playerModel.synergyModifier = 1.1;
            this.playerModel.energyModifier = 1.2;
            this.playerModel.satietyModifier = 1.2;
            this.playerModel.healthModifier = 1.2;

            this.playerModel.health += 2;

            return;
        }

        if( this.playerModel.mood >= 50 ) {
            this.playerModel.reactionModifier = 1;
            this.playerModel.strategyModifier = 1;
            this.playerModel.synergyModifier = 1;
            this.playerModel.energyModifier = 1;
            this.playerModel.satietyModifier = 1;
            this.playerModel.healthModifier = 1;

            this.playerModel.health += 1;

            return;
        }

        if( this.playerModel.mood >= 25 ) {
            this.playerModel.reactionModifier = 0.9;
            this.playerModel.strategyModifier = 0.9;
            this.playerModel.synergyModifier = 0.9;
            this.playerModel.energyModifier = 0.8;
            this.playerModel.satietyModifier = 0.8;
            this.playerModel.healthModifier = 0.8;

            return;
        }

        if( this.playerModel.mood >= 10 ) {
            this.playerModel.reactionModifier = 0.75;
            this.playerModel.strategyModifier = 0.75;
            this.playerModel.synergyModifier = 0.75;
            this.playerModel.energyModifier = 0.6;
            this.playerModel.satietyModifier = 0.6;
            this.playerModel.healthModifier = 0.6;

            return;
        }

        if( this.playerModel.mood > 0 ) {
            this.playerModel.reactionModifier = 0.5;
            this.playerModel.strategyModifier = 0.5;
            this.playerModel.synergyModifier = 0.5;
            this.playerModel.energyModifier = 0.4;
            this.playerModel.satietyModifier = 0.4;
            this.playerModel.healthModifier = 0.4;

            this.playerModel.health -= 2;

            this.checkWhetherPlayerAlive();

            return;
        }

        this.playerModel.reactionModifier = 0.1;
        this.playerModel.strategyModifier = 0.1;
        this.playerModel.synergyModifier = 0.1;
        this.playerModel.energyModifier = 0.2;
        this.playerModel.satietyModifier = 0.2;
        this.playerModel.healthModifier = 0.2;

        this.playerModel.health -= 10;

        this.checkWhetherPlayerAlive();
    }

    private calculateHealth(): void {
        if( this.playerModel.health >= 75 ) {
            this.playerModel.reactionModifier = 1;
            this.playerModel.strategyModifier = 1;
            this.playerModel.synergyModifier = 1;
            this.playerModel.moodModifier = 1;

            //this.playerModel.energy = 100;
            //this.playerModel.satiety = 100;

            return;
        }

        if( this.playerModel.health >= 50 ) {
            this.playerModel.reactionModifier = 0.9;
            this.playerModel.strategyModifier = 0.9;
            this.playerModel.synergyModifier = 0.9;
            this.playerModel.moodModifier = 0.75;

            //this.playerModel.energy = 90;
            //this.playerModel.satiety = 90;

            return;
        }

        if( this.playerModel.health >= 25 ) {
            this.playerModel.reactionModifier = 0.75;
            this.playerModel.strategyModifier = 0.75;
            this.playerModel.synergyModifier = 0.75;
            this.playerModel.moodModifier = 0.5;

            //this.playerModel.energy = 75;
            //this.playerModel.satiety = 75;

            return;
        }

        if( this.playerModel.health >= 10 ) {
            this.playerModel.reactionModifier = 0.5;
            this.playerModel.strategyModifier = 0.5;
            this.playerModel.synergyModifier = 0.5;
            this.playerModel.moodModifier = 0.25;

            //this.playerModel.energy = 50;
            //this.playerModel.satiety = 50;

            return;
        }

        if( this.playerModel.health > 0 ) {
            this.playerModel.reactionModifier = 0.1;
            this.playerModel.strategyModifier = 0.1;
            this.playerModel.synergyModifier = 0.1;
            this.playerModel.moodModifier = 0.1;

            //this.playerModel.energy = 30;
            //this.playerModel.satiety = 30;

            return;
        }

        //TODO: End game
    }

    // private checkWhetherPlayerWillSurvive(value: number): boolean {
    //     return this.playerModel.health - value > 0;
    // }

    private checkWhetherPlayerAlive(): void  {
        if( this.playerModel.health <= 0 ) {
            //TODO: End game
        }
    }

    //TODO: Add CUP values
}