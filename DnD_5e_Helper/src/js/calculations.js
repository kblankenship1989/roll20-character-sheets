const calculatePassiveSkill = (skillModifier, rollType) => {
    const rollTypePassiveModifier = {
        "1d20": 0,
        "2d20kh1": 5,
        "2d20kl1": -5
    }
    const skillModifierNumber = Number(skillModifier) || 0;
    const rollTypeSafe = rollType || "1d20";

    return skillModifierNumber + 10 + rollTypePassiveModifier[rollTypeSafe];
};

const calculateDiceModifier = (proficiencyBonus, rootModifier, proficiencyMultiplier, additionalModifier) => {
    const proficiencyBonusNumber = Number(proficiencyBonus) || 0;
    const abilityModifierNumber = Number(rootModifier) || 0;
    const skillModifier = abilityModifierNumber + ((proficiencyMultiplier || 0) * proficiencyBonusNumber);
    const additionalModifierNumber = Number(additionalModifier) || 0;
    const valueWithAdditionalModifier = skillModifier + additionalModifierNumber;

    return valueWithAdditionalModifier >= 0 
        ? `+${valueWithAdditionalModifier}` 
        : `-${Math.abs(valueWithAdditionalModifier)}`;
};

const calculateAbilityModifier = (abilityScore) => {
    const abilityScoreNumber = abilityScore || 10;
    const abilityModifier = Math.floor((abilityScoreNumber - 10) / 2);

    return abilityModifier >= 0 
        ? `+${abilityModifier}` 
        : `-${Math.abs(abilityModifier)}`;
}

const calculateAdditionalDice = (diceCount, diceType) => {
    const diceCountNumber = Number(diceCount) || 0;
    const diceTypeValidated = diceType || "d4";

    if (diceCountNumber === 0) {
        return "";
    }
    
    return diceCountNumber > 0
        ? `+${diceCountNumber}${diceTypeValidated}`
        : `-${Math.abs(diceCountNumber)}${diceTypeValidated}`;
}

const hasAdditionalModifiers = (additionalModifier, additionalDice) => {
    if ((Number(additionalModifier) || 0) !== 0 || Boolean(additionalDice)) {
        return "*";
    }
    
    return "";
};
