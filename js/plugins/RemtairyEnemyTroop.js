﻿var Remtairy = Remtairy || {};
Remtairy.EnemyTroop = Remtairy.EnemyAI || {};

//=============================================================================
 /*:
 * @plugindesc Enemy Troop
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const ENEMY_ID_TUTORIALBOSS_YASU = 15;
const ENEMY_ID_LEVELONEBOSS_TONKIN = 16;

const ENEMY_ID_GUARD_LV1 = 21;
const ENEMY_ID_GUARD_LV2 = 22;
const ENEMY_ID_GUARD_LV3 = 23;
const ENEMY_ID_GUARD_LV4 = 24;
const ENEMY_ID_GUARD_LV5 = 25;

const TROOP_TEST_ID = 1;
const TROOP_WAITRESS_ID = 2;
const TROOP_GUARD_ID = 3;
const TROOP_RIOT_ID = 4;
const TROOP_DEFEATED_LV1_ID = 5;
const TROOP_DEFEATED_LV2_ID = 6;
const TROOP_RECEPTIONIST_ID = 7;
const TROOP_DEFEATED_GUARD_ID = 8;


///////////
// Game System
////////////

Game_System.prototype.setConsBattlesRem = function(battleArray) {
	this.clearConsBat();
	this._consBat.enable = true;
	for (var i = 0; i < battleArray.length; i++) {
		var troopId = Number(battleArray[i]);
		if ($dataTroops[troopId]) {
			this._consBat.battles.push(troopId);
		};
	};
	if (this._consBat.battles.length === 0) {
		this.clearConsBat();
	};
	
	
};

///////
/////////
// Game Troop
////////////
////////

Game_Troop.prototype.isAllDead = function() {
	if(Karryn.isInWaitressServingPose() || Karryn.isInReceptionistPose()) return false;
    return this.membersNeededToBeSubdued().length === 0;
};

Game_Troop.prototype.isAllOutOfEjaculationStock = function() {
	let allEnemiesOutOfStock = true;
	this.aliveMembers().forEach(function(member) {
        if(member._ejaculationStock > 0) allEnemiesOutOfStock = false;
    });
	
	return allEnemiesOutOfStock;
};

Game_Troop.prototype.membersNeededToBeSubdued = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isNotOnlooker && member.isNotSupporter;
    });
};


Game_Troop.prototype.aliveMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive();
    });
};

Game_Troop.prototype.erectMembersAll = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isErect;
    });
};

Game_Troop.prototype.angryMembersAll = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.isAngry;
    });
};

Game_Troop.prototype.tgrSum_AttackablesOnly = function() {
    return this.aliveMembers().reduce(function(r, member) {
		if(member.isStateAffected(STATE_UNTARGETABLE_FOR_ATTACK_ID)) 
			return r;
        else
			return r + member.tgr;
    }, 0);
};

Game_Troop.prototype.randomSkewerTarget = function() {
    let tgrRand = Math.random() * this.tgrSum_AttackablesOnly();
    let target = null;
    this.aliveMembers().forEach(function(member) {
		if(member.isStateAffected(STATE_UNTARGETABLE_FOR_ATTACK_ID))
			return;
		
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    });
    return target;
};

Game_Troop.prototype.hasEnemyTypePresent = function(enemyType) {
	var found = false;
	for(var i = 0; i < this.aliveMembers().length; i++) {
		if(this.aliveMembers()[i].enemyType() == enemyType) {
			found = true;
			break;
		}
	}
	return found;
};	

Game_Troop.prototype.hasEnemyPrefixPresent = function(prefixType) {
	var found = false;
	for(var i = 0; i < this.aliveMembers().length; i++) {
		if(this.aliveMembers()[i].getNamePrefixType() == prefixType) {
			found = true;
			break;
		}
	}
	return found;
};	

Game_Troop.prototype.makeAllEnemiesHorny = function(chance) {
	if(chance <= 0) return;
    this.aliveMembers().forEach(function(member) {
        if (Math.random() < chance) {
            member.addHornyState(); 
        }
    });
};

Game_Troop.prototype.setAllEnemiesToAroused = function() {
	this.members().forEach(function(enemy) {
		if(enemy.isAppeared()) {
			enemy.setPleasureToArousalPoint();
		}
	}, this);
};

Game_Troop.prototype.setAllEnemiesToHorny = function() {
	this.members().forEach(function(enemy) {
		if(enemy.isAppeared()) {
			enemy.addHornyState();
		}
	}, this);
};

Game_Troop.prototype.setupEnemyIdForBattle = function(enemyId, maxPrisonerMorphHeight) {
	let originalEnemyId = enemyId;
	let wanted = false;
	wanted = Prison.findAvailableWanted($dataEnemies[enemyId], maxPrisonerMorphHeight);
	if(wanted) {
		if(!wanted.enemyTypeIsBoss())
			enemyId = wanted._enemyId;
	}

	let spot = -1;
	let rowHeight = $dataEnemies[enemyId].dataRowHeight;
	let fixedRowNum = $dataEnemies[enemyId].dataFixedRow;
	let inOrderNum = 0;
	let randomNum = 0;
	
	let openSpots = 0;
	for(let i = 0; i < this._enemySpots.length; ++i) {
		if(!this._enemySpots[i]) openSpots++;
	}
	
	if(openSpots < rowHeight) return false;
	
	if(fixedRowNum > -1) spot = fixedRowNum;
	while(spot == -1) {
		randomNum = Math.randomInt(7 - rowHeight);
		if(!this._enemySpots[randomNum]) {
			spot = randomNum;
		}
	}
	
	let x = ENEMY_NAME_STARTING_X;
	let y = ENEMY_NAME_STARTING_Y + ENEMY_NAME_HEIGHT_SPACING * (spot + (rowHeight - 1));
	
	let enemy = new Game_Enemy(enemyId, x, y, wanted, originalEnemyId);
	
	enemy._enemySpotsId = spot;
	for(let i = 0; i < rowHeight; ++i) {
		if(this._enemySpots[spot + i]) {
			this.pushEnemySpotDown(spot + i);
		}
		this._enemySpots[spot + i] = enemy;
	}
	
	$gameParty.increaseFatigueGainFromEnemy(enemy.getFatigueGainValue(), enemy.enemyExperienceLvl());
	
	this._enemies.push(enemy);
	
	return enemy;
};

Game_Troop.prototype.pushEnemySpotDown = function(spot) {
	let currentEnemy = this._enemySpots[spot];
	
	let rowHeight = $dataEnemies[currentEnemy.enemyId()].dataRowHeight;

	for(let i = 0; i < rowHeight; ++i) {
		this._enemySpots[spot + i] = false;
	}

	if(spot + rowHeight >= this._enemySpots.length) {
		spot = 0;
	}
	else {
		spot++;
	}

	let x = ENEMY_NAME_STARTING_X;
	let y = ENEMY_NAME_STARTING_Y + ENEMY_NAME_HEIGHT_SPACING * (spot + (rowHeight - 1));
	
	currentEnemy._screenX = x;
	currentEnemy._screenY = y;

	for(let i = 0; i < rowHeight; ++i) {
		if(this._enemySpots[spot + i]) {
			this.pushEnemySpotDown(spot + i);
		}
		this._enemySpots[spot + i] = currentEnemy;
	}
};

Game_Troop.prototype.setupEnemyIdForDefeatedBattle = function(enemyId) {
	let originalEnemyId = enemyId;
	let wanted = false;
	wanted = Prison.findAvailableWanted($dataEnemies[enemyId], 1);
	if(wanted) {
		if(!wanted.enemyTypeIsBoss())
			enemyId = wanted._enemyId;
	}

	let x = ENEMY_NAME_STARTING_X;
	let y = ENEMY_NAME_STARTING_Y;
	let enemy = new Game_Enemy(enemyId, x, y, wanted, originalEnemyId);
	enemy._enemySpotsId = 0;
	this._enemies.push(enemy);
	return enemy;
};

//////////
// Setup Test Battle 
//////////////

Game_Troop.prototype.setupTestBattle = function(troopId) {
	let enemyId_1 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_1_ID);
	let enemyId_2 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_2_ID);
	let enemyId_3 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_3_ID);
	let enemyId_4 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_4_ID);
	let enemyId_5 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_5_ID);
	let enemyId_6 = $gameVariables.value(VARIABLE_TESTBATTLE_ENEMY_6_ID);

	if(enemyId_1 !== 0) {
		this.setupEnemyIdForBattle(enemyId_1, 3);
	}
	if(enemyId_2 !== 0) {
		this.setupEnemyIdForBattle(enemyId_2, 3);
	}
	if(enemyId_3 !== 0) {
		this.setupEnemyIdForBattle(enemyId_3, 3);
	}
	if(enemyId_4 !== 0) {
		this.setupEnemyIdForBattle(enemyId_4, 3);
	}
	if(enemyId_5 !== 0) {
		this.setupEnemyIdForBattle(enemyId_5, 3);
	}
	if(enemyId_6 !== 0) {
		this.setupEnemyIdForBattle(enemyId_6, 3);
	}
	
	
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
};

//////////
// Setup Guard Battle 
//////////////

Game_Troop.prototype.setupGuardBattle = function(troopId) {
	let enemyCount = 0;
	let validEnemyIds = $gameParty.getGuardEnemyIds();
	let guardAggr = Prison.guardAggression;
	
	if(guardAggr < 4) enemyCount = 2;
	else if(guardAggr < 20) enemyCount = 3;
	else enemyCount = 4;

	if(guardAggr < 1) { }
	else if(guardAggr < 20) {
		enemyCount += Math.round(Math.random() + guardAggr * 0.03);
	}
	else {
		enemyCount += Math.randomInt(3);
	}

	//enemyCount = 6;
	
	for(let i = 0; i < enemyCount; ++i) {
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForBattle(enemyId, 2);
	}
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
};

//////////
// Setup Riot Battle 
//////////////

Game_Troop.prototype.setupRiotBattle = function(troopId) {
	let validEnemyIds = $gameParty.getRiotEnemyIds();
	let mapId = $gameMap._mapId;
	let enemyCount = 0;
	let riotChance = 0;
	
	if(mapId === MAP_ID_WORKSHOP || mapId === MAP_ID_DISH_WASHING || mapId === MAP_ID_RECEPTION || mapId === MAP_ID_LAUNDRY) {
		riotChance = $gameParty.prisonLevelOneRiotChance();
	}

	if(riotChance <= 4) {
		enemyCount = 3;
	}
	else if(riotChance <= 8) {
		enemyCount = 3 + Math.randomInt(2);
	}
	else if(riotChance <= 10) {
		enemyCount = 4 + Math.randomInt(2);
	}
	else if(riotChance <= 12) {
		enemyCount = 4 + Math.randomInt(3);
	}
	else if(riotChance <= 16) {
		enemyCount = 5 + Math.randomInt(2);
	}
	else if(riotChance <= 20) {
		enemyCount = 5 + Math.randomInt(3);
	}
	else {
		enemyCount = 6;
	}

	if(Prison.easyMode()) { enemyCount--; }

	enemyCount = Math.min(6, enemyCount);
	
	for(let i = 0; i < enemyCount; ++i) {
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForBattle(enemyId, 3);
	}
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
};

//////////
// Setup Defeated Battle 
//////////////

//Defeated Level One
Game_Troop.prototype.setupDefeatedLevelOneBattle = function(troopId) {
	let blowbangFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedLvlOneFactor();
	let validEnemyIds = $gameParty.getDefeatedLevelOneEnemyIds(blowbangFactor);
	
	this._maxBlowbangParticipants = Math.max(3, blowbangFactor);
	this._appearedBlowbangParticipants = 0;
	
	let enemyCount = Math.min(4, this._maxBlowbangParticipants);
	
	for(let i = 0; i < enemyCount; ++i) {
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		this._appearedBlowbangParticipants++;
	}
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
	this.setAllEnemiesToAroused();
};

Game_Troop.prototype.onTurnEndSpecial_defeatedLevelOneBattle = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let emptySpotsAvailable = 0;

	if(actor.hasNoStamina() && actor.hasNoEnergy()) {
		actor.addState(STATE_DISABLED_ID);
		return;
	}
	else if(actor.isStateAffected(STATE_DISABLED_ID)) {
		actor.removeState(STATE_DISABLED_ID);
	}
	
	if(actor.canGetOther1InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther2InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther3InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther4InsertedNone()) emptySpotsAvailable++;
	
	emptySpotsAvailable = Math.min(emptySpotsAvailable, this._maxBlowbangParticipants - this._appearedBlowbangParticipants);
	
	for(let i = 0; i < emptySpotsAvailable; ++i) {
		let blowbangFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedLvlOneFactor();
		let validEnemyIds = $gameParty.getDefeatedLevelOneEnemyIds(blowbangFactor);
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		enemy.makeUniqueNames();
		enemy.setupEnemyPrefixEffect();
		enemy.onBattleStart();
		enemy.midBattleSpawn_setupDreamX();
		enemy.setPleasureToArousalPoint();
		SceneManager._scene._spriteset.addEnemy(enemy);
		this._appearedBlowbangParticipants++;
	}
};

Game_Troop.prototype.setupDefeatedLevelTwoBattle = function(troopId) {
	let bathroomFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedLvlTwoFactor();
	let validEnemyIds = $gameParty.getDefeatedLevelTwoEnemyIds(bathroomFactor);
	
	this._maxUrinalParticipants = Math.max(3, bathroomFactor);
	this._appearedUrinalParticipants = 0;
	
	let enemyCount = Math.min(4, this._maxUrinalParticipants);
	
	for(let i = 0; i < enemyCount; ++i) {
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		this._appearedUrinalParticipants++;
	}
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
	this.setAllEnemiesToAroused();
};

Game_Troop.prototype.onTurnEndSpecial_defeatedLevelTwoBattle = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let emptySpotsAvailable = 0;

	if(actor.hasNoStamina() && actor.hasNoEnergy()) {
		actor.addState(STATE_DISABLED_ID);
		return;
	}
	else if(actor.isStateAffected(STATE_DISABLED_ID)) {
		actor.removeState(STATE_DISABLED_ID);
	}
	
	if(actor.canGetOther1InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther2InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther3InsertedNone()) emptySpotsAvailable++;
	if(actor.canGetOther4InsertedNone()) emptySpotsAvailable++;
	
	emptySpotsAvailable = Math.min(emptySpotsAvailable, this._maxUrinalParticipants - this._appearedUrinalParticipants);
	
	for(let i = 0; i < emptySpotsAvailable; ++i) {
		let bathroomFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedLvlTwoFactor();
		let validEnemyIds = $gameParty.getDefeatedLevelTwoEnemyIds(bathroomFactor);
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		enemy.makeUniqueNames();
		enemy.setupEnemyPrefixEffect();
		enemy.onBattleStart();
		enemy.midBattleSpawn_setupDreamX();
		enemy.setPleasureToArousalPoint();
		SceneManager._scene._spriteset.addEnemy(enemy);
		this._appearedUrinalParticipants++;
	}
};

Game_Troop.prototype.setupDefeatedGuardBattle = function(troopId) {
	let guardFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedGuardFactor();
	let validEnemyIds = $gameParty.getGuardEnemyIds();
	
	this._maxBedParticipants = Math.max(3, guardFactor);
	this._appearedBedParticipants = 0;
	
	let enemyCount = Math.min(3, this._maxBedParticipants);
	
	for(let i = 0; i < enemyCount; ++i) {
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		this._appearedBedParticipants++;
	}
	this.makeUniqueNames();
	this.setupEnemyPrefixEffect();
	this.setAllEnemiesToAroused();
};

Game_Troop.prototype.onTurnEndSpecial_defeatedGuardBattle = function() {
	let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let emptySpotsAvailable = 3;

	if(actor.hasNoStamina() && actor.hasNoEnergy()) {
		actor.addState(STATE_DISABLED_ID);
		return;
	}
	else if(actor.isStateAffected(STATE_DISABLED_ID)) {
		actor.removeState(STATE_DISABLED_ID);
	}
	
	emptySpotsAvailable -= $gameTroop.aliveMembers().length;
	
	emptySpotsAvailable = Math.min(emptySpotsAvailable, this._maxBedParticipants - this._appearedBedParticipants);
	
	for(let i = 0; i < emptySpotsAvailable; ++i) {
		let guardFactor = $gameActors.actor(ACTOR_KARRYN_ID).getDefeatedGuardFactor();
		let validEnemyIds = $gameParty.getGuardEnemyIds();
		let enemyId = validEnemyIds[Math.randomInt(validEnemyIds.length)];
		let enemy = this.setupEnemyIdForDefeatedBattle(enemyId);
		enemy.makeUniqueNames();
		enemy.setupEnemyPrefixEffect();
		enemy.onBattleStart();
		enemy.midBattleSpawn_setupDreamX();
		enemy.setPleasureToArousalPoint();
		SceneManager._scene._spriteset.addEnemy(enemy);
		this._appearedBedParticipants++;
	}
};


//////////////
///////////////////
// Reorder Images on Selection
/////////////////
////////////////

Game_Troop.prototype.reorderImagesOnSelection = function() {
	if(Karryn.isInReorderEnemyImagesOnSelectionPose()) {
		let spot = 0;
		
		for(let i = 0; i < this._enemies.length; ++i) {
			if(this._enemies[i] && this._enemies[i]._selectionShowName) {
				let rowHeight = $dataEnemies[this._enemies[i]._enemyId].dataRowHeight;
				
				let x = 0;
				let y = 0;
				
				if(spot < 6) {
					x = ENEMY_NAME_HALFSPECIAL_FIRST_COL_X;
					y = ENEMY_NAME_HALFSPECIAL_STARTING_Y + ENEMY_NAME_HALFSPECIAL_HEIGHT_SPACING * (spot + (rowHeight - 1));
				}
				else {
					x = ENEMY_NAME_HALFSPECIAL_SECOND_COL_X;
					y = ENEMY_NAME_HALFSPECIAL_STARTING_Y + ENEMY_NAME_HALFSPECIAL_HEIGHT_SPACING * (spot - 6 + (rowHeight - 1));
				}
				
				this._enemies[i]._screenX = x;
				this._enemies[i]._screenY = y;
				this._enemies[i].setCustomEnemySpritePosition(x, y);
				
				spot++;
			}
		}
	}
};

/////////////
///////////////
// Game Party
/////////////////
/////////////

////////////
// Set Troop Ids
//////////////

Game_Party.prototype.setTroopIds = function() {
	let mapId = $gameMap._mapId;
	let firstTroopId = 21;
	let troopsWavesArray = [];
	
	//Level One
	if(this.currentlyPrisonLevelOne() && this.prisonLevelOneIsAnarchy()) {
		if(mapId === MAP_ID_VISITOR_ROOM_BROKEN) {
			if(this.HighOrder()) {
				firstTroopId = 23;
			}
			else if(this.MedOrder()) {
				firstTroopId = 23;
			}
			else if(this.LowOrder()) {
				firstTroopId = 23;
				troopsWavesArray.push(22);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 25;
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 25;
				troopsWavesArray.push(22);
			}
			//firstTroopId = 2;
		}
		else if(mapId === MAP_ID_VISITOR_CENTER_BROKEN) {
			if(this.HighOrder()) {
				firstTroopId = 23;
				troopsWavesArray.push(32);
			}
			else if(this.MedOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(34);
			}
			else if(this.LowOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(34);
				troopsWavesArray.push(21);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(34);
				troopsWavesArray.push(35);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(34);
				troopsWavesArray.push(35);
			}
		}
		else if(mapId === MAP_ID_BAR_BROKEN) {
			if(this.HighOrder()) {
				firstTroopId = 44;
				troopsWavesArray.push(22);
				troopsWavesArray.push(45);
				troopsWavesArray.push(21);
			}
			else if(this.MedOrder()) {
				firstTroopId = 44;
				troopsWavesArray.push(28);
				troopsWavesArray.push(46);
				if(!Prison.easyMode()) troopsWavesArray.push(24);
				troopsWavesArray.push(45);
			}
			else if(this.LowOrder()) {
				firstTroopId = 44;
				troopsWavesArray.push(28);
				troopsWavesArray.push(46);
				if(!Prison.easyMode()) troopsWavesArray.push(50);
				troopsWavesArray.push(48);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 51;
				troopsWavesArray.push(46);
				troopsWavesArray.push(29);
				if(!Prison.easyMode()) troopsWavesArray.push(47);
				troopsWavesArray.push(57);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 51;
				troopsWavesArray.push(49);
				troopsWavesArray.push(29);
				if(!Prison.easyMode()) troopsWavesArray.push(50);
				troopsWavesArray.push(57);
				troopsWavesArray.push(58);
			}
		}
		else if(mapId === MAP_ID_LVL1_HALLWAY) {
			if(this.HighOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(28);
			}
			else if(this.MedOrder()) {
				firstTroopId = 25;
				troopsWavesArray.push(28);
				troopsWavesArray.push(34);
			}
			else if(this.LowOrder()) {
				firstTroopId = 25;
				troopsWavesArray.push(30);
				troopsWavesArray.push(34);
				if(!Prison.easyMode()) troopsWavesArray.push(24);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 25;
				troopsWavesArray.push(30);
				troopsWavesArray.push(34);
				if(!Prison.easyMode()) troopsWavesArray.push(24);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 25;
				troopsWavesArray.push(30);
				troopsWavesArray.push(39);
				if(!Prison.easyMode()) troopsWavesArray.push(24);
			}
		}
		else if(mapId === MAP_ID_WORKSHOP) {
			if(this.HighOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(47);
			}
			else if(this.MedOrder()) {
				firstTroopId = 24;
				troopsWavesArray.push(47);
			}
			else if(this.LowOrder()) {
				firstTroopId = 48;
				troopsWavesArray.push(50);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 48;
				troopsWavesArray.push(50);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 52;
				troopsWavesArray.push(50);
			}
		}
		else if(mapId === MAP_ID_LAUNDRY) {
			if(this.HighOrder()) {
				firstTroopId = 35;
				troopsWavesArray.push(34);
			}
			else if(this.MedOrder()) {
				firstTroopId = 35;
				troopsWavesArray.push(34);
			}
			else if(this.LowOrder()) {
				firstTroopId = 35;
				troopsWavesArray.push(36);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 35;
				troopsWavesArray.push(39);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 35;
				troopsWavesArray.push(40);
			}
		}
		else if(mapId === MAP_ID_DISH_WASHING) {
			if(this.HighOrder()) {
				firstTroopId = 28;
				troopsWavesArray.push(48);
			}
			else if(this.MedOrder()) {
				firstTroopId = 28;
				troopsWavesArray.push(51);
			}
			else if(this.LowOrder()) {
				firstTroopId = 51;
				troopsWavesArray.push(28);
				troopsWavesArray.push(52);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 51;
				troopsWavesArray.push(28);
				troopsWavesArray.push(52);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 51;
				troopsWavesArray.push(29);
				troopsWavesArray.push(52);
			}
		}
		else if(mapId === MAP_ID_RECEPTION) {
			firstTroopId = 47;
			troopsWavesArray.push(60);
		}
	}
	//Level Two
	if(this.currentlyPrisonLevelTwo() && this.prisonLevelTwoIsAnarchy()) {
		if(mapId === MAP_ID_STORE_BROKEN) {
			if(this.HighOrder()) {
				firstTroopId = 92;
			}
			else if(this.MedOrder()) {
				firstTroopId = 92;
				troopsWavesArray.push(128);
			}
			else if(this.LowOrder()) {
				firstTroopId = 93;
				troopsWavesArray.push(129);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 93;
				troopsWavesArray.push(130);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 93;
				troopsWavesArray.push(130);
			}
			//firstTroopId = 2;
		}
		else if(mapId === MAP_ID_READING_ROOM) {
			if(this.HighOrder()) {
				firstTroopId = 94;
				troopsWavesArray.push(93);
			}
			else if(this.MedOrder()) {
				firstTroopId = 95;
				troopsWavesArray.push(93);
			}
			else if(this.LowOrder()) {
				firstTroopId = 95;
				troopsWavesArray.push(96);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 95;
				troopsWavesArray.push(96);
				if(!Prison.easyMode()) troopsWavesArray.push(94);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 95;
				troopsWavesArray.push(96);
				if(!Prison.easyMode()) troopsWavesArray.push(94);
			}
		}
		else if(mapId === MAP_ID_CLASSROOM) {
			if(this.HighOrder()) {
				firstTroopId = 97;
				troopsWavesArray.push(36);
			}
			else if(this.MedOrder()) {
				firstTroopId = 97;
				troopsWavesArray.push(37);
			}
			else if(this.LowOrder()) {
				firstTroopId = 97;
				troopsWavesArray.push(41);
				if(!Prison.easyMode()) troopsWavesArray.push(99);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 98;
				troopsWavesArray.push(43);
				if(!Prison.easyMode()) troopsWavesArray.push(100);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 98;
				troopsWavesArray.push(43);
				if(!Prison.easyMode()) troopsWavesArray.push(101);
			}
		}
		else if(mapId === MAP_ID_LVL2_HALLWAY_FLOODED) {
			if(this.HighOrder()) {
				firstTroopId = 102;
				troopsWavesArray.push(104);
			}
			else if(this.MedOrder()) {
				firstTroopId = 102;
				troopsWavesArray.push(104);
				if(!Prison.easyMode()) troopsWavesArray.push(102);
			}
			else if(this.LowOrder()) {
				firstTroopId = 102;
				troopsWavesArray.push(105);
				if(!Prison.easyMode()) troopsWavesArray.push(104);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 103;
				troopsWavesArray.push(106);
				if(!Prison.easyMode()) troopsWavesArray.push(104);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 103;
				troopsWavesArray.push(106);
				if(!Prison.easyMode()) troopsWavesArray.push(107);
			}
		}
		else if(mapId === MAP_ID_STAFF_LOUNGE) {
			if(this.HighOrder()) {
				firstTroopId = 108;
				troopsWavesArray.push(111);
			}
			else if(this.MedOrder()) {
				firstTroopId = 108;
				troopsWavesArray.push(111);
				if(!Prison.easyMode()) troopsWavesArray.push(114);
			}
			else if(this.LowOrder()) {
				firstTroopId = 109;
				troopsWavesArray.push(112);
				if(!Prison.easyMode()) troopsWavesArray.push(115);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 110;
				troopsWavesArray.push(113);
				if(!Prison.easyMode()) troopsWavesArray.push(116);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 110;
				troopsWavesArray.push(113);
				if(!Prison.easyMode()) troopsWavesArray.push(117);
			}
		}
		else if(mapId === MAP_ID_RESEARCH) {
			if(this.HighOrder()) {
				firstTroopId = 55;
				troopsWavesArray.push(124);
			}
			else if(this.MedOrder()) {
				firstTroopId = 55;
				troopsWavesArray.push(124);
				troopsWavesArray.push(39);
			}
			else if(this.LowOrder()) {
				firstTroopId = 55;
				troopsWavesArray.push(125);
				troopsWavesArray.push(43);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 56;
				troopsWavesArray.push(126);
				troopsWavesArray.push(43);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 56;
				troopsWavesArray.push(126);
				troopsWavesArray.push(127);
			}
		}
		else if(mapId === MAP_ID_MEETING_ROOM) {
			if(this.HighOrder()) {
				firstTroopId = 118;
				troopsWavesArray.push(120);
				troopsWavesArray.push(102);
			}
			else if(this.MedOrder()) {
				firstTroopId = 118;
				troopsWavesArray.push(120);
				troopsWavesArray.push(102);
			}
			else if(this.LowOrder()) {
				firstTroopId = 119;
				troopsWavesArray.push(120);
				troopsWavesArray.push(122);
				if(!Prison.easyMode()) troopsWavesArray.push(103);
			}
			else if(this.VeryLowOrder()) {
				firstTroopId = 119;
				troopsWavesArray.push(121);
				troopsWavesArray.push(123);
				if(!Prison.easyMode()) troopsWavesArray.push(103);
			}
			else if(this.NearNoOrder()) {
				firstTroopId = 119;
				troopsWavesArray.push(121);
				troopsWavesArray.push(123);
				if(!Prison.easyMode()) troopsWavesArray.push(107);
			}
		}
		
	}//Level 2
	
	else if(this.currentlyOutsidePrison()) {
		//testing map
		if(mapId === 1)
			firstTroopId = 11;
	}
		
	
	$gameVariables.setValue(VARIABLE_TROOPID_ID, firstTroopId);
	
	if(troopsWavesArray.length > 0) {
		$gameSystem.setConsBattlesRem(troopsWavesArray);
	}
}; // Normal battles end

///////////
// Invasion Troop Ids

Game_Party.prototype.setInvasionTroopIds = function() {
	let mapId = $gameMap._mapId;
	let firstTroopId = 21;
	let troopsWavesArray = [];
	
	let noiseLevel = $gameActors.actor(ACTOR_KARRYN_ID).getInvasionNoiseLevel();
	if(this.LowOrder()) noiseLevel += 1;
	else if(this.VeryLowOrder()) noiseLevel += 2;
	else if(this.NearNoOrder()) noiseLevel += 3;
	
	if(mapId === MAP_ID_KARRYN_OFFICE) {
		firstTroopId = TROOP_GUARD_ID;
	}
	else if(mapId === MAP_ID_LVL1_GUARD_STATION) {
		if(noiseLevel <= 1) {
			firstTroopId = 35;
		}
		else if(noiseLevel <= 2) {
			firstTroopId = 38;
		}
		else if(noiseLevel <= 4) {
			firstTroopId = 38;
			troopsWavesArray.push(49);
		}
		else if(noiseLevel <= 6) {
			firstTroopId = 41;
			troopsWavesArray.push(49);
		}
		else if(noiseLevel <= 8) {
			firstTroopId = 43;
			troopsWavesArray.push(58);
		}
		else {
			firstTroopId = 43;
			troopsWavesArray.push(58);
		}
	}
	else if(mapId === MAP_ID_LVL2_GUARD_STATION) {
		if(noiseLevel <= 1) {
			firstTroopId = 94;
			troopsWavesArray.push(104);
		}
		else if(noiseLevel <= 2) {
			firstTroopId = 114;
			troopsWavesArray.push(104);
		}
		else if(noiseLevel <= 4) {
			firstTroopId = 115;
			troopsWavesArray.push(105);
			troopsWavesArray.push(120);
		}
		else if(noiseLevel <= 6) {
			firstTroopId = 116;
			troopsWavesArray.push(105);
			troopsWavesArray.push(121);
		}
		else {
			firstTroopId = 116;
			troopsWavesArray.push(106);
			troopsWavesArray.push(121);
		}
		
	}
	
	$gameVariables.setValue(VARIABLE_TROOPID_ID, firstTroopId);
	
	if(troopsWavesArray.length > 0) {
		$gameSystem.setConsBattlesRem(troopsWavesArray);
	}
};

////////
// Defeated Troop Ids
///////////

//old, unused
Game_Party.prototype.setDefeatedLevelOneTroopIds = function() {
	let blowbangLvl = 0;
	if(Karryn.hasPassive(PASSIVE_BLOWBANG_COUNT_THREE_ID)) blowbangLvl = 3;
	else if(Karryn.hasPassive(PASSIVE_BLOWBANG_COUNT_TWO_ID)) blowbangLvl = 2;
	else if(Karryn.hasPassive(PASSIVE_BLOWBANG_COUNT_ONE_ID)) blowbangLvl = 1;
	
	let firstTroopId = 70;
	let troopsWavesArray = [];
	let numOfSprites = 3;
	
	if(blowbangLvl === 0) {
		if(this.HighOrder()) {
			firstTroopId = 70;
		}
		else if(this.MedOrder()) {
			firstTroopId = 70;
		}
		else if(this.LowOrder()) {
			firstTroopId = 71;
			numOfSprites = 4;
		}
		else if(this.VeryLowOrder()) {
			firstTroopId = 71;
			numOfSprites = 4;
		}
		else if(this.NearNoOrder()) {
			firstTroopId = 72;
			numOfSprites = 5;
		}
	}
	else if(blowbangLvl === 1) {
		if(this.HighOrder()) {
			firstTroopId = 70;
		}
		else if(this.MedOrder()) {
			firstTroopId = 71;
			numOfSprites = 4;
		}
		else if(this.LowOrder()) {
			firstTroopId = 71;
			troopsWavesArray.push(73);
			numOfSprites = 4;
		}
		else if(this.VeryLowOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(73);
			numOfSprites = 5;
		}
		else if(this.NearNoOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(74);
			numOfSprites = 5;
		}
	}
	else if(blowbangLvl === 2) {
		if(this.HighOrder()) {
			firstTroopId = 71;
			numOfSprites = 4;
		}
		else if(this.MedOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(73);
			numOfSprites = 5;
		}
		else if(this.LowOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(75);
			numOfSprites = 6;
		}
		else if(this.VeryLowOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(79);
			troopsWavesArray.push(73);
			numOfSprites = 6;
		}
		else if(this.NearNoOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(80);
			troopsWavesArray.push(73);
			numOfSprites = 7;
		}
	}
	else if(blowbangLvl === 3) {
		if(this.HighOrder()) {
			firstTroopId = 71;
			troopsWavesArray.push(73);
			numOfSprites = 5;
		}
		else if(this.MedOrder()) {
			firstTroopId = 71;
			troopsWavesArray.push(74);
			troopsWavesArray.push(76);
			numOfSprites = 6;
		}
		else if(this.LowOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(74);
			troopsWavesArray.push(77);
			numOfSprites = 4;
			numOfSprites = 7;
		}
		else if(this.VeryLowOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(74);
			troopsWavesArray.push(78);
			numOfSprites = 8;
		}
		else if(this.NearNoOrder()) {
			firstTroopId = 72;
			troopsWavesArray.push(75);
			troopsWavesArray.push(78);
			numOfSprites = 8;
		}
	}
	
	$gameVariables.setValue(VARIABLE_TROOPID_ID, firstTroopId);
	$gameVariables.setValue(VARIABLE_DEFEATED_SPRITES_ID, numOfSprites);
	
	if(troopsWavesArray.length > 0) {
		$gameSystem.setConsBattlesRem(troopsWavesArray);
	}
};

/////////
// Boss Troop Ids
//////////////

Game_Party.prototype.setBossTroopIds = function(level) {
	let mapId = $gameMap._mapId;
	let firstTroopId = 21;
	let troopsWavesArray = [];
	
	//Level One
	if(level === 1) {
		let key = [13, 30, "D"];
		let defeatedRoomEnemies = $gameSelfSwitches.value(key);
		firstTroopId = 66;
		
		if(defeatedRoomEnemies) {
			troopsWavesArray.push(24);
			troopsWavesArray.push(67);
			troopsWavesArray.push(28);
		}
		else {
			troopsWavesArray.push(60);
			troopsWavesArray.push(67);
			troopsWavesArray.push(55);
			
		}
		troopsWavesArray.push(68);
	}
	else if(level === 2) {
		firstTroopId = 91;
	}

	$gameVariables.setValue(VARIABLE_TROOPID_ID, firstTroopId);
	
	if(troopsWavesArray.length > 0) {
		$gameSystem.setConsBattlesRem(troopsWavesArray);
	}
};

//////////
// Guard Enemy Ids
///////////

Game_Party.prototype.getGuardEnemyIds = function() {
	let enemyIdArray = [];
	let guardAggr = Prison.guardAggression;
	
	
	if(guardAggr < 2) {
		enemyIdArray = [ENEMY_ID_GUARD_LV1];
	}
	else if(guardAggr < 5) {
		enemyIdArray = [ENEMY_ID_GUARD_LV1, ENEMY_ID_GUARD_LV2];
	}
	else if(guardAggr < 8) {
		enemyIdArray = [ENEMY_ID_GUARD_LV1, ENEMY_ID_GUARD_LV2, ENEMY_ID_GUARD_LV2];
	}
	else if(guardAggr < 12) {
		enemyIdArray = [ENEMY_ID_GUARD_LV1, ENEMY_ID_GUARD_LV2, ENEMY_ID_GUARD_LV3, ENEMY_ID_GUARD_LV2, ENEMY_ID_GUARD_LV3];
	}
	else if(guardAggr < 16) {
		enemyIdArray = [ENEMY_ID_GUARD_LV2, ENEMY_ID_GUARD_LV4, ENEMY_ID_GUARD_LV3];
	}
	else if(guardAggr < 20) {
		enemyIdArray = [ENEMY_ID_GUARD_LV2, ENEMY_ID_GUARD_LV3, ENEMY_ID_GUARD_LV4, ENEMY_ID_GUARD_LV5];
	}
	else if(guardAggr < 25) {
		enemyIdArray = [ENEMY_ID_GUARD_LV3, ENEMY_ID_GUARD_LV4, ENEMY_ID_GUARD_LV5, ENEMY_ID_GUARD_LV5];
	}
	else {
		enemyIdArray = [ENEMY_ID_GUARD_LV3, ENEMY_ID_GUARD_LV4, ENEMY_ID_GUARD_LV5, ENEMY_ID_GUARD_LV5, ENEMY_ID_GUARD_LV5];
	}
	
	//enemyIdArray = [121,122,123];
	
	return enemyIdArray;
};

//////////
// Riot Enemy Ids
///////////

Game_Party.prototype.getRiotEnemyIds = function() {
	let enemyIdArray = [];
	let mapId = $gameMap._mapId;
	
	if(mapId === MAP_ID_WORKSHOP) {
		enemyIdArray = [91,92,92,93,94,51,53,52,141];
	}
	else if(mapId === MAP_ID_DISH_WASHING) {
		enemyIdArray = [141,142,53,54,55,91,92,93];
	}
	else if(mapId === MAP_ID_RECEPTION) {
		enemyIdArray = [95,95,141,142,82,83,55];
	}
	else if(mapId === MAP_ID_LAUNDRY) {
		enemyIdArray = [81,82,83,81,82,51,54,95];
	}

	return enemyIdArray;
};

Game_Party.prototype.getDefeatedLevelOneEnemyIds = function(blowbangFactor) {
	let enemyIdArray = [ 91, 92, 93, 53 ];
	
	if(blowbangFactor >= 5) {
		enemyIdArray.push(51);
		enemyIdArray.push(94);
	}
	
	if(Karryn.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_ONE_ID) && blowbangFactor >= 6) {
		enemyIdArray.push(141);
	}
	
	if(blowbangFactor >= 7) {
		enemyIdArray.push(81);
		enemyIdArray.push(82);
	}
	
	if(blowbangFactor >= 9) {
		enemyIdArray.push(55);
		enemyIdArray.push(95);
	}
	
	if(Prison.guardAggression >= 10 && $gameParty._barReputation >= 2 && blowbangFactor >= 9) {
		enemyIdArray.push(21);
		enemyIdArray.push(22);
	}

	return enemyIdArray;
};

Game_Party.prototype.getDefeatedLevelTwoEnemyIds = function(bathroomFactor) {
	let enemyIdArray = [ 53, 92, 142 ];
	
	if(bathroomFactor >= 4 && Karryn.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_ONE_ID)) {
		enemyIdArray.push(131);
	}
	
	if(bathroomFactor >= 5) {
		enemyIdArray.push(94);
		enemyIdArray.push(141);
		enemyIdArray.push(82);
	}
	
	if(bathroomFactor >= 7) {
		enemyIdArray.push(122);
		enemyIdArray.push(123);
	}
	
	if(bathroomFactor >= 8 && Karryn.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_TWO_ID)) {
		enemyIdArray.push(132);
	}
	
	if(Prison.guardAggression >= 20 && bathroomFactor >= 8) {
		enemyIdArray.push(25);
	}
	
	if(bathroomFactor >= 9) {
		enemyIdArray.push(54);
		enemyIdArray.push(143);
		enemyIdArray.push(95);
	}
	
	if(bathroomFactor >= 11) {
		enemyIdArray.push(83);
	}
	
	return enemyIdArray;
};

///////////
////////////
// Respawn Anarchy
///////////
//////////

Game_Party.prototype.respawnAnarchyEnemies = function() {
	
	if(this.prisonLevelOneIsAnarchy()) {
		$gameSelfSwitches.setValue([MAP_ID_VISITOR_ROOM_BROKEN, 2, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_VISITOR_CENTER_BROKEN, 30, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 3, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 7, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 8, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 9, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 10, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 14, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 15, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 18, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 19, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 21, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_BAR_BROKEN, 22, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_LVL1_HALLWAY, 11, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_LVL1_HALLWAY, 12, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_WORKSHOP, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_WORKSHOP, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_WORKSHOP, 7, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_LAUNDRY, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_LAUNDRY, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_DISH_WASHING, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_DISH_WASHING, 7, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RECEPTION, 30, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RECEPTION, 31, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RECEPTION, 41, "D"], false);
	}
	if(this.prisonLevelTwoIsAnarchy()) {
		$gameSelfSwitches.setValue([MAP_ID_STORE_BROKEN, 3, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_STORE_BROKEN, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_STORE_BROKEN, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_READING_ROOM, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_READING_ROOM, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_READING_ROOM, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_CLASSROOM, 3, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_CLASSROOM, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_CLASSROOM, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_CLASSROOM, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_LVL2_HALLWAY_FLOODED, 13, "D"], false); 
		$gameSelfSwitches.setValue([MAP_ID_LVL2_HALLWAY_FLOODED, 14, "D"], false); 
		$gameSelfSwitches.setValue([MAP_ID_LVL2_HALLWAY_FLOODED, 16, "D"], false); 
		$gameSelfSwitches.setValue([MAP_ID_LVL2_HALLWAY_FLOODED, 18, "D"], false); 
		$gameSelfSwitches.setValue([MAP_ID_STAFF_LOUNGE, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_STAFF_LOUNGE, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_STAFF_LOUNGE, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RESEARCH, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RESEARCH, 5, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RESEARCH, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_RESEARCH, 7, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_MEETING_ROOM, 4, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_MEETING_ROOM, 6, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_MEETING_ROOM, 7, "D"], false);
		$gameSelfSwitches.setValue([MAP_ID_MEETING_ROOM, 8, "D"], false);
	}
	
};