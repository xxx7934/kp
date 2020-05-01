﻿var Remtairy = Remtairy || {};
Remtairy.Poses = Remtairy.Poses || {};

//Attack poses
const POSE_NULL = 'null';
const POSE_ATTACK = 'attack';
const POSE_DEFEND = 'defend';
const POSE_EVADE = 'evade'
const POSE_STANDBY = 'standby';
//Unarmed poses
const POSE_UNARMED = 'unarmed';
const POSE_KICK = 'kick';
//Down pose
const POSE_DOWN_STAMINA = 'down_stamina';
const POSE_DOWN_ORGASM = 'down_org';
const POSE_DOWN_FALLDOWN = 'down_falldown';
//Sex poses
const POSE_THUGGANGBANG = 'thug_gb';
const POSE_GUARDGANGBANG = 'guard_gb';
const POSE_GOBLINCUNNILINGUS = 'goblin_cl';
const POSE_KICKCOUNTER = 'kick_counter';
const POSE_RIMJOB = 'rimming';
const POSE_FOOTJOB = 'footj';
const POSE_HJ_STANDING = 'hj_standing';
const POSE_BJ_KNEELING = 'bj_kneeling';
const POSE_PAIZURI_LAYING = 'paizuri_laying';
const POSE_SLIME_PILEDRIVER_ANAL = 'slime_piledriver';
const POSE_WAITRESS_SEX = 'waitress_table';


//Special poses
const POSE_RECEPTIONIST = 'receptionist';

//Masturbate
const POSE_MASTURBATE1 = 'mas_1';

//Defeated poses
const POSE_DEFEATED_LEVEL1 = 'defeated_level1';
const POSE_DEFEATED_LEVEL2 = 'defeated_level2';
const POSE_DEFEATED_GUARD = 'defeated_guard';

//Map poses
const POSE_MAP = 'map';

//=============================================================================
 /*:
 * @plugindesc Poses
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

//////////
///////////////
// Game Actor
/////////////////
///////////

Game_Actor.prototype.setTachieFlip = function(flip) {
    this._tachieFlip = flip;
}; 

// Pose Name
Object.defineProperty(Game_Actor.prototype, "poseName", {
	get: function () { return this._poseName; }, configurable: true
});
// Set Pose
Game_Actor.prototype.setPose = function (name, dontReset) {
	name = name.toLowerCase();
	//maybe only use this code for non map poses, don't know the dangers of commenting this out yet...
	//if (this._poseName == name) return;
	this._poseName = name;
	if(dontReset) return;
	this.completeResetTachieFace();
	this.completeResetBodyParts();
	this.completeResetMaxTachieSemenId();
	this.resetCockTargets();
	this.setSpankablePose(false);
	//this.setCacheChanged();
};

//Reset Face
Game_Actor.prototype.completeResetTachieFace = function () {
	this.setTachieFace(0);
	this.resetTachieHoppe();
	this.resetTachieSweat();
	this.resetTachieHair();
	this.resetTachieEyebrows();
	this.resetTachieEyes();
	this.resetTachieMouth();
	this.resetTachieGlasses();
};

//Reset Body Parts
Game_Actor.prototype.completeResetBodyParts = function () {
	this.setTachieBody(1);
	this.resetTachieBodyExtension();
	this.resetTachieRightArm();
	this.resetTachieLeftArm();
	this.resetTachieHat();
	this.resetTachieHead();
	this.resetTachieHair();
	this.resetTachieWeapon();
	this.resetTachiePanties();
	this.resetTachieBoobs();
	this.resetTachieLeftBoob();
	this.resetTachieRightBoob();
	this.resetTachieButt();
	this.resetTachieSkirt();
	this.resetTachieClothes();
	this.resetTachieHolePussy();
	this.resetTachieHoleAnus();
	this.resetTachieStraw();
	
	this.setTachieRightArmInFrontOfBody(true);
	this.setTachieRightArmInFrontOfHeadAndBehindBody(false);
	this.setTachieLeftArmInFrontOfBody(true);
	this.setTachieRightArmInFrontOfBoobs(true);
	this.setTachieLeftArmInFrontOfBoobs(true);
	this.setTachieRightArmInFrontOfLeftArm(true);
	this.setTachieBoobsInFrontOfBody(true);
	this.setTachieSemenBellyAndBoobsInFrontOfBoobs(false);
	this.setTachieHeadInFrontOfBody(true);
	this.setTachieHatInFrontOfBody(true);
	this.setTachieFrontInFrontOfFace(false);
	this.setTachiePantiesInFrontOfBoobs(false);
	this.setTachieCockBoobsInFrontOfBoobs(true);
	this.setTachieCockMouthInFrontOfFace(true);
	this.setTachieLeftBoobInFrontOfRightBoob(true);
	this.setTachieWeaponInFrontOfBody(true);
	this.setTachieWeaponInFrontOfBoobs(true);
	this.setTachieWeaponBehindEverything(false);
	this.setTachieHasBoobsHard(true);
	
	this.setTachiePussyToyInFrontOfAnalToy(true);
	this.setTachieClitToyInFrontOfMainToys(true);
	this.setTachieHolesCocksToysInFrontOfBody(true);
	this.setTachieToysInFrontOfEverything(false);
	this.setTachieToysInBehindOfEverything(false);
	this.setTachieAnalToyInFrontOfEverything(false);
	
	this.resetBoobsType();
	this.setTachieBoobsErectionFalse();
	this.resetAllTachieCocks();
	this.resetAllTachieBack();
	this.resetAllTachieFront();
	this.resetAllTachieVisitor();
	
};

//Reset Max Tachie Semen
Game_Actor.prototype.completeResetMaxTachieSemenId = function () {
	this.setMaxTachieSemenBackId(0);
	this.setMaxTachieSemenDeskId(0);
	this.setMaxTachieSemenBellyId(0);
	this.setMaxTachieSemenBoobsId(0);
	this.setMaxTachieSemenLeftBoobId(0);
	this.setMaxTachieSemenRightBoobId(0);
	this.setMaxTachieSemenButtId(0);
	this.setMaxTachieSemenButtTopRightId(0);
	this.setMaxTachieSemenButtTopLeftId(0);
	this.setMaxTachieSemenButtBottomRightId(0);
	this.setMaxTachieSemenButtBottomLeftId(0);
	this.setMaxTachieSemenCrotchId(0);
	this.setMaxTachieSemenAnalId(0);
	this.setMaxTachieSemenCrotchPantiesId(0);
	this.setMaxTachieSemenFaceId(0);
	this.setMaxTachieSemenLeftArmId(0);
	this.setMaxTachieSemenRightArmId(0);
	this.setMaxTachieSemenLeftLegId(0);
	this.setMaxTachieSemenRightLegId(0);
	this.setMaxTachieWetId(0);
	this.setMaxTachieWetPantiesId(0);
	this.setMaxTachieDroolMouthId(0);
	this.setMaxTachieDroolFingersId(0);
	this.setMaxTachieDroolNipplesId(0);
	
	this.setMaxTachieSemenCockMouthId(0);
	this.setMaxTachieSemenCockBoobsId(0);
	this.setMaxTachieSemenCockRightArmId(0);
	this.setMaxTachieSemenCockLeftArmId(0);
	this.setMaxTachieSemenCockPussyId(0);
	this.setMaxTachieSemenCockAnalId(0);
	this.setMaxTachieSemenCockFeetId(0);
	this.setMaxTachieSemenCockNormalId(0);
	this.setMaxTachieSemenFrontAId(0);
	this.setMaxTachieSemenFrontBId(0);
	this.setMaxTachieSemenFrontCId(0);
	this.setMaxTachieSemenFrontDId(0);
	
	this.resetTachieSemenAnalExtension();
	this.resetTachieSemenBackExtension();
	this.resetTachieSemenBellyExtension();
	this.resetTachieSemenBoobsExtension();
	this.resetTachieSemenButtExtension();
	this.resetTachieSemenCrotchExtension();
	this.resetTachieSemenFaceExtension();
	this.resetTachieSemenLeftArmExtension();
	this.resetTachieSemenLeftBoobExtension();
	this.resetTachieSemenRightArmExtension();
	this.resetTachieSemenRightBoobExtension(); 
	this.resetTachieSemenWetExtension();
	this.resetTachieSemenCockLeftArmExtension();
	this.resetTachieSemenCockRightArmExtension();
	this.resetTachieSemenCockMouthExtension();
	this.resetTachieSemenCockPussyExtension();
	this.resetTachieSemenCockNormalExtension();
	this.resetTachieSemenCockAnalExtension();
	this.resetTachieSemenFrontAExtension();
	this.resetTachieSemenFrontBExtension();
	this.resetTachieSemenFrontCExtension();
	this.resetTachieSemenFrontDExtension();
	this.resetTachieSemenFrontEExtension();
};

// Spankable Pose

Game_Actor.prototype.setSpankablePose = function (status) {
	this._spankablePose = status;
};
Game_Actor.prototype.isPoseSpankable = function () {
	return this._spankablePose;
};


// Post Sex Pose
Game_Actor.prototype.setPostSexPose = function () {
	let pose = this.poseName;
	
	//Todo: Conditions here for special poses; if(pose === POSE_SPECIAL) etc
	//If not a special pose, set to standby, unarmed, or down
	
	if(this.justOrgasmed()) {
		this.setDownOrgasmPose();
	}
	else if(this.hasNoStamina()) {
		this.setDownStaminaPose();
	}
	else if(this.hasHalberd()) {
		this.setStandbyPose();
	}	
	else {
		this.setUnarmedPose();
	}
};

/////////
// Tachie Parts Names
/////////////////

Game_Actor.prototype.getBoobsType = function () {
	if(this._tachieBoobsType.length > 0) return this._tachieBoobsType + '_';
	else return '';
};
Game_Actor.prototype.setBoobsType = function (boobsType) {
	this._tachieBoobsType = boobsType;
	this.setPoseClothing();
};
Game_Actor.prototype.resetBoobsType = function () {
	this._tachieBoobsType = '';
};

Game_Actor.prototype.setPoseClothing = function () {
	if(DEBUG_MODE) {
		let fileId = this.getBoobsType() + this.clothingStage;
		if((this.isAroused() || this.justOrgasmed()) && this.tachieHasBoobsHard()) fileId += '_hard';
		this.setTachieBoobs(fileId);
	}
	else {
		this.setTachieBoobs('' + this.getBoobsType() + '1');
	}
};

Game_Actor.prototype.setPosePanties = function () {
	if(this.isWearingPanties()) {
		let pantiesType = '';
		if(this.isInWaitressServingPose()) pantiesType += 'waitress_'
		pantiesType += this.getPantiesType();
		this.setTachiePanties(pantiesType);
	}
	else {
		this.resetTachiePanties();
	}
};

Game_Actor.prototype.setPoseWeapon = function () {
	if(this.equips()[0] && this.hasHalberd()) {
		this.setTachieWeapon(1);
	}
	else {
		this.resetTachieWeapon();
	}
};

///////////////
// Tachie Arms
// Set whether to draw tachie arms in front or behind tachie body
// And whether tachie right arm is in front of tachie left arm or not
///////////////

Game_Actor.prototype.setTachieRightArmInFrontOfBody = function (status) {
	this._tachieRightArmInFrontOfBody = status;
};
Game_Actor.prototype.setTachieLeftArmInFrontOfBody = function (status) {
	this._tachieLeftArmInFrontOfBody = status;
};
Game_Actor.prototype.setTachieRightArmInFrontOfBoobs = function (status) {
	this._tachieRightArmInFrontOfBoobs = status;
};
Game_Actor.prototype.setTachieRightArmInFrontOfHeadAndBehindBody = function (status) {
	this._tachieRightArmInFrontOfHeadAndBehindBody = status;
};

Game_Actor.prototype.setTachieLeftArmInFrontOfBoobs = function (status) {
	this._tachieLeftArmInFrontOfBoobs = status;
};
Game_Actor.prototype.setTachieRightArmInFrontOfLeftArm = function (status) {
	this._tachieRightArmInFrontOfLeftArm = status;
};

Game_Actor.prototype.setTachieFrontInFrontOfFace = function (status) {
	this._tachieFrontInFrontOfFace = status;
};
Game_Actor.prototype.tachieFrontInFrontOfFace = function () {
	return this._tachieFrontInFrontOfFace;
};

Game_Actor.prototype.setTachieWeaponInFrontOfBody = function (status) {
	this._tachieWeaponInFrontOfBody = status;
};
Game_Actor.prototype.tachieWeaponInFrontOfBody = function () {
	return this._tachieWeaponInFrontOfBody;
};

Game_Actor.prototype.setTachieWeaponInFrontOfBoobs = function (status) {
	this._tachieWeaponInFrontOfBoobs = status;
};
Game_Actor.prototype.tachieWeaponInFrontOfBoobs = function () {
	return this._tachieWeaponInFrontOfBoobs;
};

Game_Actor.prototype.setTachieWeaponBehindEverything = function (status) {
	this._tachieWeaponBehindEverything = status;
};
Game_Actor.prototype.tachieWeaponBehindEverything = function () {
	return this._tachieWeaponBehindEverything;
};

Game_Actor.prototype.setTachieHasBoobsHard = function (status) {
	this._tachieHasBoobsHard = status;
};
Game_Actor.prototype.tachieHasBoobsHard = function () {
	return this._tachieHasBoobsHard;
};

Game_Actor.prototype.tachieRightArmInFrontOfBody = function () {
	return this._tachieRightArmInFrontOfBody;
};
Game_Actor.prototype.tachieLeftArmInFrontOfBody = function () {
	return this._tachieLeftArmInFrontOfBody;
};
Game_Actor.prototype.tachieRightArmInFrontOfBoobs = function () {
	return this._tachieRightArmInFrontOfBoobs;
};
Game_Actor.prototype.tachieRightArmInFrontOfHeadAndBehindBody = function () {
	return this._tachieRightArmInFrontOfHeadAndBehindBody;
};

Game_Actor.prototype.tachieLeftArmInFrontOfBoobs = function () {
	return this._tachieLeftArmInFrontOfBoobs;
};
Game_Actor.prototype.tachieRightArmInFrontOfLeftArm = function () {
	return this._tachieRightArmInFrontOfLeftArm;
};

Game_Actor.prototype.setTachieCockMouthInFrontOfFace = function (status) {
	this._tachieCockMouthInFrontOfFace = status;
};
Game_Actor.prototype.tachieCockMouthInFrontOfFace = function () {
	return this._tachieCockMouthInFrontOfFace;
};

Game_Actor.prototype.setTachieHeadInFrontOfBody = function (status) {
	this._tachieHeadInFrontOfBody = status;
};
Game_Actor.prototype.tachieHeadInFrontOfBody = function () {
	return this._tachieHeadInFrontOfBody;
};

Game_Actor.prototype.setTachieHatInFrontOfBody = function (status) {
	this._tachieHatInFrontOfBody = status;
};
Game_Actor.prototype.tachieHatInFrontOfBody = function () {
	return this._tachieHatInFrontOfBody;
};

Game_Actor.prototype.setTachieBoobsInFrontOfBody = function (status) {
	this._tachieBoobsInFrontOfBody = status;
};
Game_Actor.prototype.tachieBoobsInFrontOfBody = function () {
	return this._tachieBoobsInFrontOfBody;
};

Game_Actor.prototype.setTachieSemenBellyAndBoobsInFrontOfBoobs = function (status) {
	this._tachieSemenBellyAndBoobsInFrontOfBoobs = status;
};
Game_Actor.prototype.tachieSemenBellyAndBoobsInFrontOfBoobs = function () {
	return this._tachieSemenBellyAndBoobsInFrontOfBoobs;
};

Game_Actor.prototype.setTachieCockBoobsInFrontOfBoobs = function (status) {
	this._tachieCockBoobsInFrontOfBoobs = status;
};
Game_Actor.prototype.tachieCockBoobsInFrontOfBoobs = function () {
	return this._tachieCockBoobsInFrontOfBoobs;
};

Game_Actor.prototype.setTachieLeftBoobInFrontOfRightBoob = function (status) {
	this._tachieLeftBoobInFrontOfRightBoob = status;
};
Game_Actor.prototype.tachieLeftBoobInFrontOfRightBoob = function () {
	return this._tachieLeftBoobInFrontOfRightBoob;
};

Game_Actor.prototype.setTachiePantiesInFrontOfBoobs = function (status) {
	this._tachiePantiesInFrontOfBoobs = status;
};
Game_Actor.prototype.tachiePantiesInFrontOfBoobs = function () {
	return this._tachiePantiesInFrontOfBoobs;
};

Game_Actor.prototype.setTachieClitToyInFrontOfMainToys = function (status) {
	this._tachieClitToyInFrontOfMainToys = status;
};
Game_Actor.prototype.tachieClitToyInFrontOfMainToys = function () {
	return this._tachieClitToyInFrontOfMainToys;
};

Game_Actor.prototype.setTachiePussyToyInFrontOfAnalToy = function (status) {
	this._tachiePussyToyInFrontOfAnalToy = status;
};
Game_Actor.prototype.tachiePussyToyInFrontOfAnalToy = function () {
	return this._tachiePussyToyInFrontOfAnalToy;
};

Game_Actor.prototype.setTachieHolesCocksToysInFrontOfBody = function (status) {
	this._tachieHolesCocksToysInFrontOfBody = status;
};
Game_Actor.prototype.tachieHolesCocksToysInFrontOfBody = function () {
	return this._tachieHolesCocksToysInFrontOfBody;
};


Game_Actor.prototype.setTachieToysInFrontOfEverything = function (status) {
	this._tachieToysInFrontOfEverything = status;
};
Game_Actor.prototype.tachieToysInFrontOfEverything = function () {
	return this._tachieToysInFrontOfEverything;
};

Game_Actor.prototype.setTachieAnalToyInFrontOfEverything = function (status) {
	this._tachieAnalToyInFrontOfEverything = status;
};
Game_Actor.prototype.tachieAnalToyInFrontOfEverything = function () {
	return this._tachieAnalToyInFrontOfEverything;
};

Game_Actor.prototype.setTachieToysInBehindOfEverything = function (status) {
	this._tachieToysInBehindOfEverything = status;
};
Game_Actor.prototype.tachieToysInBehindOfEverything = function () {
	return this._tachieToysInBehindOfEverything;
};

///////
// Tachie Pubic
Game_Actor.prototype.tachiePubicId = function() {
	if(!ConfigManager.displayPubic) return REM_TACHIE_NULL;
	if(!this._hasTachiePubic) return REM_TACHIE_NULL;
	
	let pose = this.poseName;
	if(pose == POSE_ATTACK || pose == POSE_DEFEATED_LEVEL1 || pose == POSE_DOWN_STAMINA || pose == POSE_EVADE || pose == POSE_FOOTJOB || pose == POSE_PAIZURI_LAYING || pose == POSE_WAITRESS_SEX || pose == POSE_GUARDGANGBANG || pose == POSE_RECEPTIONIST) 
		return REM_TACHIE_NULL;
	
	return '1';
};

///////////////
// Tachie Update
// Set whether to update tachie yet or not
///////////////

Game_Actor.prototype.setAllowTachieUpdate = function (allow) {
	this._allowTachieUpdate = allow;
	if(allow) this.setCacheChanged();
};
Game_Actor.prototype.allowTachieUpdate = function () {
	return this._allowTachieUpdate;
};

//////////
// Map Poses
///////////////

Game_Actor.prototype.isInMapPose = function() {
	let pose = this.poseName;
	return ( pose == POSE_MAP );
};

Game_Actor.prototype.setWardenMapPose = function() {
	this.setAllowTachieUpdate(false);
	this.setPose(POSE_MAP);
	this.resetTachieCutIn();
	this.setTachieEyes('normal_mae1');
	this.setTachieEyebrows('normal_kiri1');
	this.setTachieMouth('normal_nico1');
	this.setTachieHead('normal_1');
	this.setBoobsType('reg');
	this.setTachieBody(1);
	this.setTachieRightArm(1);
	this.setTachieLeftArm(1);
	//this.setTachieRightArmInFrontOfBody(false);
	this.setTachieRightArmInFrontOfBody(true);
	this.setTachieRightArmInFrontOfBoobs(false);
	this.setTachieSemenBellyAndBoobsInFrontOfBoobs(true);
	this.setPosePanties();
	
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
		
	this.setWardenMapPoseExtensions();
	this.refreshSlutLvlStageVariables_Map();
	this.setAllowTachieUpdate(true);
	//disabled for for now since I don't know all the spots this function can get called
	//this.emoteMasterManager();
};

Game_Actor.prototype.setWardenMapPose_Reg = function() {
	this.setAllowTachieUpdate(false);
	$gameActors.actor(ACTOR_KARRYN_ID).setBoobsType('reg');
	this.setPoseClothing();
	this.setPosePanties();
	this.setTachieRightArm(1);
	this.setTachieLeftArm(1);
	this.setWardenMapPoseExtensions();
	this.setAllowTachieUpdate(true);
};
Game_Actor.prototype.setWardenMapPose_Holding = function() {
	this.setAllowTachieUpdate(false);
	$gameActors.actor(ACTOR_KARRYN_ID).setBoobsType('hold');
	this.setPoseClothing();
	this.setPosePanties();
	this.setWardenMapPoseExtensions();
	this.setAllowTachieUpdate(true);
};

//Called in Common Event 22: Set Boobs Naked
//Which is called in 51: Masturbation Battle and 105: Bed Sleep
Game_Actor.prototype.setWardenMapPose_Naked = function() {
	if(DEBUG_MODE) {
		$gameSwitches.setValue(SWITCH_IS_NAKED_NO_CLOTHES_ID, true);
		this._hasNoClothesOn = true;
		this.setTachieRightArm('naked1');
		this.setTachieLeftArm('naked1');
		this.setWardenMapPoseExtensions();
	}
};

Game_Actor.prototype.setWardenMapPoseExtensions = function() {
	if(this.tachieHead === 'normal_1') {
		this.setTachieSemenFaceExtension('head_normal_');
		if(this.tachieHoppe == 'down_1') this.setTachieHoppe('normal_1');
		if(this.tachieSweat == 'down_1') this.setTachieSweat('normal_1');
		else if(this.tachieSweat == 'down_2') this.setTachieSweat('normal_2');
		if(this.isWearingGlovesAndHat()) this.setTachieHat('normal_1');
	}
	else if(this.tachieHead === 'down_1'){
		this.setTachieSemenFaceExtension('head_down_');
		if(this.tachieHoppe) this.setTachieHoppe('down_1');
		if(this.tachieSweat == 'normal_1') this.setTachieSweat('down_1');
		else if(this.tachieSweat == 'normal_2') this.setTachieSweat('down_2');
		if(this.isWearingGlovesAndHat()) this.setTachieHat('down_1');
	}
	
	if(!this.isWearingGlovesAndHat()) {
		this.resetTachieHat();
	}
	
	if(this.didLastGetHitBySkillType(JUST_SKILLTYPE_WAITRESS_FLASH) && this.isInWaitressServingPose() && DEBUG_MODE) {
		
	}
	else if(this._hasNoClothesOn && DEBUG_MODE) {
		$gameSwitches.setValue(SWITCH_IS_NAKED_NO_CLOTHES_ID, true);
		let fileId = 'naked';
		if(this._tachieBoobsType == 'hold') fileId += '_hold';
		fileId += '_1';
		if((this.isAroused() || this.justOrgasmed()) && this.tachieHasBoobsHard()) fileId += '_hard';
		this.setTachieBoobs(fileId);
	}
	else {
		$gameSwitches.setValue(SWITCH_IS_NAKED_NO_CLOTHES_ID, false);
		this.setPoseClothing();
	}
	
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	
	if(this._tachieBoobsType == 'hold') {
		this.setTachieSemenBoobsExtension('hold_1_');
		this.setTachieSemenLeftArmExtension('boobs_hold_');
		this.setTachieSemenRightArmExtension('boobs_hold_');
		this.resetTachieRightArm();
		this.resetTachieLeftArm();
		this.resetTachieFrontA();
	}
	else {
		this.resetTachieSemenBoobsExtension();
		
		if(this.isWearingGlovesAndHat()) {
			if(this.tachieLeftArm == 'naked1')
				this.setTachieLeftArm(1);
			else if(this.tachieLeftArm == 'naked2')
				this.setTachieLeftArm(2);
			else if(this.tachieLeftArm == 'naked3')
				this.setTachieLeftArm(3);
			else if(this.tachieLeftArm == 'naked4')
				this.setTachieLeftArm(4);
			
			if(this.tachieRightArm === 'naked1')
				this.setTachieRightArm(1);
			else if(this.tachieRightArm === 'naked2')
				this.setTachieRightArm(2);
			else if(this.tachieRightArm === 'naked3')
				this.setTachieRightArm(3);
			else if(this.tachieRightArm === 'naked4')
				this.setTachieRightArm(4);
			else if(this.tachieRightArm === 'naked5')
				this.setTachieRightArm(5);
		}
		else {
			if(this.tachieLeftArm == 1)
				this.setTachieLeftArm('naked1');
			else if(this.tachieLeftArm == 2)
				this.setTachieLeftArm('naked2');
			else if(this.tachieLeftArm == 3)
				this.setTachieLeftArm('naked3');
			else if(this.tachieLeftArm == 4)
				this.setTachieLeftArm('naked4');
			
			if(this.tachieRightArm === 1)
				this.setTachieRightArm('naked1');
			else if(this.tachieRightArm === 2)
				this.setTachieRightArm('naked2');
			else if(this.tachieRightArm === 3)
				this.setTachieRightArm('naked3');
			else if(this.tachieRightArm === 4)
				this.setTachieRightArm('naked4');
			else if(this.tachieRightArm === 5)
				this.setTachieRightArm('naked5');
		}
		
		if(this.tachieLeftArm === 1 || this.tachieLeftArm == 'naked1')
			this.setTachieSemenLeftArmExtension('1_');
		else if(this.tachieLeftArm === 2 || this.tachieLeftArm == 'naked2')
			this.setTachieSemenLeftArmExtension('2_');
		else if(this.tachieLeftArm === 3 || this.tachieLeftArm == 'naked3')
			this.setTachieSemenLeftArmExtension('3_');
		else if(this.tachieLeftArm === 4 || this.tachieLeftArm == 'naked4')
			this.setMaxTachieSemenLeftArmId(0);
		else {
			this.resetTachieSemenLeftArmExtension();
			this.setMaxTachieSemenLeftArmId(0);
		}
		
		if(this.tachieRightArm === 1 || this.tachieRightArm == 'naked1')
			this.setTachieSemenRightArmExtension('1_');
		else if(this.tachieRightArm === 2 || this.tachieRightArm == 'naked2')
			this.setTachieSemenRightArmExtension('2_');
		else if(this.tachieRightArm === 3 || this.tachieRightArm == 'naked3')
			this.setTachieSemenRightArmExtension('3_');
		else if(this.tachieRightArm === 4 || this.tachieRightArm == 'naked4')
			this.setTachieSemenRightArmExtension('4_');
		else if(this.tachieRightArm === 5 || this.tachieRightArm == 'naked5') {
			this.setTachieSemenRightArmExtension('5_');
			this.setMaxTachieSemenRightArmId(1);
		}
		else {
			this.resetTachieSemenRightArmExtension();
			this.setMaxTachieSemenRightArmId(0);
		}
		
		if(this.tachieLeftArm === 2) {
			this.setTachieFrontA('leftarm_2');
			this.setTachieLeftArmInFrontOfBoobs(false);
		}
		else if(this.tachieLeftArm == 'naked2') {
			this.setTachieFrontA('leftarm_naked2');
			this.setTachieLeftArmInFrontOfBoobs(false);
		}
		else {
			this.resetTachieFrontA();
			this.setTachieLeftArmInFrontOfBoobs(true);
		}
		
		if(this.tachieRightArm == 'zipper_1') {
			this.setTachieRightArmInFrontOfBody(true);
			this.setTachieRightArmInFrontOfBoobs(true);
		}
		else if(this.tachieRightArm == 'holdingtray_1') {
			this.setTachieRightArmInFrontOfBody(true);
			this.setTachieRightArmInFrontOfBoobs(false);
		}
		else {
			this.setTachieRightArmInFrontOfBody(false);
			this.setTachieRightArmInFrontOfBoobs(false);
		}
			
	}
};

/////////////
// Combat Poses - Standard
// Only for generic battles, special battles do not use combat poses
///////////////

Game_Actor.prototype.setStandbyPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_STANDBY;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_STANDBY);
	
	this.setPosePanties();
	this.setSpankablePose(true);
	this.setTachieRightArmInFrontOfLeftArm(false);
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieLeftArmInFrontOfBody(false);
	this.setTachieRightArmInFrontOfBoobs(false);
	this.setTachieLeftArmInFrontOfBoobs(false);
	this.setTachieWeaponBehindEverything(true);
	
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	this.setSpriteBattlerPosData(POSE_STANDBY);
	this.setAllBodySlotsFreeExceptToy();
	this.setTachieWeaponInFrontOfBody(false);
	
	if(notAlreadyInSamePose)
		this.emoteStandbyPose();
	
	BattleManager.playNormalBgm();
};
Game_Actor.prototype.setAttackPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_ATTACK;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_ATTACK);
	
	this.setPosePanties();
	//this.setPoseWeapon();
	this.setTachiePussyToyInFrontOfAnalToy(false);
	this.setTachieWeaponInFrontOfBoobs(false);
	
	if(!this.isWearingGlovesAndHat()) {
		this.setTachieBody('naked_1');
		if((this.isAroused() || this.justOrgasmed())) 
			this.setTachieBoobs('naked_1_hard');
		else
			this.setTachieBoobs('naked_1');
		this.resetTachieHat();
	}
	else {
		this.setTachieHat(1);
		this.setPoseClothing();
	}
	
	this.setMaxTachieSemenBackId(3);
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	this.setSpriteBattlerPosData(POSE_STANDBY);
	this.setAllBodySlotsFreeExceptToy();
	
	BattleManager.playNormalBgm();
	
	if(notAlreadyInSamePose)
		this.emoteAttackPose();
};
Game_Actor.prototype.setDefendPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_DEFEND;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_DEFEND);
	
	this.setPosePanties();
	this.setPoseWeapon();
	
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	this.setSpriteBattlerPosData(POSE_DEFEND);
	this.setAllBodySlotsFreeExceptToy();
	
	BattleManager.playNormalBgm();
	
	if(notAlreadyInSamePose)
		this.emoteDefendPose();
	else {
		let hasHalberd = this.hasHalberd();
		if(hasHalberd) {
			this.setTachieLeftArm('halberd');
			this.setTachieRightArm('halberd');
			this.resetTachieSemenLeftArmExtension();
			this.resetTachieSemenRightArmExtension();
		}
		else {
			this.setTachieLeftArm('unarmed');
			this.setTachieRightArm('unarmed');
			this.setTachieSemenLeftArmExtension('unarmed_');
			this.setTachieSemenRightArmExtension('unarmed_');
		}
	}
};
Game_Actor.prototype.setEvadePose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_EVADE;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_EVADE);
	
	this.setPosePanties();
	this.setPoseWeapon();
	this.setSpankablePose(true);
	this.setTachiePussyToyInFrontOfAnalToy(false);
	this.setTachieClitToyInFrontOfMainToys(false);
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBackId(3);
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	this.setSpriteBattlerPosData(POSE_EVADE);
	
	BattleManager.playNormalBgm();
	
	if(notAlreadyInSamePose)
		this.emoteEvadePose();
};

//////
// Unarm Poses
/////////

Game_Actor.prototype.setUnarmedPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_UNARMED;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_UNARMED);
	
	this.setSpriteBattlerPosData(POSE_UNARMED);
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	
	this.setPosePanties();
	this.setTachieRightArmInFrontOfBody(false);
	this.setSpankablePose(true);
	
	if(!this.isWearingGlovesAndHat()) {
		this.setTachieBody('naked_1');
		this.setTachieLeftArm('naked_1');
		this.setTachieRightArm('naked_1');
		if((this.isAroused() || this.justOrgasmed())) 
			this.setTachieBoobs('naked_1_hard');
		else
			this.setTachieBoobs('naked_1');
		this.resetTachieHat();
	}
	else {
		this.setTachieHat(1);
		this.setTachieLeftArm(1);
		this.setTachieRightArm(1);
		this.setPoseClothing();
	}
		
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	BattleManager.playNormalBgm();
	
	if(notAlreadyInSamePose)
		this.emoteUnarmedPose();
};

Game_Actor.prototype.setKickPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_KICK;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_KICK);
	
	this.setSpriteBattlerPosData(POSE_KICK);
	
	if(!this.isWearingGlovesAndHat()) {
		this.resetTachieHat();
		if(Karryn.isCensored())
			this.setTachieBody('naked_1_cen');
		else
			this.setTachieBody('naked_1');

		if((this.isAroused() || this.justOrgasmed())) 
			this.setTachieBoobs('naked_1_hard');
		else
			this.setTachieBoobs('naked_1');
	}
	else {
		this.setTachieHat(1);
		if(Karryn.isCensored())
			this.setTachieBody('1_cen');
		else
			this.setTachieBody('1');
		this.setPoseClothing();
	}
	
	this.setTachieFrontA('feet1');
	this.setPosePanties();
	this.setPoseWeapon();
	this.setSpankablePose(true);
	this.setTachiePantiesInFrontOfBoobs(true);
	this.setTachiePussyToyInFrontOfAnalToy(true);
	this.setTachieClitToyInFrontOfMainToys(false);
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieWeaponBehindEverything(true);
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBackId(3);
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	BattleManager.playNormalBgm();
	
	if(notAlreadyInSamePose)
		this.emoteKickPose();
};


Game_Actor.prototype.isInCombatPose = function() {
	let pose = this.poseName;
	return ( pose == POSE_ATTACK || pose == POSE_DEFEND || pose == POSE_EVADE ||
	pose == POSE_STANDBY || pose == POSE_UNARMED || pose == POSE_KICK );
};

Game_Actor.prototype.isInUnarmedPose = function() {
	let pose = this.poseName;
	return ( pose == POSE_UNARMED );
};

Game_Actor.prototype.isInKickPose = function() {
	let pose = this.poseName;
	return pose == POSE_KICK;
};

Game_Actor.prototype.isInJobPose = function() {
	return $gameParty.isInWaitressBattle || this.isInReceptionistPose();
};

Game_Actor.prototype.isAttackable = function() {
	return (this.isInCombatPose() && this.stamina >= 1);
};


///////
// Down Pose
//////////

//POSE_DOWN_STAMINA = Down pose for no Stamina
Game_Actor.prototype.setDownStaminaPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_DOWN_STAMINA;
	
	if(notAlreadyInSamePose) {
		this.setPose(POSE_DOWN_STAMINA);
		this.removeStatesBeforeSex();
		this.addToActorDebuffDownStaminaRecord();
	}
	
	this.setPosePanties();
	this.setSpankablePose(true);

	
	this.setSpriteBattlerPosData(POSE_DOWN_STAMINA);
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	BattleManager.playDownStaminaBgmChange();
	//BattleManager.playSpecialBgm_DownStamina();
	
	if(notAlreadyInSamePose) {
		this.passiveDownStaminaState_addHornyEffect();
		this.passiveDownStaminaState_increaseCooldown();
		this.emoteDownStaminaPose();
		BattleManager.actionRemLines(KARRYN_LINE_DOWN_STAMINA);
	}
}

//POSE_DOWN_ORGASM = Down pose for having an orgasm 
Game_Actor.prototype.setDownOrgasmPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_DOWN_ORGASM;
	
	if(notAlreadyInSamePose)
		this.setPose(POSE_DOWN_ORGASM);
	
	this.removeStatesBeforeSex();

	this.setTachieHat(1);
	this.setTachieHasBoobsHard(false);
	this.setPoseClothing();
	this.setPosePanties();
	this.setSpankablePose(true);
	this.setTachieRightArmInFrontOfLeftArm(false);
	this.setTachieRightArmInFrontOfBoobs(false);
	this.setTachieLeftArmInFrontOfBoobs(false);
	
	if(Karryn.isCensored())
		this.setTachieBody('1_cen');
	
	if(!this.isWearingGlovesAndHat()) {
		this.setTachieRightArm('naked_1');
		this.setTachieLeftArm('naked_1');
	}
	else {
		this.setTachieRightArm(1);
		this.setTachieLeftArm(1);
	}
	
	this.setSpriteBattlerPosData(POSE_DOWN_ORGASM);
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBackId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenCrotchPantiesId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	this.setMaxTachieWetPantiesId(3);
	
	//BattleManager.playDownBgmChange();
	BattleManager.playSpecialBgm_DownOther();
};

Game_Actor.prototype.setDownFallDownPose = function() {
	let pose = this.poseName;
	let notAlreadyInSamePose = pose != POSE_DOWN_FALLDOWN;
	
	if(notAlreadyInSamePose) {
		this.setPose(POSE_DOWN_FALLDOWN);
		this.removeStatesBeforeSexExceptFallen();
	}
	
	this.setPosePanties();
	
	
	
	if(!this.isWearingGlovesAndHat()) {
		if(Karryn.isCensored())
			this.setTachieBody('naked_1_cen');
		else
			this.setTachieBody('naked_1');
		
		if((this.isAroused() || this.justOrgasmed())) 
			this.setTachieBoobs('naked_1_hard');
		else
			this.setTachieBoobs('naked_1');
	}
	else {
		if(Karryn.isCensored())
			this.setTachieBody('1_cen');
		else
			this.setTachieBody('1');
	}
	
	this.setSpriteBattlerPosData(POSE_DOWN_FALLDOWN);
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setTachiePussyToyInFrontOfAnalToy(true);
	this.setTachieClitToyInFrontOfMainToys(false);
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	//BattleManager.playDownBgmChange();
	BattleManager.playSpecialBgm_DownOther();
	
	if(notAlreadyInSamePose) {
		this.emoteDownFalldownPose();
		BattleManager.actionRemLines(KARRYN_LINE_DOWN_FALLDOWN);
	}
}

Game_Actor.prototype.isInDownPose = function() {
	return (this.isInDownOrgasmPose() || this.isInDownStaminaPose() || this.isInDownFallDownPose());
}
Game_Actor.prototype.isInDownOrgasmPose = function() {
	return this.poseName == POSE_DOWN_ORGASM;
}
Game_Actor.prototype.isInDownStaminaPose = function() {
	return this.poseName == POSE_DOWN_STAMINA;
}
Game_Actor.prototype.isInDownFallDownPose = function() {
	return this.poseName == POSE_DOWN_FALLDOWN;
}

////////
// Sex Pose
////////////

//Ready to change into sex pose
Game_Actor.prototype.isInReadyPose = function() {
	//todo: proper code? karryn can not change poses in certain poses?
	return true;
};

Game_Actor.prototype.isInSexPose = function() {
	return !this.isInCombatPose() && !this.isInDownPose() && 
	!this.isInWaitressServingPose();
};

Game_Actor.prototype.isInFuckedFromBehindSexPose = function() {
	if(!this.pussySexPoseSkillsIsEnabled() && !this.analSexPoseSkillsIsEnabled()) return false;
	return this.isInDefeatedLevel2Pose() || this.isInGoblinCunnilingusSexPose() || this.isInLayingTittyfuckSexPose() || this.isInRimjobSexPose() || this.isInWaitressSexPose();
};

///////////
// Set Sex Pose
//////////////

Game_Actor.prototype.isInThugGangbangPose = function() {
	return this.poseName == POSE_THUGGANGBANG;
};
Game_Actor.prototype.setThugGangbangSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_THUGGANGBANG, dontReset);
	this.setSpriteBattlerPosData(POSE_THUGGANGBANG);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.removePussyToy();
	this.setTachieLeftArmInFrontOfBody(false);
	
	this.setTachieRightArm('empty');
	this.setTachieLeftArm('empty');
	this.setTachieBoobs('empty');
	this.setTachieHat(1);
	
	if(Karryn.isCensored())
		this.setTachieBody('1_cen');
	
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);

	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(BUTT_ID);
	this.setBodyPartUnavailable(ANAL_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setAllowTachieUpdate(true);
	
	BattleManager.playSpecialBgm_Sex();
	
	this.emoteThugGangbangPose();
};

Game_Actor.prototype.isInGuardGangbangPose = function() {
	return this.poseName == POSE_GUARDGANGBANG;
};
Game_Actor.prototype.setGuardGangbangSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_GUARDGANGBANG, dontReset);
	this.setSpriteBattlerPosData(POSE_GUARDGANGBANG);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.removePussyToy();
	this.setSpankablePose(true);

	if(!this.isWearingGlovesAndHat()) {
		if(Karryn.isCensored())
			this.setTachieBody('naked_1_cen');
		else
			this.setTachieBody('naked_1');
		this.resetTachieHat();
	}
	else {
		if(Karryn.isCensored())
			this.setTachieBody('1_cen');
		else
			this.setTachieBody(1);
		this.setTachieHat(1);
	}
	
	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieSemenBackId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);
	this.setMaxTachieSemenCockPussyId(1);

	this.setBodyPartFree_PettingOnly_NoToys(CLIT_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setAllowTachieUpdate(true);
	
	BattleManager.playSpecialBgm_Sex();
	
	this.emoteGuardGangbangPose();
};

Game_Actor.prototype.isInGoblinCunnilingusSexPose = function() {
	return this.poseName == POSE_GOBLINCUNNILINGUS;
};
Game_Actor.prototype.setGoblinCunnilingusSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_GOBLINCUNNILINGUS, dontReset);
	this.setSpriteBattlerPosData(POSE_GOBLINCUNNILINGUS);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.removeClitToy();
	this.removePussyToy();
	this.setSpankablePose(true);
	
	this.setTachieFrontA('goblin');
	
	this.setTachieBoobsInFrontOfBody(true);
	
	this.setMaxTachieSemenAnalId(3);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);

	this.setBodyPartFree_PettingOnly_NoToys(CLIT_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(BUTT_ID);
	this.setBodyPartFree_PettingOnly(ANAL_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setAllowTachieUpdate(true);
	
	BattleManager.playSpecialBgm_Sex();
	
	this.emoteGoblinCunnilingusPose();
};

Game_Actor.prototype.setKickCounterSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_KICKCOUNTER, dontReset);
	this.setSpriteBattlerPosData(POSE_KICKCOUNTER);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.removeClitToy();
	this.removePussyToy();
	this.setSpankablePose(true);
	
	this.setTachieHat('normal1');
	this.setTachieBody('normal1');
	this.setTachieBackC('normal1');

	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(0);
	this.setMaxTachieWetId(1);

	this.setBodyPartFree_PettingOnly(MOUTH_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly_NoToys(CLIT_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	BattleManager.playSpecialBgm_Sex();
	this.emoteKickCounterPose(false, true);
	this.setAllowTachieUpdate(true);
};

Game_Actor.prototype.isInRimjobSexPose = function() {
	return this.poseName == POSE_RIMJOB;
};
Game_Actor.prototype.setRimjobSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_RIMJOB, dontReset);
	this.setSpriteBattlerPosData(POSE_RIMJOB);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(true);
	
	this.setTachieEyes(1);
	this.setTachieHat(1);
	this.setTachieHoppe(1);
	this.setTachieSweat(1);
	this.setTachieFrontA('leftarm_1');
	this.setTachieBackA('rightleg_1');
	this.setTachieHolesCocksToysInFrontOfBody(false);
	this.setTachieFrontInFrontOfFace(true);
	
	if(!this.isWearingGlovesAndHat()) {
		this.setTachieBody('naked_1');
		this.setTachieFrontA('leftarm_naked_1');
	}
	
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieWetId(1);
	this.setMaxTachieDroolMouthId(1);
	
	this.setBodyPartFree_PettingOnly(MOUTH_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
};

Game_Actor.prototype.isInFootjobSexPose = function() {
	return this.poseName == POSE_FOOTJOB;
};
Game_Actor.prototype.setFootjobSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_FOOTJOB, dontReset);
	this.setSpriteBattlerPosData(POSE_FOOTJOB);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(false);
	
	this.setTachieLeftArmInFrontOfBody(false);
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieRightArmInFrontOfLeftArm(false);
	this.setTachieToysInFrontOfEverything(true);
	
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieWetId(1);
	this.setMaxTachieSemenLeftLegId(1);
	this.setMaxTachieSemenRightLegId(1);
	
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartFree_PettingOnly(PUSSY_ID);
	this.setBodyPartUnavailable(BUTT_ID);
	this.setBodyPartUnavailable(ANAL_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
	this.emoteFootjobPose();
};

Game_Actor.prototype.isInStandingHJSexPose = function() {
	return this.poseName == POSE_HJ_STANDING;
};
Game_Actor.prototype.setStandingHJSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_HJ_STANDING, dontReset);
	this.setSpriteBattlerPosData(POSE_HJ_STANDING);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(true);
	this.setTachieLeftArmInFrontOfBody(true);
	this.setTachieLeftArmInFrontOfBoobs(false);
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieBoobsErectionTrue();
	
	if(!this.isWearingGlovesAndHat()) {
		this.setTachieBody('naked_1');
	}
	
	this.setTachieEyes(1);
	this.setTachieHat(1);
	this.setTachieHoppe(1);
	this.setTachieSweat(1);
	this.setTachieLeftArm('empty');
	
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);
	this.setMaxTachieSemenCockRightArmId(1);
	

	this.setBodyPartFree_PettingOnly(MOUTH_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(BUTT_ID);
	this.setBodyPartFree_PettingOnly(ANAL_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartFree_PettingOnly(PUSSY_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
	this.emoteStandingHandjobPose();
};

Game_Actor.prototype.isInKneelingBJSexPose = function() {
	return this.poseName == POSE_BJ_KNEELING;
};
Game_Actor.prototype.setKneelingBJSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_BJ_KNEELING, dontReset);
	this.setSpriteBattlerPosData(POSE_BJ_KNEELING);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();

	if(!this.isWearingGlovesAndHat()) {
		this.setTachieBody('naked_1');
	}

	this.setTachieEyes('lookleft_1');
	this.setTachieHat(1);
	this.setTachieHoppe(1);
	this.setTachieRightArm('empty');
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieSemenRightArmExtension('empty_');
	this.setTachieFrontInFrontOfFace(true);
	
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieSemenCockMouthId(1);
	this.setMaxTachieWetId(1);
	
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(BUTT_ID);
	this.setBodyPartUnavailable(ANAL_ID);
	this.setBodyPartUnavailable(PUSSY_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
	this.emoteMasterManager();
};

Game_Actor.prototype.isInLayingTittyfuckSexPose = function() {
	return this.poseName == POSE_PAIZURI_LAYING;
};
Game_Actor.prototype.setLayingTittyfuckSexPose = function() {
	this.setAllowTachieUpdate(false);
	let dontReset = this._dontResetSexPose;
	this.setPose(POSE_PAIZURI_LAYING, dontReset);
	this.setSpriteBattlerPosData(POSE_PAIZURI_LAYING);
	if(dontReset) {
		this.setAllowTachieUpdate(true);
		this.emoteMasterManager();
		this._dontResetSexPose = false;
		return;
	}
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();

	this.setTachieEyes(1);
	this.setTachieHat(1);
	this.setTachieMouth(1);
	this.setTachieBackB('body');
	this.setTachieBody(1);
	this.setTachieSemenBoobsExtension('body1_');
	
	this.setSpankablePose(true);
	this.setTachieHolesCocksToysInFrontOfBody(false);
	this.setTachieToysInBehindOfEverything(true);
	
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(0);
	
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartUnavailable(CLIT_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
	this.emoteMasterManager();
};

Game_Actor.prototype.isInSlimeAnalPiledriverSexPose = function() {
	return this.poseName == POSE_SLIME_PILEDRIVER_ANAL;
};
Game_Actor.prototype.setSlimeAnalPiledriverPose = function() {
	this.setAllowTachieUpdate(false);
	this.setPose(POSE_SLIME_PILEDRIVER_ANAL);
	this.setSpriteBattlerPosData(POSE_SLIME_PILEDRIVER_ANAL);
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.removeAnalToy();

	this.setTachieEyes(1);
	this.setTachieHat(1);
	this.setTachieMouth(1);
	this.setTachieCockAnal('slime');
	this.setSpankablePose(true);
	
	if(Karryn.isCensored())
		this.setTachieBody('1_cen');
	
	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);
	this.setTachieSemenCrotchExtension('empty_');
	
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartFree_PettingOnly(BUTT_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	this.setAllowTachieUpdate(true);
	BattleManager.playSpecialBgm_Sex();
	this.emoteMasterManager();
};



////////////
// Masturbation Pose
/////////////////////

Game_Actor.prototype.isInMasturbationPose = function() {
	return (this.isInMasturbationLevel1Pose());
};
Game_Actor.prototype.isInMasturbationLevel1Pose = function() {
	return this.poseName == POSE_MASTURBATE1;
};

Game_Actor.prototype.setMasturbationLevel1Pose = function() {
	this.setPose(POSE_MASTURBATE1);
	this.setSpriteBattlerPosData(POSE_MASTURBATE1);
	this.takeOffPanties();
	this.removeClothing();
	this.removeAllPettedToyInsert();
	this.setAllBodySlotsFree();
	this.setTachieHasBoobsHard(false);
	this.setTachieHeadInFrontOfBody(false);
	
	this.setMaxTachieWetId(3);
	this.setMaxTachieDroolFingersId(0);
	this.setMaxTachieDroolNipplesId(0);
	
	this.setTachieEyes('close_1');
	this.setTachieHead('close');
	this.setTachieMouth('close_1');
	this.setTachieHair('close');
	this.masturbateBattle_resetLeftHand();
	this.masturbateBattle_resetRightHand();
	
	if(Karryn.isCensored()) {
		this.setTachieBody('1_cen');
	}
};

///////////
// Waitress Pose

Game_Actor.prototype.isInWaitressServingPose = function() {
	return $gameParty.isInWaitressBattle && this.isInMapPose();
};
Game_Actor.prototype.setWaitressServingPose = function() {
	this.removeAllPettedToyInsert();
	this.setAllBodySlotsFree();
	this.setSpriteBattlerPosData(POSE_MAP);
	this.setBodyPartFree_PettingOnly_NoToys(CLIT_ID);
	this.setBodyPartFree_PettingOnly_NoToys(PUSSY_ID);
	this.setBodyPartFree_PettingOnly_NoToys(ANAL_ID);
	
	this.setPose(POSE_MAP);
	this.setTachieBody(2);
	this.setTachieHead('normal_1');
	this.takeOffGlovesAndHat();
	this.resetTachieHat();
	this.setBoobsType('waitress');
	this.setPoseClothing();
	this.setPosePanties();
	this.setTachieRightArmInFrontOfBody(true);
	this.setTachieRightArmInFrontOfBoobs(false);
	this.setTachieSemenBellyAndBoobsInFrontOfBoobs(true);
	this.setSpankablePose(true);

	this.setMaxTachieSemenBellyId(3);
	this.setMaxTachieSemenBoobsId(3);
	this.setMaxTachieSemenButtId(3);
	this.setMaxTachieSemenCrotchId(3);
	this.setMaxTachieSemenFaceId(3);
	this.setMaxTachieSemenLeftArmId(3);
	this.setMaxTachieSemenRightArmId(3);
	this.setMaxTachieWetId(3);
	
	this.emoteWaitressServingPose();
};

Game_Actor.prototype.isInWaitressSexPose = function() {
	let pose = this.poseName;
	return ( pose == POSE_WAITRESS_SEX );
	return $gameParty.isInWaitressBattle && !this.isInMapPose();
};
Game_Actor.prototype.setWaitressSexPose = function() {
	this.setAllowTachieUpdate(false);
	this.setPose(POSE_WAITRESS_SEX);
	this.setSpriteBattlerPosData(POSE_WAITRESS_SEX);
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(true);
	this.setTachieHolesCocksToysInFrontOfBody(false);
	
	this.setTachieBody(1);
	this.setTachieRightArm('empty');
	
	this.setMaxTachieSemenBackId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);

	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(CLIT_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	
	$gameMap.changeBattleback(BATTLEBACK1_BAR_WAITRESS_SEX_NAME, null);
	BattleManager.changeBattleback(BATTLEBACK1_BAR_WAITRESS_SEX_NAME, null);
	
	BattleManager.playSpecialBgm_WaitressSex();
	this.emoteWaitressSexPose();
	this.setAllowTachieUpdate(true);
	BattleManager.actionRemLines(KARRYN_LINE_WAITRESS_TABLE_START);
};

///////////
// Waitress Pose

Game_Actor.prototype.isInReceptionistPose = function() {
	return this.poseName == POSE_RECEPTIONIST;
};
Game_Actor.prototype.setReceptionistPose = function() {
	this.setAllowTachieUpdate(false);
	this.setPose(POSE_RECEPTIONIST, false);
	this.setSpriteBattlerPosData(POSE_RECEPTIONIST);
	this.removeStatesBeforeSex();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(true);
	
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieWetId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenDeskId(3);
	
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartFree_PettingOnly(THIGHS_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setAllowTachieUpdate(true);
	
	this.emoteReceptionistPose();
};

//////
// No Stamina Defeat Pose

// Lose the battle when in the following poses with no stamina
Game_Actor.prototype.isInNoStaminaIsDefeatPose = function() {
	return this.isInMasturbationPose();
};


//////
// Ignore Metal Properties Pose
Game_Actor.prototype.isInIgnoreMetalPropertiesPose = function() {
	return this.isInDefeatedPose() || $gameParty.isInWaitressBattle || this.isInReceptionistPose();
};

////////
// Ignore No Stamina and No Energy Pose

//Battle does not automatically end with no stamina and no energy
Game_Battler.prototype.isInNeverDeadPose = function() {
	return false;
};
Game_Actor.prototype.isInNeverDeadPose = function() {
	return this.isInDefeatedPose();
};

///////////
// No Ejaculation Stock does not mean it is over Pose

Game_Actor.prototype.isInNoEjaculationStockStillContinuesPose = function() {
	return this.isInWaitressSexPose();
};

///////
// Draw Enemies Above Tachie Pose

Game_Actor.prototype.isDrawEnemiesAboveBattleTachiePose = function() {
	return this.isInMasturbationLevel1Pose() || this.isInDefeatedPose() || this.isInReceptionistPose();
};

/////////////
// Don't Gain Fatigue Per Turn Pose

Game_Actor.prototype.isDontGainFatiguePerTurnPose = function() {
	return this.isInMasturbationLevel1Pose() || this.isInDefeatedPose() || this.isInJobPose();
};


///////
// Show Enemy Name Only During Valid Selection Pose

Game_Actor.prototype.isInShowEnemyNameOnlyDuringValidSelectionPose = function() {
	return this.isInDefeatedPose() || this.isInWaitressSexPose();
};
Game_Actor.prototype.isInShowEnemyImageOnlyDuringValidSelectionPose = function() {
	return this.isInMasturbationLevel1Pose() || this.isInDefeatedPose() || this.isInWaitressSexPose();
};
Game_Actor.prototype.isInShowEnemyGaugeOnlyDuringValidSelectionPose = function() {
	return this.isInDefeatedPose() || this.isInWaitressSexPose();
};
Game_Actor.prototype.isInReorderEnemyImagesOnSelectionPose = function() {
	return this.isInDefeatedPose() || this.isInWaitressSexPose();
};
Game_Actor.prototype.isInDrawEnemiesAtHalfWidthPose = function() {
	return $gameParty.isInWaitressBattle || this.isInDefeatedPose();
};
Game_Actor.prototype.isInEnemiesDontRegenPleasurePose = function() {
	return this.isInWaitressServingPose();
};
Game_Actor.prototype.isInEnemiesJoinArousedAndStayArousedPose = function() {
	return this.isInDefeatedPose() || this.isInWaitressSexPose();
};

////////
// Set Defeat Poses
////////////////

Game_Actor.prototype.isInDefeatedPose = function() {
	return this.isInDefeatedLevel1Pose() || this.isInDefeatedLevel2Pose() || this.isInDefeatedGuardPose();
};

Game_Actor.prototype.isInDefeatedLevel1Pose = function() {
	return this.poseName == POSE_DEFEATED_LEVEL1;
};
Game_Actor.prototype.setDefeatedLevel1Pose = function() {
	this.setPose(POSE_DEFEATED_LEVEL1);
	this.setSpriteBattlerPosData(POSE_DEFEATED_LEVEL1);
	this.takeOffPanties();
	this.removeClothing();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	
	this.setTachieHat(1);
	this.setTachieEyes(1);
	this.setTachieMouth(1);
	this.setTachieHoppe(1);

	//this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieSemenLeftBoobId(1);
	this.setMaxTachieSemenRightBoobId(1);
	this.setMaxTachieSemenFaceId(1);
	
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartUnavailable(CLIT_ID);
	this.setBodyPartUnavailable(PUSSY_ID);
	this.setBodyPartUnavailable(ANAL_ID);
	this.setBodyPartUnavailable(BUTT_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setBodyPartUnavailable(THIGHS_ID);
	
	this.emoteMasterManager();
};

Game_Actor.prototype.isInDefeatedLevel2Pose = function() {
	return this.poseName == POSE_DEFEATED_LEVEL2;
};
Game_Actor.prototype.setDefeatedLevel2Pose = function() {
	this.setPose(POSE_DEFEATED_LEVEL2);
	this.setSpriteBattlerPosData(POSE_DEFEATED_LEVEL2);
	this.takeOffPanties();
	this.removeClothing();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(true);
	
	this.setTachieHat(1);
	this.setTachieEyes('yoko1');
	this.setTachieEyebrows('koma1');
	this.setTachieMouth('ahe1');
	this.setTachieHoppe(1);
	this.setTachieClitToyInFrontOfMainToys(false);
	this.setTachieAnalToyInFrontOfEverything(true);
	
	if(Karryn.isCensored())
		this.setTachieBody('1_cen');
	
	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieSemenBackId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenButtTopRightId(1);
	this.setMaxTachieSemenButtBottomRightId(1);
	this.setMaxTachieSemenButtTopLeftId(1);
	this.setMaxTachieSemenButtBottomLeftId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);
	
	this.setBodyPartFree_PettingOnly(MOUTH_ID);
	this.setBodyPartFree_PettingOnly(BOOBS_ID);
	this.setBodyPartFree_PettingOnly(NIPPLES_ID);
	this.setBodyPartUnavailable(STOMACH_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setBodyPartUnavailable(THIGHS_ID);
	
	this.emoteMasterManager();
};

Game_Actor.prototype.isInDefeatedGuardPose = function() {
	return this.poseName == POSE_DEFEATED_GUARD;
};
Game_Actor.prototype.setDefeatedLevelGuardPose = function() {
	this.setPose(POSE_DEFEATED_GUARD);
	this.setSpriteBattlerPosData(POSE_DEFEATED_GUARD);
	this.takeOffPanties();
	this.removeClothing();
	this.removeAllPettedInsertExceptToy();
	this.setAllBodySlotsFreeExceptToy();
	this.setSpankablePose(false);
	
	this.setTachieClitToyInFrontOfMainToys(false);
	this.setTachieAnalToyInFrontOfEverything(true);
	this.setTachieRightArmInFrontOfBody(false);
	this.setTachieLeftArmInFrontOfBody(false);
	this.setTachieLeftArmInFrontOfBoobs(false);
	this.setTachieRightArmInFrontOfBoobs(false);
	
	if(!this.isWearingGlovesAndHat()) {
		if(Karryn.isCensored())
			this.setTachieBody('naked_1_cen');
		else
			this.setTachieBody('naked_1');
		this.resetTachieHat();
	}
	else {
		if(Karryn.isCensored())
			this.setTachieBody('1_cen');
		else
			this.setTachieBody(1);
		this.setTachieHat(1);
	}

	this.setMaxTachieSemenAnalId(1);
	this.setMaxTachieSemenBoobsId(1);
	this.setMaxTachieSemenBellyId(1);
	this.setMaxTachieSemenButtId(1);
	this.setMaxTachieSemenCrotchId(1);
	this.setMaxTachieSemenFaceId(1);
	this.setMaxTachieSemenLeftArmId(1);
	this.setMaxTachieSemenRightArmId(1);
	this.setMaxTachieWetId(1);
	
	this.setTachieBoobs('empty');
	this.setTachieSemenBoobsExtension('empty_');

	this.setBodyPartUnavailable(BUTT_ID);
	this.setBodyPartUnavailable(RIGHT_HAND_ID);
	this.setBodyPartUnavailable(LEFT_HAND_ID);
	this.setBodyPartUnavailable(FEET_ID);
	this.setBodyPartUnavailable(THIGHS_ID);
	
	this.emoteDefeatedGuardPose();
};

/////////
// Situations
//////////////

Game_Actor.prototype.setPreBattlePose = function() {
	if(this.hasHalberd()) {
		this.setStandbyPose();
	}	
	else {
		this.setUnarmedPose();
	}
};

//Karryn takes damage
Remtairy.Poses.Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
	Remtairy.Poses.Game_Actor_performDamage.call(this);
	let result = this.result();
	//Combat pose only
	if(this.isInCombatPose()) {
		//Graze result
		if(result.graze) {
			this.gainStaminaExp(15, $gameTroop.getAverageEnemyExperienceLvl());
			this.gainAgilityExp(60, $gameTroop.getAverageEnemyExperienceLvl());
			this.setEvadePose();
			this.passiveEvadePoseEffect();
			//this.setHp(this.hp - Math.round(this.agi/2));
		}
		//Hit result
		else {
			//Stamina damage
			if((result.staminaDamage > 0 || result.hpDamage > 0) && !this.hasNoStamina()) {
				this.gainStrengthExp(30, $gameTroop.getAverageEnemyExperienceLvl());
				this.gainStaminaExp(25, $gameTroop.getAverageEnemyExperienceLvl());
				this.gainEnduranceExp(15, $gameTroop.getAverageEnemyExperienceLvl());
				if(!result.skillTypeEnemyPetting && !result.skillTypeEnemySex && !result.skillTypeEnemyBukkake) {
					this.setDefendPose();
				}
			}
		}
		
	} //end combat pose
	//Sex or down pose
	else {
		
		if((result.staminaDamage > 0 || result.hpDamage > 0) && !this.hasNoStamina()) {
			this.gainStrengthExp(15, $gameTroop.getAverageEnemyExperienceLvl());
			this.gainStaminaExp(15, $gameTroop.getAverageEnemyExperienceLvl());
		}
		
		
	}
	
	//Critically hitted
	if(result.critical) {
		this.gainEnduranceExp(120, $gameTroop.getAverageEnemyExperienceLvl());
	}
};

//Karryn evades
Remtairy.Poses.Game_Actor_performEvasion = Game_Actor.prototype.performEvasion;
Game_Actor.prototype.performEvasion = function() {
    Remtairy.Poses.Game_Actor_performEvasion.call(this);
    
	if(this.isInCombatPose()) {
		this.gainAgilityExp(30, $gameTroop.getAverageEnemyExperienceLvl());
		this.setEvadePose();
		this.passiveEvadePoseEffect();
		this.setHp(this.hp - Math.round(this.agi/2));
	}
};


//Karryn is using skill
Remtairy.Poses.Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
	Remtairy.Poses.Game_Actor_performAction.call(this, action);
	
	if ((action.isActorAttackSkill() || action.isKickSkill()) && this.isInCombatPose()) {
		this.changeStanceBySkill(action.item());
		
		if(action.isKickSkill()) {
			this.setKickPose();
		}
		else if(this.isUsingHalberd()) {
			this.setAttackPose();
			this.passiveAttackPoseEffect();			
		}	
	}
};

/////////
// Refresh
////////////

//Gets called at the end of every action
Game_Actor.prototype.refreshPose = function() {
	if(this.isInSexPose()) {
		return;
	}
	
	if(this.isInJobPose()) {
		return;
	}
	
	if(this.isInMasturbationPose()) {
		return;
	}
	
	if(this.justOrgasmed()) {
		this.setDownOrgasmPose();
		return;
	}
	//In a down orgasm pose but state worn off
	else if(this.isInDownOrgasmPose() && !this.justOrgasmed()) {
		this.setStandbyPose(); 
	}

	if(this.hasNoStamina()) {
		this.setDownStaminaPose();
	}
	//In a down stamina pose but now has stamina
	else if(this.isInDownStaminaPose() && !this.hasNoStamina()) {
		this.setStandbyPose();
	}
	
	if(this.isStateAffected(STATE_FALLEN_ID)) {
		this.setDownFallDownPose();
	}
	//In a down fall down pose but doesn't have state anymore
	else if(this.isInDownFallDownPose()) {
		this.setStandbyPose();
	}
	
	if(this.isInCombatPose()) {
		if(this.hasNoStamina()) {
			this.setDownStaminaPose();
		}
		else if(this.isGuarding) {
			this.setDefendPose();
		}
		else if(this.hasHalberd()) {
			this.setStandbyPose();
		}	
		else {
			this.setUnarmedPose();
		}
	}
	
};

/////////
// Preload Karryn Poses

DKTools.PreloadManager.preloadKarrynPoses = function() {
	//if(ConfigManager.remCutinsSmootherLoading) 
	//{
		if(DEBUG_MODE) {
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/cutin/', hue: 0, caching: true });
		}
	//}
	
	if(ConfigManager.remSmootherCGLoading) {
	
		DKTools.PreloadManager.preloadImage({ path: 'img/chatface/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/attack/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/defend/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/down_falldown/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/down_stamina/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/evade/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/kick/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/map/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/receptionist/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/standby/', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/karryn/unarmed/', hue: 0, caching: true });
		
		DKTools.PreloadManager.preloadImage({ path: 'img/system/MapBorders_Bg.png', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/system/MapBorders_Bg_Bar.png', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/system/MapBorders_Bg_Eb.png', hue: 0, caching: true });
		DKTools.PreloadManager.preloadImage({ path: 'img/system/MapBorders_Bg_Outside.png', hue: 0, caching: true });
		
		if(DEBUG_MODE) {
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/bj_kneeling/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/defeated_guard/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/defeated_level1/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/defeated_level2/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/down_org/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/footj/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/goblin_cl/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/guard_gb/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/hj_standing/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/kick_counter/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/mas_1/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/paizuri_laying/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/rimming/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/slime_piledriver/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/thug_gb/', hue: 0, caching: true });
			DKTools.PreloadManager.preloadImage({ path: 'img/karryn/waitress_table/', hue: 0, caching: true });
			
			
		}
	
	}
};

