var Remtairy = Remtairy || {};
Remtairy.Edicts = Remtairy.Edicts || {};

//=============================================================================
 /*:
 * @plugindesc Edicts
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const EDICT_LEVEL_ONE_SUBJUGATED = 372;
const EDICT_LEVEL_TWO_SUBJUGATED = 373;
const EDICT_LEVEL_THREE_SUBJUGATED = 374;
const EDICT_LEVEL_FOUR_SUBJUGATED = 375;

const EDICT_STRENGTH_TRAINING_ONE = 301;
const EDICT_STRENGTH_TRAINING_TWO = 302;
const EDICT_STRENGTH_TRAINING_THREE = 303;
const EDICT_STRENGTH_TRAINING_FOUR = 304;
const EDICT_STRENGTH_TRAINING_FIVE = 305;
const EDICT_SLAM_TRAINING_ONE = 306;
const EDICT_SLAM_TRAINING_TWO = 307;
const EDICT_SLAM_TRAINING_THREE = 308;
const EDICT_STRIKE_TRAINING_ONE = 309;
const EDICT_STRIKE_TRAINING_TWO = 310;
const EDICT_STRIKE_TRAINING_THREE = 311;
const EDICT_DEXTERITY_TRAINING_ONE = 312;
const EDICT_DEXTERITY_TRAINING_TWO = 313;
const EDICT_DEXTERITY_TRAINING_THREE = 314;
const EDICT_DEXTERITY_TRAINING_FOUR = 315;
const EDICT_DEXTERITY_TRAINING_FIVE = 316;
const EDICT_CLEAVE_TRAINING_ONE = 317;
const EDICT_CLEAVE_TRAINING_TWO = 318;
const EDICT_CLEAVE_TRAINING_THREE = 319;
const EDICT_SLASH_TRAINING_ONE = 320;
const EDICT_SLASH_TRAINING_TWO = 321;
const EDICT_SLASH_TRAINING_THREE = 322;
const EDICT_AGILITY_TRAINING_ONE = 323;
const EDICT_AGILITY_TRAINING_TWO = 324;
const EDICT_AGILITY_TRAINING_THREE = 325;
const EDICT_AGILITY_TRAINING_FOUR = 326;
const EDICT_AGILITY_TRAINING_FIVE = 327;
const EDICT_SKEWER_TRAINING_ONE = 328;
const EDICT_SKEWER_TRAINING_TWO = 329;
const EDICT_SKEWER_TRAINING_THREE = 330;
const EDICT_THRUST_TRAINING_ONE = 331;
const EDICT_THRUST_TRAINING_TWO = 332;
const EDICT_THRUST_TRAINING_THREE = 333;
const EDICT_ENDURANCE_TRAINING_ONE = 334;
const EDICT_ENDURANCE_TRAINING_TWO = 335;
const EDICT_ENDURANCE_TRAINING_THREE = 336;
const EDICT_ENDURANCE_TRAINING_FOUR = 337;
const EDICT_ENDURANCE_TRAINING_FIVE = 338;
const EDICT_STAMINA_TRAINING_ONE = 339;
const EDICT_STAMINA_TRAINING_TWO = 340;
const EDICT_STAMINA_TRAINING_THREE = 341;
const EDICT_ENERGY_TRAINING_ONE = 342;
const EDICT_ENERGY_TRAINING_TWO = 343;
const EDICT_REVITALIZE_TRAINING_ONE = 344;
const EDICT_SECONDWIND_TRAINING_ONE = 345;
const EDICT_REVITALIZE_TRAINING_TWO = 346;
const EDICT_CAUTIOUS_STANCE = 347;
const EDICT_DEFENSIVE_STANCE = 348;
const EDICT_COUNTER_STANCE = 349;
const EDICT_MIND_TRAINING_ONE = 350;
const EDICT_MIND_TRAINING_TWO = 351;
const EDICT_MIND_TRAINING_THREE = 352;
const EDICT_MIND_TRAINING_FOUR = 353;
const EDICT_MIND_TRAINING_FIVE = 354;
const EDICT_SUPPRESS_DESIRES = 355;
const EDICT_RELEASE_DESIRES = 356;
const EDICT_RELEASE_COCK_DESIRE = 357;
const EDICT_HEALING_THOUGHTS_ONE = 358;
const EDICT_HEALING_THOUGHTS_TWO = 359;
const EDICT_MIND_OVER_MATTER = 360;
const EDICT_SEE_NO_EVIL = 361;
const EDICT_HEAR_NO_EVIL = 362;
const EDICT_SPEAK_NO_EVIL = 363;
const EDICT_EMPRESS_MAJESTY = 364;
const EDICT_EMPRESS_CLOTHES = 365;
const EDICT_EYE_OF_THE_MIND = 366;
const EDICT_REALITY_MARBLE = 367;
const EDICT_PRISON_GUARDS = 368;
const EDICT_REFORMED_CONVICT_EMPLOYMENT = 369;
const EDICT_PAMPHLET_TRAINING = 370;
const EDICT_SECONDHAND_GUARD_EQUIPMENT = 371;
const EDICT_LAXER_HIRING_STANDARDS = 376;
const EDICT_HIRE_CURRENT_INMATES = 377;
const EDICT_NO_HIRING_STANDARDS = 378;
const EDICT_BASIC_GUARD_TRAINING = 379;
const EDICT_ADVANCED_GUARD_TRAINING = 380;
const EDICT_STANDARD_EQUIPMENT = 381;
const EDICT_REINFORCED_EQUIPMENT = 382;
const EDICT_SELF_PAID_EQUIPMENT = 383;
const EDICT_SELF_MAINENANCE = 384;
const EDICT_YOU_BREAK_YOU_PAY = 385;
const EDICT_KITCHEN_AND_MESS_HALL = 386;
const EDICT_REPAIR_KITCHEN_AND_MESS_HALL = 387;
const EDICT_UPGRADE_KITCHEN_EQUIPMENT = 388;
const EDICT_HIRE_COOKS = 389;
const EDICT_USE_INMATE_COOKS = 390;
const EDICT_COOKING_TRAINING_PROGRAM = 391;
const EDICT_HIRE_A_CHEF = 394;
const EDICT_ARTISAN_MEAL_FOR_WARDEN = 395;
const EDICT_BULK_FOOD_SUPPLIER = 396;
const EDICT_EXPAND_INMATE_MENU = 397;
const EDICT_APHRODISIACS_IN_INMATE_FOOD = 398;
const EDICT_PAY_FOR_BETTER_FOOD = 399;
const EDICT_BETTER_GUARD_MEALS = 400;
const EDICT_GOURMET_GUARD_MEALS = 401;
const EDICT_GUARD_PAY_FOR_FOOD = 402;
const EDICT_APHRODISIACS_IN_GUARD_FOOD = 403;
const EDICT_STATE_OF_THE_ART_INFIRMARY = 404;
const EDICT_UPGRADE_MEDICAL_EQUIPMENT = 405;
const EDICT_HIRE_A_PHYSICAL_THERAPIST = 406;
const EDICT_EXPAND_THERAPY_AREA = 407;
const EDICT_PAID_THERAPY_SESSIONS = 408;
const EDICT_NEW_DRUG_SUPPLIER = 409;
const EDICT_ALLOW_RESEARCH_TESTING = 410;
const EDICT_CONDUCT_TESTS_ON_INJURED_INMATES = 411;
const EDICT_STEROIDS_FOR_GUARDS = 412;
const EDICT_SEX_ENDURANCE_DRUGS_FOR_GUARDS = 413;
const EDICT_PERFORMANCE_ENHANCEMENT_DRUGS_FOR_GUARDS = 414;
const EDICT_RECREATIONAL_DRUGS_FOR_INMATES = 415;
const EDICT_SEX_ENDURANCE_DRUGS_FOR_INMATES = 416;
const EDICT_APHRODISIACS_DRUGS_FOR_INMATES = 417;
const EDICT_EXPERIMENTAL_STRENGTH_BOOSTER = 418;
const EDICT_EXPERIMENTAL_DEXTERITY_BOOSTER = 419;
const EDICT_EXPERIMENTAL_ENDURANCE_BOOSTER = 420;
const EDICT_EXPERIMENTAL_AGILITY_BOOSTER = 421;
const EDICT_BLACK_MARKET = 422;
const EDICT_BAN_BLACK_MARKET = 423;
const EDICT_CLOSE_BLACK_MARKET = 424;
const EDICT_TURN_BLIND_EYE_TO_BLACK_MARKET = 425;
const EDICT_TAKE_A_CUT_OF_THE_BLACK_MARKET = 426;
const EDICT_KI = 427;
const EDICT_FOCUS = 428;

const EDICT_ESTABLISH_BACKDOOR = 450;
const EDICT_PUBLISH_PROFILE = 451;
const EDICT_PUBLISH_VIRGIN_STATUS = 452;
const EDICT_PUBLISH_OTHER_FIRST_TIMES = 453;
const EDICT_PUBLISH_LAST_TIMES = 454;
const EDICT_PUBLISH_RESISTS = 455;
const EDICT_PUBLISH_SEX_LEVELS = 456;
const EDICT_PUBLISH_SENSITIVITIES = 457;
const EDICT_PUBLISH_RECORDS_ONE = 458;
const EDICT_PUBLISH_RECORDS_TWO = 459;
const EDICT_PUBLISH_RECORDS_THREE = 460;
const EDICT_SECRETARY_MODE_ONE = 461;
const EDICT_SECRETARY_MODE_TWO = 462;
const EDICT_WARDEN_MODE = 463;
const EDICT_PRISONER_MODE_ONE = 464;
const EDICT_PRISONER_MODE_TWO = 465;
const EDICT_SECRETARY_HALBERD = 466;
const EDICT_HALBERD_UPGRADE_ONE = 467;
const EDICT_HALBERD_UPGRADE_TWO = 468;
const EDICT_HALBERD_UPGRADE_THREE = 469;
const EDICT_HALBERD_UPGRADE_FOUR = 470;
const EDICT_HALBERD_OFFENSIVE_SPECIALIZATION = 471;
const EDICT_HALBERD_OFFENSIVE_ONE = 472;
const EDICT_HALBERD_OFFENSIVE_TWO = 473;
const EDICT_HALBERD_OFFENSIVE_THREE = 474;
const EDICT_HALBERD_OFFENSIVE_FOUR = 475;
const EDICT_HALBERD_DEFENSIVE_SPECIALIZATION = 476;
const EDICT_HALBERD_DEFENSIVE_ONE = 477;
const EDICT_HALBERD_DEFENSIVE_TWO = 478;
const EDICT_HALBERD_DEFENSIVE_THREE = 479;
const EDICT_HALBERD_DEFENSIVE_FOUR = 480;
const EDICT_WARDEN_OUTFIT = 481;
const EDICT_WARDEN_CLOTH_UPGRADE_ONE = 482;
const EDICT_WARDEN_CLOTH_UPGRADE_TWO = 483;
const EDICT_WARDEN_CLOTH_UPGRADE_THREE = 484;
const EDICT_WARDEN_CLOTH_UPGRADE_FOUR = 485;
const EDICT_OFFICE_BED_CRAPPY = 486;
const EDICT_OFFICE_BED_UPGRADE_ONE = 487;
const EDICT_OFFICE_BED_UPGRADE_TWO = 488;
const EDICT_OFFICE_BED_UPGRADE_THREE = 489;
const EDICT_OFFICE_PRIVATE_GUARDS = 490;
const EDICT_OFFICE_PRISON_GUARDS = 491;
const EDICT_OFFICE_INMATE_GUARDS = 492;
const EDICT_OFFICE_VOLUNTEER_GUARDS = 493;
const EDICT_OFFICE_CHEAP_LOCK = 494;
const EDICT_OFFICE_HEAVY_DUTY_LOCK = 495;
const EDICT_OFFICE_AUTO_ELECTRONIC_LOCK = 496;
const EDICT_OFFICE_MANUAL_ELECTRONIC_LOCK = 497;
const EDICT_OFFICE_OUTSIDE_CAMERA = 498;
const EDICT_OFFICE_INSIDE_CAMERA = 499;
const EDICT_OFFICE_SELL_ONANI_VIDEO = 500;
const EDICT_UNARMED_COMBAT_TRAINING = 501;
const EDICT_UNARMED_ATTACK_TRAINING_I = 502;
const EDICT_UNARMED_ATTACK_TRAINING_II = 503;
const EDICT_UNARMED_DEFENSE_TRAINING_I = 504;
const EDICT_UNARMED_DEFENSE_TRAINING_II = 505;
//Level 1
const EDICT_REPAIR_BAR = 506;
const EDICT_BAR_DRINK_MENU_I = 507;
const EDICT_BAR_DRINK_MENU_II = 508;
const EDICT_BAR_DRINK_MENU_III = 509;
const EDICT_HIRE_BAR_WAITERS = 510;
const EDICT_USE_INMATE_WAITERS = 511;
const EDICT_DONT_PAY_WAITERS = 512;
const EDICT_BAR_GLASSWARE_I = 513;
const EDICT_BAR_GLASSWARE_II = 514;
const EDICT_BAR_GLASSWARE_III = 515;
const EDICT_BAR_INSURANCE_I = 516;
const EDICT_BAR_INSURANCE_II = 517;
const EDICT_BAR_WAITRESS_OUTFIT_I = 518;
const EDICT_BAR_WAITRESS_OUTFIT_II = 519;
const EDICT_EDGING_CONTROL = 520;
const EDICT_RESIST_ORGASM = 521;

const EDICT_REPAIR_VISITOR_CENTER = 522;
const EDICT_REPAIR_LAUNDRY = 523;
const EDICT_SELL_LAUNDRY_SERVICE = 524;
const EDICT_NO_FREE_LAUNDRY = 555;
const EDICT_REPAIR_WORKSHOP = 526;
const EDICT_LONGER_WORKSHOP_SHIFTS = 527;
const EDICT_HARDER_WORKSHOP_PROJECTS = 528;
const EDICT_REPAIR_DISHWASHING = 529;
const EDICT_HIRE_DISHWASHERS = 392;
const EDICT_USE_INMATE_DISHWASHERS = 393;
const EDICT_REPAIR_RECEPTION = 530;

const EDICT_THE_THUG_PROBLEM = 531;
const EDICT_NO_THUG_LABOR = 532;
const EDICT_WEAKEN_THE_THUGS = 533;
const EDICT_THUGS_STRESS_RELIEF = 534;
const EDICT_THE_GOBLIN_PROBLEM = 535;
const EDICT_ANTI_GOBLIN_SQUAD = 536;
const EDICT_DEMEAN_GOBLINS = 537;
const EDICT_BAIT_GOBLINS = 538;
const EDICT_DEFENSIVE_STANCE_UPGRADE_I = 539;
const EDICT_COUNTER_STANCE_UPGRADE_I = 540;
const EDICT_PUBLISH_DESIRES = 541;

const EDICT_REPAIR_VISITING_ROOM_C = 542;
const EDICT_REPAIR_VISITING_ROOM_D = 543;
const EDICT_CHARGE_VISITORS_FOR_VISITATION = 544;
const EDICT_CHARGE_VISITORS_FOR_EXPRESS = 545;
const EDICT_CHARGE_INMATES_FOR_VISITATION = 546;
const EDICT_RECEPTIONIST_OUTFIT_I = 547;
const EDICT_RECEPTIONIST_OUTFIT_II = 548;

const EDICT_BUY_LAUNDRY_INSURANCE = 999;
const EDICT_BUY_WORKSHOP_INSURANCE = 999;
const EDICT_BUY_DISHWASHING_INSURANCE = 999;

////////////
//////////////
// Game Actor
//////////////
////////////

//Starting Edicts
Game_Actor.prototype.setupStartingEdicts = function() {
	this.learnSkill(EDICT_STRIKE_TRAINING_ONE);
	this.learnSkill(EDICT_SLASH_TRAINING_ONE);
	this.learnSkill(EDICT_THRUST_TRAINING_ONE);
	this.learnSkill(EDICT_REVITALIZE_TRAINING_ONE);
	this.learnSkill(EDICT_CAUTIOUS_STANCE);
	this.learnSkill(EDICT_SUPPRESS_DESIRES);
	this.learnSkill(EDICT_PRISON_GUARDS);
	this.learnSkill(EDICT_REFORMED_CONVICT_EMPLOYMENT);
	this.learnSkill(EDICT_PAMPHLET_TRAINING);
	this.learnSkill(EDICT_SECONDHAND_GUARD_EQUIPMENT);
	this.learnSkill(EDICT_KITCHEN_AND_MESS_HALL);
	this.learnSkill(EDICT_STATE_OF_THE_ART_INFIRMARY);
	this.learnSkill(EDICT_KI);
	this.learnSkill(EDICT_FOCUS);
	this.learnSkill(EDICT_ESTABLISH_BACKDOOR);
	this.learnSkill(EDICT_SECRETARY_HALBERD);
	this.learnSkill(EDICT_WARDEN_OUTFIT);
	this.learnSkill(EDICT_OFFICE_BED_CRAPPY);
	this.learnSkill(EDICT_OFFICE_PRIVATE_GUARDS);
	this.learnSkill(EDICT_OFFICE_CHEAP_LOCK);
	
	//Title based unlocks
	if(this.hasThisTitle(TITLE_ID_COUNTERATTACK_THREE)) this.learnSkill(EDICT_COUNTER_STANCE);
	if(this.hasThisTitle(TITLE_ID_SLASH_THREE)) this.learnSkill(EDICT_SLASH_TRAINING_TWO);
	if(this.hasThisTitle(TITLE_ID_PIERCE_THREE)) this.learnSkill(EDICT_THRUST_TRAINING_TWO);
	if(this.hasThisTitle(TITLE_ID_BLUNT_THREE)) this.learnSkill(EDICT_STRIKE_TRAINING_TWO);
	if(this.hasThisTitle(TITLE_ID_STRENGTH_THREE)) this.learnSkill(EDICT_SLAM_TRAINING_ONE);
	if(this.hasThisTitle(TITLE_ID_DEXTERITY_THREE)) this.learnSkill(EDICT_CLEAVE_TRAINING_ONE);
	if(this.hasThisTitle(TITLE_ID_AGILITY_THREE)) this.learnSkill(EDICT_SKEWER_TRAINING_ONE);
	if(this.hasThisTitle(TITLE_ID_ENDURANCE_THREE)) this.learnSkill(EDICT_DEFENSIVE_STANCE);
	if(this.hasThisTitle(TITLE_ID_MIND_THREE)) this.learnSkill(EDICT_HEALING_THOUGHTS_ONE);
};

Remtairy.Edicts.Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
	Remtairy.Edicts.Game_Actor_learnSkill.call(this, skillId);
	if($dataSkills[skillId].hasTag == void 0) { return; }
	let skill = $dataSkills[skillId];
	
	if(skill.hasTag(TAG_ACCESSORY_EDICT)) {
		$gameParty.gainItem($dataArmors[skillId], 1, true);
		$gameParty.increaseCorruption(1);
	}
	
	if(skill.edictOrder !== 0) $gameParty.increaseOrder(skill.edictOrder);
	if(skill.edictOrderPerDay !== 0) $gameParty.increaseOrderChangePerDay(skill.edictOrderPerDay);
	if(skill.edictCorruption !== 0) $gameParty.increaseCorruption(skill.edictCorruption);
	if(skill.edictIncome !== 0) $gameParty.increaseIncome(skill.edictIncome);
	if(skill.edictExpense !== 0) $gameParty.increaseExpense(skill.edictExpense);
	if(skill.edictGuardAggression !== 0) $gameParty.increaseGuardAggression(skill.edictGuardAggression);
	
	if(skill.edictBarReputation !== 0) $gameParty.increaseBarReputation(skill.edictBarReputation);
	if(skill.edictReceptionistSatisfaction !== 0) $gameParty.increaseReceptionistSatisfaction(skill.edictReceptionistSatisfaction);
	if(skill.edictReceptionistFame !== 0) $gameParty.increaseReceptionistFame(skill.edictReceptionistFame);
	if(skill.edictReceptionistNotoriety !== 0) $gameParty.increaseReceptionistNotoriety(skill.edictReceptionistNotoriety);
	
	if(skill.edictSwitch !== 0) $gameSwitches.setValue(skill.edictSwitch, true);
	
	//Remove Edict
	if(skill.edictRemove.length > 0) {
		for(let i = 0; i < skill.edictRemove.length; ++i) {
			this.forgetSkill(skill.edictRemove[i]);
		}
	}
};

//Reset Edicts
Remtairy.Edicts.Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
	Remtairy.Edicts.Game_Actor_forgetSkill.call(this, skillId);
	let skill = $dataSkills[skillId];
	
	if(skill.hasTag(TAG_ACCESSORY_EDICT)) {
		$gameParty.gainItem($dataArmors[skillId], -1, true);
	}
	
	if(skill.edictIncome !== 0) $gameParty.increaseIncome(-skill.edictIncome);
	if(skill.edictExpense !== 0) $gameParty.increaseExpense(-skill.edictExpense);
	if(skill.edictOrderPerDay !== 0) $gameParty.increaseOrderChangePerDay(-skill.edictOrderPerDay);
	
	if(skill.edictSwitch !== 0) {
		$gameSwitches.setValue(skill.edictSwitch, false);
	}
};

/////////////
// Edict Points
///////////////

Game_Actor.prototype.getStoredEdictPoints = function() {
	return this._storedEdictPoints;
};

Game_Actor.prototype.resetEdictPoints = function() {
	this._storedEdictPoints = 0;
	this.setAsp(0);
};

Game_Actor.prototype.getNewDayEdictPoints = function() {
	let unusedPoints = Math.max(this._storedEdictPoints, this.stsAsp());
	this.resetEdictPoints();
	
	let points = 2;
	if(Prison.easyMode()) points++;
	else if(Prison.hardMode() && Prison.date % 2 === 0) points--;
	
	let maxCarryover = 0;
	maxCarryover =+ this.titleEfficientAdminstrator_carryoverUnusedEdictPoint();
	
	points += Math.min(maxCarryover, unusedPoints);
	
	this._storedEdictPoints = points;
};

Game_Actor.prototype.transferEdictPointsToStorage = function() {
	if(this.stsAsp() > 0) {
		this._storedEdictPoints = this.stsAsp();
		this.setAsp(0);
	}
};
Game_Actor.prototype.transferEdictPointsFromStorage = function() {
	if(this._storedEdictPoints > 0) {
		this.getAsp(this._storedEdictPoints);
		this._storedEdictPoints = 0;
	}
};



///////
// Edict Gold Cost
////////////////

Game_Actor.prototype.modifiedEdictGoldCost = function(originalCost) {
	return Math.round(originalCost * this.getEdictGoldRate());
};

Game_Actor.prototype.getEdictGoldRate = function() {
	let rate = 1;
	
	rate += this.titlesEdictCostRate();
	
	return rate;
};


//////////
// Resting Fatigue
// Fatigue Recovery
////////////////////

Game_Actor.prototype.edictsFatigueRestOffice = function() {
	let mapId = $gameMap._mapId;
	let recovery = 25;
	
	if(this.hasEdict(EDICT_HIRE_A_PHYSICAL_THERAPIST)) recovery += 3;
	
	if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_THREE)) recovery += 15;
	else if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_TWO)) recovery += 8;
	else if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_ONE)) recovery += 4;
	
	if(this.hasEdict(EDICT_OFFICE_AUTO_ELECTRONIC_LOCK)) recovery += 6;
	else if(this.hasEdict(EDICT_OFFICE_HEAVY_DUTY_LOCK)) recovery += 3;
	
	let fatigueRate = 1 + this.fatigue * 0.015;
	return Math.round(recovery * fatigueRate);
};

Game_Actor.prototype.edictsFatigueRestOutside = function(prisonLevel) {
	let mapId = $gameMap._mapId;
	let recovery = 20;
	
	if(mapId === MAP_ID_LVL1_GUARD_STATION || mapId === MAP_ID_LVL2_GUARD_STATION) {
		if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID)) recovery = 38;
		else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID)) recovery = 32;
		else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID)) recovery = 28;
		else recovery = 24;
	}
	
	
	if(this.hasEdict(EDICT_HIRE_A_PHYSICAL_THERAPIST)) recovery += 3;
	
	let fatigueRate = 1 + this.fatigue * 0.015;
	return Math.round(recovery * fatigueRate);
};

// Sleep quality
Game_Actor.prototype.edictsSleepQuality = function() {
	let sleepLvl = -1;

	let mapId = $gameMap._mapId;
	
	if(mapId === MAP_ID_KARRYN_OFFICE) {
		if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_THREE)) sleepLvl = 2;
		else if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_TWO)) sleepLvl = 1;
		else if(this.hasEdict(EDICT_OFFICE_BED_UPGRADE_ONE)) sleepLvl = 0;
		
		if(this.hasEdict(EDICT_OFFICE_AUTO_ELECTRONIC_LOCK) && !$gameSwitches.value(SWITCH_OFFICE_LOCK_IS_OFF))
			sleepLvl++;
	}
	else if(mapId === MAP_ID_LVL1_GUARD_STATION || mapId === MAP_ID_LVL2_GUARD_STATION) {
		if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID)) sleepLvl = 2;
		else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID)) sleepLvl = 1;
		else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID)) sleepLvl = 0;
	}
	
	
	let rand = Math.randomInt(6);
	if(rand === 2) sleepLvl--;
	else if(rand === 4 || rand === 5) sleepLvl++;
	
	return sleepLvl;
};

/////////////////////
// Clothing Durability
///////////////////////

Game_Actor.prototype.edictsBonusClothingMaxDurability = function(skillId) {
	let bonus = 0;
	
	if(this.isWearingWardenClothing()) {
		if(this.hasEdict(EDICT_WARDEN_CLOTH_UPGRADE_FOUR)) bonus += 400;
		else if(this.hasEdict(EDICT_WARDEN_CLOTH_UPGRADE_THREE)) bonus += 300;
		else if(this.hasEdict(EDICT_WARDEN_CLOTH_UPGRADE_TWO)) bonus += 200;
		else if(this.hasEdict(EDICT_WARDEN_CLOTH_UPGRADE_ONE)) bonus += 100;
	}
	else if(this.isWearingWaitressClothing()) {
		if(this.hasEdict(EDICT_BAR_WAITRESS_OUTFIT_II)) bonus += 200;
	}
	else if(this.isWearingReceptionistClothing()) {
		if(this.hasEdict(EDICT_RECEPTIONIST_OUTFIT_II)) bonus += 200;
	}
	
	
	return bonus;
};

///////
// Halberd Edicts
/////////////

Game_Actor.prototype.edictsHalberdAttack = function() {
	let halberdAttack = 2.5;
	
	if(this.hasEdict(EDICT_HALBERD_UPGRADE_FOUR)) halberdAttack += 0.5;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_THREE)) halberdAttack += 0.4;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_TWO)) halberdAttack += 0.3;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_ONE)) halberdAttack += 0.15;
	
	if(this.hasEdict(EDICT_HALBERD_OFFENSIVE_SPECIALIZATION)) halberdAttack += 0.2;
	
	return halberdAttack;
};

Game_Actor.prototype.edictsHalberdDefense = function() {
	let halberdDefense = 2.5;
	
	if(this.hasEdict(EDICT_HALBERD_UPGRADE_FOUR)) halberdDefense += 0.5;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_THREE)) halberdDefense += 0.4;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_TWO)) halberdDefense += 0.3;
	else if(this.hasEdict(EDICT_HALBERD_UPGRADE_ONE)) halberdDefense += 0.15;
	
	if(this.hasEdict(EDICT_HALBERD_DEFENSIVE_SPECIALIZATION)) halberdDefense += 0.2;
	
	return halberdDefense;
};

Game_Actor.prototype.edictsHalberdXParamPlus = function(paramId) {
	let value = 0;
	
	if(paramId === XPARAM_GRAZE_ID) {
		if(this.hasEdict(EDICT_HALBERD_OFFENSIVE_FOUR)) value += 0.17;
		else if(this.hasEdict(EDICT_HALBERD_OFFENSIVE_ONE)) value += 0.07;
	}
	else if(paramId === XPARAM_CNT_ID) {
		if(this.hasEdict(EDICT_HALBERD_DEFENSIVE_FOUR)) value += 0.25;
		else if(this.hasEdict(EDICT_HALBERD_DEFENSIVE_ONE)) value += 0.1;
	}
	else if(paramId === XPARAM_CRIT_EVA_ID) {
		if(this.hasEdict(EDICT_HALBERD_DEFENSIVE_TWO)) value += 0.3;
	}
	
	return value;
};

Game_Actor.prototype.edictsHalberdCriticalMultiplierBonus = function() {
	let value = 0;
	
	if(this.hasEdict(EDICT_HALBERD_OFFENSIVE_TWO)) value += 0.35;
	
	return value;
};

////////////
// Unarmed Edicts
///////////////

Game_Actor.prototype.edictsUnarmedAttack = function() {
	let unarmedAttack = 1;
	
	if(this.hasEdict(EDICT_UNARMED_ATTACK_TRAINING_II)) unarmedAttack += 1;
	else if(this.hasEdict(EDICT_UNARMED_ATTACK_TRAINING_I)) unarmedAttack += 0.75;
	else if(this.hasEdict(EDICT_UNARMED_COMBAT_TRAINING)) unarmedAttack += 0.5;
	
	return unarmedAttack;
};

Game_Actor.prototype.edictsUnarmedDefense = function() {
	let unarmedDefense = 1;
	
	if(this.hasEdict(EDICT_UNARMED_DEFENSE_TRAINING_II)) unarmedDefense += 1;
	else if(this.hasEdict(EDICT_UNARMED_DEFENSE_TRAINING_I)) unarmedDefense += 0.75;
	else if(this.hasEdict(EDICT_UNARMED_COMBAT_TRAINING)) unarmedDefense += 0.5;
	
	return unarmedDefense;
};

///////////
// Param
///////////

Game_Actor.prototype.karrynEdictParamBonus = function(paramId) {
	let bonus = 0;
	
	if(paramId === PARAM_MAXENERGY_ID) {
		if(this.hasEdict(EDICT_ENERGY_TRAINING_TWO)) bonus += 20;
		else if(this.hasEdict(EDICT_ENERGY_TRAINING_ONE)) bonus += 10;
	}
	
	return bonus;
};

Game_Actor.prototype.karrynEdictParamRate = function(paramId) {
	let rate = 1;

	//Training Edicts
	let trainingCount = 0;
	if(paramId === PARAM_STRENGTH_ID) trainingCount = this.karrynTrainingEdictsCount_Strength();
	else if(paramId === PARAM_ENDURANCE_ID) trainingCount = this.karrynTrainingEdictsCount_Endurance();
	else if(paramId === PARAM_DEXTERITY_ID) trainingCount = this.karrynTrainingEdictsCount_Dexterity();
	else if(paramId === PARAM_MIND_ID) trainingCount = this.karrynTrainingEdictsCount_Mind();
	else if(paramId === PARAM_AGILITY_ID) trainingCount = this.karrynTrainingEdictsCount_Agility();
	
	if(trainingCount > 0) {
		let multi = 0.05 * trainingCount;
		//for(let i = 1; i < trainingCount; ++i) 
		//	multi += i / 100;

		rate += multi;
	}
	
	if(paramId === PARAM_MAXSTAMINA_ID && this.hasEdict(EDICT_STAMINA_TRAINING_TWO)) rate *= 1.1;
	
	//Drug Edicts
	if(paramId === PARAM_STRENGTH_ID && this.hasEdict(EDICT_EXPERIMENTAL_STRENGTH_BOOSTER)) rate *= 1.1;
	if(paramId === PARAM_DEXTERITY_ID && this.hasEdict(EDICT_EXPERIMENTAL_DEXTERITY_BOOSTER)) rate *= 1.1;
	if(paramId === PARAM_ENDURANCE_ID && this.hasEdict(EDICT_EXPERIMENTAL_ENDURANCE_BOOSTER)) rate *= 1.1;
	if(paramId === PARAM_AGILITY_ID && this.hasEdict(EDICT_EXPERIMENTAL_AGILITY_BOOSTER)) rate *= 1.1;
	if(paramId === PARAM_MIND_ID) {
		if(this.hasEdict(EDICT_EXPERIMENTAL_STRENGTH_BOOSTER)) rate *= 0.97;
		if(this.hasEdict(EDICT_EXPERIMENTAL_DEXTERITY_BOOSTER)) rate *= 0.97;
		if(this.hasEdict(EDICT_EXPERIMENTAL_ENDURANCE_BOOSTER)) rate *= 0.97;
		if(this.hasEdict(EDICT_EXPERIMENTAL_AGILITY_BOOSTER)) rate *= 0.97;
	}
	
	
	return rate;
}; 

Game_Actor.prototype.karrynEdictXParamPlus = function(id) {
	let value = 0;
	
	if(id === XPARAM_STA_REGEN_ID) {
		if(this.hasEdict(EDICT_STAMINA_TRAINING_THREE)) value += 0.05;
		else if(this.hasEdict(EDICT_STAMINA_TRAINING_ONE)) value += 0.02;
	}

	return value;
};

Game_Actor.prototype.edictsSParamRate = function(id) {
	let rate = 1;

	if(id === SPARAM_EXR_ID) {
		if(this.hasEdict(EDICT_LEVEL_ONE_SUBJUGATED)) rate *= 1.4;
	}


	return rate;
};


/////////
// Training Edicts
////////////

Game_Actor.prototype.karrynTrainingEdictsCount_Strength = function() {
	let count = 0;
	
	if(this.hasEdict(EDICT_STRENGTH_TRAINING_FIVE)) count = 5;
	else if(this.hasEdict(EDICT_STRENGTH_TRAINING_FOUR)) count = 4;
	else if(this.hasEdict(EDICT_STRENGTH_TRAINING_THREE)) count = 3;
	else if(this.hasEdict(EDICT_STRENGTH_TRAINING_TWO)) count = 2;
	else if(this.hasEdict(EDICT_STRENGTH_TRAINING_ONE)) count = 1;
	
	return count;
};

Game_Actor.prototype.karrynTrainingEdictsCount_Dexterity = function() {
	let count = 0;
	
	if(this.hasEdict(EDICT_DEXTERITY_TRAINING_FIVE)) count = 5;
	else if(this.hasEdict(EDICT_DEXTERITY_TRAINING_FOUR)) count = 4;
	else if(this.hasEdict(EDICT_DEXTERITY_TRAINING_THREE)) count = 3;
	else if(this.hasEdict(EDICT_DEXTERITY_TRAINING_TWO)) count = 2;
	else if(this.hasEdict(EDICT_DEXTERITY_TRAINING_ONE)) count = 1;
	
	return count;
};

Game_Actor.prototype.karrynTrainingEdictsCount_Agility = function() {
	let count = 0;
	
	if(this.hasEdict(EDICT_AGILITY_TRAINING_FIVE)) count = 5;
	else if(this.hasEdict(EDICT_AGILITY_TRAINING_FOUR)) count = 4;
	else if(this.hasEdict(EDICT_AGILITY_TRAINING_THREE)) count = 3;
	else if(this.hasEdict(EDICT_AGILITY_TRAINING_TWO)) count = 2;
	else if(this.hasEdict(EDICT_AGILITY_TRAINING_ONE)) count = 1;
	
	return count;
};

Game_Actor.prototype.karrynTrainingEdictsCount_Endurance = function() {
	let count = 0;
	
	if(this.hasEdict(EDICT_ENDURANCE_TRAINING_FIVE)) count = 5;
	else if(this.hasEdict(EDICT_ENDURANCE_TRAINING_FOUR)) count = 4;
	else if(this.hasEdict(EDICT_ENDURANCE_TRAINING_THREE)) count = 3;
	else if(this.hasEdict(EDICT_ENDURANCE_TRAINING_TWO)) count = 2;
	else if(this.hasEdict(EDICT_ENDURANCE_TRAINING_ONE)) count = 1;
	
	return count;
};

Game_Actor.prototype.karrynTrainingEdictsCount_Mind = function() {
	let count = 0;
	
	if(this.hasEdict(EDICT_MIND_TRAINING_FIVE)) count = 5;
	else if(this.hasEdict(EDICT_MIND_TRAINING_FOUR)) count = 4;
	else if(this.hasEdict(EDICT_MIND_TRAINING_THREE)) count = 3;
	else if(this.hasEdict(EDICT_MIND_TRAINING_TWO)) count = 2;
	else if(this.hasEdict(EDICT_MIND_TRAINING_ONE)) count = 1;
	
	return count;
};

////////////
// Drug Element Edict
// Plus only with no multiplication from other sources
////////////////

Game_Actor.prototype.karrynEdictDrugElementRate = function() {
	let bonus = 0;
	
	if(this.hasEdict(EDICT_EXPERIMENTAL_STRENGTH_BOOSTER)) bonus += 0.1;
	if(this.hasEdict(EDICT_EXPERIMENTAL_DEXTERITY_BOOSTER)) bonus += 0.1;
	if(this.hasEdict(EDICT_EXPERIMENTAL_ENDURANCE_BOOSTER)) bonus += 0.1;
	if(this.hasEdict(EDICT_EXPERIMENTAL_AGILITY_BOOSTER)) bonus += 0.1;
	
	return bonus;
};

Game_Actor.prototype.exposedWeaknessElementRate = function(elementId, rate, bonus) {
	if(!this.isStateAffected(STATE_WEAKNESS_EXPOSED_ID) || elementId === ELEMENT_ALMIGHTY_ID) return 0;

	let count = 0;
	let exposedBonus = 0;
	if(this.hasEdict(EDICT_PUBLISH_RESISTS)) count++;
	if(this.hasEdict(EDICT_PUBLISH_SENSITIVITIES)) count++;
	
	if(count === 1) {
		exposedBonus = (rate + bonus) * 0.06
	}
	else if(count === 2) {
		exposedBonus = (rate + bonus) * 0.13;
	}
	else return 0;
	
	return Math.round(exposedBonus * 100) / 100;
};

//////////
// Income

Game_Actor.prototype.edictsIncomeRate = function() {
	let rate = 1;

	if(Karryn.hasEdict(EDICT_THE_THUG_PROBLEM)) {
		if(Karryn.hasEdict(EDICT_NO_THUG_LABOR)) rate *= 0.85;
		else if(Karryn.hasEdict(EDICT_THUGS_STRESS_RELIEF)) rate *= 1;
		else rate *= 0.9;
	}

	return rate;
};

/////////
// Riot Income

Game_Actor.prototype.riotBasedIncome = function() {
	let income = 0;

	if(!Karryn.hasEdict(EDICT_REPAIR_LAUNDRY) || Prison.prisonLevelOneIsRioting()) {
		if(Karryn.hasEdict(EDICT_NO_FREE_LAUNDRY))
			income -= 85;
		else if(Karryn.hasEdict(EDICT_SELL_LAUNDRY_SERVICE))
			income -= 35;
	}
	if(!Karryn.hasEdict(EDICT_REPAIR_WORKSHOP) || Prison.prisonLevelOneIsRioting()) {
		if(Karryn.hasEdict(EDICT_HARDER_WORKSHOP_PROJECTS))
			income -= 175;
		else if(Karryn.hasEdict(EDICT_LONGER_WORKSHOP_SHIFTS))
			income -= 75;
	}

	return income;
};

///////////
// Riot Expense

Game_Actor.prototype.riotBasedExpense = function() {
	let expense = 0;

	if(!Karryn.hasEdict(EDICT_REPAIR_DISHWASHING) || Prison.prisonLevelOneIsRioting()) {
		if(Karryn.hasEdict(EDICT_HIRE_DISHWASHERS) && !Karryn.hasEdict(EDICT_USE_INMATE_DISHWASHERS))
			expense -= 100;
	}

	return expense;
};

///////////
// Riot Control

Game_Actor.prototype.riotBasedControl = function() {
	let control = 0;

	if(!Karryn.hasEdict(EDICT_REPAIR_DISHWASHING) || Prison.prisonLevelOneIsRioting()) {
		if(Karryn.hasEdict(EDICT_HIRE_DISHWASHERS))
			control -= 1;
	}

	return control;
};

///////////////
// Invasion Chance
///////////////

Game_Actor.prototype.getInvasionChance = function() {
	let chance = 0;

	if(Prison.currentlyOutsidePrison()) chance = this.getInvasionChance_Outside();
	else if(Prison.currentlyPrisonLevelOne()) chance = this.getInvasionChance_LevelOne();
	else if(Prison.currentlyPrisonLevelTwo()) chance = this.getInvasionChance_LevelTwo();
	else if(Prison.currentlyPrisonLevelThree()) chance = this.getInvasionChance_LevelThree();
	else if(Prison.currentlyPrisonLevelFour()) chance = this.getInvasionChance_LevelFour();
	else if(Prison.currentlyPrisonLevelFive()) chance = this.getInvasionChance_LevelFive();

	if(Prison.easyMode()) chance *= 0.8;
	else if(Prison.hardMode()) chance *= 1.2;

	return chance;
};

Game_Actor.prototype.getInvasionChance_Outside = function() {
	let chance = -25;
	chance += Prison.guardAggression * 1.3;
	
	if(this.hasEdict(EDICT_OFFICE_VOLUNTEER_GUARDS)) chance += 45;
	else if(this.hasEdict(EDICT_OFFICE_INMATE_GUARDS)) chance += 30;
	else if(this.hasEdict(EDICT_OFFICE_PRISON_GUARDS)) chance += 15;
	
	if($gameSwitches.value(SWITCH_OFFICE_LOCK_IS_OFF)) chance += 15;
	else if(this.hasEdict(EDICT_OFFICE_AUTO_ELECTRONIC_LOCK)) chance -= 25;
	else if(this.hasEdict(EDICT_OFFICE_HEAVY_DUTY_LOCK)) chance -= 10;
	
	if(this.hasEdict(EDICT_OFFICE_INSIDE_CAMERA)) chance -= 15;
	else if(this.hasEdict(EDICT_OFFICE_OUTSIDE_CAMERA)) chance -= 10;
	
	return chance;
};

Game_Actor.prototype.getInvasionChance_LevelOne = function() {
	let chance = 20;
	
	return chance;
};

Game_Actor.prototype.getInvasionChance_LevelTwo = function() {
	let chance = 30;
	
	return chance;
};

Game_Actor.prototype.getInvasionChance_LevelThree = function() {
	let chance = 55;
	
	return chance;
};

Game_Actor.prototype.getInvasionChance_LevelFour = function() {
	let chance = 75;
	
	return chance;
};

Game_Actor.prototype.getInvasionChance_LevelFive = function() {
	let chance = 50;
	
	return chance;
};

//////////////
//////////////////
// Game Enemy
///////////////////
////////////////

Game_Enemy.prototype.prisonGuardEdictParamRate = function(paramId) {
	let rate = 1;

	//Guard Training
	let trainingRate = 1;
	if(Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING)) trainingRate += 0.35;
	else if(Karryn.hasEdict(EDICT_BASIC_GUARD_TRAINING)) trainingRate += 0.15;
	
	if(trainingRate !== 1) {
		if(paramId === PARAM_MAXSTAMINA_ID) rate *= trainingRate;
		if(paramId === PARAM_STRENGTH_ID) rate *= trainingRate;
		if(paramId === PARAM_ENDURANCE_ID) rate *= trainingRate;
		if(paramId === PARAM_DEXTERITY_ID) rate *= trainingRate;
		if(paramId === PARAM_CHARM_ID) rate *= trainingRate;
	}
	
	//Steroids
	if(Karryn.hasEdict(EDICT_STEROIDS_FOR_GUARDS)) {
		if(paramId === PARAM_MAXSTAMINA_ID) rate *= 1.25;
		if(paramId === PARAM_STRENGTH_ID) rate *= 1.25;
	}
	//Sex Endurance Drug
	if(Karryn.hasEdict(EDICT_SEX_ENDURANCE_DRUGS_FOR_GUARDS)) {
		if(paramId === PARAM_ENDURANCE_ID) rate *= 1.3;
	}
	//Performance Enhancement Drug
	if(Karryn.hasEdict(EDICT_PERFORMANCE_ENHANCEMENT_DRUGS_FOR_GUARDS)) {
		if(paramId === PARAM_MAXENERGY_ID) rate *= 1.3;
	}

	return rate;
}; //End Guard

//Inmate
Game_Enemy.prototype.inmateEdictParamRate = function(paramId) {
	let rate = 1;

	////////
	// General

	//Massage
	if(Karryn.hasEdict(EDICT_EXPAND_THERAPY_AREA) && (paramId === PARAM_MAXSTAMINA_ID || paramId === PARAM_MAXENERGY_ID)) {
		rate *= 1.1;
	}
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_INMATE_FOOD) && paramId === PARAM_CHARM_ID) {
		rate *= 0.9;
	}
	//Aphrodisiac Drug
	if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES) && paramId === PARAM_CHARM_ID) {
		rate *= 0.9;
	}
	//Sex Endurance Drug
	if(Karryn.hasEdict(EDICT_SEX_ENDURANCE_DRUGS_FOR_INMATES)) {
		if(paramId === PARAM_ENDURANCE_ID) rate *= 1.3;
	}
	
	//Turn Blind Eye to Black Market
	if(Karryn.hasEdict(EDICT_TURN_BLIND_EYE_TO_BLACK_MARKET)) {
		if(paramId === PARAM_MAXSTAMINA_ID || paramId === PARAM_STRENGTH_ID || paramId === PARAM_DEXTERITY_ID
		|| paramId === PARAM_AGILITY_ID ) 
			rate *= 1.1;
	}
	
	//Laundry
	if(Karryn.hasEdict(EDICT_REPAIR_LAUNDRY)) {
		rate *= 1.05;
	}
	
	////////
	// Type Specific
	
	//Goblin Edict
	if(paramId === PARAM_AGILITY_ID && this.isGoblinType && Karryn.hasEdict(EDICT_THE_GOBLIN_PROBLEM)) {
		if(Karryn.hasEdict(EDICT_ANTI_GOBLIN_SQUAD)) rate *= 0.93;
		else rate *= 1.33;
	}
	
	//Thug Edict
	if(this.isThugType && Karryn.hasEdict(EDICT_THE_THUG_PROBLEM)) {
		if(Karryn.hasEdict(EDICT_WEAKEN_THE_THUGS)) 
			rate *= 0.75;
		
		if(paramId === PARAM_MAXSTAMINA_ID) rate *= 1.5;
		else if(paramId === PARAM_STRENGTH_ID) {
			if(Karryn.hasEdict(EDICT_NO_THUG_LABOR))
				rate *= 1.15;
			else
				rate *= 1.3;
		}
	}
	
	return rate;
}; //End Inmate

/////////
// XParam Plus
Game_Enemy.prototype.enemyEdictXParamPlus = function(paramId) {
	let value = 0;
	
	if(Karryn.hasHalberd()) {
		if(paramId === XPARAM_GRAZE_ID && Karryn.hasEdict(EDICT_HALBERD_DEFENSIVE_THREE)) value -= 0.07;
		if(paramId === XPARAM_CRIT_EVA_ID && Karryn.hasEdict(EDICT_HALBERD_OFFENSIVE_THREE)) value -= 0.2;
	}
	
	return value;
};

/////////
// XParam Rate
Game_Enemy.prototype.enemyEdictXParamRate = function(paramId) {
	let rate = 1;
	
	//Goblin Edict
	if(paramId === XPARAM_EVA_ID && this.isGoblinType && Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) {
		rate *= 0.4;
	}
	
	return rate;
};



/////////
// SParam Plus
Game_Enemy.prototype.prisonGuardEdictSParamPlus = function(paramId) {
	let value = 0;

	//Guard Equipment
	if(Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING)) {
		if(paramId === SPARAM_WPATK_ID) value += 0.5;
		if(paramId === SPARAM_WPDEF_ID) value += 0.5;
	}
	else if(Karryn.hasEdict(EDICT_BASIC_GUARD_TRAINING)) {
		if(paramId === SPARAM_WPATK_ID) value += 0.25;
		if(paramId === SPARAM_WPDEF_ID) value += 0.25;
	}

	return value;
}; //End Guard

//////////
// AI Level Edict
/////////////////

Game_Enemy.prototype.prisonGuardEdictAILevel = function() {
	let bonus = 0;
	
	return bonus;
};

Game_Enemy.prototype.inmateEdictAILevel = function() {
	let bonus = 0;
	
	if(Karryn.hasEdict(EDICT_RECREATIONAL_DRUGS_FOR_INMATES)) bonus -= 0.1;

	
	return bonus;
};

/////////////
// Anger Edict
///////////////

Game_Enemy.prototype.prisonGuardEdictAnger = function() {
	let bonus = 0;
	
	bonus += Prison.guardAggression;
	
	return bonus;
};

Game_Enemy.prototype.inmateEdictAnger = function() {
	let bonus = 0;
	
	////////////
	// General
	

	//Inmate Food
	if(Karryn.hasEdict(EDICT_EXPAND_INMATE_MENU)) bonus -= 20;
	else if(Karryn.hasEdict(EDICT_BULK_FOOD_SUPPLIER)) bonus -= 10;
	else bonus += 10;
	
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_INMATE_FOOD)) bonus -= 10;
	
	//Massage
	if(Karryn.hasEdict(EDICT_EXPAND_THERAPY_AREA)) bonus -= 10;
	
	//Aphrodisiac Drug / Sex Endurance Drug
	if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES)) bonus -= 10;
	if(Karryn.hasEdict(EDICT_SEX_ENDURANCE_DRUGS_FOR_INMATES)) bonus -= 10;
	
	//Blind Eye to Black Market
	if(Karryn.hasEdict(EDICT_TURN_BLIND_EYE_TO_BLACK_MARKET)) bonus -= 10;
	
	
	////////////
	// Type specific
	
	if(this.isGoblinType) {
		if(Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) bonus += 40;
		else if(Karryn.hasEdict(EDICT_BAIT_GOBLINS)) bonus -= 40;
	}
	
	if(this.isThugType) {
		if(Karryn.hasEdict(EDICT_THUGS_STRESS_RELIEF)) bonus -= 40;
	}
	
	
	return bonus;
};

//////////////////
// Arousal Point Edict
////////////////////////

Game_Enemy.prototype.prisonGuardEdictArousalPoint = function() {
	let rate = 1;
	
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_GUARD_FOOD)) rate -= 0.1;
	
	return rate;
};

Game_Enemy.prototype.inmateEdictArousalPoint = function() {
	let rate = 1;
	
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_INMATE_FOOD)) rate -= 0.1;
	//Aphrodisiac Drug
	if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES)) rate -= 0.1;

	
	return rate;
};

//////////////////////
// Orgasm Point Edict
////////////////////////

Game_Enemy.prototype.prisonGuardEdictOrgasmPoint = function() {
	let rate = 1;
	
	//Sex Endurance Drug
	if(Karryn.hasEdict(EDICT_SEX_ENDURANCE_DRUGS_FOR_GUARDS)) rate += 0.2;
	
	return rate;
};

Game_Enemy.prototype.inmateEdictOrgasmPoint = function() {
	let rate = 1;
	
	//Sex Endurance Drug
	if(Karryn.hasEdict(EDICT_SEX_ENDURANCE_DRUGS_FOR_INMATES)) rate += 0.2;

	
	return rate;
};

////////////////////
// Ejaculation Volume Edict
/////////////////////////

Game_Enemy.prototype.prisonGuardEdictEjaculationVolume = function() {
	let rate = 1;
	
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_GUARD_FOOD)) rate += 0.15;
	//Performance Enhancement
	if(Karryn.hasEdict(EDICT_PERFORMANCE_ENHANCEMENT_DRUGS_FOR_GUARDS)) rate += 0.3;
	
	return rate;
};

Game_Enemy.prototype.inmateEdictEjaculationVolume = function() {
	let rate = 1;
	
	//Aphrodisiac Food
	if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_INMATE_FOOD)) rate += 0.15;
	//Massage
	if(Karryn.hasEdict(EDICT_EXPAND_THERAPY_AREA)) rate += 0.1;
	//Aphrodisiac Drug
	if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES)) rate += 0.15;
	
	return rate;
};

///////////
// Sex Skill Edict
//////////////////

Game_Enemy.prototype.enemyEdictSexSkill = function() {
	let rate = 1;
	
	if(this.isPrisonGuard) {
		//Performance Enhancement Drug
		if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES)) rate += 0.25;
	}
	else if(this.isInmate) {
		//Massage
		if(Karryn.hasEdict(EDICT_EXPAND_THERAPY_AREA)) rate += 0.05;
		//Turn Blind Eye to Black Market
		if(Karryn.hasEdict(EDICT_TURN_BLIND_EYE_TO_BLACK_MARKET)) rate += 0.15;
	}

	return rate;
};

///////////////
/////////////////
// Scene STS
///////////////
///////////////

Scene_STS.prototype.popScene = function() {
	this.closeMenuCalculations();
    SceneManager.pop();
};

Scene_STS.prototype.closeMenuCalculations = function() {
	$gameParty.closeEdictsMenuCalculations();
	$gameActors.actor(ACTOR_KARRYN_ID).setPleasure($gameActors.actor(ACTOR_KARRYN_ID).pleasure);
};

//////////////////
// Data Manager
////////////////

//Edict note tags
DataManager.processRemTMNotetags_RemtairyEdicts = function(group) {
	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		let notedata = obj.note.split(/[\r\n]+/);
		
		obj.edictOrder = 0;
		obj.edictOrderPerDay = 0;
		obj.edictCorruption = 0;
		obj.edictIncome = 0;
		obj.edictExpense = 0;
		obj.edictGuardAggression = 0;
		obj.edictBarReputation = 0;
		obj.edictReceptionistSatisfaction = 0;
		obj.edictReceptionistFame = 0;
		obj.edictReceptionistNotoriety = 0;
		obj.treeLeftId = 0;
		obj.treeRightId = 0;
		obj.edictSwitch = 0;
		obj.edictRemove = [];
		
		for (let i = 0; i < notedata.length; i++) {
			let line = notedata[i];
			if (line.match(/<EDICT ORDER:[ ](.*)>/i)) {
				obj.edictOrder = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT ORDER PER DAY:[ ](.*)>/i)) {
				obj.edictOrderPerDay = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT CORRUPTION:[ ](.*)>/i)) {
				obj.edictCorruption = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT INCOME:[ ](.*)>/i)) {
				obj.edictIncome = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT EXPENSE:[ ](.*)>/i)) {
				obj.edictExpense = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT GUARD AGGRESSION:[ ](.*)>/i)) {
				obj.edictGuardAggression = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT BAR REPUTATION:[ ](.*)>/i)) {
				obj.edictBarReputation = parseInt(RegExp.$1);	
			} else if (line.match(/<EDICT RECEPTIONIST SATISFACTION:[ ](.*)>/i)) {
				obj.edictReceptionistSatisfaction = parseInt(RegExp.$1);	
			} else if (line.match(/<EDICT RECEPTIONIST FAME:[ ](.*)>/i)) {
				obj.edictReceptionistFame = parseInt(RegExp.$1);	
			} else if (line.match(/<EDICT RECEPTIONIST NOTORIETY:[ ](.*)>/i)) {
				obj.edictReceptionistNotoriety = parseInt(RegExp.$1);					

			} else if (line.match(/<TREE LEFT:[ ](.*)>/i)) {
				obj.treeLeftId = parseInt(RegExp.$1);
			} else if (line.match(/<TREE RIGHT:[ ](.*)>/i)) {
				obj.treeRightId = parseInt(RegExp.$1);
			} else if (line.match(/<EDICT SWITCH:[ ](.*)>/i)) {
				obj.edictSwitch = parseInt(RegExp.$1);
			} else if (line.match(/<(?:EDICT REMOVE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				let array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.edictRemove = [];
				obj.edictRemove = obj.edictRemove.concat(array);
			}
		}
	};
	
};