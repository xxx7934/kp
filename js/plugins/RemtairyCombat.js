﻿var Remtairy = Remtairy || {};
Remtairy.Combat = Remtairy.Combat || {};

const DEFAULT_DEF_STR_MULTI = 2;
const VAR_BONUS_THRUSTSLASHBLUNT_DMG = 1.5;

const VAR_HIT_CONSTANT = 0.7;
const VAR_EVADE_CONSTANT = 0.3;

//=============================================================================
 /*:
 * @plugindesc Combat
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================


const ELEMENT_ALMIGHTY_ID = 1;
const ELEMENT_SLASH_ID = 2;
const ELEMENT_PIERCE_ID = 3;
const ELEMENT_BLUNT_ID = 4;
const ELEMENT_TALK_ID = 5;
const ELEMENT_SIGHT_ID = 6;
const ELEMENT_PETTING_ID = 7;
const ELEMENT_STRIP_ID = 8;
const ELEMENT_DRUGS_ID = 9;
const ELEMENT_STENCH_ID = 10;
const ELEMENT_SEX_ID = 11;

const PARAM_MAXSTAMINA_ID = 0;
const PARAM_MAXENERGY_ID = 1;
const PARAM_STRENGTH_ID = 2;
const PARAM_ENDURANCE_ID = 3;
const PARAM_DEXTERITY_ID = 4;
const PARAM_MIND_ID = 5;
const PARAM_AGILITY_ID = 6;
const PARAM_CHARM_ID = 7;

const XPARAM_HIT_ID = 0;
const XPARAM_EVA_ID = 1;
const XPARAM_CRIT_ID = 2;
const XPARAM_CRIT_EVA_ID = 3;
const XPARAM_GRAZE_ID = 4;
const XPARAM_CNT_ID = 6;
const XPARAM_STA_REGEN_ID = 7;
const XPARAM_EN_REGEN_ID = 8;

const SPARAM_WPDEF_ID = 1;
const SPARAM_RECOVERY_ID = 2;
const SPARAM_ESC_ID = 3;
const SPARAM_WPATK_ID = 4;
const SPARAM_WP_REGEN_ID = 5;
const SPARAM_WSC_ID = 6;
const SPARAM_SSC_ID = 7;
const SPARAM_ASC_ID = 8;
const SPARAM_EXR_ID = 9;

const SKILLTYPE_ATTACK_ID = 1;
const SKILLTYPE_ENERGY_ID = 2;
const SKILLTYPE_SEXUAL_ID = 3;
const SKILLTYPE_WILLPOWER_ID = 4;
const SKILLTYPE_BUFFS_ID = 5;
const SKILLTYPE_DEBUFFS_ID = 6;
const SKILLTYPE_PASSIVES_ID = 7;
const SKILLTYPE_EDICTS_ID = 8;
const SKILLTYPE_TALK_ID = 9;
const SKILLTYPE_SIGHT_ID = 10;
const SKILLTYPE_OFFBALANCE_ID = 11;
const SKILLTYPE_FALLEN_ID = 12;
const SKILLTYPE_MASTURBATE_ID = 13;
const SKILLTYPE_DISARMED_ID = 14;
const SKILLTYPE_WAITRESS_ID = 15;
const SKILLTYPE_BARTENDER_ID = 16;
const SKILLTYPE_RECEPTIONIST_ID = 17;

const STATE_DISARMED_ID = 4;
const STATE_ERECT_ID = 9;
const STATE_HORNY_ID = 10;
const STATE_WEAKEN_ID = 11;
const STATE_DIZZY_ID = 12;
const STATE_SLOW_ID = 13;
const STATE_VULNERABLE_ID = 14;
const STATE_OFFBALANCE_ID = 15;
const STATE_STUNNED_ID = 16;
const STATE_FALLEN_ID = 17;
const STATE_POISON_ID = 18;

const STATE_DEFEATED_ID = 23;
const STATE_GUARD_ID = 25;
const STATE_ENEMY_STANCE_SLASH_ID = 26;
const STATE_ENEMY_STANCE_PIERCE_ID = 27;
const STATE_ENEMY_STANCE_BLUNT_ID = 28;
const STATE_NO_HALBERD_ID = 31;
const STATE_JUST_ORGASMED_ID = 32;

const STATE_SEE_NO_EVIL_ID = 33;
const STATE_HEAR_NO_EVIL_ID = 34;
const STATE_CAUTIOUS_STANCE_ID = 35;
const STATE_COUNTER_STANCE_ID = 36;
const STATE_UNTARGETABLE_FOR_ATTACK_ID = 41;
const STATE_UNTARGETABLE_FOR_SEX_ID = 42;
const STATE_EMPRESS_MAJESTY_ID = 43; //-Strip Resist
const STATE_EMPRESS_CLOTHES_ID = 44; //+Strip Resist
const STATE_REALITY_MARBLE_ID = 45; //Charm+
const STATE_EYE_OF_THE_MIND_ID = 46; //+Accuracy, Evade, Crit
const STATE_KI_ID = 47;
const STATE_FOCUS_ID = 48;

const STATE_BONUS_PIERCE_DMG_ID = 49;
const STATE_BONUS_SLASH_DMG_ID = 50;
const STATE_BONUS_BLUNT_DMG_ID = 51;
const STATE_BONUS_CRIT_CHANCE_ID = 52;

const STATE_ATTACK_CHARM_1_ID = 53;
const STATE_EVADE_CHARM_1_ID = 54;

const STATE_JUST_JOINED_ID = 56;
const STATE_CHARGE_ID = 57;
const STATE_ANGRY_ID = 58;
const STATE_CONFIDENT_ID = 59;
const STATE_STUN_TILL_TURN_END_ID = 60;
const STATE_ENEMY_POST_CUM_STUN_ID = 63;

const STATE_OPEN_PLEASURE_STANCE_ID = 66;

const STATE_SLAMMED_ID = 69;
const STATE_CLEAVED_ID = 70;
const STATE_SKEWERED_ID = 71;

const STATE_ENEMY_KISSED_ID = 73;
const STATE_WEAKNESS_EXPOSED_ID = 74;
const STATE_COCK_KICK_CRIT_BONUS_ID = 75;
const STATE_USE_UNARMED_MODIFERS_ID = 76;
const STATE_SLIME_ANGRY_ID = 77;

const STATE_ACCEPTING_NO_ALCOHOL_ID = 78;
const STATE_DIRTY_MUGS_ID = 79;
const STATE_DIRTY_GLASSES_ID = 80;
const STATE_AVAILABLE_MUGS_ID = 81;
const STATE_AVAILABLE_GLASSES_ID = 82;
const STATE_BAR_TABLE_A_ID = 83;
const STATE_BAR_TABLE_B_ID = 84;
const STATE_BAR_TABLE_C_ID = 85;
const STATE_BAR_TABLE_D_ID = 86;
const STATE_BAR_SLEEP_ID = 87;
const STATE_BAR_KARRYN_ID = 88;
const STATE_KARRYN_BLISS_STUN_ID = 91;
const STATE_KARRYN_RESIST_ORGASM_ID = 92;
const STATE_KARRYN_EDGING_CONTROL_ID = 93;
const STATE_ENEMY_EDGING_CONTROL_ID = 94;
const STATE_RESIST_ANGRY_ID = 95;
const STATE_RESIST_HORNY_ID = 96;
const STATE_IS_ONLOOKER_ID = 97;
const STATE_ENEMY_CAME_THIS_TURN_ID = 98;
const STATE_DISABLED_ID = 99;
const STATE_PUSSY_ENEMYPOSE_ID = 100;
const STATE_RIGHTHAND_ENEMYPOSE_ID = 101;
const STATE_LEFTHAND_ENEMYPOSE_ID = 102;
const STATE_TITTYFUCK_ENEMYPOSE_ID = 103;
const STATE_BLOWJOB_ENEMYPOSE_ID = 104;
const STATE_ANAL_ENEMYPOSE_ID = 105;
const STATE_CUNNI_ENEMYPOSE_ID = 106;
const STATE_RIMMING_ENEMYPOSE_ID = 110;
const STATE_FOOTJOB_ENEMYPOSE_ID = 111;

const STATE_BAR_DRINKING_ALE_ID = 123;
const STATE_BAR_DRINKING_WHITE_GLASS_ID = 124;
const STATE_BAR_DRINKING_ORANGE_GLASS_ID = 125;

const STATE_VISITOR_STATUS_UNKNOWN_ID = 126;
const STATE_VISITOR_STATUS_WRITING_ID = 127;
const STATE_VISITOR_STATUS_PAPER_ID = 128;
const STATE_VISITOR_STATUS_TIME_ID = 129;
const STATE_VISITOR_LOCATION_SITTING_ID = 130;
const STATE_VISITOR_LOCATION_MOVING_ID = 131;
const STATE_VISITOR_LOCATION_DESK_ID = 132;
const STATE_VISITOR_LOCATION_LINE_ID = 133;
const STATE_RECEPTIONIST_SHOOED_ID = 134;
const STATE_RECEPTIONIST_KICKED_ID = 135;

const RING_MIDI_ID = 25;
const RING_DOUBLE_ID = 26;
const RING_FINGERCLAW_ID = 27;
const RING_SCORPION_ID = 28;
const RING_PEARL_ID = 29;
const RING_CHAINHAND_ID = 30;
const RING_GOLDGLASS_ID = 31;
const RING_GEMSTONE_ID = 32;
const EARRING_TEAR_ID = 33;
const EARRING_LIONESS_ID = 34;
const EARRING_STAR_ID = 35;
const EARRING_HEART_ID = 36;
const EARRING_CHEETAH_ID = 37;
const EARRING_MOON_ID = 38;
const EARRING_SKULL_ID = 39;
const EARRING_SUN_ID = 40;
const NECKLACE_CLOVER_ID = 41;
const NECKLACE_SPADE_ID = 42;
const NECKLACE_DIAMOND_ID = 43;
const NECKLACE_HEART_ID = 44;
const NECKLACE_PLATINUM_ID = 45;
const NECKLACE_GOLD_ID = 46;
const NECKLACE_RUBY_ID = 47;
const NECKLACE_JOKER_ID = 48;
const MISC_NAILPOLISH_ID = 430;
const MISC_EYELINER_ID = 431;
const MISC_LIPGLOSS_ID = 432;
const MISC_PHONESTRAP_ID = 433;
const MISC_HIGHHEELS_ID = 434;
const MISC_SCARF_ID = 435;
const MISC_PERFUME_ID = 436;
const MISC_HANDBAG_ID = 437;
const MISC_LATEXSTOCKING_ID = 438;
const MISC_CALFSKINBELT_ID = 439;

const JUST_SKILLTYPE_KARRYN_ATTACK = 1;
const JUST_SKILLTYPE_KARRYN_KISSING = 2;
const JUST_SKILLTYPE_KARRYN_PETTING = 3;
const JUST_SKILLTYPE_KARRYN_COCK_STARE = 4;
const JUST_SKILLTYPE_KARRYN_SEX_SKILL = 5;
const JUST_SKILLTYPE_KARRYN_SADISM = 9;
const JUST_SKILLTYPE_KARRYN_MASTURBATE = 10;
const JUST_SKILLTYPE_KARRYN_MASOCHISM = 11;
const JUST_SKILLTYPE_KARRYN_ORGASM = 12;

const JUST_SKILLTYPE_KARRYN_PUSSY_SEX = 15;
const JUST_SKILLTYPE_KARRYN_ANAL_SEX = 16;
const JUST_SKILLTYPE_KARRYN_HANDJOB = 17;
const JUST_SKILLTYPE_KARRYN_BLOWJOB = 18;
const JUST_SKILLTYPE_KARRYN_TITTYFUCK = 19;

const JUST_SKILLTYPE_ENEMY_KISS = 22;
const JUST_SKILLTYPE_ENEMY_PETTING = 23;
const JUST_SKILLTYPE_ENEMY_PUSSY_SEX = 25;
const JUST_SKILLTYPE_ENEMY_ANAL_SEX = 26;
const JUST_SKILLTYPE_ENEMY_HANDJOB = 27;
const JUST_SKILLTYPE_ENEMY_BLOWJOB = 28;
const JUST_SKILLTYPE_ENEMY_TITTYFUCK = 29;
const JUST_SKILLTYPE_ENEMY_PUSSY_CREAMPIE = 30;
const JUST_SKILLTYPE_ENEMY_ANAL_CREAMPIE = 31;
const JUST_SKILLTYPE_ENEMY_CUM_SWALLOW = 32;
const JUST_SKILLTYPE_ENEMY_BUKKAKE = 33;
const JUST_SKILLTYPE_ENEMY_CUNNILINGUS = 34;
const JUST_SKILLTYPE_ENEMY_TALK = 35;
const JUST_SKILLTYPE_ENEMY_SIGHT = 36;
const JUST_SKILLTYPE_ENEMY_TOY_PLAY = 37;
const JUST_SKILLTYPE_ENEMY_SADISM = 38;
const JUST_SKILLTYPE_ENEMY_MASTURBATE = 39;
const JUST_SKILLTYPE_ENEMY_MASOCHISM = 40;
const JUST_SKILLTYPE_ENEMY_STRIP = 41;
const JUST_SKILLTYPE_ENEMY_SPANKING = 41;

const JUST_SKILLTYPE_PASSIVE_SIGHT = 50;
const JUST_SKILLTYPE_PASSIVE_TOY = 51;

const JUST_SKILLTYPE_WAITRESS_MOVING = 60;
const JUST_SKILLTYPE_WAITRESS_DRINK = 61;
const JUST_SKILLTYPE_WAITRESS_FLASH = 62;

//Skill IDs

const SKILL_END_MENTAL_PHASE_ID = 2;
const SKILL_ESCAPE_ID = 3;

const SKILL_DEBUG_SURRENDER_ID = 13;
const SKILL_DEBUG_DEFEAT_ALL_ID = 14;
const SKILL_DEBUG_STRIP_CLOTHES_ID = 15;

const SKILL_CLEAVE_1_ID = 57;
const SKILL_CLEAVE_2_ID = 58;
const SKILL_SKEWER_ID = 61;

const SKILL_FIX_CLOTHES_ID = 70;
const SKILL_REVITALIZE_ID = 71;
const SKILL_SECOND_WIND_ID = 72;
const SKILL_BREATHE_ID = 73;
const SKILL_CAUTIOUS_STANCE_ID = 74;
const SKILL_DEFENSIVE_STANCE_ID = 75;
const SKILL_COUNTER_STANCE_ID = 76;
const SKILL_ENDURE_PLEASURE_ID = 77;
const SKILL_WAIT_OUT_PLEASURE_ID = 78;
const SKILL_OPEN_PLEASURE_ID = 79;

const SKILL_SUPPRESS_MOUTH_DESIRE_ID = 81;
const SKILL_SUPPRESS_BOOBS_DESIRE_ID = 82;
const SKILL_SUPPRESS_PUSSY_DESIRE_ID = 83;
const SKILL_SUPPRESS_BUTT_DESIRE_ID = 84;
const SKILL_SUPPRESS_COCK_DESIRE_ID = 85;
const SKILL_RESTORE_MIND_ID = 105;

const SKILL_KARRYN_TAUNT_ID = 1007;

const SKILL_KARRYN_KISS_SELECTOR_ID = 1008;
const SKILL_KARRYN_KISS_SELECTOR_CANT_ID = 1009;
const SKILL_KARRYN_KISS_ONE_ID = 1010;
const SKILL_KARRYN_KISS_TWO_ID = 1011;

const SKILL_KARRYN_HANDJOB_SELECTOR_ID = 1015;
const SKILL_KARRYN_HANDJOB_SELECTOR_CANT_ID = 1016;
const SKILL_KARRYN_START_STANDING_HJ_ID = 1017;
const SKILL_KARRYN_HANDJOB_POSESKILL_ID = 1018;

const SKILL_GIVE_UP_ID = 1020;
const SKILL_SURRENDER_ID = 1021;
const SKILL_FALLEN_REST_ID = 1022;
const SKILL_KARRYN_DOGEZA_ID = 1023;
const SKILL_KARRYN_MAS_TOUCH_SELECTOR_ID = 1024;
const SKILL_KARRYN_MAS_FINGER_SELECTOR_ID = 1025;
const SKILL_KARRYN_MAS_SUCK_SELECTOR_ID = 1026;
const SKILL_REGAIN_FOOTING_ID = 1028;
const SKILL_STAND_UP_ID = 1029;

const SKILL_KARRYN_KICK_STRIKE_ID = 1030;
const SKILL_KARRYN_KICK_SLASH_ID = 1031;
const SKILL_KARRYN_KICK_THRUST_ID = 1032;
const SKILL_KARRYN_PICK_UP_HALBERD_ID = 1033;
const SKILL_KARRYN_GET_CLOSER_TO_HALBERD_ID = 1034;
const SKILL_KARRYN_REMOVE_TOY_ID = 1035;
const SKILL_KARRYN_REMOVE_TOY_PINK_ROTOR_ID = 1036;
const SKILL_KARRYN_REMOVE_TOY_PENIS_DILDO_ID = 1037;
const SKILL_KARRYN_REMOVE_TOY_ANAL_BEADS_ID = 1038;

const SKILL_KARRYN_FLAUNT_ID = 1039;
const SKILL_KARRYN_COCK_PETTING_SELECTOR_ID = 1040;
const SKILL_KARRYN_COCK_PETTING_SELECTOR_CANT_ID = 1041;
const SKILL_KARRYN_COCK_PETTING_ONE_ID = 1042;
const SKILL_KARRYN_RIMJOB_SELECTOR_ID = 1043;
const SKILL_KARRYN_RIMJOB_SELECTOR_CANT_ID = 1044;
const SKILL_KARRYN_START_RIMJOB_ID = 1045;
const SKILL_KARRYN_RIMJOB_POSESKILL_ID = 1046;
const SKILL_KARRYN_BLOWJOB_SELECTOR_ID = 1047;
const SKILL_KARRYN_BLOWJOB_SELECTOR_CANT_ID = 1048;
const SKILL_KARRYN_START_KNEELING_BJ_ID = 1049;
const SKILL_KARRYN_BLOWJOB_POSESKILL_ID = 1050;
const SKILL_KARRYN_TITTYFUCK_SELECTOR_ID = 1051;
const SKILL_KARRYN_TITTYFUCK_SELECTOR_CANT_ID = 1052;
const SKILL_KARRYN_START_LAYING_TITTYFUCK_ID = 1053;
const SKILL_KARRYN_TITTYFUCK_POSESKILL_ID = 1054;
const SKILL_KARRYN_FOOTJOB_SELECTOR_ID = 1055;
const SKILL_KARRYN_FOOTJOB_SELECTOR_CANT_ID = 1056;
const SKILL_KARRYN_START_FOOTJOB_ID = 1057;
const SKILL_KARRYN_FOOTJOB_POSESKILL_ID = 1058;
const SKILL_KARRYN_COCK_STARE_SELECTOR_ID = 1065;
const SKILL_KARRYN_COCK_STARE_SELECTOR_CANT_ID = 1066;
const SKILL_KARRYN_COCK_STARE_ONE_ID = 1067;

const SKILL_FEMALE_ORGASM_ONE_ID = 1068;
const SKILL_FEMALE_ORGASM_TWO_ID = 1069;

const SKILL_CARGILL_CHARGE_ID = 1165;
const SKILL_CARGILL_REVIVE_ID = 1166;
const SKILL_CARGILL_SLIMEHEAL_ID = 1167;
const SKILL_CARGILL_DEBUFF_ID = 1168;

const SKILL_ENEMY_CLOTHES_PULL_ID = 1238;

const SKILL_ENEMY_EJACULATE_FACE_ID = 1376;
const SKILL_ENEMY_EJACULATE_PUSSY_ID = 1377;
const SKILL_ENEMY_EJACULATE_BOOBS_ID = 1378;
const SKILL_ENEMY_EJACULATE_ANAL_ID = 1379;
const SKILL_ENEMY_EJACULATE_MOUTH_ID = 1380;
const SKILL_ENEMY_EJACULATE_LEFTARM_ID = 1381;
const SKILL_ENEMY_EJACULATE_RIGHTARM_ID = 1382;
const SKILL_ENEMY_EJACULATE_BUTT_ID = 1383;
const SKILL_ENEMY_EJACULATE_TENTACLES_ID = 1384;
const SKILL_ENEMY_EJACULATE_LEFTLEG_ID = 1385;
const SKILL_ENEMY_EJACULATE_RIGHTLEG_ID = 1386;
const SKILL_ENEMY_EJACULATE_INTO_MUG_ID = 1387;
const SKILL_ENEMY_EJACULATE_BUTT_TOP_RIGHT_ID = 1388;
const SKILL_ENEMY_EJACULATE_BUTT_TOP_LEFT_ID = 1389;
const SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_RIGHT_ID = 1390;
const SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_LEFT_ID = 1391;
const SKILL_ENEMY_EJACULATE_ONTO_DESK_ID = 1392;

const SKILL_ENEMY_TALK_SELECTOR_RANDOM_ID = 1401;
const SKILL_ENEMY_TALK_SELECTOR_RANDOM_JERKOFF_ID = 1402;
const SKILL_ENEMY_TALK_SELECTOR_MOUTH_ID = 1403;
const SKILL_ENEMY_TALK_SELECTOR_BOOBS_ID = 1404;
const SKILL_ENEMY_TALK_SELECTOR_PUSSY_ID = 1405;
const SKILL_ENEMY_TALK_SELECTOR_BUTT_ID = 1406;
const SKILL_ENEMY_TALK_SELECTOR_COCK_ID = 1407;
const SKILL_ENEMY_TALK_SKILL_MOUTH_ID = 1408;
const SKILL_ENEMY_TALK_SKILL_BOOBS_ID = 1409;
const SKILL_ENEMY_TALK_SKILL_PUSSY_ID = 1410;
const SKILL_ENEMY_TALK_SKILL_BUTT_ID = 1411;
const SKILL_ENEMY_TALK_SKILL_COCK_ID = 1412;
const SKILL_ENEMY_TALK_SKILL_MOUTH_JERKOFF_ID = 1413;
const SKILL_ENEMY_TALK_SKILL_BOOBS_JERKOFF_ID = 1414;
const SKILL_ENEMY_TALK_SKILL_PUSSY_JERKOFF_ID = 1415;
const SKILL_ENEMY_TALK_SKILL_BUTT_JERKOFF_ID = 1416;
const SKILL_ENEMY_TALK_SKILL_COCK_JERKOFF_ID = 1417;

const SKILL_ENEMY_STARE_SELECTOR_RANDOM_ID = 1450;
const SKILL_ENEMY_STARE_SELECTOR_RANDOM_JERKOFF_ID = 1451;
const SKILL_ENEMY_STARE_SELECTOR_MOUTH_ID = 1452;
const SKILL_ENEMY_STARE_SELECTOR_BOOBS_ID = 1453;
const SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID = 1454;
const SKILL_ENEMY_STARE_SELECTOR_BUTT_ID = 1455;
const SKILL_ENEMY_STARE_SKILL_MOUTH_ID = 1456;
const SKILL_ENEMY_STARE_SKILL_BOOBS_ID = 1457;
const SKILL_ENEMY_STARE_SKILL_NIPPLES_ID = 1458;
const SKILL_ENEMY_STARE_SKILL_CLIT_ID = 1459;
const SKILL_ENEMY_STARE_SKILL_PUSSY_ID = 1460;
const SKILL_ENEMY_STARE_SKILL_BUTT_ID = 1461;
const SKILL_ENEMY_STARE_SKILL_ANAL_ID = 1462;
const SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_ID = 1463;
const SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_ID = 1464;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_ID = 1465;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_ID = 1466;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_ID = 1467;
const SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_ID = 1468;
const SKILL_ENEMY_STARE_SKILL_MOUTH_JERKOFF_ID = 1469;
const SKILL_ENEMY_STARE_SKILL_BOOBS_JERKOFF_ID = 1470;
const SKILL_ENEMY_STARE_SKILL_NIPPLES_JERKOFF_ID = 1471;
const SKILL_ENEMY_STARE_SKILL_CLIT_JERKOFF_ID = 1472;
const SKILL_ENEMY_STARE_SKILL_PUSSY_JERKOFF_ID = 1473;
const SKILL_ENEMY_STARE_SKILL_BUTT_JERKOFF_ID = 1474;
const SKILL_ENEMY_STARE_SKILL_ANAL_JERKOFF_ID = 1475;
const SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_JERKOFF_ID = 1476;
const SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_JERKOFF_ID = 1477;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_JERKOFF_ID = 1478;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_JERKOFF_ID = 1479;
const SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_JERKOFF_ID = 1480;
const SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_JERKOFF_ID = 1481;

const SKILL_ENEMY_PETTING_SELECTOR_RANDOM_ID = 1501;
const SKILL_ENEMY_PETTING_SELECTOR_KISS_ID = 1502;
const SKILL_ENEMY_PETTING_SELECTOR_BOOBS_ID = 1503;
const SKILL_ENEMY_PETTING_SELECTOR_PUSSY_ID = 1504;
const SKILL_ENEMY_PETTING_SELECTOR_BUTT_ID = 1505;
const SKILL_ENEMY_PETTING_SELECTOR_BOOBS_AREA_ID = 1506;
const SKILL_ENEMY_PETTING_SELECTOR_NIPPLES_AREA_ID = 1507;
const SKILL_ENEMY_PETTING_SELECTOR_CLIT_AREA_ID = 1508;
const SKILL_ENEMY_PETTING_SELECTOR_PUSSY_AREA_ID = 1509;
const SKILL_ENEMY_PETTING_SELECTOR_BUTT_AREA_ID = 1510;
const SKILL_ENEMY_PETTING_SELECTOR_ANAL_AREA_ID = 1511;

const SKILL_ENEMY_KISS_ONE_ID = 1512;
const SKILL_ENEMY_KISS_TWO_ID = 1513;
const SKILL_ENEMY_PETTING_BOOBS_ID = 1517;
const SKILL_ENEMY_PETTING_NIPPLES_ID = 1518;
const SKILL_ENEMY_PETTING_CLIT_ID = 1519;
const SKILL_ENEMY_PETTING_PUSSY_ID = 1520;
const SKILL_ENEMY_PETTING_BUTT_ID = 1521;
const SKILL_ENEMY_PETTING_ANAL_ID = 1522;
const SKILL_ENEMY_TOY_INSERT_PINK_ROTOR_ID = 1523;
const SKILL_ENEMY_TOY_INSERT_PENIS_DILDO_ID = 1524;
const SKILL_ENEMY_TOY_INSERT_ANAL_BEADS_ID = 1525;
const SKILL_ENEMY_TOY_PLAY_PINK_ROTOR_ID = 1526;
const SKILL_ENEMY_TOY_PLAY_PENIS_DILDO_ID = 1527;
const SKILL_ENEMY_TOY_PLAY_ANAL_BEADS_ID = 1528;

const SKILL_ENEMY_KICKCOUNTER_CLIT_PETTING_ID = 1529;
const SKILL_ENEMY_SPANKING_SELECTOR_ID = 1530;
const SKILL_ENEMY_GET_FINGERS_SUCKED_ID = 1531;
const SKILL_VISITOR_HANDSHAKE_ID = 1532;
const SKILL_ENEMY_SPANKING_ONE_ID = 1533;
const SKILL_ENEMY_SPANKING_TWO_ID = 1534;
const SKILL_ENEMY_SPANKING_THREE_ID = 1535;


const SKILL_ENEMY_POSESTART_THUGGANGBANG_ID = 1601;
const SKILL_ENEMY_POSESTART_GOBLINCUNNI_ID = 1602;
const SKILL_ENEMY_POSESTART_STANDINGHJ_ID = 1603;
const SKILL_ENEMY_POSESTART_KNEELINGBJ_ID = 1604;
const SKILL_ENEMY_POSESTART_KICKCOUNTER_ID = 1605;
const SKILL_ENEMY_POSESTART_RIMJOB_ID = 1606;
const SKILL_ENEMY_POSESTART_LAYINGTF_ID = 1607;
const SKILL_ENEMY_POSESTART_FOOTJOB_ID = 1608;
const SKILL_ENEMY_POSESTART_SLIMEPILEDRIVER_ID = 1609;
const SKILL_ENEMY_POSESTART_GUARDGANGBANG_ID = 1610;

const SKILL_ENEMY_POSEJOIN_RIGHT_HAND_ID = 1701;
const SKILL_ENEMY_POSEJOIN_LEFT_HAND_ID = 1702;
const SKILL_ENEMY_POSEJOIN_MOUTH_ID = 1703;
const SKILL_ENEMY_POSEJOIN_ANAL_ID = 1704;
const SKILL_ENEMY_POSEJOIN_BOOBS_ID = 1705;
const SKILL_ENEMY_POSEJOIN_PUSSY_ID = 1706;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_MOUTH_ID = 1707;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_RIGHT_HJ_ID = 1708;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_LEFT_HJ_ID = 1709;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_OTHER1_ID = 1710;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_OTHER2_ID = 1711;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_OTHER3_ID = 1712;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV1_OTHER4_ID = 1713;
const SKILL_ENEMY_POSEJOIN_BARSEX_OTHER1_ID = 1714;
const SKILL_ENEMY_POSEJOIN_RANDOM_SELECTOR_ID = 1715;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_PUSSY_ID = 1716;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_ANAL_ID = 1717;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER1_ID = 1718;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER2_ID = 1719;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER3_ID = 1720;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER4_ID = 1721;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER1_SLIME_ID = 1722;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER2_SLIME_ID = 1723;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER3_SLIME_ID = 1724;
const SKILL_ENEMY_POSEJOIN_DEFEAT_LV2_OTHER4_SLIME_ID = 1725;
const SKILL_ENEMY_POSEJOIN_DEFEAT_GUARD_MOUTH_ID = 1726;
const SKILL_ENEMY_POSEJOIN_DEFEAT_GUARD_BOOBS_ID = 1727;
const SKILL_ENEMY_POSEJOIN_DEFEAT_GUARD_PUSSY_ID = 1728;
const SKILL_ENEMY_POSEJOIN_DEFEAT_GUARD_ANAL_ID = 1729;
const SKILL_ENEMY_POSEJOIN_RECEPTIONIST_CUNNI_ID = 1730;
const SKILL_ENEMY_POSEJOIN_RECEPTIONIST_PUSSY_ID = 1731;
const SKILL_ENEMY_POSEJOIN_RECEPTIONIST_ANAL_ID = 1732;
const SKILL_ENEMY_POSEJOIN_RECEPTIONIST_MOUTH_ID = 1733;
const SKILL_ENEMY_POSEJOIN_RECEPTIONIST_LEFT_HAND_ID = 1734;

const SKILL_KARRYN_INVITE_RIGHTHAND_ID = 1781;
const SKILL_KARRYN_INVITE_LEFTHAND_ID = 1782;
const SKILL_KARRYN_INVITE_MOUTH_ID = 1783;
const SKILL_KARRYN_INVITE_ANAL_ID = 1784;
const SKILL_KARRYN_INVITE_TITTYFUCK_ID = 1785;
const SKILL_KARRYN_INVITE_PUSSY_ID = 1786;

const SKILL_ENEMY_POSESKILL_ANAL_ID = 1801;
const SKILL_ENEMY_POSESKILL_MOUTH_ID = 1802;
const SKILL_ENEMY_POSESKILL_PUSSY_ID = 1803;
const SKILL_ENEMY_POSESKILL_RIGHTHAND_ID = 1804;
const SKILL_ENEMY_POSESKILL_LEFTHAND_ID = 1805;
const SKILL_ENEMY_POSESKILL_BOOBS_ID = 1806;
const SKILL_ENEMY_POSESKILL_CUNNI_ID = 1807;
const SKILL_ENEMY_POSESKILL_RIMJOB_ID = 1808;
const SKILL_ENEMY_POSESKILL_FOOTJOB_ID = 1809;
const SKILL_ENEMY_POSESKILL_TENTACLES_ID = 1810;
const SKILL_ENEMY_POSESKILL_SLIMEJOIN_MOUTH_ID = 1811;
const SKILL_ENEMY_POSESKILL_SLIMEJOIN_PUSSY_ID = 1812;
const SKILL_ENEMY_POSESWITCH_GOBLINCL_PUSSY_ID = 1813;


//////////////
/////////////////
// Game Battler
////////////////
////////////////

//////////////////
// Attack Skills Damage Formulas
/////////////////

//Formula
Game_Battler.prototype.dmgFormula_attackDmg = function(target, elementId, userStrMulti, userStrExtra, userDexMulti, userAgiMulti, targetStrMulti, stripMulti, stripSkill) {
	let targetElementRate = target.elementRate(elementId);
	let stanceDmgAdv = this.stanceDmgAdv(target, elementId);
	let stanceBonusRate = this.stanceBonusRate(elementId);
	
	let dmgValue = (this.str * userStrMulti + this.dex * userDexMulti + this.agi * userAgiMulti) * this.moddedWeaponAttack();
	dmgValue *= Math.max(0,(dmgValue / ((target.str * targetStrMulti) * target.moddedWeaponDefense())) - 0.5);
	dmgValue += this.str * userStrExtra;
	dmgValue *= targetElementRate * stanceDmgAdv * stanceBonusRate;
	
	if(target.isActor()) {
		target.calculateMasochismSensitivityRating();
		target.calculateSadismSensitivityRating();
		if(target.hasNoStamina() || target.isInDownPose()) dmgValue = 0;
		
		let targetStripRate = target.elementRate(ELEMENT_STRIP_ID);
		let clothingDmg = (this.str * userStrMulti + this.dex * userDexMulti + this.agi * userAgiMulti) * targetStripRate * stripMulti * this.moddedWeaponAttack();
		
		target.result().clothingDamage = clothingDmg;
		if(dmgValue > 0) {
			let percentOfDamage = target.getPercentOfStaminaFromValue(dmgValue, true);
			let pleasureDamage =  percentOfDamage * target.masochismSensitivity() * (1 + this.sadismLvl() * 0.1);
			pleasureDamage = Math.min(pleasureDamage, (target.end + target.str) * (1 + this.sadismLvl() * 0.1));
			if(pleasureDamage > 0) {
				target.result().pleasureDamage = pleasureDamage;
				target.addToActorMasochismPleasureRecord(pleasureDamage);
				target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_SADISM);
			}
			if(this.sadismLvl() > 1) {
				let pleasureFeedback = percentOfDamage * (1 + this.sadismLvl() * 0.1) * target.masochismSensitivity();
				if(pleasureFeedback > 0) {
					pleasureFeedback = Math.min(pleasureFeedback, (this.str + this.dex) / 2);
					target.result().pleasureFeedback = pleasureFeedback;
				}
			}
		}
		
		if(stripSkill) {
			if(target.isActor()) {
				target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_STRIP);
				//temp
				target.emoteMasterManager();
			}
			else if(this.isActor()) {
				this.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_STRIP);
				//temp
				this.emoteMasterManager();
			}
		}
	}
	//target is enemy, this is actor
	else {
		this.calculateMasochismSensitivityRating();
		this.calculateSadismSensitivityRating();
		let targetStripRate = this.elementRate(ELEMENT_STRIP_ID);
		let clothingDmg = (this.str * userStrMulti + this.dex * userDexMulti + this.agi * userAgiMulti) * targetStripRate * stripMulti;

		target.result().clothingDamage = clothingDmg;
		
		if(target.isEnemy() && target.hasMetalPrefix() && !Karryn.isInIgnoreMetalPropertiesPose()) {
			dmgValue = Math.random();
		}
		else if(dmgValue > 0) {
			let percentOfDamage = target.getPercentOfStaminaFromValue(dmgValue, true);
			let pleasureFeedback = percentOfDamage * this.sadismSensitivity() * (1 + target.masochismLvl() * 0.1);
			
			if(pleasureFeedback > 0) {
				pleasureFeedback = Math.min(pleasureFeedback, (this.str + this.dex) * (1 + target.masochismLvl() * 0.1));
				target.result().pleasureFeedback = pleasureFeedback;
				this.addToActorSadismPleasureRecord(pleasureFeedback);
				this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_SADISM);
			}
			if(target.masochismLvl() > 1) {
				let pleasureDamage =  percentOfDamage * (1 + target.masochismLvl() * 0.1) * this.sadismSensitivity();
				if(pleasureDamage > 0) {
					pleasureDamage = Math.min(pleasureDamage, (target.end + target.str) / 2);
					target.result().pleasureDamage = pleasureDamage;
				}
			}
		}
		
		target.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_ATTACK);
	}
	
	return Math.max(dmgValue,0);
};

////////////////
// Enemy Damage Formulas
//////////////

Game_Battler.prototype.dmgFormula_basicSlashDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, 1, 1, 1, 0, DEFAULT_DEF_STR_MULTI, 0.4);
};
Game_Battler.prototype.dmgFormula_basicPierceDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, 1, 1, 0, 1, DEFAULT_DEF_STR_MULTI, 0.2);
};
Game_Battler.prototype.dmgFormula_basicBluntDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 1.8, 1.2, 0, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};
Game_Battler.prototype.dmgFormula_advanceSlashDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, 1.2, 1.2, 1.4, 0, DEFAULT_DEF_STR_MULTI, 0.4);
};
Game_Battler.prototype.dmgFormula_advancePierceDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, 1.2, 1.2, 0, 1.4, DEFAULT_DEF_STR_MULTI, 0.2);
};
Game_Battler.prototype.dmgFormula_advanceBluntDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 2.2, 1.4, 0, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};
Game_Battler.prototype.dmgFormula_weakSlashDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, 0.8, 0.75, 0.9, 0, DEFAULT_DEF_STR_MULTI, 0.4);
};
Game_Battler.prototype.dmgFormula_weakPierceDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, 0.8, 0.75, 0, 0.9, DEFAULT_DEF_STR_MULTI, 0.2);
};
Game_Battler.prototype.dmgFormula_weakBluntDmg = function(target) {
	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 1.6, 1, 0, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};

////////////////
// Karryn Damage Formulas
//////////////

Game_Battler.prototype.dmgFormula_karrynSlash = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainStrengthExp(10, target.enemyExperienceLvl());
	this.gainDexterityExp(80, target.enemyExperienceLvl());
	
	var heartEffectDamage = 1;
	if(this.isEquippingThisAccessory(NECKLACE_HEART_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		heartEffectDamage = 1.15;
	}
	
	let strMulti = 1;
	
	let dexMulti = 0.7;
	if(this.hasEdict(EDICT_SLASH_TRAINING_THREE)) dexMulti += 0.2;
	
	let agiMulti = 0;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, strMulti, 1, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.1) * heartEffectDamage;
};

Game_Actor.prototype.afterEval_karrynSlash = function(target) {
	let vulChance = 0;
	if(this.isEquippingThisAccessory(NECKLACE_SPADE_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		this.addState(STATE_BONUS_PIERCE_DMG_ID);
		if(!target.result().evaded) {
			if(target.result().missed) vulChance += 0.1;
			else vulChance += 0.5;
		}
	}
	if(target.result().evaded) vulChance = 0;
	if(Math.random() < vulChance) 
		target.addState(STATE_VULNERABLE_ID);
	
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordSlashAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Battler.prototype.dmgFormula_karrynThrust = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainStrengthExp(10, target.enemyExperienceLvl());
	this.gainAgilityExp(80, target.enemyExperienceLvl());
	
	let heartEffectDamage = 1;
	if(this.isEquippingThisAccessory(NECKLACE_HEART_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		heartEffectDamage = 1.15;
	}
	
	var cloverEffectDamage = 1;
	if(this.isEquippingThisAccessory(NECKLACE_CLOVER_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		if(Math.random() < 0.25) cloverEffectDamage = 2;
	}
	
	let strMulti = 1;
	
	let dexMulti = 0;
	
	let agiMulti = 0.7;
	if(this.hasEdict(EDICT_THRUST_TRAINING_THREE)) agiMulti += 0.15;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, strMulti, 1, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.12) * heartEffectDamage * cloverEffectDamage;
};

Game_Actor.prototype.afterEval_karrynThrust = function() {
	if(this.isEquippingThisAccessory(NECKLACE_CLOVER_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		this.addState(STATE_BONUS_BLUNT_DMG_ID);
	}
	
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordPierceAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Battler.prototype.dmgFormula_karrynStrike = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainStrengthExp(90, target.enemyExperienceLvl());
	
	let heartEffectDamage = 1;
	if(this.isEquippingThisAccessory(NECKLACE_HEART_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		heartEffectDamage = 1.15;
	}
	
	let strMulti = 2;
	if(this.hasEdict(EDICT_STRIKE_TRAINING_THREE)) strMulti += 0.3;
	
	let dexMulti = 0;
	
	let agiMulti = 0;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, strMulti, strMulti*0.6, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.08) * heartEffectDamage;
};

Game_Actor.prototype.afterEval_karrynStrike = function(target) {
	let stunChance = 0;
	if(this.isEquippingThisAccessory(NECKLACE_DIAMOND_ID) || this.isEquippingThisAccessory(NECKLACE_JOKER_ID)) {
		this.addState(STATE_BONUS_SLASH_DMG_ID);
		if(!target.result().evaded) {
			if(target.result().missed) stunChance += 0.1;
			else stunChance += 0.5;
		}
	}
	stunChance += this.titleStunningWarden_stunChance();
	if(target.result().evaded) stunChance = 0;
	if(stunChance > 0 && Math.random() < stunChance) target.addState(STATE_STUNNED_ID);
	
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordBluntAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Battler.prototype.dmgFormula_karrynArmSlash = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainDexterityExp(100, target.enemyExperienceLvl());
	
	let strMulti = 0.8;
	
	let dexMulti = 0.8;
	if(this.hasEdict(EDICT_SLASH_TRAINING_THREE)) dexMulti += 0.2;
	
	let agiMulti = 0;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, strMulti, 0.5, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.09);
};
Game_Actor.prototype.afterEval_karrynArmSlash = function(target) {
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordSlashAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Actor.prototype.cooldownEval_karrynArmSlash = function() {
	let cd = 2;
	if(this.isUsingThisTitle(TITLE_ID_SLASH_THREE)) cd--;
	return Math.max(1, cd);
};

Game_Battler.prototype.dmgFormula_karrynLegThrust = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainAgilityExp(100, target.enemyExperienceLvl());
	
	let strMulti = 0.8;
	
	let dexMulti = 0;
	
	let agiMulti = 0.8;
	if(this.hasEdict(EDICT_THRUST_TRAINING_THREE)) agiMulti += 0.2;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, strMulti, 0.5, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.11);
};
Game_Actor.prototype.afterEval_karrynLegThrust = function(target) {
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordPierceAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Actor.prototype.cooldownEval_karrynLegThrust = function() {
	let cd = 2;
	if(this.isUsingThisTitle(TITLE_ID_PIERCE_THREE)) cd--;
	return Math.max(1, cd);
};

Game_Battler.prototype.dmgFormula_karrynHeadStrike = function(target) {
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainStrengthExp(100, target.enemyExperienceLvl());
	
	
	let strMulti = 1.85;
	if(this.hasEdict(EDICT_STRIKE_TRAINING_THREE)) strMulti += 0.3;
	
	let dexMulti = 0;
	
	let agiMulti = 0;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, strMulti, strMulti*0.5, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.07);
};
Game_Actor.prototype.afterEval_karrynHeadStrike = function(target) {
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordBluntAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Actor.prototype.cooldownEval_karrynHeadStrike = function() {
	let cd = 2;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_THREE)) cd--;
	return Math.max(1, cd);
};

Game_Battler.prototype.dmgFormula_karrynCleave = function(target) {
	target.addState(STATE_CLEAVED_ID);
	if(target.isSlimeType) target.addAngryState();
	
	this.gainStaminaExp(40, target.enemyExperienceLvl());
	this.gainStrengthExp(20, target.enemyExperienceLvl());
	this.gainDexterityExp(140, target.enemyExperienceLvl());	
		
	let strMulti = 0.7;
	
	let dexMulti = 1.2;
	if(this.hasEdict(EDICT_CLEAVE_TRAINING_TWO)) dexMulti += 0.4;
	
	let agiMulti = 0;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_SLASH_ID, strMulti, 1, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.1);
};

Game_Actor.prototype.afterEval_karrynCleave = function(target) {
	if(this.isEquippingThisAccessory(NECKLACE_GOLD_ID)) {
		if(!target.result().evaded && !target.result().missed) {
			target.addState(STATE_OFFBALANCE_ID);
		}
	}	
};

Game_Actor.prototype.cooldownEval_karrynCleave = function() {
	let cd = 3;
	if(this.isUsingThisTitle(TITLE_ID_SLASH_THREE)) cd--;
	return Math.max(1, cd);
};

Game_Actor.prototype.finishAction_karrynCleave = function() {
	BattleManager.removeImmortalStateFromEveryone();
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordSlashAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Battler.prototype.dmgFormula_karrynSkewer = function(target) {
	target.addState(STATE_SKEWERED_ID);
	if(target.isSlimeType) target.addAngryState();
	
	this.gainStaminaExp(40, target.enemyExperienceLvl());
	this.gainStrengthExp(20, target.enemyExperienceLvl());
	this.gainAgilityExp(140, target.enemyExperienceLvl());
	
	let strMulti = 0.6;
	
	let dexMulti = 0;
	
	let agiMulti = 1.1;
	
	return this.dmgFormula_attackDmg(target, ELEMENT_PIERCE_ID, strMulti, 0.5, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.12);
};

Game_Actor.prototype.cooldownEval_karrynSkewer = function() {
	let cd = 3;
	if(this.isUsingThisTitle(TITLE_ID_PIERCE_THREE)) cd--;
	return Math.max(1, cd);
};


Game_Actor.prototype.beforeEval_karrynSkewer = function() {
	this._isCurrentlyUsingSkewer = true;
};

Game_Actor.prototype.finishAction_karrynSkewer = function() {
	BattleManager.removeImmortalStateFromEveryone();
	if(this.isEquippingThisAccessory(NECKLACE_RUBY_ID)) {
		this.addState(STATE_BONUS_CRIT_CHANCE_ID);
	}	
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordPierceAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
	
	this._isCurrentlyUsingSkewer = false;
	this.checkForOrgasm();
};

Game_Battler.prototype.dmgFormula_karrynSlam = function(target) {
	target.addState(STATE_SLAMMED_ID);
	if(target.isSlimeType) target.addAngryState();
	
	this.gainStaminaExp(40, target.enemyExperienceLvl());
	this.gainStrengthExp(160, target.enemyExperienceLvl());
	
	var slamEffectDamage = 1;
	if(this.isEquippingThisAccessory(NECKLACE_PLATINUM_ID)) {
		var slamEffect = $gameTroop.slamPushDownOneSpot(target);
		if(!slamEffect) {
			slamEffectDamage = 1.15;
			var nextEnemy = $gameTroop.nextEnemySpotIsOccupied(target);
			if(nextEnemy) nextEnemy.addState(STATE_VULNERABLE_ID);
		}
	}
	
	var strMulti = 2.2;
	if(this.hasEdict(EDICT_SLAM_TRAINING_THREE)) strMulti += 0.8;
	else if(this.hasEdict(EDICT_SLAM_TRAINING_TWO)) strMulti += 0.4;
	
	var dexMulti = 0;
	
	var agiMulti = 0;

	return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, strMulti, strMulti*0.75, dexMulti, agiMulti, DEFAULT_DEF_STR_MULTI, 0.08) * slamEffectDamage;
};
Game_Actor.prototype.afterEval_karrynSlam = function(target) {
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordBluntAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

Game_Actor.prototype.cooldownEval_karrynSlam = function() {
	let cd = 3;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_THREE)) cd--;
	return Math.max(1, cd);
};

//////////////
// Attack Skill Costs
/////////////////

Game_Battler.prototype.skillAttack_staminaCost = function(baseCost, strMultipler, dexMultipler, agiMultipler) {
	let cost = baseCost + this.str * strMultipler + this.dex * dexMultipler + this.agi * agiMultipler;
	cost *= this.asc;
	
	return Math.round(cost);
};

//Str multi 0.5
Game_Battler.prototype.skillCost_karrynBasicAttack = function() {
	return this.skillAttack_staminaCost(50, 0.5);
};

Game_Battler.prototype.skillCost_karrynSlash = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.2, 0.3, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_SLASH_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynThrust = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.2, 0, 0.3);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_PIERCE_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynStrike = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.5, 0, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};

Game_Battler.prototype.skillCost_karrynArmSlash = function() {
	let staminaCost = this.skillAttack_staminaCost(40, 0.25, 0.45, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_SLASH_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynLegThrust = function() {
	let staminaCost = this.skillAttack_staminaCost(40, 0.25, 0, 0.45);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_PIERCE_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynHeadStrike = function() {
	let staminaCost = this.skillAttack_staminaCost(40, 0.7, 0, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};

Game_Battler.prototype.skillCost_karrynCleave = function() {
	let staminaCost = this.skillAttack_staminaCost(60, 0.3, .75, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_SLASH_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynSkewer = function() {
	let staminaCost = this.skillAttack_staminaCost(60, 0.3, 0, .75);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_PIERCE_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};
Game_Battler.prototype.skillCost_karrynSlam = function() {
	let staminaCost = this.skillAttack_staminaCost(60, 1.2, 0, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};

Game_Battler.prototype.skillCost_karrynCounterSlash = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.2, 0.3, 0);
	let multipler = 0.6;
	if(this.hasThisTitle(TITLE_ID_COUNTERATTACK_ONE)) multipler -= 0.09;
	if(this.isUsingThisTitle(TITLE_ID_COUNTERATTACK_THREE)) multipler -= 0.45;
	else if(this.isUsingThisTitle(TITLE_ID_SLASH_TWO)) multipler -= 0.2;
	return Math.max(0, Math.round(staminaCost * multipler));
};
Game_Battler.prototype.skillCost_karrynCounterThrust = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.2, 0, 0.3);
	let multipler = 0.6;
	if(this.hasThisTitle(TITLE_ID_COUNTERATTACK_ONE)) multipler -= 0.09;
	if(this.isUsingThisTitle(TITLE_ID_COUNTERATTACK_THREE)) multipler -= 0.45;
	else if(this.isUsingThisTitle(TITLE_ID_PIERCE_TWO)) multipler -= 0.2;
	return Math.max(0, Math.round(staminaCost * multipler));
};
Game_Battler.prototype.skillCost_karrynCounterStrike = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.5, 0, 0);
	let multipler = 0.6;
	if(this.hasThisTitle(TITLE_ID_COUNTERATTACK_ONE)) multipler -= 0.09;
	if(this.isUsingThisTitle(TITLE_ID_COUNTERATTACK_THREE)) multipler -= 0.45;
	else if(this.isUsingThisTitle(TITLE_ID_BLUNT_TWO)) multipler -= 0.2;
	return Math.max(0, Math.round(staminaCost * multipler));
};

/////////////
////////////////
// Game Actor
///////////////
////////////

///////
// Cock Kick
///////

Game_Actor.prototype.showEval_karrynCockKick = function() {
	return this.hasPassive(PASSIVE_SUBDUED_ERECT_COUNT_TWO_ID);
};

Game_Battler.prototype.skillCost_karrynCockKick = function() {
	let staminaCost = this.skillAttack_staminaCost(50, 0.8, 0.4, 0);
	let multipler = 1;
	if(this.isUsingThisTitle(TITLE_ID_BLUNT_TWO)) multipler -= 0.33;
	return Math.round(staminaCost * multipler);
};

Game_Battler.prototype.dmgFormula_karrynCockKick = function(target) {
	let ineffectiveEnemyType = target.isSlimeType;
	
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainStrengthExp(30, target.enemyExperienceLvl());
	this.gainDexterityExp(20, target.enemyExperienceLvl());
	
	//return 1;
	
	if(ineffectiveEnemyType)
		return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 1.4, 0.6, 0.2, 0, DEFAULT_DEF_STR_MULTI, 0.1);
	else if(target.isErect)
		return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 2.2, 1, 0.4, 0, 0.4, 0.1);
	else
		return this.dmgFormula_attackDmg(target, ELEMENT_BLUNT_ID, 2, 1, 0.3, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};

Game_Actor.prototype.beforeEval_karrynCockKick = function(target) {
	let ineffectiveEnemyType = target.isSlimeType;
	
	this.addState(STATE_USE_UNARMED_MODIFERS_ID);
	
	if(ineffectiveEnemyType) {
		BattleManager._logWindow.push('addText', TextManager.NotEffectiveText);
	}
	else if(target.isErect) {
		this.addState(STATE_COCK_KICK_CRIT_BONUS_ID);
		BattleManager._logWindow.push('addText', TextManager.SuperEffectiveText);
	}
};
Game_Actor.prototype.afterEval_karrynCockKick = function(target) {
	this.addCockinessFromCockKicking();
	this.addToCockKickUsageCountRecord();
	this.removeState(STATE_COCK_KICK_CRIT_BONUS_ID);
	this.removeState(STATE_USE_UNARMED_MODIFERS_ID);
	if(target.masochismLvl() <= 1) {
		target.addAngryState();
	}
	if(this.hasPassive(PASSIVE_COCKKICK_COUNT_THREE_ID)) {
		this.gainCockDesire(3);
		if(Math.randomInt(10) < this.sadismLvl()) this.addHornyState();
	}
	
	this.passivePostAttack_addOffBalanceEffect(1);
	this._playthroughRecordKickAttackUsage++;
	this._playthroughRecordActiveAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};

////////////
// Escape
/////////

Game_Actor.prototype.canEscape = function() {
	//if(Prison.hardMode()) return false;
	//return (this.energy > 0 && !this.isInSexPose() && !this.isInDownPose() && !this._cantEscapeFlag);
	return (this.isInCombatPose() && !this._cantEscapeFlag && this.getFatigueLevel() <= 3);
};

Game_Actor.prototype.turnOnCantEscapeFlag = function() {
	this._cantEscapeFlag = true;
};
Game_Actor.prototype.turnOffCantEscapeFlag = function() {
	this._cantEscapeFlag = false;
};

//////
// Fallen

Game_Actor.prototype.addFallenState = function() {
	this.removeState(STATE_OFFBALANCE_ID);
	if(!this.isStateAffected(STATE_FALLEN_ID)) {
		this.addToActorDebuffFallenRecord();
		this.addState(STATE_FALLEN_ID);
		this.passiveFallenState_addHornyEffect();
	}
};

/////////
// Off Balance

Game_Actor.prototype.addOffBalanceState = function(offset, needsMessage) {
	if(!this.isOffBalance) {
		this.addState(STATE_OFFBALANCE_ID);
		this.increaseOffBalanceStateTurns(this.passiveOffBalanceStateAddTurns() + offset);
		this.addToActorDebuffOffBalancedRecord();
		
		if(needsMessage) {
			SceneManager._scene._logWindow.displayAffectedStatus(this);
		}
	}
};

Game_Actor.prototype.addOffBalanceState_changableToFallen = function(offset, needsMessage) {
	if(this.isOffBalance) {
		this.addFallenState();
	}
	else 
		this.addOffBalanceState(offset, needsMessage);
	
	if(needsMessage) {
		SceneManager._scene._logWindow.displayAffectedStatus(this);
	}
};

Game_Actor.prototype.getOffBalanceStateTurns = function() {
	return this.stateTurns(STATE_OFFBALANCE_ID);
};
Game_Actor.prototype.increaseOffBalanceStateTurns = function(value) {
	this.setStateTurns(STATE_OFFBALANCE_ID, this.getOffBalanceStateTurns() + value);
};

///////
// Disarm
/////////

Game_Actor.prototype.addDisarmedState = function(addRecord) {
	if(!this.hasDisarmedState()) {
		this.addState(STATE_DISARMED_ID);
		if(addRecord) this.addToActorDebuffDisarmedRecord();
	}
};

Game_Actor.prototype.hasDisarmedState = function() {
	return this.isStateAffected(STATE_DISARMED_ID);
};
Game_Actor.prototype.getDisarmedStateTurns = function() {
	return this.stateTurns(STATE_DISARMED_ID);
};
Game_Actor.prototype.increaseDisarmedStateTurns = function(value) {
	this.setStateTurns(STATE_DISARMED_ID, this.getDisarmedStateTurns() + value);
};

Game_Actor.prototype.checkDisarmStateAtTurnEnd = function() {
	if(this.hasDisarmedState() && !this.isInCombatPose()) {
		this.increaseDisarmedStateTurns(1);
	}
};

Game_Actor.prototype.showEval_pickUpHalberd = function() {
	return this.hasDisarmedState() && this.getDisarmedStateTurns() <= 2;
};
Game_Actor.prototype.showEval_getCloserToHalberd = function() {
	return this.hasDisarmedState() && this.getDisarmedStateTurns() > 2;
};
Game_Actor.prototype.afterEval_getCloserToHalberd = function(target) {
	this.increaseDisarmedStateTurns(-2);
};

/////////////
// Combat Show Eval
///////////////

Game_Actor.prototype.showEval_halberdSkills = function() {
	return this.isUsingHalberd();
};

Game_Actor.prototype.showEval_unarmedSkills = function() {
	return this.isInUnarmedPose();
};

//AoE
Game_Actor.prototype.showEval_cleaveOne = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_CLEAVE_TRAINING_ONE) && !this.hasEdict(EDICT_CLEAVE_TRAINING_THREE);
};
Game_Actor.prototype.showEval_cleaveTwo = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_CLEAVE_TRAINING_THREE);
};
Game_Actor.prototype.showEval_slamOne = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_SLAM_TRAINING_ONE) && !this.hasEdict(EDICT_SLAM_TRAINING_THREE);
};
Game_Actor.prototype.showEval_slamTwo = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_SLAM_TRAINING_THREE);
};
Game_Actor.prototype.showEval_skewerOne = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_SKEWER_TRAINING_ONE) && !this.hasEdict(EDICT_SKEWER_TRAINING_THREE);
};
Game_Actor.prototype.showEval_skewerTwo = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_SKEWER_TRAINING_THREE);
};

Game_Actor.prototype.showEval_emptySlam = function() {
	return this.showEval_halberdSkills() && !this.showEval_slamOne() && !this.showEval_slamTwo() && 
	(this.showEval_cleaveOne() || this.showEval_cleaveTwo() || 
	this.showEval_skewerOne() || this.showEval_skewerTwo());
};
Game_Actor.prototype.showEval_emptyCleave = function() {
	return this.showEval_halberdSkills() && !this.showEval_cleaveOne() && !this.showEval_cleaveTwo() && 
	(this.showEval_slamOne() || this.showEval_slamTwo() || 
	this.showEval_skewerOne() || this.showEval_skewerTwo());
};
Game_Actor.prototype.showEval_emptySkewer = function() {
	return this.showEval_halberdSkills() && !this.showEval_skewerOne() && !this.showEval_skewerTwo() && 
	(this.showEval_slamOne() || this.showEval_slamTwo() || 
	this.showEval_cleaveOne() || this.showEval_cleaveTwo());
};

//Debuffing Halberd attacks
Game_Actor.prototype.showEval_headStrike = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_STRIKE_TRAINING_TWO);
};
Game_Actor.prototype.showEval_armSlash = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_SLASH_TRAINING_TWO);
};
Game_Actor.prototype.showEval_legThrust = function() {
	return this.showEval_halberdSkills() && this.hasEdict(EDICT_THRUST_TRAINING_TWO);
};

Game_Actor.prototype.showEval_emptyHeadStrike = function() {
	return this.showEval_halberdSkills() && !this.showEval_headStrike() && 
	(this.showEval_armSlash() || this.showEval_legThrust());
};
Game_Actor.prototype.showEval_emptyArmSlash = function() {
	return this.showEval_halberdSkills() && !this.showEval_armSlash() && 
	(this.showEval_headStrike() || this.showEval_legThrust());
};
Game_Actor.prototype.showEval_emptyLegThrust = function() {
	return this.showEval_halberdSkills() && !this.showEval_legThrust() && 
	(this.showEval_armSlash() || this.showEval_headStrike());
};

////////
// Counter Damage

Game_Actor.prototype.counterattackDamageMultipler = function() {
	let multipler = 0.8;
	if(this.hasThisTitle(TITLE_ID_COUNTERATTACK_TWO)) multipler += 0.04;
	if(this.isUsingThisTitle(TITLE_ID_COUNTERATTACK_ONE)) multipler += 0.28;
	return multipler;
};

//////////
// Aftereval Record

Game_Actor.prototype.afterEval_karrynKickAttack = function(target) {
	this._playthroughRecordKickAttackUsage++;
};
Game_Actor.prototype.afterEval_karrynCounterAttack = function(target) {
	this._playthroughRecordCounterAttackUsage++;
	this._playthroughRecordTotalAttackUsage++;
};


////////////
// Counter Condition
/////////////////

//EVAL: Defender.function()
Game_Actor.prototype.counterEval_halberdSlash = function(attacker) {
	return attacker.isBluntStance() && this.showEval_halberdSkills();
};
Game_Actor.prototype.counterEval_halberdThrust = function(attacker) {
	return attacker.isSlashStance() && this.showEval_halberdSkills();
};
Game_Actor.prototype.counterEval_halberdStrike = function(attacker) {
	return attacker.isPierceStance() && this.showEval_halberdSkills();
};
Game_Actor.prototype.counterEval_kickSlash = function(attacker) {
	return attacker.isBluntStance() && this.showEval_unarmedSkills();
};
Game_Actor.prototype.counterEval_kickThrust = function(attacker) {
	return attacker.isSlashStance() && this.showEval_unarmedSkills();
};
Game_Actor.prototype.counterEval_kickStrike = function(attacker) {
	return attacker.isPierceStance() && this.showEval_unarmedSkills();
};

////////////
// Game Action
//////////////

//For Skewer
Game_Action.prototype.getRandomTargets = function(number, unit) {
	let targets = [];
	for (let i = 0; i < number; ++i) {
		if(this.item().id === SKILL_SKEWER_ID) {
			targets.push(unit.randomSkewerTarget());
		}
		else 
			targets.push(unit.randomTarget());
	}
	return targets;
};

//For Skewer
Remtairy.Combat.Game_Action_numTargets = Game_Action.prototype.numTargets;
Game_Action.prototype.numTargets = function() {
    if (this.isForRandom()) {
		if(this.item().id === SKILL_SKEWER_ID) {
			let numOfHits = 1;
			if($gameActors.actor(ACTOR_KARRYN_ID).hasEdict(EDICT_SKEWER_TRAINING_THREE)) {
				numOfHits++;
				if(Math.random() < 0.35) numOfHits++
			}
			else if($gameActors.actor(ACTOR_KARRYN_ID).hasEdict(EDICT_SKEWER_TRAINING_TWO)) {
				if(Math.random() < 0.75) numOfHits++
			}
			if($gameActors.actor(ACTOR_KARRYN_ID).isEquippingThisAccessory(NECKLACE_RUBY_ID)) {
				numOfHits++;
			}	
			return numOfHits;
		}
		else return this.item().randomTargets;
	}
    return Remtairy.Combat.Game_Action_numTargets.call(this);
};

/////////
// Enemy Attacks
/////////////

Game_Battler.prototype.dmgFormula_thugRush = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 1.2, 1.2, 0.1, 0.1, DEFAULT_DEF_STR_MULTI, 0.15);
};

Game_Battler.prototype.finishAction_thugRush = function(target) {
	if(!target) target = $gameActors.actor(ACTOR_KARRYN_ID);
	if(!target.isGuarding) {
		target.addOffBalanceState_changableToFallen(0, false);
		SceneManager._scene._logWindow.displayAffectedStatus(target);
	}
};

Game_Battler.prototype.dmgFormula_goblinBowling = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 0.8, 1.2, 0, 1.4, DEFAULT_DEF_STR_MULTI, 0.2);
};

Game_Battler.prototype.afterEval_goblinBowling = function(target) {
	if(!target.isGuarding && !target.result().evaded) {
		if(target.isOffBalance) {
			target.addFallenState();
		}
		else if(target.result().hpDamage > 0){
			if(target.result().missed) 
				target.addOffBalanceState_changableToFallen(0, false);
			else
				target.addFallenState();
		}
	}
};

Game_Battler.prototype.dmgFormula_tonkinTackle = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 1.6, 1.2, 0, 0, DEFAULT_DEF_STR_MULTI, 0.042);
};

Game_Battler.prototype.afterEval_tonkinTackle = function(target) {
	if(!target.isGuarding && !target.result().evaded) {
		if(target.isOffBalance) {
			target.addFallenState();
		}
		else if(target.result().hpDamage > 0){
			if(target.result().missed) 
				target.addOffBalanceState_changableToFallen(1, false);
			else
				target.addFallenState();
		}
	}
};

Game_Battler.prototype.dmgFormula_rogueTrip = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 1.6, 1.2, 0.4, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};

Game_Battler.prototype.afterEval_rogueTrip = function(target) {
	if(!target.isGuarding && !target.result().evaded) {
		if(target.isOffBalance) {
			target.addFallenState();
		}
		else if(target.result().hpDamage > 0){
			target.addFallenState();
		}
	}
};

Game_Battler.prototype.customReq_rogueDisarm = function(target) {
	return target.hasHalberd() && this.canAttack(target);
};

Game_Battler.prototype.dmgFormula_rogueDisarm = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 1, 0.8, 1.4, 0, DEFAULT_DEF_STR_MULTI, 0.1);
};

Game_Battler.prototype.afterEval_rogueDisarm = function(target) {
	if(!target.isGuarding && !target.result().evaded && target.hasHalberd()) {
		target.addDisarmedState(true);
		if(!target.result().missed) 
			target.increaseDisarmedStateTurns(1);
	}
};

Game_Battler.prototype.customReq_nerdExpose = function(target) {
	return !target.isStateAffected(STATE_WEAKNESS_EXPOSED_ID) && 
	(target.hasEdict(EDICT_PUBLISH_RESISTS) || target.hasEdict(EDICT_PUBLISH_SENSITIVITIES));
};

Game_Battler.prototype.afterEval_cargillDebuff = function(target) {
	if(!target.isGuarding && !target.result().evaded) {
		let addStateArray = [];
		if(!target.isHorny) addStateArray.push(STATE_HORNY_ID);
		
		if(!target.isInSexPose()) {
			if(!target.isStateAffected(STATE_WEAKEN_ID)) addStateArray.push(STATE_WEAKEN_ID);
			if(!target.isStateAffected(STATE_POISON_ID)) addStateArray.push(STATE_POISON_ID);	
		}
		
		if(addStateArray.length === 0) {
			target.addHornyState();
		}
		else {
			let stateToAdd = addStateArray[Math.randomInt(addStateArray.length)];
			if(stateToAdd === STATE_HORNY_ID) {
				target.addHornyState();
			}
			else {
				target.addState(stateToAdd);
			}
		}
	}
};

//Clothes Pull
Game_Battler.prototype.customReq_clothesPull = function(target) {
	return !target.isClothingMaxDamaged() && DEBUG_MODE;
};
Game_Battler.prototype.dmgFormula_clothesPull = function(target) {
	let elementType = this.getStance();
	return this.dmgFormula_attackDmg(target, elementType, 0.3, 0.5, 0.5, 0.3, DEFAULT_DEF_STR_MULTI, 1, true);
};

//Weapon Kick
Game_Battler.prototype.customReq_downWeaponKick = function(target) {
	return target.isInDownPose() && target.hasHalberd();
};
Game_Battler.prototype.afterEval_downWeaponKick = function(target) {
	target.addDisarmedState(false);
	target.increaseDisarmedStateTurns(1);
	if(Math.random() < 0.5) target.increaseDisarmedStateTurns(1);
};

Game_Battler.prototype.customReq_disarmedWeaponKick = function(target) {
	return target.hasDisarmedState() && target.getDisarmedStateTurns() <= 3;
};
Game_Battler.prototype.afterEval_disarmedWeaponKickWeak = function(target) {
	target.increaseDisarmedStateTurns(2);
};

Game_Battler.prototype.afterEval_reviveEnemy = function(target) {
	target._performingCollapse = false;
};

////////////////
// Game Troop
////////////////

Game_Troop.prototype.slamPushDownOneSpot = function(enemy) {
	let spotId = enemy._enemySpotsId;
	let nextSpotId = spotId + 1;
	
	if(nextSpotId === this._enemySpots.length || (this._enemySpots[nextSpotId] && this._enemySpots[nextSpotId].isAlive())) return false;

	enemy._enemySpotsId = nextSpotId;
    enemy._screenY = ENEMY_NAME_STARTING_Y + ENEMY_NAME_HEIGHT_SPACING * enemy._enemySpotsId;
	enemy._spriteEnemy._homeY = enemy._screenY;
	enemy._spriteEnemy.updatePosition();
	
	var oldSpot = this._enemySpots[nextSpotId];
	this._enemySpots[nextSpotId] = enemy;
	this._enemySpots[spotId] = oldSpot;
	
	if(oldSpot) {
		oldSpot._enemySpotsId = spotId;
		oldSpot._screenY = ENEMY_NAME_STARTING_Y + ENEMY_NAME_HEIGHT_SPACING * spotId._enemySpotsId;
		oldSpot._spriteEnemy._homeY = spotId._screenY;
		oldSpot._spriteEnemy.updatePosition();
	}
	
	return true;
};

Game_Troop.prototype.nextEnemySpotIsOccupied = function(enemy) {
	let spotId = enemy._enemySpotsId;
	let nextSpotId = spotId + 1;
	
	if(nextSpotId === this._enemySpots.length || !this._enemySpots[nextSpotId]) return false;
	if(this._enemySpots[nextSpotId].isAlive()) {
		return this._enemySpots[nextSpotId];
	}
	else return false;
};

//////////////
/////////////////
// Window ActorCommand
// Battle Skill Menu
//////////////////
////////////////

//TextManager + Skills
Window_ActorCommand.prototype.addSkillCommands = function() {
    var skillTypes = this._actor.addedSkillTypes();
    skillTypes.sort(function(a, b){return a-b});
    skillTypes.forEach(function(stypeId) {
		if(stypeId === SKILLTYPE_EDICTS_ID || stypeId === SKILLTYPE_TALK_ID || stypeId === SKILLTYPE_SIGHT_ID || stypeId === SKILLTYPE_BUFFS_ID || stypeId === SKILLTYPE_DEBUFFS_ID || stypeId === SKILLTYPE_PASSIVES_ID) return;
		
		
		if($gameVariables.value(VARIABLE_PROLOGUE_PROGRESS_ID) === 5 && !$gameSwitches.value(SWITCH_PROLOGUE_ENDED)) {
			if(stypeId === SKILLTYPE_SEXUAL_ID || stypeId === SKILLTYPE_ENERGY_ID) return;
		}
		
		if(this._actor.isInMasturbationPose() && stypeId !== SKILLTYPE_MASTURBATE_ID) {
			return;
		}
		else if(!this._actor.isInMasturbationPose() && stypeId === SKILLTYPE_MASTURBATE_ID) {
			return;
		}
		
		if(this._actor.actionPhase) {
			if(stypeId === SKILLTYPE_WILLPOWER_ID) 
				return;
			if(stypeId === SKILLTYPE_ATTACK_ID && !this._actor.isInCombatPose())
				return;
			if(stypeId === SKILLTYPE_SEXUAL_ID && (this._actor.justOrgasmed() || !DEBUG_MODE))
				return;
			if(stypeId === SKILLTYPE_OFFBALANCE_ID && (!this._actor.isInCombatPose() || !this._actor.isOffBalance))
				return;
			if(stypeId === SKILLTYPE_FALLEN_ID && !this._actor.isInDownFallDownPose())
				return;
			if(this._actor.isInDownFallDownPose() && stypeId !== SKILLTYPE_FALLEN_ID)
				return;
			if(stypeId === SKILLTYPE_DISARMED_ID && 
			(!this._actor.isInCombatPose() || !this._actor.hasDisarmedState()))
				return;
			
			if($gameParty.isInWaitressBattle) {
				if(stypeId === SKILLTYPE_WAITRESS_ID) {
					if(!this._actor.isInWaitressServingPose()) return;
				}
				else if(stypeId === SKILLTYPE_BARTENDER_ID && this._actor.isInWaitressServingPose()) {
					if(this._actor._barLocation !== BAR_LOCATION_STANDBY) return;
				}
				else if(stypeId === SKILLTYPE_SEXUAL_ID || stypeId === SKILLTYPE_ENERGY_ID) {
					if(!this._actor.isInWaitressSexPose()) return;
				}
				else return;
			}
			else {
				if(stypeId === SKILLTYPE_BARTENDER_ID || stypeId === SKILLTYPE_WAITRESS_ID)
					return;
			}
			
			
			if(this._actor.isInReceptionistPose()) {
				if(stypeId === SKILLTYPE_SEXUAL_ID || stypeId === SKILLTYPE_ENERGY_ID)
					return;
			}
			else {
				if(stypeId === SKILLTYPE_RECEPTIONIST_ID)
					return;
			}
		}
		//Mental Phase
		else {
			if(stypeId === SKILLTYPE_ATTACK_ID || stypeId === SKILLTYPE_ENERGY_ID || stypeId === SKILLTYPE_SEXUAL_ID || stypeId === SKILLTYPE_MASTURBATE_ID) 
				return;
			if(stypeId === SKILLTYPE_OFFBALANCE_ID || stypeId === SKILLTYPE_FALLEN_ID || stypeId === SKILLTYPE_DISARMED_ID)
				return;
			if(stypeId === SKILLTYPE_WAITRESS_ID || stypeId === SKILLTYPE_RECEPTIONIST_ID || stypeId === SKILLTYPE_BARTENDER_ID)
				return;
		}
		
		
        var name = $dataSystem.skillTypes[stypeId];
		var remName = TextManager.skillTypes(stypeId);
		if(remName) name = remName;
		
		//if( stypeId == SKILL_COMBAT_ID && 
		//(this._actor.isStateAffected(STATE_FALLEN_ID) || this._actor.isStateAffected(STATE_SLEEP_ID))) 
		//	return;
		
		this.addCommand(name, 'skill', true, stypeId);
    }, this);
};

Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        this.addSkillCommands();
        this.addGuardCommand();
		this.addEscapeCommand();
		this.addBattleLogCommand();
		this.addStatusCommand();
    }
};

//End Mental Phase
Window_ActorCommand.prototype.addGuardCommand = function() {
	if(this._actor.mentalPhase) 
		this.addCommand(TextManager.guard, 'guard', this._actor.mentalPhase);
	else return;
};

Window_ActorCommand.prototype.addEscapeCommand = function() {
	if(this._actor.canEscape() && this._actor.actionPhase) 
		this.addCommand(TextManager.escape, 'escape', this._actor.canEscape());
	else return;
};

Window_ActorCommand.prototype.addBattleLogCommand = function() {
	if(this._actor.isInWaitressServingPose() && !$gameTemp.isPlaytest()) {
		return;
	}		
	else
		this.addCommand(TextManager.battleLog, 'battleLog', true);
};

Window_ActorCommand.prototype.addStatusCommand = function() {
	this.addCommand(TextManager.battleStatus, 'status', true);
};

Window_ActorCommand.prototype.addAttackCommand = function() {
	return;
};
Window_ActorCommand.prototype.addItemCommand = function() {
    return;
};

Window_ActorCommand.prototype.processOk = function() {
    if (this._actor) {
        if (ConfigManager.commandRemember) {
            if(this._actor.actionPhase) 
				this._actor.setLastCommandSymbol(this.currentSymbol());
			else if(this._actor.mentalPhase) 
				this._actor.setLastMentalCommandSymbol(this.currentSymbol());
        } else {
            this._actor.setLastCommandSymbol('');
			this._actor.setLastMentalCommandSymbol('');
        }
    }
    Window_Command.prototype.processOk.call(this);
};

Window_ActorCommand.prototype.selectLast = function() {
    this.select(0);
    if (this._actor && ConfigManager.commandRemember) {
        let symbol = false;
		if(this._actor.actionPhase) 
			symbol = this._actor.lastCommandSymbol();
		else if(this._actor.mentalPhase) 
			symbol = this._actor.lastMentalCommandSymbol();
        this.selectSymbol(symbol);
        if (symbol === 'skill') {
            let skill = this._actor.lastBattleSkill();
            if (skill) {
                this.selectExt(skill.stypeId);
            }
        }
    }
};

////////
// Window BattleSkill
// This is MOG battlehud skill window
////////////

Window_BattleSkill.prototype.maxCols = function() {
    return 3;
};

Window_BattleSkill.prototype.maxPageRows = function() {
    return 4;
};