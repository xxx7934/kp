﻿var Remtairy = Remtairy || {};
Remtairy.EnemySex = Remtairy.EnemySex || {};

const VAR_MIN_PLEASURE_FEEDBACK_DIVIDE = 6;
const VAR_MIN_PLEASURE_FEEDBACK_DEFEATED_DIVIDE = 4.5;

//=============================================================================
 /*:
 * @plugindesc Enemy Sex
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

//////////////////
//////////////////
// Game Enemy

Game_Enemy.prototype.canTalk_Random = function(target) { 
	return this.canTalk_Mouth(target) || this.canTalk_Boobs(target) || this.canTalk_Pussy(target) || this.canTalk_Butt(target) || this.canTalk_Cock(target);
};
Game_Enemy.prototype.canTalk_Mouth = function(target) { 
	return !this.isAngry && !this.isInAPose() && target.isBodySlotAvailableForPetting(BUTT_ID);
};
Game_Enemy.prototype.canTalk_Boobs = function(target) { 
	return !this.isAngry && !this.isInAPose() && target.isBodySlotAvailableForPetting(BOOBS_ID);
};
Game_Enemy.prototype.canTalk_Pussy = function(target) { 
	return !this.isAngry && !this.isInAPose() && target.isBodySlotAvailableForPetting(PUSSY_ID);
};
Game_Enemy.prototype.canTalk_Butt = function(target) { 
	return !this.isAngry && !this.isInAPose() && target.isBodySlotAvailableForPetting(BUTT_ID);
};
Game_Enemy.prototype.canTalk_Cock = function(target) { 
	return !this.isAngry && this.isErect && !this.isInAPose();
};
Game_Enemy.prototype.canSee = function(target) { 
	return this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_MOUTH_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BOOBS_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_CLIT_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUTT_ID], target);
};
Game_Enemy.prototype.canJerkOff = function(target) { 
	if(Karryn.isInWaitressServingPose()) return false;
	if(this._ejaculationStock === 0) return false;
	let validJerkOffPose = this.isNotInAPose() || this.isUsingBodySlotPenis(OTHER_1_ID) || this.isUsingBodySlotPenis(OTHER_2_ID) || this.isUsingBodySlotPenis(OTHER_3_ID) || this.isUsingBodySlotPenis(OTHER_4_ID);
	return validJerkOffPose && (this.isErect || target.inBattleCharm > this.charm);
};
Game_Enemy.prototype.canPet = function(target) { 
	return this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_KISS_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_BOOBS_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_PUSSY_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_BUTT_ID], target);
}; 
Game_Enemy.prototype.canPoseJoin = function(target) { 
	return this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_RIGHT_HAND_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_LEFT_HAND_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_MOUTH_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_ANAL_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_BOOBS_ID], target) || 
	this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_POSEJOIN_PUSSY_ID], target);
}; 

///////
// Horny

Game_Enemy.prototype.addHornyState = function() {
	if(!DEBUG_MODE || this.isStateAffected(STATE_RESIST_HORNY_ID)) return;
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	
	this.addState(STATE_HORNY_ID);
	let hornyTurns = Math.randomInt(3) + 3;
	
	if(actor.inBattleCharm > this.charm) {
		if(actor.inBattleCharm > this.charm * 1.5) {
			hornyTurns += Math.randomInt(3) + 3;
		}
		else {
			hornyTurns += Math.randomInt(2) + 2;
		}
	}
	if($gameParty._showTopRightTimeNumberFlag) {
		hornyTurns *= 3;
	}
	this.increaseHornyStateTurns(hornyTurns);
};

///////
// Sex States

Game_Enemy.prototype.addSexPoseState_Pussy = function() { 
	this.addState(STATE_PUSSY_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_RightHand = function() { 
	this.addState(STATE_RIGHTHAND_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_LeftHand = function() { 
	this.addState(STATE_LEFTHAND_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_TittyFuck = function() { 
	this.addState(STATE_TITTYFUCK_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_Blowjob = function() { 
	this.addState(STATE_BLOWJOB_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_Anal = function() { 
	this.addState(STATE_ANAL_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_Cunni = function() { 
	this.addState(STATE_CUNNI_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_Rimming = function() { 
	this.addState(STATE_RIMMING_ENEMYPOSE_ID);
};
Game_Enemy.prototype.addSexPoseState_Footjob = function() { 
	this.addState(STATE_FOOTJOB_ENEMYPOSE_ID);
};
Game_Enemy.prototype.removeAllSexPoseStates = function() { 
	this.removeState(STATE_PUSSY_ENEMYPOSE_ID);
	this.removeState(STATE_RIGHTHAND_ENEMYPOSE_ID);
	this.removeState(STATE_LEFTHAND_ENEMYPOSE_ID);
	this.removeState(STATE_TITTYFUCK_ENEMYPOSE_ID);
	this.removeState(STATE_BLOWJOB_ENEMYPOSE_ID);
	this.removeState(STATE_ANAL_ENEMYPOSE_ID);
	this.removeState(STATE_CUNNI_ENEMYPOSE_ID);
	this.removeState(STATE_RIMMING_ENEMYPOSE_ID);
	this.removeState(STATE_FOOTJOB_ENEMYPOSE_ID);
	
};

////////
// Kick Counter
/////////////

Game_Enemy.prototype.counterCondition_kickCounter = function(target, action) { 
	if(!action.item().hasTag(TAG_KICK_SKILL) || !target.isActor() || !this.isErect || this.isInAPose() || !target.canGetPussyInserted() || target.isInSexPose()) return false;
	
	let counterChance = 0;
	
	if(this.isThugType) {
		counterChance += 0.4;
		
		if(Karryn.hasEdict(EDICT_THUGS_STRESS_RELIEF)) counterChance += 0.25;
		else if(Karryn.hasEdict(EDICT_WEAKEN_THE_THUGS)) counterChance -= 0.4;
		
		if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_INMATE_FOOD)) counterChance += 0.1;
		if(Karryn.hasEdict(EDICT_APHRODISIACS_DRUGS_FOR_INMATES)) counterChance += 0.1;
		
		if(this.isHorny) counterChance += 0.25;
		if(this.isAngry) counterChance += 0.25;

		if(this.level > target.level) counterChance += 0.2;
		if(this.str > target.str) counterChance += 0.3;
		else counterChance -= 0.1;
		if(this.agi > target.agi) counterChance += 0.2;
		else counterChance -= 0.1;
		if(!target.isWearingPanties()) counterChance += 0.1;
	}
	else if(this.isGuardType) {
		if(!Karryn.hasEdict(EDICT_BASIC_GUARD_TRAINING)) return false;
		
		//todo: expert guard training adds more
		if(Karryn.hasEdict(EDICT_ADVANCED_GUARD_TRAINING)) counterChance += 0.3;
		else counterChance -= 0.3;
		
		if(Karryn.hasEdict(EDICT_APHRODISIACS_IN_GUARD_FOOD)) counterChance += 0.1;
		if(Karryn.hasEdict(EDICT_STEROIDS_FOR_GUARDS)) counterChance += 0.1;
		if(Karryn.hasEdict(EDICT_PERFORMANCE_ENHANCEMENT_DRUGS_FOR_GUARDS)) counterChance += 0.1;
		
		
		if(this.isHorny) counterChance += 0.25;
		if(this.isAngry) counterChance += 0.25;
		
		if(this.level > target.level) counterChance += 0.2;
		if(this.str > target.str) counterChance += 0.25;
		else counterChance -= 0.1;
		if(this.agi > target.agi) counterChance += 0.25;
		else counterChance -= 0.1;
		if(this.dex > target.dex) counterChance += 0.25;
		else counterChance -= 0.1;
		if(!target.isWearingPanties()) counterChance += 0.1;
	}
	
	return Math.random() < counterChance;
};

////////////
///////////////
// Before Eval Code
/////////////////////
////////////////

Game_Enemy.prototype.beforeEval_toyInsertion = function(target, toy) { 
	target.stripOffPanties();
	if(toy == TOY_PINK_ROTOR) {
		target.setClitToy_PinkRotor(this);
	}
	else if(toy == TOY_PENIS_DILDO) {
		target.setPussyToy_PenisDildo(this);
	}
	else if(toy == TOY_ANAL_BEAD) {
		target.setAnalToy_AnalBeads(this);
	}
	
	else console.log("Error beforeEval toyInsertion toy: " + toy);
	
	this.addToEnemyToysInsertedCountRecord(target);
};

Game_Enemy.prototype.beforeEval_cumIntoMug = function(target) { 
	return;
	let targetGivingBJ = target.blowjobPoseSkillsIsEnabled();
	if(!targetGivingBJ) {
		target.setOther1Inserted(true, this);
		this.setBodySlotWithPenis(OTHER_1_ID);
	}
};

Game_Enemy.prototype.beforeEval_enemyKiss = function(target) { 
	target.setKissedChange(true, this);
};

Game_Enemy.prototype.beforeEval_enemyGetFingersSucked = function(target) { 
	target.setKissedChange(false, false);
};

/////////////////////
// Sex Start Before Eval
////////////////////////

Game_Enemy.prototype.beforeEval_start_thug_gangbang1_pussy = function(target) { 
	target.setThugGangbangSexPose();
	target.addStunTillEndOfTurnState();
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_THUGGANGBANG_ID);
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	
	this.addToEnemyPussyFuckedCountRecord(target);
	target._recordSexPose_ThugGangbangCount++;
};

Game_Enemy.prototype.beforeEval_start_guard_gangbang_pussy = function(target) { 
	target.setGuardGangbangSexPose();
	target.addStunTillEndOfTurnState();
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_GUARDGANGBANG_ID);
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	
	
	this.addToEnemyPussyFuckedCountRecord(target);
	target._recordSexPose_GuardGangbangCount++;
};

Game_Enemy.prototype.beforeEval_start_kick_counter_pussy = function(target) { 
	target.setKickCounterSexPose();
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID, SKILL_ENEMY_POSESKILL_PUSSY_ID, SKILL_ENEMY_PETTING_SELECTOR_KISS_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	
	this.addToEnemyPussyFuckedCountRecord(target);
	target._recordSexPose_KickCounterCount++;
};

Game_Enemy.prototype.beforeEval_start_goblin_cunnilingus1_pussy = function(target) { 
	target.setGoblinCunnilingusSexPose();
	target.addStunTillEndOfTurnState();
	target.setPussyCunni(true, this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_GOBLINCUNNI_ID);
	this.addSexPoseState_Cunni();
	this.setBodySlotWithPenis(CLIT_ID);
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_CUNNI_ID, SKILL_ENEMY_POSESWITCH_GOBLINCL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_ID]);
	this.setCanBeKissed(false);
	
	this.addToEnemyCunnilingusCountRecord(target);
	target._recordSexPose_GoblinCunnilingusCount++;
};

Game_Enemy.prototype.beforeEval_start_rimjob_mouth = function(target) {
	target.setRimjobSexPose();
	target.addStunTillEndOfTurnState();
	target.setMouthRimming(true, this);
	target.enableRimjobPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_RIMJOB_ID);
	this.addSexPoseState_Rimming();
	this.setBodySlotWithAnus(MOUTH_ID);
	this.setValidTargetForRimjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_RIMJOB_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_LEFTARM_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	this.setCanBeKissed(false);
	
	this.addToEnemyRimmedCountRecord(target);
};

Game_Enemy.prototype.beforeEval_start_footjob_feet = function(target) {
	target.setFootjobSexPose();
	target.addStunTillEndOfTurnState();
	target.setFeetInserted(true, this);
	target.enableFootjobPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_FOOTJOB_ID);
	this.addSexPoseState_Footjob();
	this.setBodySlotWithPenis(FEET_ID);
	this.setValidTargetForFootjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_FOOTJOB_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_LEFTLEG_ID,SKILL_ENEMY_EJACULATE_RIGHTLEG_ID]);
	this.setCanBeKissed(false);
	
	this.addToEnemyFootjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_start_hj_standing1_rightarm = function(target) { 
	target.setStandingHJSexPose();
	target.addStunTillEndOfTurnState();
	target.setRightHandInserted(true, this);
	target.enableRightHandjobPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_STANDINGHJ_ID);
	this.addSexPoseState_RightHand();
	this.setBodySlotWithPenis(RIGHT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_RIGHTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID]);
	
	this.addToEnemyHandjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_start_bj_kneeling1_mouth = function(target) { 
	target.setKneelingBJSexPose();
	target.addStunTillEndOfTurnState();
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	target._cockMouthTarget = this;
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_KNEELINGBJ_ID);
	this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID]);
	
	this.addToEnemyBlowjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_start_tittyfuck_laying_boobs = function(target) { 
	target.setLayingTittyfuckSexPose();
	target.addStunTillEndOfTurnState();
	target.setBoobsInserted(true, this);
	target.enableTittyFuckPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_LAYINGTF_ID);
	this.addSexPoseState_TittyFuck();
	this.setBodySlotWithPenis(BOOBS_ID);
	this.setValidTargetForTittyFuck();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_BOOBS_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	this.addToEnemyTittyFuckCountRecord(target);
};

Game_Enemy.prototype.beforeEval_start_slime_piledriver_anal = function(target) { 
	BattleManager.pullOutAllEnemies();
	target.setSlimeAnalPiledriverPose();
	target.addStunTillEndOfTurnState();
	target.setAnalInserted(true, this);
	target.enableAnalSexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusMaster();
	this.setPoseMasterSkillID(SKILL_ENEMY_POSESTART_SLIMEPILEDRIVER_ID);
	this.addSexPoseState_Anal();
	this.setBodySlotWithPenis(ANAL_ID);
	this.setValidTargetForAnalSex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_TENTACLES_ID,SKILL_ENEMY_POSESKILL_SLIMEJOIN_MOUTH_ID,SKILL_ENEMY_POSESKILL_SLIMEJOIN_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_TENTACLES_ID]);
	
	this.addToEnemyAnalFuckedCountRecord(target);
	target._recordSexPose_SlimePiledriverCount++;
};


/////////////////////
// Sex Join Pre Damage Eval
////////////////////////

//Generic Sex Join

Game_Enemy.prototype.beforeEval_join_generic_mouth = function(target) { 
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID]);
	
	this.addToEnemyBlowjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_join_generic_tittyFuck = function(target) { 
	target.setBoobsInserted(true, this);
	target.enableTittyFuckPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_TittyFuck();
	this.setBodySlotWithPenis(BOOBS_ID);
	this.setValidTargetForTittyFuck();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_BOOBS_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	this.addToEnemyTittyFuckCountRecord(target);
};


Game_Enemy.prototype.beforeEval_join_generic_anal = function(target) { 
	target.setAnalInserted(true, this);
	target.enableAnalSexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Anal();
	this.setBodySlotWithPenis(ANAL_ID);
	this.setValidTargetForAnalSex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_ANAL_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	
	this.addToEnemyAnalFuckedCountRecord(target);
};

Game_Enemy.prototype.beforeEval_join_generic_pussy = function(target) { 
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	this.addToEnemyPussyFuckedCountRecord(target);
};

Game_Enemy.prototype.beforeEval_join_generic_righthand = function(target) { 
	target.setRightHandInserted(true, this);
	target.enableRightHandjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_RightHand();
	this.setBodySlotWithPenis(RIGHT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_RIGHTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID]);
	
	this.addToEnemyHandjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_join_generic_lefthand = function(target) { 
	target.setLeftHandInserted(true, this);
	target.enableLeftHandjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_LeftHand();
	this.setBodySlotWithPenis(LEFT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_LEFTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_LEFTARM_ID]);
	
	this.addToEnemyHandjobCountRecord(target);
};

// Slime piledriver join

Game_Enemy.prototype.beforeEval_join_slime_piledriver_mouth = function(target) { 
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.addToEnemyBlowjobCountRecord(target);
};

Game_Enemy.prototype.beforeEval_join_slime_piledriver_pussy = function(target) { 
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	this.addJustJoinedState();
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.addToEnemyPussyFuckedCountRecord(target);
};

Game_Enemy.prototype.beforeEval_poseswitch_goblin_cl_pussy = function(target) { 
	target.setPussyCunni(false, this);
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	this.addJustJoinedState();
	this.addSexPoseState_Pussy();
	this.removeState(STATE_CUNNI_ENEMYPOSE_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	this.addToEnemyPussyFuckedCountRecord(target);
};

// Defeated Level 1 Sex Join

Game_Enemy.prototype.preDmgEval_join_defeated_level1_mouth = function(target) { 
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	
	this.addToEnemyBlowjobCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_righthand = function(target) { 
	target.setRightHandInserted(true, this);
	target.enableRightHandjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_RightHand();
	this.setBodySlotWithPenis(RIGHT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_RIGHTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_RIGHTARM_ID,SKILL_ENEMY_EJACULATE_FACE_ID]);
	
	this.addToEnemyHandjobCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_lefthand = function(target) { 
	target.setLeftHandInserted(true, this);
	target.enableLeftHandjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_LeftHand();
	this.setBodySlotWithPenis(LEFT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_LEFTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_LEFTARM_ID,SKILL_ENEMY_EJACULATE_FACE_ID]);
	
	this.addToEnemyHandjobCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_other1 = function(target) { 
	target.setOther1Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_1_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_other2 = function(target) { 
	target.setOther2Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_2_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_other3 = function(target) { 
	target.setOther3Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_3_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BOOBS_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level1_other4 = function(target) { 
	target.setOther4Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_4_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BOOBS_ID]);
};

//Defeated Level 2
Game_Enemy.prototype.preDmgEval_join_defeated_level2_pussy = function(target) { 
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BUTT_TOP_LEFT_ID,SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_LEFT_ID]);
	this.addToEnemyPussyFuckedCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level2_anal = function(target) { 
	target.setAnalInserted(true, this);
	target.enableAnalSexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Anal();
	this.setBodySlotWithPenis(ANAL_ID);
	this.setValidTargetForAnalSex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_BUTT_TOP_RIGHT_ID,SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_RIGHT_ID]);
	this.addToEnemyAnalFuckedCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level2_other1 = function(target) { 
	target.setOther1Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_1_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_TOP_RIGHT_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level2_other2 = function(target) { 
	target.setOther2Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_2_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_RIGHT_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level2_other3 = function(target) { 
	target.setOther3Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_3_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_BOTTOM_LEFT_ID]);
};

Game_Enemy.prototype.preDmgEval_join_defeated_level2_other4 = function(target) { 
	target.setOther4Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_4_ID);
	this.setPoseSkillTarget(target);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_TOP_LEFT_ID]);
};

// Bar Sex Other1
Game_Enemy.prototype.preDmgEval_join_barsex_other1 = function(target) { 
	target.setOther1Inserted(true, this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.setBodySlotWithPenis(OTHER_1_ID);
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_TALK_SELECTOR_RANDOM_JERKOFF_ID,SKILL_ENEMY_STARE_SELECTOR_RANDOM_JERKOFF_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
};


//Defeated Guard
Game_Enemy.prototype.preDmgEval_join_defeated_guard_pussy = function(target) { 
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID]);
	this.addToEnemyPussyFuckedCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_guard_anal = function(target) { 
	target.setAnalInserted(true, this);
	target.enableAnalSexPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Anal();
	this.setBodySlotWithPenis(ANAL_ID);
	this.setValidTargetForAnalSex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	this.addToEnemyAnalFuckedCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_guard_mouth = function(target) { 
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_LEFTARM_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID]);
	this.addToEnemyBlowjobCountRecord(target);
};

Game_Enemy.prototype.preDmgEval_join_defeated_guard_tittyFuck = function(target) { 
	target.setBoobsInserted(true, this);
	target.enableTittyFuckPoseSkills(this);
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	this.addSexPoseState_TittyFuck();
	this.setBodySlotWithPenis(BOOBS_ID);
	this.setValidTargetForTittyFuck();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_BOOBS_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_LEFTARM_ID,SKILL_ENEMY_EJACULATE_RIGHTARM_ID]);
	this.addToEnemyTittyFuckCountRecord(target);
};

//Receptionist
Game_Enemy.prototype.preDmgEval_join_receptionist_cunni = function(target) { 
	target.setPussyCunni(true, this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	//this.addSexPoseState_Cunni();
	this.setBodySlotWithPenis(CLIT_ID);
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_CUNNI_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BUTT_ID]);
	this.setCanBeKissed(false);
	this.addToEnemyCunnilingusCountRecord(target);
	target.emoteReceptionistPose();
};

Game_Enemy.prototype.preDmgEval_join_receptionist_pussy = function(target) { 
	target.setPussyInserted(true, this);
	target.enablePussySexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	//this.addSexPoseState_Pussy();
	this.setBodySlotWithPenis(PUSSY_ID);
	this.setValidTargetForPussySex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_POSESKILL_PUSSY_ID,SKILL_ENEMY_SPANKING_SELECTOR_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_PUSSY_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	this.addToEnemyPussyFuckedCountRecord(target);
	target.emoteReceptionistPose();
};

Game_Enemy.prototype.preDmgEval_join_receptionist_anal = function(target) { 
	target.setAnalInserted(true, this);
	target.enableAnalSexPoseSkills(this);
	target.stripOffPanties();
	target.stripOffClothing();
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	//this.addSexPoseState_Anal();
	this.setBodySlotWithPenis(ANAL_ID);
	this.setValidTargetForAnalSex();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_POSESKILL_ANAL_ID,SKILL_ENEMY_SPANKING_SELECTOR_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_ANAL_ID,SKILL_ENEMY_EJACULATE_BUTT_ID]);
	this.addToEnemyAnalFuckedCountRecord(target);
	target.emoteReceptionistPose();
};

Game_Enemy.prototype.preDmgEval_join_receptionist_mouth = function(target) { 
	target.setMouthInserted(true, this);
	target.enableBlowjobPoseSkills(this);
	target._receptionist_visitorSexSkillCooldown = 1;
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	//this.addSexPoseState_Blowjob();
	this.setBodySlotWithPenis(MOUTH_ID);
	this.setValidTargetForBlowjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_MOUTH_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_FACE_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_MOUTH_ID,SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_ONTO_DESK_ID]);
	this.addToEnemyBlowjobCountRecord(target);
	this._perv_gettingBJ = true;
	//target.updateReceptionistBattleVisitorQueueTachie();
};

Game_Enemy.prototype.preDmgEval_join_receptionist_lefthand = function(target) { 
	target.setLeftHandInserted(true, this);
	target.enableLeftHandjobPoseSkills(this);
	target._receptionist_visitorSexSkillCooldown = 1;
	this.addJustJoinedState();
	this.setPoseStatusHelper();
	//this.addSexPoseState_LeftHand();
	this.setBodySlotWithPenis(LEFT_HAND_ID);
	this.setValidTargetForHandjob();
	this.setPoseSkillTarget(target);
	this.setPoseSkills([SKILL_ENEMY_POSESKILL_LEFTHAND_ID]);
	this.setOrgasmSkills([SKILL_ENEMY_EJACULATE_BOOBS_ID,SKILL_ENEMY_EJACULATE_ONTO_DESK_ID]);
	this.addToEnemyHandjobCountRecord(target);
	this._perv_gettingHJ = true;
	//target.updateReceptionistBattleVisitorQueueTachie();
};

//////////
// Selectors
//////////

// Talk Selectors
Game_Enemy.prototype.selectorEnemy_TalkRandom = function(target) {
	let talkArray = [];

	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SELECTOR_MOUTH_ID])) 
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_MOUTH_ID);
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SELECTOR_BOOBS_ID])) 
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_BOOBS_ID);
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SELECTOR_PUSSY_ID])) 
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_PUSSY_ID);
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SELECTOR_BUTT_ID])) 
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_BUTT_ID);
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SELECTOR_COCK_ID])) {
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_COCK_ID);
		talkArray.push(SKILL_ENEMY_TALK_SELECTOR_COCK_ID);
	}

	let skillId = talkArray[Math.randomInt(talkArray.length)];
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_TalkMouth = function(target) {
	let skillId = SKILL_ENEMY_TALK_SKILL_MOUTH_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SKILL_MOUTH_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_TALK_SKILL_MOUTH_JERKOFF_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_TalkBoobs = function(target) {
	let skillId = SKILL_ENEMY_TALK_SKILL_BOOBS_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SKILL_BOOBS_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_TALK_SKILL_BOOBS_JERKOFF_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_TalkPussy = function(target) {
	let skillId = SKILL_ENEMY_TALK_SKILL_PUSSY_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SKILL_PUSSY_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_TALK_SKILL_PUSSY_JERKOFF_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_TalkButt = function(target) {
	let skillId = SKILL_ENEMY_TALK_SKILL_BUTT_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SKILL_BUTT_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_TALK_SKILL_BUTT_JERKOFF_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_TalkCock = function(target) {
	let skillId = SKILL_ENEMY_TALK_SKILL_COCK_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_TALK_SKILL_COCK_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_TALK_SKILL_COCK_JERKOFF_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

// Sight Selectors
Game_Enemy.prototype.selectorEnemy_SightRandom = function(target) {
	let sightArray = [ SKILL_ENEMY_STARE_SELECTOR_MOUTH_ID, SKILL_ENEMY_STARE_SELECTOR_BOOBS_ID, SKILL_ENEMY_STARE_SELECTOR_PUSSY_ID, SKILL_ENEMY_STARE_SELECTOR_BUTT_ID ];
	let skillId = false;
	let success = false;
	while(sightArray.length > 0 && !success) {
		let index = Math.randomInt(sightArray.length);
		let skillId = sightArray.splice(index, 1)[0];
		if(this.meetsSkillConditionsEval($dataSkills[skillId], target)) {
			this.useAISkill(skillId, target);
			success = true;
		}
	}
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_SightMouth = function(target) {
	let skillId = SKILL_ENEMY_STARE_SKILL_MOUTH_ID;

	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_MOUTH_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_MOUTH_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_FACE_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_MOUTH_SWALLOW_ID;
	
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_SightBoobs = function(target) {
	let skillId = SKILL_ENEMY_STARE_SKILL_BOOBS_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_NIPPLES_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_NIPPLES_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BOOBS_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BOOBS_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_BOOBS_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_NIPPLES_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_NIPPLES_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_SightPussy = function(target) {
	let skillId = SKILL_ENEMY_STARE_SKILL_CLIT_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_PUSSY_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_PUSSY_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_CLIT_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_CLIT_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_PUSSY_CREAMPIE_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_PUSSY_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_PUSSY_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_SightButt = function(target) {
	let skillId = SKILL_ENEMY_STARE_SKILL_BUTT_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_ANAL_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_ANAL_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUTT_JERKOFF_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUTT_JERKOFF_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_ANAL_CREAMPIE_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_ANAL_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_ANAL_ID;
	else if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_ID], target))
		skillId = SKILL_ENEMY_STARE_SKILL_BUKKAKED_BUTT_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

// Petting Selectors
Game_Enemy.prototype.selectorEnemy_PettingRandom = function(target) {
	let pettingArray = [ SKILL_ENEMY_PETTING_SELECTOR_KISS_ID, SKILL_ENEMY_PETTING_SELECTOR_BOOBS_ID, SKILL_ENEMY_PETTING_SELECTOR_PUSSY_ID, SKILL_ENEMY_PETTING_SELECTOR_BUTT_ID ];
	let skillId = false;
	let success = false;
	while(pettingArray.length > 0 && !success) {
		let index = Math.randomInt(pettingArray.length);
		let skillId = pettingArray.splice(index, 1)[0];
		if(this.meetsSkillConditionsEval($dataSkills[skillId], target)) {
			this.useAISkill(skillId, target);
			success = true;
		}
	}
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_Kiss = function(target) { 
	let skillId = SKILL_ENEMY_KISS_ONE_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_KISS_TWO_ID], target)) 
		skillId = SKILL_ENEMY_KISS_TWO_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_PettingBoobs = function(target) {
	let skillId = SKILL_ENEMY_PETTING_SELECTOR_BOOBS_AREA_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_NIPPLES_AREA_ID], target))
		skillId = SKILL_ENEMY_PETTING_SELECTOR_NIPPLES_AREA_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_PettingPussy = function(target) {
	let skillId = SKILL_ENEMY_PETTING_SELECTOR_CLIT_AREA_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_PUSSY_AREA_ID], target))
		skillId = SKILL_ENEMY_PETTING_SELECTOR_PUSSY_AREA_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_PettingButt = function(target) {
	let skillId = SKILL_ENEMY_PETTING_SELECTOR_BUTT_AREA_ID;
	if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_PETTING_SELECTOR_ANAL_AREA_ID], target))
		skillId = SKILL_ENEMY_PETTING_SELECTOR_ANAL_AREA_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_SpankingButt = function(target) {
	let skillId = SKILL_ENEMY_SPANKING_ONE_ID;
	let reactionScore = target.getButtSpankingReactionScore();
	if(reactionScore >= VAR_DEF_RS_LV3_REQ)
		skillId = SKILL_ENEMY_SPANKING_THREE_ID;
	else if(reactionScore >= VAR_DEF_RS_LV2_REQ)	
		skillId = SKILL_ENEMY_SPANKING_TWO_ID;
	this.useAISkill(skillId, target);
	return skillId;
};


Game_Enemy.prototype.selectorEnemy_PettingBoobsArea = function(target) { 
	let skillId = SKILL_ENEMY_PETTING_BOOBS_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_PettingNipplesArea = function(target) { 
	let skillId = SKILL_ENEMY_PETTING_NIPPLES_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_PettingClitArea = function(target) {
	let skillId = SKILL_ENEMY_PETTING_CLIT_ID;
	if(this.canPlayWithPinkRotor(target)) skillId = SKILL_ENEMY_TOY_PLAY_PINK_ROTOR_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_PettingPussyArea = function(target) {
	let skillId = SKILL_ENEMY_PETTING_PUSSY_ID;
	if(this.canPlayWithPenisDildo(target)) skillId = SKILL_ENEMY_TOY_PLAY_PENIS_DILDO_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_PettingButtArea = function(target) { 
	let skillId = SKILL_ENEMY_PETTING_BUTT_ID;
	this.useAISkill(skillId, target);
	return skillId;
};
Game_Enemy.prototype.selectorEnemy_PettingAnalArea = function(target) { 
	let skillId = SKILL_ENEMY_PETTING_ANAL_ID;
	if(this.canPlayWithAnalBeads(target)) skillId = SKILL_ENEMY_TOY_PLAY_ANAL_BEADS_ID;
	this.useAISkill(skillId, target);
	return skillId;
};

Game_Enemy.prototype.selectorEnemy_SlimePoseSkill = function(target) { 
	let usingMouth = this.isUsingBodySlotPenis(MOUTH_ID);
	let usingPussy = this.isUsingBodySlotPenis(PUSSY_ID);
	
	this.orgasmLockOn();
	if(usingMouth) this.useAISkill(SKILL_ENEMY_POSESKILL_MOUTH_ID, target);
	if(usingPussy) this.useAISkill(SKILL_ENEMY_POSESKILL_PUSSY_ID, target);
	this.orgasmLockOff();
	this.useAISkill(SKILL_ENEMY_POSESKILL_ANAL_ID, target);
};

Game_Enemy.prototype.selectorEnemy_SlimeEjaculationSkill = function(target) {
	if(!this.isStateAffected(STATE_ENEMY_CAME_THIS_TURN_ID)) {
		//this._selectorEnemy_SlimeEjaculationSkill_called = true;
		this.addState(STATE_ENEMY_CAME_THIS_TURN_ID);
		let usingPussy = this.isUsingBodySlotPenis(PUSSY_ID);
		let usingMouth = this.isUsingBodySlotPenis(MOUTH_ID);
		
		this._slime_cameInsideAnal = false;
		this._slime_cameInsidePussy = false;
		this._slime_cameInsideMouth = false;
		
		if(usingMouth) {
			if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_EJACULATE_MOUTH_ID], target)) {
				this.useAISkill(SKILL_ENEMY_EJACULATE_MOUTH_ID, target);
				this._slime_cameInsideMouth = true;
			}
			else
				this.useAISkill(SKILL_ENEMY_EJACULATE_FACE_ID, target);
		}
		if(usingPussy) {
			if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_EJACULATE_PUSSY_ID], target)) {
				this.useAISkill(SKILL_ENEMY_EJACULATE_PUSSY_ID, target);
				this._slime_cameInsidePussy = true;
			}
			else
				this.useAISkill(SKILL_ENEMY_EJACULATE_BOOBS_ID, target);
		}
		
		if(this.meetsSkillConditionsEval($dataSkills[SKILL_ENEMY_EJACULATE_ANAL_ID], target)) {
			this.useAISkill(SKILL_ENEMY_EJACULATE_ANAL_ID, target);
			this._slime_cameInsideAnal = true;
		}
		else
			this.useAISkill(SKILL_ENEMY_EJACULATE_BUTT_ID, target);

	}
};


Game_Enemy.prototype.selectorEnemy_PoseJoinRandom = function(target) {
	let poseJoinArray = [ SKILL_ENEMY_POSEJOIN_RIGHT_HAND_ID, SKILL_ENEMY_POSEJOIN_LEFT_HAND_ID, SKILL_ENEMY_POSEJOIN_MOUTH_ID, SKILL_ENEMY_POSEJOIN_ANAL_ID, SKILL_ENEMY_POSEJOIN_BOOBS_ID, SKILL_ENEMY_POSEJOIN_PUSSY_ID ];
	let skillId = false;
	let success = false;
	while(poseJoinArray.length > 0 && !success) {
		let index = Math.randomInt(poseJoinArray.length);
		let skillId = poseJoinArray.splice(index, 1)[0];
		if(this.meetsSkillConditionsEval($dataSkills[skillId], target)) {
			this.useAISkill(skillId, target);
			success = true;
		}
	}
	return skillId;
};

//////////////
////////////////
// Damage Formulas
/////////////////
/////////////


//////////////
// Talk Damage Formula
/////////////////////

//Basic Talk only affects one desire area
Game_Enemy.prototype.dmgFormula_basicTalk = function(target, area, jerkingOff) {
	if(!jerkingOff) jerkingOff = false;
	var baseDmg = BASEDMG_TALK;
	var targetRateMultipler = target.elementRate(ELEMENT_TALK_ID);
	var targetSensitivity = target.talkSensitivity();
	var enemySkillLvl = this.talkLvl();

	let targetDesireGain = (baseDmg + enemySkillLvl) * targetRateMultipler;
	let targetPleasureGain = Math.round(targetDesireGain * targetSensitivity * (1 + enemySkillLvl * 0.1) * targetRateMultipler);

	//Gain desire
	if(area == AREA_RANDOM) target.gainRandomDesire(Math.round(targetDesireGain));
	else if(area == AREA_MOUTH) target.gainMouthDesire(Math.round(targetDesireGain));
	else if(area == AREA_BOOBS) target.gainBoobsDesire(Math.round(targetDesireGain));
	else if(area == AREA_PUSSY) target.gainPussyDesire(Math.round(targetDesireGain));
	else if(area == AREA_BUTT) target.gainButtDesire(Math.round(targetDesireGain));
	else if(area == AREA_COCK) {
		target.gainCockDesire(Math.round(targetDesireGain));
		this.addToEnemyTalkedCockRecord(target);
	}
	else console.log("Error dmgFormula basicTalk area: " + area);
	
	let pleasureFeedback = 0;
	if(jerkingOff) {
		let minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DIVIDE;
		if(target.isInDefeatedPose()) minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DEFEATED_DIVIDE;
		let minFeedbackOriginalValue = this.orgasmPoint() / minFeedbackDivider;
		let minFeedbackValue = minFeedbackOriginalValue;
		minFeedbackValue -= Math.random() * minFeedbackOriginalValue * 0.15;
		minFeedbackValue += Math.random() * minFeedbackOriginalValue * 0.15;
		pleasureFeedback = Math.max(pleasureFeedback, Math.round(minFeedbackValue));
		
		this.addToEnemyJerkOffCountRecord(target);
	}
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_TALK);
	
	//Gain pleasure
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.pleasureFeedback = pleasureFeedback;
	result.skillTypeEnemyTalk = true;
	
	this.addToEnemyTalkedCountRecord(target);
	if(targetPleasureGain > 0) target.addToActorTalkPleasureRecord(targetPleasureGain);
	
	target.emoteMasterManager();
	
	return 0;
};

///////////////////
// Sight Damage formula
//////////////////////

//Basic Sight only affects one desire area
Game_Enemy.prototype.dmgFormula_basicSight = function(target, sightType, jerkingOff) {
	if(!jerkingOff) jerkingOff = false;
	var baseDmg = BASEDMG_SIGHT;
	var targetRateMultipler = target.elementRate(ELEMENT_SIGHT_ID);
	target.calculateSightSensitivityRating();
	var targetSensitivity = target.sightSensitivity();
	var enemySkillLvl = this.sightLvl();
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetRateMultipler;
	let targetPleasureGain = Math.round(targetDesireGain * targetSensitivity * enemySkillLvl * targetRateMultipler);
	
	//Gain desire
	if(sightType === SIGHT_RANDOM) target.gainRandomDesire(targetDesireGain);
	else if(sightType === SIGHT_MOUTH || sightType === SIGHT_BUKKAKE_FACE || sightType === SIGHT_MOUTH_SWALLOW) target.gainMouthDesire(targetDesireGain);
	else if(sightType === SIGHT_BOOBS || sightType === SIGHT_NIPPLES || sightType === SIGHT_BUKKAKE_BOOBS) target.gainBoobsDesire(targetDesireGain);
	else if(sightType === SIGHT_CLIT || sightType === SIGHT_PUSSY || sightType === SIGHT_PUSSY_CREAMPIE) target.gainPussyDesire(targetDesireGain);
	else if(sightType === SIGHT_BUTT || sightType === SIGHT_ANAL || sightType === SIGHT_BUKKAKE_BUTT || sightType === SIGHT_ANAL_CREAMPIE) target.gainButtDesire(targetDesireGain);
	else console.log("Error dmgFormula basicSight sightType: " + sightType);
	
	if(sightType === SIGHT_MOUTH) target.addToActorSeenMouthRecord();
	else if(sightType === SIGHT_BOOBS || sightType === SIGHT_BUKKAKE_BOOBS) target.addToActorSeenBoobsRecord();
	else if(sightType === SIGHT_NIPPLES) target.addToActorSeenNipplesRecord();
	else if(sightType === SIGHT_CLIT) target.addToActorSeenClitRecord();
	else if(sightType === SIGHT_PUSSY || sightType === SIGHT_PUSSY_CREAMPIE) target.addToActorSeenPussyRecord();
	else if(sightType === SIGHT_BUTT || sightType === SIGHT_BUKKAKE_BUTT) target.addToActorSeenButtRecord();
	else if(sightType === SIGHT_ANAL || sightType === SIGHT_ANAL_CREAMPIE) target.addToActorSeenAnalRecord();
	
	if(sightType === SIGHT_PUSSY_CREAMPIE || (sightType === SIGHT_PUSSY && target._liquidCreampiePussy > 0)) target.addToActorSeenPussyCreampieRecord();
	else if(sightType === SIGHT_ANAL_CREAMPIE || (sightType === SIGHT_ANAL && target._liquidCreampieAnal > 0)) target.addToActorSeenAnalCreampieRecord();
	else if(sightType === SIGHT_BUKKAKE_FACE) target.addToActorSeenBukkakeFaceRecord();
	else if(sightType === SIGHT_BUKKAKE_BOOBS || (sightType === SIGHT_BOOBS && target._liquidBukkakeBoobs > 0)) target.addToActorSeenBukkakeBoobsRecord();
	else if(sightType === SIGHT_BUKKAKE_BUTT || 
	(sightType === SIGHT_BUTT && 
	(target._liquidBukkakeButt > 0 || target._liquidBukkakeButtTopRight > 0 || target._liquidBukkakeButtTopLeft > 0 || target._liquidBukkakeButtBottomRight > 0 || target._liquidBukkakeButtBottomLeft > 0))) target.addToActorSeenBukkakeButtRecord();
	else if(sightType === SIGHT_MOUTH_SWALLOW || (sightType === SIGHT_MOUTH && target._liquidSwallow > 0)) target.addToActorSeenMouthSwallowRecord();
	
	
	let pleasureFeedback = 0;
	if(jerkingOff) {
		let minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DIVIDE;
		if(target.isInDefeatedPose()) minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DEFEATED_DIVIDE;
		let minFeedbackOriginalValue = this.orgasmPoint() / minFeedbackDivider;
		let minFeedbackValue = minFeedbackOriginalValue;
		minFeedbackValue -= Math.random() * minFeedbackOriginalValue * 0.15;
		minFeedbackValue += Math.random() * minFeedbackOriginalValue * 0.15;
		pleasureFeedback = Math.max(pleasureFeedback, Math.round(minFeedbackValue));
		
		this.addToEnemyJerkOffCountRecord(target);
	}
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_SIGHT);
	
	//Gain pleasure
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.pleasureFeedback = pleasureFeedback;
	result.skillTypeEnemySight = true;
	
	this.addToEnemySawCountRecord(target);
	if(targetPleasureGain > 0) target.addToActorSightPleasureRecord(targetPleasureGain);
	
	//target.emoteMasterManager();
	
	return 0;
};

///////////////////
// Petting Damage formula
//////////////////////

//Basic Petting gives 60% of the desire to the targeted area, and remaining 40% to a random area with a cock weight of 3
Game_Enemy.prototype.dmgFormula_basicPetting = function(target, area) {
	let enemySkillLvl = this.pettingLvl();
	let staminaPercent = target.hp / target.mhp;
	let targetPettingRate = target.elementRate(ELEMENT_PETTING_ID) * (1.5 - staminaPercent/2);
	let targetStripRate = target.elementRate(ELEMENT_STRIP_ID) * (1.5 - staminaPercent/2);
	let baseDmg = 0;
	let targetDesire = 0;
	let targetSensitivity = 0;
	
	if(area == AREA_BOOBS) {
		baseDmg = BASEDMG_PETTING_BOOBS;
		targetDesire = target.boobsDesire;
		target.calculateBoobsSensitivityRating();
		targetSensitivity = target.boobsSensitivity();
		this.addToEnemyBoobsPettedCountRecord(target);
		if(this.isVisitorType) this.addToEnemyBoobshakeCountRecord(target);
		target.setTachieCutIn(CUTIN_PETTING_BOOBS_NAME);
	}
	else if(area == AREA_NIPPLES) {
		baseDmg = BASEDMG_PETTING_NIPPLES;
		targetDesire = target.boobsDesire;
		target.calculateNipplesSensitivityRating();
		targetSensitivity = target.nipplesSensitivity();
		this.addToEnemyNipplesPettedCountRecord(target);
		target.setTachieCutIn(CUTIN_PETTING_NIPPLES_NAME);
		
	}
	else if(area == AREA_CLIT) {
		baseDmg = BASEDMG_PETTING_PUSSY;
		targetDesire = target.pussyDesire;
		target.calculateClitSensitivityRating();
		targetSensitivity = target.clitSensitivity();
		this.addToEnemyClitPettedCountRecord(target);
		target.setTachieCutIn(CUTIN_PETTING_CLIT_NAME);
	}
	else if(area == AREA_PUSSY) {
		baseDmg = BASEDMG_PETTING_CLIT;
		targetDesire = target.pussyDesire;
		target.calculatePussySensitivityRating();
		targetSensitivity = target.pussySensitivity();
		this.addToEnemyPussyPettedCountRecord(target);
		target.increaseLiquidPussyJuice(enemySkillLvl);
		target.setTachieCutIn(CUTIN_PETTING_PUSSY_NAME);
	}
	else if(area == AREA_BUTT) {
		baseDmg = BASEDMG_PETTING_BUTT;
		targetDesire = target.buttDesire;
		target.calculateButtSensitivityRating();
		targetSensitivity = target.buttSensitivity();
		this.addToEnemyButtPettedCountRecord(target);
		if(this.isGoblinType)
			target.setTachieCutIn(CUTIN_PETTING_BUTT_GOBLIN_NAME);
		else
			target.setTachieCutIn(CUTIN_PETTING_BUTT_NAME);
	}
	else if(area == AREA_ANAL) {
		baseDmg = BASEDMG_PETTING_ANAL;
		targetDesire = target.buttDesire;
		target.calculateAnalSensitivityRating();
		targetSensitivity = target.analSensitivity();
		this.addToEnemyAnalPettedCountRecord(target);
		target.setTachieCutIn(CUTIN_PETTING_ANAL_NAME);
	}
	else if(area == AREA_FINGERS) {
		baseDmg = BASEDMG_SUCKING_FINGERS;
		targetDesire = target.cockDesire;
		targetSensitivity = target.mouthSensitivity();
		this.addToEnemyFingerSuckedCountRecord(target);
		target.setTachieCutIn(CUTIN_SUCKING_ENEMY_FINGERS_NAME);
	}
	else if(area == AREA_HANDSHAKE) {
		baseDmg = BASEDMG_VISITOR_HANDSHAKE;
		targetDesire = target.cockDesire;
		targetSensitivity = target.fingerSensitivity();
		this.addToEnemyHandshakeCountRecord(target);
		this.addToEnemyHandshakeWhileSexCountRecord(target);
		//target.setTachieCutIn(CUTIN_SUCKING_ENEMY_FINGERS_NAME);
	}
	
	else console.log("Error dmgFormula basicPetting area: " + area);
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetPettingRate;
	let targetPleasureGain = (targetDesireGain + this.dex) * (1 + enemySkillLvl * 0.1) * targetPettingRate * targetSensitivity;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 133));
	//targetPleasureGain = Math.max(targetPleasureGain, this.dex - target.end);
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	targetPleasureGain *= target.passivePettingPleasureRate();
	
	let clothingDmg = ((this.dex + enemySkillLvl) * 2) * targetStripRate;
	if(area == AREA_HANDSHAKE) clothingDmg = 0;
	
	//var staminaDmg = Math.max((this.str + enemySkillLvl + this.dex) - (target.str), this.dex);
	let staminaDmg = target.skillCost_karrynPetting();
	
	if(target.hp > 0) {
		target.gainEnduranceExp(20, this.enemyExperienceLvl());
		clothingDmg = Math.max(clothingDmg * 0.33, clothingDmg - target.str);
	}
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .6;
	result.desireRandomDamage = targetDesireGain * .4;
	result.desireCockWeight = 3;
	result.desireTarget = area;
	result.staminaDamage = staminaDmg;
	result.clothingDamage = clothingDmg;
	
	if(targetPleasureGain > 0) {
		if(area == AREA_BOOBS) target.addToActorBoobsPleasureRecord(targetPleasureGain);
		else if(area == AREA_NIPPLES) target.addToActorNipplesPleasureRecord(targetPleasureGain);
		else if(area == AREA_PUSSY) target.addToActorPussyPleasureRecord(targetPleasureGain);
		else if(area == AREA_CLIT) target.addToActorClitPleasureRecord(targetPleasureGain);
		else if(area == AREA_BUTT) target.addToActorButtPleasureRecord(targetPleasureGain);
		else if(area == AREA_ANAL) target.addToActorAnalPleasureRecord(targetPleasureGain);
		else if(area == AREA_FINGERS) target.addToActorMouthPleasureRecord(targetPleasureGain);
	}
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_PETTING);
	
	//target.emoteMasterManager();
	
	return 0;
};

////////////
// Kiss Damage Formula
/////////////////

//Basic Petting gives 40% of the desire to the targeted area, and remaining 60% to a random area with a cock weight of 4
Game_Enemy.prototype.dmgFormula_enemyKiss = function(target, lvl) {
	let enemySkillLvl = this.kissLvl();
	let staminaPercent = target.hp / target.mhp;
	let targetPettingRate = target.elementRate(ELEMENT_PETTING_ID) * (1.5 - staminaPercent/2);
	let targetStripRate = target.elementRate(ELEMENT_STRIP_ID) * (1.5 - staminaPercent/2);
	let targetDesire = target.mouthDesire;
	let targetSensitivity = target.mouthSensitivity();
	let baseDmg = BASEDMG_KISS_LVLONE;
	let targetPassiveEffect = target.passiveKissSkillRate();
	
	if(lvl == KISS_LVL_ONE) {
		target.setTachieCutIn(CUTIN_ENEMY_KISS_ONE_NAME);
		//target.setTachieCut_moveLeftToRight();
	}
	if(lvl == KISS_LVL_TWO) {
		baseDmg = BASEDMG_KISS_LVLTWO;
		target.setTachieCutIn(CUTIN_ENEMY_KISS_TWO_NAME);
		//target.setTachieCut_moveLeftToRight();
	}
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetPettingRate;
	let targetPleasureGain = (targetDesireGain + this.dex) * (1 + enemySkillLvl * 0.1) * targetPettingRate * targetSensitivity;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 133));
	//targetPleasureGain = Math.max(targetPleasureGain, this.dex - target.end);
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	targetPleasureGain *= target.passivePettingPleasureRate();
	
	let clothingDmg = ((this.dex + enemySkillLvl) * 2) * targetStripRate;
	
	let staminaDmg = target.skillCost_karrynKiss();
	
	let targetSkillRating = target.kissSkillRating();
	let enemyWeakness = this.weaknessToKiss();
	let enemyPleasureFeedback = targetSkillRating * target.dex * enemyWeakness * VAR_ENEMY_PLEASURE_FEEDBACK_REDUCER;
	if(target.hp > 0) {
		target.gainDexterityExp(30, this.enemyExperienceLvl());
		clothingDmg = Math.max(clothingDmg * 0.33, clothingDmg - target.str);
		enemyPleasureFeedback *= targetPassiveEffect;
	}
	else {
		enemyPleasureFeedback = enemyPleasureFeedback / 2;
	}
	
	target.result().pleasureFeedback = enemyPleasureFeedback;
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .4;
	result.desireRandomDamage = targetDesireGain * .6;
	result.desireCockWeight = 4;
	result.desireTarget = AREA_MOUTH;
	result.staminaDamage = staminaDmg;
	result.clothingDamage = clothingDmg;
	
	if(targetPleasureGain > 0) target.addToActorMouthPleasureRecord(targetPleasureGain);
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_KISS);
	this.addToEnemyKissedCountRecord(target);
	
	return 0;
};

///////////////////
// Spanking Damage formula
//////////////////////

//Spanking gives 30% of the desire to the butt, and remaining 70% to a random area with a cock weight of 4
Game_Enemy.prototype.dmgFormula_enemySpanking = function(target, spankLvl) {
	let baseDmg = BASEDMG_SPANK_LVLONE;
	let enemySkillLvl = this.sadismLvl();
	let staminaPercent = target.hp / target.mhp;
	let targetPettingRate = target.elementRate(ELEMENT_PETTING_ID) * (1.5 - staminaPercent/2);
	let targetStripRate = target.elementRate(ELEMENT_STRIP_ID) * (1.5 - staminaPercent/2);
	
	let targetDesire = target.buttDesire;
	target.calculateButtSensitivityRating();
	let targetSensitivity = target.buttSensitivity();
	this.addToEnemySpankCountRecord(target);
	
	
	if(spankLvl == SPANK_LVL_ONE) {
		target.setTachieCutIn(CUTIN_SPANKING_ONE_NAME);
		$gameScreen.startShake(REM_SPANK_LV1_SCREEN_SHAKE_POWER, REM_SPANK_LV1_SCREEN_SHAKE_SPEED, REM_SPANK_LV1_SCREEN_SHAKE_DURATION);
		target.useSpecialRemSpriteBattlerPos(SPANK_LVL_ONE);
	}
	else if(spankLvl == SPANK_LVL_TWO) {
		target.setTachieCutIn(CUTIN_SPANKING_TWO_NAME);
		$gameScreen.startShake(REM_SPANK_LV2_SCREEN_SHAKE_POWER, REM_SPANK_LV2_SCREEN_SHAKE_SPEED, REM_SPANK_LV2_SCREEN_SHAKE_DURATION);
		target.useSpecialRemSpriteBattlerPos(SPANK_LVL_TWO);
	}
	else if(spankLvl == SPANK_LVL_THREE) {
		target.setTachieCutIn(CUTIN_SPANKING_THREE_NAME);
		$gameScreen.startShake(REM_SPANK_LV3_SCREEN_SHAKE_POWER, REM_SPANK_LV3_SCREEN_SHAKE_SPEED, REM_SPANK_LV3_SCREEN_SHAKE_DURATION);
		target.useSpecialRemSpriteBattlerPos(SPANK_LVL_THREE);
	}
	
	let staminaDmg = Math.max(((this.str + enemySkillLvl) * 3) - (target.str), this.str);
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetPettingRate;
	let targetPleasureGain = (targetDesireGain + this.dex) * (1 + enemySkillLvl * 0.1) * targetPettingRate * targetSensitivity;
	
	let buttPleasureGain = targetPleasureGain * 0.75;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 133));
	//targetPleasureGain = Math.max(targetPleasureGain, this.dex - target.end);
	target.calculateMasochismSensitivityRating();
	//targetPleasureGain += (staminaDmg * (target.masochismSensitivity() + target.passiveSpankingPleasureRate()));
	let spankPleasureGain = (staminaDmg * (target.masochismSensitivity() + target.passiveSpankingPleasureRate()));
	
	targetPleasureGain = Math.min(buttPleasureGain * 2, spankPleasureGain);
	targetPleasureGain = Math.max(targetPleasureGain, buttPleasureGain * 0.5);
	//targetPleasureGain *= (target.masochismSensitivity() + target.passiveSpankingPleasureRate());
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	targetPleasureGain *= target.passivePettingPleasureRate();
	
	let clothingDmg = ((this.str + enemySkillLvl) * 2) * targetStripRate;
	
	if(target.hp > 0) {
		target.gainStaminaExp(20, this.enemyExperienceLvl());
		target.gainEnduranceExp(30, this.enemyExperienceLvl());
		clothingDmg = Math.max(clothingDmg * 0.33, clothingDmg - target.str);
	}
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .6;
	result.desireRandomDamage = targetDesireGain * .4;
	result.desireCockWeight = 3;
	result.desireTarget = AREA_BUTT;
	result.staminaDamage = staminaDmg;
	result.clothingDamage = clothingDmg;
	
	if(targetPleasureGain > 0) {
		target.addToActorMasochismPleasureRecord(targetPleasureGain);
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_SPANKING);
	}

	//target.emoteMasterManager();
	
	return 0;
};

///////////////////
// Petting Damage formula
//////////////////////

//Toy Play gives 60% of the desire to the targeted area, and remaining 40% to a random area with a cock weight of 4
Game_Enemy.prototype.dmgFormula_toyPlay = function(target, toy, insertion) {
	let enemySkillLvl = this.toyLvl();
	let staminaPercent = target.hp / target.mhp;
	let targetPettingRate = target.elementRate(ELEMENT_PETTING_ID) * (1.5 - staminaPercent/2);
	let targetStripRate = target.elementRate(ELEMENT_STRIP_ID) * (1.5 - staminaPercent/2);
	let baseDmg = 0;
	
	if(toy == TOY_PINK_ROTOR) {
		baseDmg = BASEDMG_TOY_PINK_ROTOR;
		var desireTarget = AREA_CLIT;
		var targetDesire = target.pussyDesire;
		target.calculateClitSensitivityRating();
		var targetSensitivity = target.clitSensitivity();
		if(insertion) {
			target.addToClitToyInsertedRecord(this);
			target.setToyInserted_ClitToy_PinkRotor(true);
			target.setTachieCutIn(CUTIN_TOY_PINK_ROTOR_INSERT_NAME);
		}
		else {
			target.addToClitToyUsedByEnemyRecord(this);
			target.setTachieCutIn(CUTIN_TOY_PINK_ROTOR_PLAY_NAME);
		}
	}
	else if(toy == TOY_PENIS_DILDO) {
		baseDmg = BASEDMG_TOY_PENIS_DILDO;
		var desireTarget = AREA_PUSSY;
		var targetDesire = target.pussyDesire;
		target.calculatePussySensitivityRating();
		var targetSensitivity = target.pussySensitivity();
		if(insertion) {
			target.stripOffPanties();
			target.addToPussyToyInsertedRecord(this);
			target.setToyInserted_PussyToy_PenisDildo(true);
			target.setTachieCutIn(CUTIN_TOY_PENIS_DILDO_INSERT_NAME);
		}
		else {
			target.addToPussyToyUsedByEnemyRecord(this);
			target.setTachieCutIn(CUTIN_TOY_PENIS_DILDO_PLAY_NAME);
		}
		
	}
	else if(toy == TOY_ANAL_BEAD) {
		baseDmg = BASEDMG_TOY_ANAL_BEADS;
		var desireTarget = AREA_ANAL;
		var targetDesire = target.buttDesire;
		target.calculateAnalSensitivityRating();
		var targetSensitivity = target.analSensitivity();
		if(insertion) {
			target.stripOffPanties();
			target.addToAnalToyInsertedRecord(this);
			target.setToyInserted_AnalToy_AnalBeads(true);
			target.setTachieCutIn(CUTIN_TOY_ANAL_BEADS_INSERT_NAME);
		}
		else {
			target.addToAnalToyUsedByEnemyRecord(this);
			target.setTachieCutIn(CUTIN_TOY_ANAL_BEADS_PLAY_NAME);
		}
	}

	else console.log("Error dmgFormula toyPlay toy: " + toy);
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetPettingRate;
	let targetPleasureGain = (targetDesireGain + this.dex) * (1 + enemySkillLvl * 0.1) * targetPettingRate * targetSensitivity;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 133));
	//targetPleasureGain = Math.max(targetPleasureGain, this.dex - target.end);
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	let clothingDmg = ((this.dex + enemySkillLvl) * 2) * targetStripRate;
	
	
	//var staminaDmg = Math.max((this.str + enemySkillLvl + this.dex) - (target.str), this.dex);
	let staminaDmg = target.skillCost_karrynPetting();
	
	if(target.hp > 0) {
		target.gainEnduranceExp(20, this.enemyExperienceLvl());
		clothingDmg = Math.max(clothingDmg * 0.33, clothingDmg - target.str);
	}
	
	targetPleasureGain *= target.passivePettingPleasureRate();
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .6;
	result.desireRandomDamage = targetDesireGain * .4;
	result.desireCockWeight = 4;
	result.desireTarget = desireTarget;
	result.staminaDamage = staminaDmg;
	result.clothingDamage = clothingDmg;
	
	if(targetPleasureGain > 0) {
		target.addToActorToysPleasureRecord(targetPleasureGain);
		
		if(toy == TOY_PENIS_DILDO) target.addToActorPussyPleasureRecord(targetPleasureGain);
		else if(toy == TOY_PINK_ROTOR) target.addToActorClitPleasureRecord(targetPleasureGain);
		else if(toy == TOY_ANAL_BEAD) target.addToActorAnalPleasureRecord(targetPleasureGain);
	}
	
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_TOY_PLAY);
	
	//target.emoteMasterManager();
	
	return 0;
};

///////////////////
// Sex Damage formula
//////////////////////

//Basic Sex gives 50% of the desire to cock, and remaining 50% to a random area with a cock weight of 0
Game_Enemy.prototype.dmgFormula_basicSex = function(target, sexAct) {
	let staminaPercent = target.hp / target.mhp;
	let targetSexRate = target.elementRate(ELEMENT_SEX_ID) * (1.5 - staminaPercent/2);
	let targetStripRate = target.elementRate(ELEMENT_STRIP_ID) * (1.5 - staminaPercent/2);
	let targetCockDesire = target.cockDesire;
	let baseDmg = 0;
	let targetSkillRating = 1;
	let enemySkillLvl = 1;
	let targetDesire = 0;
	let targetSensitivity = 1;
	let enemyWeakness = 1;
	let staminaDmg = 0;
	let targetPassiveEffect = 1;
	
	if(sexAct == SEXACT_BLOWJOB) {
		baseDmg = BASEDMG_SEXACT_BLOWJOB;
		enemySkillLvl = this.blowjobLvl();
		targetSkillRating = target.blowjobSkillRating(); 
		targetDesire = target.mouthDesire + targetCockDesire;
		targetSensitivity = target.mouthSensitivity();
		enemyWeakness = this.weaknessToBlowjob();
		staminaDmg = target.skillCost_karrynBlowjob();
		targetPassiveEffect = target.passiveBlowjobSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_BLOWJOB);
	}
	else if(sexAct == SEXACT_TITTYFUCK) {
		baseDmg = BASEDMG_SEXACT_TITTYFUCK;
		enemySkillLvl = this.tittyFuckLvl();
		target.calculateTittyFuckSkillRating();
		targetSkillRating = target.tittyFuckSkillRating(); 
		targetDesire = target.boobsDesire + targetCockDesire;
		target.calculateNipplesSensitivityRating();
		target.calculateBoobsSensitivityRating();
		targetSensitivity = (target.boobsSensitivity() + target.nipplesSensitivity()) / 2;
		enemyWeakness = this.weaknessToTittyFuck();
		staminaDmg = target.skillCost_karrynTittyFuck();
		targetPassiveEffect = target.passiveTittyFuckSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_TITTYFUCK);
	}
	else if(sexAct == SEXACT_PUSSYSEX) {
		baseDmg = BASEDMG_SEXACT_PUSSYSEX;
		enemySkillLvl = this.pussySexLvl();
		target.calculatePussySexSkillRating();
		targetSkillRating = target.pussySexSkillRating(); 
		targetDesire = target.pussyDesire + targetCockDesire;
		target.calculatePussySensitivityRating();
		targetSensitivity = target.pussySensitivity();
		enemyWeakness = this.weaknessToPussy();
		staminaDmg = target.skillCost_karrynPussySex();
		targetPassiveEffect = target.passivePussySexSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_PUSSY_SEX);
	}
	else if(sexAct == SEXACT_CUNNILINGUS) {
		baseDmg = BASEDMG_SEXACT_CUNNILINGUS;
		enemySkillLvl = this.kissLvl();
		targetSkillRating = 0; 
		targetDesire = 2 * target.pussyDesire;
		target.calculateClitSensitivityRating();
		targetSensitivity = target.clitSensitivity();
		enemyWeakness = 0;
		staminaDmg = 0;
		target.increaseLiquidPussyJuice(enemySkillLvl);
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_CUNNILINGUS);
	}
	else if(sexAct == SEXACT_ANALSEX) {
		baseDmg = BASEDMG_SEXACT_ANALSEX;
		enemySkillLvl = this.analSexLvl();
		target.calculateAnalSexSkillRating();
		targetSkillRating = target.analSexSkillRating(); 
		targetDesire = target.buttDesire + targetCockDesire;
		target.calculateAnalSensitivityRating();
		targetSensitivity = target.analSensitivity();
		enemyWeakness = this.weaknessToAnal();
		staminaDmg = target.skillCost_karrynAnalSex();
		targetPassiveEffect = target.passiveAnalSexSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_ANAL_SEX);
	}
	else if(sexAct == SEXACT_RIMJOB) {
		baseDmg = BASEDMG_SEXACT_RIMJOB;
		enemySkillLvl = this.sadismLvl();
		targetSkillRating = target.rimjobSkillRating();
		targetDesire = target.mouthDesire * 2;
		target.calculateSadismSensitivityRating();
		targetSensitivity = target.masochismSensitivity();
		enemyWeakness = this.weaknessToRimjob() + this.sadismLvl() * 0.1;
		staminaDmg = target.skillCost_karrynRimjob();
		targetPassiveEffect = target.passiveRimjobSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_SADISM);
	}
	else if(sexAct == SEXACT_FOOTJOB) {
		baseDmg = BASEDMG_SEXACT_FOOTJOB;
		enemySkillLvl = this.masochismLvl();
		targetSkillRating = target.footjobSkillRating(); 
		targetDesire = target.cockDesire * 2;
		target.calculateMasochismSensitivityRating();
		targetSensitivity = target.sadismSensitivity();
		enemyWeakness = this.weaknessToFootjob() + this.masochismLvl() * 0.1;
		staminaDmg = target.skillCost_karrynFootjob();
		targetPassiveEffect = target.passiveFootjobSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_MASOCHISM);
	}
	else if(sexAct == SEXACT_HANDJOB) {
		baseDmg = BASEDMG_SEXACT_HANDJOB;
		enemySkillLvl = this.handjobLvl();
		targetSkillRating = target.handjobSkillRating(); 
		targetDesire =  2 * targetCockDesire;
		targetSensitivity = target.fingerSensitivity();
		enemyWeakness = this.weaknessToHandjob();
		staminaDmg = target.skillCost_karrynHandjob();
		targetPassiveEffect = target.passiveHandjobSkillRate();
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_HANDJOB);
	}
	else console.log("Error dmgFormula basicSex sexAct: " + sexAct);
	
	let targetDesireGain = (baseDmg + enemySkillLvl) * targetSexRate;
	let targetPleasureGain = (targetDesireGain + this.dex) * (1 + enemySkillLvl * 0.1) * targetSexRate * targetSensitivity;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 133));
	//targetPleasureGain = Math.max(targetPleasureGain, this.dex - target.end);
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	let enemyPleasureFeedback = target.dex * targetSkillRating *  enemyWeakness * VAR_ENEMY_PLEASURE_FEEDBACK_REDUCER;
	let clothingDmg = ((this.dex + enemySkillLvl) * 2) * targetStripRate;
	
	if(target.hp > 0) {
		target.gainDexterityExp(30, this.enemyExperienceLvl());
		target.gainEnduranceExp(30, this.enemyExperienceLvl());
		clothingDmg = Math.max(clothingDmg * 0.33, clothingDmg - target.str);
		enemyPleasureFeedback *= targetPassiveEffect;
	}
	else {
		enemyPleasureFeedback = enemyPleasureFeedback / 2;
	}
	
	if(!this.isStateAffected(STATE_JUST_JOINED_ID) && !this.isBossType) {
		let minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DIVIDE;
		if(target.isInDefeatedPose()) minFeedbackDivider = VAR_MIN_PLEASURE_FEEDBACK_DEFEATED_DIVIDE;
		let minFeedbackOriginalValue = this.orgasmPoint() / minFeedbackDivider;
		let minFeedbackValue = minFeedbackOriginalValue;
		minFeedbackValue -= Math.random() * minFeedbackOriginalValue * 0.15;
		minFeedbackValue += Math.random() * minFeedbackOriginalValue * 0.15;
		enemyPleasureFeedback = Math.max(enemyPleasureFeedback, Math.round(minFeedbackValue));
	}

	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .5;
	result.desireRandomDamage = targetDesireGain * .5;
	result.desireCockWeight = 0;
	result.desireTarget = sexAct;
	result.staminaDamage = staminaDmg * 0.6;
	result.pleasureFeedback = enemyPleasureFeedback;
	result.clothingDamage = clothingDmg;
	
	if(targetPleasureGain > 0) {
		if(sexAct == SEXACT_BLOWJOB);
		else if(sexAct == SEXACT_TITTYFUCK) target.addToActorBoobsPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_PUSSYSEX) target.addToActorPussyPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_ANALSEX) target.addToActorAnalPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_HANDJOB) target.addToActorFingersPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_CUNNILINGUS) target.addToActorClitPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_FOOTJOB) target.addToActorSadismPleasureRecord(targetPleasureGain);
		else if(sexAct == SEXACT_RIMJOB) target.addToActorMasochismPleasureRecord(targetPleasureGain);
	}
	
	//target.emoteMasterManager();
	
	return 0;
};

///////////////////
// Ejaculation damage formula
//////////////////////

//30% of desire to cock, 70% to random area with a cock weight of 5
//Desire is also cock + area
Game_Enemy.prototype.dmgFormula_creampie = function(target, area) {
	let enemyCock = this.enemyCock();
	let multipler = 1;
	if(area == CUM_CREAMPIE_PUSSY) multipler = target.passivePussyCreampieEVMultipler(this);
	else if(area == CUM_CREAMPIE_ANAL) multipler = target.passiveAnalCreampieEVMultipler(this);
	let ejaculateVolume = this.ejaculationVolume(multipler);
	let targetSexRate = target.elementRate(ELEMENT_SEX_ID);
	let targetDesire = target.cockDesire;
	let targetSensitivity = 0;
	
	if(area == CUM_CREAMPIE_PUSSY) {
		target.calculatePussySensitivityRating();
		target.calculatePussyCreampieSensitivityRating();
		targetDesire += target.pussyDesire;
		targetSensitivity = target.pussyCreampieSensitivity();
	}
	else if(area == CUM_CREAMPIE_ANAL) {
		target.calculateAnalSensitivityRating();
		target.calculateAnalCreampieSensitivityRating();
		targetDesire += target.analDesire;
		targetSensitivity = target.analCreampieSensitivity();
	}
	else console.log("Error dmgFormula creampie area: " + area);
	
	let targetDesireGain = (ejaculateVolume) * targetSexRate;
	let targetPleasureGain = (ejaculateVolume + this.dex) * targetSensitivity * targetSexRate;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 266));
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	if(targetSexRate < 2) {
		var staminaDmg = (this.str * 4 + ejaculateVolume * 10) - (target.str * 2);
		staminaDmg = staminaDmg * (2 - targetSexRate);
	}
	
	if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(PUSSY_ID))
		$gameTroop._lastEnemySlotToCum = PUSSY_ID;
	else if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(ANAL_ID))
		$gameTroop._lastEnemySlotToCum = ANAL_ID;
	else if(this.isStateAffected(STATE_TITTYFUCK_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(BOOBS_ID))
		$gameTroop._lastEnemySlotToCum = BOOBS_ID;
	else if(this.isStateAffected(STATE_RIGHTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(RIGHT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = RIGHT_HAND_ID;
	else if(this.isStateAffected(STATE_LEFTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(LEFT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = LEFT_HAND_ID;
	else if(this.isStateAffected(STATE_ANAL_ENEMYPOSE_ID) || this.isStateAffected(STATE_RIMMING_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(MOUTH_ID) || this.isUsingBodySlotAnus(MOUTH_ID))
		$gameTroop._lastEnemySlotToCum = MOUTH_ID;
	else if(this.isUsingBodySlotPenis(CLIT_ID))
		$gameTroop._lastEnemySlotToCum = CLIT_ID;
	else if(this.isStateAffected(STATE_FOOTJOB_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(FEET_ID))
		$gameTroop._lastEnemySlotToCum = FEET_ID;
	else if(this.isUsingBodySlotPenis(OTHER_1_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_1_ID;
	else if(this.isUsingBodySlotPenis(OTHER_2_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_2_ID;
	else if(this.isUsingBodySlotPenis(OTHER_3_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_3_ID;
	else if(this.isUsingBodySlotPenis(OTHER_4_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_4_ID;
	else
		$gameTroop._lastEnemySlotToCum = -1;
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .3;
	result.desireRandomDamage = targetDesireGain * .7;
	result.desireCockWeight = 5;
	result.staminaDamage = staminaDmg;
	result.ejaculateDamage = ejaculateVolume;
	
	if(area == CUM_CREAMPIE_PUSSY) {
		result.ejaculatePussy = ejaculateVolume;
		if(targetPleasureGain > 0) target.addToActorPussyCreampiePleasureRecord(targetPleasureGain);
		this.addToEnemyPussyCreampieCountRecord(target);
		if(enemyCock == 'green') {
			target.setTachieCutIn(CUTIN_EJACULATE_PUSSYCREAMPIE_GREEN_NAME);
		}
		else if(enemyCock == 'slime') {
			target.setTachieCutIn(CUTIN_EJACULATE_PUSSYCREAMPIE_SLIME_NAME);
		}
		else {
			target.setTachieCutIn(CUTIN_EJACULATE_PUSSYCREAMPIE_NAME);
		}
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_PUSSY_CREAMPIE);
	}
	else if(area == CUM_CREAMPIE_ANAL) {
		result.ejaculateAnal = ejaculateVolume;
		if(targetPleasureGain > 0) target.addToActorAnalCreampiePleasureRecord(targetPleasureGain);
		this.addToEnemyAnalCreampieCountRecord(target);
		if(enemyCock == 'green') {
			target.setTachieCutIn(CUTIN_EJACULATE_ANALCREAMPIE_GREEN_NAME);
		}
		else if(enemyCock == 'slime') {
			target.setTachieCutIn(CUTIN_EJACULATE_ANALCREAMPIE_SLIME_NAME);
		}
		else {
			target.setTachieCutIn(CUTIN_EJACULATE_ANALCREAMPIE_NAME);
		}
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_ANAL_CREAMPIE);
	}

	target.gainCharmExp(12, this.enemyExperienceLvl());
	target.gainEnduranceExp(35, this.enemyExperienceLvl());
	
	//target.emoteMasterManager();
	
	return 0;
};

//30% of desire to cock, 70% to random area with a cock weight of 4
//Desire is also cock + area
Game_Enemy.prototype.dmgFormula_swallow = function(target, area) {
	let ejaculateVolume = this.ejaculationVolume(target.passiveSwallowEVMultipler(this));
	let targetSexRate = target.elementRate(ELEMENT_SEX_ID);
	let targetDesire = target.cockDesire;
	let targetSensitivity = target.swallowSensitivity();

	targetDesire += target.mouthDesire;
	
	let targetDesireGain = (ejaculateVolume) * targetSexRate;
	let targetPleasureGain = (ejaculateVolume + this.dex) * targetSensitivity * targetSexRate;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 266));
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	
	let staminaDmg = 0;
	if(targetSexRate < 2) {
		staminaDmg = (this.str * 4 + ejaculateVolume * 10) - (target.str * 2);
		staminaDmg = staminaDmg * (2 - targetSexRate);
	}
	
	if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(PUSSY_ID))
		$gameTroop._lastEnemySlotToCum = PUSSY_ID;
	else if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(ANAL_ID))
		$gameTroop._lastEnemySlotToCum = ANAL_ID;
	else if(this.isStateAffected(STATE_TITTYFUCK_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(BOOBS_ID))
		$gameTroop._lastEnemySlotToCum = BOOBS_ID;
	else if(this.isStateAffected(STATE_RIGHTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(RIGHT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = RIGHT_HAND_ID;
	else if(this.isStateAffected(STATE_LEFTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(LEFT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = LEFT_HAND_ID;
	else if(this.isStateAffected(STATE_ANAL_ENEMYPOSE_ID) || this.isStateAffected(STATE_RIMMING_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(MOUTH_ID) || this.isUsingBodySlotAnus(MOUTH_ID))
		$gameTroop._lastEnemySlotToCum = MOUTH_ID;
	else if(this.isUsingBodySlotPenis(CLIT_ID))
		$gameTroop._lastEnemySlotToCum = CLIT_ID;
	else if(this.isStateAffected(STATE_FOOTJOB_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(FEET_ID))
		$gameTroop._lastEnemySlotToCum = FEET_ID;
	else if(this.isUsingBodySlotPenis(OTHER_1_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_1_ID;
	else if(this.isUsingBodySlotPenis(OTHER_2_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_2_ID;
	else if(this.isUsingBodySlotPenis(OTHER_3_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_3_ID;
	else if(this.isUsingBodySlotPenis(OTHER_4_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_4_ID;
	else
		$gameTroop._lastEnemySlotToCum = -1;
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .3;
	result.desireRandomDamage = targetDesireGain * .7;
	result.desireCockWeight = 4;
	result.staminaDamage = staminaDmg;
	result.ejaculateDamage = ejaculateVolume;
	result.ejaculateMouth = ejaculateVolume;
	
	if(targetPleasureGain > 0) target.addToActorSwallowPleasureRecord(targetPleasureGain);
	this.addToEnemySwallowCountRecord(target);

	target.setTachieCutIn(CUTIN_EJACULATE_MOUTH_NAME);
	target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_CUM_SWALLOW);
	
	target.gainCharmExp(12, this.enemyExperienceLvl());
	target.gainDexterityExp(20, this.enemyExperienceLvl());
	target.gainEnduranceExp(20, this.enemyExperienceLvl());
	
	//target.emoteMasterManager();
	
	return 0;
};


//30% of desire to cock, 70% to random area with a cock weight of 3
Game_Enemy.prototype.dmgFormula_bukkake = function(target, area) {
	let enemyCock = this.enemyCock();
	let ejaculateVolume = this.ejaculationVolume(target.passiveBukkakeEVMultipler(this));
	let targetSexRate = target.elementRate(ELEMENT_SEX_ID);
	let targetDesire = target.cockDesire;
	let targetSensitivity = target.bukkakeSensitivity();

	let targetDesireGain = (ejaculateVolume) * targetSexRate;
	let targetPleasureGain = (ejaculateVolume + this.dex) * targetSensitivity * targetSexRate;
	//targetPleasureGain -= (target.end * 2 * (1 - targetDesire / 266));
	targetPleasureGain *= (1 + (0.02 * (this.dex - target.end)));
	

	if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(PUSSY_ID))
		$gameTroop._lastEnemySlotToCum = PUSSY_ID;
	else if(this.isStateAffected(STATE_PUSSY_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(ANAL_ID))
		$gameTroop._lastEnemySlotToCum = ANAL_ID;
	else if(this.isStateAffected(STATE_TITTYFUCK_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(BOOBS_ID))
		$gameTroop._lastEnemySlotToCum = BOOBS_ID;
	else if(this.isStateAffected(STATE_RIGHTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(RIGHT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = RIGHT_HAND_ID;
	else if(this.isStateAffected(STATE_LEFTHAND_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(LEFT_HAND_ID))
		$gameTroop._lastEnemySlotToCum = LEFT_HAND_ID;
	else if(this.isStateAffected(STATE_ANAL_ENEMYPOSE_ID) || this.isStateAffected(STATE_RIMMING_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(MOUTH_ID) || this.isUsingBodySlotAnus(MOUTH_ID))
		$gameTroop._lastEnemySlotToCum = MOUTH_ID;
	else if(this.isUsingBodySlotPenis(CLIT_ID))
		$gameTroop._lastEnemySlotToCum = CLIT_ID;
	else if(this.isStateAffected(STATE_FOOTJOB_ENEMYPOSE_ID) || this.isUsingBodySlotPenis(FEET_ID))
		$gameTroop._lastEnemySlotToCum = FEET_ID;
	else if(this.isUsingBodySlotPenis(OTHER_1_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_1_ID;
	else if(this.isUsingBodySlotPenis(OTHER_2_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_2_ID;
	else if(this.isUsingBodySlotPenis(OTHER_3_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_3_ID;
	else if(this.isUsingBodySlotPenis(OTHER_4_ID))
		$gameTroop._lastEnemySlotToCum = OTHER_4_ID;
	else
		$gameTroop._lastEnemySlotToCum = -1;
	
	let result = target.result();
	result.pleasureDamage = targetPleasureGain;
	result.desireAreaDamage = targetDesireGain * .3;
	result.desireRandomDamage = targetDesireGain * .7;
	result.desireCockWeight = 3;
	result.ejaculateDamage = ejaculateVolume;
	
	if(area == CUM_BUKKAKE_FACE) {
		result.bukkakeFace = ejaculateVolume;
		targetSensitivity *= (target.mouthSensitivity() / 2);
	}
	else if(area == CUM_BUKKAKE_LEFTARM) {
		result.bukkakeLeftArm = ejaculateVolume;
	}
	else if(area == CUM_BUKKAKE_RIGHTARM) {
		result.bukkakeRightArm = ejaculateVolume;
	}
	else if(area == CUM_BUKKAKE_LEFTLEG) {
		result.bukkakeLeftLeg = ejaculateVolume;
	}
	else if(area == CUM_BUKKAKE_RIGHTLEG) {
		result.bukkakeRightLeg = ejaculateVolume;
	}
	else if(area == CUM_BUKKAKE_BOOBS) {
		result.bukkakeBoobs = ejaculateVolume;
		target.calculateBoobsSensitivityRating();
		targetSensitivity *= target.boobsSensitivity();
		targetSensitivity *= target.passiveBukkakeBoobsPleasureRate();
	}
	else if(area == CUM_BUKKAKE_BUTT || area == CUM_BUKKAKE_BUTT_TOPRIGHT || area == CUM_BUKKAKE_BUTT_TOPLEFT || area == CUM_BUKKAKE_BUTT_BOTTOMRIGHT || area == CUM_BUKKAKE_BUTT_BOTTOMLEFT) {
		result.bukkakeButt = ejaculateVolume;
		target.calculateButtSensitivityRating();
		targetSensitivity *= target.buttSensitivity();
	}
	else if(area == CUM_INTO_MUG) {
		targetPleasureGain = 0;
		result.pleasureDamage = 0;
		result.desireCockWeight = 5;
	}
	else if(area == CUM_ONTO_DESK) {
		targetPleasureGain = 0;
		result.pleasureDamage = 0;
		result.desireCockWeight = 5;
	}
	
	target.gainCharmExp(14, this.enemyExperienceLvl());
	
	if(targetPleasureGain > 0) 
		target.addToActorBukkakePleasureRecord(targetPleasureGain);
	
	if(enemyCock == 'green') {
		target.setTachieCutIn(CUTIN_EJACULATE_BUKKAKE_GREEN_NAME);
	}
	else if(enemyCock == 'slime') {
		target.setTachieCutIn(CUTIN_EJACULATE_BUKKAKE_SLIME_NAME);
	}
	else {
		target.setTachieCutIn(CUTIN_EJACULATE_BUKKAKE_NAME);
	}
	
	if(area != CUM_INTO_MUG && area != CUM_ONTO_DESK) {
		this.addToEnemyBukkakeCountRecord(target);
		target.justGotHitBySkillType(JUST_SKILLTYPE_ENEMY_BUKKAKE);
	}
	else if(area == CUM_INTO_MUG) {
		if(target.tachieStraw !== REM_TACHIE_NULL)
			target.updateTachieStraw();
	}
	
	//target.emoteMasterManager();
	
	return 0;
};

///////////////
/////////////////////
// Post Damage Formulas
////////////////////
//////////////////

////////////////
// Post Damage Ejaculations
///////////////////////

Game_Enemy.prototype.postDamage_bukkake = function(target, area) {
	let result = target.result();
	let ejaculateVolume = result.ejaculateDamage;
	let semen = ejaculateVolume;
	this.gainMp(-ejaculateVolume);
	if(this.mp > 0 && target.passivePostBukkakeBonusEjaculationStock()) this._ejaculationStock++;
	this.postOrgasmPleasure();
	
	if(area == CUM_BUKKAKE_FACE) {
		semen = result.bukkakeFace;
		target.increaseLiquidBukkakeFace(semen);
		target.addToActorBukkakeFaceMLRecord(ejaculateVolume);
	}
	else if(area == CUM_BUKKAKE_RIGHTARM) {
		semen = result.bukkakeRightArm;
		target.increaseLiquidBukkakeRightArm(semen);
		target.addToActorBukkakeArmsMLRecord(ejaculateVolume);
	}
	else if(area == CUM_BUKKAKE_LEFTARM) {
		semen = result.bukkakeLeftArm;
		target.increaseLiquidBukkakeLeftArm(semen);
		target.addToActorBukkakeLegsMLRecord(ejaculateVolume);
	}
	
	else if(area == CUM_BUKKAKE_RIGHTLEG) {
		semen = result.bukkakeRightLeg;
		target.increaseLiquidBukkakeRightLeg(semen);
		target.addToActorBukkakeLegsMLRecord(ejaculateVolume);
	}
	else if(area == CUM_BUKKAKE_LEFTLEG) {
		semen = result.bukkakeLeftLeg;
		target.increaseLiquidBukkakeLeftLeg(semen);
		target.addToActorBukkakeArmsMLRecord(ejaculateVolume);
	}
	
	else if(area == CUM_BUKKAKE_BOOBS) {
		semen = result.bukkakeBoobs;
		target.increaseLiquidBukkakeBoobs(semen);
		target.addToActorBukkakeBoobsMLRecord(ejaculateVolume);
	}
	else if(area == CUM_BUKKAKE_BUTT) {
		semen = result.bukkakeButt;
		target.increaseLiquidBukkakeButt(semen);
		target.addToActorBukkakeButtMLRecord(ejaculateVolume);

		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	
	else if(area == CUM_BUKKAKE_BUTT_TOPRIGHT) {
		semen = result.bukkakeButt;
		let runoff = 0
		if(Math.random() < 0.2) runoff = Math.round(Math.randomInt(semen * 0.15));
		target.increaseLiquidBukkakeButtTopRight(Math.max(1,semen - runoff));
		target.increaseLiquidBukkakeButt(runoff);
		target.addToActorBukkakeButtMLRecord(ejaculateVolume);
		
		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	else if(area == CUM_BUKKAKE_BUTT_TOPLEFT) {
		semen = result.bukkakeButt;
		let runoff = 0
		if(Math.random() < 0.2) runoff = Math.round(Math.randomInt(semen * 0.15));
		target.increaseLiquidBukkakeButtTopLeft(Math.max(1,semen - runoff));
		if(runoff > 0) {
			if(Math.random() < 0.33) {
				target.increaseLiquidBukkakeFace(runoff);
			}
			else if(Math.random() < 0.66) {
				target.increaseLiquidBukkakeBoobs(runoff);
			}
			else {
				target.increaseLiquidBukkakeLeftArm(runoff);
			}
		}
		target.addToActorBukkakeButtMLRecord(ejaculateVolume);
		
		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	else if(area == CUM_BUKKAKE_BUTT_BOTTOMRIGHT) {
		semen = result.bukkakeButt;
		target.increaseLiquidBukkakeButtBottomRight(semen);
		target.addToActorBukkakeButtMLRecord(ejaculateVolume);
		
		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	else if(area == CUM_BUKKAKE_BUTT_BOTTOMLEFT) {
		semen = result.bukkakeButt;
		target.increaseLiquidBukkakeButtBottomLeft(semen);
		target.addToActorBukkakeButtMLRecord(ejaculateVolume);
		
		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	else if(area == CUM_ONTO_DESK) {
		target.increaseLiquidOnDesk(semen);
	}
	
	if(target.isInWaitressSexPose()) {
		semen = result.ejaculateDamage;
		target.postDamage_ejaculation_waitressSex(target, area, semen);
	}
	else if(target.isInReceptionistPose()) {
		target.postDamage_ejaculation_receptionistBattle(this, area, semen);
	}
	
	//target.emoteMasterManager();
	
	if(this.isSlimeType && target.isInSlimeAnalPiledriverSexPose()) {
		
	}
	else if(this.isPoseMaster()) {
		if(!BattleManager.swappedPoseMaster(this))
			BattleManager.pullOutAllEnemies();
	}
	else {
		BattleManager.pullOutEnemy(this);
	}
};

Game_Enemy.prototype.postDamage_swallow = function(target, area) {
	let result = target.result();
	let ejaculateVolume = result.ejaculateDamage;
	
	this.gainMp(-ejaculateVolume);
	this.postOrgasmPleasure();

	let semen = result.ejaculateMouth;
	
	if(target.isInWaitressSexPose()) {
		semen = target.postDamage_ejaculation_waitressSex(this, area, semen);
	}
	else if(target.isInReceptionistPose()) {
		target.postDamage_ejaculation_receptionistBattle(this, area, semen);
	}
	
	target.increaseLiquidSwallow(semen);
	target.addToActorSwallowMLRecord(ejaculateVolume);
	//target.emoteMasterManager();
	
	let conversion = target.convertSwallowToEnergy(ejaculateVolume);
	if(conversion > 0) target.gainMp(conversion);
	
	this.checkIfStillErectedWhileInPose();
};

Game_Enemy.prototype.postDamage_creampie = function(target, area) {
	let result = target.result();
	let ejaculateVolume = result.ejaculateDamage;
	let semen = 0;
	
	this.gainMp(-ejaculateVolume);
	this.postOrgasmPleasure();

	if(area == CUM_CREAMPIE_PUSSY) {
		semen = result.ejaculatePussy;
		target.increaseLiquidCreampiePussy(semen);
		target.addToActorPussyCreampieMLRecord(ejaculateVolume);
		let conversion = target.convertPussyCreampieToEnergy(ejaculateVolume);
		if(conversion > 0) target.gainMp(conversion);
	}
	else if(area == CUM_CREAMPIE_ANAL) {
		semen = result.ejaculateAnal;
		target.increaseLiquidCreampieAnal(semen);
		target.addToActorAnalCreampieMLRecord(ejaculateVolume);
		let conversion = target.convertAnalCreampieToEnergy(ejaculateVolume);
		if(conversion > 0) target.gainMp(conversion);
		
		if(this.isSlimeType) {
			this._ejaculationStock--;
			this._ejaculationCount++;
			this.setPleasureToArousalPoint();
			this.addState(STATE_ENEMY_POST_CUM_STUN_ID);
		}
	}
	
	if(target.isInWaitressSexPose()) {
		target.postDamage_ejaculation_waitressSex(target, area, semen);
	}
	else if(target.isInReceptionistPose()) {
		target.postDamage_ejaculation_receptionistBattle(this, area, semen);
	}
	
	//target.emoteMasterManager();
	
	this.checkIfStillErectedWhileInPose();
};