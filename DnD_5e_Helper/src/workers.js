var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a, _b;
var sheetName = "Stars Without Number (revised)";
var sheetVersion = "2.6.5";
var translate = getTranslationByKey;
var attributes = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var effortAttributes = ["wisdom_mod", "constitution_mod", "psionics_extra_effort",
    "skill_biopsionics", "skill_precognition", "skill_telepathy", "skill_teleportation",
    "skill_telekinesis", "skill_metapsionics", "psionics_committed_effort_current",
    "psionics_committed_effort_scene", "psionics_committed_effort_day"
];
var shipStatEvent = __spreadArrays(["hardpoints", "power", "mass"].map(function (x) { return "change:repeating_ship-weapons:weapon_" + x; }), ["power", "mass"].map(function (x) { return "change:repeating_ship-defenses:defense_" + x; }), ["power", "mass"].map(function (x) { return "change:repeating_ship-fittings:fitting_" + x; }), [
    "change:ship_power", "change:ship_mass", "change:ship_hardpoints",
    "remove:repeating_ship-weapons", "remove:repeating_ship-defenses",
    "remove:repeating_ship-fittings"
]).join(" ");
var weaponSkills = [
    "skill_exert", "skill_punch", "skill_shoot", "skill_stab", "skill_combat_energy",
    "skill_combat_gunnery", "skill_combat_primitive", "skill_combat_projectile",
    "skill_combat_psitech", "skill_combat_unarmed", "skill_telekinesis", "skill_sunblade"
];
var weaponDisplayEvent = __spreadArrays(["attack", "name", "skill_bonus", "attribute_mod", "damage", "shock", "shock_damage",
    "shock_ac", "skill_to_damage"
].map(function (x) { return "change:repeating_weapons:weapon_" + x; }), [
    "remove:repeating_weapons", "change:attack_bonus"
], weaponSkills.map(function (name) { return "change:" + name; })).join(" ");
var skills = {
    revised: ["administer", "connect", "exert", "fix", "heal", "know", "lead",
        "notice", "perform", "pilot", "program", "punch", "shoot", "sneak", "stab",
        "survive", "talk", "trade", "work"
    ],
    first: ["artist", "athletics", "bureaucracy", "business", "combat_energy", "combat_gunnery",
        "combat_primitive", "combat_projectile", "combat_psitech", "combat_unarmed", "computer",
        "culture_alien", "culture_criminal", "culture_spacer", "culture_traveller", "culture_one",
        "culture_two", "culture_three", "exosuit", "gambling", "history", "instructor", "language",
        "leadership", "navigation", "perception", "persuade", "profession", "religion", "science",
        "security", "stealth", "steward", "survival", "tactics", "tech_astronautic", "tech_maltech",
        "tech_medical", "tech_postech", "tech_pretech", "tech_psitech", "vehicle_air", "vehicle_grav",
        "vehicle_land", "vehicle_space", "vehicle_water"
    ],
    psionic: ["biopsionics", "metapsionics", "precognition", "telekinesis", "telepathy", "teleportation"],
    magic: ["know_magic", "use_magic", "sunblade"],
    wwn: ["administer", "connect", "convince", "craft", "exert", "heal", "know", "lead", "magic", "notice", "perform", "pray", "punch", "ride", "sail", "shoot", "sneak", "stab", "survive", "trade", "work"]
};
var shipStats = ["ship_ac", "ship_armor", "ship_class", "ship_crew_max", "ship_crew_min",
    "ship_hardpoints_max", "ship_hp", "ship_hp_max", "ship_mass_max", "ship_power_max", "ship_speed", "ship_hull_price",
];
var reverseHullTypes = (_a = {},
    _a[translate("BATTLESHIP").toString().toLowerCase()] = "battleship",
    _a[translate("BULK_FREIGHTER").toString().toLowerCase()] = "bulk_freighter",
    _a[translate("CARRIER").toString().toLowerCase()] = "carrier",
    _a[translate("CORVETTE").toString().toLowerCase()] = "corvette",
    _a[translate("FLEET_CRUISER").toString().toLowerCase()] = "fleet_cruiser",
    _a[translate("FREE_MERCHANT").toString().toLowerCase()] = "free_merchant",
    _a[translate("HEAVY_FRIGATE").toString().toLowerCase()] = "heavy_frigate",
    _a[translate("LARGE_STATION").toString().toLowerCase()] = "large_station",
    _a[translate("PATROL_BOAT").toString().toLowerCase()] = "patrol_boat",
    _a[translate("SMALL_STATION").toString().toLowerCase()] = "small_station",
    _a[translate("STRIKE_FIGHTER").toString().toLowerCase()] = "strike_fighter",
    _a[translate("SHUTTLE").toString().toLowerCase()] = "shuttle",
    _a);
var reverseClasses = (_b = {},
    _b[translate("ADVENTURER").toString().toLowerCase()] = "adventurer",
    _b[translate("EXPERT").toString().toLowerCase()] = "expert",
    _b[translate("PSYCHIC").toString().toLowerCase()] = "psychic",
    _b[translate("WARRIOR").toString().toLowerCase()] = "warrior",
    _b);
var autofillSections = ["armor", "cyberware", "foci", "gear", "ship-defenses", "ship-fittings", "ship-weapons", "techniques", "weapons"];
var autofillData = {
    "classes": {
        adventurer: {
            class_ability: translate("ADVENTURER_CLASS_ABILITY")
        },
        expert: {
            class_ability: translate("EXPERT_CLASS_ABILITY")
        },
        psychic: {
            class_ability: translate("PSYCHIC_CLASS_ABILITY")
        },
        warrior: {
            attack_bonus: "1",
            class_ability: translate("WARRIOR_CLASS_ABILITY")
        }
    },
    "drones": {
        alecto: {
            drone_AC: "18",
            drone_enc: "4",
            drone_HP: "30",
            drone_num_fittings: "4",
            drone_range: "5000 km",
            drone_price: "50000"
        },
        cuttlefish: {
            drone_AC: "13",
            drone_enc: "2",
            drone_HP: "10",
            drone_num_fittings: "5",
            drone_range: "1 km",
            drone_price: "2000"
        },
        ghostwalker: {
            drone_AC: "15",
            drone_enc: "3",
            drone_fitting_1_desc: translate("SENSOR_TRANSPARENCY_DESC"),
            drone_fitting_1_name: translate("SENSOR_TRANSPARENCY"),
            drone_HP: "1",
            drone_num_fittings: "3",
            drone_range: "5 km",
            drone_price: "3000"
        },
        pax: {
            drone_AC: "16",
            drone_enc: "4",
            drone_HP: "20",
            drone_num_fittings: "4",
            drone_range: "100 km",
            drone_price: "10000"
        },
        primitve_drone: {
            drone_AC: "12",
            drone_enc: "2",
            drone_HP: "1",
            drone_num_fittings: "1",
            drone_range: "500 m",
            drone_price: "250"
        },
        sleeper: {
            drone_AC: "12",
            drone_enc: "2",
            drone_fitting_1_desc: translate("STATIONKEEPING_DESC"),
            drone_fitting_1_name: translate("STATIONKEEPING"),
            drone_HP: "8",
            drone_num_fittings: "5",
            drone_range: "100 km",
            drone_price: "2500"
        },
        stalker: {
            drone_AC: "13",
            drone_enc: "2",
            drone_HP: "5",
            drone_num_fittings: "3",
            drone_range: "2 km",
            drone_price: "1000"
        },
        void_hawk: {
            drone_AC: "14",
            drone_enc: "6",
            drone_HP: "15",
            drone_num_fittings: "4",
            drone_range: "100 km",
            drone_price: "5000"
        }
    },
    "droneFittings": [
        "ammo_unit",
        "bomber",
        "environmental_power",
        "expert_system",
        "extended_flight",
        "grav_muffles",
        "heavy_lift",
        "holoskin",
        "medical_support",
        "observation_suite",
        "racing_gravitics",
        "reinforced_structure",
        "sensor_transparency",
        "stationkeeping",
        "suicide_charge",
        "weapon_fitting",
    ],
    "hulltypes": {
        battleship: {
            ship_ac: "16",
            ship_armor: "20",
            ship_class: translate("CAPITAL"),
            ship_crew_max: "1000",
            ship_crew_min: "200",
            ship_hardpoints_max: "15",
            ship_hp: "100",
            ship_mass_max: "50",
            ship_power_max: "75",
            ship_speed: "0",
            ship_hull_price: "50000000"
        },
        bulk_freighter: {
            ship_ac: "11",
            ship_armor: "0",
            ship_class: translate("CRUISER"),
            ship_crew_max: "40",
            ship_crew_min: "10",
            ship_hardpoints_max: "2",
            ship_hp: "40",
            ship_mass_max: "25",
            ship_power_max: "15",
            ship_speed: "0",
            ship_hull_price: "5000000"
        },
        carrier: {
            ship_ac: "14",
            ship_armor: "10",
            ship_class: translate("CAPITAL"),
            ship_crew_max: "1500",
            ship_crew_min: "300",
            ship_hardpoints_max: "4",
            ship_hp: "75",
            ship_mass_max: "100",
            ship_power_max: "50",
            ship_speed: "0",
            ship_hull_price: "60000000"
        },
        corvette: {
            ship_ac: "13",
            ship_armor: "10",
            ship_class: translate("FRIGATE"),
            ship_crew_max: "40",
            ship_crew_min: "10",
            ship_hardpoints_max: "6",
            ship_hp: "40",
            ship_mass_max: "15",
            ship_power_max: "15",
            ship_speed: "2",
            ship_hull_price: "4000000"
        },
        fleet_cruiser: {
            ship_ac: "14",
            ship_armor: "15",
            ship_class: translate("CRUISER"),
            ship_crew_max: "200",
            ship_crew_min: "50",
            ship_hardpoints_max: "10",
            ship_hp: "60",
            ship_mass_max: "30",
            ship_power_max: "50",
            ship_speed: "1",
            ship_hull_price: "10000000"
        },
        free_merchant: {
            ship_ac: "14",
            ship_armor: "2",
            ship_class: translate("FRIGATE"),
            ship_crew_max: "6",
            ship_crew_min: "1",
            ship_hardpoints_max: "2",
            ship_hp: "20",
            ship_mass_max: "15",
            ship_power_max: "10",
            ship_speed: "3",
            ship_hull_price: "500000"
        },
        heavy_frigate: {
            ship_ac: "15",
            ship_armor: "10",
            ship_class: translate("FRIGATE"),
            ship_crew_max: "120",
            ship_crew_min: "30",
            ship_hardpoints_max: "8",
            ship_hp: "50",
            ship_mass_max: "20",
            ship_power_max: "25",
            ship_speed: "1",
            ship_hull_price: "7000000"
        },
        large_station: {
            ship_ac: "17",
            ship_armor: "20",
            ship_class: translate("CAPITAL"),
            ship_crew_max: "1000",
            ship_crew_min: "100",
            ship_hardpoints_max: "30",
            ship_hp: "120",
            ship_mass_max: "75",
            ship_power_max: "125",
            ship_speed: "",
            ship_hull_price: "40000000"
        },
        patrol_boat: {
            ship_ac: "14",
            ship_armor: "5",
            ship_class: translate("FRIGATE"),
            ship_crew_max: "20",
            ship_crew_min: "5",
            ship_hardpoints_max: "4",
            ship_hp: "25",
            ship_mass_max: "10",
            ship_power_max: "15",
            ship_speed: "4",
            ship_hull_price: "2500000"
        },
        small_station: {
            ship_ac: "11",
            ship_armor: "5",
            ship_class: translate("CRUISER"),
            ship_crew_max: "200",
            ship_crew_min: "20",
            ship_hardpoints_max: "10",
            ship_hp: "120",
            ship_mass_max: "40",
            ship_power_max: "50",
            ship_speed: "",
            ship_hull_price: "5000000"
        },
        strike_fighter: {
            ship_ac: "16",
            ship_armor: "5",
            ship_class: translate("FIGHTER"),
            ship_crew_max: "1",
            ship_crew_min: "1",
            ship_hardpoints_max: "1",
            ship_hp: "8",
            ship_mass_max: "2",
            ship_power_max: "5",
            ship_speed: "5",
            ship_hull_price: "200000"
        },
        shuttle: {
            ship_ac: "11",
            ship_armor: "0",
            ship_class: translate("FIGHTER"),
            ship_crew_max: "10",
            ship_crew_min: "1",
            ship_hardpoints_max: "1",
            ship_hp: "15",
            ship_mass_max: "5",
            ship_power_max: "3",
            ship_speed: "3",
            ship_hull_price: "200000"
        }
    },
    "statblocks": {
        barbarian_hero: {
            npc_hd: "6",
            npc_ac: "16",
            npc_attack_bonus: "8",
            npc_damage: "Weapon+3",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "11",
            npc_skills: "3",
            npc_saves: "12",
            npc_armor_type: "PRIMITIVE"
        },
        barbarian_tribal: {
            npc_hd: "1",
            npc_ac: "12",
            npc_attack_bonus: "2",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: "PRIMITIVE"
        },
        civilian_security_bot: {
            npc_hd: "1",
            npc_ac: "15",
            npc_attack_bonus: "1",
            npc_damage: "1d8[Stun]",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "12",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        companion_bot: {
            npc_hd: "1",
            npc_ac: "12",
            npc_attack_bonus: "0",
            npc_damage: "1d2[Unarmed]",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "6",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        elite_fighter: {
            npc_hd: "3",
            npc_ac: "16",
            npc_attack_bonus: "4",
            npc_damage: "Weapon+1",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "10",
            npc_skills: "2",
            npc_saves: "14",
            npc_armor_type: "COMBAT"
        },
        gang_boss: {
            npc_hd: "3",
            npc_ac: "14",
            npc_attack_bonus: "4",
            npc_damage: "Weapon+1",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "9",
            npc_skills: "2",
            npc_saves: "15",
            npc_armor_type: ""
        },
        gang_member: {
            npc_hd: "1",
            npc_ac: "12",
            npc_attack_bonus: "1",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "7",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        geneengineered_killer: {
            npc_hd: "4",
            npc_ac: "16",
            npc_attack_bonus: "5",
            npc_damage: "Weapon+1",
            npc_attacks: "1",
            npc_move: "15m",
            npc_morale: "10",
            npc_skills: "2",
            npc_saves: "13",
            npc_armor_type: ""
        },
        geneengineered_murder_beast: {
            npc_hd: "10",
            npc_ac: "18",
            npc_attack_bonus: "10",
            npc_damage: "1d10",
            npc_attacks: "4",
            npc_move: "20m",
            npc_morale: "12",
            npc_skills: "3",
            npc_saves: "10",
            npc_armor_type: ""
        },
        greater_lone_predator: {
            npc_hd: "5",
            npc_ac: "16",
            npc_attack_bonus: "6",
            npc_damage: "1d10",
            npc_attacks: "2",
            npc_move: "10m",
            npc_morale: "9",
            npc_skills: "2",
            npc_saves: "12",
            npc_armor_type: ""
        },
        heavy_warbot: {
            npc_hd: "6",
            npc_ac: "18",
            npc_attack_bonus: "8",
            npc_damage: "2d8[Plasma]",
            npc_attacks: "2",
            npc_move: "15m",
            npc_morale: "10",
            npc_skills: "2",
            npc_saves: "12",
            npc_armor_type: ""
        },
        heroic_fighter: {
            npc_hd: "6",
            npc_ac: "16",
            npc_attack_bonus: "8",
            npc_damage: "Weapon+3",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "11",
            npc_skills: "3",
            npc_saves: "12",
            npc_armor_type: "COMBAT"
        },
        industrial_work_bot: {
            npc_hd: "2",
            npc_ac: "15",
            npc_attack_bonus: "0",
            npc_damage: "1d10[Crush]",
            npc_attacks: "1",
            npc_move: "5",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "14",
            npc_armor_type: ""
        },
        janitor_bot: {
            npc_hd: "1",
            npc_ac: "14",
            npc_attack_bonus: "0",
            npc_damage: "Unarmed",
            npc_attacks: "1",
            npc_move: "5m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        large_aggressive_prey_animal: {
            npc_hd: "5",
            npc_ac: "13",
            npc_attack_bonus: "4",
            npc_damage: "1d10",
            npc_attacks: "1",
            npc_move: "15m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "12",
            npc_armor_type: ""
        },
        large_pack_hunter: {
            npc_hd: "2",
            npc_ac: "14",
            npc_attack_bonus: "2",
            npc_damage: "1d6",
            npc_attacks: "1",
            npc_move: "15m",
            npc_morale: "9",
            npc_skills: "1",
            npc_saves: "14",
            npc_armor_type: ""
        },
        legendary_fighter: {
            npc_hd: "10",
            npc_ac: "20",
            npc_attack_bonus: "12",
            npc_damage: "Weapon+4",
            npc_attacks: "2",
            npc_move: "10m",
            npc_morale: "12",
            npc_skills: "5",
            npc_saves: "10",
            npc_armor_type: "POWERED"
        },
        lesser_lone_predator: {
            npc_hd: "3",
            npc_ac: "14",
            npc_attack_bonus: "4",
            npc_damage: "1d8",
            npc_attacks: "2",
            npc_move: "15m",
            npc_morale: "8",
            npc_skills: "2",
            npc_saves: "14",
            npc_armor_type: ""
        },
        martial_human: {
            npc_hd: "1",
            npc_ac: "10",
            npc_attack_bonus: "1",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        military_elite: {
            npc_hd: "3",
            npc_ac: "16",
            npc_attack_bonus: "4",
            npc_damage: "Weapon+1",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "10",
            npc_skills: "2",
            npc_saves: "14",
            npc_armor_type: "COMBAT"
        },
        military_soldier: {
            npc_hd: "1",
            npc_ac: "16",
            npc_attack_bonus: "1",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "9",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: "COMBAT"
        },
        normal_human: {
            npc_hd: "1",
            npc_ac: "10",
            npc_attack_bonus: "0",
            npc_damage: "Unarmed",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "6",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        peaceful_human: {
            npc_hd: "1",
            npc_ac: "10",
            npc_attack_bonus: "0",
            npc_damage: "Unarmed",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "6",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        pirate_king: {
            npc_hd: "7",
            npc_ac: "18",
            npc_attack_bonus: "9",
            npc_damage: "Weapon+2",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "11",
            npc_skills: "3",
            npc_saves: "12",
            npc_armor_type: "POWERED"
        },
        police_officer: {
            npc_hd: "1",
            npc_ac: "14",
            npc_attack_bonus: "1",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        repair_bot: {
            npc_hd: "1",
            npc_ac: "14",
            npc_attack_bonus: "0",
            npc_damage: "1d6[Tool]",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        serial_killer: {
            npc_hd: "6",
            npc_ac: "12",
            npc_attack_bonus: "8",
            npc_damage: "Weapon+3",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "12",
            npc_skills: "3",
            npc_saves: "12",
            npc_armor_type: ""
        },
        skilled_professional: {
            npc_hd: "1",
            npc_ac: "10",
            npc_attack_bonus: "0",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "6",
            npc_skills: "2",
            npc_saves: "15",
            npc_armor_type: ""
        },
        small_pack_hunter: {
            npc_hd: "1",
            npc_ac: "13",
            npc_attack_bonus: "1",
            npc_damage: "1d4",
            npc_attacks: "1",
            npc_move: "15m",
            npc_morale: "8",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        small_vicious_beast: {
            npc_hd: "1hp",
            npc_ac: "14",
            npc_attack_bonus: "1",
            npc_damage: "1d2",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "7",
            npc_skills: "1",
            npc_saves: "15",
            npc_armor_type: ""
        },
        soldier_bot: {
            npc_hd: "2",
            npc_ac: "16",
            npc_attack_bonus: "1",
            npc_damage: "Weapon",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "10",
            npc_skills: "1",
            npc_saves: "14",
            npc_armor_type: ""
        },
        terrifying_apex_predator: {
            npc_hd: "8",
            npc_ac: "16",
            npc_attack_bonus: "8",
            npc_damage: "1d10",
            npc_attacks: "2",
            npc_move: "20m",
            npc_morale: "9",
            npc_skills: "2",
            npc_saves: "11",
            npc_armor_type: ""
        },
        veteran_fighter: {
            npc_hd: "2",
            npc_ac: "14",
            npc_attack_bonus: "2",
            npc_damage: "Weapon+1",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "9",
            npc_skills: "1",
            npc_saves: "14",
            npc_armor_type: ""
        },
        warrior_tyrant: {
            npc_hd: "8",
            npc_ac: "20",
            npc_attack_bonus: "10",
            npc_damage: "Weapon+3",
            npc_attacks: "1",
            npc_move: "10m",
            npc_morale: "11",
            npc_skills: "3",
            npc_saves: "11",
            npc_armor_type: "POWERED"
        }
    },
    "armor": {
        armored_undersuit: {
            armor_ac: "13",
            armor_encumbrance: "0",
            armor_type: "STREET",
            armor_price: "600"
        },
        armored_vacc_suit: {
            armor_ac: "13",
            armor_encumbrance: "2",
            armor_type: "STREET",
            armor_price: "400"
        },
        assault_suit: {
            armor_ac: "18",
            armor_encumbrance: "2",
            armor_type: "POWERED",
            armor_price: "10000"
        },
        combat_field_uniform: {
            armor_ac: "16",
            armor_encumbrance: "1",
            armor_type: "COMBAT",
            armor_price: "1000"
        },
        cuirass_brigandine_linothorax_half_plate: {
            armor_ac: "15",
            armor_encumbrance: "1",
            armor_type: "PRIMITIVE",
            armor_price: "50"
        },
        deflector_array: {
            armor_ac: "18",
            armor_encumbrance: "0",
            armor_type: "STREET",
            armor_price: "30000"
        },
        executive_security_suit: {
            armor_ac: "15",
            armor_encumbrance: "0",
            armor_type: "ARTIFACT"
        },
        field_emitter_panoply: {
            armor_ac: "20",
            armor_encumbrance: "1",
            armor_encumbrance_bonus: "4",
            armor_type: "POWERED",
            armor_price: "40000"
        },
        force_pavis: {
            armor_ac: "15",
            armor_ac_bonus: "1",
            armor_encumbrance: "1",
            armor_type: "SHIELD",
            armor_price: "10000"
        },
        full_plate_layered_mail: {
            armor_ac: "17",
            armor_encumbrance: "2",
            armor_type: "PRIMITIVE",
            armor_price: "100"
        },
        ghost_mantle: {
            armor_ac: "15",
            armor_encumbrance: "0",
            armor_type: "ARTIFACT"
        },
        icarus_harness: {
            armor_ac: "16",
            armor_encumbrance: "1",
            armor_type: "COMBAT",
            armor_price: "8000"
        },
        leather_jacks_thick_hides_quilted_armor: {
            armor_ac: "13",
            armor_encumbrance: "1",
            armor_type: "PRIMITIVE",
            armor_price: "10"
        },
        polyplast_carapace: {
            armor_ac: "18",
            armor_encumbrance: "1",
            armor_type: "ARTIFACT"
        },
        psitech_combat_suit: {
            armor_ac: "16",
            armor_encumbrance: "0",
            armor_type: "ARTIFACT"
        },
        secure_clothing: {
            armor_ac: "13",
            armor_encumbrance: "1",
            armor_type: "STREET",
            armor_price: "300"
        },
        security_armor: {
            armor_ac: "14",
            armor_encumbrance: "1",
            armor_type: "COMBAT",
            armor_price: "700"
        },
        shield: {
            armor_ac: "13",
            armor_ac_bonus: "1",
            armor_encumbrance: "2",
            armor_type: "SHIELD",
            armor_price: "10"
        },
        storm_armor: {
            armor_ac: "19",
            armor_encumbrance: "2",
            armor_encumbrance_bonus: "4",
            armor_type: "POWERED",
            armor_price: "20000"
        },
        stutterjump_suit: {
            armor_ac: "18",
            armor_encumbrance: "0",
            armor_type: "ARTIFACT"
        },
        tempest_assault_array: {
            armor_ac: "20",
            armor_encumbrance: "1",
            armor_encumbrance_bonus: "4",
            armor_type: "ARTIFACT"
        },
        titan_powered_armor: {
            armor_ac: "21",
            armor_encumbrance: "2",
            armor_encumbrance_bonus: "4",
            armor_type: "ARTIFACT"
        },
        vestimentum: {
            armor_ac: "18",
            armor_encumbrance: "0",
            armor_type: "POWERED",
            armor_price: "15000"
        },
        warpaint: {
            armor_ac: "12",
            armor_encumbrance: "0",
            armor_type: "STREET",
            armor_price: "300"
        },
        woven_body_armor: {
            armor_ac: "15",
            armor_encumbrance: "2",
            armor_type: "COMBAT",
            armor_price: "400"
        }
    },
    "cyberware": {
        adrenal_suppression_pump: {
            cyberware_strain: "1",
            cyberware_price: "30000"
        },
        bioadaptation_augments: {
            cyberware_strain: "1",
            cyberware_price: "10000"
        },
        body_arsenal_array: {
            cyberware_strain: "1",
            cyberware_price: "10000"
        },
        body_sculpting: {
            cyberware_strain: "1",
            cyberware_price: "10000"
        },
        dermal_armor: {
            cyberware_strain: "2",
            cyberware_price: "20000"
        },
        drone_control_link: {
            cyberware_strain: "1",
            cyberware_price: "20000"
        },
        eelskin_capacitor_mesh: {
            cyberware_strain: "1",
            cyberware_price: "25000"
        },
        gecko_anchors: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        ghost_talker_transceiver: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        holdout_cavity: {
            cyberware_strain: "1",
            cyberware_price: "10000"
        },
        holoskin_emitter: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        identity_submersion_trigger: {
            cyberware_strain: "1",
            cyberware_price: "25000"
        },
        immunofiltration_systems: {
            cyberware_strain: "2",
            cyberware_price: "25000"
        },
        induced_coma_trigger: {
            cyberware_strain: "1",
            cyberware_price: "20000"
        },
        neurointruder_alert: {
            cyberware_strain: "1",
            cyberware_price: "50000"
        },
        panspectral_optics: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        pressure_sheathing: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        prosthetic_limb: {
            cyberware_strain: "1",
            cyberware_price: "2500"
        },
        revenant_wiring: {
            cyberware_strain: "3",
            cyberware_price: "50000"
        },
        slowtime_window: {
            cyberware_strain: "2",
            cyberware_price: "30000"
        },
        stabilization_overrides: {
            cyberware_strain: "2",
            cyberware_price: "25000"
        },
        tagger_nanites: {
            cyberware_strain: "1",
            cyberware_price: "15000"
        },
        toxin_injector: {
            cyberware_strain: "2",
            cyberware_price: "20000"
        },
        twitchlock_actuators: {
            cyberware_strain: "2",
            cyberware_price: "30000"
        }
    },
    "foci": {
        alert: {},
        armsman: {},
        assassin: {},
        authority: {},
        close_combatant: {},
        connected: {},
        die_hard: {},
        diplomat: {},
        gunslinger: {},
        hacker: {},
        healer: {},
        henchkeeper: {},
        ironhide: {},
        psychic_training: {},
        savage_fray: {},
        shocking_assault: {},
        sniper: {},
        specialist: {},
        star_captain: {},
        starfarer: {},
        tinker: {},
        unarmed_combatant: {},
        unique_gift: {},
        wanderer: {},
        wild_psychic_talent: {}
    },
    "gear": {
        ai_companion: {
            gear_encumbrance: "0"
        },
        ammo_20_rounds: {
            gear_encumbrance: "1#",
            gear_price: "10"
        },
        ammo_missile: {
            gear_encumbrance: "1",
            gear_price: "50"
        },
        atmofilter: {
            gear_encumbrance: "1",
            gear_price: "100"
        },
        backpack: {
            gear_encumbrance: "1",
            gear_price: "5/50"
        },
        bezoar: {
            gear_encumbrance: "0",
            gear_price: "200"
        },
        binoculars: {
            gear_encumbrance: "1",
            gear_price: "20/200"
        },
        bioscanner: {
            gear_encumbrance: "1",
            gear_price: "300"
        },
        black_slab: {
            gear_encumbrance: "1",
            gear_price: "10000"
        },
        brainwave: {
            gear_encumbrance: "0",
            gear_price: "1000"
        },
        climbing_harness: {
            gear_encumbrance: "1",
            gear_price: "50"
        },
        comm_server: {
            gear_encumbrance: "3",
            gear_price: "1000"
        },
        compad: {
            gear_encumbrance: "0",
            gear_price: "100"
        },
        data_phase_tab: {
            gear_encumbrance: "1",
            gear_price: "5000"
        },
        data_protocol: {
            gear_encumbrance: "0",
            gear_price: "1000"
        },
        dataslab: {
            gear_encumbrance: "1",
            gear_price: "300"
        },
        field_radio: {
            gear_encumbrance: "1",
            gear_price: "200"
        },
        glowbug: {
            gear_encumbrance: "0",
            gear_price: "5"
        },
        grapnel_launcher: {
            gear_encumbrance: "1",
            gear_price: "200"
        },
        grav_chute: {
            gear_encumbrance: "1",
            gear_price: "300/1000"
        },
        grav_harness: {
            gear_encumbrance: "3",
            gear_price: "5000"
        },
        hush: {
            gear_encumbrance: "0",
            gear_price: "200"
        },
        instapanel: {
            gear_encumbrance: "1#",
            gear_price: "50"
        },
        integrity_stims: {
            gear_encumbrance: "0"
        },
        juggernaut_stims: {
            gear_encumbrance: "0"
        },
        lazarus_patch: {
            gear_encumbrance: "1#",
            gear_price: "30"
        },
        lift: {
            gear_encumbrance: "0",
            gear_price: "50"
        },
        line_shunt: {
            gear_encumbrance: "0",
            gear_price: "100"
        },
        low_light_goggles: {
            gear_encumbrance: "1",
            gear_price: "200"
        },
        medkit: {
            gear_encumbrance: "2",
            gear_price: "100"
        },
        metatool: {
            gear_encumbrance: "1",
            gear_price: "200"
        },
        micropurgator_stims: {
            gear_encumbrance: "0"
        },
        mindwall_helmet: {
            gear_encumbrance: "0"
        },
        navcomp: {
            gear_encumbrance: "1",
            gear_price: "500"
        },
        polymorphic_nanites: {
            gear_encumbrance: "1"
        },
        portabox: {
            gear_encumbrance: "1",
            gear_price: "50"
        },
        pseudonuke: {
            gear_encumbrance: "1"
        },
        power_cell_type_a: {
            gear_encumbrance: "1#",
            gear_price: "10"
        },
        power_cell_type_b: {
            gear_encumbrance: "1",
            gear_price: "100"
        },
        pressure_tent: {
            gear_encumbrance: "4",
            gear_price: "100"
        },
        pretech_cosmetic: {
            gear_encumbrance: "0",
            gear_price: "1000"
        },
        psych: {
            gear_encumbrance: "0",
            gear_price: "25"
        },
        rations_1_day: {
            gear_encumbrance: "1#",
            gear_price: "5"
        },
        redivivus_sheath: {
            gear_encumbrance: "1"
        },
        remote_link_unit: {
            gear_encumbrance: "1",
            gear_price: "250"
        },
        reverie: {
            gear_encumbrance: "0",
            gear_price: "100"
        },
        rope_20_meters: {
            gear_encumbrance: "2/1",
            gear_price: "4/40"
        },
        scout_report: {
            gear_encumbrance: "0",
            gear_price: "200"
        },
        solar_recharger: {
            gear_encumbrance: "3",
            gear_price: "500"
        },
        spare_parts: {
            gear_encumbrance: "1#",
            gear_price: "50"
        },
        squeal: {
            gear_encumbrance: "0",
            gear_price: "300"
        },
        stiletto_charge: {
            gear_encumbrance: "1",
            gear_price: "Priceless"
        },
        storage_unit: {
            gear_encumbrance: "3",
            gear_price: "500"
        },
        survey_scanner: {
            gear_encumbrance: "1",
            gear_price: "250"
        },
        survival_kit: {
            gear_encumbrance: "1",
            gear_price: "60"
        },
        system_reset_inductor: {
            gear_encumbrance: "0"
        },
        tailored_antiallergens: {
            gear_encumbrance: "0",
            gear_price: "5"
        },
        telekinetic_generator: {
            gear_encumbrance: "2",
            gear_price: "250"
        },
        telescoping_pole: {
            gear_encumbrance: "0",
            gear_price: "10"
        },
        thermal_flare: {
            gear_encumbrance: "0",
            gear_price: "5"
        },
        tightbeam_link_unit: {
            gear_encumbrance: "1",
            gear_price: "1000"
        },
        toolkit_postech: {
            gear_encumbrance: "3",
            gear_price: "300"
        },
        toolkit_pretech: {
            gear_encumbrance: "1",
            gear_price: "1000"
        },
        trade_goods: {
            gear_encumbrance: "1#",
            gear_price: "50"
        },
        trade_metals: {
            gear_encumbrance: "1#",
            gear_price: "10"
        },
        translator_torc: {
            gear_encumbrance: "0",
            gear_price: "200"
        },
        tsunami: {
            gear_encumbrance: "0",
            gear_price: "50"
        },
        vacc_fresher: {
            gear_encumbrance: "1",
            gear_price: "400"
        },
        vacc_skin: {
            gear_encumbrance: "1",
            gear_price: "1000"
        },
        vacc_suit: {
            gear_encumbrance: "2",
            gear_price: "100"
        },
        wideawake_serum: {
            gear_encumbrance: "0"
        }
    },
    "ship-defenses": {
        ablative_hull_compartments: {
            "class": "CAPITAL",
            defense_effect: "+1 " + translate("AC") + ", +20 " + translate("MAXIMUM_HIT_POINTS").toString().toLowerCase() + ".",
            defense_mass: "2#",
            defense_power: "5",
            defense_price: "100000*"
        },
        augmented_plating: {
            "class": "FIGHTER",
            defense_effect: "+2 " + translate("AC") + ", -1 " + translate("SPEED") + ".",
            defense_mass: "1#",
            defense_power: "0",
            defense_price: "25000*"
        },
        boarding_countermeasures: {
            "class": "FRIGATE",
            defense_effect: translate("BOARDING_COUNTERMEASURES_DESC"),
            defense_mass: "1#",
            defense_power: "2",
            defense_price: "25000*"
        },
        burst_ecm_generator: {
            "class": "FRIGATE",
            defense_effect: translate("BURST_ECM_GENERATOR_DESC"),
            defense_mass: "1#",
            defense_power: "2",
            defense_price: "25000*"
        },
        foxer_drones: {
            "class": "CRUISER",
            defense_effect: translate("FOXER_DRONES_DESC"),
            defense_mass: "1#",
            defense_power: "2",
            defense_price: "10000*"
        },
        grav_eddy_displacer: {
            "class": "FRIGATE",
            defense_effect: translate("GRAV_EDDY_DISPLACER_DESC"),
            defense_mass: "2#",
            defense_power: "5",
            defense_price: "50000*"
        },
        hardened_polyceramic_overlay: {
            "class": "FIGHTER",
            defense_effect: translate("HARDENED_POLYCERAMIC_OVERLAY_DESC"),
            defense_mass: "1#",
            defense_power: "0",
            defense_price: "25000*"
        },
        planetary_defense_array: {
            "class": "FRIGATE",
            defense_effect: translate("PLANETARY_DEFENSE_ARRAY_DESC"),
            defense_mass: "2#",
            defense_power: "4",
            defense_price: "50000*"
        },
        point_defense_lasers: {
            "class": "FRIGATE",
            defense_effect: translate("POINT_DEFENSE_LASERS_DESC"),
            defense_mass: "2#",
            defense_power: "3",
            defense_price: "10000*"
        }
    },
    "ship-fittings": {
        advanced_lab: {
            "class": "FRIGATE",
            fitting_mass: "2",
            fitting_power: "1#",
            fitting_price: "10000*"
        },
        advanced_nav_computer: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "1#",
            fitting_price: "10000*"
        },
        amphibious_operation: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "1",
            fitting_price: "25000*"
        },
        armory: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "0",
            fitting_price: "10000*"
        },
        atmospheric_configuration: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "0",
            fitting_price: "5000*"
        },
        auto_targeting_system: {
            "class": "FIGHTER",
            fitting_mass: "0",
            fitting_power: "1",
            fitting_price: "50000"
        },
        automation_support: {
            "class": "FIGHTER",
            fitting_mass: "1",
            fitting_power: "2",
            fitting_price: "10000*"
        },
        boarding_tubes: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "0",
            fitting_price: "5000*"
        },
        cargo_lighter: {
            "class": "FRIGATE",
            fitting_mass: "2",
            fitting_power: "0",
            fitting_price: "25000"
        },
        cargo_space: {
            "class": "FIGHTER",
            fitting_mass: "1",
            fitting_power: "0",
            fitting_price: ""
        },
        cold_sleep_pods: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "1",
            fitting_price: "5000*"
        },
        colony_core: {
            "class": "FRIGATE",
            fitting_mass: "2#",
            fitting_power: "4",
            fitting_price: "100000*"
        },
        drill_course_regulator: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "1#",
            fitting_price: "25000*"
        },
        spike_drive_2: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "1#",
            fitting_price: "10000*"
        },
        spike_drive_3: {
            "class": "FIGHTER",
            fitting_mass: "2#",
            fitting_power: "2#",
            fitting_price: "20000*"
        },
        spike_drive_4: {
            "class": "FRIGATE",
            fitting_mass: "3#",
            fitting_power: "2#",
            fitting_price: "40000*"
        },
        spike_drive_5: {
            "class": "FRIGATE",
            fitting_mass: "3#",
            fitting_power: "3#",
            fitting_price: "100000*"
        },
        spike_drive_6: {
            "class": "CRUISER",
            fitting_mass: "4#",
            fitting_power: "3#",
            fitting_price: "500000*"
        },
        drop_pod: {
            "class": "FRIGATE",
            fitting_mass: "2",
            fitting_power: "0",
            fitting_price: "300000"
        },
        emissions_dampers: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "1#",
            fitting_price: "25000*"
        },
        exodus_bay: {
            "class": "CRUISER",
            fitting_mass: "2#",
            fitting_power: "1#",
            fitting_price: "50000*"
        },
        extended_life_support: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "1#",
            fitting_price: "5000*"
        },
        extended_medbay: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "1",
            fitting_price: "5000*"
        },
        extended_store: {
            "class": "FIGHTER",
            fitting_mass: "1#",
            fitting_power: "0",
            fitting_price: "2500*"
        },
        fuel_bunkers: {
            "class": "FIGHTER",
            fitting_mass: "1",
            fitting_power: "0",
            fitting_price: "2500*"
        },
        fuel_scoops: {
            "class": "FRIGATE",
            fitting_mass: "1#",
            fitting_power: "2",
            fitting_price: "5000*"
        },
        hydroponic_production: {
            "class": "CRUISER",
            fitting_mass: "2#",
            fitting_power: "1#",
            fitting_price: "10000*"
        },
        lifeboats: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "0",
            fitting_price: "2500*"
        },
        luxury_cabins: {
            "class": "FRIGATE",
            fitting_mass: "1#",
            fitting_power: "1",
            fitting_price: "10000*"
        },
        mobile_extractor: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "2",
            fitting_price: "50000"
        },
        mobile_factory: {
            "class": "CRUISER",
            fitting_mass: "2#",
            fitting_power: "3",
            fitting_price: "50000*"
        },
        precognitive_nav_chamber: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "1",
            fitting_price: "100000*"
        },
        psionic_anchorpoint: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "3",
            fitting_price: "Special"
        },
        sensor_mask: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "1#",
            fitting_price: "10000*"
        },
        ship_bay_fighter: {
            "class": "CRUISER",
            fitting_mass: "2",
            fitting_power: "0",
            fitting_price: "200000"
        },
        ship_bay_frigate: {
            "class": "CAPITAL",
            fitting_mass: "4",
            fitting_power: "1",
            fitting_price: "1000000"
        },
        ships_locker: {
            "class": "FRIGATE",
            fitting_mass: "0",
            fitting_power: "0",
            fitting_price: "2000*"
        },
        shiptender_mount: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "1",
            fitting_price: "25000*"
        },
        smugglers_hold: {
            "class": "FIGHTER",
            fitting_mass: "1",
            fitting_power: "0",
            fitting_price: "2500*"
        },
        survey_sensor_array: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "2",
            fitting_price: "5000*"
        },
        system_drive: {
            "class": "FIGHTER",
            fitting_mass: "-2#",
            fitting_power: "-1#",
            fitting_price: "Special"
        },
        teleportation_pads: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "1",
            fitting_price: "Special"
        },
        tractor_beams: {
            "class": "FRIGATE",
            fitting_mass: "1",
            fitting_power: "2",
            fitting_price: "10000*"
        },
        vehicle_transport_fittings: {
            "class": "FRIGATE",
            fitting_mass: "1#",
            fitting_power: "0",
            fitting_price: "2500*"
        },
        workshop: {
            "class": "FRIGATE",
            fitting_mass: "0.5#",
            fitting_power: "1",
            fitting_price: "500*"
        }
    },
    "ship-weapons": {
        charged_particle_caster: {
            "class": "FRIGATE",
            weapon_damage: "3d6",
            weapon_hardpoints: "2",
            weapon_mass: "1",
            weapon_power: "10",
            weapon_price: "800000",
            weapon_qualities: translate("AP") + " 15, " + translate("CLUMSY")
        },
        flak_emitter_battery: {
            "class": "FRIGATE",
            weapon_damage: "2d6",
            weapon_hardpoints: "1",
            weapon_mass: "3",
            weapon_power: "5",
            weapon_price: "500000",
            weapon_qualities: translate("AP") + " 10, " + translate("FLAK")
        },
        fractal_impact_charge: {
            weapon_ammo: "4",
            weapon_ammo_price: "500",
            "class": "FIGHTER",
            weapon_damage: "2d6",
            weapon_hardpoints: "1",
            weapon_mass: "1",
            weapon_power: "5",
            weapon_price: "200000",
            weapon_qualities: translate("AP") + " 15"
        },
        gravcannon: {
            "class": "CRUISER",
            weapon_damage: "4d6",
            weapon_hardpoints: "3",
            weapon_mass: "4",
            weapon_power: "15",
            weapon_price: "2000000",
            weapon_qualities: translate("AP") + " 20"
        },
        lightning_charge_mantle: {
            "class": "CAPITAL",
            weapon_damage: "1d20",
            weapon_hardpoints: "2",
            weapon_mass: "5",
            weapon_power: "15",
            weapon_price: "4000000",
            weapon_qualities: translate("AP") + " 5, " + translate("CLOUD")
        },
        mag_spike_array: {
            weapon_ammo: "5",
            weapon_ammo_price: "5000",
            "class": "FRIGATE",
            weapon_damage: "2d6+2",
            weapon_hardpoints: "2",
            weapon_mass: "2",
            weapon_power: "5",
            weapon_price: "1000000",
            weapon_qualities: translate("AP") + " 10, " + translate("FLAK")
        },
        mass_cannon: {
            weapon_ammo: "4",
            weapon_ammo_price: "50000",
            "class": "CAPITAL",
            weapon_damage: "2d20",
            weapon_hardpoints: "4",
            weapon_mass: "5",
            weapon_power: "10",
            weapon_price: "5000000",
            weapon_qualities: translate("AP") + " 20"
        },
        multifocal_laser: {
            "class": "FIGHTER",
            weapon_damage: "1d4",
            weapon_hardpoints: "1",
            weapon_mass: "1",
            weapon_power: "5",
            weapon_price: "100000",
            weapon_qualities: translate("AP") + " 20"
        },
        nuclear_missiles: {
            weapon_ammo: "5",
            weapon_ammo_price: "5000",
            "class": "FRIGATE",
            weapon_damage: "",
            weapon_hardpoints: "2",
            weapon_mass: "1",
            weapon_power: "5",
            weapon_price: "50000",
            weapon_qualities: ""
        },
        plasma_beam: {
            "class": "FRIGATE",
            weapon_damage: "3d6",
            weapon_hardpoints: "2",
            weapon_mass: "2",
            weapon_power: "5",
            weapon_price: "700000",
            weapon_qualities: translate("AP") + " 10"
        },
        polyspectral_mes_beam: {
            "class": "FIGHTER",
            weapon_damage: "2d4",
            weapon_hardpoints: "1",
            weapon_mass: "1",
            weapon_power: "5",
            weapon_price: "2000000",
            weapon_qualities: translate("AP") + " 25"
        },
        reaper_battery: {
            "class": "FIGHTER",
            weapon_damage: "3d4",
            weapon_hardpoints: "1",
            weapon_mass: "1",
            weapon_power: "4",
            weapon_price: "100000",
            weapon_qualities: translate("CLUMSY")
        },
        sandthrower: {
            "class": "FIGHTER",
            weapon_damage: "2d4",
            weapon_hardpoints: "1",
            weapon_mass: "1",
            weapon_power: "3",
            weapon_price: "50000",
            weapon_qualities: translate("FLAK")
        },
        singularity_gun: {
            "class": "CAPITAL",
            weapon_damage: "5d20",
            weapon_hardpoints: "5",
            weapon_mass: "10",
            weapon_power: "25",
            weapon_price: "20000000",
            weapon_qualities: translate("AP") + " 25"
        },
        smart_cloud: {
            "class": "CRUISER",
            weapon_damage: "3d10",
            weapon_hardpoints: "2",
            weapon_mass: "5",
            weapon_power: "10",
            weapon_price: "2000000",
            weapon_qualities: translate("CLOUD") + ", " + translate("CLUMSY")
        },
        spike_inversion_projector: {
            "class": "CRUISER",
            weapon_damage: "3d8",
            weapon_hardpoints: "3",
            weapon_mass: "3",
            weapon_power: "10",
            weapon_price: "2500000",
            weapon_qualities: translate("AP") + " 15"
        },
        spinal_beam_cannon: {
            "class": "CRUISER",
            weapon_damage: "3d10",
            weapon_hardpoints: "3",
            weapon_mass: "5",
            weapon_power: "10",
            weapon_price: "1500000",
            weapon_qualities: translate("AP") + " 15, " + translate("CLUMSY")
        },
        torpedo_launcher: {
            weapon_ammo: "4",
            weapon_ammo_price: "2500",
            "class": "FRIGATE",
            weapon_damage: "3d8",
            weapon_hardpoints: "1",
            weapon_mass: "3",
            weapon_power: "10",
            weapon_price: "500000",
            weapon_qualities: translate("AP") + " 20"
        },
        vortex_tunnel_inductor: {
            "class": "CAPITAL",
            weapon_damage: "3d20",
            weapon_hardpoints: "4",
            weapon_mass: "10",
            weapon_power: "20",
            weapon_price: "5000000",
            weapon_qualities: translate("AP") + " 20, " + translate("CLUMSY")
        }
    },
    "techniques": {
        accelerated_succor: {
            level: "3",
            technique_discipline: translate("BIOPSIONICS")
        },
        alternate_outcome: {
            level: "2",
            technique_discipline: translate("PRECOGNITION")
        },
        anguished_vision: {
            level: "3",
            technique_discipline: translate("PRECOGNITION")
        },
        burdened_apportation: {
            level: "2",
            technique_discipline: translate("TELEPORTATION")
        },
        cloak_powers: {
            level: "1",
            technique_discipline: translate("METAPSIONICS")
        },
        concert_of_minds: {
            level: "3",
            technique_discipline: translate("METAPSIONICS")
        },
        cursed_luck: {
            level: "3",
            technique_discipline: translate("PRECOGNITION")
        },
        deep_intrusion: {
            level: "4",
            technique_discipline: translate("TELEPORTATION")
        },
        destinys_shield: {
            level: "2",
            technique_discipline: translate("PRECOGNITION")
        },
        effortless_apportation: {
            level: "3",
            technique_discipline: translate("TELEPORTATION")
        },
        facile_mind: {
            level: "1",
            technique_discipline: translate("TELEPATHY")
        },
        far_thought: {
            level: "2",
            technique_discipline: translate("TELEPATHY")
        },
        flawless_mastery: {
            level: "4",
            technique_discipline: translate("METAPSIONICS")
        },
        force_puppetry: {
            level: "4",
            technique_discipline: translate("TELEKINESIS")
        },
        forced_outcome: {
            level: "3",
            technique_discipline: translate("PRECOGNITION")
        },
        holistic_optimization_patterning: {
            level: "4",
            technique_discipline: translate("BIOPSIONICS")
        },
        impact_sump: {
            level: "2",
            technique_discipline: translate("TELEKINESIS")
        },
        impervious_pavis_of_will: {
            level: "4",
            technique_discipline: translate("METAPSIONICS")
        },
        intuitive_response: {
            level: "1",
            technique_discipline: translate("PRECOGNITION")
        },
        invincible_stand: {
            level: "2",
            technique_discipline: translate("BIOPSIONICS")
        },
        kinetic_transversal: {
            level: "1",
            technique_discipline: translate("TELEKINESIS")
        },
        major_organ_restoration: {
            level: "2",
            technique_discipline: translate("BIOPSIONICS")
        },
        mastered_succor: {
            level: "1",
            technique_discipline: translate("BIOPSIONICS")
        },
        memory_editing: {
            level: "4",
            technique_discipline: translate("TELEPATHY")
        },
        metadimensional_friction: {
            level: "3",
            technique_discipline: translate("METAPSIONICS")
        },
        metamorph: {
            level: "3",
            technique_discipline: translate("BIOPSIONICS")
        },
        mindtracing: {
            level: "1",
            technique_discipline: translate("METAPSIONICS")
        },
        neural_trap: {
            level: "2",
            technique_discipline: translate("METAPSIONICS")
        },
        not_my_time: {
            level: "4",
            technique_discipline: translate("PRECOGNITION")
        },
        offensive_apportation: {
            level: "4",
            technique_discipline: translate("TELEPORTATION")
        },
        oracle: {
            level: "0",
            technique_discipline: translate("PRECOGNITION")
        },
        organic_purification_protocols: {
            level: "1",
            technique_discipline: translate("BIOPSIONICS")
        },
        perceptive_dislocation: {
            level: "2",
            technique_discipline: translate("TELEPORTATION")
        },
        personal_apportation: {
            level: "0",
            technique_discipline: translate("TELEPORTATION")
        },
        pressure_field: {
            level: "1",
            technique_discipline: translate("TELEKINESIS")
        },
        proficient_apportation: {
            level: "1",
            technique_discipline: translate("TELEPORTATION")
        },
        prophecy: {
            level: "4",
            technique_discipline: translate("PRECOGNITION")
        },
        psychic_refinement: {
            level: "0",
            technique_discipline: translate("METAPSIONICS")
        },
        psychic_static: {
            level: "2",
            technique_discipline: translate("METAPSIONICS")
        },
        psychic_succor: {
            level: "0",
            technique_discipline: translate("BIOPSIONICS")
        },
        psychic_tutelage: {
            level: "3",
            technique_discipline: translate("METAPSIONICS")
        },
        quintessential_reconstruction: {
            level: "4",
            technique_discipline: translate("BIOPSIONICS")
        },
        reactive_telekinesis: {
            level: "3",
            technique_discipline: translate("TELEKINESIS")
        },
        reflex_response: {
            level: "3",
            technique_discipline: translate("TELEPATHY")
        },
        remote_repair: {
            level: "1",
            technique_discipline: translate("BIOPSIONICS")
        },
        rift_reduplication: {
            level: "3",
            technique_discipline: translate("TELEPORTATION")
        },
        sense_the_need: {
            level: "1",
            technique_discipline: translate("PRECOGNITION")
        },
        slip_field: {
            level: "2",
            technique_discipline: translate("TELEKINESIS")
        },
        spatial_awareness: {
            level: "1",
            technique_discipline: translate("TELEPORTATION")
        },
        spatial_synchrony_mandala: {
            level: "2",
            technique_discipline: translate("TELEPORTATION")
        },
        stutterjump: {
            level: "3",
            technique_discipline: translate("TELEPORTATION")
        },
        suppress_cognition: {
            level: "2",
            technique_discipline: translate("TELEPATHY")
        },
        surge_momentum: {
            level: "3",
            technique_discipline: translate("METAPSIONICS")
        },
        suspended_manifestation: {
            level: "2",
            technique_discipline: translate("METAPSIONICS")
        },
        synthetic_adaptation: {
            level: "1",
            technique_discipline: translate("METAPSIONICS")
        },
        tangible_force_construct: {
            level: "3",
            technique_discipline: translate("TELEKINESIS")
        },
        telekinetic_armory: {
            level: "1",
            technique_discipline: translate("TELEKINESIS")
        },
        telekinetic_expertise: {
            level: "2",
            technique_discipline: translate("TELEKINESIS")
        },
        telekinetic_flight: {
            level: "4",
            technique_discipline: translate("TELEKINESIS")
        },
        telekinetic_manipulation: {
            level: "0",
            technique_discipline: translate("TELEKINESIS")
        },
        telekinetic_ram: {
            level: "3",
            technique_discipline: translate("TELEKINESIS")
        },
        telepathic_assault: {
            level: "3",
            technique_discipline: translate("TELEPATHY")
        },
        telepathic_contact: {
            level: "0",
            technique_discipline: translate("TELEPATHY")
        },
        teratic_overload: {
            level: "3",
            technique_discipline: translate("BIOPSIONICS")
        },
        terminal_reflection: {
            level: "1",
            technique_discipline: translate("PRECOGNITION")
        },
        thermokinesis: {
            level: "2",
            technique_discipline: translate("TELEKINESIS")
        },
        tissue_integrity_field: {
            level: "2",
            technique_discipline: translate("BIOPSIONICS")
        },
        transmit_thought: {
            level: "1",
            technique_discipline: translate("TELEPATHY")
        },
        unity_of_thought: {
            level: "4",
            technique_discipline: translate("TELEPATHY")
        }
    },
    "weapons": {
        advanced_bow: {
            weapon_ammo: "1",
            weapon_damage: "1d6",
            weapon_encumbrance: "2",
            weapon_range: "100/150",
            weapon_price: "50"
        },
        anti_vehicle_laser: {
            weapon_ammo: "15",
            weapon_damage: "3d10",
            weapon_range: "2000/4000",
            weapon_price: "10000"
        },
        combat_rifle: {
            weapon_ammo: "30",
            weapon_burst: "true",
            weapon_damage: "1d12",
            weapon_encumbrance: "2",
            weapon_range: "100/300",
            weapon_price: "300"
        },
        combat_shotgun: {
            weapon_ammo: "12",
            weapon_burst: "true",
            weapon_damage: "3d4",
            weapon_encumbrance: "2",
            weapon_range: "10/30",
            weapon_price: "300"
        },
        conversion_bow: {
            weapon_ammo: "1",
            weapon_damage: "1d8",
            weapon_encumbrance: "2",
            weapon_range: "150/300",
            weapon_price: "500"
        },
        crude_pistol: {
            weapon_ammo: "1",
            weapon_damage: "1d6",
            weapon_encumbrance: "1",
            weapon_range: "5/15",
            weapon_price: "20"
        },
        demo_charge: {
            weapon_damage: "3d10",
            weapon_encumbrance: "1",
            weapon_range: "20/40",
            weapon_price: "250"
        },
        distortion_cannon: {
            weapon_attack: "1",
            weapon_ammo: "6",
            weapon_damage: "2d12",
            weapon_encumbrance: "2",
            weapon_range: "100/300",
            weapon_price: "1250"
        },
        grenade: {
            weapon_damage: "2d6",
            weapon_encumbrance: "1",
            weapon_range: "10/30",
            weapon_price: "25"
        },
        heavy_machine_gun: {
            weapon_ammo: "10",
            weapon_damage: "3d6",
            weapon_encumbrance: "3",
            weapon_range: "500/2000",
            weapon_price: "5000"
        },
        hydra_array: {
            weapon_ammo: "10",
            weapon_damage: "3d6",
            weapon_range: "4000/8000",
            weapon_price: "20000"
        },
        large_advanced_weapon: {
            weapon_attribute_mod: "@{strength_mod}",
            weapon_damage: "1d10+1",
            weapon_encumbrance: "2",
            weapon_shock_ac: "15",
            weapon_shock_damage: "2",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "80"
        },
        large_primitive_weapon: {
            weapon_attribute_mod: "@{strength_mod}",
            weapon_damage: "1d8+1",
            weapon_encumbrance: "2",
            weapon_shock_ac: "15",
            weapon_shock_damage: "2",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "30"
        },
        laser_pistol: {
            weapon_attack: "1",
            weapon_ammo: "10",
            weapon_damage: "1d6",
            weapon_encumbrance: "1",
            weapon_range: "100/300",
            weapon_price: "200"
        },
        laser_rifle: {
            weapon_attack: "1",
            weapon_ammo: "20",
            weapon_burst: "true",
            weapon_damage: "1d10",
            weapon_encumbrance: "2",
            weapon_range: "300/500",
            weapon_price: "300"
        },
        mag_pistol: {
            weapon_ammo: "6",
            weapon_damage: "2d6+2",
            weapon_encumbrance: "1",
            weapon_range: "100/300",
            weapon_price: "400"
        },
        mag_rifle: {
            weapon_ammo: "10",
            weapon_damage: "2d8+2",
            weapon_encumbrance: "2",
            weapon_range: "300/600",
            weapon_price: "500"
        },
        medium_advanced_weapon: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d8+1",
            weapon_encumbrance: "1",
            weapon_shock_ac: "13",
            weapon_shock_damage: "2",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "60"
        },
        medium_primitive_weapon: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d6+1",
            weapon_encumbrance: "1",
            weapon_shock_ac: "13",
            weapon_shock_damage: "2",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "20"
        },
        musket: {
            weapon_ammo: "1",
            weapon_damage: "1d12",
            weapon_encumbrance: "2",
            weapon_range: "25/50",
            weapon_price: "30"
        },
        plasma_projector: {
            weapon_attack: "1",
            weapon_ammo: "6",
            weapon_damage: "2d8",
            weapon_encumbrance: "2",
            weapon_range: "50/100",
            weapon_price: "400"
        },
        primitive_bow: {
            weapon_ammo: "1",
            weapon_damage: "1d6",
            weapon_encumbrance: "2",
            weapon_range: "50/75",
            weapon_price: "15"
        },
        punch: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d2",
            weapon_skill_bonus: "@{skill_punch}"
        },
        railgun: {
            weapon_ammo: "20",
            weapon_damage: "3d8",
            weapon_range: "4000/8000",
            weapon_price: "8000"
        },
        revolver: {
            weapon_ammo: "6",
            weapon_damage: "1d8",
            weapon_encumbrance: "1",
            weapon_range: "30/100",
            weapon_price: "50"
        },
        rifle: {
            weapon_ammo: "6",
            weapon_damage: "1d10+2",
            weapon_encumbrance: "2",
            weapon_range: "200/400",
            weapon_price: "75"
        },
        rocket_launcher: {
            weapon_ammo: "1",
            weapon_damage: "3d10",
            weapon_encumbrance: "2",
            weapon_range: "2000/4000",
            weapon_price: "4000"
        },
        semi_auto_pistol: {
            weapon_ammo: "12",
            weapon_damage: "1d6+1",
            weapon_encumbrance: "1",
            weapon_range: "30/100",
            weapon_price: "75"
        },
        shear_rifle: {
            weapon_attack: "1",
            weapon_ammo: "10",
            weapon_burst: "true",
            weapon_damage: "2d8",
            weapon_encumbrance: "2",
            weapon_range: "100/300",
            weapon_price: "600"
        },
        shotgun: {
            weapon_ammo: "2",
            weapon_damage: "3d4",
            weapon_encumbrance: "2",
            weapon_range: "10/30",
            weapon_price: "50"
        },
        small_advanced_weapon: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d6",
            weapon_encumbrance: "1",
            weapon_shock_ac: "15",
            weapon_shock_damage: "1",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "40"
        },
        small_primitive_weapon: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d4",
            weapon_encumbrance: "1",
            weapon_shock_ac: "15",
            weapon_shock_damage: "1",
            weapon_skill_bonus: "@{skill_stab}"
        },
        sniper_rifle: {
            weapon_ammo: "1",
            weapon_damage: "2d8",
            weapon_encumbrance: "2",
            weapon_range: "1000/2000",
            weapon_price: "400"
        },
        spike_thrower: {
            weapon_ammo: "15",
            weapon_burst: "true",
            weapon_damage: "3d8",
            weapon_encumbrance: "2",
            weapon_range: "20/40",
            weapon_price: "600"
        },
        stun_baton: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d8",
            weapon_encumbrance: "1",
            weapon_shock_ac: "15",
            weapon_shock_damage: "1",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "75"
        },
        submachine_gun: {
            weapon_ammo: "20",
            weapon_burst: "true",
            weapon_damage: "1d8",
            weapon_encumbrance: "1",
            weapon_range: "30/100",
            weapon_price: "200"
        },
        suit_ripper: {
            weapon_attribute_mod: "@{str_dex_mod}",
            weapon_damage: "1d6",
            weapon_encumbrance: "1",
            weapon_skill_bonus: "@{skill_stab}",
            weapon_price: "75"
        },
        thermal_pistol: {
            weapon_attack: "1",
            weapon_ammo: "5",
            weapon_damage: "2d6",
            weapon_encumbrance: "1",
            weapon_range: "25/50",
            weapon_price: "300"
        },
        thunder_gun: {
            weapon_attack: "1",
            weapon_ammo: "6",
            weapon_damage: "2d10",
            weapon_encumbrance: "2",
            weapon_range: "100/300",
            weapon_price: "1000"
        },
        void_carbine: {
            weapon_ammo: "10",
            weapon_damage: "2d6",
            weapon_encumbrance: "2",
            weapon_range: "100/300",
            weapon_price: "400"
        },
        vortex_cannon: {
            weapon_ammo: "5",
            weapon_damage: "5d12",
            weapon_range: "1000/2000",
            weapon_price: "75000"
        },
        wheatcutter_belt: {
            weapon_ammo: "5",
            weapon_damage: "2d12",
            weapon_range: "10/20",
            weapon_price: "1000"
        }
    }
};
var sign = function (value) {
    var val = typeof value === "string" ? parseInt(value) || 0 : value;
    if (val >= 0)
        return "+" + val;
    else
        return "" + val;
};
var sum = function (list) { return list.reduce(function (m, c) { return m + (parseInt(c) || 0); }, 0); };
var buildLink = function (caption, ability, last) { return "[" + caption + (!last ? "," : "") + "](~" + ability + ")"; };
var mySetAttrs = function (setting, values, options, callback) {
    Object.keys(setting).forEach(function (k) {
        if ("" + values[k] === "" + setting[k])
            delete setting[k];
    });
    setAttrs(setting, options, callback);
};
var fillClassStats = function () {
    getAttrs(["class", "class_ability", "attack_bonus"], function (v) {
        var label = v["class"] && reverseClasses[v["class"] ? v["class"].toLowerCase() : ""];
        if (label && autofillData.classes.hasOwnProperty(label)) {
            var data_1 = Object.assign({}, autofillData.classes[label]);
            Object.keys(data_1).forEach(function (key) {
                if (!(["", "0"].includes("" + v[key])))
                    delete data_1[key];
            });
            mySetAttrs(data_1, v);
        }
    });
};
var getShipMultiplier = function (shipClass) {
    if ((shipClass || "").toLowerCase() === "frigate")
        return 2;
    else if ((shipClass || "").toLowerCase() === "cruiser")
        return 3;
    else if ((shipClass || "").toLowerCase() === "capital")
        return 4;
    else
        return 1;
};
var getShipPriceMultiplier = function (shipClass) {
    if ((shipClass || "").toLowerCase() === "frigate")
        return 10;
    else if ((shipClass || "").toLowerCase() === "cruiser")
        return 25;
    else if ((shipClass || "").toLowerCase() === "capital")
        return 100;
    else
        return 1;
};
var getAutofillData = function (_a) {
    var sName = _a.sName, v = _a.v, data = _a.data, label = _a.label;
    var output = Object.assign({}, data);
    if (sName === "ship-defenses") {
        if (label)
            output.defense_name = translate(label.toUpperCase()) ? translate(label.toUpperCase()) : "false";
        if (output.defense_mass.includes("#")) {
            output.defense_mass = "" + parseInt(output.defense_mass) * v.ship_multiplier;
        }
        if (output.defense_price.includes("*")) {
            output.defense_price = "" + parseInt(output.defense_price) * v.ship_price_multiplier;
        }
    }
    if (sName === "ship-fittings") {
        if (label) {
            output.fitting_name = translate(label.toUpperCase());
            output.fitting_effect = translate(label.toUpperCase() + "_DESC");
        }
        if (output.fitting_mass.includes("#")) {
            output.fitting_mass = "" + Math.round(parseFloat(output.fitting_mass) * v.ship_multiplier);
        }
        if (output.fitting_power.includes("#")) {
            output.fitting_power = "" + parseInt(output.fitting_power) * v.ship_multiplier;
        }
        if (output.fitting_price.includes("*")) {
            output.fitting_price = "" + parseInt(output.fitting_price) * v.ship_price_multiplier;
        }
    }
    if (sName === "ship-weapons") {
        if (label)
            output.weapon_name = translate(label.toUpperCase());
        if (output.weapon_ammo) {
            output.weapon_ammo_max = output.weapon_ammo;
            output.weapon_use_ammo = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
        }
    }
    if (sName === "weapons") {
        if (label) {
            output.weapon_name = translate(label.toUpperCase());
            output.weapon_description = translate(label.toUpperCase() + "_DESC");
        }
        if (output.weapon_ammo) {
            output.weapon_ammo_max = output.weapon_ammo;
            output.weapon_use_ammo = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
        }
        if (output.weapon_shock_damage) {
            output.weapon_shock = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
        }
        if (output.weapon_burst) {
            output.weapon_burst = "@{burst_query}";
        }
        if (!output.weapon_attribute_mod) {
            output.weapon_attribute_mod = "@{dexterity_mod}";
        }
    }
    if (sName === "armor") {
        if (label) {
            output.armor_name = translate(label.toUpperCase());
            output.armor_description = translate(label.toUpperCase() + "_DESC") || "";
        }
    }
    if (sName === "cyberware") {
        if (label) {
            output.cyberware_name = translate(label.toUpperCase());
            output.cyberware_description = translate(label.toUpperCase() + "_DESC");
        }
    }
    if (sName === "foci") {
        if (label) {
            output.focus_name = translate(label.toUpperCase());
            output.focus_level = "1";
            output.focus_description = translate(label.toUpperCase() + "_DESC");
        }
    }
    if (sName === "techniques") {
        if (label) {
            output.technique_name = translate(label.toUpperCase());
            output.technique_description = translate(label.toUpperCase() + "_DESC");
        }
    }
    if (sName === "gear") {
        if (label) {
            output.gear_name = translate(label.toUpperCase());
            output.gear_description = translate(label.toUpperCase() + "_DESC");
        }
        if (output.gear_encumbrance === "1#") {
            output.gear_encumbrance = "1";
            output.gear_bundled = "on";
        }
    }
    return output;
};
var getAutofillInfo = function (_a) {
    var sName = _a.sName, v = _a.v, data = _a.data, label = _a.label;
    var dataOut = getAutofillData({ sName: sName, v: v, data: data, label: label });
    var formatter = new Intl.NumberFormat();
    if (sName === "ship-defenses") {
        return translate(dataOut["class"]) + "+. " + translate("POWER_INIT") + ": " + dataOut.defense_power + ", " + translate("MASS_INIT") + ": " + dataOut.defense_mass + ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.defense_price) !== "NaN" ? formatter.format(data.defense_price) : data.defense_price) + ". " + dataOut.defense_effect;
    }
    if (sName === "ship-fittings") {
        return translate(dataOut["class"]) + "+. " + translate("POWER_INIT") + ": " + dataOut.fitting_power + ", " + translate("MASS_INIT") + ": " + dataOut.fitting_mass + ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.fitting_price) !== "NaN" ? formatter.format(data.fitting_price) : data.fitting_price) + ". " + dataOut.fitting_effect;
    }
    if (sName === "ship-weapons") {
        return translate(dataOut["class"]) + "+. " + translate("POWER_INIT") + ": " + dataOut.weapon_power + ", " + translate("MASS_INIT") + ": " + dataOut.weapon_mass + ", " + translate("HARDPOINTS_INIT") + ": " + dataOut.weapon_hardpoints + ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price) + ". " + translate("DAMAGE_SHORT") + " " + dataOut.weapon_damage + ". " + dataOut.weapon_qualities + (dataOut.weapon_ammo ? ", " + translate("AMMO") + ": " + dataOut.weapon_ammo : "") + ".";
    }
    if (sName === "weapons") {
        var getNamedAttrMod = function (expr) {
            if (expr === "@{dexterity_mod}")
                return translate("DEXTERITY_SHORT");
            else if (expr === "@{strength_mod}")
                return translate("STRENGTH_SHORT");
            else if (expr === "@{str_dex_mod}")
                return translate("STR_DEX");
        };
        return translate("DAMAGE_SHORT") + " " + dataOut.weapon_damage + (dataOut.weapon_burst ? " (" + translate("BURST") + ")" : "") + (dataOut.weapon_ab ? ", " + translate("ATTACK_BONUS_SHORT") + " +" + dataOut.weapon_ab : "") + (dataOut.weapon_range ? ", " + translate("RANGE") + " " + dataOut.weapon_range : "") + (dataOut.weapon_ammo ? ", " + translate("AMMO") + " " + dataOut.weapon_ammo : "") + (dataOut.weapon_shock ? ", " + dataOut.weapon_shock_damage + " " + translate("SHOCK_DAMAGE_AGAINST_AC_LEQ") + " " + dataOut.weapon_shock_ac : "") + ", +" + getNamedAttrMod(dataOut.weapon_attribute_mod) + (dataOut.weapon_encumbrance ? ", " + translate("ENCUMBRANCE_SHORT") + " " + dataOut.weapon_encumbrance : "") + (dataOut.weapon_price ? ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.weapon_price) !== "NaN" ? formatter.format(data.weapon_price) : data.weapon_price) : "") + ".";
    }
    if (sName === "armor") {
        return translate("AC") + " " + dataOut.armor_ac + ", " + translate(dataOut.armor_type) + ", " + translate("ENCUMBRANCE_SHORT") + " " + dataOut.armor_encumbrance + ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.armor_price) !== "NaN" ? formatter.format(data.armor_price) : data.armor_price) + ".";
    }
    if (sName === "cyberware") {
        return translate("STRAIN") + ": " + dataOut.cyberware_strain + ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.cyberware_price) !== "NaN" ? formatter.format(data.cyberware_price) : data.cyberware_price) + ".";
    }
    if (sName === "techniques") {
        if (dataOut.level === "0")
            return translate("CORE_TECHNIQUE") + ".";
        else
            return translate("LEVEL") + "-" + dataOut.level + ".";
    }
    if (sName === "gear") {
        return translate("ENCUMBRANCE_SHORT") + " " + dataOut.gear_encumbrance + (dataOut.gear_bundled === "on" ? "#" : "") + (dataOut.gear_price ? ", " + translate("CREDITS") + ": " + (formatter.format(dataOut.gear_price) !== "NaN" ? formatter.format(data.gear_price) : data.gear_price) : "") + ".";
    }
    return "";
};
var generateAutofillRow = function (sName) {
    getAttrs(["generate_" + sName + "_source", "ship_class"], function (v) {
        var label = v["generate_" + sName + "_source"];
        v.ship_multiplier = getShipMultiplier(v.ship_class).toString();
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class).toString();
        if (label && autofillData[sName].hasOwnProperty(label)) {
            var data = getAutofillData({ sName: sName, v: v, data: autofillData[sName][label], label: label });
            delete data["class"];
            delete data.level;
            fillRepeatingSectionFromData(sName, data);
        }
    });
};
var generateAutofillInfo = function (sName) {
    getAttrs(["generate_" + sName + "_source", "ship_class"], function (v) {
        var _a, _b;
        var label = v["generate_" + sName + "_source"];
        v.ship_multiplier = getShipMultiplier(v.ship_class).toString();
        v.ship_price_multiplier = getShipPriceMultiplier(v.ship_class).toString();
        if (label && autofillData[sName].hasOwnProperty(label)) {
            var info = getAutofillInfo({ sName: sName, v: v, data: autofillData[sName][label], label: label });
            if (info)
                setAttrs((_a = {},
                    _a["generate_" + sName + "_info"] = info,
                    _a));
        }
        else
            setAttrs((_b = {},
                _b["generate_" + sName + "_info"] = " ",
                _b));
    });
};
var fillRepeatingSectionFromData = function (sName, data, callback) {
    callback = callback || (function () { });
    var createdIDs = [], getRowID = function () {
        while (true) {
            var newID = generateRowID();
            if (!createdIDs.includes(newID)) {
                createdIDs.push(newID);
                return newID;
            }
        }
    };
    var setting = (Array.isArray(data) ? data : [data]).map(function (o) {
        var newID = getRowID();
        return Object.entries(o).reduce(function (m, _a) {
            var key = _a[0], value = _a[1];
            m["repeating_" + sName + "_" + newID + "_" + key] = "" + value;
            return m;
        }, {});
    }).reduce(function (m, o) { return Object.assign(m, o); }, {});
    setAttrs(setting, {}, callback);
};
var calculateSaves = function () {
    getAttrs(__spreadArrays(attributes.map(function (attr) { return attr + "_mod"; }), ["level",
        "homebrew_luck_save", "save_physical", "save_mental", "save_evasion", "save_luck"]), function (v) {
        var base = 16 - (parseInt(v.level) || 1);
        var setting = {
            save_physical: base - (Math.max(parseInt(v.strength_mod), parseInt(v.constitution_mod)) || 0),
            save_mental: base - (Math.max(parseInt(v.charisma_mod), parseInt(v.wisdom_mod)) || 0),
            save_evasion: base - (Math.max(parseInt(v.intelligence_mod), parseInt(v.dexterity_mod)) || 0)
        };
        if (v.homebrew_luck_save === "1")
            setting.save_luck = base;
        mySetAttrs(setting, v);
    });
};
var calculateEffort = function () {
    getSectionIDs("repeating_psychic-skills", function (idArray) {
        getAttrs(__spreadArrays(effortAttributes, ["psionics_total_effort"], idArray.map(function (id) { return "repeating_psychic-skills_" + id + "_skill"; })), function (v) {
            var attrBonus = Math.max(parseInt(v.wisdom_mod), parseInt(v.constitution_mod)) || 0, skillBonus = Math.max.apply(Math, __spreadArrays(skills.psionic.map(function (x) { return parseInt(v["skill_" + x]) || 0; }), idArray.map(function (id) { return parseInt(v["repeating_psychic-skills_" + id + "_skill"]) || 0; })));
            var psionics_total_effort = (Math.max(1 + attrBonus + skillBonus, 1) + parseInt(v.psionics_extra_effort) -
                parseInt(v.psionics_committed_effort_current) - parseInt(v.psionics_committed_effort_scene) -
                parseInt(v.psionics_committed_effort_day)) || 0;
            mySetAttrs({
                psionics_total_effort: psionics_total_effort
            }, v);
        });
    });
};
var calculateMagicEffort = function () {
    getAttrs(["magic_total_effort", "magic_committed_effort_current", "magic_committed_effort_scene", "magic_committed_effort_day", "magic_uncommitted_effort"], function (v) {
        var magic_uncommitted_effort = (parseInt(v.magic_total_effort) - (parseInt(v.magic_committed_effort_current) +
            parseInt(v.magic_committed_effort_scene) + parseInt(v.magic_committed_effort_day))) || 0;
        mySetAttrs({
            magic_uncommitted_effort: magic_uncommitted_effort
        }, v);
    });
};
var calculateProcessing = function () {
    getSectionIDs("repeating_processing-nodes", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_processing-nodes_" + id + "_node_value"; }), idArray.map(function (id) { return "repeating_processing-nodes_" + id + "_node_connected"; }), [
            "wisdom_mod", "intelligence_mod", "ai_extra_processing", "ai_committed_processing_current", "ai_committed_processing_scene", "ai_committed_processing_day", "ai_total_processing"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var maxProcessing = (1 + Math.max(parseInt(v.wisdom_mod), parseInt(v.intelligence_mod)) || 0)
                + Math.max.apply(Math, __spreadArrays(idArray.filter(function (id) { return v["repeating_processing-nodes_" + id + "_node_connected"] === "1"; })
                    .map(function (id) { return parseInt(v["repeating_processing-nodes_" + id + "_node_value"]) || 0; }), [0]));
            var ai_total_processing = (maxProcessing + parseInt(v.ai_extra_processing) - parseInt(v.ai_committed_processing_current) -
                parseInt(v.ai_committed_processing_scene) - parseInt(v.ai_committed_processing_day)) || 0;
            mySetAttrs({
                ai_total_processing: ai_total_processing
            }, v);
        });
    });
};
var calculateAC = function () {
    getSectionIDs("repeating_armor", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_armor_" + id + "_armor_ac"; }), idArray.map(function (id) { return "repeating_armor_" + id + "_armor_active"; }), idArray.map(function (id) { return "repeating_armor_" + id + "_armor_type"; }), [
            "npc", "AC", "innate_ac", "dexterity_mod",
        ]);
        getAttrs(sourceAttrs, function (v) {
            if (v.npc === "1")
                return;
            var baseAC = Math.max.apply(Math, __spreadArrays([parseInt(v.innate_ac) || 0], idArray.filter(function (id) { return v["repeating_armor_" + id + "_armor_active"] === "1"; })
                .filter(function (id) { return v["repeating_armor_" + id + "_armor_type"] !== "SHIELD"; })
                .map(function (id) { return parseInt(v["repeating_armor_" + id + "_armor_ac"]) || 0; })));
            var shieldAC = Math.max.apply(Math, __spreadArrays([0], idArray.filter(function (id) { return v["repeating_armor_" + id + "_armor_active"] === "1"; })
                .filter(function (id) { return v["repeating_armor_" + id + "_armor_type"] === "SHIELD"; })
                .map(function (id) { return parseInt(v["repeating_armor_" + id + "_armor_ac"]) || 0; })));
            var AC = (shieldAC > 0 ? shieldAC <= baseAC ? (baseAC + 1) : shieldAC : baseAC) +
                (parseInt(v.dexterity_mod) || 0);
            mySetAttrs({
                AC: AC
            }, v);
        });
    });
};
var calculateMaxStrain = function () {
    getAttrs(["constitution", "strain_max"], function (v) {
        mySetAttrs({
            strain_max: parseInt(v.constitution) || 0
        }, v);
    });
};
var calculatePermanentStrain = function () {
    getAttrs(["cyberware_strain_total", "strain_permanent_extra", "strain_permanent"], function (v) {
        var permStrain = parseInt(v.cyberware_strain_total) + parseInt(v.strain_permanent_extra) || 0;
        mySetAttrs({
            strain_permanent: permStrain
        }, v);
    });
};
var calculateCyberwareStrain = function () {
    getSectionIDs("repeating_cyberware", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_cyberware_" + id + "_cyberware_strain"; }), [
            "cyberware_strain_total"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var cyberwareStrain = idArray.reduce(function (m, id) {
                m += parseInt(v["repeating_cyberware_" + id + "_cyberware_strain"]) || 0;
                return m;
            }, 0);
            mySetAttrs({
                cyberware_strain_total: cyberwareStrain
            }, v);
        });
    });
};
var calculateStrain = function () {
    getAttrs(["strain_permanent", "strain_extra", "strain", "strain_max", "strain_above_max"], function (v) {
        var strain = (parseInt(v.strain_permanent) || 0) + (parseInt(v.strain_extra) || 0);
        var strain_above_max = strain > parseInt(v.strain_max) ? 1 : 0;
        mySetAttrs({
            strain: strain,
            strain_above_max: strain_above_max
        }, v);
    });
};
var calculateAttr = function (attr) {
    getAttrs([attr, attr + "_base", attr + "_boosts"], function (v) {
        var _a;
        var setting = (_a = {},
            _a["" + attr] = "" + ((parseInt(v[attr + "_base"]) || 10) + (parseInt(v[attr + "_boosts"]) || 0)),
            _a);
        mySetAttrs(setting, v, null, function () {
            calculateMod(attr);
        });
    });
};
var calculateMod = function (attr) {
    getAttrs([attr, attr + "_bonus", attr + "_mod"], function (v) {
        var _a;
        var mod = (function (value) {
            if (value >= 18)
                return 2;
            else if (value >= 14)
                return 1;
            else if (value >= 8)
                return 0;
            else if (value >= 4)
                return -1;
            else
                return -2;
        })(parseInt(v[attr]) || 10);
        var setting = (_a = {},
            _a[attr + "_mod"] = "" + (mod + (parseInt(v[attr + "_bonus"]) || 0)),
            _a);
        mySetAttrs(setting, v, null, function () {
            calculateSaves();
            generateWeaponDisplay();
            calculateStrDexMod();
            if (attr === "dexterity")
                calculateAC();
        });
    });
};
var calculateStrDexMod = function () {
    getAttrs(["str_dex_mod", "strength_mod", "dexterity_mod"], function (v) {
        var str_dex_mod = Math.max(parseInt(v.strength_mod) || 0, parseInt(v.dexterity_mod) || 0);
        mySetAttrs({
            str_dex_mod: str_dex_mod
        }, v);
    });
};
var calculateShellAttrs = function () {
    var physicalAttrs = ["strength", "dexterity", "constitution"];
    getSectionIDs("repeating_shells", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_shells_" + id + "_shell_active"; }), idArray.map(function (id) { return "repeating_shells_" + id + "_shell_strength"; }), idArray.map(function (id) { return "repeating_shells_" + id + "_shell_dexterity"; }), idArray.map(function (id) { return "repeating_shells_" + id + "_shell_constitution"; }), physicalAttrs, [
            "setting_transhuman_enable", "setting_ai_enable",
        ]);
        getAttrs(sourceAttrs, function (v) {
            if (v.setting_transhuman_enable === "transhuman" || v.setting_ai_enable === "ai") {
                var attributes_1 = {};
                physicalAttrs.forEach(function (attr) { return attributes_1[attr] = idArray
                    .filter(function (id) { return v["repeating_shells_" + id + "_shell_active"] === "1"; })
                    .map(function (id) { return v["repeating_shells_" + id + "_shell_" + attr]; })[0] || "None"; });
                mySetAttrs(attributes_1, v, null, function () {
                    physicalAttrs.filter(function (attr) { return attributes_1[attr] !== "None"; }).forEach(function (attr) { return calculateMod(attr); });
                });
            }
            else {
                physicalAttrs.forEach(function (attr) { return calculateAttr(attr); });
            }
        });
    });
};
var calculateNextLevelXP = function () {
    var xp = [0, 3, 6, 12, 18, 27, 39, 54, 72, 93];
    getAttrs(["level", "setting_xp_scheme"], function (v) {
        var level = parseInt(v.level);
        if (v.setting_xp_scheme === "xp") {
            if (level < 10) {
                setAttrs({
                    xp_next: xp[level]
                });
            }
            else {
                setAttrs({
                    xp_next: 93 + ((level - 9) * 24)
                });
            }
        }
        else if (v.setting_xp_scheme === "money") {
            setAttrs({
                xp_next: 2500 * (2 * level)
            });
        }
    });
};
var calculateGearReadiedStowed = function () {
    var doCalc = function (gearIDs, weaponIDs, armorIDs) {
        var attrs = __spreadArrays(gearIDs.map(function (id) { return "repeating_gear_" + id + "_gear_amount"; }), gearIDs.map(function (id) { return "repeating_gear_" + id + "_gear_encumbrance"; }), gearIDs.map(function (id) { return "repeating_gear_" + id + "_gear_status"; }), gearIDs.map(function (id) { return "repeating_gear_" + id + "_gear_bundled"; }), armorIDs.map(function (id) { return "repeating_armor_" + id + "_armor_encumbrance"; }), armorIDs.map(function (id) { return "repeating_armor_" + id + "_armor_encumbrance_bonus"; }), armorIDs.map(function (id) { return "repeating_armor_" + id + "_armor_status"; }), weaponIDs.map(function (id) { return "repeating_weapons_" + id + "_weapon_encumbrance"; }), weaponIDs.map(function (id) { return "repeating_weapons_" + id + "_weapon_status"; }), [
            "gear_readied", "gear_stowed", "strength", "gear_readied_max",
            "gear_readied_over", "gear_stowed_over", "gear_stowed_max"
        ]);
        getAttrs(attrs, function (v) {
            var _a = armorIDs.reduce(function (m, id) {
                if (v["repeating_armor_" + id + "_armor_status"] === "READIED") {
                    m[0] += parseInt(v["repeating_armor_" + id + "_armor_encumbrance"]) || 0;
                }
                else if (v["repeating_armor_" + id + "_armor_status"] === "STOWED")
                    m[1] += parseInt(v["repeating_armor_" + id + "_armor_encumbrance"]) || 0;
                return m;
            }, weaponIDs.reduce(function (m, id) {
                if (v["repeating_weapons_" + id + "_weapon_status"] === "READIED")
                    m[0] += parseInt(v["repeating_weapons_" + id + "_weapon_encumbrance"]) || 0;
                else if (v["repeating_weapons_" + id + "_weapon_status"] === "STOWED")
                    m[1] += parseInt(v["repeating_weapons_" + id + "_weapon_encumbrance"]) || 0;
                return m;
            }, gearIDs.reduce(function (m, id) {
                var amount = parseInt(v["repeating_gear_" + id + "_gear_amount"]) || 0;
                var packingFactor = 1;
                if (v["repeating_gear_" + id + "_gear_bundled"] === "on") {
                    packingFactor = 3;
                }
                if (v["repeating_gear_" + id + "_gear_status"] === "READIED")
                    m[0] += Math.ceil((amount * parseFloat(v["repeating_gear_" + id + "_gear_encumbrance"])) / packingFactor) || 0;
                else if (v["repeating_gear_" + id + "_gear_status"] === "STOWED")
                    m[1] += Math.ceil((amount * parseFloat(v["repeating_gear_" + id + "_gear_encumbrance"])) / packingFactor) || 0;
                return m;
            }, [0, 0]))), gear_readied = _a[0], gear_stowed = _a[1];
            var armor_encumbrance_bonus = Math.max.apply(Math, __spreadArrays([0], armorIDs.filter(function (id) { return v["repeating_armor_" + id + "_armor_status"] === "READIED"; })
                .map(function (id) { return parseInt(v["repeating_armor_" + id + "_armor_encumbrance_bonus"]) || 0; })));
            var gear_stowed_max = parseInt(v.strength) + armor_encumbrance_bonus || 0;
            var gear_readied_max = Math.floor(gear_stowed_max / 2);
            var setting = {
                gear_readied: gear_readied,
                gear_stowed: gear_stowed,
                gear_readied_max: gear_readied_max,
                gear_stowed_max: gear_stowed_max,
                gear_readied_over: (parseInt(v.gear_readied) > gear_readied_max) ? "1" : "0",
                gear_stowed_over: (parseInt(v.gear_stowed) > gear_stowed_max) ? "1" : "0"
            };
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    };
    getSectionIDs("repeating_gear", function (gearIDs) {
        getSectionIDs("repeating_weapons", function (weaponIDs) {
            getSectionIDs("repeating_armor", function (armorIDs) { return doCalc(gearIDs, weaponIDs, armorIDs); });
        });
    });
};
var generateWeaponDisplay = function () {
    getSectionIDs("repeating_weapons", function (idArray) {
        var prefixes = idArray.map(function (id) { return "repeating_weapons_" + id; });
        var sourceAttrs = __spreadArrays(prefixes.map(function (prefix) { return prefix + "_weapon_attack"; }), prefixes.map(function (prefix) { return prefix + "_weapon_name"; }), prefixes.map(function (prefix) { return prefix + "_weapon_skill_bonus"; }), prefixes.map(function (prefix) { return prefix + "_weapon_attribute_mod"; }), prefixes.map(function (prefix) { return prefix + "_weapon_damage"; }), prefixes.map(function (prefix) { return prefix + "_weapon_shock"; }), prefixes.map(function (prefix) { return prefix + "_weapon_shock_damage"; }), prefixes.map(function (prefix) { return prefix + "_weapon_shock_ac"; }), prefixes.map(function (prefix) { return prefix + "_weapon_skill_to_damage"; }), prefixes.map(function (prefix) { return prefix + "_weapon_attack_display"; }), prefixes.map(function (prefix) { return prefix + "_weapon_damage_display"; }), attributes.map(function (attr) { return attr + "_mod"; }), weaponSkills, [
            "attack_bonus",
            "str_dex_mod",
            "macro_weapons"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var setting = {};
            var baseAttackBonus = parseInt(v.attack_bonus) || 0;
            prefixes.forEach(function (prefix) {
                var attrBonus = parseInt(v[(v[prefix + "_weapon_attribute_mod"] || "").slice(2, -1)]) || 0;
                var skillBonus = parseInt(v[(v[prefix + "_weapon_skill_bonus"] || "").slice(2, -1)]) ||
                    parseInt(v[prefix + "_weapon_skill_bonus"]) || 0;
                var damageBonus = attrBonus +
                    ((v[prefix + "_weapon_skill_to_damage"] === "@{weapon_skill_bonus}") ? skillBonus : 0);
                var weaponDamage = (v[prefix + "_weapon_damage"] === "0") ? "" : v[prefix + "_weapon_damage"];
                var shockString = (v[prefix + "_weapon_shock"] !== "0") ? ", " + ((parseInt(v[prefix + "_weapon_shock_damage"]) || 0) + damageBonus) + "\u00A0" + translate("SHOCK").toString().toLowerCase() + (v[prefix + "_weapon_shock_ac"] ? " " + translate("VS_AC_LEQ") + " " + v[prefix + "_weapon_shock_ac"] : "") : "";
                var attack = baseAttackBonus + (parseInt(v[prefix + "_weapon_attack"]) || 0) +
                    ((skillBonus === -1) ? -2 : skillBonus) + attrBonus;
                var damage = weaponDamage + (weaponDamage ?
                    ((damageBonus === 0) ? "" : ((damageBonus > 0) ? " + " + damageBonus : " - " + -damageBonus)) :
                    damageBonus);
                setting[prefix + "_weapon_attack_display"] = (attack >= 0) ? "+" + attack : attack.toString();
                setting[prefix + "_weapon_damage_display"] = (damage || 0) + "\u00A0" + translate("DAMAGE").toString().toLowerCase() + shockString;
            });
            setting.macro_weapons = prefixes.map(function (prefix, index) {
                var label = v[prefix + "_weapon_name"] + " (" + setting[prefix + "_weapon_attack_display"] + ")";
                return buildLink(label, prefix + "_attack", index === prefixes.length - 1);
            }).join(" ");
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    });
};
var handleAmmoAPI = function (sName) {
    var formula = (sName === "weapons") ? "[[-1 - @{weapon_burst}]]" : "-1";
    getSectionIDs("repeating_" + sName, function (idArray) {
        getAttrs(__spreadArrays([
            "setting_use_ammo"
        ], idArray.map(function (id) { return "repeating_" + sName + "_" + id + "_weapon_use_ammo"; }), idArray.map(function (id) { return "repeating_" + sName + "_" + id + "_weapon_api"; })), function (v) {
            var setting = idArray.reduce(function (m, id) {
                m["repeating_" + sName + "_" + id + "_weapon_api"] =
                    (v.setting_use_ammo === "1" && v["repeating_" + sName + "_" + id + "_weapon_use_ammo"] !== "0") ?
                        "\n!modattr --mute --charid @{character_id} --repeating_" + sName + "_" + id + "_weapon_ammo|" + formula :
                        "";
                return m;
            }, {});
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    });
};
var fillDroneStats = function () {
    getAttrs(["repeating_drones_drone_model"], function (v) {
        var model = (v.repeating_drones_drone_model || "").toLowerCase().trim().replace(/ /g, "_");
        if (autofillData.drones.hasOwnProperty(model)) {
            var setting = Object.entries(autofillData.drones[model]).reduce(function (m, _a) {
                var key = _a[0], value = _a[1];
                if (typeof value === "string") {
                    m["repeating_drones_" + key] = value;
                }
                return m;
            }, {});
            setting.repeating_drones_drone_HP_max = setting.repeating_drones_drone_HP;
            setAttrs(setting);
        }
    });
};
var fillDroneFitting = function (num) {
    var prefix = "repeating_drones_drone_fitting_" + num;
    getAttrs([prefix + "_desc", prefix + "_name"], function (v) {
        var _a;
        var fittingName = (v[prefix + "_name"] || "").toLowerCase().trim().replace(/ /g, "_");
        if (v[prefix + "_desc"] === "" && autofillData.droneFittings.includes(fittingName)) {
            setAttrs((_a = {},
                _a[prefix + "_desc"] = translate(fittingName.toUpperCase() + "_DESC"),
                _a));
        }
    });
};
var calculateDroneAttack = function (prefixes, callback) {
    var sourceAttrs = prefixes.reduce(function (m, prefix) {
        return m.concat([
            prefix + "_drone_weapon1_ab",
            prefix + "_drone_weapon1_active",
            prefix + "_drone_weapon1_attack",
            prefix + "_drone_weapon1_skill",
            prefix + "_drone_weapon2_ab",
            prefix + "_drone_weapon2_active",
            prefix + "_drone_weapon2_attack",
            prefix + "_drone_weapon2_skill",
            prefix + "_drone_weapon3_ab",
            prefix + "_drone_weapon3_active",
            prefix + "_drone_weapon3_attack",
            prefix + "_drone_weapon3_skill",
        ]);
    }, ["attack_bonus", "intelligence_mod", "skill_pilot", "skill_program", "npc", "npc_attack_bonus"]);
    getAttrs(sourceAttrs, function (v) {
        var skillMod, intMod, attackBonus;
        if (v.npc !== "1") {
            skillMod = Math.max(parseInt(v.skill_pilot), parseInt(v.skill_program)) || 0;
            intMod = parseInt(v.intelligence_mod) || 0;
            attackBonus = parseInt(v.attack_bonus) || 0;
        }
        else {
            skillMod = 0;
            intMod = 0;
            attackBonus = parseInt(v.npc_attack_bonus) || 0;
        }
        var setting = prefixes.reduce(function (m, prefix) {
            [1, 2, 3].filter(function (num) { return v[prefix + "_drone_weapon" + num + "_active"] === "1"; })
                .forEach(function (num) {
                m[prefix + "_drone_weapon" + num + "_attack"] = (intMod + attackBonus +
                    ((skillMod === -1) ? -2 : skillMod) +
                    parseInt(v[prefix + "_drone_weapon" + num + "_ab"]) || 0).toString();
                m[prefix + "_drone_weapon" + num + "_skill"] =
                    ((skillMod === -1) ? -2 : skillMod).toString();
            });
            return m;
        }, {});
        mySetAttrs(setting, v, null, callback);
    });
};
var handleUpgrade = function () {
    getAttrs(["character_sheet"], function (v) {
        if (!v.character_sheet || v.character_sheet.indexOf(sheetName) !== 0)
            upgradeFrom162();
        else if (v.character_sheet.slice(32) !== sheetVersion)
            upgradeSheet(v.character_sheet.slice(32), true);
    });
};
var upgradeSheet = function (version, firstTime, finalTime) {
    if (firstTime === void 0) { firstTime = false; }
    if (finalTime === void 0) { finalTime = false; }
    var performUpgrade = function (version) {
        var _a = version.split(".").map(function (x) { return parseInt(x); }), major = _a[0], minor = _a[1], patch = _a[2];
        console.log("Upgrading from version " + version + ".");
        if (major === 2 && minor < 1) {
            var upgradeFunction_1 = _.after(4, function () {
                buildShipWeaponsMenu();
                buildAttacksMenu();
                buildMagicMenu();
                generateWeaponDisplay();
                attributes.forEach(calculateMod);
                upgradeSheet("2.1.0");
            });
            getSectionIDs("repeating_weapons", function (idArray) {
                var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_weapons_" + id + "_weapon_burst"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_weapon_shock_damage"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_weapon_ammo"; }));
                getAttrs(sourceAttrs, function (v) {
                    var setting = idArray.reduce(function (m, id) {
                        if (v["repeating_weapons_" + id + "_weapon_burst"] === "0")
                            m["repeating_weapons_" + id + "_weapon_burst"] = "";
                        else if (v["repeating_weapons_" + id + "_weapon_burst"] === "2")
                            m["repeating_weapons_" + id + "_weapon_burst"] = "+ 2[Burst]";
                        if (v["repeating_weapons_" + id + "_weapon_shock_damage"] !== "0")
                            m["repeating_weapons_" + id + "_weapon_shock"] = "{{shock=[[@{weapon_shock_damage} + @{weapon_attribute_mod}[Attribute] + @{weapon_skill_to_damage}[Skill]]] ^{SHOCK_DAMAGE_AGAINST_AC_LEQ} @{weapon_shock_ac}!}}";
                        if (v["repeating_weapons_" + id + "_weapon_ammo"] && v["repeating_weapons_" + id + "_weapon_ammo"] !== "0") {
                            m["repeating_weapons_" + id + "_weapon_use_ammo"] = "{{ammo=[[0@{weapon_ammo} - (1 @{weapon_burst})]] / @{weapon_ammo|max}}}";
                        }
                        return m;
                    }, {});
                    setAttrs(setting, {}, function () { return upgradeFunction_1(); });
                });
            });
            getSectionIDs("repeating_ship-weapons", function (idArray) {
                getAttrs(idArray.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_ammo_max"; }), function (v) {
                    var setting = idArray.reduce(function (m, id) {
                        if (v["repeating_ship-weapons_" + id + "_weapon_ammo_max"] && v["repeating_ship-weapons_" + id + "_weapon_ammo_max"] !== "0") {
                            m["repeating_ship-weapons_" + id + "_weapon_use_ammo"] = "{{ammo=[[@{weapon_ammo} - 1]] / @{weapon_ammo_max}}}";
                        }
                        return m;
                    }, {});
                    setAttrs(setting, {}, function () { return upgradeFunction_1(); });
                });
            });
            getSectionIDs("repeating_npc-attacks", function (idArray) {
                getAttrs(idArray.map(function (id) { return "repeating_npc-attacks_" + id + "_attack_burst"; }), function (v) {
                    var setting = idArray.reduce(function (m, id) {
                        if (v["repeating_npc-attacks_" + id + "_attack_burst"] === "0")
                            m["repeating_npc-attacks_" + id + "_attack_burst"] = "";
                        else if (v["repeating_npc-attacks_" + id + "_attack_burst"] === "2")
                            m["repeating_npc-attacks_" + id + "_attack_burst"] = "+ 2[Burst]";
                        return m;
                    }, {});
                    setAttrs(setting, {}, function () { return upgradeFunction_1(); });
                });
            });
            getSectionIDs("repeating_gear", function (idArray) {
                getAttrs(idArray.map(function (id) { return "repeating_gear_" + id + "_gear_status"; }), function (v) {
                    var setting = idArray.reduce(function (m, id) {
                        m["repeating_gear_" + id + "_gear_status"] =
                            (v["repeating_gear_" + id + "_gear_status"] || "").toUpperCase();
                        return m;
                    }, {});
                    mySetAttrs(setting, v, null, function () { return upgradeFunction_1(); });
                });
            });
        }
        else if (major === 2 && minor < 2) {
            var upgradeFunction_2 = _.after(2, function () {
                calculateStrDexMod();
                calculateEffort();
                buildPsionicsMenu();
                buildSkillMenu();
                upgradeSheet("2.2.0");
            });
            getAttrs(["armor_name", "armor_ac", "armor_encumbrance", "armor_type", "setting_ship_tab_name"], function (v) {
                if (v.armor_ac) {
                    var data = {
                        armor_active: "1",
                        armor_ac: v.armor_ac,
                        armor_encumbrance: v.armor_encumbrance || "0",
                        armor_name: v.armor_name || "",
                        armor_status: "READIED",
                        armor_type: (v.armor_type || "").toUpperCase()
                    };
                    fillRepeatingSectionFromData("armor", data, function () { return upgradeFunction_2(); });
                }
                else
                    upgradeFunction_2();
                if (v.setting_ship_tab_name === "MECH")
                    setAttrs({
                        ship_vehicle_type: "MECH"
                    });
            });
            getSectionIDs("repeating_skills", function (skillIDs) { return getSectionIDs("repeating_magic-skills", function (magicIDs) {
                getSectionIDs("repeating_psychic-skills", function (psychicIDs) {
                    var sourceAttrs = __spreadArrays(skillIDs.map(function (id) { return "repeating_skills_" + id + "_skill_query"; }), magicIDs.map(function (id) { return "repeating_magic-skills_" + id + "_skill_query"; }), psychicIDs.map(function (id) { return "repeating_psychic-skills_" + id + "_skill_query"; }), skills.revised.map(function (skill) { return "skill_" + skill + "_query"; }), skills.first.map(function (skill) { return "skill_" + skill + "_query"; }), skills.psionic.map(function (skill) { return "skill_" + skill + "_query"; }), [
                        "skill_magic_query", "skill_magic2_query"
                    ]);
                    getAttrs(sourceAttrs, function (v) {
                        var setting = sourceAttrs.reduce(function (m, attrName) {
                            if (v[attrName] === "@{attribute_query_none}")
                                m[attrName] = "@{attribute_query}";
                            return m;
                        }, {});
                        mySetAttrs(setting, v, null, function () { return upgradeFunction_2(); });
                    });
                });
            }); });
        }
        else if (major === 2 && (minor < 3 || (minor === 3 && patch === 0))) {
            var upgradeFunction_3 = _.after(1, function () {
                upgradeSheet("2.3.1");
            });
            generateWeaponDisplay();
            getSectionIDs("repeating_drones", function (idArray) {
                calculateDroneAttack(idArray.map(function (id) { return "repeating_drones_" + id; }), function () { return upgradeFunction_3(); });
            });
        }
        else if (major === 2 && (minor < 4 || (minor === 4 && patch < 3))) {
            calculateCyberwareStrain();
            upgradeSheet("2.4.3");
        }
        else if (major === 2 && minor === 4 && patch < 7) {
            attributes.forEach(function (attr) {
                getAttrs([attr, attr + "_base"], function (v) {
                    var _a;
                    mySetAttrs((_a = {}, _a[attr + "_base"] = parseInt(v["" + attr]) || 10, _a), v, null, function () {
                        calculateAttr(attr);
                    });
                });
            });
            upgradeSheet("2.4.7");
        }
        else if (major === 2 && minor === 4 && patch < 12) {
            getSectionIDs("repeating_drones", function (idArray) {
                calculateDroneAttack(idArray.map(function (id) { return "repeating_drones_" + id; }));
            });
            upgradeSheet("2.4.12");
        }
        else if (major === 2 && minor < 5) {
            buildMagicMenu();
            upgradeSheet("2.5.3");
        }
        else if (major === 2 && minor < 6) {
            getAttrs(["strain", "strain_permanent", "strain_extra", "AC", "HP", "HP_max"], function (v) {
                var strain_extra = (parseInt(v.strain) || 0) - (parseInt(v.strain_permanent) || 0);
                mySetAttrs({
                    strain_extra: strain_extra,
                    npc_ac: v.AC,
                    npc_hd: v.HD,
                    npc_hd_max: v.HP_max
                }, v, null, function () {
                    upgradeSheet("2.6.0");
                });
            });
        }
        else if (major === 2 && minor < 6) {
            generateWeaponDisplay();
            upgradeSheet("2.6.3");
        }
        else
            upgradeSheet(sheetVersion, false, true);
    };
    if (firstTime)
        performUpgrade(version);
    else
        setAttrs({
            character_sheet: sheetName + " v" + version
        }, {}, function () {
            if (!finalTime)
                performUpgrade(version);
        });
};
var upgradeFrom162 = function () {
    console.log("Upgrading from versionless sheet (assumed to be fresh or v1.6.2).");
    var upgradeFunction = _.after(13, function () {
        upgradeSheet("2.0.1");
    });
    getAttrs([1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return "psionics_mastered_" + i; }), function (v) {
        var setting = {};
        for (var i = 1; i < 9; i++) {
            var technique = v["psionics_mastered_" + i];
            if (technique) {
                var newRowId = generateRowID();
                setting["repeating_techniques_" + newRowId + "_technique_name"] = technique;
            }
        }
        setAttrs(setting);
    });
    getAttrs([1, 2, 3, 4].map(function (i) { return "cyberware_" + i; }), function (v) {
        var setting = {};
        for (var i = 1; i < 5; i++) {
            var cyberware = v["cyberware_" + i];
            if (cyberware) {
                var newRowId = generateRowID();
                setting["repeating_cyberware_" + newRowId + "_cyberware_name"] = cyberware;
            }
        }
        setAttrs(setting);
    });
    getAttrs(["languages"], function (v) {
        if (v.languages) {
            var setting_1 = {};
            v.languages.split(/\r?\n/).filter(function (l) { return !!l; }).forEach(function (language) {
                var newRowId = generateRowID();
                setting_1["repeating_languages_" + newRowId + "_language"] = language;
            });
            setAttrs(setting_1);
        }
    });
    var attrConversionData = {
        armor_enc: "armor_encumbrance",
        cha: "charisma",
        cha_misc: "charisma_bonus",
        con: "constitution",
        con_misc: "constitution_bonus",
        dex: "dexterity",
        dex_misc: "dexterity_bonus",
        gender: "species_gender",
        hd: "npc_hd",
        int: "intelligence",
        int_misc: "intelligence_bonus",
        morale: "npc_morale",
        move: "npc_move",
        name: "npc_name",
        notes: "npc_notes",
        npc_ac: "AC",
        saves: "npc_saves",
        ship_hp_min: "ship_hp",
        ship_current_crew: "ship_crew",
        ship_last_maintenance_cost: "ship_last_maintenance",
        skills: "npc_skills",
        skill_biopsion: "skill_biopsionics",
        skill_metapsion: "skill_metapsionics",
        skill_points: "unspent_skill_points",
        str: "strength",
        strain_perm: "strain_permanent",
        str_misc: "strength_bonus",
        wis: "wisdom",
        wis_misc: "wisdom_bonus"
    };
    var attrsToConvertFromOnTo1 = [
        "homebrew_luck_save",
        "homebrew_extra_skills",
        "setting_heroic_enable",
    ];
    var customConversionAttrs = __spreadArrays([
        "damage",
        "homebrew_psionics_disable",
        "npc_attacks",
        "npc_attack_bonus",
        "setting_space_magic_enable",
        "ship_other_notes",
        "ship_free_hardpoints",
        "ship_free_mass",
        "ship_free_power",
        "skill_culture_alien_type",
        "skill_culture_one_value",
        "skill_culture_two_value",
        "skill_culture_three_value",
        "profession_type",
        "tab"
    ], [1, 2, 3, 4].map(function (n) { return "homebrew_custom_counter_" + n + "_name"; }), [1, 2, 3, 4].map(function (n) { return "homebrew_custom_counter_" + n + "_counter"; }));
    getAttrs(__spreadArrays(Object.keys(attrConversionData), Object.values(attrConversionData), attrsToConvertFromOnTo1, customConversionAttrs), function (v) {
        var setting = Object.entries(attrConversionData).reduce(function (m, _a) {
            var oldName = _a[0], newName = _a[1];
            if (v[oldName] && v[oldName] !== "" && "" + v[newName] !== "" + v[oldName])
                m[newName] = v[oldName];
            return m;
        }, {});
        attrsToConvertFromOnTo1.forEach(function (name) {
            if (v[name] === "on")
                setting[name] = "1";
        });
        ["one", "two", "three"].forEach(function (num) {
            if (v["skill_culture_" + num + "_value"])
                setting["skill_culture_" + num + "_name"] = "Culture/" + v["skill_culture_" + num + "_value"];
        });
        if (v.profession_type)
            setting.skill_profession_name = "Profession/" + v.profession_type;
        if (v.skill_culture_alien_type)
            setting.skill_culture_alien_name = "Culture/Alien/" + v.skill_culture_alien_type;
        if (v.ship_free_hardpoints || v.ship_free_mass || v.ship_free_power) {
            setting.ship_other_notes = "\nLegacy attributes" + (v.ship_free_power ? "\nFree Power: " + v.ship_free_power : "") + (v.ship_free_mass ? "\nFree Mass: " + v.ship_free_mass : "") + (v.ship_free_hardpoints ? "\nFree Hardpoints: " + v.ship_free_hardpoints : "") + "\n\t\t\t\t\t" + (v.ship_other_notes || "");
        }
        var customCounterData = [1, 2, 3, 4].reduce(function (m, num) {
            if (v["homebrew_custom_counter_" + num + "_name"])
                m.push({
                    resource_name: v["homebrew_custom_counter_" + num + "_name"],
                    resource_count: v["homebrew_custom_counter_" + num + "_counter"] || 0
                });
            return m;
        }, []);
        fillRepeatingSectionFromData("resources", customCounterData, function () { return upgradeFunction(); });
        if ("" + v.tab === "1" || "" + v.tab === "4")
            setting.tab = "character";
        if ("" + v.tab === "2")
            setting.tab = "ship";
        if ("" + v.tab === "3") {
            setting.tab = "character";
            setting.npc = "1";
        }
        if (v.damage) {
            var newAttack = {
                attack_damage: v.damage,
                attack_name: translate("ATTACK"),
                attack_number: v.npc_attacks || "1"
            };
            fillRepeatingSectionFromData("npc-attacks", newAttack, function () { return upgradeFunction(); });
        }
        else
            upgradeFunction();
        if (v.setting_space_magic_enable === "on" && v.homebrew_psionics_disable !== "on")
            setting.setting_super_type = "both";
        else if (v.setting_space_magic_enable === "on")
            setting.setting_super_type = "magic";
        else if (v.homebrew_psionics_disable === "on")
            setting.setting_super_type = "neither";
        setAttrs(setting, {}, function () { return upgradeFunction(); });
    });
    getSectionIDs("repeating_weapons", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_weapons_" + id + "_attribute_mod"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_add_skill"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_weapon_shock"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_name"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_power"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_ab"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_damage"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_ammo"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_special_effects"; }), idArray.map(function (id) { return "repeating_weapons_" + id + "_ship_weapon_broken"; }));
        getAttrs(oldAttrs, function (v) {
            var setting = idArray.reduce(function (m, id) {
                if (v["repeating_weapons_" + id + "_add_skill"] === "@{weapon_skill_bonus}")
                    m["repeating_weapons_" + id + "_weapon_skill_to_damage"] = "@{weapon_skill_bonus}";
                if (v["repeating_weapons_" + id + "_weapon_shock"])
                    m["repeating_weapons_" + id + "_weapon_shock_damage"] = v["repeating_weapons_" + id + "_weapon_shock"];
                var modValue = v["repeating_weapons_" + id + "_attribute_mod"];
                switch (modValue) {
                    case "@{dex_bonus}":
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{dexterity_mod}";
                        break;
                    case "@{con_bonus}":
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{constitution_mod}";
                        break;
                    case "@{int_bonus}":
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{intelligence_mod}";
                        break;
                    case "@{wis_bonus}":
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{wisdom_mod}";
                        break;
                    case "@{cha_bonus}":
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{charisma_mod}";
                        break;
                    default:
                        m["repeating_weapons_" + id + "_weapon_attribute_mod"] = "@{strength_mod}";
                }
                return m;
            }, {});
            var data = idArray.filter(function (id) { return v["repeating_weapons_" + id + "_ship_weapon_name"]; })
                .map(function (id) {
                var row = {};
                row.weapon_name = v["repeating_weapons_" + id + "_ship_weapon_name"];
                if (v["repeating_weapons_" + id + "_ship_weapon_power"])
                    row.weapon_power = v["repeating_weapons_" + id + "_ship_weapon_power"];
                if (v["repeating_weapons_" + id + "_ship_weapon_ab"])
                    row.weapon_attack_bonus = v["repeating_weapons_" + id + "_ship_weapon_ab"];
                if (v["repeating_weapons_" + id + "_ship_weapon_damage"])
                    row.weapon_damage = v["repeating_weapons_" + id + "_ship_weapon_damage"];
                if (v["repeating_weapons_" + id + "_ship_weapon_ammo"])
                    row.weapon_ammo = v["repeating_weapons_" + id + "_ship_weapon_ammo"];
                if (v["repeating_weapons_" + id + "_ship_weapon_special_effects"])
                    row.weapon_qualities = v["repeating_weapons_" + id + "_ship_weapon_special_effects"];
                if (v["repeating_weapons_" + id + "_ship_weapon_broken"] === "on")
                    row.weapon_broken = "1";
                return row;
            });
            fillRepeatingSectionFromData("ship-weapons", data, function () { return upgradeFunction(); });
            setAttrs(setting, null, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_skills", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_1_name"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_2_name"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_1_level"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_2_level"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_1_specialist"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_custom_skill_2_specialist"; }));
        getAttrs(oldAttrs, function (v) {
            var data = idArray.reduce(function (m, id) {
                [1, 2].forEach(function (i) {
                    if (v["repeating_skills_" + id + "_custom_skill_" + i + "_name"]) {
                        var skillLevel = (typeof v["repeating_skills_" + id + "_custom_skill_" + i + "_level"] === "undefined") ?
                            "-1" : v["repeating_skills_" + id + "_custom_skill_" + i + "_level"];
                        m.push({
                            skill_name: v["repeating_skills_" + id + "_custom_skill_" + i + "_name"],
                            skill: skillLevel,
                            skill_specialist: v["repeating_skills_" + id + "_custom_skill_" + i + "_specialist"] || "2d6"
                        });
                    }
                });
                return m;
            }, []);
            idArray.forEach(function (id) { return removeRepeatingRow("repeating_skills_" + id); });
            fillRepeatingSectionFromData("skills", data, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_technique", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_technique_" + id + "_technique"; }), idArray.map(function (id) { return "repeating_technique_" + id + "_technique_description"; }));
        getAttrs(oldAttrs, function (v) {
            var data = idArray.reduce(function (m, id) {
                if (v["repeating_technique_" + id + "_technique"])
                    m.push({
                        technique_name: v["repeating_technique_" + id + "_technique"],
                        technique_description: v["repeating_technique_" + id + "_technique_description"] || ""
                    });
                return m;
            }, []);
            fillRepeatingSectionFromData("techniques", data, function () { return upgradeFunction(); });
            idArray.forEach(function (id) { return removeRepeatingRow("repeating_technique_" + id); });
        });
    });
    getSectionIDs("repeating_cyberware", function (idArray) {
        getAttrs(idArray.map(function (id) { return "repeating_cyberware_" + id + "_cyberware"; }), function (v) {
            var setting = idArray.reduce(function (m, id) {
                if (v["repeating_cyberware_" + id + "_cyberware"])
                    m["repeating_cyberware_" + id + "_cyberware_name"] = v["repeating_cyberware_" + id + "_cyberware"];
                return m;
            }, {});
            setAttrs(setting, null, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_goals", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_goals_" + id + "_misc_goal"; }), idArray.map(function (id) { return "repeating_goals_" + id + "_misc_goal_xp"; }));
        getAttrs(oldAttrs, function (v) {
            var setting = idArray.reduce(function (m, id) {
                if (v["repeating_goals_" + id + "_misc_goal"])
                    m["repeating_goals_" + id + "_goal_name"] = v["repeating_goals_" + id + "_misc_goal"];
                if (v["repeating_goals_" + id + "_misc_goal_xp"])
                    m["repeating_goals_" + id + "_goal_xp"] = v["repeating_goals_" + id + "_misc_goal_xp"];
                return m;
            }, {});
            setAttrs(setting, null, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_languages", function (idArray) {
        getAttrs(idArray.map(function (id) { return "repeating_languages_" + id + "_languages"; }), function (v) {
            var setting = idArray.reduce(function (m, id) {
                if (v["repeating_languages_" + id + "_languages"])
                    m["repeating_languages_" + id + "_language"] = v["repeating_languages_" + id + "_languages"];
                return m;
            }, {});
            setAttrs(setting, null, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_gear", function (idArray) {
        getAttrs(idArray.map(function (id) { return "repeating_gear_" + id + "_gear_readied"; }), function (v) {
            var setting = idArray.reduce(function (m, id) {
                if ("" + v["repeating_gear_" + id + "_gear_readied"] === "1")
                    m["repeating_gear_" + id + "_gear_status"] = "readied";
                else if ("" + v["repeating_gear_" + id + "_gear_readied"] === "2")
                    m["repeating_gear_" + id + "_gear_status"] = "stowed";
                return m;
            }, {});
            setAttrs(setting, null, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_defenses", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_defenses_" + id + "_ship_defense_name"; }), idArray.map(function (id) { return "repeating_defenses_" + id + "_ship_defense_special_effects"; }), idArray.map(function (id) { return "repeating_defenses_" + id + "_ship_defense_broken"; }));
        getAttrs(oldAttrs, function (v) {
            var data = idArray.map(function (id) {
                var row = {};
                if (v["repeating_defenses_" + id + "_ship_defense_name"])
                    row.defense_name = v["repeating_defenses_" + id + "_ship_defense_name"];
                if (v["repeating_defenses_" + id + "_ship_defense_special_effects"])
                    row.defense_effect = v["repeating_defenses_" + id + "_ship_defense_special_effects"];
                if (v["repeating_defenses_" + id + "_ship_defense_broken"])
                    row.defense_broken = "1";
                return row;
            });
            fillRepeatingSectionFromData("ship-defenses", data, function () { return upgradeFunction(); });
        });
    });
    getSectionIDs("repeating_fittings", function (idArray) {
        var oldAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_fittings_" + id + "_ship_fitting_name"; }), idArray.map(function (id) { return "repeating_fittings_" + id + "_ship_fitting_special_effects"; }), idArray.map(function (id) { return "repeating_fittings_" + id + "_ship_fitting_broken"; }));
        getAttrs(oldAttrs, function (v) {
            var data = idArray.map(function (id) {
                var row = {};
                if (v["repeating_fittings_" + id + "_ship_fitting_name"])
                    row.fitting_name = v["repeating_fittings_" + id + "_ship_fitting_name"];
                if (v["repeating_fittings_" + id + "_ship_fitting_special_effects"])
                    row.fitting_effect = v["repeating_fittings_" + id + "_ship_fitting_special_effects"];
                if (v["repeating_fittings_" + id + "_ship_fitting_broken"])
                    row.fitting_broken = "1";
                return row;
            });
            fillRepeatingSectionFromData("ship-fittings", data, function () { return upgradeFunction(); });
        });
    });
};
var validateTab = function () {
    getAttrs(["tab", "npc"], function (v) {
        if (v.tab === "character" && v.npc === "1")
            setAttrs({
                tab: "npc"
            });
        if (v.tab === "npc" && v.npc === "0")
            setAttrs({
                tab: "character"
            });
    });
};
var validateSuperTab = function () {
    getAttrs(["setting_super_type", "tab_super"], function (v) {
        var setting = {};
        if (v.setting_super_type === "magic")
            setting.tab_super = "magic";
        if (v.setting_super_type === "psionics")
            setting.tab_super = "psionics";
        mySetAttrs(setting, v);
    });
};
var validateWeaponSkills = function (ids) {
    var prefixes = (ids && ids.map(function (id) { return "repeating_weapons_" + id; })) || ["repeating_weapons"];
    getAttrs(__spreadArrays(["homebrew_skill_list"], prefixes.map(function (p) { return p + "_weapon_skill_bonus"; })), function (v) {
        var revisedList = ["@{skill_exert}", "@{skill_punch}", "@{skill_shoot}", "@{skill_stab}",
            "@{skill_telekinesis}", "0"
        ], firstList = ["@{skill_combat_energy}", "@{skill_combat_gunnery}", "@{skill_combat_primitive}", "@{skill_combat_projectile}",
            "@{skill_combat_psitech}", "@{skill_combat_unarmed}", "@{skill_telekinesis}", "0"
        ], type = v.homebrew_skill_list, setting = {};
        prefixes.forEach(function (prefix) {
            if (type === "revised" && !revisedList.includes(v[prefix + "_weapon_skill_bonus"]))
                setting[prefix + "_weapon_skill_bonus"] = "@{skill_shoot}";
            if (type === "first" && !firstList.includes(v[prefix + "_weapon_skill_bonus"]))
                setting[prefix + "_weapon_skill_bonus"] = "@{skill_combat_energy}";
        });
        setAttrs(setting);
    });
};
var validateShells = function (e) {
    if (e.sourceAttribute.slice(-6) === "active" && e.sourceAttribute.slice(-15, -7) !== "affinity") {
        console.log("Changing");
        getSectionIDs("repeating_shells", function (idArray) {
            idArray = idArray.filter(function (item) { return item !== e.sourceAttribute.slice(17, -13); });
            var setting = {};
            idArray.forEach(function (id) { return setting["repeating_shells_" + id + "_shell_active"] = "0"; });
            setAttrs(setting, {}, function () {
                calculateShellAttrs();
            });
        });
    }
    else {
        console.log("No change needed");
        calculateShellAttrs();
    }
};
var setTranslatedDefaults = function () {
    var specialSkills = {
        skill_culture_alien_name: {
            trans: translate("CULTURE_ALIEN") + "/",
            "default": "Culture/Alien/"
        },
        skill_culture_one_name: {
            trans: translate("CULTURE") + "/",
            "default": "Culture/"
        },
        skill_culture_two_name: {
            trans: translate("CULTURE") + "/",
            "default": "Culture/"
        },
        skill_culture_three_name: {
            trans: translate("CULTURE") + "/",
            "default": "Culture/"
        },
        skill_profession_name: {
            trans: translate("PROFESSION") + "/",
            "default": "Profession/"
        }
    };
    getAttrs(__spreadArrays(Object.keys(specialSkills), ["homebrew_skill_list", "innate_ac_name"]), function (v) {
        var setting = {};
        if (v.homebrew_skill_list === "first") {
            Object.entries(specialSkills).forEach(function (_a) {
                var name = _a[0], data = _a[1];
                if (v[name] === data["default"] && v[name] !== data.trans)
                    setting[name] = data.trans;
            });
        }
        setting.innate_ac_name = translate("INNATE_AC").toString();
        mySetAttrs(setting, v);
    });
};
var handleAttributeQueries = function () {
    var attrQueries = attributes.map(function (attr) {
        var translated = translate(attr.toUpperCase());
        return translated + ",+ @{" + attr + "_mod}[" + translated + "]]]&#125;&#125; " +
            ("{{attribute= + " + translate(attr.toUpperCase() + "_SHORT") + "&#125;&#125;");
    });
    getAttrs(__spreadArrays(["attribute_query", "setting_skill_query"], attributes.map(function (a) { return "attribute_query_" + a.slice(0, 3); })), function (v) {
        if (v.setting_skill_query === "hover" || v.setting_skill_query === "hide") {
            mySetAttrs({
                attribute_query: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[0]], attrQueries.slice(1)).join("|") + "}",
                attribute_query_str: "+ @{strength_mod}[" + translate("STRENGTH") + "]]]}} {{attribute= + " + translate("STRENGTH_SHORT") + "}}",
                attribute_query_dex: "+ @{dexterity_mod}[" + translate("DEXTERITY") + "]]]}} {{attribute= + " + translate("DEXTERITY_SHORT") + "}}",
                attribute_query_con: "+ @{constitution_mod}[" + translate("CONSTITUTION") + "]]]}} {{attribute= + " + translate("CONSTITUTION_SHORT") + "}}",
                attribute_query_int: "+ @{intelligence_mod}[" + translate("INTELLIGENCE") + "]]]}} {{attribute= + " + translate("INTELLIGENCE_SHORT") + "}}",
                attribute_query_wis: "+ @{wisdom_mod}[" + translate("WISDOM") + "]]]}} {{attribute= + " + translate("WISDOM_SHORT") + "}}",
                attribute_query_cha: "+ @{charisma_mod}[" + translate("CHARISMA") + "]]]}} {{attribute= + " + translate("CHARISMA_SHORT") + "}}"
            }, v);
        }
        else if (v.setting_skill_query === "query") {
            mySetAttrs({
                attribute_query: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[0]], attrQueries.slice(1)).join("|") + "}",
                attribute_query_str: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[0]], attrQueries.slice(1)).join("|") + "}",
                attribute_query_dex: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[1], attrQueries[0]], attrQueries.slice(2)).join("|") + "}",
                attribute_query_con: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[2]], attrQueries.slice(0, 2), attrQueries.slice(3)).join("|") + "}",
                attribute_query_int: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[3]], attrQueries.slice(0, 3), attrQueries.slice(4)).join("|") + "}",
                attribute_query_wis: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[4]], attrQueries.slice(0, 4), attrQueries.slice(5)).join("|") + "}",
                attribute_query_cha: "?{" + translate("ATTRIBUTE") + "|" + __spreadArrays([attrQueries[5]], attrQueries.slice(0, 5)).join("|") + "}"
            }, v);
        }
    });
};
var handleModifierQuery = function () {
    getAttrs(["modifier_query", "setting_modifier_query"], function (v) {
        if ("" + v.setting_modifier_query === "1") {
            mySetAttrs({
                modifier_query: "+ ?{" + translate("MODIFIER") + "|0}[" + translate("MODIFIER_SHORT") + "]"
            }, v);
        }
        else
            mySetAttrs({
                modifier_query: " "
            }, v);
    });
};
var setTranslatedQueries = function () {
    getAttrs(["burst_query", "extra_hp_query", "translation_numdice", "proficient_query", "skill_name_query"], function (v) {
        var setting = {
            burst_query: "?{" + translate("BURST") + "|" + translate("YES") + ",+ 2[" + translate("BURST") + "]|" + translate("NO") + ",&" + "#" + "32;}",
            extra_hp_query: "?{" + translate("EXTRA_HP_QUERY") + "|0}[" + translate("BONUS") + "]",
            proficient_query: "?{" + translate("PROFICIENT") + "|" + translate("YES") + ", @{npc_skills}|" + translate("NO") + ", 0}[" + translate("SKILL") + "]",
            skill_name_query: "?{" + translate("SKILL_NAME") + "|" + translate("SKILL") + "}",
            translation_numdice: translate("NUMBER_OF_DICE")
        };
        mySetAttrs(setting, v);
    });
};
var skillToMacro = function (v) { return function (skill) {
    var namedSkills = [
        "culture_one", "culture_two", "culture_three",
        "culture_alien", "profession", "magic2"
    ];
    if (namedSkills.includes(skill))
        return ["@{skill_" + skill + "_name} (" + sign(parseInt(v["skill_" + skill])) + ")", "skill_" + skill];
    else
        return ["^{" + skill.toUpperCase() + "} (" + sign(parseInt(v["skill_" + skill])) + ")", "skill_" + skill];
}; };
var idToSkillMacro = function (v, sName) { return function (id) {
    var prefix = "repeating_" + sName + "_" + id + "_skill";
    return [v[prefix + "_name"] + " (" + sign(parseInt(v[prefix])) + ")", prefix];
}; };
var buildSkillMacro = function (_a, index, allSkills) {
    var name = _a[0], command = _a[1];
    return buildLink(name, command, index + 1 === allSkills.length);
};
var buildSaveMenu = function () {
    getAttrs(["homebrew_luck_save", "macro_saves"], function (v) {
        var macro_saves = buildLink("^{PHYSICAL} (v@{save_physical})", ("save_physical")) + " " +
            buildLink("^{MENTAL} (v@{save_mental})", ("save_mental")) + " " +
            buildLink("^{EVASION} (v@{save_evasion})", ("save_evasion"), v.homebrew_luck_save !== "1") +
            ((v.homebrew_luck_save === "1") ?
                (" " + buildLink("^{LUCK} (v@{save_luck})", ("save_luck"), true)) : "");
        mySetAttrs({
            macro_saves: macro_saves
        }, v);
    });
};
var buildSkillMenu = function () {
    getSectionIDs("repeating_skills", function (idArray) {
        var sourceAttrs = __spreadArrays(skills.revised.map(function (sk) { return "skill_" + sk; }), skills.first.map(function (sk) { return "skill_" + sk; }), [
            "homebrew_skill_list",
            "setting_show_untrained_skills",
            "macro_skills"
        ], idArray.map(function (id) { return "repeating_skills_" + id + "_skill_name"; }), idArray.map(function (id) { return "repeating_skills_" + id + "_skill"; }));
        getAttrs(sourceAttrs, function (v) {
            var skillList = skills[v.homebrew_skill_list] || [];
            var hasSkills = skillList.filter(function (skill) { return v["skill_" + skill] !== "-1"; }).length ||
                idArray.filter(function (id) { return v["repeating_skills_" + id + "_skill"] !== "-1"; }).length;
            var macro_skills = "" + __spreadArrays(skillList.filter(function (skill) { return v["skill_" + skill] !== "-1"; }).map(skillToMacro(v)), idArray.filter(function (id) { return v["repeating_skills_" + id + "_skill"] !== "-1"; }).map(idToSkillMacro(v, "skills"))).map(buildSkillMacro).join(" ") + (v.setting_show_untrained_skills === "1" ? "" + (hasSkills ? "\n\n**^{UNTRAINED}**\n" : "") + __spreadArrays(skillList.filter(function (skill) { return v["skill_" + skill] === "-1"; }).map(skillToMacro(v)), idArray.filter(function (id) { return v["repeating_skills_" + id + "_skill"] === "-1"; }).map(idToSkillMacro(v, "skills"))).map(buildSkillMacro).join(" ") : "");
            mySetAttrs({
                macro_skills: macro_skills
            }, v);
        });
    });
};
var buildPsionicsMenu = function () {
    getSectionIDs("repeating_techniques", function (techniqueIDs) {
        getSectionIDs("repeating_psychic-skills", function (skillIDs) {
            var sourceAttrs = __spreadArrays(skills.psionic.map(function (sk) { return "skill_" + sk; }), [
                "setting_super_type",
                "macro_psionics"
            ], skillIDs.map(function (id) { return "repeating_psychic-skills_" + id + "_skill_name"; }), skillIDs.map(function (id) { return "repeating_psychic-skills_" + id + "_skill"; }), techniqueIDs.map(function (id) { return "repeating_techniques_" + id + "_technique_name"; }));
            getAttrs(sourceAttrs, function (v) {
                if (v.setting_super_type === "magic" || v.setting_super_type === "neither")
                    return;
                var macro_psionics = "" + __spreadArrays(skills.psionic.filter(function (skill) { return v["skill_" + skill] !== "-1"; }).map(skillToMacro(v)), skillIDs.filter(function (id) { return v["repeating_psychic-skills_" + id + "_skill"] !== "-1"; })
                    .map(idToSkillMacro(v, "psychic-skills"))).map(buildSkillMacro).join(" ") + (techniqueIDs.length ? "\n\n" : "") + techniqueIDs.map(function (id, index, allIDs) { return buildLink(v["repeating_techniques_" + id + "_technique_name"], "repeating_techniques_" + id + "_technique", index + 1 === allIDs.length); }).join(" ");
                mySetAttrs({
                    macro_psionics: macro_psionics
                }, v);
            });
        });
    });
};
var buildMagicMenu = function () {
    getSectionIDs("repeating_spells", function (spellIDs) {
        getSectionIDs("repeating_magic-skills", function (skillIDs) {
            var sourceAttrs = __spreadArrays([
                "skill_know_magic", "skill_use_magic", "skill_sunblade_magic", "skill_fight", "skill_magic2", "skill_magic2_name",
                "setting_super_type", "macro_magic"
            ], skillIDs.map(function (id) { return "repeating_magic-skills_" + id + "_skill_name"; }), skillIDs.map(function (id) { return "repeating_magic-skills_" + id + "_skill"; }), spellIDs.map(function (id) { return "repeating_spells_" + id + "_spell_name"; }));
            getAttrs(sourceAttrs, function (v) {
                if (v.setting_super_type === "psionics" || v.setting_super_type === "neither")
                    return;
                var macro_magic = "" + __spreadArrays((v.skill_magic2_name ? ["know_magic", "use_magic", "fight", "sunblade", "magic2"] : ["know_magic", "use_magic", "fight", "sunblade"]).map(skillToMacro(v)), skillIDs.map(idToSkillMacro(v, "magic-skills"))).map(buildSkillMacro).join(" ") + (spellIDs.length ? "\n\n" : "") + spellIDs.map(function (id) { return buildLink(v["repeating_spells_" + id + "_spell_name"], "repeating_spells_" + id + "_spell"); })
                    .join(" ");
                mySetAttrs({
                    macro_magic: macro_magic
                }, v);
            });
        });
    });
};
var buildShipWeaponsMenu = function () {
    getSectionIDs("repeating_ship-weapons", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_name"; }), idArray.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_attack_bonus"; }), [
            "macro_ship_weapons"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var macro_ship_weapons = idArray.map(function (id, index) {
                var title = v["repeating_ship-weapons_" + id + "_weapon_name"] +
                    (" " + sign(v["repeating_ship-weapons_" + id + "_weapon_attack_bonus"]));
                return buildLink(title, "repeating_ship-weapons_" + id + "_attack", index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_ship_weapons: macro_ship_weapons
            }, v);
        });
    });
};
var buildAttacksMenu = function () {
    getSectionIDs("repeating_npc-attacks", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_npc-attacks_" + id + "_attack_name"; }), idArray.map(function (id) { return "repeating_npc-attacks_" + id + "_attack_ab"; }), idArray.map(function (id) { return "repeating_npc-attacks_" + id + "_attack_number"; }), [
            "macro_npc_attacks"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var macro_npc_attacks = idArray.map(function (id, index) {
                var title = v["repeating_npc-attacks_" + id + "_attack_name"] +
                    (" " + sign(v["repeating_npc-attacks_" + id + "_attack_ab"])) +
                    ((v["repeating_npc-attacks_" + id + "_attack_number"] !== "1") ?
                        " (" + v["repeating_npc-attacks_" + id + "_attack_number"] + " attacks)" : "");
                return buildLink(title, "repeating_npc-attacks_" + id + "_attack", index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_npc_attacks: macro_npc_attacks
            }, v);
        });
    });
};
var buildAbilitiesMenu = function () {
    getSectionIDs("repeating_npc-abilities", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_npc-abilities_" + id + "_ability_name"; }), [
            "macro_npc_abilities"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var macro_npc_abilities = idArray.map(function (id, index) {
                return buildLink(v["repeating_npc-abilities_" + id + "_ability_name"], "repeating_npc-abilities_" + id + "_ability", index + 1 === idArray.length);
            }).join(" ");
            mySetAttrs({
                macro_npc_abilities: macro_npc_abilities
            }, v);
        });
    });
};
var buildStatblock = function () {
    var sourceAttrs = [
        "npc",
        "macro_npc_abilities",
        "macro_npc_attacks",
        "macro_statblock",
    ];
    getAttrs(sourceAttrs, function (v) {
        if (v.npc !== "1")
            return;
        var macroList = [
            "[**^{SAVES}** v@{npc_saves},](~npc_save) [**^{SKILLS}** +@{npc_skills},](~npc_skill) ",
            "[**^{MORALE}** v@{npc_morale}](~npc_morale)\n",
            "[**^{INITIATIVE_FIXED}** d8,](~npc_initiative) [**^{REACTION}** 2d6,](~npc_reaction) ",
            "**Move** @{npc_move}\n"
        ];
        if (v.macro_npc_attacks)
            macroList.push("\n**Attacks:** @{macro_npc_attacks}");
        if (v.macro_npc_abilities)
            macroList.push("\n**Abilities:** @{macro_npc_abilities}");
        mySetAttrs({
            macro_statblock: macroList.join("")
        }, v);
    });
};
var fillShipStats = function () {
    getAttrs(__spreadArrays(["ship_hulltype"], shipStats), function (v) {
        var label = v.ship_hulltype && reverseHullTypes[v.ship_hulltype.toLowerCase()];
        if (label && autofillData.hulltypes.hasOwnProperty(label)) {
            var data_2 = Object.assign({}, autofillData.hulltypes[label]);
            data_2.ship_hp_max = data_2.ship_hp;
            Object.keys(data_2).forEach(function (key) {
                if (!(["", 0, "0"].includes(v[key])) && v.hasOwnProperty(key))
                    delete data_2[key];
            });
            mySetAttrs(data_2, v);
            calculateShipStats();
        }
    });
};
var setShipClass = function () {
    getAttrs(["ship_class", "ship_class_normalised"], function (v) {
        if (["fighter", translate("FIGHTER").toString().toLowerCase()].includes(v.ship_class.toLowerCase()))
            setAttrs({
                ship_class_normalised: "fighter"
            });
        else if (["frigate", translate("FRIGATE").toString().toLowerCase()].includes(v.ship_class.toLowerCase()))
            setAttrs({
                ship_class_normalised: "frigate"
            });
        else if (["cruiser", translate("CRUISER").toString().toLowerCase()].includes(v.ship_class.toLowerCase()))
            setAttrs({
                ship_class_normalised: "cruiser"
            });
        else
            mySetAttrs({
                ship_class_normalised: ""
            }, v);
    });
};
var calculateShipStats = function () {
    var doCalc = function (weaponIDs, fittingIDs, defenseIDs) {
        console.log(weaponIDs);
        console.log(fittingIDs);
        console.log(defenseIDs);
        var oldAttrs = __spreadArrays(weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_power"; }), weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_mass"; }), weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_hardpoints"; }), weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_price"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_power"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_mass"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_price"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_power"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_mass"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_price"; }), [
            "ship_power_max", "ship_mass_max", "ship_hardpoints_max",
            "ship_power", "ship_mass", "ship_hardpoints", "ship_price", "ship_hull_price", "ship_calculate_price"
        ]);
        getAttrs(oldAttrs, function (v) {
            var ship_power = (parseInt(v.ship_power_max) || 0) - sum(__spreadArrays(weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_power"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_power"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_power"; })).map(function (x) { return v[x]; }));
            var ship_mass = (parseInt(v.ship_mass_max) || 0) - sum(__spreadArrays(weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_mass"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_mass"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_mass"; })).map(function (x) { return v[x]; }));
            var ship_hardpoints = (parseInt(v.ship_hardpoints_max) || 0) -
                sum(weaponIDs.map(function (id) { return v["repeating_ship-weapons_" + id + "_weapon_hardpoints"]; }));
            var setting = { ship_power: ship_power, ship_mass: ship_mass, ship_hardpoints: ship_hardpoints, ship_price: "" };
            if (v.ship_calculate_price === "1") {
                setting.ship_price = new Intl.NumberFormat().format((parseInt(v.ship_hull_price) || 0) + sum(__spreadArrays(weaponIDs.map(function (id) { return "repeating_ship-weapons_" + id + "_weapon_price"; }), fittingIDs.map(function (id) { return "repeating_ship-fittings_" + id + "_fitting_price"; }), defenseIDs.map(function (id) { return "repeating_ship-defenses_" + id + "_defense_price"; })).map(function (x) { return v[x]; })));
            }
            mySetAttrs(setting, v, {
                silent: true
            });
        });
    };
    getSectionIDs("repeating_ship-weapons", function (A) { return getSectionIDs("repeating_ship-fittings", function (B) {
        getSectionIDs("repeating_ship-defenses", function (C) { return doCalc(A, B, C); });
    }); });
};
var fillNPC = function () {
    getAttrs(["npc_stat_block"], function (v) {
        if (v.npc_stat_block && Object.keys(autofillData.statblocks).includes(v.npc_stat_block)) {
            var _a = autofillData.statblocks[v.npc_stat_block], npc_hd = _a.npc_hd, npc_ac = _a.npc_ac, npc_attack_bonus = _a.npc_attack_bonus, npc_damage = _a.npc_damage, npc_attacks = _a.npc_attacks, npc_move = _a.npc_move, npc_morale = _a.npc_morale, npc_skills = _a.npc_skills, npc_saves = _a.npc_saves, npc_armor_type = _a.npc_armor_type;
            var setting = {
                npc_ac: npc_ac,
                npc_attack_bonus: npc_attack_bonus,
                npc_move: npc_move,
                npc_morale: npc_morale,
                npc_skills: npc_skills,
                npc_saves: npc_saves
            };
            if (npc_armor_type)
                setting.npc_armor_type = npc_armor_type;
            if (typeof npc_hd === "string" && npc_hd.includes("hp"))
                setting.HP = npc_hd.replace("hp", "");
            else
                setting.npc_hd = npc_hd;
            setAttrs(setting);
            if (npc_damage !== "Unarmed") {
                var newAttack = {
                    attack_ab: npc_attack_bonus,
                    attack_damage: npc_damage || 0,
                    attack_name: translate("ATTACK"),
                    attack_number: npc_attacks
                };
                fillRepeatingSectionFromData("npc-attacks", newAttack);
            }
        }
    });
};
var addNPCAttackBonus = function () {
    getAttrs(["repeating_npc-attacks_attack_ab", "npc_attack_bonus"], function (v) {
        var _a;
        if ("" + v["repeating_npc-attacks_attack_ab"] === "0") {
            setAttrs((_a = {},
                _a["repeating_npc-attacks_attack_ab"] = v.npc_attack_bonus,
                _a));
        }
    });
};
var setNPCMultiAttacks = function () {
    getSectionIDs("repeating_npc-attacks", function (idArray) {
        var sourceAttrs = __spreadArrays(idArray.map(function (id) { return "repeating_npc-attacks_" + id + "_attack_number"; }), [
            "npc_roll_full_attack"
        ]);
        getAttrs(sourceAttrs, function (v) {
            var setting = idArray.reduce(function (m, id) {
                if (v.npc_roll_full_attack === "1") {
                    var num_1 = parseInt(v["repeating_npc-attacks_" + id + "_attack_number"]) || 1;
                    m["repeating_npc-attacks_" + id + "_attack_extra_macro"] = [2, 3, 4, 5, 6, 7, 8].map(function (n) {
                        if (n <= num_1)
                            return "{{attack" + n + "=[[1d20 + @{attack_ab} @{attack_burst} @{modifier_query}]]}} " +
                                ("{{damage" + n + "=[[@{attack_damage} @{attack_burst}]]}} ");
                        else
                            return "";
                    }).join("");
                }
                else {
                    m["repeating_npc-attacks_" + id + "_attack_extra_macro"] = "";
                }
                return m;
            }, {});
            setAttrs(setting);
        });
    });
};
var handleNPCRollHide = function () {
    var types = ["hp", "initiative", "save", "skill", "morale", "reaction"];
    getAttrs(__spreadArrays(["npc_rolls_hidden"], types.map(function (x) { return "npc_" + x + "_hidden"; })), function (v) {
        var setting = types.reduce(function (m, n) {
            m["npc_" + n + "_hidden"] = v.npc_rolls_hidden;
            return m;
        }, {});
        mySetAttrs(setting, v);
    });
};
on("sheet:opened", handleUpgrade);
on("sheet:opened change:npc", validateTab);
on("sheet:opened", setTranslatedQueries);
on("sheet:opened change:setting_skill_query", handleAttributeQueries);
on("sheet:opened change:setting_modifier_query", handleModifierQuery);
on("change:homebrew_skill_list", setTranslatedDefaults);
["weapons", "ship-weapons"].forEach(function (sName) {
    on("change:repeating_" + sName + ":weapon_use_ammo", function () { return handleAmmoAPI(sName); });
});
on("change:setting_use_ammo", function () {
    handleAmmoAPI("weapons");
    handleAmmoAPI("ship-weapons");
});
on("change:class", fillClassStats);
attributes.forEach(function (attr) { return on("change:" + attr + "_base change:" + attr + "_boosts", function () { return calculateAttr(attr); }); });
attributes.forEach(function (attr) { return on("change:" + attr + " change:" + attr + "_bonus", function () { return calculateMod(attr); }); });
on("change:repeating_shells remove:repeating_shells", function (eventInfo) {
    if (eventInfo.sourceType === "player") {
        validateShells(eventInfo);
    }
});
on("change:setting_transhuman_enable change:setting_ai_enable", calculateShellAttrs);
on(weaponDisplayEvent, generateWeaponDisplay);
on("change:repeating_weapons:weapon_name", function () { return validateWeaponSkills(); });
on("change:homebrew_skill_list", function () { return getSectionIDs("repeating_weapons", validateWeaponSkills); });
on("change:strain_extra change:strain_permanent", calculateStrain);
on("change:constitution", calculateMaxStrain);
on("change:repeating_cyberware remove:repeating_cyberware", calculateCyberwareStrain);
on("change:strain_permanent_extra change:cyberware_strain_total", calculatePermanentStrain);
on("change:level", calculateSaves);
on(__spreadArrays(effortAttributes, ["repeating_psychic-skills:skill"]).map(function (x) { return "change:" + x; }).join(" "), calculateEffort);
on("change:magic_committed_effort_current change:magic_committed_effort_scene change:magic_committed_effort_day change:magic_total_effort", calculateMagicEffort);
on("change:ai_committed_processing_current change:ai_committed_processing_scene change:ai_committed_processing_day change:ai_extra_processing change:repeating_processing-nodes remove:repeating:processing_nodes", calculateProcessing);
on("change:repeating_armor change:innate_ac remove:repeating_armor", calculateAC);
on("change:strength change:repeating_gear remove:repeating_gear change:repeating_weapons " +
    "remove:repeating_weapons change:repeating_armor remove:repeating_armor", calculateGearReadiedStowed);
on("change:level change:setting_xp_scheme", calculateNextLevelXP);
on("change:setting_super_type", validateSuperTab);
on("change:homebrew_luck_save", buildSaveMenu);
on(__spreadArrays(skills.revised.map(function (x) { return "change:skill_" + x; }), skills.first.map(function (x) { return "change:skill_" + x; }), [
    "change:homebrew_skill_list",
    "change:repeating_skills",
    "change:setting_show_untrained_skills",
    "remove:repeating_skills",
]).join(" "), buildSkillMenu);
on(__spreadArrays(skills.psionic.map(function (x) { return "change:skill_" + x; }), [
    "change:setting_super_type change:repeating_techniques remove:repeating_techniques",
    "change:repeating_psychic-skills remove:repeating_psychic-skills"
]).join(" "), buildPsionicsMenu);
on("change:setting_super_type change:repeating_spells remove:repeating_spells " +
    "change:repeating_magic-skills remove:repeating_magic-skills " +
    "change:skill_know_magic change:skill_use_magic change:skill_fight change:skill_sunblade change:skill_magic2_name change:skill_magic2", buildMagicMenu);
autofillSections.forEach(function (sName) {
    on("change:generate_" + sName + "_source", function () { return generateAutofillInfo(sName); });
    on("change:generate_" + sName + "_button", function () { return generateAutofillRow(sName); });
});
on("change:ship_hulltype", fillShipStats);
on("change:ship_calculate_price", calculateShipStats);
on("change:ship_class", function () {
    setShipClass();
    ["ship-fittings", "ship-defenses"].forEach(function (sName) { return generateAutofillInfo(sName); });
});
on(shipStatEvent, calculateShipStats);
on("change:repeating_ship-weapons:weapon_name change:repeating_ship-weapons:weapon_attack_bonus " +
    "remove:repeating_ship-weapons", buildShipWeaponsMenu);
[1, 2, 3, 4, 5].forEach(function (num) {
    on("change:repeating_drones:drone_fitting_" + num + "_name", function () { return fillDroneFitting(num); });
});
on("change:repeating_drones:drone_model", fillDroneStats);
on("change:attack_bonus change:intelligence_mod change:skill_pilot change:skill_program change:npc", function () { return getSectionIDs("repeating_drones", function (idArray) {
    calculateDroneAttack(idArray.map(function (id) { return "repeating_drones_" + id; }));
}); });
on(__spreadArrays([1, 2, 3].map(function (n) { return "change:repeating_drones:drone_weapon" + n + "_ab"; }), [1, 2, 3].map(function (n) { return "change:repeating_drones:drone_weapon" + n + "_active"; })).join(" "), function () { return calculateDroneAttack(["repeating_drones"]); });
on("change:npc_stat_block", fillNPC);
on("change:npc_rolls_hidden", handleNPCRollHide);
on("change:repeating_npc-attacks:attack_name", addNPCAttackBonus);
on("change:npc_roll_full_attack change:repeating_npc-attacks:attack_number", setNPCMultiAttacks);
on("change:repeating_npc-abilities:ability_name remove:repeating_npc-abilities", buildAbilitiesMenu);
on("change:repeating_npc-attacks:attack_name change:repeating_npc-attacks:attack_ab " +
    "change:repeating_npc-attacks:attack_number remove:repeating_npc-attacks", buildAttacksMenu);
on("change:npc change:npc_armor_type change:macro_npc_attacks change:macro_npc_abilities", buildStatblock);
