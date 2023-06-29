/* Data constants */
type Skill = {
    name: string,
    label: string
};
type Attribute = {
    name: string,
    label: string,
    skills: Skill[]
}
const sheetName = "DnD 5e Helper";
const sheetVersion = "0.1.0";
const strength: Attribute = {
    name: 'strength',
    label: 'STR',
    skills: [
        {
            name: 'athletics',
            label: 'Athletics'
        }
    ]
};
const dexterity: Attribute = {
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
const constitution: Attribute = {
    name: 'constitution',
    label: 'CON',
    skills: []
};
const intelligence: Attribute = {
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
const wisdom: Attribute = {
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
const charisma: Attribute = {
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

export const attributes: Record<string, Attribute> = {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma
};
