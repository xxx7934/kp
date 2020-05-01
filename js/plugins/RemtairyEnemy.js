﻿var Remtairy = Remtairy || {};
Remtairy.Enemy = Remtairy.Enemy || {};

//=============================================================================
 /*:
 * @plugindesc Enemy
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const VAR_KARRYN_AGI_AILEVEL = 0.8;
const VAR_ENEMY_DIDNOTHING_AILEVEL = 50;
const VAR_ENEMY_HORNY_AILEVEL = 25;
const VAR_SMEGMA_STENCH = 3;
const ANGER_ENEMY_ANGRY_EFFECT = 75;
const ANGER_ENEMY_HORNY_EFFECT = -50;
const ANGER_ENEMY_VIRGIN_EFFECT = -50;
const ANGER_ARTISAN_MEAL_BITCH_EFFECT = -35;
const ANGER_CALFSKIN_BELT_EFFECT = 20;
const ANGER_BRAND_HANDBAG_EFFECT = 40;

const VAR_AP_PER_EJC = 1.05;
const VAR_OP_PER_EJC = 1.12;

const VAR_CHARM_MULTIPLER_WHEN_LESS = 0.25;
const VAR_CHARM_MULTIPLER_WHEN_ERECT = 0.4;

const ENEMY_POSE_NONE = 0;
const ENEMY_POSE_MASTER = 1;
const ENEMY_POSE_HELPER = 2;

const ELEMENT_KISS_WEAK_ID = 12;
const ELEMENT_HANDJOB_WEAK_ID = 13;
const ELEMENT_BLOWJOB_WEAK_ID = 14;
const ELEMENT_TITTYFUCK_WEAK_ID = 15;
const ELEMENT_PUSSY_WEAK_ID = 16;
const ELEMENT_ANAL_WEAK_ID = 17;
const ELEMENT_PETTING_WEAK_ID = 18;
const ELEMENT_RIMJOB_WEAK_ID = 19;
const ELEMENT_FOOTJOB_WEAK_ID = 20;

const ENEMYTYPE_GUARD_TAG = 'guard';
const ENEMYTYPE_THUG_TAG = 'thug';
const ENEMYTYPE_GOBLIN_TAG = 'goblin';
const ENEMYTYPE_PRISONER_TAG = 'prisoner';
const ENEMYTYPE_ORC_TAG = 'orc';
const ENEMYTYPE_YASU_TAG = 'yasu';
const ENEMYTYPE_TONKIN_TAG = 'tonkin';
const ENEMYTYPE_CARGILL_TAG = 'cargill';
const ENEMYTYPE_ROGUE_TAG = 'rogue';
const ENEMYTYPE_SLIME_TAG = 'slime';
const ENEMYTYPE_NERD_TAG = 'nerd';
const ENEMYTYPE_BARTABLE_TAG = 'bartable';
const ENEMYTYPE_VISITOR_MALE_TAG = 'visitorm';
const ENEMYTYPE_VISITOR_FEMALE_TAG = 'visitorf';

const ENEMYCOCK_HUMAN_TAG = 'human';
const ENEMYCOCK_GREEN_TAG = 'green';
const ENEMYCOCK_SLIME_TAG = 'slime';

const ENEMY_DEFAULT_EJACULATION_AMOUNT = 8;
const ENEMY_DEFAULT_EJACULATION_RANGE = 6;

const ENEMY_BATTLERNAME_BLUSH_SUFFIX = '_blush';
const ENEMY_BATTLERNAME_CHARGE_SUFFIX = '_charge';
const ENEMY_BATTLERNAME_ANGRY_SUFFIX = '_angry';
const ENEMY_BATTLERNAME_DAMAGED_SUFFIX = '_damaged';

const ENEMY_BATTLERNAME_MAX_NUM_GUARD = 2;
const ENEMY_BATTLERNAME_MAX_NUM_PRISONER = 5;
const ENEMY_BATTLERNAME_MAX_NUM_GOBLIN = 3;
const ENEMY_BATTLERNAME_MAX_NUM_THUG = 4;
const ENEMY_BATTLERNAME_MAX_NUM_ORC = 2;

const ENEMY_BLANK_FULLSIZE_BATTLERNAME = 'blank_fullsize'; //default
const ENEMY_BLANK_HALFSIZE_BATTLERNAME = 'blank_halfsize';
const ENEMY_BLANK_DOT_BATTLERNAME = 'blank_dot';

///////
/////////////
// Game Enemy
//////////////
//////////////

Game_Enemy.prototype.initialize = function(enemyId, x, y, wanted, originalEnemyId) {
    Game_Battler.prototype.initialize.call(this);
    this.setup(enemyId, x, y, wanted, originalEnemyId);
};

Remtairy.Enemy.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y, wanted, originalEnemyId) {
	this._lvldParams = [[1],[1],[1],[1],[1],[1],[1],[1]];
    Remtairy.Enemy.Game_Enemy_setup.call(this, enemyId, x, y);
	this.setupEnemyTags(originalEnemyId);
	this.resetPoseStatus();
	this.resetAllTargetsForSex();
	this.resetTemporarySelectionShow();
	this.setUsedSkillThisTurn(false);
	this.setupUsingBodySlot();
	this.setupOrderAndFatigueGain();
	this.setupSexSkillLevels();
	this.setupStench();
	this.setupSmegma();
	this.setupEjaculation();
	this.setupAnger();
	this.setupStartingStance();
	this.setupAISkills();
	this.setupSelectionVariables();
	this.resetOrgasmSkills();
	this.resetEnemyTurnVariables();
	
	this.resetCustomEnemySprite();
	this.setupRandomEnemyName();
	
	this.setupWanted(wanted);
	if(!wanted) {
		this.setupEnemyType();
		this.setupEnemyCock();
		this.setupEnemyLvl(); // has to go after type
		this.setupEnemyRecords();
	}
	
	this.setupInitialPleasure();
	this.setCanBeKissed(true);
	
	this._visitor_isFan = false;
	this._visitor_isPervert = false;
};

Remtairy.Enemy.Game_Enemy_onBattleStart = Game_Enemy.prototype.onBattleStart;
Game_Enemy.prototype.onBattleStart = function() {
    Remtairy.Enemy.Game_Enemy_onBattleStart.call(this);
    this.recoverAll();
	this.recoverAll();
	this.hornyPrefixEffect();
	this.angryPrefixEffect();
};

////////
// Set up
/////////

Game_Enemy.prototype.setupEnemyTags = function(originalEnemyId) {
	this._tagUnique = this.enemy().hasTag(TAG_UNIQUE_ENEMY);
	this._tagOnlooker = this.enemy().hasTag(TAG_ONLOOKER);
	this._tagSupporter = this.enemy().hasTag(TAG_SUPPORTER);
	this._tagDontDrawName = this.enemy().hasTag(TAG_DONT_DRAW_NAME);
	this._tagDontDrawGauge = this.enemy().hasTag(TAG_DONT_DRAW_GAUGE);
	this._tagDontDrawImage = this.enemy().hasTag(TAG_DONT_DRAW_IMAGE);
	this._tagAlwaysShowStates = this.enemy().hasTag(TAG_ALWAYS_SHOW_STATES);
	this._tagDontAddWanted = this.enemy().hasTag(TAG_DONT_ADD_WANTED);
	this._tagDontAddPrefix = this.enemy().hasTag(TAG_DONT_ADD_PREFIX);
	this._tagDontMorph = this.enemy().hasTag(TAG_DONT_MORPH);
	this._tagDontDrawSelection = this.enemy().hasTag(TAG_DONT_DRAW_SELECTION);
	this._tagNoPptRegen = this.enemy().hasTag(TAG_NO_PPT_REGEN);
	this._tagSelectionFlashWhiter = this.enemy().hasTag(TAG_SELECTION_FLASH_WHITER);
	this._tagDontCountSubdued = this.enemy().hasTag(TAG_DONT_COUNT_SUBDUED);
	this._tagHasDamagedFace = this.enemy().hasTag(TAG_HAS_DAMAGED_FACE);
	
	if(originalEnemyId) {
		let originalEnemy = $dataEnemies[originalEnemyId];
		if(!this._tagOnlooker && originalEnemy.hasTag(TAG_ONLOOKER)) this._tagOnlooker = true;
		if(!this._tagDontDrawName && originalEnemy.hasTag(TAG_DONT_DRAW_NAME)) this._tagDontDrawName = true;
		if(!this._tagDontDrawGauge && originalEnemy.hasTag(TAG_DONT_DRAW_GAUGE)) this._tagDontDrawGauge = true;
		if(!this._tagDontDrawImage && originalEnemy.hasTag(TAG_DONT_DRAW_IMAGE)) this._tagDontDrawImage = true;
	}
};


Game_Enemy.prototype.setupOrderAndFatigueGain = function() {
	this._orderGain = this.enemy().dataOrderGain / 10;
	this._fatigueGain = this.enemy().dataFatigueGain / 10;
};

Game_Enemy.prototype.setupInitialPleasure = function() {
	let initialMulti = this.enemy().dataInitialPleasure;
	this._firstTimeAroused = false;
	
	if(Karryn.isInEnemiesJoinArousedAndStayArousedPose()) {
		this.setPleasureToArousalPoint();
		this._firstTimeAroused = true;
	}
	else if(Karryn.inBattleCharm * initialMulti > this.charm) {
		initialMulti += this.initialPleasurePrefixEffect();
		this.gainPleasure(Karryn.inBattleCharm * initialMulti - this.charm);
	}

};

Game_Enemy.prototype.setupSexSkillLevels = function() {
	this._baseTalkLvl = Math.round(this.enemy().dataTalkLevel * 10) / 10;
	this._baseSightLvl = Math.round(this.enemy().dataSightLevel * 10) / 10;
	this._basePettingLvl = Math.round(this.enemy().dataPettingLevel * 10) / 10;
	this._baseToyLvl = Math.round(this.enemy().dataToyLevel * 10) / 10;
	this._baseKissLvl = Math.round(this.enemy().dataKissLevel * 10) / 10;
	this._baseHandjobLvl = Math.round(this.enemy().dataHandjobLevel * 10) / 10;
	this._baseBlowjobLvl = Math.round(this.enemy().dataBlowjobLevel * 10) / 10;
	this._baseTittyFuckLvl = Math.round(this.enemy().dataTittyFuckLevel * 10) / 10;
	this._basePussySexLvl = Math.round(this.enemy().dataPussySexLevel * 10) / 10;	
	this._baseAnalSexLvl = Math.round(this.enemy().dataAnalSexLevel * 10) / 10;
	this._baseMasturbateLvl = Math.round(this.enemy().dataMasturbateLevel * 10) / 10;
	this._baseMasochismLvl = Math.round(this.enemy().dataMasochismLevel * 10) / 10;
	this._baseSadismLvl = Math.round(this.enemy().dataSadismLevel * 10) / 10;
};

Game_Enemy.prototype.setupStench = function() {
	var min = this.enemy().dataStench;
	var range = this.enemy().dataStenchRange;
	
	if(min === 0 && range === 0) return;

	this.setStench(Math.max(Math.randomInt(range) + min, 0));
};

Game_Enemy.prototype.setupSmegma = function() {
	var min = this.enemy().dataSmegma;
	var range = this.enemy().dataSmegmaRange;
	
	if(min === 0 && range === 0) return;

	this._smegma = Math.max(Math.randomInt(range) + min, 0);
};

Game_Enemy.prototype.setupEjaculation = function() {
	this._ejaculationCount = 0;
	
	this._ejaculationStock = this.enemy().dataEjaculationStock;

	let min = this.enemy().dataEjaculationAmt;
	let range = this.enemy().dataEjaculationRange;
	this._ejaculationVolume = Math.max(Math.randomInt(range) + min, 0);
};

Game_Enemy.prototype.setupAnger = function() {
	this._baseAnger = this.enemy().dataBaseAnger;
};

Game_Enemy.prototype.setupStartingStance = function() {
	let stance = this.enemy().dataStartingStance;

	if(stance == STANCE_RANDOM || stance == 'random') {
		let ranNum = Math.randomInt(3);
		if(ranNum === 1) stance = STANCE_SLASH;
		else if(ranNum === 2) stance = STANCE_BLUNT;
		else stance = STANCE_PIERCE;
	}

	if(stance === STANCE_SLASH || stance == 'slash') this.changeStanceToSlash();
	else if(stance === STANCE_PIERCE || stance == 'pierce') this.changeStanceToPierce();
	else if(stance === STANCE_BLUNT || stance == 'blunt') this.changeStanceToBlunt();
};


Game_Enemy.prototype.setupAISkills = function() {
	if(!this.enemy().dataAIAttackSkills) this._aiAttackSkills = false;
	else this._aiAttackSkills = this.enemy().dataAIAttackSkills.slice(0);
	
	if(!this.enemy().dataAIChargeSkills) this._aiChargeSkills = false;
	else this._aiChargeSkills = this.enemy().dataAIChargeSkills.slice(0);
	
	if(!this.enemy().dataAIPettingSkills) this._aiPettingSkills = false;
	else this._aiPettingSkills = this.enemy().dataAIPettingSkills.slice(0);
	
	if(!this.enemy().dataAITalkSightSkills) this._aiTalkSightSkills = false;
	else this._aiTalkSightSkills = this.enemy().dataAITalkSightSkills.slice(0);
	
	if(!this.enemy().dataAIPoseStartSkills) this._aiPoseStartSkills = false;
	else this._aiPoseStartSkills = this.enemy().dataAIPoseStartSkills.slice(0);
	
	if(!this.enemy().dataAIPoseJoinSkills) this._aiPoseJoinSkills = false;
	else this._aiPoseJoinSkills = this.enemy().dataAIPoseJoinSkills.slice(0);
	
	if(!this.enemy().dataAIEjaculationSkills) this._aiDefaultEjaculationSkills = false;
	else this._aiDefaultEjaculationSkills = this.enemy().dataAIEjaculationSkills.slice(0);
	
};

Game_Enemy.prototype.setupSelectionVariables = function() {
	this._hasSelectionVariables = false;
	this._selectionAoeBufferX = 0;
	this._selectionAoeBufferY = 0;
	this._selectionAoeRow = 0;
	this._selectionAoeColumn = 0;
	this._specialSelectionName = this.enemy().dataSpecialSelectionName;
};



///////
// Enemy Type
//////////////

Game_Enemy.prototype.setupEnemyType = function() {
	this._enemyType = this.enemy().dataEnemyType;
};

Game_Enemy.prototype.enemyType = function() {
	return this._enemyType;
};

Object.defineProperty(Game_Enemy.prototype, "isPrisonGuard", {
	get: function () { return this.enemyType() == ENEMYTYPE_GUARD_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isInmate", {
	get: function () { return (!this.isPrisonGuard && this.enemyType() !== 0); }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isUnique", {
	get: function () { return this._tagUnique; }, configurable: true
});

Object.defineProperty(Game_Enemy.prototype, "isGuardType", {
	get: function () { return this.enemyType() == ENEMYTYPE_GUARD_TAG || this.isCargill || this.isYasu; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isThugType", {
	get: function () { return this.enemyType() == ENEMYTYPE_THUG_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isGoblinType", {
	get: function () { return this.enemyType() == ENEMYTYPE_GOBLIN_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isPrisonerType", {
	get: function () { return this.enemyType() == ENEMYTYPE_PRISONER_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isOrcType", {
	get: function () { return this.enemyType() == ENEMYTYPE_ORC_TAG || this.isTonkin; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isBossType", {
	get: function () { return this.isYasu || this.isTonkin || this.isCargill; }, configurable: true
});

Object.defineProperty(Game_Enemy.prototype, "isYasu", {
	get: function () { return this.enemyType() == ENEMYTYPE_YASU_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isTonkin", {
	get: function () { return this.enemyType() == ENEMYTYPE_TONKIN_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isCargill", {
	get: function () { return this.enemyType() == ENEMYTYPE_CARGILL_TAG; }, configurable: true
});

Object.defineProperty(Game_Enemy.prototype, "isNerdType", {
	get: function () { return this.enemyType() == ENEMYTYPE_NERD_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isRogueType", {
	get: function () { return this.enemyType() == ENEMYTYPE_ROGUE_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isSlimeType", {
	get: function () { return this.enemyType() == ENEMYTYPE_SLIME_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isBarTableType", {
	get: function () { return this.enemyType() == ENEMYTYPE_BARTABLE_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isVisitorMaleType", {
	get: function () { return this.enemyType() == ENEMYTYPE_VISITOR_MALE_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isVisitorFemaleType", {
	get: function () { return this.enemyType() == ENEMYTYPE_VISITOR_FEMALE_TAG; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isVisitorType", {
	get: function () { return this.isVisitorMaleType || this.isVisitorFemaleType; }, configurable: true
});


///////////
// Enemy Stance
//////////////

Game_Enemy.prototype.dontShowStanceState = function() {
	return $gameParty.isInWaitressBattle || Karryn.isInDefeatedPose() || Karryn.isInReceptionistPose();
};
Game_Enemy.prototype.showSlashStanceState = function() {
	if(this.dontShowStanceState()) return false;
	return this.isSlashStance() && !this.isInAPose();
};
Game_Enemy.prototype.showPierceStanceState = function() {
	if(this.dontShowStanceState()) return false;
	return this.isPierceStance() && !this.isInAPose();
};
Game_Enemy.prototype.showBluntStanceState = function() {
	if(this.dontShowStanceState()) return false;
	return this.isBluntStance() && !this.isInAPose();
};
Game_Enemy.prototype.showNoneStanceState = function() {
	if(this.dontShowStanceState()) return false;
	return this.isNoneStance() && !this.isInAPose();
};

///////
// Enemy Cock
//////////////

Game_Enemy.prototype.setupEnemyCock = function() {
	this._enemyCock = this.enemy().dataEnemyCock;
};

Game_Enemy.prototype.enemyCock = function() {
	if(this._enemyCock == ENEMYCOCK_HUMAN_TAG || this._enemyCock == ENEMYCOCK_GREEN_TAG || this._enemyCock == ENEMYCOCK_SLIME_TAG) 
		return this._enemyCock;
	else
		return ENEMYCOCK_HUMAN_TAG;
};
 
/////////////
// Elemental Weakness
/////////////////

Game_Enemy.prototype.weaknessToKiss = function() { 
	let value = this.elementRate(ELEMENT_KISS_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToPetting = function() { 
	let value = this.elementRate(ELEMENT_PETTING_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToHandjob = function() { 
	let value = this.elementRate(ELEMENT_HANDJOB_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToBlowjob = function() { 
	let value = this.elementRate(ELEMENT_BLOWJOB_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToRimjob = function() { 
	let value = this.elementRate(ELEMENT_RIMJOB_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToFootjob = function() { 
	let value = this.elementRate(ELEMENT_FOOTJOB_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToTittyFuck = function() { 
	let value = this.elementRate(ELEMENT_TITTYFUCK_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToPussy = function() { 
	let value = this.elementRate(ELEMENT_PUSSY_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

Game_Enemy.prototype.weaknessToAnal = function() { 
	let value = this.elementRate(ELEMENT_ANAL_WEAK_ID);
	//todo: passives and edicts that might increase weakness
	return value;
};

////////
// Sex Level
/////////////

Game_Enemy.prototype.talkLvl = function() {
	return this._baseTalkLvl + this.prefixTalkEffect(this._baseTalkLvl);
};
Game_Enemy.prototype.sightLvl = function() {
	return this._baseSightLvl + this.prefixSightEffect(this._baseSightLvl);
};

Game_Enemy.prototype.pettingLvl = function() {
	return this._basePettingLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.toyLvl = function() {
	return this._baseToyLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.kissLvl = function() {
	return this._baseKissLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.handjobLvl = function() {
	return this._baseHandjobLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.blowjobLvl = function() {
	return this._baseBlowjobLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.tittyFuckLvl = function() {
	return this._baseTittyFuckLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.pussySexLvl = function() {
	return this._basePussySexLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.analSexLvl = function() {
	return this._baseAnalSexLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.masturbateLvl = function() {
	return this._baseMasturbateLvl * this.enemyEdictSexSkill();
};
Game_Enemy.prototype.masochismLvl = function() {
	return this._baseMasochismLvl + this.prefixMasoEffect(this._baseMasochismLvl);
};
Game_Enemy.prototype.sadismLvl = function() {
	return this._baseSadismLvl + this.prefixSadoEffect(this._baseSadismLvl);
};

//////
// Anger
///////

Game_Enemy.prototype.anger = function() { 
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let value = this._baseAnger;
	if(this.isPrisonGuard) value += this.prisonGuardEdictAnger();
	else if(this.isInmate) value += this.inmateEdictAnger();
	if(this.isHorny) value += ANGER_ENEMY_HORNY_EFFECT;
	if(this.isAngry) value += ANGER_ENEMY_ANGRY_EFFECT;
	if(this.hasVirginPrefix() && Karryn.hasPassive(PASSIVE_VIRGINS_TOTAL_TWO_ID)) 
		value += ANGER_ENEMY_VIRGIN_EFFECT;
	
	value += actor.passiveEnemyAngerEffect(this);
	value += actor.titleInmateAngerEffect(this);
	
	if(actor.ateArtisanMeal(ARTISAN_MEAL_BITCH)) value += ANGER_ARTISAN_MEAL_BITCH_EFFECT;
	if(actor.isEquippingThisAccessory(MISC_CALFSKINBELT_ID)) value += ANGER_CALFSKIN_BELT_EFFECT;
	if(actor.isEquippingThisAccessory(MISC_HANDBAG_ID)) value += ANGER_BRAND_HANDBAG_EFFECT;
	
	
	return value;
};

Game_Enemy.prototype.addAngryState = function() {
	if(this.isStateAffected(STATE_RESIST_ANGRY_ID)) return;
	if(Karryn.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_TWO_ID) && this.isNerdType) return;
	if(this.isNotSupporter) {
		this.removeState(STATE_HORNY_ID);
		if(this.isSlimeType) 
			this.addState(STATE_SLIME_ANGRY_ID);
		else
			this.addState(STATE_ANGRY_ID);
	}
};

//////
// Pleasure
///////

Game_Enemy.prototype.setPleasure = function(value) {
	this.setTp(value); 
	if(this.isAroused() && !this._firstTimeAroused) {
		this._firstTimeAroused = true;
		Karryn.gainCharmExp(16, this.enemyExperienceLvl());
	}
};

Game_Enemy.prototype.isAroused = function() { 
	if(!DEBUG_MODE) return false;
	return this.pleasure >= this.arousalPoint() && this._ejaculationStock > 0;
};

Game_Enemy.prototype.arousalPoint = function() { 
	var value = this._arousalBasePoint + this.end * this.enemy().dataArousalPoint;
	
	if(this.isPrisonGuard) value *= this.prisonGuardEdictArousalPoint();
	else if(this.isInmate) value *= this.inmateEdictArousalPoint();
	
	for(var i = 0; i < this._ejaculationCount; i++) {
		value *= VAR_AP_PER_EJC;
	}

	return Math.round(value);
};
Game_Enemy.prototype.orgasmPoint = function() { 
	let value = this._orgasmBasePoint + this.end * this.enemy().dataOrgasmPoint;
	
	if(this.isPrisonGuard) value *= this.prisonGuardEdictOrgasmPoint();
	else if(this.isInmate) value *= this.inmateEdictOrgasmPoint();
	
	for(let i = 0; i < this._ejaculationCount; i++) {
		value *= VAR_OP_PER_EJC;
	}
	
	return Math.round(value);
};

//TRG = Pleasure/Per Turn during regen phase
//Pleasure regen
Game_Enemy.prototype.bonusPpt = function() { 
	if(this._tagNoPptRegen || Karryn.isInEnemiesDontRegenPleasurePose()) return 0;
	
	let karrynCharm = Karryn.inBattleCharm;
	let enemyCharmReq = this.charm;
	
	if(enemyCharmReq >= 999) return 0;
	
	if(Karryn.isInSexPose) {
		enemyCharmReq *= 0.8;
	}
	if(this.isHorny) {
		enemyCharmReq *= 0.8;
	}
	
	let pleasureGain = 0;
	if(enemyCharmReq > karrynCharm) {
		pleasureGain = Math.floor(karrynCharm * VAR_CHARM_MULTIPLER_WHEN_LESS);
	}
	else {
		pleasureGain = Math.round(karrynCharm * 1.33 - enemyCharmReq);
	}
	
	if(this.isAroused()) {
		pleasureGain = Math.floor(pleasureGain * VAR_CHARM_MULTIPLER_WHEN_ERECT);
	}
	
	pleasureGain *= this.bonusPpt_receptionistBattle();
	
	return Math.round(pleasureGain);
};

/////////////////////////////
// Get Order Gain Fatigue Gain Values
//////////////////////////////

Game_Enemy.prototype.getOrderGainValue = function() {
	return this._orderGain;
};

Game_Enemy.prototype.getFatigueGainValue = function() {
	return this._fatigueGain;
};

//////////
// Used Skill This Turn
/////////////////

Game_Enemy.prototype.usedSkillThisTurn = function() {
	return this._usedSkillThisTurn;
};
Game_Enemy.prototype.setUsedSkillThisTurn = function(value) {
	this._usedSkillThisTurn = value;
};

//////////
// Stench
/////////

Game_Enemy.prototype.stenchLvl = function() { 
	var value = this.stench;
	value += this._smegma * VAR_SMEGMA_STENCH;
	return value;
};

//////////
// Ejaculation Volume
/////////

Game_Enemy.prototype.ejaculationVolume = function(multipler) {
	if(!multipler) multipler = 1;	
	let value = this._ejaculationVolume * multipler;
	if(this.isHorny) value *= 1.2;

	if(this.isPrisonGuard) value *= this.prisonGuardEdictEjaculationVolume();
	else if(this.isInmate) value *= this.inmateEdictEjaculationVolume();
	
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	value *= actor.titleEnemyEjaculationVolume(this);
	
	value *= this.prefixEjaculationVolumeEffect();

	let leftover = this.pleasure - this.orgasmPoint();
	if(leftover > 0)
		value *= (1 + leftover / this.orgasmPoint());
	
	let range = Math.round(value * 0.25);
	value -= Math.randomInt(range);
	value += Math.randomInt(range);
	
	return Math.min(Math.ceil(value), this.energy);
};

////////
// AI Level
////////////

Game_Enemy.prototype.aiLevel = function() {
	if(this.isVisitorMaleType) return 1;
	if(this._ejaculationStock === 0 && !Karryn.isInNoEjaculationStockStillContinuesPose()) return 0;
	if(this.isChargedUp() || Karryn.isInReceptionistPose()) return 1;
	
	let level = this.enemy().aiLevel;
	//todo: decrease ai level if for example, dizzy, confused, etc
	if(Karryn.isInWaitressServingPose() && this._bar_TimelimitAngryLeaving === -1)
		level -= 0.4;

	let mod = this.agi - Karryn.agi * VAR_KARRYN_AGI_AILEVEL;
	mod += this._didNothingCount * VAR_ENEMY_DIDNOTHING_AILEVEL;
	if(this.isHorny) mod += VAR_ENEMY_HORNY_AILEVEL;
	
	level += mod * 0.01;
	
	if(Prison.easyMode()) level -= 0.1;
	else if(Prison.normalMode()) level -= 0.05;
	else level += 0.1;
	
	if(this.isPrisonGuard) level += this.prisonGuardEdictAILevel();
	else if(this.isInmate) level += this.inmateEdictAILevel();
	
	//after all other modifers
	
	let minlevel = 0.5;
	if($gameParty.isInWaitressBattle)
		minlevel = 0.15;
	
	let maxlevel = 1;
	
	level = level.clamp(minlevel,maxlevel);
    return level;
};

/////////
// Param Rate
/////////////////

Game_Enemy.prototype.paramRate = function(paramId) {
    let rate = Game_Battler.prototype.paramRate.call(this, paramId);
    rate *= this.enemy().rateParams[paramId];
	
	if(paramId === PARAM_CHARM_ID) {
		if(this.isHorny) rate *= 0.7;
		else if(this.isAngry) rate *= 1.5;
	}
	
	if(this.isPrisonGuard) rate *= this.prisonGuardEdictParamRate(paramId);
	else if(this.isInmate) rate *= this.inmateEdictParamRate(paramId);
	
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	rate *= actor.titleEnemyParamRate(paramId, this);
	
	rate *= this.prefixParamRateEffect(paramId);
	rate *= this.passiveParamRateEffect(paramId);
	
    return rate;
};

/////////////
// XParam
///////////////

Game_Enemy.prototype.xparamRate = function(id) {
    let value = Game_Battler.prototype.xparamRate.call(this, id);
    value *= this.enemy().rateXParams[id];
	
	value *= this.passiveXParamRate(id);
	value *= this.enemyEdictXParamRate(id);
	
	if(Karryn.isUsingThisTitle(TITLE_ID_ENCHANTING_WARDEN)) value *= 0.75;
	
    return value;
};

Game_Enemy.prototype.xparamPlus = function(id) {
    let value = Game_Battler.prototype.xparamPlus.call(this, id);
    value += this.enemy().plusXParams[id];
	
	value += this.enemyEdictXParamPlus(id);
	
    return value;
};

/////////////
// SParam 
///////////////

Game_Enemy.prototype.sparamRate = function(id) {
    let value = Game_Battler.prototype.sparamRate.call(this, id);
    value *= this.enemy().rateSParams[id];
	
	value *= this.passiveSParamRate(id);
	
    return value;
};

Game_Enemy.prototype.sparamPlus = function(paramId) {
    let value = Game_Battler.prototype.sparamPlus.call(this, paramId);
    value += this.enemy().plusSParams[paramId];
	
	if(this.isPrisonGuard) value += this.prisonGuardEdictSParamPlus(paramId);
	
    return value;
};

////////
// Charge
////////

Game_Enemy.prototype.isChargedUp = function() {
	return this.isStateAffected(STATE_CHARGE_ID);
};

/////////
// Onlooker
////////////

Object.defineProperty(Game_Enemy.prototype, "isOnlooker", {
	get: function () { return this._tagOnlooker || this.isStateAffected(STATE_IS_ONLOOKER_ID); }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isNotOnlooker", {
	get: function () { return !this.isOnlooker; }, configurable: true
});

/////////
// Supporter
///////////

Object.defineProperty(Game_Enemy.prototype, "isSupporter", {
	get: function () { return this._tagSupporter; }, configurable: true
});
Object.defineProperty(Game_Enemy.prototype, "isNotSupporter", {
	get: function () { return !this._tagSupporter; }, configurable: true
});

/////////
// Enemy BattlerName BattlerNum
/////////////////

Game_Enemy.prototype.battlerName = function() {
	let validShow = true;
	if(Karryn.isInShowEnemyImageOnlyDuringValidSelectionPose()) {
		validShow = SceneManager._scene._enemyWindow && SceneManager._scene._enemyWindow.isOpenAndActive() && this._selectionShowName;
	}
	//let validShow = (Karryn.isInShowEnemyImageOnlyDuringValidSelectionPose() && SceneManager._scene._enemyWindow && SceneManager._scene._enemyWindow.isOpenAndActive() && this._selectionShowName && this._tagDontDrawImage);
	
	if(this._performingCollapse) 
		return this._battlerNameAtCollapse;
	
	if(!validShow) {
		if(this.enemy().hasTag(TAG_BLANK_TYPE_DOT))
			return ENEMY_BLANK_DOT_BATTLERNAME;
		else if(this.enemy().hasTag(TAG_BLANK_TYPE_HALF))
			return ENEMY_BLANK_HALFSIZE_BATTLERNAME;
		else
			return ENEMY_BLANK_FULLSIZE_BATTLERNAME;
	}
	else if(!this._customEnemySprite) {
		let suffixFileName = '';
		if(this.isChargedUp()) {
			suffixFileName = ENEMY_BATTLERNAME_CHARGE_SUFFIX;
		}
		else if(this.isAngry) {
			suffixFileName = ENEMY_BATTLERNAME_ANGRY_SUFFIX;
		}
		else if(this.isErect) {
			suffixFileName = ENEMY_BATTLERNAME_BLUSH_SUFFIX;
		}
		else if(this._tagHasDamagedFace) {
			if(this.hasLessThanOneThirdStamina()) {
				suffixFileName = ENEMY_BATTLERNAME_DAMAGED_SUFFIX;
			}
			if(this.isCargill && $gameTroop.members()[0].hasLessThanOneThirdStamina()) {
				suffixFileName = ENEMY_BATTLERNAME_DAMAGED_SUFFIX;
			}
		}
		
		if($gameParty.isInWaitressBattle) {
			suffixFileName = this.battlerName_waitressBattleSuffix();
		}
		else if(Karryn.isInReceptionistPose()) {
			suffixFileName = this.battlerName_receptionistBattleSuffix();
		}

		if(this.isWanted) {
			return this._wantedBattlerName + suffixFileName;
		}
		else if(this.isUnique || this.isBossType) {
			return this.enemy().battlerName + suffixFileName;
		}
		else {
			return this.enemyType() + '_' + this.battlerNameNum() + suffixFileName;
		}
	}
	else
		return this._customEnemySprite;

};

Game_Enemy.prototype.battlerNameNum = function() {
	return this._battlerNameNum;
};

Game_Enemy.prototype.setupRandomBattlerNameNum = function() {
	let array = this.enemy().dataBatternameNum.slice(0);
	let ranNum = Math.randomInt(array.length);
	this._battlerNameNum = array[ranNum];
	if(this._battlerNameNum < 10) this._battlerNameNum = '' + '0' + this._battlerNameNum;
};


/////////
// Enemy Custom Sprite
/////////////////

Game_Enemy.prototype.setCustomEnemySprite = function(name) { 
	this._customEnemySprite = name;
};

Game_Enemy.prototype.setCustomEnemySpritePosition = function(x, y) { 
	this._spriteEnemy._homeX = x;
	this._spriteEnemy._homeY = y;
	this._spriteEnemy.updatePosition();
};

//todo: need to reset back after defeat lvl1 or whatever
Game_Enemy.prototype.resetCustomEnemySprite = function() { 
	this._customEnemySprite = false;
};

////////
// Enemy Temporary Selection Show
/////////////////

Game_Enemy.prototype.resetTemporarySelectionShow = function() { 
	this._selectionShowImage = false;
	this._selectionShowName = false;
};

////////////////////
// Using Body Slot
////////////////////////

Game_Enemy.prototype.setupUsingBodySlot = function() {
	let st = SLOT_FREE;
	this._usingBodySlot = [ st, st, st, st, st, st, st, st, st, st, st, st, st, st, st, st, st ];
};

//Reset everything to free except the ones set to unavailable
Game_Enemy.prototype.resetUsingBodySlot = function() {
	let slots = this._usingBodySlot;
	for(let i = 0; i < slots.length; ++i) {
		if(slots[i] !== SLOT_UNAVAILABLE)
			slots[i] = SLOT_FREE;
	}
};

Game_Enemy.prototype.fullResetUsingBodySlot = function() {
	this.setupUsingBodySlot();
};


Game_Enemy.prototype.getUsingBodySlotStatus = function(slotId) { 
	return this._usingBodySlot[slotId];
};
Game_Enemy.prototype.isUsingBodySlot = function(slotId) { 
	return this.getUsingBodySlotStatus(slotId) !== SLOT_FREE;
};
Game_Enemy.prototype.isUsingBodySlotPetting = function(slotId) { 
	return (this.getUsingBodySlotStatus(slotId) === SLOT_PETTED_PETTING_ONLY) 
	|| (this.getUsingBodySlotStatus(slotId) === SLOT_PETTED);
};
Game_Enemy.prototype.isUsingBodySlotPenis = function(slotId) { 
	return (this.getUsingBodySlotStatus(slotId) === SLOT_PENIS);
};
Game_Enemy.prototype.isUsingBodySlotAnus = function(slotId) { 
	return (this.getUsingBodySlotStatus(slotId) === SLOT_ANUS);
};


Game_Enemy.prototype.isThisBodySlotUnavailable = function(slotId) { 
	return (this.getUsingBodySlotStatus(slotId) === SLOT_UNAVAILABLE);
};

Game_Enemy.prototype.setBodySlot = function(slotId, status) { 
	this._usingBodySlot[slotId] = status;
};

//For setting which slot the enemy is using on actor
Game_Enemy.prototype.setBodySlotWithPetted = function(slotId) { 
	this.setBodySlot(slotId, SLOT_PETTED);
};
Game_Enemy.prototype.setBodySlotWithPettedPettingOnly = function(slotId) { 
	this.setBodySlot(slotId, SLOT_PETTED_PETTING_ONLY);
};
Game_Enemy.prototype.setBodySlotWithToy = function(slotId) { 
	this.setBodySlot(slotId, SLOT_TOY);
};
Game_Enemy.prototype.setBodySlotWithPenis = function(slotId) { 
	this.setBodySlot(slotId, SLOT_PENIS);
};
Game_Enemy.prototype.setBodySlotWithAnus = function(slotId) { 
	this.setBodySlot(slotId, SLOT_ANUS);
};


//For setting actor slots that the enemy will never use
Game_Enemy.prototype.setBodySlotUnavailable = function(slotId) { 
	this.setBodySlot(slotId, SLOT_UNAVAILABLE);
};


//////////////
// Pose Status
////////////
	
Game_Enemy.prototype.isInAPose = function() { 
	return this._poseStatus !== ENEMY_POSE_NONE;
};
Game_Enemy.prototype.isNotInAPose = function() { 
	return this._poseStatus === ENEMY_POSE_NONE;
};

Game_Enemy.prototype.isPoseMaster = function() { 
	return this._poseStatus === ENEMY_POSE_MASTER;
};

Game_Enemy.prototype.isPoseHelper = function() { 
	return this._poseStatus === ENEMY_POSE_HELPER;
};

Game_Enemy.prototype.setPoseStatusMaster = function() { 
	this._poseStatus = ENEMY_POSE_MASTER;
};
Game_Enemy.prototype.setPoseStatusHelper = function() { 
	this._poseStatus = ENEMY_POSE_HELPER;
};

Game_Enemy.prototype.resetPoseStatus = function() { 
	this._poseStatus = ENEMY_POSE_NONE;
	this.setPoseSkills(false); 
	this.setPoseSkillTarget(false); 
	this.setPoseMasterSkillID(-1);
};

Game_Enemy.prototype.setPoseMasterSkillID = function(value) { 
	this._poseMasterSkillID = value;
};
Game_Enemy.prototype.getPoseMasterSkillID = function() { 
	return this._poseMasterSkillID;
};

///////////
// Pose Skill
/////////////

Game_Enemy.prototype.setPoseSkills = function(skills) { 
	if(!skills) this._currentPoseSkills = skills;
	else this._currentPoseSkills = skills.slice(0);
};
Game_Enemy.prototype.setPoseSkillTarget = function(target) { 
	this._currentPoseSkillTarget = target;
};

Game_Enemy.prototype.getPoseSkills = function() { 
	return this._currentPoseSkills;
};
Game_Enemy.prototype.getPoseSkillTarget = function() { 
	return this._currentPoseSkillTarget;
};

Game_Enemy.prototype.usePoseSkill = function() { 
	if(!this.getPoseSkills()) return false;
	
	let success = false;
	let array = this.getPoseSkills().slice(0);
	let target = false;
	if(this.getPoseSkillTarget())
		target = this.getPoseSkillTarget();
	
	while(array.length > 0 && !success) {
		let index = Math.randomInt(array.length);
		let skillId = array.splice(index,1)[0];
		success = this.meetsSkillConditionsEval($dataSkills[skillId], target);
		if(success) {
			this.useAISkill(skillId,target);
			this.setUsedSkillThisTurn(true);
			return true;
		}
	}
	
	return false;
};

///////////////
// Orgasm Skills
//////////////

Game_Enemy.prototype.setOrgasmSkills = function(skills) {
	if(!skills) this._currentOrgasmSkills = skills;	
	else this._currentOrgasmSkills = skills.slice(0);
};
Game_Enemy.prototype.getOrgasmSkills = function() { 
	return this._currentOrgasmSkills;
};

Game_Enemy.prototype.resetOrgasmSkills = function() { 
	this.setOrgasmSkills(this._aiDefaultEjaculationSkills);
};


Game_Enemy.prototype.useOrgasmSkill = function() { 
	if(!this.getOrgasmSkills()) return false;
	
	let success = false;
	let orgasmSkills = this.getOrgasmSkills().slice(0);
	let target = false;
	
	if(this.getPoseSkillTarget())
		target = this.getPoseSkillTarget();
	
	if(!target) target = $gameActors.actor(ACTOR_KARRYN_ID);
	
	while(orgasmSkills.length > 0 && !success) {
		let index = Math.randomInt(orgasmSkills.length);
		let skillId = orgasmSkills.splice(index,1)[0];
		success = this.meetsSkillConditionsEval($dataSkills[skillId], target);
		if(success) {
			//Waitress Sex Overwrite
			if(target.isActor() && target.isInWaitressSexPose()) {
				if(target._karrynMugContent === ALCOHOL_TYPE_SEMEN || 
				(target.canMouthSwallow() && target._karrynMugAmount === 0)) {
					if(skillId === SKILL_ENEMY_EJACULATE_FACE_ID || skillId === SKILL_ENEMY_EJACULATE_BOOBS_ID ||
					skillId === SKILL_ENEMY_EJACULATE_LEFTARM_ID || skillId === SKILL_ENEMY_EJACULATE_RIGHTARM_ID) {
						if(Math.random() < 0.75 || this.isUsingBodySlotPenis(OTHER_1_ID))
							skillId = SKILL_ENEMY_EJACULATE_INTO_MUG_ID;
					}
				}
			}
			
			if(!this.isSlimeType && !Karryn.isInReceptionistPose())
				this.addState(STATE_ENEMY_CAME_THIS_TURN_ID);
			
			
			this.useAISkill(skillId, target);
			this.setUsedSkillThisTurn(true);
			return true;
		}
	}
	
	return false;
};

///////////
// Orgasm
/////////////

Game_Enemy.prototype.checkForOrgasm = function() {
	let canOrgasm = false;
	if(this.reachedOrgasmPoint() && !this.orgasmLocked() && this._ejaculationStock >= 1 && DEBUG_MODE) {
		canOrgasm = true;
		
		if(this.isStateAffected(STATE_ENEMY_CAME_THIS_TURN_ID)) {
			canOrgasm = false;
		}
		else if(this.isStateAffected(STATE_ENEMY_EDGING_CONTROL_ID)) {
			canOrgasm = false;
			if(this.pleasure >= this.orgasmPoint() * Karryn.willpowerEdgingControlEffect()) canOrgasm = true;
		}
	}
	
	if(canOrgasm && Karryn.isInReceptionistPose()) 
		canOrgasm = this.checkForOrgasm_receptionistBattle();
	
	if(canOrgasm) this.orgasm();
	
	if(this._hp > 0 && this._ejaculationStock > 0)
		this.resetGotHitBySkillType();
};

Game_Enemy.prototype.orgasm = function() { 
	this.useOrgasmSkill();
	this.removeState(STATE_HORNY_ID);
	this.removeState(STATE_ANGRY_ID);
	Karryn.emoteMasterManager();
	BattleManager.removeImmortalStateFromEveryone();
};

Game_Enemy.prototype.postOrgasmPleasure = function() { 
	if(this.isSlimeType) {
		return;
	}
	else {
		this._ejaculationCount++;
		this._ejaculationStock--;
		if(this._ejaculationStock >= 1) {
			this.setPleasureToArousalPoint();
		}
		else {
			if(Karryn.isInEnemiesJoinArousedAndStayArousedPose()) {
				this.setPleasureToArousalPoint();
			}
			else {
				this.gainPleasure(-this.orgasmPoint());
			}
		}
		
		if(!this.isVisitorMaleType)
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
	}
};

Game_Enemy.prototype.regenerateHp = function() {
	if(this.hasNoStamina()) return;
	if(this.isVisitorMaleType) {
		this.setUsedSkillThisTurn(false);
		return;
	}
	if(this.energy !== 0 && (this._ejaculationStock > 0 || Karryn.isInNoEjaculationStockStillContinuesPose())) {
		let value = Math.floor(this.maxstamina * this.staminaregen);
		if (value !== 0) {
			this.gainHp(value);
		}
		this.setUsedSkillThisTurn(false);
	}
	else {
		this.removeImmortal();
		this.gainHp(-this.stamina);
	}
};

/////////
// Can Attack
/////////

Game_Enemy.prototype.canAttack = function(target) { 
	return target.isAttackable();
};

////////
// Can Be Kissed
////////

Game_Enemy.prototype.canBeKissed = function() { 
	return this._canBeKissed;
};
Game_Enemy.prototype.setCanBeKissed = function(value) { 
	this._canBeKissed = value;
};


////////
// Can Pet
////////////

//default
Game_Enemy.prototype.canKissLvlOne = function(target) { 
	return target.canGetKissed(KISS_LVL_ONE);
};
Game_Enemy.prototype.canKissLvlTwo = function(target) { 
	return target.canGetKissed(KISS_LVL_TWO);
};
Game_Enemy.prototype.canPetBoobs = function(target) { 
	return target.canGetBoobsPetted();
};
Game_Enemy.prototype.canPetNipples = function(target) { 
	return target.canGetNipplesPetted();
};
Game_Enemy.prototype.canPetClit = function(target) { 
	return target.canGetClitPetted();
};
Game_Enemy.prototype.canPetPussy = function(target) { 
	return target.canGetPussyPetted();
};
Game_Enemy.prototype.canPetButt = function(target) { 
	return target.canGetButtPetted();
};
Game_Enemy.prototype.canPetAnal = function(target) { 
	return target.canGetAnalPetted();
};

Game_Enemy.prototype.canSpank = function(target) { 
	if(this.isGoblinType && !Karryn.hasEdict(EDICT_DEMEAN_GOBLINS)) return false;
	if(this.isThugType && Karryn.hasEdict(EDICT_WEAKEN_THE_THUGS)) return false;
	return target.canGetSpanked();
};
Game_Enemy.prototype.canCunnilingus = function(target) { 
	return target.canGetCunnilingus();
};
Game_Enemy.prototype.canGetRimmed = function(target) { 
	return target.canGiveRimjob();
};
Game_Enemy.prototype.canGetFingersSucked = function(target) { 
	return target.canSuckFingers();
};

// Nerds
Game_Enemy.prototype.canNerdPet = function(target) { 
	if(this.isNerdType)
		return !target.isInCombatPose() || Karryn.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_THREE_ID);
	else
		return true;
};

// Toys

Game_Enemy.prototype.canInsertPinkRotor = function(target) { 
	return target.canGetClitToyInserted();
};
Game_Enemy.prototype.canInsertPenisDildo = function(target) { 
	return target.canGetPussyToyInserted();
};
Game_Enemy.prototype.canInsertAnalBeads = function(target) { 
	return target.canGetAnalToyInserted();
};

Game_Enemy.prototype.canPlayWithPinkRotor = function(target) { 
	return target.isWearingClitToy_PinkRotor() && target.getBodySlotStatus(CLIT_ID) !== SLOT_UNAVAILABLE_BUT_HAS_TOY;
};
Game_Enemy.prototype.canPlayWithPenisDildo = function(target) { 
	return target.isWearingPussyToy_PenisDildo() && target.getBodySlotStatus(PUSSY_ID) !== SLOT_UNAVAILABLE_BUT_HAS_TOY;
};
Game_Enemy.prototype.canPlayWithAnalBeads = function(target) { 
	return target.isWearingAnalToy_AnalBeads() && target.getBodySlotStatus(ANAL_ID) !== SLOT_UNAVAILABLE_BUT_HAS_TOY;
};

////////
// Petting Selector

Game_Enemy.prototype.canUsePettingKissSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canKissLvlOne(target);
};
Game_Enemy.prototype.canUsePettingBoobsAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetBoobs(target);
};
Game_Enemy.prototype.canUsePettingNipplesAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetNipples(target);
};
Game_Enemy.prototype.canUsePettingClitAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetClit(target) || this.canPlayWithPinkRotor(target);
};
Game_Enemy.prototype.canUsePettingPussyAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetPussy(target) || this.canPlayWithPenisDildo(target);
};
Game_Enemy.prototype.canUsePettingButtAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetButt(target);
};
Game_Enemy.prototype.canUsePettingAnalAreaSelector = function(target) { 
	if(!this.canNerdPet(target)) return false;
	return this.canPetAnal(target) || this.canPlayWithAnalBeads(target);
};


//////////
// Can Insert
///////////

//default
Game_Enemy.prototype.canInsertMouth = function(target) { 
	if(this.isPrisonerType && !target._firstBlowjobDate) return false; 
	return target.canGetMouthInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertBoobs = function(target) { 
	return target.canGetBoobsInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertBoobs_ignoreClothes = function(target) { 
	return target.canGetBoobsInserted(true) && this.isErect;
};
Game_Enemy.prototype.canInsertPussy = function(target) { 
	if(this.isPrisonerType && !target._firstPussySexDate) return false; 
	return target.canGetPussyInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertAnal = function(target) { 
	if(this.isPrisonerType && !target._firstAnalSexDate) return false; 
	return target.canGetAnalInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertRightHand = function(target) { 
	return target.canGetRightHandInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertLeftHand = function(target) { 
	return target.canGetLeftHandInserted() && this.isErect;
};
Game_Enemy.prototype.canInsertFeet = function(target) { 
	return target.canGetFeetInserted() && this.isErect;
};

Game_Enemy.prototype.canInsertPussy_fromGoblinCL = function(target) { 
	return target.canGetPussyInserted_fromGoblinCL() && this.isErect;
};

//None
Game_Enemy.prototype.canInsertMouthNone = function(target) { 
	return target.canGetMouthInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertBoobsNone = function(target) { 
	return target.canGetBoobsInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertPussyNone = function(target) { 
	return target.canGetPussyInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertAnalNone = function(target) { 
	return target.canGetAnalInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertRightHandNone = function(target) { 
	return target.canGetRightHandInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertLeftHandNone = function(target) { 
	return target.canGetLeftHandInsertedNone() && this.isErect;
};
Game_Enemy.prototype.canInsertOther1None = function(target) { 
	return target.canGetOther1InsertedNone();
};
Game_Enemy.prototype.canInsertOther2None = function(target) { 
	return target.canGetOther2InsertedNone();
};
Game_Enemy.prototype.canInsertOther3None = function(target) { 
	return target.canGetOther3InsertedNone();
};
Game_Enemy.prototype.canInsertOther4None = function(target) { 
	return target.canGetOther4InsertedNone();
};

Game_Enemy.prototype.canInsertOther1Mug = function(target) { 
	return target.canGetOther1InsertedMug();
};

/////////
// Target For Attack
///////////////

Game_Enemy.prototype.isValidTargetForAttack = function(actor) { 
	let untargetableForAttack = this.isStateAffected(STATE_UNTARGETABLE_FOR_ATTACK_ID);

	return !untargetableForAttack;
};

////////////
// Target For Sex
// As in can Karryn use her sex skill on you
// isValidTargetFor___ functions are called in Karryn's skills selection eval
////////////////

Game_Enemy.prototype.isValidTargetForKiss = function(actor) { 
	let enemyBodySlotAvailable = !this.isThisBodySlotUnavailable(MOUTH_ID);
	let isValidEnemyType = !this.isSlimeType;
	let isNotAngry = !this.isAngry;
	let canBeKissed = this.canBeKissed();
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	if(!untargetableForSex && enemyBodySlotAvailable && isValidEnemyType && isNotAngry && canBeKissed) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForCockStare = function(actor) { 
	let enemyIsErect = this.isErect;
	let enemyIsInSexPose = this.isInAPose();
	let isValidEnemyType = !this.isSlimeType;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	if(!untargetableForSex && !enemyIsInSexPose && isValidEnemyType) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForCockPetting = function(actor) { 
	let enemyIsInSexPose = this.isInAPose();
	let isValidEnemyType = !this.isSlimeType;
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	if(!untargetableForSex && !enemyIsInSexPose && isValidEnemyType && isNotAngry) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForHandjob = function(actor) { 
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForHandjob;
	let canInsert = this.canInsertLeftHand(actor) || this.canInsertRightHand(actor);
	let isValidEnemyType = !this.isSlimeType;
	
	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForBlowjob = function(actor) { 
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);

	let sexPoseTarget = this._targetForBlowjob;
	let canInsert = this.canInsertMouth(actor);
	let isValidEnemyType = !this.isSlimeType;
	
	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForRimjob = function(actor) {
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForRimjob;
	let canInsert = this.canGetRimmed(actor);
	let isValidEnemyType = !this.isSlimeType;

	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (!actorIsInSexPose && canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForFootjob = function(actor) {
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForFootjob;
	let canInsert = this.canInsertFeet(actor);
	let isValidEnemyType = !this.isSlimeType;
	
	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForTittyFuck = function(actor) {
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForTittyFuck;
	let canInsert = this.canInsertBoobs_ignoreClothes(actor);
	let isValidEnemyType = !this.isSlimeType;
	
	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForPussySex = function(actor) { 
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForPussySex;
	let canInsert = this.canInsertPussy(actor);
	let isValidEnemyType = !this.isSlimeType;

	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.isValidTargetForAnalSex = function(actor) { 
	let isErect = this.isErect;
	let actorIsInSexPose = actor.isInSexPose();
	let enemyIsInSexPose = this.isInAPose();
	let isNotAngry = !this.isAngry;
	let untargetableForSex = this.isStateAffected(STATE_UNTARGETABLE_FOR_SEX_ID);
	
	let sexPoseTarget = this._targetForAnalSex;
	let canInsert = this.canInsertAnal(actor);
	let isValidEnemyType = !this.isSlimeType;
	
	let validTarget = isErect && ((actorIsInSexPose && sexPoseTarget) || (canInsert && isNotAngry && isValidEnemyType && !enemyIsInSexPose && !untargetableForSex));
	if(validTarget) {
		this._selectionShowName = true;
		return true;
	}
	else {
		this._selectionShowName = false;
		return false;
	}
};

Game_Enemy.prototype.setValidTargetForHandjob = function() { 
	this._targetForHandjob = true;
};
Game_Enemy.prototype.setValidTargetForBlowjob = function() { 
	this._targetForBlowjob = true;
};
Game_Enemy.prototype.setValidTargetForRimjob = function() { 
	this._targetForRimjob = true;
};
Game_Enemy.prototype.setValidTargetForFootjob = function() { 
	this._targetForFootjob = true;
};
Game_Enemy.prototype.setValidTargetForTittyFuck = function() { 
	this._targetForTittyFuck = true;
};
Game_Enemy.prototype.setValidTargetForPussySex = function() { 
	this._targetForPussySex = true;
};
Game_Enemy.prototype.setValidTargetForAnalSex = function() { 
	this._targetForAnalSex = true;
};



Game_Enemy.prototype.resetAllTargetsForSex = function() { 
	this._targetForHandjob = false;
	this._targetForBlowjob = false;
	this._targetForTittyFuck = false;
	this._targetForPussySex = false;
	this._targetForAnalSex = false;
	this._targetForRimjob = false;
	this._targetForFootjob = false;
};

///////
// Guard Attack Requirement
//////////////

Game_Enemy.prototype.dumbGuardAttackReq = function() { 
	//todo: expert training disables this
	//return !Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING);
	return true;
};
Game_Enemy.prototype.smartGuardSlashReq = function(target) { 
	return Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING) && target.isBluntStance();
};
Game_Enemy.prototype.smartGuardStrikeReq = function(target) { 
	return Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING) && target.isPierceStance();
};
Game_Enemy.prototype.smartGuardThrustReq = function(target) { 
	return Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING) && target.isSlashStance();
};

Game_Enemy.prototype.enemyGuardChargeReq = function(target) { 
	return Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING);
};

///////////////
// On Turn End
///////////////

Game_Enemy.prototype.onTurnEnd = function() {
    this.clearResult();
	//this.checkIfStillErectedWhileInPose();
    this.regenerateAll();
	this.resetEnemyTurnVariables();
	this.checkIfDidNothing();
    this.removeStatesAuto(2);
};

Game_Enemy.prototype.resetEnemyTurnVariables = function() {
    this._thisTurnTaunted = false;
	this._thisTurnFlaunted = false;
};

//Now currently being called in post internal ejaculation
Game_Enemy.prototype.checkIfStillErectedWhileInPose = function() {
    if(this.isInAPose() && !this.isErect) {
		if(this.isPoseMaster()) {
			if(!BattleManager.swappedPoseMaster(this))
				BattleManager.pullOutAllEnemies();
		}
		else {
			BattleManager.pullOutEnemy(this);
		}
		return true;
	}
	return false;
};


/////////
// Perform Collapse
///////////

Remtairy.Enemy.Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
	if(this.isInAPose()) {
		//If this enemy is a master, BattleManager needs to release the whole pose which will release everyone else
		if(this.isPoseMaster()) {
			if(!BattleManager.swappedPoseMaster(this))
				BattleManager.pullOutAllEnemies();
		}
		else {
			BattleManager.pullOutEnemy(this);
		}
	}
	if(Karryn.isInReceptionistPose()) {
		this.performCollapse_receptionistBattle();
	}
    
	this._performingCollapse = true;
	this._battlerNameAtCollapse = this.battlerName();
	
	Game_Battler.prototype.performCollapse.call(this);
    switch (this.collapseType()) {
    case 0:
        this.requestEffect('collapse');
        SoundManager.playEnemyCollapse();
        break;
    case 1:
        this.requestEffect('bossCollapse');
        SoundManager.playBossCollapse1();
        break;
    case 2:
        this.requestEffect('instantCollapse');
        break;
    }
	
	if($gameParty.isInWaitressBattle || Karryn.isInReceptionistPose()) return;
	
	if(this.isWanted) {
		Prison.setWantedIdAsDefeated(this.getWantedId());
	}
	else if(this.isBossType) {
		$gameParty.checkPotentialNewWanted(this);
	}
		
	
	$gameParty.addRecordSubdued(this);
	$gameParty.increaseOrderGain(this.getOrderGainValue());
};

//////////
////////////////
// Data Manager
////////////////
///////////

//Enemy setup tags
DataManager.processRemTMNotetags_RemtairyEnemy = function(group) {
	for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);
		
		obj.dataOrderGain = 0;
		obj.dataFatigueGain = 0;
		obj.dataInitialPleasure = 5;
		obj.dataArousalPoint = VAR_AP_PER_END;
		obj.dataOrgasmPoint = VAR_OP_PER_END;
		obj.dataTalkLevel = 1;
		obj.dataSightLevel = 1;
		obj.dataPettingLevel = 1;
		obj.dataToyLevel = 1;
		obj.dataKissLevel = 1;
		obj.dataHandjobLevel = 1;		
		obj.dataBlowjobLevel = 1;	
		obj.dataTittyFuckLevel = 1;	
		obj.dataPussySexLevel = 1;	
		obj.dataAnalSexLevel = 1;	
		obj.dataMasturbateLevel = 1;
		obj.dataMasochismLevel = 1;
		obj.dataSadismLevel = 1;
		obj.dataStench = 0;	
		obj.dataStenchRange = 0;
		obj.dataSmegma = 0;	
		obj.dataSmegmaRange = 0;	
		obj.dataVisitorWalkingSpeed = 10;	
		obj.dataVisitorWritingSpeed = 10;	
		obj.dataVisitorDissatisfaction = 10;
		obj.dataVisitorPervPromoteChance = 0;
		obj.dataVisitorCanBeFan = 0;
		obj.dataVisitorCanBePervert = 0;
		obj.dataVisitorAlwaysFan = 0;
		obj.dataVisitorAlwaysPervert = 0;
		obj.dataVisitorNotVisiting = 0;
		obj.dataVisitorTachie = [1];
		obj.dataEjaculationAmt = ENEMY_DEFAULT_EJACULATION_AMOUNT;
		obj.dataEjaculationRange = ENEMY_DEFAULT_EJACULATION_RANGE;	
		obj.dataEjaculationStock = 1;	
		obj.dataBaseAnger = 100;
		obj.dataBaseEnemyLevel = 0;
		obj.dataRowHeight = 1;
		obj.dataFixedRow = -1;
		obj.dataStartingStance = STANCE_RANDOM;
		obj.dataEnemyType = ENEMYTYPE_PRISONER_TAG;
		obj.dataEnemyCock = ENEMYCOCK_HUMAN_TAG;
		obj.dataTransferWantedEnemyId = false;
		obj.dataSpecialSelectionName = false;
		obj.dataBatternameNum = [1];
		obj.dataAIAttackSkills = false;
		obj.dataAIChargeSkills = false;
		obj.dataAIPettingSkills = false;
		obj.dataAITalkSightSkills = false;
		obj.dataAIPoseStartSkills = false;
		obj.dataAIPoseJoinSkills = false;
		obj.dataAIEjaculationSkills = false;
		
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(/<INITIAL PLEASURE:[ ](.*)>/i)) {
				obj.dataInitialPleasure = parseInt(RegExp.$1);
			} else if (line.match(/<ORDER GAIN:[ ](.*)>/i)) {
				obj.dataOrderGain = parseInt(RegExp.$1);	
			} else if (line.match(/<FATIGUE GAIN:[ ](.*)>/i)) {
				obj.dataFatigueGain = parseInt(RegExp.$1);
			} else if (line.match(/<AROUSAL POINT:[ ](.*)>/i)) {
				obj.dataArousalPoint = parseInt(RegExp.$1);
			} else if (line.match(/<ORGASM POINT:[ ](.*)>/i)) {
				obj.dataOrgasmPoint = parseInt(RegExp.$1);
			} else if (line.match(/<TALK LVL:[ ](.*)>/i)) {
				obj.dataTalkLevel = parseFloat(RegExp.$1);
			} else if (line.match(/<SIGHT LVL:[ ](.*)>/i)) {
				obj.dataSightLevelId = parseFloat(RegExp.$1);
			} else if (line.match(/<PETTING LVL:[ ](.*)>/i)) {
				obj.dataPettingLevel = parseFloat(RegExp.$1);
			} else if (line.match(/<TOY LVL:[ ](.*)>/i)) {
				obj.dataToyLevel = parseFloat(RegExp.$1);	
			} else if (line.match(/<KISS LVL:[ ](.*)>/i)) {
				obj.dataKissLevel = parseFloat(RegExp.$1);				
			} else if (line.match(/<HANDJOB LVL:[ ](.*)>/i)) {
				obj.dataHandjobLevel = parseFloat(RegExp.$1);			
			} else if (line.match(/<BLOWJOB LVL:[ ](.*)>/i)) {
				obj.dataBlowjobLevel = parseFloat(RegExp.$1);				
			} else if (line.match(/<TITTYFUCK LVL:[ ](.*)>/i)) {
				obj.dataTittyFuckLevel = parseFloat(RegExp.$1);		
			} else if (line.match(/<PUSSYSEX LVL:[ ](.*)>/i)) {
				obj.dataPussySexLevel = parseFloat(RegExp.$1);				
			} else if (line.match(/<ANALSEX LVL:[ ](.*)>/i)) {
				obj.dataAnalSexLevel = parseFloat(RegExp.$1);	
			} else if (line.match(/<MASTURBATE LVL:[ ](.*)>/i)) {
				obj.dataMasturbateLevel = parseFloat(RegExp.$1);	
			} else if (line.match(/<MASOCHISM LVL:[ ](.*)>/i)) {
				obj.dataMasochismLevel = parseFloat(RegExp.$1);	
			} else if (line.match(/<SADISM LVL:[ ](.*)>/i)) {
				obj.dataSadismLevel = parseFloat(RegExp.$1);	
			} else if (line.match(/<STENCH MIN:[ ](.*)>/i)) {
				obj.dataStench = parseInt(RegExp.$1);				
			} else if (line.match(/<STENCH RANGE:[ ](.*)>/i)) {
				obj.dataStenchRange = parseInt(RegExp.$1);
			} else if (line.match(/<SMEGMA MIN:[ ](.*)>/i)) {
				obj.dataSmegma = parseInt(RegExp.$1);				
			} else if (line.match(/<SMEGMA RANGE:[ ](.*)>/i)) {
				obj.dataSmegmaRange = parseInt(RegExp.$1);	
			} else if (line.match(/<VISITOR WALKING SPEED:[ ](.*)>/i)) {
				obj.dataVisitorWalkingSpeed = parseInt(RegExp.$1);	
			} else if (line.match(/<VISITOR WRITING SPEED:[ ](.*)>/i)) {
				obj.dataVisitorWritingSpeed = parseInt(RegExp.$1);
			} else if (line.match(/<VISITOR DISSATISFACTION:[ ](.*)>/i)) {
				obj.dataVisitorDissatisfaction = parseInt(RegExp.$1);
			} else if (line.match(/<VISITOR PERV PROMOTE CHANCE:[ ](.*)>/i)) {
				obj.dataVisitorPervPromoteChance = parseInt(RegExp.$1);	

			} else if (line.match(/<VISITOR CAN BE FAN:[ ](.*)>/i)) {
				obj.dataVisitorCanBeFan = parseInt(RegExp.$1);
			} else if (line.match(/<VISITOR CAN BE PERVERT:[ ](.*)>/i)) {
				obj.dataVisitorCanBePervert = parseInt(RegExp.$1);
				
			} else if (line.match(/<VISITOR ALWAYS FAN:[ ](.*)>/i)) {
				obj.dataVisitorAlwaysFan = parseInt(RegExp.$1);
			} else if (line.match(/<VISITOR ALWAYS PERVERT:[ ](.*)>/i)) {
				obj.dataVisitorAlwaysPervert = parseInt(RegExp.$1);	
				
			} else if (line.match(/<VISITOR NOT VISITING:[ ](.*)>/i)) {
				obj.dataVisitorNotVisiting = parseInt(RegExp.$1);	
				
			} else if (line.match(/<EJACULATION AMOUNT:[ ](.*)>/i)) {
				obj.dataEjaculationAmt = parseInt(RegExp.$1);				
			} else if (line.match(/<EJACULATION RANGE:[ ](.*)>/i)) {
				obj.dataEjaculationRange = parseInt(RegExp.$1);	
			} else if (line.match(/<EJACULATION STOCK:[ ](.*)>/i)) {
				obj.dataEjaculationStock = parseInt(RegExp.$1);	
			} else if (line.match(/<BASE ANGER:[ ](.*)>/i)) {
				obj.dataBaseAnger = parseInt(RegExp.$1);
			} else if (line.match(/<BASE ENEMY LEVEL:[ ](.*)>/i)) {
				obj.dataBaseEnemyLevel = parseInt(RegExp.$1);	
			} else if (line.match(/<BASE ENEMY LVL:[ ](.*)>/i)) {
				obj.dataBaseEnemyLevel = parseInt(RegExp.$1);
			} else if (line.match(/<ENEMY BASE LVL:[ ](.*)>/i)) {
				obj.dataBaseEnemyLevel = parseInt(RegExp.$1);				
			} else if (line.match(/<ROW HEIGHT:[ ](.*)>/i)) {
				obj.dataRowHeight = parseInt(RegExp.$1);
			} else if (line.match(/<FIXED ROW:[ ](.*)>/i)) {
				obj.dataFixedRow = parseInt(RegExp.$1);
			} else if (line.match(/<TRANSFER WANTED ENEMY ID:[ ](.*)>/i)) {
				obj.dataTransferWantedEnemyId = parseInt(RegExp.$1);	
			} else if (line.match(/<ENEMY TYPE:[ ](.*)>/i)) {
				obj.dataEnemyType = String(RegExp.$1).toLowerCase();	
			} else if (line.match(/<ENEMY COCK:[ ](.*)>/i)) {
				obj.dataEnemyCock = String(RegExp.$1).toLowerCase();
			} else if (line.match(/<STARTING STANCE:[ ](.*)>/i)) {
				obj.dataStartingStance = String(RegExp.$1).toLowerCase();
			} else if (line.match(/<SPECIAL SELECTION NAME:[ ](.*)>/i)) {
				obj.dataSpecialSelectionName = String(RegExp.$1);	
			} else if (line.match(/<(?:BATTLERNAME NUM):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataBatternameNum = [];
				obj.dataBatternameNum = obj.dataBatternameNum.concat(array);
			} else if (line.match(/<(?:VISITOR TACHIE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataVisitorTachie = [];
				obj.dataVisitorTachie = obj.dataVisitorTachie.concat(array);	
			} else if (line.match(/<(?:AI ATTACK SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIAttackSkills = [];
				obj.dataAIAttackSkills = obj.dataAIAttackSkills.concat(array);		
			} else if (line.match(/<(?:AI CHARGE SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIChargeSkills = [];
				obj.dataAIChargeSkills = obj.dataAIChargeSkills.concat(array);			
			} else if (line.match(/<(?:AI PETTING SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIPettingSkills = [];
				obj.dataAIPettingSkills = obj.dataAIPettingSkills.concat(array);	
			} else if (line.match(/<(?:AI TALKSIGHT SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAITalkSightSkills = [];
				obj.dataAITalkSightSkills = obj.dataAITalkSightSkills.concat(array);	
			} else if (line.match(/<(?:AI POSESTART SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIPoseStartSkills = [];
				obj.dataAIPoseStartSkills = obj.dataAIPoseStartSkills.concat(array);
			} else if (line.match(/<(?:AI POSEJOIN SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIPoseJoinSkills = [];
				obj.dataAIPoseJoinSkills = obj.dataAIPoseJoinSkills.concat(array);
			} else if (line.match(/<(?:AI EJACULATION SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
				var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
				obj.dataAIEjaculationSkills = [];
				obj.dataAIEjaculationSkills = obj.dataAIEjaculationSkills.concat(array);
			}
		}

	};
};