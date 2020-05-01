﻿var Remtairy = Remtairy || {};
Remtairy.KarrynReceptionist = Remtairy.KarrynReceptionist || {};

//敵の位置
const VISITOR_LEFT_SEAT_X = 120;
const VISITOR_RIGHT_SEAT_X = 302;
const VISITOR_FIRST_SEAT_Y = 490;
const VISITOR_ROW_Y = -75;

const VISITOR_STATES_ICON_X = -52;
const VISITOR_NAME_TEXT_WIDTH = 115;
const VISITOR_NAME_TEXT_X = 30;
const REM_SELECTION_SIZE_RECEPTIONIST_WIDTH = 188;

const BATTLEBACK1_VISITOR_RECEPTIONIST_NAME = 'Reception1';

//=============================================================================
 /*:
 * @plugindesc Karryn Receptionist
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const RECEPTIONIST_SKILL_START = 1579;
const RECEPTIONIST_SKILL_END = 1599;

const VISITOR_MIN_PAGES = 1;
const VISITOR_MAX_PAGES = 5;
const VISITOR_BASE_MIN_TIME = 2;
const VISITOR_BASE_MAX_TIME = 4;
const VISITOR_DESK_DISTANCE = 2.5;
const VISITOR_ROOM_DISTANCE = 4;
const VISITOR_PAGES_BASE_TIME = 3;
const VISITOR_PAGES_EACH_TIME = 2.5;
const VISITOR_WANTED_PERV_PROMOTE_CHANCE_INC = 10;

const VISITOR_REQUEST_HAND_SHAKE_ID = 1;
const VISITOR_REQUEST_BOOBS_SHAKE_ID = 2;
const VISITOR_REQUEST_KISS_ID = 3;
const VISITOR_REQUEST_HANDJOB_ID = 4;
const VISITOR_REQUEST_BLOWJOB_ID = 5;

const GOBLIN_DISTANCE_OFFSCREEN_FAR = 2;
const GOBLIN_DISTANCE_OFFSCREEN_CLOSE = 3;
const GOBLIN_DISTANCE_FARTHEST = 4;
const GOBLIN_DISTANCE_FAR = 5;
const GOBLIN_DISTANCE_MEDIUM = 6;
const GOBLIN_DISTANCE_CLOSE = 7;

const RECEPTIONIST_SEXUAL_LINE_PLEASURE_THRESHOLD = 80;
const RECEPTIONIST_GENERAL_SATISFACTION_GAIN_FROM_VISITING_ROOM = 3;
const RECEPTIONIST_GENERAL_SATISFACTION_GAIN_FROM_FAN_REQUEST_FULFILLED = 2;
const RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_WRONG_VISITING_ROOM = -2;
const RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_STARTER_STILL_HERE = -2;
const RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_ANGRY_STILL_HERE = -2;
const RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_ANGRY_LEAVE = -1;
const RECEPTIONIST_FAN_SATISFACTION_GAIN_FROM_REQUEST_FULFILLED = 3;
const RECEPTIONIST_FAN_SATISFACTION_GAIN_FROM_VISITING_ROOM = 3;
const RECEPTIONIST_FAN_SATISFACTION_LOST_FROM_REQUEST_REJECTED = -2;
const RECEPTIONIST_FAN_SATISFACTION_LOST_FROM_ANGRY_LEAVE = -2;
const RECEPTIONIST_PERV_SATISFACTION_GAIN_FROM_REQUEST_FULFILLED = 2;
const RECEPTIONIST_PERV_SATISFACTION_GAIN_FROM_SECOND_REQUEST_FULFILLED = 2;
const RECEPTIONIST_PERV_SATISFACTION_LOST_FROM_REQUEST_REJECTED = -2;

const RECEPTIONIST_ORDER_GAIN_FROM_VISITING_ROOM_BASE = 0.8;
const RECEPTIONIST_ORDER_GAIN_FROM_VISITING_ROOM_PER_TIME = 0.2;
const RECEPTIONIST_PROCESS_PAPER_BASE_TIME = 20;
const RECEPTIONIST_PROCESS_PAPER_EACH_TIME = 20;

const RECEPTIONIST_CHANCE_OF_VISITOR_A_NOTICING = 12;
const RECEPTIONIST_CHANCE_OF_VISITOR_B_NOTICING = 6;
const RECEPTIONIST_CHANCE_OF_VISITOR_C_NOTICING = 2;
const RECEPTIONIST_CHANCE_OF_VISITOR_D_NOTICING = 1;
const RECEPTIONIST_CHANCE_OF_FAN_NOTICING_MULTI = 2;

const VISITING_ROOM_A_ID = 0;
const VISITING_ROOM_B_ID = 1;
const VISITING_ROOM_C_ID = 2;
const VISITING_ROOM_D_ID = 3;
const VISITING_ROOM_TIME_BUFFER = 30;

const VAR_MIN_RECEPTIONIST_SATISFACTION = 5;
const VAR_MIN_RECEPTIONIST_FAME = 3;
const VAR_MIN_RECEPTIONIST_NOTORIETY = 0;

//////////
// Game Party
///////////

Game_Party.prototype.initializeReceptionistSettings = function() {
	this.setVisitorNumberOrder(0);
	this.setReceptionistSatisfaction(VAR_MIN_RECEPTIONIST_SATISFACTION);
	this.setReceptionistFame(VAR_MIN_RECEPTIONIST_FAME);
	this.setReceptionistNotoriety(VAR_MIN_RECEPTIONIST_NOTORIETY);
};


Game_Party.prototype.setVisitorNumberOrder = function(value) {
	this._visitorNumberOrder = value;
};
Game_Party.prototype.increaseVisitorNumberOrder = function() {
	this.setVisitorNumberOrder(this._visitorNumberOrder + 1);
};
Game_Party.prototype.getVisitorNumberOrderForNewVisitor = function() {
	this.increaseVisitorNumberOrder();
	return this._visitorNumberOrder;
};

Game_Party.prototype.setReceptionistSatisfaction = function(value) {
	let minSat = VAR_MIN_RECEPTIONIST_SATISFACTION;
	
	if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_D)) minSat += 4;
	else if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_C)) minSat += 2;
	
	this._receptionistSatisfaction = Math.max(minSat, value);
	$gameVariables.setValue(VARIABLE_RECEPTIONIST_SATISFACTION_ID, this._receptionistSatisfaction);
};
Game_Party.prototype.increaseReceptionistSatisfaction = function(value) {
	this.setReceptionistSatisfaction(this._receptionistSatisfaction + value);
};

Game_Party.prototype.setReceptionistFame = function(value) {
	let minFame = VAR_MIN_RECEPTIONIST_FAME;
	if(Karryn.hasThisTitle(TITLE_ID_RECEPTIONIST_HANDSHAKE)) minFame += 3; 
	if(Karryn.hasThisTitle(TITLE_ID_VISITOR_FIRST_KISS)) minFame += 2; 
	if(Karryn.hasThisTitle(TITLE_ID_SCANDELOUS_IDOL)) minFame += 1; 
	
	this._receptionistFame = Math.max(minFame, value);
	$gameVariables.setValue(VARIABLE_RECEPTIONIST_FAME_ID, this._receptionistFame);
};
Game_Party.prototype.increaseReceptionistFame = function(value) {
	this.setReceptionistFame(this._receptionistFame + value);
};

Game_Party.prototype.setReceptionistNotoriety = function(value) {
	let minNotoriety = VAR_MIN_RECEPTIONIST_NOTORIETY;
	if(Karryn.hasThisTitle(TITLE_ID_VISITOR_FIRST_KISS)) minNotoriety += 3; 
	if(Karryn.hasThisTitle(TITLE_ID_VISITOR_SWALLOWER)) minNotoriety += 4; 
	if(Karryn.hasThisTitle(TITLE_ID_SCANDELOUS_IDOL)) minNotoriety += 3; 
	
	this._receptionistNotoriety = Math.max(minNotoriety, value);
	if(!DEBUG_MODE) this._receptionistNotoriety = 0;
	$gameVariables.setValue(VARIABLE_RECEPTIONIST_NOTORIETY_ID, this._receptionistNotoriety);
};
Game_Party.prototype.increaseReceptionistNotoriety = function(value) {
	this.setReceptionistNotoriety(this._receptionistNotoriety + value);
};


Game_Party.prototype.maxAvailableVisitorRooms = function() {
	if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_D)) return 4;
	else if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_C)) return 3;
	else return 2;
};

Game_Party.prototype.receptionistBattle_getCurrentTimeInSeconds = function() {
	return this._receptionistBattle_currentTimeInSeconds;
};
Game_Party.prototype.receptionBattle_getTimeMinutesNumber = function() {
	let timeLimit = this._receptionistBattle_timeLimit - this._receptionistBattle_currentTimeInSeconds;
	let minutes = Math.floor(timeLimit / 60);
	let seconds = timeLimit - minutes * 60;
	return minutes;
};
Game_Party.prototype.receptionBattle_getTimeSecondsNumber = function() {
	if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= $gameParty._receptionistBattle_timeLimit)
		return 0;
	let minutes = Math.floor(this._receptionistBattle_currentTimeInSeconds / 60);
	let seconds = this._receptionistBattle_currentTimeInSeconds - minutes * 60;
	if(seconds > 0) seconds = 60 - seconds;
	return seconds;
};

Game_Party.prototype.receptionBattle_advanceTimeBySeconds = function(value) {
	this._receptionistBattle_currentTimeInSeconds += value;
};

Game_Party.prototype.setReceptionistBattleTimeLimit = function(minutes) {
	if(minutes === 20) {
		this._receptionistBattle_timeLimit = 1200;
		this._receptionistBattle_baseFatigueGain = 2;
	}
	else if(minutes === 30) {
		this._receptionistBattle_timeLimit = 1800;
		this._receptionistBattle_baseFatigueGain = 4;
	}
	else if(minutes === 40) {
		this._receptionistBattle_timeLimit = 2400;
		this._receptionistBattle_baseFatigueGain = 6;
	}
	else if(minutes === 50) {
		this._receptionistBattle_timeLimit = 3000;
		this._receptionistBattle_baseFatigueGain = 8;
	}
	else if(minutes === 60) {
		this._receptionistBattle_timeLimit = 3600;
		this._receptionistBattle_baseFatigueGain = 12;
	}
	else if(minutes === 15) {
		this._receptionistBattle_timeLimit = 900;
		this._receptionistBattle_baseFatigueGain = 1;
	}
	else if(minutes === 10) {
		this._receptionistBattle_timeLimit = 600;
		this._receptionistBattle_baseFatigueGain = 1;
	}
	
	//debugging
	//this._receptionistBattle_timeLimit = 300;
};

Object.defineProperty(Game_Party.prototype, "receptionistBattleTimeChoice", {
	get: function () { 
		let choice = 0;
		let satisfaction = $gameParty._receptionistSatisfaction;
		let fame = $gameParty._receptionistFame;
		let notoriety = $gameParty._receptionistNotoriety;
		
		let value = (satisfaction * 2) + fame + (notoriety * 0.5);
		
		if(value >= 60)
			choice = 4;
		else if(value >= 40)
			choice = 3;
		else if(value >= 30)
			choice = 2;
		else if(value >= 20)
			choice = 1;
		
		return choice;
		
	}, configurable: true
});

Game_Party.prototype.getAvailableReceptionistBattleTimeLimitChoice = function() {
	let choice = 0;
	
	let satisfaction = $gameParty._receptionistSatisfaction;
	let fame = $gameParty._receptionistFame;
	let notoriety = $gameParty._receptionistNotoriety;
	
	let value = (satisfaction * 2) + fame + (notoriety * 0.5);
	
	if(value >= 60)
		choice = 4;
	else if(value >= 40)
		choice = 3;
	else if(value >= 30)
		choice = 2;
	else if(value >= 20)
		choice = 1;
	
	return choice;
};

Game_Party.prototype.preReceptionistBattleSetup = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	BattleManager.setEnemySneakAttackBattle();
	this.preBattleSetup();
	$gameMap.changeBattleback(BATTLEBACK1_VISITOR_RECEPTIONIST_NAME, null);
	this._showTopRightTimeNumberFlag = true;
	
	this.increaseFatigueGain(this._receptionistBattle_baseFatigueGain);
	
	this._receptionistBattle_currentTimeInSeconds = 0;
	this._receptionistBattle_visitingRoomTime = [ -1, -1, -1, -1 ];
	this._receptionistBattle_visitorSatisfaction_general = 0;
	this._receptionistBattle_visitorSatisfaction_fan = 0;
	this._receptionistBattle_visitorSatisfaction_pervert = 0;
	this._receptionistBattle_visitorSpottedNaughtyActs = 0;
	this._receptionistBattle_additionalPotentialVisitors = Math.ceil(this._receptionistSatisfaction * 0.5);
	
	actor.resetAllTachieBack();
	actor.resetAllTachieFront();
	actor.resetAllTachieVisitor();
	actor.preReceptionistBattleSetup();
	
};


Game_Party.prototype.postReceptionistBattleCleanup  = function() {
	this._showTopRightTimeNumberFlag = false;
	$gameSwitches.setValue(SWITCH_TODAY_WAITRESS_BATTLE_ID, true);
	
	$gameTroop._goblins_distanceSlot = [ -1, false, false, false, false, false, false, false ];

	if(this._receptionistBattle_visitorSatisfaction_general > 0) {
		let addRep = 1;
		if(Math.randomInt(100) < this._receptionistBattle_visitorSatisfaction_general) addRep++;
		this.increaseReceptionistSatisfaction(addRep);
		$gameSwitches.setValue(SWITCH_TODAY_RECEPTIONIST_SATISFACTION_RATE_UP_ID, true);
	}
	else if(this._receptionistBattle_visitorSatisfaction_general < 0) {
		let addRep = -1;
		if(Math.randomInt(100) < this._receptionistBattle_visitorSatisfaction_general * -1) addRep--;
		this.increaseReceptionistSatisfaction(addRep);
	}
	
	if(this._receptionistBattle_visitorSatisfaction_fan > 0) {
		let addRep = 1;
		if(Math.randomInt(100) < this._receptionistBattle_visitorSatisfaction_fan) addRep++;
		this.increaseReceptionistFame(addRep);
		$gameSwitches.setValue(SWITCH_TODAY_RECEPTIONIST_FAME_UP_ID, true);
	}
	else if(this._receptionistBattle_visitorSatisfaction_fan < 0) {
		this.increaseReceptionistFame(-1);
	}
	
	if(this._receptionistBattle_visitorSatisfaction_pervert > 0 || this._receptionistBattle_visitorSpottedNaughtyActs > 0) {
		let addRep = 1;
		if(Math.randomInt(100) < this._receptionistBattle_visitorSatisfaction_pervert + this._receptionistBattle_visitorSpottedNaughtyActs) addRep++;
		this.increaseReceptionistNotoriety(addRep);
		$gameSwitches.setValue(SWITCH_TODAY_RECEPTIONIST_NOTORIETY_UP_ID, true);
	}
	else if(this._receptionistBattle_visitorSatisfaction_pervert + this._receptionistBattle_visitorSpottedNaughtyActs < 0) {
		let addRep = -1;
		if(Math.randomInt(100) < (this._receptionistBattle_visitorSatisfaction_pervert + this._receptionistBattle_visitorSpottedNaughtyActs) * -1) addRep--;
		this.increaseReceptionistNotoriety(addRep);
	}
	
	
	
	$gameSwitches.setValue(SWITCH_TODAY_RECEPTIONIST_BATTLE_ID, true);
	
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	actor.putOnGlovesAndHat();
	actor.changeToWardenClothing();
	
	if(!$gameSwitches.value(SWITCH_DEFEATED_IN_LEVEL_ONE_ID)) {
		actor._playthroughRecordReceptionistBattleTotalShiftsCount++;
	}
	else {
		actor.gainFatigue(4);
	}
	
	//this.postBattleCleanup();
};

Game_Party.prototype.applyEndOfBattleSpecial_receptionistBattle = function() {
	for(let i = 0; i < $gameTroop._visitorSeats.length; ++i) {
		if(!$gameTroop._visitorSeats[i]) {
			let visitor = $gameTroop._visitorSeats[i];
			
			if(visitor._visitor_isStarter) {
				$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_STARTER_STILL_HERE * visitor._visitor_dissatisfactionMultipler);
			}
			if(visitor._visitor_gotAngryCount > 0) {
				$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_ANGRY_STILL_HERE * visitor._visitor_dissatisfactionMultipler);
			}
			
		}
	}
};

Game_Party.prototype.increaseReceptionistVisitorSatisfaction_General = function(value) {
	this._receptionistBattle_visitorSatisfaction_general += value;
};
Game_Party.prototype.increaseReceptionistVisitorSatisfaction_Fan = function(value) {
	this._receptionistBattle_visitorSatisfaction_fan += value;
};
Game_Party.prototype.increaseReceptionistVisitorSatisfaction_Pervert = function(value) {
	this._receptionistBattle_visitorSatisfaction_pervert += value;
};
Game_Party.prototype.increaseReceptionistVisitorSpottedNaughtyActs = function(value) {
	this._receptionistBattle_visitorSpottedNaughtyActs += value;
};

/////////
// Wanted 

Game_Party.prototype.addToVisitorFanWanted = function(enemy) {
	let wantedFanCount = this.getHeadcountOfWantedFans();
	let fame = this._receptionistFame;
	let maxAllowedWantedFansCount = 2;
	
	if(fame >= 15) maxAllowedWantedFansCount = 4;
	else if(fame >= 8) maxAllowedWantedFansCount = 3;
	
	if(wantedFanCount < maxAllowedWantedFansCount && enemy.enemyType() == ENEMYTYPE_VISITOR_MALE_TAG) {
		this.addNewWanted(enemy);
	}
};

Game_Party.prototype.addToVisitorPervertWanted = function(enemy) {
	let wantedPervertsCount = this.getHeadcountOfWantedPerverts();
	let notoriety = this._receptionistNotoriety;
	let maxAllowedWantedPervertsCount = 1;
	
	if(notoriety >= 20) maxAllowedWantedPervertsCount = 5;
	else if(notoriety >= 15) maxAllowedWantedPervertsCount = 4;
	else if(notoriety >= 10) maxAllowedWantedPervertsCount = 3;
	else if(notoriety >= 5) maxAllowedWantedPervertsCount = 2;
	
	if(wantedPervertsCount < maxAllowedWantedPervertsCount && enemy.enemyType() == ENEMYTYPE_VISITOR_MALE_TAG) {
		this.addNewWanted(enemy);
	}
};

Game_Party.prototype.getHeadcountOfWantedFans = function() {
	let count = 0;
	for(let i = 0; i < this._wantedEnemies.length; i++) {
		let wantedEnemy = this._wantedEnemies[i];
		if(!wantedEnemy._disabled && wantedEnemy._enemyType == ENEMYTYPE_VISITOR_MALE_TAG && wantedEnemy._visitor_isFan) {
			count++;
		}
	}
	return count;
};

Game_Party.prototype.getHeadcountOfWantedPerverts = function() {
	let count = 0;
	for(let i = 0; i < this._wantedEnemies.length; i++) {
		let wantedEnemy = this._wantedEnemies[i];
		if(!wantedEnemy._disabled && wantedEnemy._enemyType == ENEMYTYPE_VISITOR_MALE_TAG && wantedEnemy._visitor_isPervert) {
			count++;
		}
	}
	return count;
};

////////
// Tips

Game_Party.prototype.addReceptionistHandshakeTips = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let value = 0;
	if(Karryn.isUsingThisTitle(TITLE_ID_RECEPTIONIST_HANDSHAKE)) {
		value = Math.randomInt(50 + this._receptionistFame * 4) + 20;
	}

	if(value >= 1) {
		$gameParty.increaseExtraGoldReward(value);
		BattleManager._logWindow.push('addText', TextManager.waitressGetsTip.format(actor.displayName(), value));
		AudioManager.playSe({name:'Coin', pan:0, pitch:100, volume:70});
	}
};

//////////
// Game Actor
///////////

////////
// Setup
///////////

Game_Actor.prototype.preReceptionistBattleSetup = function() {
	this._hornyTimeLimit = -1;
	
	this._receptionist_greetVisitor_gotResponse = false;
	this._receptionist_greetVisitor_waitingForResponse = false;

	this._receptionist_currentlyProcessingPapers = false;
	this._receptionist_currentlyProcessingPapersOfVisitor = false;
	this._receptionist_remainingProcessingPaperTime = -1;
	
	this._receptionist_checkingVisitingRoom_startingPhoneCall = false;
	this._receptionist_checkingVisitingRoom_endingPhoneCall = false;
	this._receptionist_checkingVisitingRoomId = -1;
	
	this._receptionist_turnsTillMentalPhase = 0;
	this._receptionist_visitorSexSkillCooldown = 1;
	
	this._receptionist_wearingGlasses = true;
	this.changeToReceptionistClothing();
	this.setReceptionistPose();
	
	this.setupDesires();
	this.cleanUpLiquids();
	this._recordVisitorReceptionistBattleCount++;
	this._playthroughRecordVisitorReceptionistBattleCount++;
	this.removeState(STATE_CONFIDENT_ID);

	this.emoteReceptionistPose();
};

//////////////////
// Receptionist Param
Game_Actor.prototype.receptionistXParamRate = function(id) {
	let passiveRate = 1;
	if(this.isInReceptionistPose()) {
		if(id === XPARAM_CRIT_EVA_ID || id === XPARAM_EVA_ID) {
			passiveRate = 0.3;	
		}
		else if(id === XPARAM_HIT_ID || id === XPARAM_CRIT_ID) {
			passiveRate = 0.75;
		}
		else if(id === XPARAM_EN_REGEN_ID) {
			passiveRate = 0;
		}
		else if(id === XPARAM_STA_REGEN_ID) {
			if(this.isUsingThisTitle(TITLE_ID_RECEPTIONIST_THIRTY_SHIFTS))
				passiveRate = 0.33;
			else
				passiveRate = 0.2;
		}
		
		
	}
	return passiveRate;
};
Game_Actor.prototype.receptionistSParamRate = function(id) {
	let passiveRate = 1;
	if(this.isInReceptionistPose()) {
		if(id === SPARAM_WP_REGEN_ID) {
			passiveRate = 0.2;
		}
	}
	return passiveRate;
};

/////////
// Status
Game_Actor.prototype.receptionistBattle_isLayingOnDesk = function() {
	return this.isBodySlotPenis(MOUTH_ID);
};
Game_Actor.prototype.receptionistBattle_isHavingSexBehind = function() {
	return this.isBodySlotPenis(PUSSY_ID) || this.isBodySlotTongue(PUSSY_ID) || this.isBodySlotPenis(ANAL_ID);
};
Game_Actor.prototype.receptionistBattle_isSayingSexualLines = function() {
	return this.receptionistBattle_isHavingSexBehind() || this.justOrgasmed() || this.isWearingAnyToy();
};
Game_Actor.prototype.receptionistBattle_isShakingHands = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._fan_currentlyGettingRequestFulfilled;
};
Game_Actor.prototype.receptionistBattle_isKissing = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._perv_kissing;
};
Game_Actor.prototype.receptionistBattle_gettingBoobsRubbed = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._perv_touchingBoobs;
};
Game_Actor.prototype.receptionistBattle_isGivingHandjob = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._perv_gettingHJ;
};
Game_Actor.prototype.receptionistBattle_isGivingBlowjob = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._perv_gettingBJ;
};

/////
// Post Damage

Game_Actor.prototype.postDamage_basicKissing_receptionistBattle = function(target, kissLvl) {
	this.receptionistBattle_makeSexualNoise(2, false);
};

Game_Actor.prototype.postDamage_basicPetting_receptionistBattle = function(target, area) {
	if(area == AREA_BOOBS) {
		this.receptionistBattle_makeSexualNoise(1, false);
	}
	
	this.addToActorPettedWhileWorkingRecord();
};

Game_Actor.prototype.postDamage_basicSex_receptionistBattle = function(target, sexAct) {
	if(sexAct == SEXACT_BLOWJOB) {
		this.receptionistBattle_makeSexualNoise(4, false);
	}
	else if(sexAct == SEXACT_HANDJOB) {
		this.receptionistBattle_makeSexualNoise(2, false);
	}
	else {
		this.receptionistBattle_makeSexualNoise(1, false);
	}
};

Game_Actor.prototype.postDamage_ejaculation_receptionistBattle = function(target, area, semen) {
	if(area == CUM_CREAMPIE_PUSSY || area == CUM_CREAMPIE_ANAL) {
		this.receptionistBattle_makeSexualNoise(2, false);
		this._playthroughRecordReceptionistGoblinCreampieML += semen;
	}
	else if(area == CUM_SWALLOW_MOUTH) {
		this.receptionistBattle_makeSexualNoise(2, false);
		this._playthroughRecordVisitorSwallowML += semen;
	}
	else {
		this.receptionistBattle_makeSexualNoise(1, false);
	}
	
};

Game_Actor.prototype.postDamage_femaleOrgasm_receptionistBattle = function(orgasmCount) {
	this.receptionistBattle_makeSexualNoise(3 * orgasmCount, false);

	if(this._receptionist_checkingVisitingRoom_startingPhoneCall) {
		this._playthroughRecordReceptionistOrgasmWhileCallingCount++;
	}
};

////////
// Tachie

Game_Actor.prototype.updateReceptionistBattleVisitorQueueTachie = function() {
	let queueLength = 0
	if($gameTroop._deskQueue)
		queueLength = $gameTroop._deskQueue.length;

	this.resetTachieCock();
	this._cockNormalTarget = false;
	this.setMaxTachieSemenCockNormalId(0);

	if(queueLength > 0) {
		let visitorATachie = '';
		let visitorA = $gameTroop._deskQueue[0];
		let enemyCock = visitorA.enemyCock();
		
		if(visitorA.isVisitorMaleType) {
			if(visitorA._visitor_isPervert && visitorA._visitor_isIdentified) {
				visitorATachie += 'ero_';
				
				if(visitorA._perv_gettingBJ)
					visitorATachie += 'normal';
				else if(visitorA._perv_kissing) {
					if(visitorA._perv_touchingBoobs)
						visitorATachie += 'kissmomi';
					else
						visitorATachie += 'kiss';
				}
				else if(visitorA._perv_touchingBoobs)
						visitorATachie += 'boobs';
				else
					visitorATachie += 'normal';
				
				//tachie cock
				if(visitorA._perv_gettingBJ) {
					let tachieCockName = 'mouth_';
					if(visitorA._perv_gettingHJ)
						tachieCockName += 'hj_';
					tachieCockName += visitorA.enemyCock();
					if(Karryn.isCensored())
						tachieCockName += '_cen';
					this.setTachieCock(tachieCockName);
					this.setTachieSemenCockNormalExtension('mouth_');
				}
				else if(visitorA._perv_gettingHJ) {
					let tachieCockName = 'leftarm_';
					if(visitorA._perv_kissing) {
						tachieCockName += 'kiss_';
						this.setTachieSemenCockNormalExtension('leftarm_kiss_');
					}
					else {
						this.setTachieSemenCockNormalExtension('leftarm_');
					}
					tachieCockName += visitorA.enemyCock();
					if(Karryn.isCensored())
						tachieCockName += '_cen';
					this.setTachieCock(tachieCockName);
				}
				else if(!visitorA._perv_gettingHJ && !visitorA._perv_gettingBJ) {
					let tachieCockName = 'free_';
					
					if(visitorA._perv_kissing) {
						tachieCockName += 'kiss_';
						this.setTachieSemenCockNormalExtension('free_kiss_');
					}
					else {
						this.setTachieSemenCockNormalExtension('free_');
					}
					
					tachieCockName += visitorA.enemyCock();
					if(Karryn.isCensored())
						tachieCockName += '_cen';
					this.setTachieCock(tachieCockName);
					
				}
				this._cockNormalTarget = visitorA;
				this.setMaxTachieSemenCockNormalId(1);
			}
			else {
				visitorATachie += 'male_';
				visitorATachie += visitorA._visitor_tachieNum;
			}
		}
		else if(visitorA.isVisitorFemaleType) {
			visitorATachie += 'female_';
			visitorATachie += visitorA._visitor_tachieNum;
		}
		
		this.setTachieVisitorA(visitorATachie);
		
		if(visitorA._visitor_isPervert && visitorA._visitor_isIdentified) {
			this.resetTachieBackA();
		}
		else if(visitorA._visitor_isAngry) {
			this.setTachieBackA('visitorA_angry');
		}
		else if(visitorA._visitor_isPervert && !visitorA._perv_requestRejected) {
			this.setTachieBackA('visitorA_blush');
		}
		else if(visitorA._visitor_spottedNaughtyAct) {
			this.setTachieBackA('visitorA_spotted');
		}
		else if(visitorA._visitor_isFan && !visitorA._fan_requestRejected) {
			this.setTachieBackA('visitorA_kira');
		}
		else {
			this.resetTachieBackA();
		}
		
		if(this.receptionistBattle_isShakingHands()) {
			if(visitorA.isVisitorMaleType) {
				this.setTachieBackE('male_handshake');
			}
			else if(visitorA.isVisitorFemaleType) {
				this.setTachieBackE('female_handshake');
			}
		}
		else {
			this.resetTachieBackE();
		}
		
		//End front visitor tachie
		
		if(queueLength > 1) {
			let visitorBTachie = '';
			let visitorB = $gameTroop._deskQueue[1];
			if(visitorB.isVisitorMaleType) {
				visitorBTachie += 'male_';
			}
			else if(visitorB.isVisitorFemaleType) {
				visitorBTachie += 'female_';
			}
			visitorBTachie += visitorB._visitor_tachieNum;
			this.setTachieVisitorB(visitorBTachie);
			
			if(visitorB._visitor_isAngry) {
				this.setTachieBackB('visitorB_angry');
			}
			else if(visitorB._visitor_isPervert && !visitorB._perv_requestRejected) {
				this.setTachieBackB('visitorB_blush');
			}
			else if(visitorB._visitor_spottedNaughtyAct) {
				this.setTachieBackB('visitorB_spotted');
			}
			else if(visitorB._visitor_isFan && !visitorB._fan_requestRejected) {
				this.setTachieBackB('visitorB_kira');
			}
			else {
				this.resetTachieBackB();
			}
		}
		else {
			this.resetTachieVisitorB();
			this.resetTachieBackB();
		}
		
		if(queueLength > 2) {
			let visitorCTachie = '';
			let visitorC = $gameTroop._deskQueue[2];
			if(visitorC.isVisitorMaleType) {
				visitorCTachie += 'male_';
			}
			else if(visitorC.isVisitorFemaleType) {
				visitorCTachie += 'female_';
			}
			visitorCTachie += visitorC._visitor_tachieNum;
			this.setTachieVisitorC(visitorCTachie);
			
			if(visitorC._visitor_isAngry) {
				this.setTachieBackC('visitorC_angry');
			}
			else if(visitorC._visitor_isPervert && !visitorC._perv_requestRejected) {
				this.setTachieBackC('visitorC_blush');
			}
			else if(visitorC._visitor_spottedNaughtyAct) {
				this.setTachieBackC('visitorC_spotted');
			}
			else if(visitorC._visitor_isFan && !visitorC._fan_requestRejected) {
				this.setTachieBackC('visitorC_kira');
			}
			else {
				this.resetTachieBackC();
			}		
		}
		else {
			this.resetTachieVisitorC();
			this.resetTachieBackC();
		}
		
		if(queueLength > 3) {
			let visitorDTachie = '';
			let visitorD = $gameTroop._deskQueue[3];
			if(visitorD.isVisitorMaleType) {
				visitorDTachie += 'male_';
			}
			else if(visitorD.isVisitorFemaleType) {
				visitorDTachie += 'female_';
			}
			visitorDTachie += visitorD._visitor_tachieNum;
			this.setTachieVisitorD(visitorDTachie);
			
			if(visitorD._visitor_isAngry) {
				this.setTachieBackD('visitorD_angry');
			}
			else if(visitorD._visitor_isPervert && !visitorD._perv_requestRejected) {
				this.setTachieBackD('visitorD_blush');
			}
			else if(visitorD._visitor_spottedNaughtyAct) {
				this.setTachieBackD('visitorD_spotted');
			}
			else if(visitorD._visitor_isFan && !visitorD._fan_requestRejected) {
				this.setTachieBackD('visitorD_kira');
			}
			else {
				this.resetTachieBackD();
			}	
		}
		else {
			this.resetTachieVisitorD();
			this.resetTachieBackD();
		}
		
	}
	else {
		this.resetTachieBackA();
		this.resetTachieBackB();
		this.resetTachieBackC();
		this.resetTachieBackD();
		this.resetTachieBackE();
		this.resetTachieVisitorA();
		this.resetTachieVisitorB();
		this.resetTachieVisitorC();
		this.resetTachieVisitorD();
	}
};

Game_Actor.prototype.updateReceptionistBattleGoblinTachie = function() {
	if($gameTroop._goblins_distanceSlot) {
		if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FARTHEST]) {
			if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FARTHEST].isErect || $gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FARTHEST].isHorny)
				this.setTachieFrontA('goblin_blush');
			else
				this.setTachieFrontA('goblin_normal');
		}
		else {
			this.resetTachieFrontA();
		}
		
		if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FAR]) {
			if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FAR].isErect || $gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_FAR].isHorny)
				this.setTachieFrontB('goblin_blush');
			else
				this.setTachieFrontB('goblin_normal');
		}
		else {
			this.resetTachieFrontB();
		}
		
		if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_MEDIUM]) {
			if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_MEDIUM].isErect || $gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_MEDIUM].isHorny)
				this.setTachieFrontC('goblin_blush');
			else
				this.setTachieFrontC('goblin_normal');
		}
		else {
			this.resetTachieFrontC();
		}
		
		if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE]) {
			let tachieFrontDName = 'goblin_';
			if(this.isBodySlotPenis(PUSSY_ID)) {
				tachieFrontDName += 'manko';
				if(Karryn.isCensored())
					tachieFrontDName += '_cen';
			}
			else if(this.isBodySlotTongue(PUSSY_ID)) {
				tachieFrontDName += 'cl';
			}
			else if(this.isBodySlotPenis(ANAL_ID)) {
				tachieFrontDName += 'anaru';
				if(Karryn.isCensored())
					tachieFrontDName += '_cen';
			}
			else if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE].isErect || $gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE].isHorny) {
				tachieFrontDName += 'blush';
				if(Karryn.isCensored())
					tachieFrontDName += '_cen';
			}
			else {
				tachieFrontDName += 'normal';
				if(Karryn.isCensored())
					tachieFrontDName += '_cen';
			}
			
			this.setTachieFrontD(tachieFrontDName);
		}
		else {
			this.resetTachieFrontD();
		}
	}
};

Game_Actor.prototype.receptionistBattle_makeSexualNoise = function(value, frontLiquidSpotting) {
	let noiseMultipler = 1;
	let generalReactionScore = this.getReactionScore();
	
	if(frontLiquidSpotting) {
		value += this.getTachieSemenDeskId() * 0.5;
		value += this.getTachieSemenBoobsId();
		value += this.getTachieSemenFaceId();
	}
	else {
		if(generalReactionScore >= VAR_DEF_RS_LV3_REQ) 
			noiseMultipler = 5;
		else if(generalReactionScore >= VAR_DEF_RS_LV2_REQ) 
			noiseMultipler = 3;
		else if(generalReactionScore >= VAR_DEF_RS_LV1_REQ) 
			noiseMultipler = 2;	
	}
	
	let noiseValue = value * noiseMultipler;
	if(noiseValue === 0) return;
	
	let queueLength = $gameTroop._deskQueue.length;
	if(queueLength > 0) {
		for(let i = 0; i < $gameTroop._deskQueue.length; ++i) {
			let visitor = $gameTroop._deskQueue[i];
			let spotChance = 0;
			if(i === 0) spotChance = RECEPTIONIST_CHANCE_OF_VISITOR_A_NOTICING;
			else if(i === 1 && !frontLiquidSpotting) spotChance = RECEPTIONIST_CHANCE_OF_VISITOR_B_NOTICING;
			else if(i === 2 && !frontLiquidSpotting) spotChance = RECEPTIONIST_CHANCE_OF_VISITOR_C_NOTICING;
			else if(i === 3 && !frontLiquidSpotting) spotChance = RECEPTIONIST_CHANCE_OF_VISITOR_D_NOTICING;
			
			if(visitor._visitor_isFan) 
				spotChance *= RECEPTIONIST_CHANCE_OF_FAN_NOTICING_MULTI;
			
			let spotted = Math.randomInt(100) < spotChance * noiseValue;
			if(spotted) {
				if(!visitor._visitor_spottedNaughtyAct) {
					visitor._visitor_spottedNaughtyAct = true;
					$gameParty.increaseReceptionistVisitorSpottedNaughtyActs(value);
				}
					
				if(visitor.isVisitorMaleType && visitor._visitor_isPervert && !visitor._perv_hasSecondRequest) {
					let chanceToRequestHigher = Math.randomInt($gameParty._receptionistNotoriety + $gameParty._receptionistFame);
					if(visitor._visitor_isFan) chanceToRequestHigher += Math.randomInt($gameParty._receptionistFame * 0.5)
					
					if(visitor.isHorny) chanceToRequestHigher *= 3;
					else if(visitor.isAroused()) chanceToRequestHigher *= 2;
					else chanceToRequestHigher *= 0.4;
					
					if(chanceToRequestHigher > $gameParty._receptionistNotoriety * 0.8) 
						visitor._perv_hasSecondRequest = true;
				}	
				else if(visitor.isVisitorMaleType && !visitor._visitor_isPervert) {
					if(Math.randomInt(100) < visitor._visitor_pervPromoteChance) {
						if(!visitor._visitor_isIdentified) {
							visitor._visitor_isPervert = true;
						}
					}
					
					if(visitor.isWanted) {
						let wantedStatus = Prison.getWantedEnemyById(visitor.getWantedId());
						if(visitor._visitor_pervPromoteChance < 100) {
							visitor._visitor_pervPromoteChance += VISITOR_WANTED_PERV_PROMOTE_CHANCE_INC;
							wantedStatus._visitor_pervPromoteChance += VISITOR_WANTED_PERV_PROMOTE_CHANCE_INC;
						}
					}
				}
				
				if(!visitor._visitor_isPervert && visitor._visitor_isAngry) {
					visitor.receptionistBattle_action_leavesAngry();
				}
			}
		}
	}
	
	
};

////////////
///////////
// Skills

// Call Visitor
// Summon Visitor


Game_Actor.prototype.skillCost_receptionistBasicSkills = function() {
	let multipler = 1;
	if(this.justOrgasmed()) multipler *= 2.5;
	return Math.round(this.realMaxStamina * 0.03 * multipler);
};
Game_Actor.prototype.skillCost_receptionistAdvancedSkills = function() {
	let multipler = 1;
	if(this.justOrgasmed()) multipler *= 2.5;
	return Math.round(this.realMaxStamina * 0.08 * multipler);
};

Game_Actor.prototype.showEval_receptionistBattle_callUnknownVisitor = function() {
	//return $gameTroop.receptionistBattle_unknownVisitorsNotAtDesk().length > 0;
	return !this.showEval_receptionistBattle_acceptRequest();
	//return true;
};
Game_Actor.prototype.customReq_receptionistBattle_callUnknownVisitor = function() {
	if(this.showEval_receptionistBattle_acceptRequest()) 
		return false;
	
	let visitorNeedCalling = false;
	for(let i = 0; i < $gameTroop._visitorSeats.length; ++i) {
		let visitor = $gameTroop._visitorSeats[i];
		if(visitor && visitor.isValidTargetForReceptionistBattle_callUnknownVisitor()) {
			visitorNeedCalling = true;
			break;
		}
	}
	return visitorNeedCalling;
};
Game_Actor.prototype.afterEval_receptionistBattle_callUnknownVisitor = function(target) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_SUMMON_VISITOR_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_SUMMON_VISITOR_NORMAL);
	}

	if(target._visitor_finishWalkingToDeskTime === -1) {
		target.setVisitorLocationToMoving();
		target.setVisitorFinishWalkingToDeskTime(VISITOR_DESK_DISTANCE);
	}
};

// Greet Visitor

Game_Actor.prototype.showEval_receptionistBattle_greetVisitor = function() {
	return !this.showEval_receptionistBattle_getVisitorPapers() && !this.showEval_receptionistBattle_apologize() && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_greetVisitor = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk())
		return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor.visitorStatusIsUnknown() && !deskVisitor._visitor_isAngry;
};
Game_Actor.prototype.afterEval_receptionistBattle_greetVisitor = function(target) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_GREET_VISITOR_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_GREET_VISITOR_NORMAL);
	}
	this.gainCharmExp(6, this.level);
	this._receptionist_greetVisitor_waitingForResponse = true;
};
Game_Actor.prototype.receptionistBattle_greetVisitor_response = function() {
	let target = $gameTroop.receptionistBattle_visitorAtDesk();

	// Perv
	if(target._visitor_isPervert) {
		target._perv_waitingForRequestResponse = true;
		target._visitor_isIdentified = true;
		
		let isAlsoFan = target._visitor_isFan;
		let requestId = target._visitor_requestID;
		
		if(requestId === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
			if(isAlsoFan)
				BattleManager.actionRemLines(ENEMY_LINE_FAN_GREET_BOOBSHAKE);
			else
				BattleManager.actionRemLines(ENEMY_LINE_PERV_GREET_BOOBSHAKE);
		}
		else if(requestId === VISITOR_REQUEST_KISS_ID) {
			if(isAlsoFan)
				BattleManager.actionRemLines(ENEMY_LINE_FAN_GREET_KISS);
			else
				BattleManager.actionRemLines(ENEMY_LINE_PERV_GREET_KISS);
		}
		else if(requestId === VISITOR_REQUEST_HANDJOB_ID) {
			if(isAlsoFan)
				BattleManager.actionRemLines(ENEMY_LINE_FAN_GREET_HANDJOB);
			else
				BattleManager.actionRemLines(ENEMY_LINE_PERV_GREET_HANDJOB);
		}
		else if(requestId === VISITOR_REQUEST_BLOWJOB_ID) {
			if(isAlsoFan)
				BattleManager.actionRemLines(ENEMY_LINE_FAN_GREET_BLOWJOB);
			else
				BattleManager.actionRemLines(ENEMY_LINE_PERV_GREET_BLOWJOB);
		}
		
		AudioManager.playSe({name:'+Voice_Enemy_a', pan:0, pitch:100, volume:80});
		this.emoteReceptionistPose();
	}
	// Fan
	else if(target._visitor_isFan) {
		target._fan_waitingForRequestResponse = true;
		target._visitor_isIdentified = true;
		
		target._visitor_requestID = VISITOR_REQUEST_HAND_SHAKE_ID;
		BattleManager.actionRemLines(ENEMY_LINE_FAN_GREET_HANDSHAKE);
	}
	// Not fan - normal visitor
	else {
		BattleManager._logWindow.push('addText', TextManager.receptionistGreetVisitorResultNormal.format(target.displayName()));
		this.receptionistBattle_giveVisitorTheirPapers(target);
	}
	
	this._receptionist_greetVisitor_gotResponse = true;
};

Game_Actor.prototype.receptionistBattle_giveVisitorTheirPapers = function(target) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_GIVE_PAPER_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_GIVE_PAPER_NORMAL);
	}
	AudioManager.playSe({name:'+Waitress_Pay1', pan:0, pitch:100, volume:70});
	
	target.setVisitorLocationToMoving();
	target.setVisitorStatusToWriting();
	target.setVisitorFinishWalkingToSeatTime(VISITOR_DESK_DISTANCE);
	target.receptionistBattle_leaveDeskQueue();
};

// Get Paper

Game_Actor.prototype.showEval_receptionistBattle_getVisitorPapers = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk() || this.showEval_receptionistBattle_acceptRequest())
		return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor.visitorStatusIsWriting() && deskVisitor._visitor_finishedWritingPapers && !deskVisitor._visitor_isAngry;
};
Game_Actor.prototype.afterEval_receptionistBattle_getVisitorPapers = function(target) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_RECEIVE_PAPER_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_RECEIVE_PAPER_NORMAL);
	}
	
	target.setVisitorLocationToMoving();
	target.setVisitorStatusToPaper();
	target._visitor_handedOverPapers = true;
	
	target.setVisitorFinishWalkingToSeatTime(VISITOR_DESK_DISTANCE);
	target.receptionistBattle_leaveDeskQueue();
	
};

// Processing Papers
// Process Papers skill

Game_Actor.prototype.showEval_receptionistBattle_beginProcessingPapers = function() {
	return this.receptionistBattle_remainingProcessingPapersTime() === -1 && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_beginProcessingPapers = function() {
	if($gameTroop.receptionistBattle_thereIsVisitorAtDesk() || this.showEval_receptionistBattle_acceptRequest()) return false;
	if(this.showEval_receptionistBattle_acceptRequest() || this.showEval_receptionistBattle_apologize())
		return false;
	let hasPapersNeedingProcessing = false;
	for(let i = 0; i < $gameTroop._visitorSeats.length; ++i) {
		let visitor = $gameTroop._visitorSeats[i];
		if(visitor && visitor.isValidTargetForReceptionistBattle_beginProcessingPapers()) {
			hasPapersNeedingProcessing = true;
			break;
		}
	}
	return hasPapersNeedingProcessing && !this.receptionistBattle_isLayingOnDesk();
};
Game_Actor.prototype.afterEval_receptionistBattle_beginProcessingPapers = function(target) {
	//set time
	this._receptionist_currentlyProcessingPapers = true;
	this._receptionist_currentlyProcessingPapersOfVisitor = target._visitorSeatId;
	this._receptionist_remainingProcessingPaperTime = this.calculateReceptionistPaperworkProcessingTime(target._visitor_pages); 
	this.emoteReceptionistPose();
};

Game_Actor.prototype.skillCost_receptionistProcessPaper = function() {
	return Math.round(this.realMaxStamina * 0.06);
};

Game_Actor.prototype.calculateReceptionistPaperworkProcessingTime = function(pages) {
	let time = RECEPTIONIST_PROCESS_PAPER_BASE_TIME;
	
	time += RECEPTIONIST_PROCESS_PAPER_EACH_TIME * pages;
	
	return time;
};

// Continue Processing
Game_Actor.prototype.showEval_receptionistBattle_continueProcessingPapers = function() {
	return this.receptionistBattle_remainingProcessingPapersTime() > 0;
};
Game_Actor.prototype.customReq_receptionistBattle_continueProcessingPapers = function() {
	if(this.stamina < this.skillCost_receptionistProcessPaper())
		return false;
	if($gameTroop.receptionistBattle_thereIsVisitorAtDesk() || this.showEval_receptionistBattle_acceptRequest() || this.justOrgasmed()) return false;
	return !this.receptionistBattle_isLayingOnDesk();
};
Game_Actor.prototype.continueProcessingPapersWillCost = function() {
	let willCost = 10;
	if(this.isUsingThisTitle(TITLE_ID_RECEPTIONIST_PAPERWORK_PROCESSOR))
		willCost += 2;
	return willCost;
};
Game_Actor.prototype.afterEval_receptionistBattle_continueProcessingPapers = function(calledFromonTurnEnd) {
	if(calledFromonTurnEnd) {
		let processingSpeed = this.receptionistBattle_processingPapersSpeed();
		this.receptionistBattle_decreaseRemainingProcessingPapersTime(processingSpeed);
		this._hp -= this.skillCost_receptionistProcessPaper();
		if(this.will >= this.continueProcessingPapersWillCost()) {
			this.gainMindExp(Math.round(processingSpeed * 0.35), this.level);
			this.gainWill(-this.continueProcessingPapersWillCost());
		}
		else {
			this.gainMindExp(Math.round(processingSpeed * 0.1), this.level);
		}
	}
	
	if(this.receptionistBattle_remainingProcessingPapersTime() > 0) {
		//message continue
		this._receptionist_currentlyProcessingPapers = true;
		//Remline if sex
		this.emoteReceptionistPose();
	}
	else {
		//let finishedVisitor = this._receptionist_currentlyProcessingPapersOfVisitor;
		let finishedVisitor = $gameTroop._visitorSeats[this._receptionist_currentlyProcessingPapersOfVisitor];
		
		BattleManager._logWindow.push('addText', TextManager.receptionistFinishedProcessingPapers.format(finishedVisitor.displayName(), finishedVisitor._visitor_time));
		AudioManager.playSe({name:'+Se2', pan:0, pitch:100, volume:70});
		
		finishedVisitor.setVisitorStatusToTime();
		
		this._receptionist_currentlyProcessingPapers = false;
		this._receptionist_currentlyProcessingPapersOfVisitor = false;
		this._receptionist_remainingProcessingPaperTime = -1;
		this._playthroughRecordReceptionistPagesProcessedCount += finishedVisitor._visitor_pages;
		this.emoteReceptionistPose();
	}
	
};

Game_Actor.prototype.receptionistBattle_remainingProcessingPapersTime = function() {
	return this._receptionist_remainingProcessingPaperTime;
};
Game_Actor.prototype.receptionistBattle_decreaseRemainingProcessingPapersTime = function(time) {
	this._receptionist_remainingProcessingPaperTime -= time;
};
//Processing Speed
Game_Actor.prototype.receptionistBattle_processingPapersSpeed = function() {
	let speed = 8.5;
	
	if(this.hasThisTitle(TITLE_ID_RECEPTIONIST_PAPERWORK_PROCESSOR)) {
		if(this.isUsingThisTitle(TITLE_ID_RECEPTIONIST_PAPERWORK_PROCESSOR)) {
			speed += 6.5;
		}
		else {
			speed += 2.5;
		}
	}
	
	if(this.will >= this.continueProcessingPapersWillCost()) {
		speed *= 1.75;
	}
	if(this.receptionistBattle_isHavingSexBehind()) {
		speed *= 0.75;
	}
	if(this.isWearingAnyToy()) {
		speed *= 0.75;
	}
	
	
	return Math.ceil(speed);
};

// Assign To Visiting Room

Game_Actor.prototype.showEval_receptionistBattle_assignToVisitingRoom = function(roomId) {
	return $gameParty.maxAvailableVisitorRooms() > roomId && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_assignToVisitingRoom = function() {
	return $gameTroop.receptionistBattle_visitorsReadyForVisitingRoom().length > 0;
};
Game_Actor.prototype.afterEval_receptionistBattle_assignToVisitingRoom = function(target, roomId) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_ASSIGN_ROOM_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_ASSIGN_ROOM_NORMAL);
	}
	
	target._visitor_assignedVisitingRoom = roomId;
	if(target.visitorLocationIsDesk() || target.visitorLocationIsLine()) {
		target.receptionistBattle_leaveDeskQueue();
	}
	target.setVisitorLocationToMoving();
	target.setVisitorFinishWalkingToVisitingRoomTime(VISITOR_ROOM_DISTANCE);
	
};

// Check Visiting Room Status

Game_Actor.prototype.showEval_receptionistBattle_checkVisitingRoomStatus = function(roomId) {
	return $gameParty.maxAvailableVisitorRooms() > roomId && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_checkVisitingRoomStatus = function() {
	return !this.receptionistBattle_isLayingOnDesk();
};
Game_Actor.prototype.afterEval_receptionistBattle_checkVisitingRoomStatus = function(roomId) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_CHECK_ROOM_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_CHECK_ROOM_NORMAL);
	}
	
	this._receptionist_checkingVisitingRoom_startingPhoneCall = true;
	this._receptionist_checkingVisitingRoomId = roomId;
	this.emoteReceptionistPose();
};

Game_Actor.prototype.receptionistBattle_checkVisitingRoomStatus_response = function() {
	let roomId = this._receptionist_checkingVisitingRoomId;
	let roomTime = $gameParty._receptionistBattle_visitingRoomTime[roomId];
	
	//guard message, depending on if it is available or not
	if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= roomTime) {
		BattleManager._logWindow.push('addText', TextManager.receptionistVisitingRoomStatusNotOccupied.format(TextManager.visitorRoomName(roomId)));
	}
	else {
		let secondsLeft = roomTime - $gameParty.receptionistBattle_getCurrentTimeInSeconds();
		let minutesLeft = Math.ceil(secondsLeft / 60);
		
		if(minutesLeft === 1) {
			BattleManager._logWindow.push('addText', TextManager.receptionistVisitingRoomStatusOccupiedSingle.format(TextManager.visitorRoomName(roomId)));
		}
		else {
			BattleManager._logWindow.push('addText', TextManager.receptionistVisitingRoomStatusOccupiedPlural.format(TextManager.visitorRoomName(roomId), minutesLeft));
		}
	}
	
	this._receptionist_checkingVisitingRoom_endingPhoneCall = true;
};

// Apologize

Game_Actor.prototype.showEval_receptionistBattle_apologize = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk())
		return false;
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	return deskVisitor._visitor_isAngry;
};
Game_Actor.prototype.afterEval_receptionistBattle_apologize = function(target) {
	//Normal apology
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_NORMAL_APOLOGY_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_NORMAL_APOLOGY_NORMAL);
	}
	
	target._visitor_isAngry = false;
	target._visitor_isAngry_fromBadVisitingRoom = false;
	target._visitor_assignedVisitingRoom = -1;
	target.setVisitorLocationToSitting();
	target.setVisitorFinishWalkingToSeatTime(VISITOR_DESK_DISTANCE);
	target.receptionistBattle_leaveDeskQueue();
};

//Reject Request
Game_Actor.prototype.showEval_receptionistBattle_rejectRequest = function() {
	if(this.showEval_receptionistBattle_apologize())
		return false;
	return $gameTroop.receptionistBattle_fanWaitingForResponse() || $gameTroop.receptionistBattle_pervWaitingForResponse();
};
Game_Actor.prototype.customReq_receptionistBattle_rejectRequest = function() {
	let canAcceptRequest = this.customReq_receptionistBattle_acceptRequest();
	let isHorny = this.isHorny;

	if(canAcceptRequest && isHorny) return false; 
	
	return true;
};
Game_Actor.prototype.afterEval_receptionistBattle_rejectRequest = function(target) {
	let respondingToSecondRequest = false;
	if(target._visitor_isPervert) {
		if(target._perv_waitingForSecondRequestResponse) {
			target._perv_secondRequestRejected = true;
			target._perv_waitingForSecondRequestResponse = false;
			respondingToSecondRequest = true;
		}
		else if(target._perv_waitingForRequestResponse) {
			target._perv_requestRejected = true;
			target._perv_currentlyGettingRequestFulfilled = false;
			target._perv_waitingForRequestResponse = false;
		}
	}
	
	if(!respondingToSecondRequest) {
		if(target._visitor_isFan && target._fan_waitingForRequestResponse) {
			target._fan_requestRejected = true;
			target._fan_currentlyGettingRequestFulfilled = false;
			target._fan_waitingForRequestResponse = false;
		}
		
		if(this.receptionistBattle_isSayingSexualLines()) {
			BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_REJECT_REQUEST_SEXUAL);
		}
		else {
			BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_REJECT_REQUEST_NORMAL);
		}
		
		if(target._visitor_isVisiting) {
			this.receptionistBattle_giveVisitorTheirPapers(target);
		}
		else if(target._visitor_isPervert) {
			target.receptionistBattle_action_pervLeaves();
		}
		else {
			target.receptionistBattle_action_fanLeaves();
		}
	}
};

//Accept Request
Game_Actor.prototype.showEval_receptionistBattle_acceptRequest = function() {
	return $gameTroop.receptionistBattle_fanWaitingForResponse() || $gameTroop.receptionistBattle_pervWaitingForResponse();
};
Game_Actor.prototype.customReq_receptionistBattle_acceptRequest = function() {
	let meetConditions = false;
	let visitor = $gameTroop.receptionistBattle_visitorAtDesk();
	let requestId = 0;
	
	if(visitor._perv_waitingForSecondRequestResponse)
		requestId = visitor._perv_secondRequestID;
	else 
		requestId = visitor._visitor_requestID;
	
	if(requestId === VISITOR_REQUEST_HAND_SHAKE_ID) {
		meetConditions = true;
	}
	else {
		if(requestId === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
			meetConditions = this.canGetBoobsPetted();
		}
		else if(requestId === VISITOR_REQUEST_KISS_ID) {
			meetConditions = this.canGetKissed(KISS_LVL_ONE);
		}
		else if(requestId === VISITOR_REQUEST_HANDJOB_ID) {
			meetConditions = this.canGetLeftHandInserted();
		}
		else if(requestId === VISITOR_REQUEST_BLOWJOB_ID) {
			meetConditions = this.canGetMouthInserted();
		}
		
		if(visitor.isWanted) {
			let wantedStatus = Prison.getWantedEnemyById(visitor.getWantedId());
			if(!wantedStatus._visitor_isPervert && wantedStatus._visitor_pervPromoteChance >= 100) {
				wantedStatus._visitor_isPervert = true;
			}
		}
	}
	
	return meetConditions;
};
Game_Actor.prototype.afterEval_receptionistBattle_acceptRequest = function(target) {
	if(target._perv_waitingForRequestResponse) {
		target._perv_currentlyGettingRequestFulfilled = true;
		target._perv_waitingForRequestResponse = false;
		
		let requestId = target._visitor_requestID;
		if(requestId === VISITOR_REQUEST_BLOWJOB_ID) {
			target._perv_queuedJoinSkill = SKILL_ENEMY_POSEJOIN_RECEPTIONIST_MOUTH_ID;
			target._perv_kissing = false;
			target._perv_touchingBoobs = false;
		}
		else if(requestId === VISITOR_REQUEST_HANDJOB_ID) {
			target._perv_queuedJoinSkill = SKILL_ENEMY_POSEJOIN_RECEPTIONIST_LEFT_HAND_ID;
		}
		else if(requestId === VISITOR_REQUEST_KISS_ID) {
			target._perv_kissing = true;
		}
		else if(requestId === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
			target._perv_touchingBoobs = true;
		}
		
		BattleManager.playSpecialBgm_ReceptionistSex();
	}
	else if(target._perv_waitingForSecondRequestResponse) {
		target._perv_secondRequestAccepted = true;
		target._perv_waitingForSecondRequestResponse = false;
		
		let requestId = target._perv_secondRequestID;
		if(requestId === VISITOR_REQUEST_BLOWJOB_ID) {
			target._perv_queuedJoinSkill = SKILL_ENEMY_POSEJOIN_RECEPTIONIST_MOUTH_ID;
			target._perv_kissing = false;
			target._perv_touchingBoobs = false;
		}
		else if(requestId === VISITOR_REQUEST_HANDJOB_ID) {
			target._perv_queuedJoinSkill = SKILL_ENEMY_POSEJOIN_RECEPTIONIST_LEFT_HAND_ID;
		}
		else if(requestId === VISITOR_REQUEST_KISS_ID) {
			target._perv_kissing = true;
		}
		else if(requestId === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
			target._perv_touchingBoobs = true;
		}
		
		target._perv_turnsUntilRequestFinished += Math.randomInt(3) + 1;
		
		BattleManager.playSpecialBgm_ReceptionistSex();
	}
	else if(target._fan_waitingForRequestResponse) {
		target._fan_currentlyGettingRequestFulfilled = true;
		target._fan_waitingForRequestResponse = false;
		this.emoteReceptionistPose();
	}
	
	//this.updateReceptionistBattleVisitorQueueTachie();
};

// Breather
Game_Actor.prototype.showEval_receptionistBattle_Breather = function() {
	return !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_Breather = function() {
	return true;
};
Game_Actor.prototype.dmgFormula_receptionistBattle_Breather = function() {
	let percent = Math.max(0.1, this.hrg * 10);
	let dmg = this.maxstamina * percent;
	return Math.round(dmg);
};
Game_Actor.prototype.afterEval_receptionistBattle_Breather = function() {
	this.emoteReceptionistPose();
};

// End Shift
Game_Actor.prototype.showEval_receptionistBattle_endShift = function() {
	return $gameParty._receptionistBattle_additionalPotentialVisitors === 0 && $gameTroop.receptionistBattle_visitors().length === 0;
};
Game_Actor.prototype.customReq_receptionistBattle_endShift = function() {
	return $gameTroop.receptionistBattle_countGoblins() === 0;
};
Game_Actor.prototype.afterEval_receptionistBattle_endShift = function() {
	$gameParty.receptionBattle_advanceTimeBySeconds($gameParty._receptionistBattle_timeLimit - $gameParty.receptionistBattle_getCurrentTimeInSeconds());
};

// Fix clothes
Game_Actor.prototype.showEval_receptionistBattle_fixClothes = function() {
	return !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_fixClothes = function() {
	if(this.justOrgasmed()) return false;
	return !this.isClothingMaxDamaged() && !this.isClothingNotDamaged() && !this.receptionistBattle_isHavingSexBehind() && !this.receptionistBattle_isLayingOnDesk();
};
Game_Actor.prototype.afterEval_receptionistBattle_fixClothes = function() {
	this.restoreClothingDurability();
	this.addToFixClothesUsageCountRecord();
	this.emoteReceptionistPose();
};

// Shoo Away

Game_Actor.prototype.showEval_receptionistBattle_shooAway = function() {
	return $gameTroop.receptionistBattle_countGoblins() > 0 && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_shooAway = function() {
	return !this.receptionistBattle_isLayingOnDesk() && this.isBodySlotFree(LEFT_HAND_ID) && !this.isHorny;
};
Game_Actor.prototype.skillCost_receptionistBattle_shooAway = function() {
	let multipler = 1;
	if(this.justOrgasmed()) multipler *= 2;
	return Math.round(this.realMaxStamina * 0.05 * multipler);
};
Game_Actor.prototype.afterEval_receptionistBattle_shooAway = function(target) {
	if(this.receptionistBattle_isSayingSexualLines()) {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_SHOO_AWAY_SEXUAL);
	}
	else {
		BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_SHOO_AWAY_NORMAL);
	}
	
	let goblins = $gameTroop.receptionistBattle_goblins();
	for(let i = 0; i < goblins.length; ++i) {
		goblins[i].addState(STATE_RECEPTIONIST_SHOOED_ID);
	}
};

// Kick Away

Game_Actor.prototype.showEval_receptionistBattle_kickAway = function() {
	return $gameTroop.receptionistBattle_countGoblins() > 0 && !this.showEval_receptionistBattle_acceptRequest();
};
Game_Actor.prototype.customReq_receptionistBattle_kickAway = function() {
	return !this.receptionistBattle_isLayingOnDesk() && !this.receptionistBattle_isHavingSexBehind() && !this.isHorny && 
	($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_MEDIUM] || ($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE] && !$gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE].isInAPose()));
};
Game_Actor.prototype.skillCost_receptionistBattle_kickAway = function() {
	let staminaCost = this.skillAttack_staminaCost(30, 0.5, 0, 0);
	let multipler = 5;
	if(this.justOrgasmed()) multipler *= 3;
	return Math.round(staminaCost * multipler);
};
Game_Actor.prototype.afterEval_receptionistBattle_kickAway = function(target) {
	BattleManager.actionRemLines(KARRYN_LINE_RECEPTIONIST_KICK_AWAY);
	
	target.addState(STATE_RECEPTIONIST_KICKED_ID);
	this._playthroughRecordKickAttackUsage++;
	
	let prekickDistanceSlot = target._goblinDistanceSlot;
	
	if($gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1]) {
		if($gameTroop._goblins_distanceSlot[prekickDistanceSlot - 2]) {
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 2].addState(STATE_RECEPTIONIST_KICKED_ID);
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1].addState(STATE_RECEPTIONIST_KICKED_ID);
		}
		else {
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1].addState(STATE_RECEPTIONIST_KICKED_ID);
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1]._goblinDistanceSlot = prekickDistanceSlot - 2;
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 2] = $gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1];
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot] = false;
			$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1] = target;
			target._goblinDistanceSlot = prekickDistanceSlot - 1;
		}
	}
	else {
		$gameTroop._goblins_distanceSlot[prekickDistanceSlot] = false;
		$gameTroop._goblins_distanceSlot[prekickDistanceSlot - 1] = target;
		target._goblinDistanceSlot = prekickDistanceSlot - 1;
	}
	
	this.updateReceptionistBattleGoblinTachie();
};

//////////////
////////////////
// Game Troop
////////////////
//////////////

//////
// Setup

Game_Troop.prototype.setupReceptionistBattle = function(troopId) {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	this._visitorSeats = [ false, false, false, false, false, false, false, false ];
	this._goblins_distanceSlot = [ -1, false, false, false, false, false, false, false ];
	this._goblins_spawned_count = 0;
	this._goblins_spawned_max = 1;
	let visitors = this.receptionistBattle_startingVisitors();
	this._deskQueue = [];
	
	//Enemies
	for(let i = 0; i < visitors.length; ++i) {
		let enemyId = visitors[i];
		let enemy = this.setup_receptionistBattle_visitor(enemyId);
		enemy._visitor_isStarter = true;
	}
	this.makeUniqueNames();
	
	///////////
	//Spawn
	
	this._nextVisitorSpawnTimeLimit = $gameTroop.receptionistBattle_nextVisitorSpawnTime();
	
	//Goblin
	let goblinPassiveLevel = actor.reactionScore_enemyGoblinPassive() / 10;
	if(actor.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE))
		goblinPassiveLevel += 1;
	
	if(!DEBUG_MODE) {
		this._goblins_spawned_max = 0;
	}
	else if(goblinPassiveLevel >= 5) {
		this._goblins_spawned_max += 4 + Math.randomInt(7);
	}
	else if(goblinPassiveLevel >= 4) {
		this._goblins_spawned_max += 3 + Math.randomInt(6);
	}
	else if(goblinPassiveLevel >= 3) {
		this._goblins_spawned_max += 2 + Math.randomInt(4);
	}
	else if(goblinPassiveLevel >= 2) {
		this._goblins_spawned_max += 1 + Math.randomInt(3);
	}
	else if(goblinPassiveLevel >= 1) {
		this._goblins_spawned_max += 1 + Math.randomInt(2);
	}
	else {
		this._goblins_spawned_max += 0 + Math.randomInt(2);
	}
	
	this._nextGoblinSpawnTimeLimit = this.receptionistBattle_nextGoblinSpawnTime() * 0.5;
};

// Visitor Setup

Game_Troop.prototype.setup_receptionistBattle_visitor = function(enemyId) {
	let originalEnemyId = enemyId;
	let wanted = false;
	wanted = Prison.findAvailableWanted($dataEnemies[enemyId], 1);
	if(wanted) {
		enemyId = wanted._enemyId;
	}
	
	let seatId = -1;
	while(seatId === -1) {
		randomNum = Math.randomInt(this._visitorSeats.length);
		if(this._visitorSeats[randomNum] === false) {
			seatId = randomNum;
		}
	}
	
	let x = VISITOR_LEFT_SEAT_X;
	let y = VISITOR_FIRST_SEAT_Y;
	
	if(seatId >= 4) {
		x = VISITOR_RIGHT_SEAT_X;
		y += (seatId - 4) * VISITOR_ROW_Y;
	}
	else {
		y += seatId * VISITOR_ROW_Y;
	}
	
	
	let enemy = new Game_Enemy(enemyId, x, y, wanted, originalEnemyId);
	enemy._visitorSeatId = seatId;
	this._visitorSeats[seatId] = enemy;
	enemy._visitorPerformedCollapseAlready = false;
	this._enemies.push(enemy);
	enemy.setupForReceptionistBattle_visitor(wanted);
	
	return enemy;
};

Game_Troop.prototype.receptionistBattle_startingVisitors = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let visitors = [];
	let startingNum = 0;
	let satisfaction = $gameParty._receptionistSatisfaction;
	let fame = $gameParty._receptionistFame;
	let notoriety = $gameParty._receptionistNotoriety;
	
	if(satisfaction >= 20) startingNum = 3 + Math.randomInt(4);
	else if(satisfaction >= 10) startingNum = 3 + Math.randomInt(3);
	else if(satisfaction >= 7) startingNum = 2 + Math.randomInt(3);
	else startingNum = 2 + Math.randomInt(2);
	
	if(fame >= 15) startingNum += 1 + Math.randomInt(2);
	else if(fame >= 10) startingNum += Math.randomInt(2);
	else if(fame >= 6) startingNum += Math.max(0, Math.randomInt(3) - 1);

	if(notoriety >= 25) startingNum += 1 + Math.randomInt(4);
	else if(notoriety >= 20) startingNum += 1 + Math.randomInt(3);
	else if(notoriety >= 15) startingNum += 1 + Math.randomInt(2);
	else if(notoriety >= 10) startingNum += Math.randomInt(2);
	else if(notoriety >= 5) startingNum += Math.max(0, Math.randomInt(3) - 1);

	startingNum = Math.min(8, startingNum);
	startingNum = Math.max(3, startingNum);
	
	for(let i = 0; i < startingNum; ++i) {
		visitors.push(this.receptionistBattle_validVisitorId());
	}
	
	return visitors;
};

Game_Troop.prototype.receptionistBattle_validVisitorId = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let validEnemyTypes = [];
	
	if(Math.randomInt(100) < $gameParty.setReceptionistSatisfaction * 5 - 40) {
		validEnemyTypes.push(162);
		validEnemyTypes.push(163);
	}
	
	if(Math.randomInt(100) < $gameParty.setReceptionistSatisfaction * 5 - 30) {
		validEnemyTypes.push(164);
		validEnemyTypes.push(165);
	}
	
	if(Math.randomInt(100) < $gameParty.setReceptionistSatisfaction * 5 - 50) {
		validEnemyTypes.push(166);
		validEnemyTypes.push(167);
	}
	
	if(Math.randomInt(100) < $gameParty._receptionistFame * 5 - 20) {
		validEnemyTypes.push(168);
		validEnemyTypes.push(169);
	}
	
	if(Math.randomInt(100) < $gameParty._receptionistFame * 5 - 30) {
		validEnemyTypes.push(168);
		validEnemyTypes.push(169);
	}
	
	if(Math.randomInt(100) < $gameParty._receptionistNotoriety * 5 - 20) {
		validEnemyTypes.push(170);
		validEnemyTypes.push(171);
		validEnemyTypes.push(172);
	}
	
	if(Math.randomInt(100) < $gameParty._receptionistNotoriety * 5 - 30) {
		validEnemyTypes.push(170);
		validEnemyTypes.push(171);
		validEnemyTypes.push(172);
	}
	
	if($gameParty._receptionistNotoriety > 6 || $gameParty._receptionistFame > 6) {
		if(Math.randomInt(100) > $gameParty._receptionistNotoriety * 5 + $gameParty._receptionistFame * 3) {
			validEnemyTypes.push(162);
			validEnemyTypes.push(162);
			validEnemyTypes.push(163);
			validEnemyTypes.push(163);
			validEnemyTypes.push(164);
			validEnemyTypes.push(165);
			validEnemyTypes.push(166);
			validEnemyTypes.push(167);
		}
		else {
			validEnemyTypes.push(162);
			validEnemyTypes.push(163);
			validEnemyTypes.push(164);
		}
	}
	else {
		validEnemyTypes.push(162);
		validEnemyTypes.push(162);
		validEnemyTypes.push(163);
		validEnemyTypes.push(163);
		validEnemyTypes.push(164);
		validEnemyTypes.push(165);
		validEnemyTypes.push(166);
		validEnemyTypes.push(167);
	}
	
	//debugging: force certain types
	//validEnemyTypes = [ 170,171,172 ];
	//validEnemyTypes = [ 162 ];
	
	
	return validEnemyTypes[Math.randomInt(validEnemyTypes.length)];
};

// Goblin Setup

Game_Troop.prototype.setup_receptionistBattle_goblin = function(enemyId) {
	let originalEnemyId = enemyId;
	let wanted = false;
	wanted = Prison.findAvailableWanted($dataEnemies[enemyId], 1);
	if(wanted) {
		enemyId = wanted._enemyId;
	}
	
	let x = 2000;
	let y = 1500;
	
	let enemy = new Game_Enemy(enemyId, x, y, wanted, originalEnemyId);
	this._goblins_distanceSlot[GOBLIN_DISTANCE_FARTHEST] = enemy;
	enemy._goblinDistanceSlot = GOBLIN_DISTANCE_FARTHEST;
	enemy._goblinActionCooldown = 1;
	enemy._goblinPerformedCollapseAlready = false;
	this._enemies.push(enemy);
	//enemy.setupForReceptionistBattle(wanted);
	
	return enemy;
};

Game_Troop.prototype.receptionistBattle_validGoblinId = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let validEnemyTypes = [ 81, 82, 83 ];
	
	
	return validEnemyTypes[Math.randomInt(validEnemyTypes.length)];
};


/////////
// Add Icons to Starters
Game_Troop.prototype.receptionistBattle_setupStartingMembersIcons = function() {
	$gameTroop.receptionistBattle_visitors().forEach(function(member) {
		member.addState(member._visitor_status);
		member.addState(member._visitor_location);
	});	
};

///////
// Members function

Game_Troop.prototype.receptionistBattle_visitors = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isVisitorType;
    });
};
Game_Troop.prototype.receptionistBattle_goblins = function() {
	return this.members().filter(function(member) {
        return member.isGoblinType && member.isAlive();
    });
};

Game_Troop.prototype.receptionistBattle_visitorsReadyForVisitingRoom = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isVisitorType && member.isValidTargetForReceptionistBattle_assignVisitingRoom();
    });
};

Game_Troop.prototype.receptionistBattle_thereIsVisitorAtDesk = function() {
	if(!$gameTroop._deskQueue) return false;
	return $gameTroop._deskQueue.length > 0;
};
Game_Troop.prototype.receptionistBattle_visitorAtDesk = function() {
	if(!$gameTroop.receptionistBattle_thereIsVisitorAtDesk()) return false;
	return $gameTroop._deskQueue[0];
};
Game_Troop.prototype.receptionistBattle_fanWaitingForResponse = function() {
	if(!$gameTroop.receptionistBattle_visitorAtDesk()) return false;
	return $gameTroop._deskQueue[0]._fan_waitingForRequestResponse && !$gameTroop._deskQueue[0]._fan_requestRejected && !$gameTroop._deskQueue[0]._fan_requestWasFulfilled;
};
Game_Troop.prototype.receptionistBattle_pervWaitingForResponse = function() {
	if(!$gameTroop.receptionistBattle_visitorAtDesk()) return false;
	return ($gameTroop._deskQueue[0]._perv_waitingForRequestResponse || $gameTroop._deskQueue[0]._perv_waitingForSecondRequestResponse) && !$gameTroop._deskQueue[0]._perv_requestRejected && !$gameTroop._deskQueue[0]._perv_requestWasFulfilled;
};

Game_Troop.prototype.receptionistBattle_unknownVisitorsNotAtDesk = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isVisitorType && member.isValidTargetForReceptionistBattle_callUnknownVisitor();
    });
};

Game_Troop.prototype.receptionistBattle_countEmptySeats = function() {
	let count = 0;
	
	for(let i = 0; i < this._visitorSeats.length; ++i) {
		if(!this._visitorSeats[i]) count++;
	}
	
	return count;
};

Game_Troop.prototype.receptionistBattle_countGoblins = function() {
	return this.receptionistBattle_goblins().length;
};

////////
// Spawn

Game_Troop.prototype.receptionistBattle_spawnVisitor = function(forceSpawn) {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let emptySeatAvailable = this.receptionistBattle_countEmptySeats() > 0;
	let spawnedNewVisitor = false;
	
	if(forceSpawn || this._nextVisitorSpawnTimeLimit <= $gameParty.receptionistBattle_getCurrentTimeInSeconds()) {
		if(emptySeatAvailable && $gameParty._receptionistBattle_additionalPotentialVisitors > 0) {
			let enemyId = this.receptionistBattle_validVisitorId();
			let enemy = this.setup_receptionistBattle_visitor(enemyId);
			enemy.makeUniqueNames();
			enemy.onBattleStart();
			enemy.midBattleSpawn_setupDreamX();
			SceneManager._scene._spriteset.addEnemy(enemy);
			
			BattleManager._logWindow.push('addText', TextManager.receptionistNewVisitor.format(enemy.displayName()));
			AudioManager.playSe({name:'+Waitress_Chair2', pan:0, pitch:100, volume:90});
			
			enemy.setVisitorStatusToUnknown();
			enemy.setVisitorLocationToSitting();
			
			//enemy.setVisitorLocationToMoving();
			//enemy.setVisitorFinishWalkingToSeatTime(VISITOR_ROOM_DISTANCE);
			
			$gameParty._receptionistBattle_additionalPotentialVisitors--;
			spawnedNewVisitor = true;
		}	

		this._nextVisitorSpawnTimeLimit = $gameTroop.receptionistBattle_nextVisitorSpawnTime();
	}
	
	return spawnedNewVisitor;
};

Game_Troop.prototype.receptionistBattle_nextVisitorSpawnTime = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let currentTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	let addedTime = 0;
	let satisfaction = $gameParty._receptionistSatisfaction;
	let fame = $gameParty._receptionistFame;
	let notoriety = $gameParty._receptionistNotoriety;
	
	addedTime = Math.randomInt(300) + 200;
	
	if(satisfaction >= 25) addedTime -= (130 + Math.randomInt(140));
	else if(satisfaction >= 20) addedTime -= (110 + Math.randomInt(120));
	else if(satisfaction >= 14) addedTime -= (90 + Math.randomInt(100));
	else if(satisfaction >= 10) addedTime -= (70 + Math.randomInt(80));
	else if(satisfaction >= 7) addedTime -= (50 + Math.randomInt(60));
	
	if(fame >= 15) addedTime -= (30 + Math.randomInt(60));
	else if(fame >= 10) addedTime -= (20 + Math.randomInt(50));
	else if(fame >= 8) addedTime -= (10 + Math.randomInt(40));
	else if(fame >= 6) addedTime -= (Math.randomInt(30));

	if(notoriety >= 25) addedTime -= (50 + Math.randomInt(120));
	else if(notoriety >= 20) addedTime -= (40 + Math.randomInt(100));
	else if(notoriety >= 15) addedTime -= (30 + Math.randomInt(80));
	else if(notoriety >= 10) addedTime -= (20 + Math.randomInt(60));
	else if(notoriety >= 5) addedTime -= (10 + Math.randomInt(40));
	
	addedTime = Math.max(30 + Math.randomInt(60), addedTime);
	
	return currentTime + addedTime;
};


Game_Troop.prototype.receptionistBattle_spawnGoblin = function(forceSpawn) {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let goblinPassiveLevel = actor.reactionScore_enemyGoblinPassive() / 10;
	let goblinCount = this.receptionistBattle_countGoblins();
	let spawnedNewGoblin = false;
	let maxGoblinCount = 1;
	
	if(actor.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE))
		goblinPassiveLevel += 1;
	if(goblinPassiveLevel >= 5)
		maxGoblinCount = 3;
	else if(goblinPassiveLevel >= 3)
		maxGoblinCount = 2;
	

	if(forceSpawn || this._nextGoblinSpawnTimeLimit <= $gameParty.receptionistBattle_getCurrentTimeInSeconds()) {
		if(!this._goblins_distanceSlot[GOBLIN_DISTANCE_FARTHEST] && goblinCount < maxGoblinCount && this._goblins_spawned_count < this._goblins_spawned_max) {
			let enemyId = this.receptionistBattle_validGoblinId();
			let enemy = this.setup_receptionistBattle_goblin(enemyId);
			enemy.makeUniqueNames();
			enemy.onBattleStart();
			enemy.midBattleSpawn_setupDreamX();
			SceneManager._scene._spriteset.addEnemy(enemy);

			BattleManager._logWindow.push('addText', TextManager.receptionistNewGoblin);
			AudioManager.playSe({name:'Move3', pan:0, pitch:100, volume:70});
			
			spawnedNewGoblin = true;
			this._goblins_spawned_count++;
			this._nextGoblinSpawnTimeLimit = this.receptionistBattle_nextGoblinSpawnTime();
			//actor.emoteReceptionistPose();
			actor.updateReceptionistBattleGoblinTachie();
		}
	}
	
	return spawnedNewGoblin;
};

Game_Troop.prototype.receptionistBattle_nextGoblinSpawnTime = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let currentTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	let addedTime = 0;
	
	let goblinPassiveLevel = actor.reactionScore_enemyGoblinPassive() / 10;
	if(actor.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE)) {
		goblinPassiveLevel += 1;
	}
	
	if(!DEBUG_MODE) {
		addedTime = 99999;
	}
	else if(goblinPassiveLevel >= 5) {
		addedTime = Math.randomInt(180) + 60;
	}
	else if(goblinPassiveLevel >= 4) {
		addedTime = Math.randomInt(200) + 80;
	}
	else if(goblinPassiveLevel >= 3) {
		addedTime = Math.randomInt(240) + 100;
	}
	else if(goblinPassiveLevel >= 2) {
		addedTime = Math.randomInt(300) + 150;
	}
	else if(goblinPassiveLevel >= 1) {
		addedTime = Math.randomInt(400) + 200;
	}
	else {
		addedTime = Math.randomInt(600) + 200;
	}
	
	return currentTime + addedTime;
};

Game_Troop.prototype.onTurnEndSpecial_receptionistBattle = function(forceSpawn) {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let deskVisitor = $gameTroop.receptionistBattle_visitorAtDesk();
	
	////////////
	//Pass time
	$gameParty.receptionBattle_advanceTimeBySeconds(15);
	actor._receptionist_turnsTillMentalPhase = Math.max(0, actor._receptionist_turnsTillMentalPhase - 1);
	
	///////////
	//Check Horny
	if(actor.isHorny && $gameParty.receptionistBattle_getCurrentTimeInSeconds() >= actor._hornyTimeLimit) {
		actor.removeState(STATE_HORNY_ID);
	}
	
	/////////
	//Spawn Visitor
	this.receptionistBattle_spawnVisitor(false);
	
	/////////
	// Spawn Goblin
	this.receptionistBattle_spawnGoblin(false);
	
	
	//Disable receptionist or go into mental/action phase
	let skipTurn = false;
	
	//Just Orgasm
	/*
	if(actor.justOrgasmed()) {
		skipTurn = true;
	}
	*/
	
	//Greeting Visitor
	if(actor._receptionist_greetVisitor_gotResponse) {
		actor._receptionist_greetVisitor_waitingForResponse = false;
		actor._receptionist_greetVisitor_gotResponse = false;
	}
	
	if(actor._receptionist_greetVisitor_waitingForResponse) {
		skipTurn = true;
	}
	
	//On Phone Call
	if(actor._receptionist_checkingVisitingRoom_endingPhoneCall) {
		actor._receptionist_checkingVisitingRoom_startingPhoneCall = false;
		actor._receptionist_checkingVisitingRoom_endingPhoneCall = false;
	}
	
	if(actor._receptionist_checkingVisitingRoom_startingPhoneCall) {
		skipTurn = true;
	}
	
	//Process Papers
	if(actor._receptionist_currentlyProcessingPapers) {
		if(actor.customReq_receptionistBattle_continueProcessingPapers())
			skipTurn = true;
		else
			actor._receptionist_currentlyProcessingPapers = false;
	}
	
	if(deskVisitor && deskVisitor._fan_currentlyGettingRequestFulfilled) {
		skipTurn = true;
	}
	
	if(deskVisitor && deskVisitor._perv_currentlyGettingRequestFulfilled && !deskVisitor._perv_waitingForSecondRequestResponse) {
		skipTurn = true;
	}
	
	if(!skipTurn) {
		actor.removeState(STATE_DISABLED_ID);
		
		if(actor._receptionist_turnsTillMentalPhase > 0) {
			actor.enterActionPhase();
		}
		else {
			actor.enterMentalPhase();
		}
	}
	else if(actor.receptionistBattle_isGivingBlowjob() || actor.receptionistBattle_isGivingHandjob()) {
		if(actor._receptionist_visitorSexSkillCooldown > 0) {
			actor._receptionist_visitorSexSkillCooldown--;
			actor.addState(STATE_DISABLED_ID);
		}
		else {
			let skillArray = [];
			if(actor.receptionistBattle_isGivingBlowjob() && actor.hasPassive(PASSIVE_BJ_COUNT_TWO_ID)) {
				skillArray.push(SKILL_KARRYN_BLOWJOB_POSESKILL_ID);
				skillArray.push(SKILL_KARRYN_BLOWJOB_POSESKILL_ID);
			}
			if(actor.receptionistBattle_isGivingHandjob() && actor.hasPassive(PASSIVE_HJ_COUNT_TWO_ID)) {
				skillArray.push(SKILL_KARRYN_HANDJOB_POSESKILL_ID);
			}
			
			if(skillArray.length > 0) {
				actor.useAISkill(skillArray[Math.randomInt(skillArray.length)], deskVisitor);
				actor._receptionist_visitorSexSkillCooldown = 1;
			}
			else {
				actor._receptionist_visitorSexSkillCooldown = 1;
				actor.addState(STATE_DISABLED_ID);
			}
		}
	}
	//skipping turn
	else {
		actor.addState(STATE_DISABLED_ID);
		
		//Greeting Visitor
		if(actor._receptionist_greetVisitor_waitingForResponse) {
			actor.receptionistBattle_greetVisitor_response();
		}
		
		//Processing Papers
		else if(actor._receptionist_currentlyProcessingPapers && !actor.justOrgasmed()) {
			actor.afterEval_receptionistBattle_continueProcessingPapers(true);
		}
		
		//On Phone
		else if(actor._receptionist_checkingVisitingRoom_startingPhoneCall) {
			actor.receptionistBattle_checkVisitingRoomStatus_response();
		}
	}
		
	actor.emoteReceptionistPose();
};

/////////////
////////////////
// Game Enemy
////////////////
///////////////

/////////
// Setup
/////////
Game_Enemy.prototype.setupForReceptionistBattle_visitor = function(wanted) {
	this._visitor_number = $gameParty.getVisitorNumberOrderForNewVisitor();
	this._visitor_isStarter = false;
	this._visitor_isIdentified = false;
	this._visitor_isVisiting = true;
	this._visitor_isFan = false;
	this._visitor_isPervert = false;
	this._visitor_isAngry = false;
	this._visitor_isAngry_fromBadVisitingRoom = false;
	this._visitor_angryComplaintCooldown = 0;
	this._visitor_gotAngryCount = 0;
	this._visitor_spottedNaughtyAct = false;
	
	this._visitor_startingWritingPapers = false;
	this._visitor_finishedWritingPapers = false;
	this._visitor_handedOverPapers = false;
	
	
	
	this._visitor_status = STATE_VISITOR_STATUS_UNKNOWN_ID;
	this._visitor_location = STATE_VISITOR_LOCATION_SITTING_ID;
	this._visitor_assignedVisitingRoom = -1;
	
	this._visitor_pages = Math.randomInt(VISITOR_MAX_PAGES - VISITOR_MIN_PAGES) + VISITOR_MIN_PAGES;
	
	let minTime = VISITOR_BASE_MIN_TIME;
	let maxTime = VISITOR_BASE_MAX_TIME;
	if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_C)) maxTime += 1;
	if(Karryn.hasEdict(EDICT_REPAIR_VISITING_ROOM_D)) minTime += 1;
	this._visitor_time = Math.randomInt(maxTime - minTime) + minTime;
	
	if(!wanted) {
		this._visitor_walkingSpeed = Math.round(this.enemy().dataVisitorWalkingSpeed - Math.randomInt(this.enemy().dataVisitorWalkingSpeed * 0.1) + Math.randomInt(this.enemy().dataVisitorWalkingSpeed * 0.1));
		this._visitor_writingSpeed = Math.round(this.enemy().dataVisitorWritingSpeed - Math.randomInt(this.enemy().dataVisitorWritingSpeed * 0.1) + Math.randomInt(this.enemy().dataVisitorWritingSpeed * 0.1));
		
		this._visitor_pervPromoteChance = this.enemy().dataVisitorPervPromoteChance;
		
		this._visitor_dissatisfactionMultipler = Math.round(this.enemy().dataVisitorDissatisfaction - Math.randomInt(this.enemy().dataVisitorDissatisfaction * 0.1) + Math.randomInt(this.enemy().dataVisitorDissatisfaction * 0.1));
		this._visitor_dissatisfactionMultipler *= 0.1;
		
		let array = this.enemy().dataVisitorTachie.slice(0);
		let ranNum = Math.randomInt(array.length);
		this._visitor_tachieNum = array[ranNum];
		if(this._visitor_tachieNum < 10) this._visitor_tachieNum = '' + '0' + this._visitor_tachieNum;
		
		if(this.enemy().dataVisitorAlwaysFan == 1) 
			this._visitor_isFan = true;
		else if(this.enemy().dataVisitorCanBeFan == 1) 
			this._visitor_canBeFan = true;
		else
			this._visitor_canBeFan = false;
		
		if(this.enemy().dataVisitorAlwaysPervert == 1) 
			this._visitor_isPervert = true;
		else if(this.enemy().dataVisitorCanBePervert == 1) 
			this._visitor_canBePervert = true;
		else
			this._visitor_canBePervert = false;
		
		if(this.enemy().dataVisitorNotVisiting == 1) 
			this._visitor_isVisiting = false;
		else
			this._visitor_isVisiting = true;
		
	}
	
	else if(wanted) {
		this._visitor_isVisiting = false;
		this._visitor_walkingSpeed = wanted._visitor_walkingSpeed;
		this._visitor_writingSpeed = wanted._visitor_writingSpeed;
		this._visitor_dissatisfactionMultipler = wanted._visitor_dissatisfactionMultipler;
		this._visitor_tachieNum = wanted._visitor_tachieNum;
		this._visitor_isFan = wanted._visitor_isFan;
		this._visitor_isPervert = wanted._visitor_isPervert;
		this._visitor_pervPromoteChance = wanted._visitor_pervPromoteChance;
		
	}
	
	this._visitor_finishWalkingToDeskTime = -1;
	this._visitor_finishWalkingToSeatTime = -1;
	this._visitor_finishWalkingToRoomTime = -1;
	this._visitor_finishWritingPapersTime = -1;
	
	if(this._visitor_canBeFan) {
		let chanceToBeFan = $gameParty._receptionistFame;
		if($gameParty._receptionistFame < 15) 
			chanceToBeFan += $gameParty._receptionistFame;
		else
			chanceToBeFan += 15;
		if(Math.randomInt(100) < chanceToBeFan)
			this._visitor_isFan = true;
	}
	
	if(this._visitor_canBePervert) {
		let chanceToBePervert = $gameParty._receptionistNotoriety;
		if($gameParty._receptionistNotoriety < 15) 
			chanceToBePervert += $gameParty._receptionistNotoriety;
		else
			chanceToBePervert += 15;
		if(Math.randomInt(100) < chanceToBePervert)
			this._visitor_isPervert = true;
	}
	
	
	this.setupForReceptionistBattle_fan();
	this.setupForReceptionistBattle_pervert();

};	

Game_Enemy.prototype.setupForReceptionistBattle_fan = function() {
	this._fan_waitingForRequestResponse = false;
	this._fan_currentlyGettingRequestFulfilled = false;
	this._fan_requestRejected = false;
	this._fan_requestWasFulfilled = false;
	this._fan_turnsUntilRequestFinished = 0;
	this._fan_skillUseInterval = 0;
	this._fan_skillCooldown = 0;	
	this._fan_skillUseInterval = 1;
	this._fan_turnsUntilRequestFinished = 3 + Math.randomInt(2);
	if(!this._visitor_isVisiting) this._fan_turnsUntilRequestFinished += Math.randomInt(3);
};	

Game_Enemy.prototype.setupForReceptionistBattle_pervert = function() {
	this._visitor_requestID = 0;
	this._perv_skillUseInterval = 1;
	this._perv_skillCooldown = 0;
	this._perv_turnsUntilRequestFinished = 3 + Math.randomInt(3);
	this._perv_queuedJoinSkill = 0;
	
	this._perv_waitingForRequestResponse = false;
	this._perv_currentlyGettingRequestFulfilled = false;
	this._perv_requestRejected = false;
	this._perv_requestWasFulfilled = false;
	
	this._perv_secondRequestID = 0;
	this._perv_turnsUntilSecondRequest = -1;
	this._perv_hasSecondRequest = false;
	this._perv_waitingForSecondRequestResponse = false;
	this._perv_secondRequestRejected = false;
	this._perv_secondRequestAccepted = false;
	
	this._perv_gettingHJ = false;
	this._perv_gettingBJ = false;
	this._perv_kissing = false;
	this._perv_touchingBoobs = false;
	
	let desire = Math.min(50, Math.randomInt($gameParty._receptionistNotoriety * 5));
	if(desire === 50) {
		this._visitor_requestID = VISITOR_REQUEST_BLOWJOB_ID;
	}
	else if(desire >= 30) {
		this._visitor_requestID = VISITOR_REQUEST_HANDJOB_ID;
	}
	else if(desire >= 15) {
		this._visitor_requestID = VISITOR_REQUEST_KISS_ID;
	}
	else {
		this._visitor_requestID = VISITOR_REQUEST_BOOBS_SHAKE_ID;
	}
	
	let chanceToRequestHigher = Math.randomInt($gameParty._receptionistNotoriety + $gameParty._receptionistFame);
	if(this._visitor_isFan) chanceToRequestHigher += Math.randomInt($gameParty._receptionistFame * 0.5)
		
	//debugging: test for 2nd request or force certain request
	//this._visitor_requestID = VISITOR_REQUEST_BLOWJOB_ID;
	//chanceToRequestHigher = 100;
	
	if(chanceToRequestHigher > $gameParty._receptionistNotoriety * 0.8) {
		this._perv_hasSecondRequest = true;
	}
	
	let requestArray = [];
		
	if(this._visitor_requestID === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
		requestArray = [VISITOR_REQUEST_KISS_ID, VISITOR_REQUEST_HANDJOB_ID];
		if(this._visitor_isFan) requestArray.push(VISITOR_REQUEST_KISS_ID)
	}
	else if(this._visitor_requestID === VISITOR_REQUEST_KISS_ID) {
		requestArray = [VISITOR_REQUEST_BOOBS_SHAKE_ID, VISITOR_REQUEST_HANDJOB_ID];
		if(this._visitor_isFan) requestArray.push(VISITOR_REQUEST_HANDJOB_ID)
	}
	else if(this._visitor_requestID === VISITOR_REQUEST_HANDJOB_ID) {
		requestArray = [VISITOR_REQUEST_KISS_ID, VISITOR_REQUEST_BOOBS_SHAKE_ID, VISITOR_REQUEST_BLOWJOB_ID, VISITOR_REQUEST_BLOWJOB_ID];
		if(this._visitor_isFan) requestArray.push(VISITOR_REQUEST_BLOWJOB_ID)
	}
	else if(this._visitor_requestID === VISITOR_REQUEST_BLOWJOB_ID) {
		requestArray = [VISITOR_REQUEST_HANDJOB_ID];
	}

	this._perv_secondRequestID = requestArray[Math.randomInt(requestArray.length)];
	this._perv_turnsUntilSecondRequest = Math.round(this._perv_turnsUntilRequestFinished / 2);
	
};

Game_Enemy.prototype.name_receptionistBattle = function() {
	if(this._visitor_isIdentified || this.isWanted) {
		let name = "";
		
		if(this._visitor_isVisiting) {
			if(TextManager.isEnglish) {
				name += this._randomEnemyName + ' (' + this.getEnemyTypeName() + ' #' + this._visitor_number + ')';
			}
			else if(TextManager.isJapanese) {
				name += this.getEnemyTypeName() + '#' + this._visitor_number + ' ' + this._randomEnemyName;
			}
		}
		else {
			if(TextManager.isEnglish) {
				name += this._randomEnemyName + ' (' + this.getEnemyTypeName() + ')';
			}
			else if(TextManager.isJapanese) {
				name += this.getEnemyTypeName() + ' ' + this._randomEnemyName;
			}
		}
		
		return name;
	}
	else {
		return this.displayName_receptionistBattle();
	}
};

Game_Enemy.prototype.displayName_receptionistBattle = function() {
	let name = '';
	
	if(this._visitor_isIdentified || this.isWanted) {
		
		if(this._visitor_isVisiting) {
			if(TextManager.isEnglish) {
				name += this._randomEnemyName + ' (' + this.getEnemyTypeName() + ' #' + this._visitor_number + ')';
			}
			else if(TextManager.isJapanese) {
				name += this.getEnemyTypeName() + '#' + this._visitor_number + ' ' + this._randomEnemyName;
			}
		}
		else {
			if(TextManager.isEnglish) {
				name += this._randomEnemyName;
			}
			else if(TextManager.isJapanese) {
				name += this._randomEnemyName;
			}
		}
	}
	else {
		name = this.getEnemyTypeName();
		if(TextManager.isEnglish) {
			name += ' #' + this._visitor_number;
		}
		else {
			name += ' #' + this._visitor_number;
		}
	}
	
	return name;
};

Game_Enemy.prototype.battlerName_receptionistBattleSuffix = function() {
	return '';
};

Game_Enemy.prototype.bonusPpt_receptionistBattle = function() {
	let rate = 1;
	
	if(Karryn.isInReceptionistPose()) {
		if(this.isGoblinType) {
			rate = 0.4;
			
			if(this.isAroused()) {
				if(this.isUsingBodySlotPenis(CLIT_ID))
					rate *= 0.8;
				else
					rate *= 0.2;
			}
			
			if(this._goblinDistanceSlot === GOBLIN_DISTANCE_FAR) {
				rate *= 0.65;
			}
			else if(this._goblinDistanceSlot === GOBLIN_DISTANCE_FARTHEST) {
				rate *= 0.4;
			}
			else if(this._goblinDistanceSlot === GOBLIN_DISTANCE_OFFSCREEN_FAR || this._goblinDistanceSlot === GOBLIN_DISTANCE_OFFSCREEN_CLOSE) {
				if(this.isAroused()) {
					rate = 0;
				}
				else {
					rate *= 0.2;
				}
			}
		}
		else if(this.isVisitorMaleType) {
			if(this._visitor_isPervert && this._visitor_isIdentified && this.visitorLocationIsDesk()) {
				rate = 0.33;
			}
			else {
				rate = 0;
			}
		}
		else rate = 0;
	}
	
	return rate;
};

Game_Enemy.prototype.performCollapse_receptionistBattle = function() {
	if(this.isGoblinType && !this._goblinPerformedCollapseAlready) {
		this._goblinPerformedCollapseAlready = true;
		let actor = $gameActors.actor(ACTOR_KARRYN_ID);
		$gameTroop._goblins_distanceSlot[this._goblinDistanceSlot] = false;
		actor.emoteReceptionistPose();
		BattleManager._logWindow.push('addText', TextManager.receptionistGoblinDefeated.format(this.displayName()));
		AudioManager.playSe({name:'+Footstep1', pan:0, pitch:120, volume:90});
	}
	else if(this.isVisitorMaleType && !this._visitorPerformedCollapseAlready) {
		this._visitorPerformedCollapseAlready = true;
		if(this._visitor_isPervert) {
			this.receptionistBattle_action_pervLeaves();
		}
		else {
			this.receptionistBattle_action_fanLeaves();
		}
		
	}
};

Game_Enemy.prototype.checkForOrgasm_receptionistBattle = function() {
	let canOrgasm = true;
	
	if(this.isGoblinType) {
		if(this._goblinDistanceSlot !== GOBLIN_DISTANCE_MEDIUM && this._goblinDistanceSlot !== GOBLIN_DISTANCE_CLOSE) {
			canOrgasm = false;
		}
	}
	else if(this.isVisitorFemaleType) {
		canOrgasm = false;
	}
	else if(this.isVisitorMaleType) {
		if(!this._visitor_isPervert || !this.visitorLocationIsDesk() || !this._visitor_isIdentified) 
			canOrgasm = false;
	}
	
	return canOrgasm;
};

//////
// Status & Location
////////

Game_Enemy.prototype.visitorStatusIsUnknown = function() { return this._visitor_status === STATE_VISITOR_STATUS_UNKNOWN_ID; };
Game_Enemy.prototype.visitorStatusIsWriting = function() { return this._visitor_status === STATE_VISITOR_STATUS_WRITING_ID; };
Game_Enemy.prototype.visitorStatusIsPaper = function() { return this._visitor_status === STATE_VISITOR_STATUS_PAPER_ID; };
Game_Enemy.prototype.visitorStatusIsTime = function() { return this._visitor_status === STATE_VISITOR_STATUS_TIME_ID; };

Game_Enemy.prototype.visitorLocationIsSitting = function() { return this._visitor_location === STATE_VISITOR_LOCATION_SITTING_ID; };
Game_Enemy.prototype.visitorLocationIsMoving = function() { return this._visitor_location === STATE_VISITOR_LOCATION_MOVING_ID; };
Game_Enemy.prototype.visitorLocationIsDesk = function() { return this._visitor_location === STATE_VISITOR_LOCATION_DESK_ID; };
Game_Enemy.prototype.visitorLocationIsLine = function() { return this._visitor_location === STATE_VISITOR_LOCATION_LINE_ID; };

Game_Enemy.prototype.setVisitorStatusToUnknown = function() { 
	this._visitor_status = STATE_VISITOR_STATUS_UNKNOWN_ID; 
	
	this.removeState(STATE_VISITOR_STATUS_UNKNOWN_ID);
	this.removeState(STATE_VISITOR_STATUS_WRITING_ID);
	this.removeState(STATE_VISITOR_STATUS_PAPER_ID);
	this.removeState(STATE_VISITOR_STATUS_TIME_ID);
	
	this.addState(STATE_VISITOR_STATUS_UNKNOWN_ID);
};
Game_Enemy.prototype.setVisitorStatusToWriting = function() { 
	this._visitor_status = STATE_VISITOR_STATUS_WRITING_ID; 
	
	this.removeState(STATE_VISITOR_STATUS_UNKNOWN_ID);
	this.removeState(STATE_VISITOR_STATUS_WRITING_ID);
	this.removeState(STATE_VISITOR_STATUS_PAPER_ID);
	this.removeState(STATE_VISITOR_STATUS_TIME_ID);
	
	this.addState(STATE_VISITOR_STATUS_WRITING_ID);
};
Game_Enemy.prototype.setVisitorStatusToPaper = function() { 
	this._visitor_status = STATE_VISITOR_STATUS_PAPER_ID; 
	
	this.removeState(STATE_VISITOR_STATUS_UNKNOWN_ID);
	this.removeState(STATE_VISITOR_STATUS_WRITING_ID);
	this.removeState(STATE_VISITOR_STATUS_PAPER_ID);
	this.removeState(STATE_VISITOR_STATUS_TIME_ID);
	
	this.addState(STATE_VISITOR_STATUS_PAPER_ID);
	this.setStateCounter(STATE_VISITOR_STATUS_PAPER_ID, this._visitor_pages);
};
Game_Enemy.prototype.setVisitorStatusToTime = function() { 
	this._visitor_status = STATE_VISITOR_STATUS_TIME_ID; 
	
	this.removeState(STATE_VISITOR_STATUS_UNKNOWN_ID);
	this.removeState(STATE_VISITOR_STATUS_WRITING_ID);
	this.removeState(STATE_VISITOR_STATUS_PAPER_ID);
	this.removeState(STATE_VISITOR_STATUS_TIME_ID);
	
	this.addState(STATE_VISITOR_STATUS_TIME_ID);
	this.setStateCounter(STATE_VISITOR_STATUS_TIME_ID, this._visitor_time);
};

Game_Enemy.prototype.setVisitorLocationToSitting = function() { 
	this._visitor_location = STATE_VISITOR_LOCATION_SITTING_ID; 
	
	this.removeState(STATE_VISITOR_LOCATION_MOVING_ID);
	this.removeState(STATE_VISITOR_LOCATION_DESK_ID);
	this.removeState(STATE_VISITOR_LOCATION_LINE_ID);
	
	this.addState(STATE_VISITOR_LOCATION_SITTING_ID);
};
Game_Enemy.prototype.setVisitorLocationToMoving = function() { 
	this._visitor_location = STATE_VISITOR_LOCATION_MOVING_ID; 
	
	this.removeState(STATE_VISITOR_LOCATION_SITTING_ID);
	this.removeState(STATE_VISITOR_LOCATION_DESK_ID);
	this.removeState(STATE_VISITOR_LOCATION_LINE_ID);
	
	this.addState(STATE_VISITOR_LOCATION_MOVING_ID);
};
Game_Enemy.prototype.setVisitorLocationToDesk = function() { 
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	
	this._visitor_location = STATE_VISITOR_LOCATION_DESK_ID; 
	
	this.removeState(STATE_VISITOR_LOCATION_SITTING_ID);
	this.removeState(STATE_VISITOR_LOCATION_MOVING_ID);
	this.removeState(STATE_VISITOR_LOCATION_LINE_ID);
	
	this.addState(STATE_VISITOR_LOCATION_DESK_ID);
	
	AudioManager.playSe({name:'foot_0', pan:0, pitch:90, volume:100});
	actor.receptionistBattle_makeSexualNoise(0, true);
};
Game_Enemy.prototype.setVisitorLocationToLine = function() { 
	this._visitor_location = STATE_VISITOR_LOCATION_LINE_ID; 
	
	this.removeState(STATE_VISITOR_LOCATION_SITTING_ID);
	this.removeState(STATE_VISITOR_LOCATION_MOVING_ID);
	this.removeState(STATE_VISITOR_LOCATION_DESK_ID);
	
	this.addState(STATE_VISITOR_LOCATION_LINE_ID);
};

Game_Enemy.prototype.setVisitorFinishWalkingToDeskTime = function(time) { 
	this._visitor_finishWalkingToDeskTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	this._visitor_finishWalkingToDeskTime += time * this._visitor_walkingSpeed; 
	
	this._visitor_finishWalkingToSeatTime = -1;
	this._visitor_finishWalkingToRoomTime = -1;
};
Game_Enemy.prototype.setVisitorFinishWalkingToSeatTime = function(time) { 
	this._visitor_finishWalkingToSeatTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	this._visitor_finishWalkingToSeatTime += time * this._visitor_walkingSpeed; 
	
	this._visitor_finishWalkingToDeskTime = -1;
	this._visitor_finishWalkingToRoomTime = -1;
};
Game_Enemy.prototype.setVisitorFinishWalkingToVisitingRoomTime = function(time) { 
	this._visitor_finishWalkingToRoomTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	this._visitor_finishWalkingToRoomTime += time * this._visitor_walkingSpeed; 
	
	this._visitor_finishWalkingToDeskTime = -1;
	this._visitor_finishWalkingToSeatTime = -1;
};
Game_Enemy.prototype.setVisitorFinishWritingPapersTime = function(pages) { 
	this._visitor_finishWritingPapersTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
	this._visitor_finishWritingPapersTime += VISITOR_PAGES_BASE_TIME * this._visitor_writingSpeed; 
	this._visitor_finishWritingPapersTime += pages * VISITOR_PAGES_EACH_TIME * this._visitor_writingSpeed; 
};

////////
// Valid Target

Game_Enemy.prototype.isValidTargetForReceptionistBattle_standingInFrontOfDesk = function() { 
	return this.visitorLocationIsDesk();
};
Game_Enemy.prototype.isValidTargetForReceptionistBattle_beginProcessingPapers = function() { 
	return this.visitorStatusIsPaper();
};
Game_Enemy.prototype.isValidTargetForReceptionistBattle_assignVisitingRoom = function() { 
	return this.visitorStatusIsTime() && this._visitor_assignedVisitingRoom === -1 && !this._visitor_isAngry;
};
Game_Enemy.prototype.isValidTargetForReceptionistBattle_callUnknownVisitor = function() { 
	return this.visitorStatusIsUnknown() && this.visitorLocationIsSitting() && !this._visitor_isAngry;
};

Game_Enemy.prototype.isValidTargetForReceptionistBattle_kickAway = function() { 
	if(!this.isGoblinType) return false;
	if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE] && !$gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE].isInAPose()) {
		return this._goblinDistanceSlot === GOBLIN_DISTANCE_CLOSE;
	}
	else if($gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_MEDIUM]) {
		return this._goblinDistanceSlot === GOBLIN_DISTANCE_MEDIUM;
	}
	else return false;
};


/////////////
// Waitress Battle AI
///////////

Game_Enemy.prototype.enemyBattleAIReceptionist = function(target) {
	// Goblin
	if(this.isGoblinType) {
		this.enemyBattleAIReceptionist_goblin(target);
	}
	// Visitor
	else {
		this.enemyBattleAIReceptionist_visitor(target);
	}
};

Game_Enemy.prototype.enemyBattleAIReceptionist_visitor = function(target) {
	//Moving
	if(this.visitorLocationIsMoving()) {
		//Moving To Seat
		if(this._visitor_finishWalkingToSeatTime !== -1) {
			if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= this._visitor_finishWalkingToSeatTime) {
				this.setVisitorLocationToSitting();
				this._visitor_finishWalkingToSeatTime = -1;
			}
		}
		//Moving To Desk
		else if(this._visitor_finishWalkingToDeskTime !== -1) {
			if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= this._visitor_finishWalkingToDeskTime) {
				//Add to Queue
				this.receptionistBattle_joinDeskQueue();
				this._visitor_finishWalkingToDeskTime = -1;
			}
		}
		//Moving To Visiting Room
		else if(this._visitor_finishWalkingToRoomTime !== -1) {
			if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= this._visitor_finishWalkingToRoomTime) {
				//Can go in
				if($gameParty.receptionistBattle_getCurrentTimeInSeconds() + VISITING_ROOM_TIME_BUFFER >= $gameParty._receptionistBattle_visitingRoomTime[this._visitor_assignedVisitingRoom]) {
					
					//leave battle satisfied
					this.receptionistBattle_action_enterVisitingRoom();
				}
				//Wrong time
				else {
					//come back angry
					this.setVisitorLocationToMoving();
					this.setVisitorFinishWalkingToDeskTime(VISITOR_DESK_DISTANCE);
					this._visitor_isAngry = true;
					this._visitor_isAngry_fromBadVisitingRoom = true;
					this._visitor_gotAngryCount++;
					$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_WRONG_VISITING_ROOM * this._visitor_dissatisfactionMultipler);
				}
				this._visitor_finishWalkingToRoomTime = -1;
			}
		}
	}
	
	//Sitting
	if(this.visitorLocationIsSitting()) {
		if(this.visitorStatusIsWriting()) {
			if(!this._visitor_startingWritingPapers && !this._visitor_finishedWritingPapers) {
				this._visitor_startingWritingPapers = true;
				this.setVisitorFinishWritingPapersTime(this._visitor_pages);
				return;
			}
			else if(!this._visitor_finishedWritingPapers && $gameParty.receptionistBattle_getCurrentTimeInSeconds() >= this._visitor_finishWritingPapersTime) {
				this.setVisitorLocationToMoving();
				this._visitor_finishedWritingPapers = true;
				this.setVisitorFinishWalkingToDeskTime(VISITOR_DESK_DISTANCE);
				return;
			}
		}
	}
	
	//At Desk
	if(this.visitorLocationIsDesk()) {
		//Angry
		if(this._visitor_isAngry) {
			this.receptionistBattle_action_angryCompaint();
		}
		//Fan Request
		else if(this._fan_currentlyGettingRequestFulfilled) {
			let requestId = this._visitor_requestID;
			if(this._fan_turnsUntilRequestFinished === 0) {
				this._fan_requestWasFulfilled = true;
				this._fan_currentlyGettingRequestFulfilled = false;
				$gameParty.addToVisitorFanWanted(this);
				if(requestId === VISITOR_REQUEST_HAND_SHAKE_ID) {
					BattleManager.actionRemLines(ENEMY_LINE_FAN_HANDSHAKE_FINISHED);
					$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_GAIN_FROM_FAN_REQUEST_FULFILLED);
					$gameParty.increaseReceptionistVisitorSatisfaction_Fan(RECEPTIONIST_FAN_SATISFACTION_GAIN_FROM_REQUEST_FULFILLED);
					$gameParty.addReceptionistHandshakeTips();
					target.gainCharmExp(12, target.level);
					
					if(this._visitor_isVisiting) {
						target.receptionistBattle_giveVisitorTheirPapers(this);
					}
					else {
						this.receptionistBattle_action_fanLeaves();
					}
				}
			}
			else {
				if(this._fan_skillCooldown === 0) {
					
					if(requestId === VISITOR_REQUEST_HAND_SHAKE_ID) {
						this.useAISkill(SKILL_VISITOR_HANDSHAKE_ID, target);
					}
					
					this._fan_skillCooldown = this._fan_skillUseInterval;
				}
				else {
					this._fan_skillCooldown--;
				}
				
				
				this._fan_turnsUntilRequestFinished--;
			}
		}
		//Perv Request
		else if(this._perv_currentlyGettingRequestFulfilled) {
			let requestId = this._visitor_requestID;

			if(this._perv_queuedJoinSkill !== 0) {
				this.useAISkill(this._perv_queuedJoinSkill, target);
				this._perv_queuedJoinSkill = 0;
				this._perv_skillCooldown = this._perv_skillUseInterval;
			}
			else if(this._perv_hasSecondRequest && this._perv_turnsUntilSecondRequest === 0 && !this._perv_waitingForSecondRequestResponse && !this._perv_secondRequestRejected && !this._perv_secondRequestAccepted) {
				this._perv_waitingForSecondRequestResponse = true;
				
				if(this._perv_secondRequestID === VISITOR_REQUEST_BOOBS_SHAKE_ID) {
					BattleManager.actionRemLines(ENEMY_LINE_PERV_SECOND_BOOBSHAKE);
				}
				else if(this._perv_secondRequestID === VISITOR_REQUEST_KISS_ID) {
					BattleManager.actionRemLines(ENEMY_LINE_PERV_SECOND_KISS);
				}
				else if(this._perv_secondRequestID === VISITOR_REQUEST_HANDJOB_ID) {
					BattleManager.actionRemLines(ENEMY_LINE_PERV_SECOND_HANDJOB);
				}
				else if(this._perv_secondRequestID === VISITOR_REQUEST_BLOWJOB_ID) {
					BattleManager.actionRemLines(ENEMY_LINE_PERV_SECOND_BLOWJOB);
				}
				
			}
			else if(this._perv_turnsUntilRequestFinished === 0 || this._ejaculationStock === 0) {
				this._perv_requestWasFulfilled = true;
				this._perv_currentlyGettingRequestFulfilled = false;
				this._perv_kissing = false;
				this._perv_touchingBoobs = false;
				this._perv_gettingBJ = false;
				this._perv_gettingHJ = false;
	
				BattleManager.pullOutEnemy(this);
				BattleManager.actionRemLines(ENEMY_LINE_PERV_FINISHED);
				BattleManager.playNormalBgm();
				
				$gameParty.increaseReceptionistVisitorSatisfaction_Pervert(RECEPTIONIST_PERV_SATISFACTION_GAIN_FROM_REQUEST_FULFILLED);
				if(this._perv_secondRequestAccepted)
					$gameParty.increaseReceptionistVisitorSatisfaction_Pervert(RECEPTIONIST_PERV_SATISFACTION_GAIN_FROM_SECOND_REQUEST_FULFILLED);
				

				if(this._visitor_isVisiting) {
					target.receptionistBattle_giveVisitorTheirPapers(this);
				}
				else {
					this.receptionistBattle_action_pervLeaves();
				}
				
			}
			else {
				if(this._perv_skillCooldown <= 0) {
					let skillArray = [];
					
					if(this._perv_gettingBJ) {
						skillArray = [SKILL_ENEMY_POSESKILL_MOUTH_ID];
					}
					else {
						if(this._perv_gettingHJ) {
							skillArray.push(SKILL_ENEMY_POSESKILL_LEFTHAND_ID);
							skillArray.push(SKILL_ENEMY_POSESKILL_LEFTHAND_ID);
						}
						if(this._perv_kissing) {
							skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_KISS_ID);
						}
						if(this._perv_touchingBoobs) {
							skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_BOOBS_AREA_ID);
						}
					}
					
					this.useAISkill(skillArray[Math.randomInt(skillArray.length)], target);
					
					this._perv_skillCooldown = this._perv_skillUseInterval;
					if(this.isHorny && Math.random() < 0.33) this._perv_skillCooldown--;
				}
				else {
					this._perv_skillCooldown--;
				}
				
				if(!this._perv_gettingHJ && !this._perv_gettingBJ)
					this._perv_turnsUntilRequestFinished--;
				
				if(this._perv_hasSecondRequest && this._perv_turnsUntilSecondRequest > 0)
					this._perv_turnsUntilSecondRequest--;
			}
			
		}
		//Visitor wants to hand over papers
		else if(this._visitor_finishedWritingPapers && this.visitorStatusIsWriting()) {
			if($gameTroop._deskQueue[0]._visitor_number === this._visitor_number) {
				BattleManager._logWindow.push('addText', TextManager.receptionistVisitorWantsToHandOverPaper.format(this.displayName()));
			}
		}
		
	}
	
	//On Desk
	if(this.visitorLocationIsLine()) {
		//Angry
		if(this._visitor_isAngry) {
			this.receptionistBattle_action_angryCompaint();
		}
	}
};

Game_Enemy.prototype.enemyBattleAIReceptionist_goblin = function(target) {
	let distanceSlot = this._goblinDistanceSlot;
	let isHorny = this.isHorny;
	let isErect = this.isErect;
	let isShooed = this.isStateAffected(STATE_RECEPTIONIST_SHOOED_ID);
	let isKicked = this.isStateAffected(STATE_RECEPTIONIST_KICKED_ID);
	let targetPussyNotInUse = !target.isBodySlotPenis(PUSSY_ID) && !target.isBodySlotTongue(PUSSY_ID);
	let targetAnalNotInUse = !target.isBodySlotPenis(ANAL_ID);
	let goblinPassiveLevel = target.reactionScore_enemyGoblinPassive() / 10;
	let actionCooldownIfSuccessful = 1;
	let skillArray = [];
	
	

	let receptionistIsOnDesk = target.receptionistBattle_isLayingOnDesk();
	let receptionistIsFrontDistracted = target.receptionistBattle_isKissing() || target.receptionistBattle_gettingBoobsRubbed() || target.receptionistBattle_isGivingBlowjob() || target.receptionistBattle_isGivingHandjob();
	//on desk when giving head, or when orgasm
	
	if(distanceSlot === GOBLIN_DISTANCE_CLOSE) {
		if(this._goblinActionCooldown > 0) {
			this._goblinActionCooldown--;
			return;
		}
			
		let chanceToReduceActionCooldownIfSuccessful = 0;	
		if(Karryn.hasEdict(EDICT_BAIT_GOBLINS))
			chanceToReduceActionCooldownIfSuccessful += 0.25;
		if(this.isHorny) 
			chanceToReduceActionCooldownIfSuccessful += 0.25;
		if(target.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE))
			chanceToReduceActionCooldownIfSuccessful += 0.25;
		
		if(Math.random() < chanceToReduceActionCooldownIfSuccessful)
			actionCooldownIfSuccessful--;
			
		//Sexual
		if(this.isUsingBodySlotPenis(PUSSY_ID) || this.isUsingBodySlotPenis(CLIT_ID) || this.isUsingBodySlotPenis(ANAL_ID)) {
			skillArray = this.getPoseSkills().slice(0);
			if(Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) {
				skillArray.push(SKILL_ENEMY_SPANKING_SELECTOR_ID);
			}
		}
		else {
			if(targetPussyNotInUse) {
				skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_PUSSY_ID);
				skillArray.push(SKILL_ENEMY_POSEJOIN_RECEPTIONIST_PUSSY_ID);
				skillArray.push(SKILL_ENEMY_POSEJOIN_RECEPTIONIST_PUSSY_ID);
				if(target._recordSexPose_GoblinCunnilingusCount > 0) {
					skillArray.push(SKILL_ENEMY_POSEJOIN_RECEPTIONIST_CUNNI_ID);
				}
			}
			if(targetAnalNotInUse) {
				if(Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) {
					skillArray.push(SKILL_ENEMY_SPANKING_SELECTOR_ID);
					if(receptionistIsOnDesk) {
						skillArray.push(SKILL_ENEMY_SPANKING_SELECTOR_ID);
					}
				}
				skillArray.push(SKILL_ENEMY_POSEJOIN_RECEPTIONIST_ANAL_ID);
				skillArray.push(SKILL_ENEMY_POSEJOIN_RECEPTIONIST_ANAL_ID);
				skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_BUTT_ID);
			}
			
			skillArray.push(SKILL_ENEMY_CLOTHES_PULL_ID);
			skillArray.push(SKILL_ENEMY_CLOTHES_PULL_ID);
		}

	}
	else if(distanceSlot === GOBLIN_DISTANCE_MEDIUM && $gameTroop._goblins_distanceSlot[GOBLIN_DISTANCE_CLOSE]) {
		skillArray.push(SKILL_ENEMY_CLOTHES_PULL_ID);
		if(targetPussyNotInUse) {
			if(Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) {
				skillArray.push(SKILL_ENEMY_SPANKING_SELECTOR_ID);
			}
			skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_PUSSY_ID);
			skillArray.push(SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID);
		}
		if(targetAnalNotInUse) {
			skillArray.push(SKILL_ENEMY_PETTING_SELECTOR_BUTT_ID);
			skillArray.push(SKILL_ENEMY_STARE_SELECTOR_BUTT_ID);
		}
		
	}
	else {
		let chanceToMoveForward = 5;
		let chanceToMoveBackward = 10;
		
		//Forward chance
		if(isShooed)
			chanceToMoveForward -= 35;
		if(isKicked)
			chanceToMoveForward -= 99;
		
		if(isHorny)
			chanceToMoveForward += 10;
		if(isErect)
			chanceToMoveForward += 10;
		if(target.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE))
			chanceToMoveForward += 10;
		
		chanceToMoveForward += goblinPassiveLevel * 5;
		
		if(target.receptionistBattle_isHavingSexBehind() || receptionistIsFrontDistracted) {
			chanceToMoveForward *= 5;
		}
		else if(target._receptionist_checkingVisitingRoom_startingPhoneCall || target._receptionist_currentlyProcessingPapers || target._receptionist_greetVisitor_waitingForResponse) {
			chanceToMoveForward *= 4;
		}
		else if(target.isHorny) {
			chanceToMoveForward *= 2;
		}
		
		//Backward chance
		if(isShooed)
			chanceToMoveBackward += 35;
		if(isKicked)
			chanceToMoveBackward += 55;
		
		if(isHorny)
			chanceToMoveBackward -= 15;
		if(isErect)
			chanceToMoveBackward -= 15;
		
		chanceToMoveBackward -= goblinPassiveLevel * 5;
		
		//Zero chance
		if($gameTroop._goblins_distanceSlot[distanceSlot + 1]) {
			chanceToMoveForward = 0;
		}

		if(distanceSlot === GOBLIN_DISTANCE_OFFSCREEN_FAR) {
			chanceToMoveBackward = 0;
		}
		else if($gameTroop._goblins_distanceSlot[distanceSlot - 1]) {
			chanceToMoveBackward = 0;
		}
		
		//Goblin move forward
		if(Math.randomInt(100) < chanceToMoveForward) {
			$gameTroop._goblins_distanceSlot[distanceSlot] = false;
			$gameTroop._goblins_distanceSlot[distanceSlot + 1] = this;
			this._goblinDistanceSlot = distanceSlot + 1;
			target.updateReceptionistBattleGoblinTachie();
		}
		//Goblin move backward
		else if(Math.randomInt(100) < chanceToMoveBackward) {
			$gameTroop._goblins_distanceSlot[distanceSlot] = false;
			$gameTroop._goblins_distanceSlot[distanceSlot - 1] = this;
			this._goblinDistanceSlot = distanceSlot - 1;
			target.updateReceptionistBattleGoblinTachie();
		}
		//Goblin doesn't move
		else {
			let chanceToStare = 15;
			
			if(isHorny)
				chanceToStare += 15;
			if(isErect)
				chanceToStare += 15;
			if(target.isUsingThisTitle(TITLE_ID_VISITOR_GOBLIN_CREAMPIE))
				chanceToStare += 15;
			
			chanceToStare += goblinPassiveLevel * 5;
			
			if(this._goblinDistanceSlot === GOBLIN_DISTANCE_OFFSCREEN_CLOSE || this._goblinDistanceSlot === GOBLIN_DISTANCE_OFFSCREEN_FAR)
				chanceToStare = 0;
			
			if(this._goblinDistanceSlot === GOBLIN_DISTANCE_MEDIUM)
				skillArray.push(SKILL_ENEMY_CLOTHES_PULL_ID);
			
			if(Math.randomInt(100) < chanceToStare) {
				skillArray.push(SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID);
				skillArray.push(SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID);
				skillArray.push(SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID);
				skillArray.push(SKILL_ENEMY_STARE_SELECTOR_BUTT_ID);
				skillArray.push(SKILL_ENEMY_STARE_SELECTOR_BUTT_ID);
			}
		}
		
	}
	
	let success = false;
	while(skillArray.length > 0 && !success) {
		let index = Math.randomInt(skillArray.length);
		let skillId = skillArray.splice(index,1)[0];
		success = this.meetsSkillConditionsEval($dataSkills[skillId],target);
		success = success && this.meetsSkillConditions($dataSkills[skillId]); //cooldown
		if(success) {
			this.useAISkill(skillId, target);
			this._goblinActionCooldown = actionCooldownIfSuccessful;
		}
	}
	
	
	
};


Game_Enemy.prototype.receptionistBattle_action_enterVisitingRoom = function() {
	BattleManager._logWindow.push('addText', TextManager.receptionistVisitorEntersVisitingRoom.format(this.displayName(), TextManager.visitorRoomName(this._visitor_assignedVisitingRoom)));
	AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
	
	$gameTroop._visitorSeats[this._visitorSeatId] = false;
	
	if($gameParty.receptionistBattle_getCurrentTimeInSeconds() < $gameParty._receptionistBattle_visitingRoomTime[this._visitor_assignedVisitingRoom]) {
		$gameParty._receptionistBattle_visitingRoomTime[this._visitor_assignedVisitingRoom] += this._visitor_time * 60;
	}
	else {
		$gameParty._receptionistBattle_visitingRoomTime[this._visitor_assignedVisitingRoom] = $gameParty.receptionistBattle_getCurrentTimeInSeconds() + this._visitor_time * 60;
	}
	
	let orderGain = RECEPTIONIST_ORDER_GAIN_FROM_VISITING_ROOM_BASE + this._visitor_time * RECEPTIONIST_ORDER_GAIN_FROM_VISITING_ROOM_PER_TIME;
	$gameParty.increaseOrderGain(orderGain);
	$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_GAIN_FROM_VISITING_ROOM);
	if(this._visitor_isFan) {
		$gameParty.increaseReceptionistVisitorSatisfaction_Fan(RECEPTIONIST_FAN_SATISFACTION_GAIN_FROM_VISITING_ROOM);
	}
	
	this.hide();
	this.clearActions();
    this.clearStates();
};

Game_Enemy.prototype.receptionistBattle_action_leavesAngry = function() {
	BattleManager._logWindow.push('addText', TextManager.receptionistVisitorLeavesAngry.format(this.displayName()));
	AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
	
	if(this._visitor_isFan) {
		if(this._fan_requestRejected) {
			$gameParty.increaseReceptionistVisitorSatisfaction_Fan(RECEPTIONIST_FAN_SATISFACTION_LOST_FROM_REQUEST_REJECTED * this._visitor_dissatisfactionMultipler);
		}
		$gameParty.increaseReceptionistVisitorSatisfaction_Fan(RECEPTIONIST_FAN_SATISFACTION_LOST_FROM_ANGRY_LEAVE * this._visitor_dissatisfactionMultipler);
	}
	
	$gameParty.increaseReceptionistVisitorSatisfaction_General(RECEPTIONIST_GENERAL_SATISFACTION_LOST_FROM_ANGRY_LEAVE * this._visitor_dissatisfactionMultipler);
	
	
	this.receptionistBattle_leaveDeskQueue();
	
	$gameTroop._visitorSeats[this._visitorSeatId] = false;
	
	this.hide();
	this.clearActions();
    this.clearStates();
};
Game_Enemy.prototype.receptionistBattle_action_fanLeaves = function() {
	BattleManager._logWindow.push('addText', TextManager.receptionistNotHereForVisitation.format(this.displayName()));
	//Request fulfilled
	if(this._fan_requestWasFulfilled) {
		BattleManager._logWindow.push('addText', TextManager.receptionistFanLeavesHappy.format(this.displayName()));
		AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
	}
	//Request rejected
	else if(this._fan_requestRejected) {
		BattleManager._logWindow.push('addText', TextManager.receptionistFanLeavesDejected.format(this.displayName()));
		AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
		$gameParty.increaseReceptionistVisitorSatisfaction_Fan(RECEPTIONIST_FAN_SATISFACTION_LOST_FROM_REQUEST_REJECTED * this._visitor_dissatisfactionMultipler);
	}
	
	this.receptionistBattle_leaveDeskQueue();
	
	$gameTroop._visitorSeats[this._visitorSeatId] = false;
	
	this.hide();
	this.clearActions();
    this.clearStates();
};
Game_Enemy.prototype.receptionistBattle_action_pervLeaves = function() {
	BattleManager._logWindow.push('addText', TextManager.receptionistNotHereForVisitation.format(this.displayName()));
	//Request fulfilled
	if(this._perv_requestWasFulfilled) {
		BattleManager._logWindow.push('addText', TextManager.receptionistPervLeavesHappy.format(this.displayName()));
		AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
		$gameParty.addToVisitorPervertWanted(this);
	}
	//Request rejected
	else if(this._perv_requestRejected) {
		BattleManager._logWindow.push('addText', TextManager.receptionistPervLeavesAngry.format(this.displayName()));
		AudioManager.playSe({name:'+Footstep1', pan:0, pitch:100, volume:70});
		$gameParty.increaseReceptionistVisitorSatisfaction_Pervert(RECEPTIONIST_PERV_SATISFACTION_LOST_FROM_REQUEST_REJECTED * this._visitor_dissatisfactionMultipler);
	}

	this.receptionistBattle_leaveDeskQueue();

	$gameTroop._visitorSeats[this._visitorSeatId] = false;

	this.hide();
	this.clearActions();
    this.clearStates();
};

Game_Enemy.prototype.receptionistBattle_action_angryCompaint = function() {
	if(this._visitor_angryComplaintCooldown > 0) {
		this._visitor_angryComplaintCooldown--;
	}
	else {
		if(this._visitor_isAngry_fromBadVisitingRoom) {
			let roomId = this._visitor_assignedVisitingRoom;
			BattleManager._logWindow.push('addText', TextManager.receptionistVisitorAngryComplaint_OccupiedVisitingRoom.format(this.displayName(), TextManager.visitorRoomName(roomId)));
			this._visitor_angryComplaintCooldown = 1;
		}
	}
};


Game_Enemy.prototype.receptionistBattle_joinDeskQueue = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	
	$gameTroop._deskQueue.push(this);
	let queueLength = $gameTroop._deskQueue.length;
	if(queueLength === 1) {
		this.setVisitorLocationToDesk();
	}
	else {
		this.setVisitorLocationToLine();
		this.setStateCounter(STATE_VISITOR_LOCATION_LINE_ID, queueLength - 1);
	}
	
	actor.emoteReceptionistPose();
};
Game_Enemy.prototype.receptionistBattle_leaveDeskQueue = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	
	if($gameTroop._deskQueue[0]._visitor_number === this._visitor_number) {
		$gameTroop._deskQueue.shift(this);
		actor._cockNormalTarget = false;
		actor.setMaxTachieSemenCockNormalId(0);
	}
	else {
		let currentQueueSpot = 0;
		for(let i = 0; i < $gameTroop._deskQueue.length; ++i) {
			if($gameTroop._deskQueue[i]._visitor_number === this._visitor_number) {
				currentQueueSpot = i;
				break;
			}
		}
		$gameTroop._deskQueue.splice(currentQueueSpot, 1);
	}
	let queueLength = $gameTroop._deskQueue.length;
	if(queueLength > 0) {
		for(let i = 0; i < queueLength; ++i) {
			let visitor = $gameTroop._deskQueue[i];
			if(i === 0) {
				visitor.setVisitorLocationToDesk();
			}
			else {
				//visitor.setVisitorLocationToLine();
				visitor.setStateCounter(STATE_VISITOR_LOCATION_LINE_ID, i);
			}
		}
	}
	
	actor.emoteReceptionistPose();
};