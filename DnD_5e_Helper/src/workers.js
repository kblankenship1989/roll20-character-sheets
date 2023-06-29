System.register("constants", [], function (exports_1, context_1) {
    "use strict";
    var sheetName, sheetVersion, strength, dexterity, constitution, intelligence, wisdom, charisma, attributes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            sheetName = "DnD 5e Helper";
            sheetVersion = "0.1.0";
            strength = {
                name: 'strength',
                label: 'STR',
                skills: [
                    {
                        name: 'athletics',
                        label: 'Athletics'
                    }
                ]
            };
            dexterity = {
                name: 'dexterity',
                label: 'DEX',
                skills: [
                    {
                        name: 'acrobatics',
                        label: 'Acrobatics'
                    },
                    {
                        name: 'sleight_of_hand',
                        label: 'Sleight of Hand'
                    },
                    {
                        name: 'stealth',
                        label: 'Stealth'
                    }
                ]
            };
            constitution = {
                name: 'constitution',
                label: 'CON',
                skills: []
            };
            intelligence = {
                name: 'intelligence',
                label: 'INT',
                skills: [
                    {
                        name: 'arcana',
                        label: 'Arcana'
                    },
                    {
                        name: 'history',
                        label: 'History'
                    },
                    {
                        name: 'investigation',
                        label: 'Investigation'
                    },
                    {
                        name: 'nature',
                        label: 'Nature'
                    },
                    {
                        name: 'religion',
                        label: 'Religion'
                    }
                ]
            };
            wisdom = {
                name: 'wisdom',
                label: 'WIS',
                skills: [
                    {
                        name: 'animal_handling',
                        label: 'Animal Handling'
                    },
                    {
                        name: 'insight',
                        label: 'Insight'
                    },
                    {
                        name: 'medicine',
                        label: 'Medicine'
                    },
                    {
                        name: 'perception',
                        label: 'Perception'
                    },
                    {
                        name: 'survival',
                        label: 'Survival'
                    }
                ]
            };
            charisma = {
                name: 'charisma',
                label: 'CHA',
                skills: [
                    {
                        name: 'deception',
                        label: 'Deception'
                    },
                    {
                        name: 'intimidation',
                        label: 'Intimidation'
                    },
                    {
                        name: 'performance',
                        label: 'Performance'
                    },
                    {
                        name: 'persuasion',
                        label: 'Persuasion'
                    }
                ]
            };
            exports_1("attributes", attributes = {
                strength: strength,
                dexterity: dexterity,
                constitution: constitution,
                intelligence: intelligence,
                wisdom: wisdom,
                charisma: charisma
            });
        }
    };
});
