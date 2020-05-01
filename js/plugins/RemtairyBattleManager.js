﻿var Remtairy = Remtairy || {};
Remtairy.BM = Remtairy.BM || {};

//Prison level normal battle bgm
const BM_EB_BGM_NAME = "Battle1";
const BM_EB_BGM_VOLUME = 67;

//Level 1 Normal Battle BGM
const BM_PLVL1_NORMAL_BGM_NAME = "Battle1";
const BM_PLVL1_NORMAL_BGM_VOLUME = 67;
//Level 2 Normal Battle BGM
const BM_PLVL2_NORMAL_BGM_NAME = "Battle1";
const BM_PLVL2_NORMAL_BGM_VOLUME = 67;

//Prison level boss battle bgm
//Yasu Tutorial Battle
const BM_TUTORIAL_BGM_NAME = "S_Prologue2";
const BM_TUTORIAL_BGM_VOLUME = 80;
//Tonkin Battle 
const BM_PLVL1_BOSS_BGM_NAME = "S_Prologue2";
const BM_PLVL1_BOSS_BGM_VOLUME = 80;
//Dr. Cargill Battle 
const BM_PLVL2_BOSS_BGM_NAME = "Battle3"; 
const BM_PLVL2_BOSS_BGM_VOLUME = 85;

//sex pose
const BM_SEX_BGM_NAME = "H_Gangbang1";
const BM_SEX_BGM_PAN = 0;
const BM_SEX_BGM_PITCH = 100;
const BM_SEX_BGM_VOLUME = 80;


//waitress job
const BM_WAITRESS_JOB_BGM_NAME = "Bar2";
const BM_WAITRESS_JOB_BGM_PAN = 0;
const BM_WAITRESS_JOB_BGM_PITCH = 100;
const BM_WAITRESS_JOB_BGM_VOLUME = 90;

//waitress sex
const BM_WAITRESS_SEX_BGM_NAME = "Sex1";
const BM_WAITRESS_SEX_BGM_PAN = 0;
const BM_WAITRESS_SEX_BGM_PITCH = 100;
const BM_WAITRESS_SEX_BGM_VOLUME = 80;

//receptionist job
const BM_RECEPTIONIST_JOB_BGM_NAME = "Bar2";
const BM_RECEPTIONIST_JOB_BGM_PAN = 0;
const BM_RECEPTIONIST_JOB_BGM_PITCH = 100;
const BM_RECEPTIONIST_JOB_BGM_VOLUME = 90;

const BM_RECEPTIONIST_SEX_BGM_NAME = "Sex1";
const BM_RECEPTIONIST_SEX_BGM_PAN = 0;
const BM_RECEPTIONIST_SEX_BGM_PITCH = 100;
const BM_RECEPTIONIST_SEX_BGM_VOLUME = 80;

//down pose - stamina
const BM_DOWN_OTHER_BGM_NAME = "Down1";
const BM_DOWN_OTHER_BGM_PAN = 0;
const BM_DOWN_OTHER_BGM_PITCH = 100;
const BM_DOWN_OTHER_BGM_VOLUME = 80;

//down pose - other
const BM_DOWN_STAMINA_BGM_PITCH_CHANGE = -32;
const BM_DOWN_STAMINA_BGM_VOLUME_CHANGE = 0;

//masturbation battle bgm
const BM_MAS_BGM_NAME = "M_Sofa1";
const BM_MAS_BGM_VOLUME = 80;

//=============================================================================
 /*:
 * @plugindesc Battle Manager
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================



///////////
///////////////
// Battle Manager
////////////////
/////////////

//Cast Animation
BattleManager.actionCastAnimation = function() {
  if(!this._action.isAttack() && !this._action.isGuard() &&
  this._action.isSkill()) {
    if(this._action.item().castAnimation > 0 && (!this._subject._tagDontDrawImage && !Karryn.isInShowEnemyImageOnlyDuringValidSelectionPose())) {
      var ani = $dataAnimations[this._action.item().castAnimation]
      this._logWindow.showAnimation(this._subject, [this._subject],
        this._action.item().castAnimation);
    }
  }
  return true;
};

//Can Escape
BattleManager.canEscape = function() {
    return (this._canEscape && $gameActors.actor(ACTOR_KARRYN_ID).canEscape());
};

// Also called in pre battle common event
BattleManager.setBMAllowTachieUpdate = function(allow) {
	$gameParty._allowTachieUpdate = allow;
	if(this.isTachieUpdateAllowed()) {
		var group = $gameParty.members();
		for(var i = 0; i < group.length; i++) {
			var actor = group[i];
			if(!actor) { continue; }
			actor.setCacheChanged();
		}
	}
};

BattleManager.isTachieUpdateAllowed = function() {
	return $gameParty._allowTachieUpdate;
};

BattleManager.setEnemySneakAttackBattle = function() {
	$gameSwitches.setValue(SWITCH_ENEMY_SNEAK_ATTACK_ID, true);
};

////////
// Battle BGM
//////////////

Remtairy.BM.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Remtairy.BM.BattleManager_initMembers.call(this);
	this._playingSpecialBgm = false;
	this._playingDownBgmChange = false;
	this._normalBgm = null;
};

BattleManager.playBattleBgm = function() {
	let bgmName = BM_EB_BGM_NAME;
	let bgmVolume = BM_EB_BGM_VOLUME;
	let bgmPan = 0;
	let bgmPitch = 100;
	let mapId = $gameMap._mapId;
	
	if(Karryn.isInMasturbationPose()) {
		bgmName = BM_MAS_BGM_NAME;
		bgmVolume = BM_MAS_BGM_VOLUME;
	}
	else if(Karryn.isInDefeatedPose()) {
		bgmName = BM_SEX_BGM_NAME;
		bgmVolume = BM_SEX_BGM_VOLUME;
	}
	else if(Karryn.isInWaitressServingPose()) {
		bgmName = BM_WAITRESS_JOB_BGM_NAME;
		bgmPitch = BM_WAITRESS_JOB_BGM_PITCH;
		bgmPan = BM_WAITRESS_JOB_BGM_PAN;
		bgmVolume = BM_WAITRESS_JOB_BGM_VOLUME;
	}
	else if(Karryn.isInWaitressSexPose()) {
		bgmName = BM_WAITRESS_SEX_BGM_NAME;
		bgmPitch = BM_WAITRESS_SEX_BGM_PITCH;
		bgmPan = BM_WAITRESS_SEX_BGM_PAN;
		bgmVolume = BM_WAITRESS_SEX_BGM_VOLUME;
	}
	else if(Karryn.isInReceptionistPose()) {
		bgmName = BM_RECEPTIONIST_JOB_BGM_NAME;
		bgmPitch = BM_RECEPTIONIST_JOB_BGM_PITCH;
		bgmPan = BM_RECEPTIONIST_JOB_BGM_PAN;
		bgmVolume = BM_RECEPTIONIST_JOB_BGM_VOLUME;
	}
	else {
		if(mapId === MAP_ID_KARRYN_OFFICE && $gameVariables.value(VARIABLE_PROLOGUE_PROGRESS_ID) === 5 && !$gameSwitches.value(SWITCH_PROLOGUE_ENDED)) {
			bgmName = BM_TUTORIAL_BGM_NAME;
			bgmVolume = BM_TUTORIAL_BGM_VOLUME;
		}
		else if(Prison.currentlyPrisonLevelOne()) {
			bgmName = BM_PLVL1_NORMAL_BGM_NAME;
			bgmVolume = BM_PLVL1_NORMAL_BGM_VOLUME;
			
			if(mapId === MAP_ID_RECEPTION && ($gameTroop._troopId === 67 || $gameTroop._troopId === 68)) {
				bgmName = BM_PLVL1_BOSS_BGM_NAME;
				bgmVolume = BM_PLVL1_BOSS_BGM_VOLUME;
			}
		}
		else if(Prison.currentlyPrisonLevelTwo()) {
			bgmName = BM_PLVL2_NORMAL_BGM_NAME;
			bgmVolume = BM_PLVL2_NORMAL_BGM_VOLUME;
			
			if(mapId === MAP_ID_OFFICE_FLOODED && $gameTroop._troopId === 91) {
				bgmName = BM_PLVL2_BOSS_BGM_NAME;
				bgmVolume = BM_PLVL2_BOSS_BGM_VOLUME;
			}
		}
	}
	
	AudioManager.playBgm({name:bgmName, pan:bgmPan, pitch:bgmPitch, pos:0, volume:bgmVolume});
    AudioManager.stopBgs();
};

BattleManager.playNormalBgm = function() {
    if(this._playingSpecialBgm) {
        AudioManager.replayBgm(this._normalBgm);
		AudioManager.stopBgs();
		this._playingSpecialBgm = false;
	}
	else if(this._playingDownBgmChange) {
		var updateBgm = AudioManager.saveBgm();
		updateBgm.pitch = updateBgm.pitch - BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
		updateBgm.volume = updateBgm.volume - BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
		AudioManager.playBgm(updateBgm, updateBgm.pos);
		this._playingDownBgmChange = false;
	}
};

BattleManager.playDownStaminaBgmChange = function() {
    if(!this._playingSpecialBgm && !this._playingDownBgmChange) {
        var updateBgm = AudioManager.saveBgm();
		updateBgm.pitch = updateBgm.pitch + BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
		updateBgm.volume = updateBgm.volume + BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
		AudioManager.playBgm(updateBgm, updateBgm.pos);
		
		this._playingDownBgmChange = true;
	}
};


BattleManager.playSpecialBgm_Sex = function() {
	if(!this._playingSpecialBgm) {
		this._normalBgm = AudioManager.saveBgm();
		if(this._playingDownBgmChange) {
			this._normalBgm.pitch = this._normalBgm.pitch - BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
			this._normalBgm.volume = this._normalBgm.volume - BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
			this._playingDownBgmChange = false;
		}
	}
    AudioManager.playBgm({name:BM_SEX_BGM_NAME, pan:BM_SEX_BGM_PAN, pitch:BM_SEX_BGM_PITCH, pos:0, volume: BM_SEX_BGM_VOLUME});
	AudioManager.stopBgs();
	this._playingSpecialBgm = true;
};

BattleManager.playSpecialBgm_DownOther = function() {
	if(!this._playingSpecialBgm) {
		this._normalBgm = AudioManager.saveBgm();
		if(this._playingDownBgmChange) {
			this._normalBgm.pitch = this._normalBgm.pitch - BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
			this._normalBgm.volume = this._normalBgm.volume - BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
			this._playingDownBgmChange = false;
		}
	}
    AudioManager.playBgm({name:BM_DOWN_OTHER_BGM_NAME, pan:BM_DOWN_OTHER_BGM_PAN, pitch:BM_DOWN_OTHER_BGM_PITCH, pos:0, volume: BM_DOWN_OTHER_BGM_VOLUME});
	AudioManager.stopBgs();
	this._playingSpecialBgm = true;
};

BattleManager.playSpecialBgm_WaitressSex = function() {
	if(!this._playingSpecialBgm) {
		this._normalBgm = AudioManager.saveBgm();
		if(this._playingDownBgmChange) {
			this._normalBgm.pitch = this._normalBgm.pitch - BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
			this._normalBgm.volume = this._normalBgm.volume - BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
			this._playingDownBgmChange = false;
		}
	}
    AudioManager.playBgm({name:BM_WAITRESS_SEX_BGM_NAME, pan:BM_WAITRESS_SEX_BGM_PAN, pitch:BM_WAITRESS_SEX_BGM_PITCH, pos:0, volume: BM_WAITRESS_SEX_BGM_VOLUME});
	AudioManager.stopBgs();
	this._playingSpecialBgm = true;
};

BattleManager.playSpecialBgm_ReceptionistSex = function() {
	if(!this._playingSpecialBgm) {
		this._normalBgm = AudioManager.saveBgm();
		if(this._playingDownBgmChange) {
			this._normalBgm.pitch = this._normalBgm.pitch - BM_DOWN_STAMINA_BGM_PITCH_CHANGE;
			this._normalBgm.volume = this._normalBgm.volume - BM_DOWN_STAMINA_BGM_VOLUME_CHANGE;
			this._playingDownBgmChange = false;
		}
	}
    AudioManager.playBgm({name:BM_RECEPTIONIST_SEX_BGM_NAME, pan:BM_RECEPTIONIST_SEX_BGM_PAN, pitch:BM_RECEPTIONIST_SEX_BGM_PITCH, pos:0, volume: BM_RECEPTIONIST_SEX_BGM_VOLUME});
	AudioManager.stopBgs();
	this._playingSpecialBgm = true;
};

///////////
// Pull Out Enemy
/////////////////

BattleManager.pullOutAllEnemies = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	actor.setAllowTachieUpdate(false);
	//every alive & dead enemy call pullout
	let enemies = $gameTroop.aliveMembers();
	for (let i = 0; i < enemies.length; ++i) {
		this.pullOutEnemy(enemies[i]);
    }
	enemies = $gameTroop.deadMembers();
	for (let i = 0; i < enemies.length; ++i) {
		this.pullOutEnemy(enemies[i]);
    }
	
	actor.setPostSexPose();
	actor.setAllowTachieUpdate(true);
};

BattleManager.pullOutEnemy = function(enemy) {
	if(!enemy.isInAPose()) return;
	let actor = enemy.getPoseSkillTarget();

	//Karryn first needs to uninsert ungrope untoy everything the enemy is doing
	//actor.setAllowTachieUpdate(false);
	this.removeEnemyPettedStatus(enemy, actor);
	this.removeEnemyToyStatus(enemy, actor);
	this.removeEnemyPenisStatus(enemy, actor);

	
	//enemy's using body slot needs to be reset
	enemy.resetUsingBodySlot();
	//set enemy pose status to none
	enemy.resetPoseStatus();
	//reset all self sex targets
	enemy.resetAllTargetsForSex();
	//reset custom enemy sprite
	enemy.setCustomEnemySprite(false);
	//remove all sex pose states
	enemy.removeAllSexPoseStates();
	//reset orgasm skills
	enemy.resetOrgasmSkills();
	//reset can be kissed
	enemy.setCanBeKissed(true);
	
	
	//actor.setAllowTachieUpdate(true);
};

BattleManager.removeEnemyPettedStatus = function(enemy, actor) {
	if(enemy.isUsingBodySlotAnus(MOUTH_ID)) {
		actor.setMouthRimming(false);
		actor.disableRimjobPoseSkills();
	}
	if(enemy.isUsingBodySlotPenis(CLIT_ID)) {
		actor.setPussyCunni(false);
	}
	actor.setKissedChange(false, this);
};
BattleManager.removeEnemyToyStatus = function(enemy, actor) {
	
};
BattleManager.removeEnemyPenisStatus = function(enemy, actor) {
	if(enemy.isUsingBodySlotPenis(MOUTH_ID)) {
		actor.disableBlowjobPoseSkills();
		actor.setMouthInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(RIGHT_HAND_ID)) {
		actor.disableRightHandjobPoseSkills();
		actor.setRightHandInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(LEFT_HAND_ID)) {
		actor.disableLeftHandjobPoseSkills();
		actor.setLeftHandInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(BOOBS_ID)) {
		actor.disableTittyFuckPoseSkills();
		actor.setBoobsInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(PUSSY_ID)) {
		actor.disablePussySexPoseSkills();
		actor.setPussyInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(ANAL_ID)) {
		actor.disableAnalSexPoseSkills();
		actor.setAnalInserted(false);
	}
	if(enemy.isUsingBodySlotPenis(FEET_ID)) {
		actor.disableFootjobPoseSkills();
		actor.setFeetInserted(false);
	}
	
	
	if(enemy.isUsingBodySlotPenis(OTHER_1_ID)) {
		actor.setOther1Inserted(false);
	}
	if(enemy.isUsingBodySlotPenis(OTHER_2_ID)) {
		actor.setOther2Inserted(false);
	}
	if(enemy.isUsingBodySlotPenis(OTHER_3_ID)) {
		actor.setOther3Inserted(false);
	}
	if(enemy.isUsingBodySlotPenis(OTHER_4_ID)) {
		actor.setOther4Inserted(false);
	}
};

/////////
// Swap Master
////////////

BattleManager.swappedPoseMaster = function(leavingMaster) {
	let poseMasterSkillID = leavingMaster.getPoseMasterSkillID();
	let target = $gameActors.actor(ACTOR_KARRYN_ID);
	let eligibleMasters = this.eligibleEnemyReplacementMasters(leavingMaster);
	let success = false;
	
	if(eligibleMasters.length > 0) {
		let ran = Math.randomInt(eligibleMasters.length);
		let newMaster = eligibleMasters[ran];
		target._dontResetSexPose = true;
		this.pullOutEnemy(leavingMaster);
		this.pullOutEnemy(newMaster);
		newMaster.useAISkill(poseMasterSkillID, target);
		newMaster.setUsedSkillThisTurn(true);
		success = true;
	}
	
	return success
};

BattleManager.eligibleEnemyReplacementMasters  = function(leavingMaster) {
	let poseMasterSkillID = leavingMaster.getPoseMasterSkillID();
	let target = $gameActors.actor(ACTOR_KARRYN_ID);
	let enemies = $gameTroop.aliveMembers();
	let eligibleMasters = [];
	for (let i = 0; i < enemies.length; ++i) {
		let enemy = enemies[i];
		
		if(!enemy.usedSkillThisTurn() && enemy._aiPoseStartSkills && enemy.isErect
		&& enemy._aiPoseStartSkills.includes(poseMasterSkillID)) {
			eligibleMasters.push(enemy);
		}
    }
	return eligibleMasters;
};

/////////////
// End of All Turns
/////////////////

BattleManager.updateTurn = function() {
    $gameParty.requestMotionRefresh();
    if (!this._subject) {
        this._subject = this.getNextSubject();
    }
	if (!this._subject) {
       //this.preEndTurnManagement();
    }
    if (this._subject) {
        this.processTurn();
    } else {
		//this.setBMAllowTachieUpdate(true);
		//this.preEndTurnManagement();
        this.endTurn();
		this.refreshAllBattlerPoses();
    }
};


Remtairy.BM.BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	Remtairy.BM.BattleManager_invokeAction.call(this, subject, target);
	
	if(target.isActor()) {
		subject.checkForOrgasm();
		target.checkForOrgasm();
	}
	else {
		target.checkForOrgasm();
		subject.checkForOrgasm();
	}
};

// End of Turn Functions
//Unused
BattleManager.preEndTurnManagement = function() {
	this.checkForEnemiesOrgasm();
	this.checkForPartyOrgasm();
	this.refreshAllBattlerPoses();
};

//Enemies
//Unused
BattleManager.checkForEnemiesOrgasm = function() {
	let group = $gameTroop.aliveMembers();
	for(let i = 0; i < group.length; i++) {
		let enemy = group[i];
		if(!enemy) continue;
		if(enemy.reachedOrgasmPoint()) {
			this.setBMAllowTachieUpdate(false);
			enemy.orgasm();
		}
	}
};

//Party
//Unused
BattleManager.checkForPartyOrgasm = function() {
	var group = $gameParty.members();
	for(var i = 0; i < group.length; i++) {
		var actor = group[i];
		if(!actor) { continue; }
		if(actor.reachedOrgasmPoint()) {
			this.setBMAllowTachieUpdate(false);
			actor.orgasm();
		}
	}
};

BattleManager.removeImmortalStateFromEveryone = function() {
	let group = $gameTroop.aliveMembers();
	for(let i = 0; i < group.length; i++) {
		group[i].removeImmortal();
	}
	group = $gameParty.aliveMembers();
	for(let i = 0; i < group.length; i++) {
		group[i].removeImmortal();
	}
};

/////////
// End Of Every Action
////////////

Remtairy.BM.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    Remtairy.BM.BattleManager_endAction.call(this);
	this.refreshAllBattlerPoses();
	//this.resetAllSpriteBattlerPos();
};

BattleManager.refreshAllBattlerPoses = function() {
	for(var i = 0; i < $gameParty.members().length; i++) {
		if(!$gameParty.members()[i]) { continue; }
		$gameParty.members()[i].refreshPose();	
	}
};

//unused
BattleManager.resetAllSpriteBattlerPos = function() {
	for(var i = 0; i < $gameParty.members().length; i++) {
		if(!$gameParty.members()[i]) { continue; }
		$gameParty.members()[i].resetSpriteBattlerPos();	
	}
};

////////
// Battle Start
////////////

// Display Start Messages
Remtairy.BM.BattleManager_displayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
	Remtairy.BM.BattleManager_displayStartMessages.call(this);
	
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	if(actor._startOfInvasionBattle) {
		BattleManager._logWindow.push('addText', TextManager.invasionBattleStart);
		BattleManager.actionRemLines(KARRYN_LINE_INVASION_BATTLE_START);
		actor._startOfInvasionBattle = false;
	}
	
};

//////////
///////////////
// Game Action
/////////////////
///////////

Game_Action.prototype.isActorAttackSkill = function() {
    if (this.isSkill()) {
        return this.item().hasTag(TAG_ATTACK_SKILL);
    } else {
        return false;
    }
};

Game_Action.prototype.isKickSkill = function() {
    if (this.isSkill()) {
        return this.item().hasTag(TAG_KICK_SKILL);
    } else {
        return false;
    }
};

Game_Action.prototype.isActorCombatStanceSkill = function() {
    if (this.isSkill()) {
        let skillId = this._item._itemId;
		return skillId === SKILL_CAUTIOUS_STANCE_ID || skillId === SKILL_DEFENSIVE_STANCE_ID || skillId === SKILL_COUNTER_STANCE_ID;
    } else {
        return false;
    }
};

Game_Action.prototype.isActorSexStanceSkill = function() {
    if (this.isSkill()) {
        let skillId = this._item._itemId;
		return skillId === SKILL_ENDURE_PLEASURE_ID || skillId === SKILL_WAIT_OUT_PLEASURE_ID || skillId === SKILL_OPEN_PLEASURE_ID;
		
    } else {
        return false;
    }
};

Game_Action.prototype.isActorWillpowerSkill = function() {
    if (this.isSkill()) {
        let skillId = this._item._itemId;
		return (skillId >= WILLPOWER_SKILL_START && skillId <= WILLPOWER_SKILL_END);
    } else {
        return false;
    }
};

Game_Action.prototype.isEndMentalPhaseSkill = function() {
    if (this.isSkill()) {
        let skillId = this._item._itemId;
		return skillId === SKILL_END_MENTAL_PHASE_ID;
    } else {
        return false;
    }
};

Game_Action.prototype.executeMpDamage = function(target, value) {
    if (!this.isMpRecover()) {
        value = Math.min(target.mp, value);
    }
    if (value !== 0 || this.item().hasTag(TAG_FEMALE_ORGASM_SKILL)) {
        this.makeSuccess(target);
    }
    target.gainMp(-value);
    this.gainDrainedMp(value);
};

//////////
// Game Actor
////////////

Game_Actor.prototype.clearBattleSkillsFlags = function() {
	this.resetEnergyCosts();
	this.resetWillpowerCosts();
};

Remtairy.BM.Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
	Remtairy.BM.Game_Actor_performAction.call(this, action);

};


///////////////////
//////////////////////
// Battle Results
///////////////////////
/////////////////////

BattleManager.initVictoryData = function() {
    this._victoryPhase = false;
	this._victoryType = -1;
    this._victoryCheerWait = 0;
    this._victoryStep = 0;
};

BattleManager.onStartOfConBat = function() {
	var group = $gameParty.members();
	for(var i = 0; i < group.length; i++) {
		var actor = group[i];
		if(!actor) { continue; }
		actor.onStartOfConBat();
	}
};

BattleManager.displayEscapeSuccessMessage = function() {
	return;
};

BattleManager.processVictory = function() {
	if (this.isConsBattle()) {
		$gameSwitches.setValue(SWITCH_HIDE_STATE_ICONS_ID, true);
	    this.prepareConBat();
		this.onStartOfConBat();
		return;	
	}
	this.getDataRewardsCB();
	
    $gameParty.performVictory();
    if (this.isVictoryPhase()) return;
    if (this._windowLayer) this._windowLayer.x = 0;
    $gameParty.removeBattleStates();
    this._victoryPhase = true;
	this._victoryType = 0;
    if(!$gameSystem.skipVictoryAftermath()) {
		if(!$gameSystem.skipVictoryMusic() && !Karryn.isInJobPose()) 
			this.playVictoryMe();
		//$gameParty.gainOrderFromVictory();
		this.processNormalVictory();
    }
};

BattleManager.processNormalVictory = function() {
    this.makeRewards();
	this.makeExpResults();
	//$gameParty.calculateParamLvlsGained();
	//$gameParty.calculateMainLvlsGained();
	$gameParty.applyEndOfBattleSpecial();
	$gameParty.applyFatigueResults();
	$gameParty.applyOrderResults();
	$gameParty.checkForNewPassives();
    this.startVictoryPhase();
};

BattleManager.makeRewards = function() {
    this._rewards = {};
    this._rewards.exp = $gameTroop.expTotal();
    this._rewards.items = $gameTroop.makeDropItems();
	
	//Gold stuff
	this._rewards.gold = 0;
	//Gold bounty
	if($gameParty._fullGoldRewardsFlag) {
		this._rewards.gold = $gameTroop.goldTotal();
	}
	//Half gold
	if($gameParty._halfGoldRewardsFlag) 
		this._rewards.gold = $gameTroop.goldTotal() * 0.5;
	//Extra gold
	if($gameParty._extraGoldReward > 0)
		this._rewards.gold += $gameParty._extraGoldReward;
	if(this._rewards.gold > 0)
		this._rewards.gold += Math.random() * this._rewards.gold * 0.1;
	this._rewards.gold = Math.round(this._rewards.gold);
};


BattleManager.makeExpResults = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	//let total = this._rewards.exp;
	//total += Math.round(actor._totalParamExpGained);
	//this._rewards.exp = total;
	this._rewards.exp = 0;
};


///////////
// check Battle End
/////////////////

BattleManager.checkBattleEnd = function() {
	if (this._phase === 'actionList') return false;
    if (this._phase === 'actionTargetList') return false;
    if (this._phase === 'action') return false;
    if (this._phase === 'phaseChange') return false;
    if ($gameTroop.isEventRunning()) return false;
	
    if(this._phase) {
		if(Karryn.isInJobPose()) {
			return this.checkBattleEndJobs();
		}
		
		if(Karryn.isInDefeatedPose() && (!ConfigManager.shorterDefeatBattles || Prison.hardMode())) {
			if($gameTroop.isAllDead()) {
				if(Karryn.hasNoStamina() && Karryn.hasNoEnergy()) {
					this.processDefeat();
					return true;
				}
				this.processVictory();
				return true;
			}
			return false;
		}
		
		
        if (this.checkAbort()) {
            return true;
        } 
		else if ($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllDead()) {
            this.processVictory();
            return true;
        }
    }
    return false;
};

BattleManager.checkBattleEndJobs = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	if(Karryn.isInWaitressServingPose()) {
		if($gameParty.waitressBattle_getCurrentTimeInSeconds() >= $gameParty._waitressBattle_timeLimit) {
			this.processVictory();
            return true;
		}
		else if($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
		}
	}
	else if(Karryn.isInReceptionistPose()) {
		if($gameParty.receptionistBattle_getCurrentTimeInSeconds() >= $gameParty._receptionistBattle_timeLimit) {
			this.processVictory();
            return true;
		}
		else if($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
		}
	}
	else if(Karryn.isInWaitressSexPose()) {
		if ($gameParty.isAllDead()) {
            this.processDefeat();
            return true;
        } else if ($gameTroop.isAllOutOfEjaculationStock()) {
			if(actor._karrynMugContent === ALCOHOL_TYPE_SEMEN && actor._karrynMugAmount > 0)
				return false
			else {
				this.processVictory();
				return true;
			}
        }
	}
	
	return false;
};

//////////
// Process Victory Finish
// Process Abort
// Process Defeat
/////////////

BattleManager.processVictoryFinish = function() {
    $gameParty.clearVictoryData();
    this.endBattle(this._victoryType);
    this.replayBgmAndBgs();
	this._victoryType = -1;
    this._victoryPhase = false;
};


BattleManager.processAbort = function() {
    $gameParty.removeBattleStates();
	$gameParty.addRecordEscaped();
	$gameParty.increaseFatigueGain(PRISON_FATIGUE_FROM_ESCAPING);
	Karryn.turnOnJustEscapedFlag();
	this._phase = 'rem abort';
	this._victoryPhase = true;
	this._victoryType = 1;
    if(!$gameSystem.skipVictoryAftermath()) {
		this.processNormalVictory();
    }
};

BattleManager.processDefeat = function() {
	if(!Karryn.isInMasturbationPose()) {
		$gameParty.addRecordDefeated();
		$gameParty.setDefeatedSwitchesOn();
		//$gameParty._halfGoldRewardsFlag = true;
		this.playDefeatMe();
	}
	this._phase = 'rem defeat';
	this._victoryPhase = true;
	this._victoryType = 2;
    if(!$gameSystem.skipVictoryAftermath()) {
		//$gameParty.gainOrderFromDefeat();
		this.processNormalVictory();
    }
};

//////////
// Game Interpreter
//////////////

Game_Interpreter.prototype.command339 = function() {
    this.iterateBattler(this._params[0], this._params[1], function(battler) {
        if (!battler.isDeathStateAffected() || battler.isInNeverDeadPose()) {
            battler.forceAction(this._params[2], this._params[3]);
            BattleManager.forceAction(battler);
            this.setWaitMode('action');
        }
    }.bind(this));
    return true;
};