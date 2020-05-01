//=============================================================================
 /*:
 * @plugindesc Debug
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const TESTING_CHAT_BOX = false;
const TESTING_OBTAIN_ALL_PASSIVES = true;
const TESTING_DELETE_ALL_PASSIVES = false;
const TESTING_ALL_TITLES = false;
const TESTING_EDICTS = true;
const TESTING_DESIRES = true;
const TESTING_COCK_DESIRE = 100;
const TESTING_BOOBS_DESIRE = 125;
const TESTING_MOUTH_DESIRE = 125;
const TESTING_PUSSY_DESIRE = 125;
const TESTING_BUTT_DESIRE = 125;

const SWITCH_TEST_MODE_ID = 241;

SceneManager.debugCommand = function() {
    if($gameTemp.isPlaytest()) {
		let actor = $gameActors.actor(ACTOR_KARRYN_ID);
		
		$gameSwitches.setValue(SWITCH_TEST_MODE_ID, true);
		$gameSystem.setAutosave(false);
		
		actor.setHalberdAsDefiled(true);
		
		//console.log($gameTroop.aliveMembers());
		//$gameTroop.debugConsoleLogEnemyInfo();
		console.log($gameParty._wantedEnemies);
		//console.log($gameParty._wantedId_Tonkin);
		
		//console.log(actor._passivesObtainedOn_keyDate_valueSkillID);
		//console.log(actor._passivesObtainedOn_keySkillID_valueDate);
		//console.log(actor._recordOrgasmFromPussyCreampieCount);
		//console.log($gameParty.getGameVersion());
		
		actor.debugLearnSkills();
		actor.debugMaxAllLiquids();
		//actor.debugToggleGlovesAndHat();
		actor.removeClothing();
		actor.takeOffPanties();
		//actor.addDisarmedState();
		//actor.removeClothing();
		//actor.changeEquip(EQUIP_SLOT_TITLE_ID, $dataArmors[TITLE_ID_EMPEROR_SECRETARY]);
		actor.emoteMasterManager();
		
		//$gamePlayer.reserveTransfer(MAP_ID_BAR, 6, 8, 0, 0);

		//$gameParty.gainGold(10000);
		//actor.getAsp(20);
		
		//console.log($gameParty.orderChange);

		//	actor.setPleasure(0);

		actor.setPleasureToArousalPoint();
		actor.gainPleasure(200);

		//$gameActors.actor(ACTOR_KARRYN_ID).setPleasureToOrgasmPoint();

		//actor.setClitToy_PinkRotor();
		//actor.setPussyToy_PenisDildo();
		//actor.setAnalToy_AnalBeads();
		
		//actor.changeLevel(88);
		//$gameActors.actor(ACTOR_KARRYN_ID)._obtainedTitles[TITLE_ID_BEAUTIFUL_WARDEN] = false;
		//$gameParty.gainItem($dataArmors[TITLE_ID_BEAUTIFUL_WARDEN],-1,false);
		
		//$gameParty.setOrder(50);
		//$gameParty._currentWantedChance = 1;
		//actor._mp = 4;
		//actor._hp = 0;
		//actor._liquidPussyJuice = LIQUID_PUSSY_WET_REQ + 10;
		//actor.setFatigue(0);
		
		if(TESTING_DESIRES) {
			actor.setButtDesire(TESTING_BUTT_DESIRE);
			actor.setBoobsDesire(TESTING_BOOBS_DESIRE);
			actor.setPussyDesire(TESTING_PUSSY_DESIRE);
			actor.setCockDesire(TESTING_COCK_DESIRE);
			actor.setMouthDesire(TESTING_MOUTH_DESIRE);
		}
		
		//actor.removeClothing();
		
		//$gameParty._prisonLevelOneRiotBuildup = 100;
		
		//console.log('Guard aggression ' + Prison.guardAggression);
		//console.log(actor.states());
		
		$gameTroop.setAllEnemiesToAroused();
		//$gameTroop.setAllEnemiesToHorny();
		
		actor.recalculateBodySensitivities();
		actor.recalculateSkillLvls();
		
		if(actor.isInWaitressServingPose()) {
			actor.startWaitressSex(false);
		}
		
		$gameParty.increaseReceptionistNotoriety(10);
		$gameParty.increaseReceptionistFame(5);
		
	}
};

Karryn.debugLearnSkills = function() {
	return $gameActors.actor(ACTOR_KARRYN_ID).debugLearnSkills();
};

Game_Actor.prototype.debugLearnSkills = function() {
	this.learnSkill(SKILL_DEBUG_SURRENDER_ID);
	this.learnSkill(SKILL_DEBUG_DEFEAT_ALL_ID);
	this.learnSkill(SKILL_DEBUG_STRIP_CLOTHES_ID);
	
	//all passives
	if(TESTING_OBTAIN_ALL_PASSIVES) {
		for(let i = PASSIVES_LIST_START_ID; i <= PASSIVES_LIST_END_ID; i++) {
			this.setCharacterCreatorPassive(i); 
		}
		for(let i = PASSIVES_LIST_TWO_START_ID; i <= PASSIVES_LIST_TWO_END_ID; i++) {
			this.setCharacterCreatorPassive(i); 
		}
		this.setSlutLvl(300);
	}
	
	//this.setCharacterCreatorPassive(PASSIVE_FLAUNT_COUNT_ONE_ID); 
	//this.setCharacterCreatorPassive(PASSIVE_FLAUNT_COUNT_TWO_ID); 
	//this.setCharacterCreatorPassive(PASSIVE_FLAUNT_COUNT_THREE_ID); 
	
	if(TESTING_DELETE_ALL_PASSIVES) {
		for(let i = PASSIVES_LIST_START_ID; i <= PASSIVES_LIST_END_ID; i++) {
			this.forgetSkill(i);
		}
		for(let i = PASSIVES_LIST_TWO_START_ID; i <= PASSIVES_LIST_TWO_END_ID; i++) {
			this.forgetSkill(i);
		}
	}
	
	//all titles
	if(TESTING_ALL_TITLES) {
		$gameParty.gainItem($dataArmors[TITLE_ID_EFFICIENT_ADMINSTRATOR],1,false);
		$gameParty.gainItem($dataArmors[TITLE_ID_CORRUPTED_OFFICIAL],1,false);
		$gameParty.gainItem($dataArmors[TITLE_ID_CORPORAL_PUNISHER],1,false);
		$gameParty.gainItem($dataArmors[TITLE_ID_CAREFUL_SUPERVISOR],1,false);
		$gameParty.gainItem($dataArmors[TITLE_ID_WORKAHOLIC],1,false);
		$gameParty.gainItem($dataArmors[TITLE_ID_CORNERCUTTING_EMPLOYER],1,false);
		for(let i = 53; i < 121; i++) {
			$gameParty.gainItem($dataArmors[i],1,false);
		}
	}
	
	if(TESTING_EDICTS) {
		//specific edicts
		this.learnSkill(EDICT_PUBLISH_PROFILE);
		this.learnSkill(EDICT_PUBLISH_VIRGIN_STATUS);
		this.learnSkill(EDICT_PUBLISH_OTHER_FIRST_TIMES);
		this.learnSkill(EDICT_PUBLISH_LAST_TIMES);
		this.learnSkill(EDICT_PUBLISH_RESISTS);
		this.learnSkill(EDICT_PUBLISH_SEX_LEVELS);
		this.learnSkill(EDICT_PUBLISH_SENSITIVITIES);
		this.learnSkill(EDICT_PUBLISH_RECORDS_ONE);
		this.learnSkill(EDICT_PUBLISH_RECORDS_TWO);
		this.learnSkill(EDICT_PUBLISH_RECORDS_THREE);
		this.learnSkill(EDICT_PUBLISH_DESIRES);
		
		//this.learnSkill(EDICT_LEVEL_ONE_SUBJUGATED);
		//this.learnSkill(EDICT_LEVEL_TWO_SUBJUGATED);
		//this.learnSkill(EDICT_LEVEL_THREE_SUBJUGATED);
		//this.learnSkill(EDICT_LEVEL_FOUR_SUBJUGATED);
		
		this.learnSkill(EDICT_HEALING_THOUGHTS_ONE); 
		this.learnSkill(EDICT_RELEASE_DESIRES); 
		this.learnSkill(EDICT_EDGING_CONTROL); 
		this.learnSkill(EDICT_RESIST_ORGASM); 


		//this.learnSkill(EDICT_BAR_DRINK_MENU_I);
		
		//this.learnSkill(CHARA_CREATE_THREE_SADO_ID);
	}
};


Game_Actor.prototype.debugMaxAllLiquids = function() {
	let num = 25;
	this._liquidPussyJuice = LIQUID_PUSSY_WET_REQ + 10;
	this._liquidSwallow = num;
	this._liquidCreampiePussy = num;
	this._liquidCreampieAnal = num;
	this._liquidBukkakeFace = num;
	this._liquidBukkakeBoobs = num;
	this._liquidBukkakeButt = num;
	this._liquidBukkakeButtTopRight = num;
	this._liquidBukkakeButtTopLeft = num;
	this._liquidBukkakeButtBottomRight = num;
	this._liquidBukkakeButtBottomLeft = num;
	this._liquidBukkakeLeftArm = num;
	this._liquidBukkakeRightArm = num;
	this._liquidBukkakeLeftLeg = num;
	this._liquidBukkakeRightLeg = num;
	this._liquidDroolMouth = num;
	this._liquidDroolFingers = num;
	this._liquidDroolNipples = num;
	this.setCacheChanged();
}; 

Game_Actor.prototype.debugToggleGlovesAndHat = function() {
	if(this.isWearingGlovesAndHat())
		this.takeOffGlovesAndHat();
	else
		this.putOnGlovesAndHat();
	this.setCacheChanged();
}; 

Game_Troop.prototype.debugMakeEveryoneCloseToOrgasmPoint = function() {
	this.members().forEach(function(enemy) {
		if(enemy.isAppeared()) {
			enemy.setPleasureToOrgasmPoint();
			enemy.gainPleasure(-15);
		}
	}, this);
};

Game_Troop.prototype.debugConsoleLogEnemyInfo = function() {
	this.aliveMembers().forEach(function(enemy) {
		console.log(enemy.name());
		//console.log(enemy.pleasure);
		//console.log(enemy.stamina);
		//console.log(enemy.energy);
		//console.log(enemy._ejaculationStock);
		console.log(enemy.states());

	}, this);
};

Game_Enemy.prototype.enemyBattleAITest = function() {
	let target = BattleManager._targets[0];
	this._lastAITarget = BattleManager._targets[0];
	
	if(this.usedSkillThisTurn() || this.isStateAffected(STATE_ENEMY_CAME_THIS_TURN_ID))
		return;
	
	if(this.isChargedUp()) {
		if(this.chargeAIAttack(target)) return;
	}
	
	if(this.isInAPose()) {
		if(this.usePoseSkill(target)) return;
	}

	if(target.isInSexPose()) {
		if(this.tryJoinSexPose(target, VAR_ENEMYAI_TRY_JOIN_SEX_ATTEMPTS)) return;
	}
	else {
		if(this.tryStartSexPose(target, VAR_ENEMYAI_TRY_START_SEX_ATTEMPTS)) return;
	}

	if(!this._aiPettingSkills) { }
	else {
		let array = this._aiPettingSkills.slice(0);
		this.useAISkill(array[Math.randomInt(array.length)],target);
		return;
	}
	
	if(!this._aiTalkSightSkills) { }
	else {
		let array = this._aiTalkSightSkills.slice(0);
		this.useAISkill(array[Math.randomInt(array.length)],target);
		return;
	}
	
};

Game_Actor.prototype.showEval_debugSkills = function() {
	return $gameTemp.isPlaytest();
	return $gameTemp.isPlaytest() && $gameSwitches.value(SWITCH_TEST_MODE_ID);
};

Karryn.isCensored = function() {
	return TextManager.isJapanese;
};