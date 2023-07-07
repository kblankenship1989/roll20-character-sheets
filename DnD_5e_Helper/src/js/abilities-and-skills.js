abilities.forEach(ability => {
    const skillNameList = ability.skills.map(skill => skill.name).concat([`${ability.name}_save`])
    on(`change:${ability.name}`, () => {
        let attrs = [
            "proficiency_bonus",
            ability.name,
            `${ability.name}_modifier`
        ];

        skillNameList.forEach((skill) => {
            const skillAttrs = [
                `${skill}_additional_modifiers`,
                `${skill}_proficiency`,
                `${skill}_roll_type`
            ];

            attrs = attrs.concat(skillAttrs);
        });
		getAttrs(attrs, (values) => {
			const abilityModifier = calculateAbilityModifier(values[ability.name]);
            const newValues = {
				[`${ability.name}_modifier`]: abilityModifier
			};

            skillNameList.forEach((skill) => {
                newValues[`${skill}`] = calculateDiceModifier(
                    values.proficiency_bonus,
                    abilityModifier,
                    values[`${skill}_proficiency`],
                    values[`${skill}_additional_modifiers`]
                );
                newValues[`${skill}_passive`] = calculatePassiveSkill(newValues[`${skill}`], values[`${skill}_roll_type`]);
            });
			setAttrs(newValues);
		});
	});

    skillNameList.forEach(skill => {
        on(`clicked:${skill}_roll_type`, () => {
            const skillRollType = `${skill}_roll_type`;
            getAttrs([
                skillRollType,
                skill
            ], (values) => {
                const nextRollTypeIndex = (rollTypes.indexOf(values[skillRollType]) + 1) % rollTypes.length;

                const newValues = {
                    [skillRollType]: rollTypes[nextRollTypeIndex],
                    [`${skill}_passive`]: calculatePassiveSkill(values[skill], rollTypes[nextRollTypeIndex])
                };
                setAttrs(newValues);
            });
        });

        on(`change:${skill}_additional_modifiers`, () => {
            const attrs = [
                "proficiency_bonus",
                `${skill}_proficiency`,
                `${skill}_additional_modifiers`,
                `${skill}_additional_dice`,
                `${ability.name}_modifier`,
                `${skill}_roll_type`
            ];
            getAttrs(attrs, (values) => {
                const skillModifier = calculateDiceModifier(
                    values.proficiency_bonus,
                    values[`${ability.name}_modifier`],
                    values[`${skill}_proficiency`],
                    values[`${skill}_additional_modifiers`]
                );
                const newValues = {
                    [skill]: skillModifier,
                    [`${skill}_passive`]: calculatePassiveSkill(skillModifier, values[`${skill}_roll_type`]),
                    [`${skill}_has_additional_modifiers`]: hasAdditionalModifiers(values[`${skill}_additional_modifiers`], values[`${skill}_additional_dice`])
                };

                setAttrs(newValues);
            });
        });

        on(`change:${skill}_additional_dice_count change:${skill}_additional_dice_type`, () => {
            const attrs = [
                `${skill}_additional_modifiers`,
                `${skill}_additional_dice_count`,
                `${skill}_additional_dice_type`
            ];
            getAttrs(attrs, (values) => {
                const additionalDice = calculateAdditionalDice(values[`${skill}_additional_dice_count`], values[`${skill}_additional_dice_type`]);
                const newValues = {
                    [`${skill}_additional_dice`]: additionalDice,
                    [`${skill}_has_additional_modifiers`]: hasAdditionalModifiers(values[`${skill}_additional_modifiers`], additionalDice)
                };

                setAttrs(newValues);
            });
        });

        on(`clicked:${skill}_proficiency`, () => {
            const attrs = [
                "proficiency_bonus",
                `${skill}_proficiency`,
                `${skill}_additional_modifiers`,
                `${ability.name}_modifier`,
                `${skill}_roll_type`
            ];
            getAttrs(attrs, (values) => {
                const proficiencyMultiplier = (Number((values[`${skill}_proficiency`] || 0)) + 1) % 3;
                const skillModifer = calculateDiceModifier(
                    values.proficiency_bonus,
                    values[`${ability.name}_modifier`],
                    proficiencyMultiplier,
                    values[`${skill}_additional_modifiers`]
                );
                const newValues = {
                    [`${skill}_proficiency`]: proficiencyMultiplier,
                    [skill]: skillModifer,
                    [`${skill}_passive`]: calculatePassiveSkill(skillModifer, values[`${skill}_roll_type`])
                };

                setAttrs(newValues);
            });
        });

        on(`clicked:${skill}_show_additional_mods_toggle`, () => {
            const toggle = `${skill}_show_additional_mods_toggle`;
            getAttrs([
                toggle
            ], (values) => {
                setAttrs({
                    [toggle]: ((Number(values[toggle]) || 0) + 1) % 2
                });
            });
        });
    });
});

on("sheet:compendium-drop", function () {
    console.log("TEST: ");
});
