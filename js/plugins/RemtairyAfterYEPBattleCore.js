﻿const REM_RESTORE_DIGIT_HUE = [10, 200, 10, 160];
const REM_RESTORE_DIGIT_DURATION = 280;
const REM_ENERGY_DIGIT_HUE = [255, 10, 10, 160];
const REM_ENERGY_DIGIT_DURATION = 280;
const REM_PLEASURE_DIGIT_HUE = [255, 70, 244, 160];
const REM_PLEASURE_DIGIT_DURATION = 280;

//=============================================================================
 /*:
 * @plugindesc After YEP_BattleCore
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

/////////
// Game Battler
////////////////

Game_Battler.prototype.startDamagePopup = function() {
    var result = this.result();
	if (result.hpAffected) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.mpDamage = 0;
	  copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }
    if (result.tpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
	  copyResult.mpDamage = 0;
      this._damagePopup.push(copyResult);
    }	
    if (result.mpDamage !== 0) {
      var copyResult = JsonEx.makeDeepCopy(result);
      copyResult.hpAffected = false;
	   copyResult.tpDamage = 0;
      this._damagePopup.push(copyResult);
    }
};


///////////
// Sprite Damage
////////////////

//damage pop up push
Sprite_Damage.prototype.setup = function(target) {
    this._result = target.shiftDamagePopup();
	let result = this._result;
	let isSexualDamage = result.skillTypeEnemyPetting || result.skillTypeEnemySex || result.skillTypeEnemyBukkake || result.skillTypeEnemyTalk || result.skillTypeEnemySight;
	let isEnemySelfFeedback = target.isEnemy() && isSexualDamage;
	if(target.isActor() && isSexualDamage && !ConfigManager.remShowSexualDamagePopup) return;
	if(isEnemySelfFeedback) return;
	
	if (result.evaded) {
		this.createMiss();
	} else if (result.tpDamage !== 0 && result.mpDamage <= 0) {
		if(result.tpDamage < 0 && Math.round(target.getPercentOfOrgasmFromValue(-result.tpDamage)) !== 0) {
			let digitText = '';
			if(ConfigManager.displayPleasureAsPercent)
				digitText = target.getPercentOfOrgasmFromValue(-result.tpDamage);
			else
				digitText = -result.tpDamage;
			
			this.createDigits(2, digitText);
			if (result.critical) {
				this.setupPleasureEffect();
			}
		}
    } else if (result.hpAffected) {
		if(result.hpDamage < 0) 
			this.createDigits(1, result.hpDamage);
		else if(result.hpDamage > 0) 
			this.createDigits(0, result.hpDamage);
		
		if (result.critical) {
			this.setupCriticalEffect();
		}
    } else if (result.mpDamage !== 0) {
		if(target.isActor()) {
			if(result.mpDamage < 0) 
				this.createDigits(3, result.mpDamage);
			else if(result.mpDamage > 0) {
				this.createDigits(2, result.mpDamage);
				this.setupPleasureEffect();
			}
		}
    }
};

Sprite_Damage.prototype.createDigits = function(baseRow, value) {
    let string = Math.abs(value).toString();
    let row = baseRow;
    let w = this.digitWidth();
    let h = this.digitHeight();
    for (let i = 0; i < string.length; i++) {
        let sprite = this.createChildSprite();
        let n = Number(string[i]);
        sprite.setFrame(n * w, row * h, w, h);
        sprite.x = (i - (string.length - 1) / 2) * w;
        sprite.dy = -i;
    }
};

Sprite_Damage.prototype.setupRestoreEffect = function() {
    this._flashColor = REM_RESTORE_DIGIT_HUE.slice();
    this._flashDuration = REM_RESTORE_DIGIT_DURATION;
};
Sprite_Damage.prototype.setupEnergyEffect = function() {
    this._flashColor = REM_ENERGY_DIGIT_HUE.slice();
    this._flashDuration = REM_ENERGY_DIGIT_DURATION;
};
Sprite_Damage.prototype.setupPleasureEffect = function() {
    this._flashColor = REM_PLEASURE_DIGIT_HUE.slice();
    this._flashDuration = REM_PLEASURE_DIGIT_DURATION;
};

/////////
// BattleManager
/////////////////

BattleManager.actionDisplayAction = function() {
	if(this._targets) {
		this._logWindow.displayAction(this._subject, this._action.item(), this._targets[0]);
	}
	else
		this._logWindow.displayAction(this._subject, this._action.item());
    return false;
};

////////////
// Window BattleLog
/////////////////////

Window_BattleLog.prototype.displayAction = function(subject, item, target) {
    var numMethods = this._methods.length;
	var targetName = '';
	if(target) {
		targetName = target.displayName();
	}
    if (DataManager.isSkill(item)) {
		if(TextManager.isJapanese) {
			if(item.hasRemMessageJP[0]) {
				this.push('addText', item.remMessageJP[0].format(subject.displayName(),targetName));
			}
			else if (item.message1) {
				this.push('addText', subject.displayName() + item.message1.format(item.name));		
			}
			if(item.hasRemMessageJP[1]) {
				this.push('addText', item.remMessageJP[1].format(subject.displayName(),targetName));
			}
			else if (item.message2) {
				this.push('addText', item.message2.format(item.name));		
			}		
		}
		else if(TextManager.isEnglish) {
			if(item.hasRemMessageEN[0]) {
				this.push('addText', item.remMessageEN[0].format(subject.displayName(),targetName));
			}
			else if (item.message1) {
				this.push('addText', subject.displayName() + item.message1.format(item.name));		
			}
			if(item.hasRemMessageEN[1]) {
				this.push('addText', item.remMessageEN[1].format(subject.displayName(),targetName));
			}
			else if (item.message2) {
				this.push('addText', item.message2.format(item.name));		
			}			
		}
    } else {
        this.push('addText', TextManager.useItem.format(subject.displayName(), item.name));
    }
    if (this._methods.length === numMethods) {
        this.push('wait');
    }
};

/////////
// Window Help
////////////

Window_Help.prototype.drawSpecialSelectionText = function(action) {
    var wx = 0;
    var wy = (this.contents.height - this.lineHeight()) / 2;
    var text = '';
    if (action.isForUser()) {
      text = TextManager.yanflyBattleCoreUser;
    } else if (action.isForRandom()) {
      BattleManager.startAllSelection();
      var fmt = TextManager.yanflyBattleCoreRandomTargets;
      if (action.isForOpponent() && action.numTargets() !== 1) {
        var target = TextManager.yanflyBattleCoreEnemies;
      } else if (action.isForOpponent() && action.numTargets() === 1) {
        var target = TextManager.yanflyBattleCoreEnemy;
      } else if (action.isForFriend() && action.numTargets() !== 1) {
        var target = TextManager.yanflyBattleCoreAllies;
      } else {
       var target = TextManager.yanflyBattleCoreAlly;
      }
      text = fmt.format(target, Yanfly.Util.toGroup(action.numTargets()));
    } else if (action.isForAll()) {
      BattleManager.startAllSelection();
      var fmt = TextManager.yanflyBattleCoreAllTargets;
      if (action.isForOpponent()) {
        var target = TextManager.yanflyBattleCoreEnemies;
      } else {
        var target = TextManager.yanflyBattleCoreAllies;
      }
      text = fmt.format(target);
    }
    this.drawText(text, wx, wy, REM_BHD_HELP_WIDTH, 'center');
};
