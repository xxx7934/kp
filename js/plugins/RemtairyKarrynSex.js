﻿var Remtairy = Remtairy || {};
Remtairy.KarrynSex = Remtairy.KarrynSex || {};


//=============================================================================
 /*:
 * @plugindesc Karryn Sex
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const BASEDMG_TALK = 7;
const BASEDMG_SIGHT = 7;

const BASEDMG_KISS_LVLONE = 7;
const BASEDMG_KISS_LVLTWO = 9;
const BASEDMG_SPANK_LVLONE = 7;

const BASEDMG_PETTING_COCK_LVLONE = 4;
const BASEDMG_PETTING_COCK_LVLTWO = 8;

const BASEDMG_PETTING_BOOBS = 6;
const BASEDMG_PETTING_NIPPLES = 9;
const BASEDMG_PETTING_CLIT = 6;
const BASEDMG_PETTING_PUSSY = 9;
const BASEDMG_PETTING_BUTT = 6;
const BASEDMG_PETTING_ANAL = 9;
const BASEDMG_SUCKING_FINGERS = 7;
const BASEDMG_VISITOR_HANDSHAKE = 5;

const BASEDMG_TOY_PINK_ROTOR = 10;
const BASEDMG_TOY_PENIS_DILDO = 12;
const BASEDMG_TOY_ANAL_BEADS = 12;

const BASEDMG_SEXACT_HANDJOB = 12;
const BASEDMG_SEXACT_BLOWJOB = 12;
const BASEDMG_SEXACT_TITTYFUCK = 15;
const BASEDMG_SEXACT_PUSSYSEX = 18;
const BASEDMG_SEXACT_ANALSEX = 18;
const BASEDMG_SEXACT_CUNNILINGUS = 15;
const BASEDMG_SEXACT_RIMJOB = 12;
const BASEDMG_SEXACT_FOOTJOB = 12;

const VAR_COCK_PETTING_NOTERECT_MULTIPLER = 2;
const VAR_COCK_PETTING_LOWCHARM_MULTIPLER = 0.7;

const VAR_KARRYN_PLEASURE_FEEDBACK_REDUCER = 0.3;
const VAR_ENEMY_PLEASURE_FEEDBACK_REDUCER = 0.3;

//////////
///////////////
// Game Actor
/////////////////
///////////

////////////
// Horny

Game_Actor.prototype.addHornyState = function() {
	if(!DEBUG_MODE) return;
	if($gameParty._showTopRightTimeNumberFlag) {
		if(!this.isHorny) {
			this.addState(STATE_HORNY_ID);
			this.addToActorHornyRecord();
		}
		this.increaseHornyStateTurns(99);
		
		let currentTime = 0;
		if(this.isInWaitressServingPose())
			currentTime = $gameParty.waitressBattle_getCurrentTimeInSeconds();
		else if(this.isInReceptionistPose())
			currentTime = $gameParty.receptionistBattle_getCurrentTimeInSeconds();
		
		this._hornyTimeLimit = currentTime + this.passiveHornyStateAddTimeLimit()
	}
	else {
		if(!this.isHorny) {
			this.addState(STATE_HORNY_ID);
			this.addToActorHornyRecord();
		}
		this.increaseHornyStateTurns(this.passiveHornyStateAddTurns());
	}
};

////////
// Remove Body Slots

Game_Actor.prototype.removeAllPettedToyInsert = function () {
	this.removeAllBodyPetted();
	this.removeAllBodyToy();
	this.removeAllBodyInsert();
};
Game_Actor.prototype.removeAllPettedInsertExceptToy = function () {
	this.removeAllBodyPetted();
	this.removeAllBodyInsert();
};

Game_Actor.prototype.removeAllBodyPetted = function () {
	if(this.isBodySlotAnus(MOUTH_ID)) this.setMouthRimming(false);
	if(this.isBodySlotTongue(PUSSY_ID)) this.setPussyCunni(false);
	

};

Game_Actor.prototype.removeAllBodyInsert = function () {
	if(this.isBodySlotPenis(MOUTH_ID)) this.setMouthInserted(false);
	if(this.isBodySlotPenis(RIGHT_HAND_ID)) this.setRightHandInserted(false);
	if(this.isBodySlotPenis(LEFT_HAND_ID)) this.setLeftHandInserted(false);
	if(this.isBodySlotPenis(PUSSY_ID)) this.setPussyInserted(false);
	if(this.isBodySlotPenis(ANAL_ID)) this.setAnalInserted(false);
};

Game_Actor.prototype.removeAllBodyToy = function () {
	if(this.isBodySlotToy(CLIT_ID)) this.removeClitToy();
	if(this.isBodySlotToy(PUSSY_ID)) this.removePussyToy();
	if(this.isBodySlotToy(ANAL_ID)) this.removeAnalToy();
};

//////////////
// Pose Skills
//////////////

Game_Actor.prototype.enableRightHandjobPoseSkills = function (target) {
	this._enableRightHandjobPoseSkills = true;
	this._rightHandjobPoseTarget = target;
};
Game_Actor.prototype.enableLeftHandjobPoseSkills = function (target) {
	this._enableLeftHandjobPoseSkills = true;
	this._leftHandjobPoseTarget = target;
};
Game_Actor.prototype.enableBlowjobPoseSkills = function (target) {
	this._enableBlowjobPoseSkills = true;
	this._blowjobPoseTarget = target;
};
Game_Actor.prototype.enableTittyFuckPoseSkills = function (target) {
	this._enableTittyFuckPoseSkills = true;
	this._tittyFuckPoseTarget = target;
};
Game_Actor.prototype.enablePussySexPoseSkills = function (target) {
	this._enablePussySexPoseSkills = true;
	this._pussySexPoseTarget = target;
};
Game_Actor.prototype.enableAnalSexPoseSkills = function (target) {
	this._enableAnalSexPoseSkills = true;
	this._analSexPoseTarget = target;
};
Game_Actor.prototype.enableRimjobPoseSkills = function (target) {
	this._enableRimjobPoseSkills = true;
	this._rimjobPoseTarget = target;
};
Game_Actor.prototype.enableFootjobPoseSkills = function (target) {
	this._enableFootjobPoseSkills = true;
	this._footjobPoseTarget = target;
};


Game_Actor.prototype.disableRightHandjobPoseSkills = function () {
	this._enableRightHandjobPoseSkills = false;
	this._rightHandjobPoseTarget = false;
};
Game_Actor.prototype.disableLeftHandjobPoseSkills = function () {
	this._enableLeftHandjobPoseSkills = false;
	this._leftHandjobPoseTarget = false;
};
Game_Actor.prototype.disableBlowjobPoseSkills = function () {
	this._enableBlowjobPoseSkills = false;
	this._blowjobPoseTarget = false;
};
Game_Actor.prototype.disableTittyFuckPoseSkills = function () {
	this._enableTittyFuckPoseSkills = false;
	this._tittyFuckPoseTarget = false;
};
Game_Actor.prototype.disablePussySexPoseSkills = function () {
	this._enablePussySexPoseSkills = false;
	this._pussySexPoseTarget = false;
};
Game_Actor.prototype.disableAnalSexPoseSkills = function () {
	this._enableAnalSexPoseSkills = false;
	this._analSexPoseTarget = false;
};
Game_Actor.prototype.disableRimjobPoseSkills = function () {
	this._enableRimjobPoseSkills = false;
	this._rimjobPoseTarget = false;
};
Game_Actor.prototype.disableFootjobPoseSkills = function () {
	this._enableFootjobPoseSkills = false;
	this._footjobPoseTarget = false;
};

Game_Actor.prototype.disableAllPoseSkills = function () {
	this.disableRightHandjobPoseSkills();
	this.disableLeftHandjobPoseSkills();
	this.disableBlowjobPoseSkills();
	this.disableTittyFuckPoseSkills();
	this.disablePussySexPoseSkills();
	this.disableAnalSexPoseSkills();
	this.disableRimjobPoseSkills();
	this.disableFootjobPoseSkills();
};

Game_Actor.prototype.rightHandjobPoseTarget = function () {
	return this._rightHandjobPoseTarget;
};
Game_Actor.prototype.leftHandjobPoseTarget = function () {
	return this._leftHandjobPoseTarget;
};
Game_Actor.prototype.blowjobPoseTarget = function () {
	return this._blowjobPoseTarget;
};
Game_Actor.prototype.tittyFuckPoseTarget = function () {
	return this._tittyFuckPoseTarget;
};
Game_Actor.prototype.pussySexPoseTarget = function () {
	return this._pussySexPoseTarget;
};
Game_Actor.prototype.analSexPoseTarget = function () {
	return this._analSexPoseTarget;
};
Game_Actor.prototype.rimjobPoseTarget = function () {
	return this._rimjobPoseTarget;
};
Game_Actor.prototype.footjobPoseTarget = function () {
	return this._footjobPoseTarget;
};


Game_Actor.prototype.rightHandjobPoseSkillsIsEnabled = function () {
	return this._enableRightHandjobPoseSkills;
};
Game_Actor.prototype.leftHandjobPoseSkillsIsEnabled = function () {
	return this._enableLeftHandjobPoseSkills;
};
Game_Actor.prototype.blowjobPoseSkillsIsEnabled = function () {
	return this._enableBlowjobPoseSkills;
};
Game_Actor.prototype.tittyFuckPoseSkillsIsEnabled = function () {
	return this._enableTittyFuckPoseSkills;
};
Game_Actor.prototype.pussySexPoseSkillsIsEnabled = function () {
	return this._enablePussySexPoseSkills;
};
Game_Actor.prototype.analSexPoseSkillsIsEnabled = function () {
	return this._enableAnalSexPoseSkills;
};
Game_Actor.prototype.rimjobPoseSkillsIsEnabled = function () {
	return this._enableRimjobPoseSkills;
};
Game_Actor.prototype.footjobPoseSkillsIsEnabled = function () {
	return this._enableFootjobPoseSkills;
};

/////////
// Cock Targets
////////////

Game_Actor.prototype.resetCockTargets = function() {
	this._cockMouthTarget = false;
	this._cockBoobsTarget = false;
	this._cockPussyTarget = false;
	this._cockAnalTarget = false;
	this._cockRightArmTarget = false;
	this._cockLeftArmTarget = false;
	this._cockFeetTarget = false;
	this._cockNormalTarget = false;
	this._cockFrontATarget = false;
	this._cockFrontBTarget = false;
	this._cockFrontCTarget = false;
	this._cockFrontDTarget = false;
};

////////
// Has Free Hand
////////////

Game_Actor.prototype.hasFreeHand = function() {
	return this.isBodySlotFree(RIGHT_HAND_ID) || this.isBodySlotFree(LEFT_HAND_ID);
};

/////////////
// Calculate Factor
/////////////////

Game_Actor.prototype.getDefeatedLvlOneFactor = function() {
	let factor = 0;
	
	if(this.hasPassive(PASSIVE_BLOWBANG_COUNT_THREE_ID)) factor += 4;
	else if(this.hasPassive(PASSIVE_BLOWBANG_COUNT_TWO_ID)) factor += 3;
	else if(this.hasPassive(PASSIVE_BLOWBANG_COUNT_ONE_ID)) factor += 2;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID)) factor += 1;
	else if($gameParty._barReputation >= 2) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_THREE_ID)) factor += 3;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_TWO_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_ONE_ID)) factor += 1;
	else if(this.hasEdict(EDICT_THE_THUG_PROBLEM)) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_TWO_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_ONE_ID)) factor += 1;
	else if(this.hasEdict(EDICT_THE_GOBLIN_PROBLEM)) factor += 1;
	
	if(factor >= 8 && Prison.guardAggression >= 10 && $gameParty._barReputation >= 2) {
		if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID)) factor += 2;
		else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID)) factor += 1;
		else if(Prison.guardAggression >= 20) factor += 1;
	}
	
	if(this.hasEdict(EDICT_THUGS_STRESS_RELIEF)) factor += 1;
	else if(this.hasEdict(EDICT_WEAKEN_THE_THUGS)) factor -= 1;
	if(this.hasEdict(EDICT_BAIT_GOBLINS)) factor += 1;
	
	return factor;
};

Game_Actor.prototype.getDefeatedLvlTwoFactor = function() {
	let factor = 0;
	
	if(this.hasPassive(PASSIVE_URINAL_COUNT_THREE_ID)) factor += 4;
	else if(this.hasPassive(PASSIVE_URINAL_COUNT_TWO_ID)) factor += 3;
	else if(this.hasPassive(PASSIVE_URINAL_COUNT_ONE_ID)) factor += 2;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID)) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_THREE_ID)) factor += 1;
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_THREE_ID)) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_TWO_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_ONE_ID)) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_TWO_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_ONE_ID)) factor += 1;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_TWO_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_ONE_ID)) factor += 1;
	
	if(factor >= 7 && Prison.guardAggression >= 20) {
		if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID)) factor += 1;
		else if(Prison.guardAggression >= 30) factor += 1;
	}
	
	if(this.hasEdict(EDICT_THUGS_STRESS_RELIEF)) factor += 1;
	if(this.hasEdict(EDICT_BAIT_GOBLINS)) factor += 1;
	
	return factor;
};

Game_Actor.prototype.getDefeatedGuardFactor = function() {
	let factor = 0;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID)) factor += 4;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID)) factor += 3;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID)) factor += 2;
	
	if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID)) factor += 1;
	
	if(this.hasPassive(PASSIVE_DEFEATED_COUNT_THREE_ID)) factor += 2;
	else if(this.hasPassive(PASSIVE_DEFEATED_COUNT_TWO_ID)) factor += 1;
	
	if(Prison.guardAggression >= 20) factor += 4;
	else if(Prison.guardAggression >= 12) factor += 3;
	else if(Prison.guardAggression >= 7) factor += 2;
	else if(Prison.guardAggression >= 3) factor += 1;
	
	return factor;
};

///////////////
//////////////////
// Karryn Sex Skills
//////////////////
///////////////

////////
// Remove Toy Skill
//////////////

Game_Actor.prototype.skillCost_removeToy = function() {
	let cost = 0.125;
	return Math.ceil(cost * this.realMaxStamina);
};

Game_Actor.prototype.showEval_removeToy = function() {
	return this.isWearingAnyToy() && !this.isInDownOrgasmPose() && this.hasFreeHand();
};

Game_Actor.prototype.afterEval_removeToy = function() {
	let wearingToysArray = [];
	if(this.isWearingClitToy()) wearingToysArray.push(CLIT_ID);
	if(this.isWearingPussyToy()) wearingToysArray.push(PUSSY_ID);
	if(this.isWearingAnalToy()) wearingToysArray.push(ANAL_ID);
	
	let bodySlotToFreeUp = wearingToysArray[Math.randomInt(wearingToysArray.length)];
	let skillId = 0;
	
	if(bodySlotToFreeUp === CLIT_ID) skillId = SKILL_KARRYN_REMOVE_TOY_PINK_ROTOR_ID;
	else if(bodySlotToFreeUp === PUSSY_ID) skillId = SKILL_KARRYN_REMOVE_TOY_PENIS_DILDO_ID;
	else if(bodySlotToFreeUp === ANAL_ID) skillId = SKILL_KARRYN_REMOVE_TOY_ANAL_BEADS_ID;
	
	if(skillId) {
		this.useAISkill(skillId, -1);
		this.gainStaminaExp(25, $gameTroop.getAverageEnemyExperienceLvl());
	}
};

Game_Actor.prototype.afterEval_removeClitToy = function() {
	this.removeClitToy();
	this.addToActorManuallyRemovedClitToyRecord();
};

Game_Actor.prototype.afterEval_removePussyToy = function() {
	this.removePussyToy();
	this.addToActorManuallyRemovedPussyToyRecord();
};

Game_Actor.prototype.afterEval_removeAnalToy = function() {
	this.removeAnalToy();
	this.addToActorManuallyRemovedAnalToyRecord();
};

///////////////
// Use Orgasm Skill
///////////////
Game_Actor.prototype.useOrgasmSkill = function() {
	let target = this; 	
	let skillId = SKILL_FEMALE_ORGASM_ONE_ID;
	let numOfOrgasm = Math.floor(target.pleasure / target.orgasmPoint());
	
	if(numOfOrgasm >= 2) {
		skillId = SKILL_FEMALE_ORGASM_TWO_ID;
	}
	
	//todo: maybe different conditions triggers different orgasm skill for Karryn?
	//for example, a different orgasm while masturbating or stripping or whatever?
	
	this.useAISkill(skillId, target);
	
};

//////////////
// Sex Skill Costs
/////////////////

Game_Actor.prototype.skillSex_staminaCost = function(baseCost, dexMultipler) {
	var cost = baseCost + this.dex * dexMultipler;
	cost *= this.ssc;
	return Math.round(cost);
};


Game_Actor.prototype.skillCost_karrynPetting = function() {
	return this.skillSex_staminaCost(20, 0.4);
};
Game_Actor.prototype.skillCost_karrynKiss = function() {
	return this.skillSex_staminaCost(20, 0.5) * this.passiveKissSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynCockPetting = function() {
	return this.skillSex_staminaCost(20, 0.6) * this.passiveHandjobSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynCockStare = function() {
	return this.skillSex_staminaCost(20, 0.2);
};

//Dex multi 1
Game_Actor.prototype.skillCost_karrynHandjob = function() {
	return this.skillSex_staminaCost(20, 1) * this.passiveHandjobSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynBlowjob = function() {
	return this.skillSex_staminaCost(25, 1) * this.passiveBlowjobSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynTittyFuck = function() {
	return this.skillSex_staminaCost(30, 1.1) * this.passiveTittyFuckSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynRimjob = function() {
	return this.skillSex_staminaCost(25, 1) * this.passiveRimjobSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynFootjob = function() {
	return this.skillSex_staminaCost(30, 1.1) * this.passiveFootjobSkillCostRate();
};


Game_Actor.prototype.skillCost_karrynPussySex = function() {
	return this.skillSex_staminaCost(40, 1.25) * this.passivePussySexSkillCostRate();
};
Game_Actor.prototype.skillCost_karrynAnalSex = function() {
	return this.skillSex_staminaCost(40, 1.25) * this.passiveAnalSexSkillCostRate();
};

//Remove States Before Sex
Game_Actor.prototype.removeStatesBeforeSex = function() {
	this.removeStatesBeforeSexExceptFallen();
	this.removeState(STATE_FALLEN_ID);
};

Game_Actor.prototype.removeStatesBeforeSexExceptFallen = function() {
	this.removeState(STATE_OFFBALANCE_ID);
	//this.removeState(STATE_WEAKEN_ID);
	//this.removeState(STATE_VULNERABLE_ID);
	this.removeState(STATE_CAUTIOUS_STANCE_ID);
	this.removeState(STATE_GUARD_ID);
	this.removeState(STATE_COUNTER_STANCE_ID);
	this.removeState(STATE_EYE_OF_THE_MIND_ID);
	this.removeState(STATE_KI_ID);
	this.removeState(STATE_FOCUS_ID);
	this.removeState(STATE_COCK_KICK_CRIT_BONUS_ID);
	this.removeState(STATE_BONUS_CRIT_CHANCE_ID);
	this.removeState(STATE_BONUS_PIERCE_DMG_ID);
	this.removeState(STATE_BONUS_SLASH_DMG_ID);
	this.removeState(STATE_BONUS_CRIT_CHANCE_ID);
	
};


/////////////
//////////////
// Sex Skill Selector
/////////////////////
//////////////////

/////////
// Kiss
/////////

Game_Actor.prototype.showEval_karrynKissSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_KISS_PEOPLE_TWO_ID);
	if(!hasPassive) return false;
	
	let bodySlotAvailable = this.canGetKissed(KISS_LVL_ONE);
	let isThereValidTarget = this.isThereValidTargetForKiss();
	let meetDesireReq = this.mouthDesire >= this.kissingMouthDesireRequirement(KISS_LVL_ONE, true);
	
	return isThereValidTarget && bodySlotAvailable && meetDesireReq;
};

Game_Actor.prototype.showEval_cant_karrynKissSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_KISS_PEOPLE_TWO_ID);
	if(!hasPassive) return false;
	
	let bodySlotAvailable = this.canGetKissed(KISS_LVL_ONE);
	let isThereValidTarget = this.isThereValidTargetForKiss();
	let meetDesireReq = this.mouthDesire >= this.kissingMouthDesireRequirement(KISS_LVL_ONE, true);

	return (!bodySlotAvailable || !isThereValidTarget || !meetDesireReq);
};

Game_Actor.prototype.skillDescription_cant_karrynKissSkill = function() {
	let text = '';

	let bodySlotAvailable = this.canGetKissed(KISS_LVL_ONE);
	let isThereValidTarget = this.isThereValidTargetForKiss();
	let meetDesireReq = this.mouthDesire >= this.kissingMouthDesireRequirement(KISS_LVL_ONE, true);
	
	if(!meetDesireReq)
		text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
	else if(!bodySlotAvailable) 
		text += TextManager.SkillDescriptionCantDoThis + '\n';

	if(!isThereValidTarget) 
		text += TextManager.SkillDescriptionNoValidTargets + '\n';
	
	return text;
};

Game_Actor.prototype.selectorKarryn_kiss = function(target) { 
	let skillId = SKILL_KARRYN_KISS_ONE_ID;
	if(this.mouthDesire >= this.kissingMouthDesireRequirement(KISS_LVL_TWO)) 
		skillId = SKILL_KARRYN_KISS_TWO_ID;
	this.setKissedChange(true, target);
	this.useAISkill(skillId, target);
	this.addToKissUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

////////
// Cock Stare
//////////

Game_Actor.prototype.showEval_karrynCockStareSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_KARRYN_STARE_COCK_ONE_ID);
	if(!hasPassive) return false;
	
	let isThereValidTarget = this.isThereValidTargetForCockStare();
	let isInCombatPose = this.isInCombatPose();
	
	return isThereValidTarget && isInCombatPose;
};
Game_Actor.prototype.showEval_cant_karrynCockStareSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_KARRYN_STARE_COCK_ONE_ID);
	if(!hasPassive) return false;
	
	let isThereValidTarget = this.isThereValidTargetForCockStare();
	let isInCombatPose = this.isInCombatPose();

	return (!isThereValidTarget || !isInCombatPose);
};

Game_Actor.prototype.skillDescription_cant_karrynCockStareSkill = function() {
	let text = '';

	let isThereValidTarget = this.isThereValidTargetForCockStare();
	let isInCombatPose = this.isInCombatPose();
	
	if(!isInCombatPose) 
		text += TextManager.SkillDescriptionCantDoThis + '\n';

	if(!isThereValidTarget) 
		text += TextManager.SkillDescriptionNoValidTargets + '\n';
	
	return text;
};

Game_Actor.prototype.selectorKarryn_cockStare = function(target) { 
	let skillId = SKILL_KARRYN_COCK_STARE_ONE_ID;
	this.useAISkill(skillId, target);
	this.addToCockStareUsageCountRecord();
	return skillId;
};

////////
// Cock Petting
//////////

Game_Actor.prototype.showEval_karrynCockPettingSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_HJ_COUNT_THREE_ID);
	if(!hasPassive) return false;
	
	let bodySlotAvailable = (this.canPetWithRightHand() || this.canPetWithLeftHand());
	let isThereValidTarget = this.isThereValidTargetForCockPetting();
	let meetDesireReq = this.cockDesire >= this.cockPettingCockDesireRequirement(true);
	let isInCombatPose = this.isInCombatPose();
	
	return isThereValidTarget && bodySlotAvailable && meetDesireReq && isInCombatPose;
};

Game_Actor.prototype.showEval_cant_karrynCockPettingSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_HJ_COUNT_THREE_ID);
	if(!hasPassive) return false;
	
	let bodySlotAvailable = (this.canPetWithRightHand() || this.canPetWithLeftHand());
	let isThereValidTarget = this.isThereValidTargetForCockPetting();
	let meetDesireReq = this.cockDesire >= this.cockPettingCockDesireRequirement(true);
	let isInCombatPose = this.isInCombatPose();

	return (!bodySlotAvailable || !isThereValidTarget || !meetDesireReq || !isInCombatPose);
};

Game_Actor.prototype.skillDescription_cant_karrynCockPettingSkill = function() {
	let text = '';

	let bodySlotAvailable = (this.canPetWithRightHand() || this.canPetWithLeftHand());
	let isThereValidTarget = this.isThereValidTargetForCockPetting();
	let meetDesireReq = this.cockDesire >= this.cockPettingCockDesireRequirement(true);
	let isInCombatPose = this.isInCombatPose();
	
	if(!isInCombatPose) 
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	else if(!meetDesireReq)
		text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
	else if(!bodySlotAvailable) 
		text += TextManager.SkillDescriptionCantDoThis + '\n';

	if(!isThereValidTarget) 
		text += TextManager.SkillDescriptionNoValidTargets + '\n';
	
	return text;
};

Game_Actor.prototype.selectorKarryn_cockPetting = function(target) { 
	let skillId = SKILL_KARRYN_COCK_PETTING_ONE_ID;
	this.useAISkill(skillId, target);
	this.addToCockPetUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////
// Handjob
//////////

Game_Actor.prototype.showEval_karrynHandjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_HJ_COUNT_TWO_ID);
	let isThereValidTarget = this.isThereValidTargetForHandjob();
	let meetDesireReq = this.cockDesire >= this.handjobCockDesireRequirement(true);
	
	if(!hasPassive || !meetDesireReq) return false;
	
	return isThereValidTarget;
};

Game_Actor.prototype.showEval_cant_karrynHandjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_HJ_COUNT_TWO_ID);
	if(!hasPassive) return false;
	
	return !this.showEval_karrynHandjobSkill();
};

Game_Actor.prototype.skillDescription_cant_karrynHandjobSkill = function() {
	let text = '';

	let bodySlotAvailable = this.isBodySlotAvailableForPenis(RIGHT_HAND_ID) || this.isBodySlotAvailableForPenis(LEFT_HAND_ID);
	let isThereValidTarget = this.isThereValidTargetForHandjob();
	let meetDesireReq = this.cockDesire >= this.handjobCockDesireRequirement(true);
	
	if(!bodySlotAvailable) {
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	}
	else {
		if(!meetDesireReq)
			text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
		if(!isThereValidTarget)
			text += TextManager.SkillDescriptionNoValidTargets + '\n';
	}
	
	return text;
};

Game_Actor.prototype.selectorKarryn_handjob = function(target) {
	let skillId = false;
	let targetIsRightHand = false;
	let targetIsLeftHand = false;
	let inSexPose = this.isInSexPose();
	
	//First, if the target is right or left hand pose target, then use the skill.
	if(this.rightHandjobPoseSkillsIsEnabled() && target == this.rightHandjobPoseTarget())
		targetIsRightHand = true;
	if(this.leftHandjobPoseSkillsIsEnabled() && target == this.leftHandjobPoseTarget())
		targetIsLeftHand = true;
		
	//Use the skill on pose target
	if(targetIsRightHand || targetIsLeftHand) {
		//Todo: in the future when deciding which skill to activate, base it on pose and exp and lewd stats etc etc
		skillId = SKILL_KARRYN_HANDJOB_POSESKILL_ID;
		this.useAISkill(skillId, target);
	}
	else if(inSexPose) {
		if(this.isBodySlotAvailableForPenis(RIGHT_HAND_ID))
			skillId = SKILL_KARRYN_INVITE_RIGHTHAND_ID;
		else if(this.isBodySlotAvailableForPenis(LEFT_HAND_ID))
			skillId = SKILL_KARRYN_INVITE_LEFTHAND_ID;
		else 
			console.log('Error with selectorKarryn_handjob: no body slot available');
		
		if(skillId)
			this.useAISkill(skillId, target);
		else 
			console.log('Error with selectorKarryn_handjob: no skillId');
	}
	//So Karryn is currently not in a sex pose, then start a sex pose with this target
	else if(!target.isInAPose()){
		//Todo: in the future decide which pose to start based on karryn's stats, exp etc
		skillId = SKILL_KARRYN_START_STANDING_HJ_ID;
		this.useAISkill(skillId, target);
	}
	else return false;
	
	this.addToHandjobUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////
// Rimjob
//////////

Game_Actor.prototype.showEval_karrynRimjobSkill = function() {
	if(ConfigManager.disableRimjobs) return false;
	let hasPassive = this.hasPassive(PASSIVE_RIMJOB_PEOPLE_ONE_ID);
	let isThereValidTarget = this.isThereValidTargetForRimjob();
	let meetDesireReq = this.mouthDesire >= this.rimjobMouthDesireRequirement(true);
	
	if(!hasPassive || !meetDesireReq) return false;
	
	return isThereValidTarget;
};

Game_Actor.prototype.showEval_cant_karrynRimjobSkill = function() {
	if(ConfigManager.disableRimjobs) return false;
	let hasPassive = this.hasPassive(PASSIVE_RIMJOB_PEOPLE_ONE_ID);
	if(!hasPassive) return false;
	
	return !this.showEval_karrynRimjobSkill();
};

Game_Actor.prototype.skillDescription_cant_karrynRimjobSkill = function() {
	let text = '';

	let bodySlotAvailable = this.isBodySlotFree(MOUTH_ID);
	let isThereValidTarget = this.isThereValidTargetForRimjob();
	let meetDesireReq = this.mouthDesire >= this.rimjobMouthDesireRequirement(true);
	let actorIsInSexPose = this.isInSexPose();
	
	if(actorIsInSexPose) {
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	}
	else {
		if(!meetDesireReq)
			text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
		if(!isThereValidTarget)
			text += TextManager.SkillDescriptionNoValidTargets + '\n';
	}
	
	return text;
};

Game_Actor.prototype.selectorKarryn_rimjob = function(target) {
	let skillId = false;
	let isPoseTarget = false;
	
	if(this.rimjobPoseSkillsIsEnabled() && target == this.rimjobPoseTarget())
		isPoseTarget = true;

	if(isPoseTarget) {
		skillId = SKILL_KARRYN_RIMJOB_POSESKILL_ID;
		this.useAISkill(skillId, target);
	}
	else if(!target.isInAPose()){
		skillId = SKILL_KARRYN_START_RIMJOB_ID;
		this.useAISkill(skillId, target);
	}
	else return false;
	
	this.addToRimjobUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////
// Footjob
//////////

Game_Actor.prototype.showEval_karrynFootjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_FOOTJOB_PEOPLE_ONE_ID);
	let isThereValidTarget = this.isThereValidTargetForFootjob();
	let meetDesireReq = this.cockDesire >= this.footjobCockDesireRequirement(true);
	
	if(!hasPassive || !meetDesireReq) return false;
	
	return isThereValidTarget;
};

Game_Actor.prototype.showEval_cant_karrynFootjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_FOOTJOB_PEOPLE_ONE_ID);
	if(!hasPassive) return false;
	
	return !this.showEval_karrynFootjobSkill();
};

Game_Actor.prototype.skillDescription_cant_karrynFootjobSkill = function() {
	let text = '';

	let bodySlotAvailable = this.isBodySlotFree(FEET_ID);
	let isThereValidTarget = this.isThereValidTargetForFootjob();
	let meetDesireReq = this.cockDesire >= this.footjobCockDesireRequirement(true);
	let actorIsInSexPose = this.isInSexPose();
	
	if(actorIsInSexPose) {
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	}
	else {
		if(!meetDesireReq)
			text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
		if(!isThereValidTarget)
			text += TextManager.SkillDescriptionNoValidTargets + '\n';
	}
	
	return text;
};

Game_Actor.prototype.selectorKarryn_footjob = function(target) {
	let skillId = false;
	let isPoseTarget = false;
	
	if(this.footjobPoseSkillsIsEnabled() && target == this.footjobPoseTarget())
		isPoseTarget = true;

	if(isPoseTarget) {
		skillId = SKILL_KARRYN_FOOTJOB_POSESKILL_ID;
		this.useAISkill(skillId, target);
	}
	else if(!target.isInAPose()){
		skillId = SKILL_KARRYN_START_FOOTJOB_ID;
		this.useAISkill(skillId, target);
	}
	else return false;
	
	this.addToFootjobUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////////
// Blowjob
////////////

Game_Actor.prototype.showEval_karrynBlowjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_BJ_COUNT_TWO_ID);
	let isThereValidTarget = this.isThereValidTargetForBlowjob();
	let meetDesireReq = this.mouthDesire >= this.blowjobMouthDesireRequirement(true) && this.cockDesire >= this.blowjobCockDesireRequirement(true);
	
	if(!hasPassive || !meetDesireReq) return false;
	
	return isThereValidTarget;
};

Game_Actor.prototype.showEval_cant_karrynBlowjobSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_BJ_COUNT_TWO_ID);
	if(!hasPassive) return false;
	
	return !this.showEval_karrynBlowjobSkill();
};

Game_Actor.prototype.skillDescription_cant_karrynBlowjobSkill = function() {
	let text = '';

	let bodySlotAvailable = this.isBodySlotAvailableForPenis(MOUTH_ID);
	let isThereValidTarget = this.isThereValidTargetForBlowjob();
	let meetDesireReq = this.mouthDesire >= this.blowjobMouthDesireRequirement(true) && this.cockDesire >= this.blowjobCockDesireRequirement(true);
	
	if(!bodySlotAvailable) {
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	}
	else {
		if(!meetDesireReq)
			text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
		if(!isThereValidTarget)
			text += TextManager.SkillDescriptionNoValidTargets + '\n';
	}
	
	return text;
};

Game_Actor.prototype.selectorKarryn_blowjob = function(target) {
	let skillId = false;
	let isPoseTarget = false;
	let inSexPose = this.isInSexPose();
	
	if(this.blowjobPoseSkillsIsEnabled() && target == this.blowjobPoseTarget())
		isPoseTarget = true;

	if(isPoseTarget) {
		skillId = SKILL_KARRYN_BLOWJOB_POSESKILL_ID;
		this.useAISkill(skillId, target);
	}
	else if(inSexPose) {
		skillId = SKILL_KARRYN_INVITE_MOUTH_ID;
		this.useAISkill(skillId, target);
	}
	else if(!target.isInAPose()){
		skillId = SKILL_KARRYN_START_KNEELING_BJ_ID;
		this.useAISkill(skillId, target);
	}
	else return false;
	
	this.addToBlowjobUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////////
// Titty fuck
////////////

Game_Actor.prototype.showEval_karrynTittyFuckSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_TITTYFUCK_COUNT_TWO_ID);
	let isThereValidTarget = this.isThereValidTargetForTittyFuck();
	let meetDesireReq = this.boobsDesire >= this.tittyFuckBoobsDesireRequirement(true) && this.cockDesire >= this.tittyFuckCockDesireRequirement(true);
	
	if(!hasPassive || !meetDesireReq) return false;
	
	return isThereValidTarget;
};

Game_Actor.prototype.showEval_cant_karrynTittyFuckSkill = function() {
	let hasPassive = this.hasPassive(PASSIVE_TITTYFUCK_COUNT_TWO_ID);
	if(!hasPassive) return false;
	
	return !this.showEval_karrynTittyFuckSkill();
};

Game_Actor.prototype.skillDescription_cant_karrynTittyFuckSkill = function() {
	let text = '';

	let bodySlotAvailable = this.isBodySlotAvailableForPenis(BOOBS_ID);
	let isThereValidTarget = this.isThereValidTargetForTittyFuck();
	let meetDesireReq = this.boobsDesire >= this.tittyFuckBoobsDesireRequirement(true) && this.cockDesire >= this.tittyFuckCockDesireRequirement(true);
	
	if(!bodySlotAvailable) {
		text += TextManager.SkillDescriptionCantDoThis + '\n';
	}
	else {
		if(!meetDesireReq)
			text += TextManager.SkillDescriptionNotEnoughDesire + '\n';
		if(!isThereValidTarget)
			text += TextManager.SkillDescriptionNoValidTargets + '\n';
	}
	
	return text;
};

Game_Actor.prototype.selectorKarryn_tittyfuck = function(target) {
	let skillId = false;
	let isPoseTarget = false;
	let inSexPose = this.isInSexPose();
	
	if(this.tittyFuckPoseSkillsIsEnabled() && target == this.tittyFuckPoseTarget())
		isPoseTarget = true;

	if(isPoseTarget) {
		skillId = SKILL_KARRYN_TITTYFUCK_POSESKILL_ID;
		this.useAISkill(skillId, target);
	}
	else if(inSexPose) {
		skillId = SKILL_KARRYN_INVITE_TITTYFUCK_ID;
		this.useAISkill(skillId, target);
	}
	else if(!target.isInAPose()){
		skillId = SKILL_KARRYN_START_LAYING_TITTYFUCK_ID;
		this.useAISkill(skillId, target);
	}
	else return false;
	
	this.addToTittyFuckUsageCountRecord();
	this.addEnemyEdgingControlStateToTarget(target);
	return skillId;
};

///////////
// Pussy Sex
////////////

Game_Actor.prototype.showEval_pussySexSkills = function() {
	let poseSkillEnabled = this.pussySexPoseSkillsIsEnabled();
	var bodySlotAvailable = this.canGetPussyInserted();
	var erectOpponentAvailable = this.isThereAnErectOpponent();
	var notInSexPose = !this.isInSexPose();
	
	return erectOpponentAvailable && (poseSkillEnabled || (notInSexPose && bodySlotAvailable));
};

///////////
// Anal Sex
////////////

Game_Actor.prototype.showEval_analSexSkills = function() {
	let poseSkillEnabled = this.analSexPoseSkillsIsEnabled();
	var bodySlotAvailable = this.canGetAnalInserted();
	var erectOpponentAvailable = this.isThereAnErectOpponent();
	var notInSexPose = !this.isInSexPose();
	
	return erectOpponentAvailable && (poseSkillEnabled || (notInSexPose && bodySlotAvailable));
};


//-------------------------------------
// Tachie related below

//////////
///////////
// Sex Petting
// Petted and PettedPettingOnly, two types
// petting = true for yes, false for removing
/////////////
////////////

Game_Actor.prototype.setKissedChange = function (kissed, enemy) {
	let poseName = this.poseName;
	
	if(poseName == POSE_KICKCOUNTER) {
		if(this._cockPussyTarget != enemy || !kissed) {
			this.emoteKickCounterPose(false, true);
		}
		else {
			this.emoteKickCounterPose(true, false);
		}
		
	} //Kick counter end
	else if(poseName == POSE_WAITRESS_SEX) {
		if(kissed && enemy) {
			this.resetTachieStraw();
		}
	}
	
	//this.emoteMasterManager();
};

Game_Actor.prototype.setOrgasmTachieChange = function () {
	let poseName = this.poseName;
	
	if(poseName == POSE_KICKCOUNTER) {
		this.setKissedChange(false, false);
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		this.resetTachieStraw();
	}
};

////////////
/////////////
// Sex Insert
// insert = true for yes, false for removing
///////////////
/////////////

////////////////
// Mouth Insert
////////////////
Game_Actor.prototype.setMouthInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;	
	let bodyId = MOUTH_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockMouthTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockMouthTarget = false;
	}
	
	let poseName = this.poseName;
	if(poseName == POSE_THUGGANGBANG) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieRightArm('chin_' + enemyCock + '_cen');
			else
				this.setTachieRightArm('chin_' + enemyCock);
			this.resetTachieMouth();
			this.setTachieSemenFaceExtension('active_');
			this.setTachieSemenRightArmExtension('active_');
			this.emoteThugGangbangPose();
		} else {
			this.setTachieRightArm('empty');
			this.resetTachieSemenFaceExtension();
			this.resetTachieSemenRightArmExtension();
			this.emoteThugGangbangPose();
		}
	}
	
	else if(poseName == POSE_GUARDGANGBANG) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
			this.emoteGuardGangbangPose();
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteGuardGangbangPose();
		}
	}
	
	else if(poseName == POSE_DEFEATED_GUARD) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
			this.setBodyPartUnavailable(NIPPLES_ID);
			this.setBodyPartUnavailable(BOOBS_ID);
			this.emoteDefeatedGuardPose();
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.setBodyPartFree(NIPPLES_ID);
			this.setBodyPartFree(BOOBS_ID);
			this.emoteDefeatedGuardPose();
		}
		
	}
	
	
	else if(poseName == POSE_GOBLINCUNNILINGUS) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setTachieCockMouthInFrontOfFace(false);
			this.setMaxTachieSemenCockMouthId(1);
			this.emoteGoblinCunnilingusPose();
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteGoblinCunnilingusPose();
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteDefeatedLevelOnePose();
		}
	}
	else if(poseName == POSE_BJ_KNEELING) {
		if(insert) {
			let bjName = '';
			if(enemy.isNerdType) {
				bjName = 'nerd';
			}
			else if(enemy.isOrcType) {
				bjName = 'orc';
				enemyCock = 'orc';
			}
			else if(enemy.isGoblinType) {
				bjName = 'goblin';
			}
			else {
				bjName = 'human';
			}
			
			this.setTachieFrontA(bjName);
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
		}
	}
	else if(poseName == POSE_PAIZURI_LAYING) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
			this.emoteLayingPaizuriPose();
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteLayingPaizuriPose();
		}
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			this.setMaxTachieSemenCockMouthId(1);
			this.resetTachieMouth();
			this.resetTachieStraw();
			this.emoteWaitressSexPose();
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteWaitressSexPose();
		}
	}
	
	else if(poseName == POSE_FOOTJOB) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			
			this.setTachieSemenFaceExtension('fera_');
			this.setMaxTachieSemenCockMouthId(1);
			this.emoteFootjobPose();
			
		} else {
			this.resetTachieCockMouth();
			this.resetTachieSemenFaceExtension();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteFootjobPose();
		}
	}
	else if(poseName == POSE_SLIME_PILEDRIVER_ANAL) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockMouth(enemyCock + '_cen');
			else
				this.setTachieCockMouth(enemyCock);
			if(enemyCock == 'slime') {
				this.setTachieSemenCockMouthExtension('slime_');
			}
			else {
				this.setTachieSemenCockMouthExtension('normal_');
			}
			this.setMaxTachieSemenCockMouthId(1);
		} else {
			this.resetTachieCockMouth();
			this.setMaxTachieSemenCockMouthId(0);
			this.emoteSlimePiledriver();
		}
	}
	else if(poseName == POSE_RECEPTIONIST) {
		
	}

	//this.emoteMasterManager();
};


/////////
// Boobs Insert
/////////////

Game_Actor.prototype.setBoobsInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = BOOBS_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockBoobsTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockBoobsTarget = false;
	}
	
	let poseName = this.poseName;
	
	if(poseName == POSE_THUGGANGBANG) {
		if(insert) {
			this.setTachieCockBoobsInFrontOfBoobs(true);
			this.setTachieBoobs('zuri_' + enemyCock);
			this.setTachieSemenBoobsExtension('zuri_');
			if(Karryn.isCensored())
				this.setTachieCockBoobs(enemyCock + '_cen');
			else
				this.setTachieCockBoobs(enemyCock);
		} else {
			this.setTachieBoobs('empty');
			this.resetTachieCockBoobs();
			this.resetTachieSemenBoobsExtension();
		}
	}
	
	else if(poseName == POSE_DEFEATED_GUARD) {
		if(insert) {
			this.setTachieSemenBoobsExtension('zuri_');
			if(Karryn.isCensored()) {
				this.setTachieCockBoobs(enemyCock + '_cen');
				//this.setTachieBoobs('zuri_' + enemyCock + '_cen');
			}
			else {
				this.setTachieCockBoobs(enemyCock);
				//this.setTachieBoobs('zuri_' + enemyCock);
			}
			this.setMaxTachieSemenCockBoobsId(1);
			this.setBodyPartUnavailable(MOUTH_ID);
		} else {
			this.resetTachieCockBoobs();
			this.setMaxTachieSemenCockBoobsId(0);
			this.setTachieBoobs('empty');
			this.setTachieSemenBoobsExtension('empty_');
			this.setBodyPartFree(MOUTH_ID);
			//this.emoteDefeatedGuardPose();
		}
		this.emoteDefeatedGuardPose();
	}
	
	else if(poseName == POSE_GOBLINCUNNILINGUS) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockBoobs(enemyCock + '_cen');
			else
				this.setTachieCockBoobs(enemyCock);
			this.setTachieSemenBoobsExtension('paizuri_');
			this.setTachieSemenLeftArmExtension('paizuri_');
			this.setTachieSemenRightArmExtension('paizuri_');
			this.setMaxTachieSemenCockBoobsId(1);
		} else {
			this.resetTachieCockBoobs();
			this.resetTachieSemenBoobsExtension();
			this.resetTachieSemenLeftArmExtension();
			this.resetTachieSemenRightArmExtension();
			this.setMaxTachieSemenCockBoobsId(0);
		}
	}
	else if(poseName == POSE_PAIZURI_LAYING) {
		if(insert) {
			this.resetTachieBackA();
			this.resetTachieFrontA();
			this.resetTachieFrontB();
			
			this.setMaxTachieSemenCockBoobsId(1);
			
			if(enemy.isOrcType) {
				this.setTachieFrontA('orc');
			}
			else if(enemy.isNerdType) {
				this.setTachieFrontA('fat');
				this.setTachieFrontB('pubes');
			}
			else if(enemy.isGoblinType) {
				this.setTachieBackA('goblin');
			}
			else {
				this.setTachieBackA('human');
				this.setTachieFrontB('pubes');
			}
			
			if(Karryn.isCensored())
				this.setTachieCockBoobs(enemyCock + '_cen');
			else
				this.setTachieCockBoobs(enemyCock);
		}
	}
	
	
	//this.emoteMasterManager();
};

///////////
// Pussy Insert
///////////////
Game_Actor.prototype.setPussyInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;	
	let bodyId = PUSSY_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockPussyTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockPussyTarget = false;
	}
	
	let poseName = this.poseName;

	if(poseName == POSE_RIMJOB) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockPussy(enemyCock + '_cen');
			else
				this.setTachieCockPussy(enemyCock);
			this.setMaxTachieSemenCockPussyId(1);
		} else {
			this.resetTachieCockPussy();
			this.setMaxTachieSemenCockPussyId(0);
		}
	}
	
	else if(poseName == POSE_DEFEATED_GUARD) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockPussy(enemyCock + '_cen');
			else
				this.setTachieCockPussy(enemyCock);
			this.setMaxTachieSemenCockPussyId(1);
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
		} else {
			this.resetTachieCockPussy();
			this.setMaxTachieSemenCockPussyId(0);
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
		}
	}
	
	
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockPussy(enemyCock + '_cen');
			else
				this.setTachieCockPussy(enemyCock);
			if(enemyCock == 'slime') {
				this.setTachieSemenCockPussyExtension('slime_');
			}
			else {
				this.resetTachieSemenCockPussyExtension();
			}
			this.setMaxTachieSemenCockPussyId(1);
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
		} else {
			this.resetTachieCockPussy();
			this.setMaxTachieSemenCockPussyId(0);
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
			this.resetTachieSemenCockPussyExtension();
		}
	}
	
	else if(poseName == POSE_PAIZURI_LAYING) {
		if(insert) {
			this.setMaxTachieSemenCockPussyId(1);
			if(Karryn.isCensored())
				this.setTachieBackD('chin_' + enemyCock + '_cen');
			else
				this.setTachieBackD('chin_' + enemyCock);
		} 
		else {
			this.setMaxTachieSemenCockPussyId(0);
			this.resetTachieBackD();
		}
	}
	else if(poseName == POSE_GOBLINCUNNILINGUS) {
		if(insert) {
			this.setMaxTachieSemenCockPussyId(1);
			if(Karryn.isCensored())
				this.setTachieFrontA('goblin_2_cen');
			else
				this.setTachieFrontA('goblin_2');
			
			this.setSpankablePose(false);
			this.setBodyPartUnavailable(BUTT_ID);
			this.setBodyPartUnavailable(ANAL_ID);
		} 
		else {
			this.setMaxTachieSemenCockPussyId(0);
			this.resetTachieFrontA();
			
			this.setSpankablePose(true);
			this.setBodyPartFree_PettingOnly(BUTT_ID);
			this.setBodyPartFree_PettingOnly(ANAL_ID);
		}
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockPussy(enemyCock + '_cen');
			else
				this.setTachieCockPussy(enemyCock);
			this.setMaxTachieSemenCockPussyId(1);
			this.setTachieBody(2);
		} else {
			this.resetTachieCockPussy();
			this.setMaxTachieSemenCockPussyId(0);
		}
	}
	else if(poseName == POSE_SLIME_PILEDRIVER_ANAL) {
		if(insert) {
			if(Karryn.isCensored() && enemyCock != 'slime')
				this.setTachieCockPussy(enemyCock + '_cen');
			else
				this.setTachieCockPussy(enemyCock);
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			if(enemyCock == 'slime') {
				this.setTachieSemenCrotchExtension('slime_');
			}
			else {
				this.setTachieSemenCrotchExtension('normal_');
			}
			
		} else {
			this.resetTachieCockPussy();
			this.resetTachieHolePussy();
			this.setTachieSemenCrotchExtension('empty_');
		}
	}

	else if(poseName == POSE_RECEPTIONIST) {
		if(insert) {
			this.setMaxTachieSemenCockPussyId(1);
		} else {
			this.setMaxTachieSemenCockPussyId(0);
		}
	}

	//this.emoteMasterManager();
};

////////////
// Anal Insert
////////////////
Game_Actor.prototype.setAnalInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = ANAL_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockAnalTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockAnalTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_KICKCOUNTER) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockAnal(enemyCock + '_cen');
			else
				this.setTachieCockAnal(enemyCock);
		} else {
			this.resetTachieCockAnal();
		}
	}
	else if(poseName == POSE_RIMJOB) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieCockAnal(enemyCock + '_cen');
			else
				this.setTachieCockAnal(enemyCock);
			this.setMaxTachieSemenCockAnalId(1);
		} else {
			this.resetTachieCockAnal();
			this.setMaxTachieSemenCockAnalId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored()) {
				this.setTachieCockAnal(enemyCock + '_cen');
				this.setTachieHoleAnus('open_cen');
			}
			else {
				this.setTachieCockAnal(enemyCock);
				this.setTachieHoleAnus('open');
			}
			this.setMaxTachieSemenCockAnalId(1);
			this.setTachieSemenAnalExtension('open_');
			if(enemyCock == 'slime') {
				this.setTachieSemenCockAnalExtension('slime_');
			}
			else {
				this.resetTachieSemenCockAnalExtension();
			}
		} else {
			this.resetTachieCockAnal();
			this.setMaxTachieSemenCockAnalId(0);
			this.resetTachieSemenCockAnalExtension();
			this.setTachieHoleAnus('open');
			this.setTachieSemenAnalExtension('open_');
		}
	}
	
	else if(poseName == POSE_GUARDGANGBANG) {
		if(insert) {
			if(Karryn.isCensored()) {
				this.setTachieCockAnal(enemyCock + '_cen');
				this.setTachieHoleAnus('open_cen');
			}
			else {
				this.setTachieCockAnal(enemyCock);
				this.setTachieHoleAnus('open');
			}
			this.setMaxTachieSemenCockAnalId(1);
			this.setTachieSemenAnalExtension('open_');
		} else {
			this.resetTachieCockAnal();
			this.setMaxTachieSemenCockAnalId(0);
			this.resetTachieSemenCockAnalExtension();
				this.setTachieHoleAnus('open');
			this.setTachieSemenAnalExtension('open_');
		}
	}
	
	else if(poseName == POSE_DEFEATED_GUARD) {
		if(insert) {
			this.resetTachieHoleAnus();
			if(Karryn.isCensored()) {
				this.setTachieCockAnal(enemyCock + '_cen');
			}
			else {
				this.setTachieCockAnal(enemyCock);
			}
			this.setTachieHoleAnus('open');
			this.setMaxTachieSemenCockAnalId(1);
			this.setTachieSemenAnalExtension('open_');
		} else {
			this.resetTachieCockAnal();
			this.setMaxTachieSemenCockAnalId(0);
			this.resetTachieSemenCockAnalExtension();
			this.setTachieHoleAnus('open');
			this.setTachieSemenAnalExtension('open_');
		}
	}
	
	
	else if(poseName == POSE_PAIZURI_LAYING) {
		if(insert) {
			this.setMaxTachieSemenCockAnalId(1);
			if(Karryn.isCensored())
				this.setTachieBackC('chin_' + enemyCock + '_cen');
			else
				this.setTachieBackC('chin_' + enemyCock);
		} 
		else {
			this.setMaxTachieSemenCockAnalId(0);
			this.resetTachieBackC();
		}
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		if(insert) {
			this.setMaxTachieSemenCockAnalId(1);
			if(Karryn.isCensored())
				this.setTachieCockAnal(enemyCock + '_cen');
			else
				this.setTachieCockAnal(enemyCock);
			this.setTachieBody(2);
		} 
		else {
			this.setMaxTachieSemenCockAnalId(0);
			this.resetTachieCockAnal();
		}
	}
	else if(poseName == POSE_RECEPTIONIST) {
		if(insert) {
			this.setMaxTachieSemenCockAnalId(1);
		} else {
			this.setMaxTachieSemenCockAnalId(0);
		}
	}
	
	

	//this.emoteMasterManager();
};


/////////////////
// Right Hand Insert
///////////////////
Game_Actor.prototype.setRightHandInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = RIGHT_HAND_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockRightArmTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockRightArmTarget = false;
	}
	let poseName = this.poseName;
	

	if(poseName == POSE_BJ_KNEELING) {
		if(insert) {
			if(enemy.isOrcType) {
				enemyCock = 'orc';
			}
			
			if(Karryn.isCensored())
				this.setTachieCockRightArm(enemyCock + '_cen');
			else
				this.setTachieCockRightArm(enemyCock);
			this.setTachieSemenRightArmExtension('hj_');
			this.setMaxTachieSemenCockRightArmId(1);
		} else {
			this.resetTachieCockRightArm();
			this.setTachieSemenRightArmExtension('empty_');
			this.setMaxTachieSemenCockRightArmId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			this.setTachieRightBoob('active');
			if(Karryn.isCensored())
				this.setTachieRightArm('chin_' + enemyCock + '_cen');
			else
				this.setTachieRightArm('chin_' + enemyCock);
			this.setMaxTachieSemenRightBoobId(2);
			this.setTachieSemenRightBoobExtension('active_');
			this.setTachieSemenRightArmExtension('active_');
			this.setMaxTachieSemenCockRightArmId(1);
		} else {
			this.resetTachieRightBoob();
			this.resetTachieRightArm();
			this.setMaxTachieSemenRightBoobId(1);
			this.resetTachieSemenRightBoobExtension();
			this.resetTachieSemenRightArmExtension();
			this.setMaxTachieSemenCockRightArmId(0);
		}
	}
	else if(poseName == POSE_HJ_STANDING) {
		if(insert) {
			this.resetTachieSemenCockRightArmExtension();
			let hjName = '';
			if(enemy.isNerdType) {
				hjName = 'nerd';
				this.setTachieFrontA('nerd');
				this.resetTachieSemenCockRightArmExtension();
			}
			else if(enemy.isOrcType) {
				hjName = 'orc';
				this.setTachieFrontA('orc');
				this.setTachieSemenCockRightArmExtension('orc_');
			}
			else if(enemy.isGoblinType) {
				hjName = 'goblin';
				this.setTachieFrontA('goblin');
				this.setTachieSemenCockRightArmExtension('goblin_');
			}
			else {
				hjName = 'human';
				this.setTachieFrontA('human');
				this.resetTachieSemenCockRightArmExtension();
			}
			if(Karryn.isCensored()) hjName += '_cen';
			this.setTachieCockRightArm(hjName);
		}
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		if(insert) {
			this.resetTachieRightArm();
			if(Karryn.isCensored())
				this.setTachieCockRightArm(enemyCock + '_cen');
			else
				this.setTachieCockRightArm(enemyCock);
			this.setTachieSemenRightArmExtension('hj_');
			this.setMaxTachieSemenCockRightArmId(1);
		}
		else {
			this.setTachieRightArm('empty');
			this.resetTachieCockRightArm();
			this.resetTachieSemenRightArmExtension();
			this.setMaxTachieSemenCockRightArmId(0);
		}
	}
	else if(poseName == POSE_PAIZURI_LAYING) {
		if(insert) {
			this.setTachieBody(2);
			this.setTachieSemenBoobsExtension('body2_');
			this.setMaxTachieSemenRightArmId(1);
			this.setMaxTachieSemenCockRightArmId(1);
			
			if(Karryn.isCensored())
				this.setTachieCockRightArm(enemyCock + '_cen');
			else
				this.setTachieCockRightArm(enemyCock);
		} 
		else {
			this.setTachieBody(1);
			this.setTachieSemenBoobsExtension('body1_');
			this.setMaxTachieSemenRightArmId(0);
			this.setMaxTachieSemenCockRightArmId(0);
			
			this.resetTachieCockRightArm();
		}
	}
	
	
	//this.emoteMasterManager();
};

/////////////////
// Left Hand Insert
///////////////////
Game_Actor.prototype.setLeftHandInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = LEFT_HAND_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockLeftArmTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockLeftArmTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_THUGGANGBANG) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieLeftArm('chin_' + enemyCock + '_cen');
			else
				this.setTachieLeftArm('chin_' + enemyCock);
			this.setTachieSemenLeftArmExtension('active_');
			this.setMaxTachieSemenCockLeftArmId(1);
		} else {
			this.setTachieLeftArm('empty');
			this.resetTachieSemenLeftArmExtension();
			this.setMaxTachieSemenCockLeftArmId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			this.setTachieLeftBoob('active');
			if(Karryn.isCensored())
				this.setTachieLeftArm('chin_' + enemyCock + '_cen');
			else
				this.setTachieLeftArm('chin_' + enemyCock);
			this.setMaxTachieSemenLeftBoobId(2);
			this.setTachieSemenLeftBoobExtension('active_');
			this.setTachieSemenLeftArmExtension('active_');
			this.setMaxTachieSemenCockLeftArmId(1);
		} else {
			this.resetTachieLeftBoob();
			this.resetTachieLeftArm();
			this.setMaxTachieSemenLeftBoobId(1);
			this.resetTachieSemenLeftBoobExtension();
			this.resetTachieSemenLeftArmExtension();
			this.setMaxTachieSemenCockLeftArmId(0);
		}
	}
	else if(poseName == POSE_HJ_STANDING) {
		if(insert) {
			this.setTachieLeftArm('hj');
			if(Karryn.isCensored())
				this.setTachieCockLeftArm(enemyCock + '_cen');
			else
				this.setTachieCockLeftArm(enemyCock);
			this.setTachieSemenLeftArmExtension('hj_');
			this.setMaxTachieSemenCockLeftArmId(1);
			
		} else {
			this.setTachieLeftArm('empty');
			this.resetTachieCockLeftArm();
			this.resetTachieSemenLeftArmExtension();
			this.setMaxTachieSemenCockLeftArmId(0);
		}
	}
	else if(poseName == POSE_FOOTJOB) {
		if(insert) {
			this.setTachieLeftArm('hj');
			if(Karryn.isCensored())
				this.setTachieCockLeftArm(enemyCock + '_cen');
			else
				this.setTachieCockLeftArm(enemyCock);
			this.setTachieSemenLeftArmExtension('hj_');
			this.setMaxTachieSemenLeftArmId(1);
			this.setMaxTachieSemenCockLeftArmId(1);
			
		} else {
			this.setTachieLeftArm('empty');
			this.resetTachieCockLeftArm();
			this.setMaxTachieSemenLeftArmId(0);
			this.resetTachieSemenLeftArmExtension();
			this.setMaxTachieSemenCockLeftArmId(0);
		}
		this.emoteFootjobPose();
	}
	else if(poseName == POSE_RECEPTIONIST) {
		
	}

	//this.emoteMasterManager();
};

////////////
// Feet Insert
////////////////
Game_Actor.prototype.setFeetInserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = FEET_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockFeetTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockFeetTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_FOOTJOB) {
		if(insert) {
			if(enemy.isNerdType) {
				this.setTachieBackA('fat');
				enemyCock = 'fat';
			}
			else if(enemy.isGoblinType) {
				this.setTachieBackA('goblin');
			}
			else {
				this.setTachieBackA('human');
			}
			
			if(Karryn.isCensored())
				this.setTachieCockFeet(enemyCock + '_cen');
			else
				this.setTachieCockFeet(enemyCock);	
			
			this.setMaxTachieSemenCockFeetId(1);
		}
		
		
	}

	//this.emoteMasterManager();
};

////////
// Other Insert
Game_Actor.prototype.setOther1Inserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = OTHER_1_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockFrontATarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockFrontATarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontA('leftchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontA('leftchin_' + enemyCock);
			this.setMaxTachieSemenFrontAId(1);
		} else {
			this.resetTachieFrontA();
			this.setMaxTachieSemenFrontAId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontA('rightchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontA('rightchin_' + enemyCock);
			if(this.isSlimeType) {
				this.setTachieSemenFrontAExtension('slime_')
			}
			else {
				this.resetTachieSemenFrontAExtension();
			}
			this.setMaxTachieSemenFrontAId(1);
		} else {
			this.resetTachieFrontA();
			this.resetTachieSemenFrontAExtension();
			this.setMaxTachieSemenFrontAId(0);
		}
	}
	else if(poseName == POSE_WAITRESS_SEX) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontA('chin_' + enemyCock + '_cen');
			else
				this.setTachieFrontA('chin_' + enemyCock);
			this.setMaxTachieSemenFrontAId(1);
		} else {
			this.resetTachieFrontA();
			this.setMaxTachieSemenFrontAId(0);
		}
	}
};

Game_Actor.prototype.setOther2Inserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = OTHER_2_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockFrontBTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockFrontBTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontB('rightchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontB('rightchin_' + enemyCock);
			this.setMaxTachieSemenFrontBId(1);
		} else {
			this.resetTachieFrontB();
			this.setMaxTachieSemenFrontBId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontB('rightchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontB('rightchin_' + enemyCock);
			if(this.isSlimeType) {
				this.setTachieSemenFrontBExtension('slime_')
			}
			else {
				this.resetTachieSemenFrontBExtension();
			}
			this.setMaxTachieSemenFrontBId(1);
		} else {
			this.resetTachieFrontB();
			this.resetTachieSemenFrontBExtension();
			this.setMaxTachieSemenFrontBId(0);
		}
	}
};

Game_Actor.prototype.setOther3Inserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = OTHER_3_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockFrontCTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockFrontCTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontC('rightchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontC('rightchin_' + enemyCock);
			this.setMaxTachieSemenFrontCId(1);
		} else {
			this.resetTachieFrontC();
			this.setMaxTachieSemenFrontCId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontC('leftchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontC('leftchin_' + enemyCock);
			if(this.isSlimeType) {
				this.setTachieSemenFrontCExtension('slime_')
			}
			else {
				this.resetTachieSemenFrontCExtension();
			}
			this.setMaxTachieSemenFrontCId(1);
		} else {
			this.resetTachieFrontC();
			this.resetTachieSemenFrontCExtension();
			this.setMaxTachieSemenFrontCId(0);
		}
	}
};

Game_Actor.prototype.setOther4Inserted = function (insert, enemy) {
	if(!this.isInSexPose()) return;
	let bodyId = OTHER_4_ID;
	let enemyCock = false;
	if(enemy) enemyCock = enemy.enemyCock();
	
	if(insert) {
		this.setBodyPartPenis(bodyId);
		this._cockFrontDTarget = enemy;
	}
	else {
		this.setBodyPartFree(bodyId);
		this._cockFrontDTarget = false;
	}
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL1) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontD('leftchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontD('leftchin_' + enemyCock);
		
			this.setMaxTachieSemenFrontDId(1);
		} else {
			this.resetTachieFrontD();
			this.setMaxTachieSemenFrontDId(0);
		}
	}
	else if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieFrontD('leftchin_' + enemyCock + '_cen');
			else
				this.setTachieFrontD('leftchin_' + enemyCock);
			if(this.isSlimeType) {
				this.setTachieSemenFrontDExtension('slime_')
			}
			else {
				this.resetTachieSemenFrontDExtension();
			}
			this.setMaxTachieSemenFrontDId(1);
		} else {
			this.resetTachieFrontD();
			this.resetTachieSemenFrontDExtension();
			this.setMaxTachieSemenFrontDId(0);
		}
	}
};


////////////
/////////////
// Other Insert
// insert = true for yes, false for removing
///////////////
/////////////

///////////////
// Pussy Cunni
///////////////

Game_Actor.prototype.setPussyCunni = function (insert, enemy) {
	if(!this.isInSexPose()) return;	
	let bodyId = PUSSY_ID;

	if(insert) {
		this.setBodyPartTongue(bodyId);
	}
	else {
		this.setBodyPartFree(bodyId);
	}
	
	let poseName = this.poseName;

	if(poseName == POSE_GOBLINCUNNILINGUS) {
		if(insert) {
			this.setTachieFrontA('goblin');
		} 
		else {
			this.resetTachieFrontA();
		}
	}

	//this.emoteMasterManager();
};

////////////////
// Mouth Rimming
////////////////
Game_Actor.prototype.setMouthRimming = function (insert, enemy) {
	if(!this.isInSexPose()) return;	
	let bodyId = MOUTH_ID;
	if(insert) {
		this.setBodyPartAnus(bodyId);
	}
	else {
		this.setBodyPartFree(bodyId);
	}
	
	let poseName = this.poseName;
	if(poseName == POSE_RIMJOB) {
		if(insert) {
			if(enemy.isOrcType) {
				this.setTachieFrontB('orc');
			}
			else if(enemy.isNerdType) {
				this.setTachieFrontB('fat');
			}
			else if(enemy.isGoblinType) {
				this.setTachieFrontB('goblin');
			}
			else {
				this.setTachieFrontB('human');
			}
		
		}
	}
	//this.emoteMasterManager();
};

/////////
// Toys
///////////

Game_Actor.prototype.setToyInserted_ClitToy_PinkRotor = function (insert) {
	if(!insert && !this.isWearingClitToy_PinkRotor()) return;
	
	let poseName = this.poseName;
	
	
};

Game_Actor.prototype.setToyInserted_PussyToy_PenisDildo = function (insert) {
	if(!insert && !this.isWearingPussyToy_PenisDildo()) return;
	
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
		}
		else {
			if(Karryn.isCensored())
				this.setTachieHolePussy('open_cen');
			else
				this.setTachieHolePussy('open');
			this.setTachieSemenWetExtension('open_');
			this.setTachieSemenCrotchExtension('open_');
		}
		
		
	}
};

Game_Actor.prototype.setToyInserted_AnalToy_AnalBeads = function (insert) {
	if(!insert && !this.isWearingAnalToy_AnalBeads()) return;
	
	let poseName = this.poseName;
	
	if(poseName == POSE_DEFEATED_LEVEL2) {
		if(insert) {
			this.resetTachieHoleAnus();
			this.resetTachieSemenAnalExtension();
		}
		else {
			
		}
	}
	else if(poseName == POSE_GUARDGANGBANG) {
		if(insert) {
			this.resetTachieHoleAnus();
			this.resetTachieSemenAnalExtension();
		}
		else {
			
		}
	}
	else if(poseName == POSE_DEFEATED_GUARD) {
		if(insert) {
			this.resetTachieHoleAnus();
			this.resetTachieSemenAnalExtension();
		}
		else {
			
		}
	}
	
	
};



// Tachie related above
//--------------------------------------

////////////////////
//////////////////////
// Sex Skills
/////////////////////
///////////////////


////////////////////////
// Pre Damage Eval Code
///////////////////////


Game_Actor.prototype.preDmgEval_start_standingHJ1_righthand = function(target) { 
	this.setStandingHJSexPose();
	this.setRightHandInserted(true, target);
	this.enableRightHandjobPoseSkills(target);
	this.takeOffPanties();
	this.removeClothing();
	target.addStunTillEndOfTurnState();
	target.addJustJoinedState();
	target.setPoseStatusMaster();
	target.addSexPoseState_RightHand();
	target.setBodySlotWithPenis(RIGHT_HAND_ID);
	target.setValidTargetForHandjob();
	target.setPoseSkillTarget(this);
	target.setPoseSkills([SKILL_ENEMY_POSESKILL_RIGHTHAND_ID]);
	target.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID]);
	
	target.addToEnemyHandjobCountRecord(this);
	
};

Game_Actor.prototype.preDmgEval_start_rimjob_mouth = function(target) { 
	this.setRimjobSexPose();
	this.setMouthRimming(true, target);
	this.enableRimjobPoseSkills(target);
	this.takeOffPanties();
	this.removeClothing();
	target.addStunTillEndOfTurnState();
	target.addJustJoinedState();
	target.setPoseStatusMaster();
	target.addSexPoseState_Rimming();
	target.setBodySlotWithAnus(MOUTH_ID);
	target.setValidTargetForRimjob();
	target.setPoseSkillTarget(this);
	target.setPoseSkills([SKILL_ENEMY_POSESKILL_RIMJOB_ID]);
	target.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_LEFTARM_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	target.setCanBeKissed(false);
	
	target.addToEnemyRimmedCountRecord(this);
	
};

Game_Actor.prototype.preDmgEval_start_footjob_feet = function(target) { 
	this.setFootjobSexPose();
	this.setFeetInserted(true, target);
	this.enableFootjobPoseSkills(target);
	this.takeOffPanties();
	this.removeClothing();
	target.addStunTillEndOfTurnState();
	target.addJustJoinedState();
	target.setPoseStatusMaster();
	target.addSexPoseState_Footjob();
	target.setBodySlotWithPenis(FEET_ID);
	target.setValidTargetForFootjob();
	target.setPoseSkillTarget(this);
	target.setPoseSkills([SKILL_ENEMY_POSESKILL_FOOTJOB_ID]);
	target.setOrgasmSkills([SKILL_ENEMY_EJACULATE_LEFTLEG_ID,SKILL_ENEMY_EJACULATE_RIGHTLEG_ID]);
	target.setCanBeKissed(false);
	
	target.addToEnemyFootjobCountRecord(this);
};


Game_Actor.prototype.preDmgEval_start_bj_kneeling1_mouth = function(target) { 
	this.setKneelingBJSexPose();
	this.setMouthInserted(true, target);
	this.enableBlowjobPoseSkills(target);
	this.takeOffPanties();
	this.removeClothing();
	target.addStunTillEndOfTurnState();
	target.addJustJoinedState();
	target.setPoseStatusMaster();
	target.addSexPoseState_Blowjob();
	target.setBodySlotWithPenis(MOUTH_ID);
	target.setValidTargetForBlowjob();
	target.setPoseSkillTarget(this);
	target.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	target.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID]);
	
	target.addToEnemyBlowjobCountRecord(this);
	
};

Game_Actor.prototype.preDmgEval_start_tittyfuck_laying_boobs = function(target) { 
	this.setLayingTittyfuckSexPose();
	this.setBoobsInserted(true, target);
	this.enableTittyFuckPoseSkills(target);
	this.takeOffPanties();
	this.removeClothing();
	target.addStunTillEndOfTurnState();
	target.addJustJoinedState();
	target.setPoseStatusMaster();
	target.addSexPoseState_TittyFuck();
	target.setBodySlotWithPenis(BOOBS_ID);
	target.setValidTargetForTittyFuck();
	target.setPoseSkillTarget(this);
	target.setPoseSkills([SKILL_ENEMY_POSESKILL_BOOBS_ID]);
	target.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	target.addToEnemyTittyFuckCountRecord(this);
	
};

///////////////////
// Damage formula
//////////////////////

//Kiss damage
Game_Actor.prototype.dmgFormula_karrynKiss = function(target, kissingLvl) {
	let baseDmg = BASEDMG_KISS_LVLONE; 
	if(kissingLvl === KISS_LVL_TWO) baseDmg = BASEDMG_KISS_LVLTWO;
	let actorPettingRate = this.elementRate(ELEMENT_PETTING_ID);
	let actorStripRate = this.elementRate(ELEMENT_STRIP_ID);
	let actorMouthDesire = this.mouthDesire;
	let actorMouthSensitivity = this.mouthSensitivity();
	let actorKissSkillRating = this.kissSkillRating();
	let actorPassiveEffect = this.passiveKissSkillRate();
	
	let enemySkillLvl = target.kissLvl();
	let enemyWeakness = target.weaknessToKiss();
	
	let enemyPleasureGain = (this.dex + baseDmg) * actorKissSkillRating * enemyWeakness * actorPassiveEffect;
	enemyPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	let actorDesireGain = (baseDmg + enemySkillLvl) * actorPettingRate;
	let actorPleasureFeedback = (actorDesireGain + target.dex) * actorPettingRate * (1 + enemySkillLvl * 0.1) * actorMouthSensitivity;
	actorPleasureFeedback *= (1 + (0.02 * (target.dex - this.end)));
	actorPleasureFeedback *= VAR_KARRYN_PLEASURE_FEEDBACK_REDUCER;
	
	let clothingDmg = (target.dex + enemySkillLvl) * actorStripRate;

	let result = target.result();
	result.pleasureFeedback = actorPleasureFeedback;
	result.pleasureDamage = enemyPleasureGain;
	result.clothingDamage = clothingDmg;
	result.desireAreaDamage = actorDesireGain * 0.4;
	result.desireRandomDamage = actorDesireGain * 0.6;
	result.desireCockWeight = 3;
	result.desireTarget = AREA_MOUTH;

	//this.setSpriteBattlerPosToMouth();
	if(kissingLvl === KISS_LVL_ONE) {
		this.setTachieCutIn(CUTIN_KARRYN_KISS_ONE_NAME);
	}
	else if(kissingLvl === KISS_LVL_TWO) {
		this.setTachieCutIn(CUTIN_KARRYN_KISS_TWO_NAME);
	}
	
	target.addToEnemyKissedCountRecord(this);
	if(actorPleasureFeedback > 0) this.addToActorMouthPleasureRecord(actorPleasureFeedback);
	target.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_KISSING);
	this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_KISSING);
	
	this.gainStaminaExp(10, target.enemyExperienceLvl());
	this.gainDexterityExp(60, target.enemyExperienceLvl());
	
	//this.emoteMasterManager();
	
	return 0;
};

Game_Actor.prototype.afterEval_karrynKiss = function(target) {
	target.addState(STATE_ENEMY_KISSED_ID);
	if(this.hasPassive(PASSIVE_KISS_ORGASM_TWO_ID && Math.randomInt(4) < 1)) {
		this.addHornyState();
	}	

};

//Cock Stare
Game_Actor.prototype.afterEval_karrynCockStare = function(target) {
	let cockStareReactionScore = this.getCockStareReactionScore();
	let cockStarelvl3 = cockStareReactionScore >= VAR_DEF_RS_LV3_REQ;
	let cockStarelvl2 = cockStareReactionScore >= VAR_DEF_RS_LV2_REQ;
	let cockStarelvl1 = cockStareReactionScore >= VAR_DEF_RS_LV1_REQ;
	let cockStarelvl0 = cockStareReactionScore < VAR_DEF_RS_LV1_REQ;
	
	let cockDesireValue = 0;
	let targetShrinkChance = -1;
	let targetAngryChance = -1;
	
	if(cockStarelvl3) {
		cockDesireValue = 10 + Math.randomInt(15);
		if(Math.randomInt() < 0.25) {
			this.addHornyState();
		}
		target.addHornyState();		
	}
	else if(cockStarelvl2) {
		cockDesireValue = 2 + Math.randomInt(10);
		if(Math.randomInt() < 0.05) {
			this.addHornyState();
		}
	}
	else if(cockStarelvl1) {
		cockDesireValue = -7;
		cockDesireValue -= Math.randomInt(15);
		targetShrinkChance = 45;
		targetAngryChance = 10;
	}
	else if(cockStarelvl0) {
		cockDesireValue = -12;
		cockDesireValue -= Math.randomInt(15);
		targetShrinkChance = 80;
		targetAngryChance = 30;
	}
	
	if(targetShrinkChance > 0) {
		if(target.hasVirginPrefix() || target.hasElitePrefix() || target.hasAngryPrefix()) {
			targetShrinkChance *= 3;
		}
		else if(target.hasBigPrefix() || target.hasGoodPrefix() || target.hasDrunkPrefix()) {
			targetShrinkChance *= 2;
		}
		
		if(targetShrinkChance > Math.randomInt(100)) {
			target.setPleasure(Math.round(target.pleasure * 0.33));
		}
	}
	
	
	if(targetAngryChance > 0) {
		if(target.hasAngryPrefix() || target.hasElitePrefix()) {
			targetAngryChance *= 3;
		}
		else if(target.hasSadoPrefix() || target.hasBigPrefix() || target.hasGoodPrefix()) {
			targetAngryChance *= 2;
		}
		else if(target.hasBadPrefix() || target.hasHornyPrefix() || target.hasVirginPrefix()) {
			targetAngryChance *= 0.5;
		}
		
		if(targetAngryChance > Math.randomInt(100)) {
			target.addAngryState();
		}
	}
	
	let cdvMultipler = 1;
	if(this.hasPassive(PASSIVE_KARRYN_STARE_COCK_THREE_ID)) cdvMultipler = 3.5;
	else if(this.hasPassive(PASSIVE_KARRYN_STARE_COCK_TWO_ID)) cdvMultipler = 2.5;
	
	this.gainCockDesire(Math.round(cockDesireValue * cdvMultipler));
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_COCK_STARE);
	this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_COCK_STARE);
	//this.emoteMasterManager();
};

Game_Actor.prototype.cooldownEval_karrynCockStare = function() {
	let cooldown = 4;
	if(this.hasPassive(PASSIVE_KARRYN_STARE_COCK_TWO_ID)) cooldown -= 2;
	return cooldown;
};



//Cock Petting
Game_Actor.prototype.dmgFormula_karrynCockPetting = function(target) {
	let baseDmg = BASEDMG_PETTING_COCK_LVLONE; 
	if(this.hasPassive(PASSIVE_COCK_PETTING_PEOPLE_TWO_ID)) baseDmg = BASEDMG_PETTING_COCK_LVLTWO;
	let actorPettingRate = this.elementRate(ELEMENT_PETTING_ID);
	let actorStripRate = this.elementRate(ELEMENT_STRIP_ID);
	let actorPettingSkillRating = this.pettingSkillRating();
	let actorCockDesire = this.cockDesire;
	let actorFingerSensitivity = this.fingerSensitivity();
	
	let enemyWeakness = target.weaknessToPetting();
	let nonErectMultipler = 1;
	if(target.isErect) nonErectMultipler = VAR_COCK_PETTING_NOTERECT_MULTIPLER;
	let lowCharmMultipler = 1;
	if(target.charm > this.inBattleCharm) lowCharmMultipler = VAR_COCK_PETTING_LOWCHARM_MULTIPLER;
	
	let enemyPleasureGain = (this.dex + baseDmg) * actorPettingSkillRating * enemyWeakness * nonErectMultipler * lowCharmMultipler;
	enemyPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	let actorDesireGain = (baseDmg) * actorPettingRate;
	let actorPleasureFeedback = (actorDesireGain + target.dex) * actorPettingRate * actorFingerSensitivity;
	actorPleasureFeedback *= (1 + (0.02 * (target.dex - this.end)));
	actorPleasureFeedback *= VAR_KARRYN_PLEASURE_FEEDBACK_REDUCER;
	
	let clothingDmg = (target.dex) * actorStripRate;

	let result = target.result();
	result.pleasureFeedback = actorPleasureFeedback;
	result.pleasureDamage = enemyPleasureGain;
	result.clothingDamage = clothingDmg;
	result.desireAreaDamage = actorDesireGain * 0.6;
	result.desireRandomDamage = actorDesireGain * 0.4;
	result.desireCockWeight = 1;
	result.desireTarget = AREA_COCK;
	
	this.setTachieCutIn(CUTIN_KARRYN_COCK_PETTING_NAME);
	
	target.addToEnemyCockPettedCountRecord(this);
	if(actorPleasureFeedback > 0) this.addToActorFingersPleasureRecord(actorPleasureFeedback);
	target.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_PETTING);
	this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_PETTING);
	
	
	this.gainStaminaExp(10, target.enemyExperienceLvl());
	this.gainDexterityExp(60, target.enemyExperienceLvl());
	
	//this.emoteMasterManager();
	return 0;
};


//Basic Sex gives 50% of the desire to cock, and remaining 50% to a random area with a cock weight of 0
Game_Actor.prototype.dmgFormula_basicSex = function(target, sexAct) {
	let actorSexRate = this.elementRate(ELEMENT_SEX_ID);
	let actorStripRate = this.elementRate(ELEMENT_STRIP_ID);
	let actorCockDesire = this.cockDesire;
	let baseDmg = 0;
	let actorSkillRating = 1;
	let enemySkillLvl = 1;
	let actorDesire = 0;
	let actorSensitivity = 1;
	let enemyWeakness = 1;
	let actorPassiveEffect = 1;
	let dexExpGain = 0;
	
	if(sexAct == SEXACT_BLOWJOB) {
		baseDmg = BASEDMG_SEXACT_BLOWJOB;
		actorSkillRating = this.blowjobSkillRating(); 
		enemySkillLvl = target.blowjobLvl(); 
		actorDesire = this.mouthDesire + actorCockDesire;
		actorSensitivity = this.mouthSensitivity();
		enemyWeakness = target.weaknessToBlowjob();
		actorPassiveEffect = this.passiveBlowjobSkillRate();
		dexExpGain = 80;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_BLOWJOB);
	}
	else if(sexAct == SEXACT_RIMJOB) {
		baseDmg = BASEDMG_SEXACT_RIMJOB;
		actorSkillRating = this.rimjobSkillRating(); 
		enemySkillLvl = target.sadismLvl(); 
		actorDesire = this.mouthDesire * 2;
		actorSensitivity = this.masochismSensitivity();
		enemyWeakness = target.weaknessToRimjob() + target.sadismLvl() * 0.15;
		actorPassiveEffect = this.passiveRimjobSkillRate();
		dexExpGain = 80;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_MASOCHISM);
	}
	else if(sexAct == SEXACT_FOOTJOB) {
		baseDmg = BASEDMG_SEXACT_FOOTJOB;
		actorSkillRating = this.footjobSkillRating(); 
		enemySkillLvl = target.masochismLvl(); 
		actorDesire = actorCockDesire * 2;
		actorSensitivity = this.sadismSensitivity();
		enemyWeakness = target.weaknessToFootjob() + target.masochismLvl() * 0.15;
		actorPassiveEffect = this.passiveFootjobSkillRate();
		dexExpGain = 80;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_SADISM);
	}
	else if(sexAct == SEXACT_TITTYFUCK) {
		baseDmg = BASEDMG_SEXACT_TITTYFUCK;
		this.calculateTittyFuckSkillRating();
		actorSkillRating = this.tittyFuckSkillRating();
		enemySkillLvl = target.tittyFuckLvl(); 
		actorDesire = this.boobsDesire + actorCockDesire;
		this.calculateBoobsSensitivityRating();
		actorSensitivity = this.boobsSensitivity();
		enemyWeakness = target.weaknessToTittyFuck();
		actorPassiveEffect = this.passiveTittyFuckSkillRate();
		dexExpGain = 80;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_TITTYFUCK);
	}
	else if(sexAct == SEXACT_PUSSYSEX) {
		baseDmg = BASEDMG_SEXACT_PUSSYSEX;
		this.calculatePussySexSkillRating();
		actorSkillRating = this.pussySexSkillRating();
		enemySkillLvl = target.pussySexLvl(); 
		actorDesire = this.pussyDesire + actorCockDesire;
		this.calculatePussySensitivityRating();
		actorSensitivity = this.pussySensitivity();
		enemyWeakness = target.weaknessToPussy();
		actorPassiveEffect = this.passivePussySexSkillRate();
		dexExpGain = 60;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_PUSSY_SEX);
	}
	else if(sexAct == SEXACT_ANALSEX) {
		baseDmg = BASEDMG_SEXACT_ANALSEX;
		this.calculateAnalSexSkillRating();
		actorSkillRating = this.analSexSkillRating();
		enemySkillLvl = target.analSexLvl(); 
		actorDesire = this.buttDesire + actorCockDesire;
		this.calculateAnalSensitivityRating();
		actorSensitivity = this.analSensitivity();
		enemyWeakness = target.weaknessToAnal();
		actorPassiveEffect = this.passiveAnalSexSkillRate();
		dexExpGain = 60;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_ANAL_SEX);
	}
	else if(sexAct == SEXACT_HANDJOB) {
		baseDmg = BASEDMG_SEXACT_HANDJOB;
		actorSkillRating = this.handjobSkillRating();
		enemySkillLvl = target.handjobLvl(); 
		actorDesire =  2 * actorCockDesire;
		actorSensitivity = this.fingerSensitivity(); 
		enemyWeakness = target.weaknessToHandjob();
		actorSexRate = this.elementRate(ELEMENT_PETTING_ID);
		actorPassiveEffect = this.passiveHandjobSkillRate();
		dexExpGain = 100;
		this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_HANDJOB);
	}
	else console.log("Error dmgFormula basicSex sexAct: " + sexAct);
	
	let actorDesireGain = (baseDmg + enemySkillLvl) * actorSexRate;
	let actorPleasureFeedback = (actorDesireGain + target.dex) * 0.5 * (1 + enemySkillLvl * 0.1) * actorSexRate * actorSensitivity;
	//actorPleasureFeedback -= (this.end * 2 * (1 - actorDesire / 266));
	actorPleasureFeedback *= (1 + (0.02 * (target.dex - this.end)));
	actorPleasureFeedback *= VAR_KARRYN_PLEASURE_FEEDBACK_REDUCER;
	
	let enemyPleasureGain = (this.dex + baseDmg) * enemyWeakness * actorSkillRating * actorPassiveEffect;
	enemyPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_SEX_SKILL);
	
	let results = target.result();
	results.pleasureDamage = enemyPleasureGain;
	results.desireAreaDamage = actorDesireGain * .5;
	results.desireRandomDamage = actorDesireGain * .5;
	results.desireCockWeight = 0;
	results.desireTarget = sexAct;
	results.pleasureFeedback = actorPleasureFeedback;
	
	if(actorPleasureFeedback > 0) {
		if(sexAct == SEXACT_BLOWJOB) this.addToActorMouthPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_TITTYFUCK) this.addToActorBoobsPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_PUSSYSEX) this.addToActorPussyPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_ANALSEX) this.addToActorAnalPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_HANDJOB) this.addToActorFingersPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_FOOTJOB) this.addToActorSadismPleasureRecord(actorPleasureFeedback);
		else if(sexAct == SEXACT_RIMJOB) this.addToActorMasochismPleasureRecord(actorPleasureFeedback);
	}
	
	this.gainStaminaExp(20, target.enemyExperienceLvl());
	this.gainDexterityExp(dexExpGain, target.enemyExperienceLvl());
	
	//this.emoteMasterManager();

	return 0;
};

///////////////////
// Female Orgasm Damage formula
//////////////////////

Game_Actor.prototype.dmgFormula_basicFemaleOrgasm = function(orgasmSkillId) {
	let target = this;
	let numOfOrgasm = Math.floor(target.pleasure / target.orgasmPoint());
	let energyDamage = this.passiveFemaleOrgasmEnergyDamage() + this.passiveFemaleOrgasmEnergyDamage() * (numOfOrgasm - 1) * 0.33;
	
	let result = target.result();
	result.femaleOrgasmCount = numOfOrgasm;
	
	this.gainEnergyExp(100 + (numOfOrgasm * 50), $gameTroop.getAverageEnemyExperienceLvl());
	
	let ml = this.calculateOrgasmML(energyDamage);
	this.increaseLiquidPussyJuice(Math.round(ml / 2));
	this.addToActorOrgasmRecord(ml, numOfOrgasm);
	if(!this.isInMasturbationPose()) {
		$gameTroop.addToEnemyOrgasmPresenceCountRecord(this);
		//todo: add sight orgasm line here?
	}
	
	if(numOfOrgasm >= 2 || orgasmSkillId === SKILL_FEMALE_ORGASM_TWO_ID) {
		this.setTachieCutIn(CUTIN_KARRYN_ORGASM_TWO_NAME);
		//this.setTachieCut_moveBottomToTop_OrgasmTwo();
		$gameScreen.startShake(REM_ORGASM_LV2_SCREEN_SHAKE_POWER, REM_ORGASM_LV2_SCREEN_SHAKE_SPEED, REM_ORGASM_LV2_SCREEN_SHAKE_DURATION);
		
	}
	else if(numOfOrgasm === 1 || orgasmSkillId === SKILL_FEMALE_ORGASM_ONE_ID) {
		this.setTachieCutIn(CUTIN_KARRYN_ORGASM_ONE_NAME);
		//this.setTachieCut_moveTopToBottom_OrgasmOne();
		$gameScreen.startShake(REM_ORGASM_LV1_SCREEN_SHAKE_POWER, REM_ORGASM_LV1_SCREEN_SHAKE_SPEED, REM_ORGASM_LV1_SCREEN_SHAKE_DURATION);
	}
	
	result.ejaculateDamage = ml;
	
	this.justGotHitBySkillType(JUST_SKILLTYPE_KARRYN_ORGASM);
	
	return energyDamage;
};

///////////////
/////////////////////
// Post Damage Formulas
////////////////////
//////////////////

Game_Actor.prototype.postDamage_basicKissing = function(target, kissLvl) {
	if(this.isInWaitressServingPose()) {
		this.postDamage_basicKissing_waitressServing(target, kissLvl);
	}
	else if(this.isInWaitressSexPose()) {
		this.postDamage_basicKissing_waitressSex(target, kissLvl);
	}
	else if(this.isInReceptionistPose()) {
		this.postDamage_basicKissing_receptionistBattle(target, kissLvl);
	}
};

Game_Actor.prototype.postDamage_basicPetting = function(target, area) {
	if(this.isInWaitressServingPose()) {
		this.postDamage_basicPetting_waitressServing(target, area);
	}
	else if(this.isInReceptionistPose()) {
		this.postDamage_basicPetting_receptionistBattle(target, area);
	}
	
};

Game_Actor.prototype.postDamage_basicSex = function(target, sexAct) {
	let poseName = this.poseName;

	if(poseName == POSE_RIMJOB) {
		if(sexAct == SEXACT_RIMJOB) {
			this.increaseLiquidDroolMouth(1);
		}
	}
	else if(this.isInReceptionistPose()) {
		this.postDamage_basicSex_receptionistBattle(target, sexAct);
	}
	
};

Game_Actor.prototype.postDamage_spanking = function(target, spankLvl) {
	if(spankLvl == SPANK_LVL_THREE) {
		this.passivePostSpank_addOffBalanceEffect(2);
		this.passivePostSpank_addHornyEffect(3);
	}
	else if(spankLvl == SPANK_LVL_TWO) {
		this.passivePostSpank_addOffBalanceEffect(1.5);
		this.passivePostSpank_addHornyEffect(2);
	}
	else if(spankLvl == SPANK_LVL_ONE) {
		this.passivePostSpank_addOffBalanceEffect(1);
		this.passivePostSpank_addHornyEffect(1);
	}
};

////////////////////////
// Post Damage Female Orgasm
/////////////////////////

Game_Actor.prototype.postDamage_femaleOrgasm = function(orgasmSkillId) {
	let target = this;
	let orgasmCount = target.result().femaleOrgasmCount;
	
	this.postOrgasmPleasure();
	this.postOrgasmToys(orgasmCount);
	
	if(orgasmCount > 0) {
		if(!this.justOrgasmed()) this.addJustOrgasmed();
		let newMaxTurns = Math.ceil(orgasmCount/2) + 1;
		this.setJustOrgasmedStateTurns(Math.max(newMaxTurns, this.getJustOrgasmedStateTurns()));
		this.addState(STATE_KARRYN_BLISS_STUN_ID);
		
		this.refreshPose();
		
		$gameTroop.makeAllEnemiesHorny(this.passiveOrgasmMakeEnemiesHornyChance());	
	
		this.masturbationBattleOrgasm(orgasmCount);
		
		if(this.isInWaitressServingPose()) {
			this.postDamage_femaleOrgasm_waitressServing();
		}
		else if(this.isInReceptionistPose()) {
			target.postDamage_femaleOrgasm_receptionistBattle(orgasmCount);
		}
	}
		
	this._orgasmCallQueuedUp = false;
	
	
	// Allow Tachie to update
	BattleManager.setBMAllowTachieUpdate(true);
};

Game_Actor.prototype.beforeEval_karrynOrgasm = function(orgasmSkillId) {
	this.addToActorSpecificOrgasmRecord();
};
