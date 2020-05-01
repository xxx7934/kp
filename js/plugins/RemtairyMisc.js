﻿var Remtairy = Remtairy || {};
Remtairy.Misc = Remtairy.Misc || {};

var Imported = Imported || {};
Imported.RemtairyMisc = true;

const GLOSSARY_START = 102;
const GLOSSARY_END = 350;

const REM_Y_ICON_PADDING = 7;
const REM_X_ICON_PADDING = 6;
const REM_DPF = 210; //Movement. Lower is faster
const REM_PARAM_NAME_WIDTH_MAX = 400;

const REM_SELECTION_SIZE_ONE_WIDTH = 416;
const REM_SELECTION_SIZE_ONE_HEIGHT = 79;
const REM_SELECTION_SIZE_ONE_Y_BUFFER = 0;
const REM_SELECTION_SIZE_TWO_WIDTH = 416;
const REM_SELECTION_SIZE_TWO_HEIGHT = 156;
const REM_SELECTION_SIZE_TWO_Y_BUFFER = -39;
const REM_SELECTION_SIZE_THREE_WIDTH = 416;
const REM_SELECTION_SIZE_THREE_HEIGHT = 129;
const REM_SELECTION_SIZE_THREE_Y_BUFFER = -69;

const REM_SELECTION_SIZE_HALF_WIDTH = 218;

const REM_PLEASURE_GAUGE_BACK_COLOR = 19;
const REM_PLEASURE_GAUGE_COLOR_1 = 0;
const REM_PLEASURE_GAUGE_COLOR_2 = 27;
const REM_ENERGY_GAUGE_BACK_COLOR = 19;
const REM_ENERGY_GAUGE_COLOR_1 = 31;
const REM_ENERGY_GAUGE_COLOR_2 = 30;

const REM_TACHIE_NULL = 0;

const BATTLETACHIE_FULLSCREEN_APPEAR_X = 0;
const BATTLETACHIE_NORMAL_APPEAR_X = 0;
const BATTLETACHIE_HIDDEN_X = 1200;

const REM_BATTLELOG_HEIGHT = 810;

const REM_WAVE_LAYOUT_X = 1200;
const REM_WAVE_LAYOUT_Y = 0;
const REM_WAVE_NUMBER_X = 88;
const REM_WAVE_NUMBER_Y = 5;
const REM_WAVE_FONT_SIZE = 22;

const REM_TIMER_LAYOUT_X = 1166;
const REM_TIMER_LAYOUT_Y = 70;
const REM_TIMER_NUMBER_X = 122;
const REM_TIMER_NUMBER_Y = 5;
const REM_TIMER_FONT_SIZE = 22;

const REM_BATTLE_PAUSE_ARROW_X = 440;
const REM_BATTLE_PAUSE_ARROW_Y = 170;

//=============================================================================
 /*:
 * @plugindesc Misc
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const ACTOR_CHAT_FACE_ID = 2;
const CHAT_FOLDER_KARRYN = 'karryn';
const CHAT_FOLDER_EMPEROR = 'emperor';
const CHAT_FOLDER_YASU = 'yasu';
const CHAT_FOLDER_TONKIN = 'tonkin';
const CHAT_FOLDER_DOCTOR = 'doctor';

const FONT_GAMEFONT_NAME = 'GameFont';
const FONT_JAPANESE_NAME = 'SourceHanSansJP-Regular';

const TAG_ATTACK_SKILL = 'AttackSkill';
const TAG_KICK_SKILL = 'KickSkill';
const TAG_KISS_SKILL = 'KissSkill';
const TAG_COCK_PET_SKILL = 'CockPetSkill';
const TAG_SEX_SKILL = 'ActorSexSkill';
const TAG_ENEMY_ATTACK_SKILL = 'EnemyAttackSkill';
const TAG_ENEMY_TALK_SKILL = 'EnemyTalkSkill';
const TAG_ENEMY_SIGHT_SKILL = 'EnemySightSkill';
const TAG_ENEMY_PETTING_SKILL = 'EnemyPettingSkill';
const TAG_ENEMY_SEX_SKILL = 'EnemySexSkill';
const TAG_CREAMPIE_SKILL = 'CreampieSkill';
const TAG_BUKKAKE_SKILL = 'BukkakeSkill';
const TAG_SWALLOW_SKILL = 'SwallowSkill';
const TAG_FEMALE_ORGASM_SKILL = 'FemaleOrgasmSkill';

const TAG_UNIQUE_ENEMY  = 'Unique';
const TAG_ONLOOKER  = 'Onlooker';
const TAG_SUPPORTER  = 'Supporter';
const TAG_DONT_DRAW_NAME  = 'DontDrawName';
const TAG_DONT_DRAW_GAUGE  = 'DontDrawGauge';
const TAG_DONT_DRAW_IMAGE  = 'DontDrawImage';
const TAG_ALWAYS_SHOW_STATES  = 'AlwaysShowStates';
const TAG_NO_PPT_REGEN  = 'NoPleasureRegen';
const TAG_DONT_MORPH  = 'DontMorph';
const TAG_DONT_ADD_WANTED  = 'DontAddWanted';
const TAG_DONT_ADD_PREFIX  = 'DontAddPrefix';
const TAG_DONT_COUNT_SUBDUED  = 'DontCountSubdued';
const TAG_SELECTION_FLASH_WHITER  = 'SelectionFlashWhiter';
const TAG_HAS_DAMAGED_FACE  = 'HasDamagedFace';
const TAG_DONT_DRAW_SELECTION  = 'DontDrawSelection';

const TAG_BLANK_TYPE_HALF  = 'BlankTypeHalf';
const TAG_BLANK_TYPE_DOT  = 'BlankTypeDot';

const TAG_ACCESSORY_EDICT  = 'AccessoryEdict';
const TAG_STR_TRAINING_EDICT  = 'StrTraining';
const TAG_DEX_TRAINING_EDICT  = 'DexTraining';
const TAG_AGI_TRAINING_EDICT  = 'AgiTraining';
const TAG_MIND_TRAINING_EDICT  = 'MindTraining';
const TAG_END_TRAINING_EDICT  = 'EndTraining';
const TAG_NO_TREE_REQ_EDICT  = 'NoTreeReq';


///////////////
// Game CharacterBase
///////////////////////

Game_CharacterBase.prototype.distancePerFrame = function() {
    return Math.pow(2, this.realMoveSpeed()) / REM_DPF;
};

///////////
// Sprite Battler
///////////////////

Sprite_Battler.prototype.createVisualHpGaugeWindow = function() {
	if (!this._battler) return;
	if (this._createdVisualHpGaugeWindow && this._battler.displayVisualHpGaugeWindow()) return;
	if (this.checkVisualATBGauge()) {
		if (!this._visualATBWindow) return;
		if (!this.parent.parent.children.contains(this._visualATBWindow)) return;
	}
	if(this._battler.displayVisualHpGaugeWindow()) {
		this._createdVisualHpGaugeWindow = true;
		this._visualHpGauge = new Window_VisualHPGauge();
		this._visualHpGauge.setBattler(this._battler);
		this.parent.parent.addChild(this._visualHpGauge);
	}
	else if(this._createdVisualHpGaugeWindow) {
		this._createdVisualHpGaugeWindow = false;
		this.parent.parent.removeChild(this._visualHpGauge);
		this._visualHpGauge = false;
		if(this._visualPleasureGauge) {
			this.parent.parent.removeChild(this._visualPleasureGauge);
			this._visualPleasureGauge = false;
		}
		if(this._visualEnergyGauge) {
			this.parent.parent.removeChild(this._visualEnergyGauge);
			this._visualEnergyGauge = false;
		}
	}
	
	if(this._battler.displayVisualPleasureGaugeWindow()) {
		this._visualPleasureGauge = new Window_VisualPleasureGauge();
		this._visualPleasureGauge.setBattler(this._battler);
		this.parent.parent.addChild(this._visualPleasureGauge);
	}
	if(this._battler.displayVisualEnergyGaugeWindow()) {
		this._visualEnergyGauge = new Window_VisualEnergyGauge();
		this._visualEnergyGauge.setBattler(this._battler);
		this.parent.parent.addChild(this._visualEnergyGauge);
	}
};

Sprite_Battler.prototype.updateSelectionEffect = function() {
    var target = this._effectTarget;
    if (this._battler.isSelected()) {
        this._selectionEffectCount++;
		
		if(this._battler._tagSelectionFlashWhiter) {
			if (this._selectionEffectCount % 30 < 15) {
				target.setColorTone([175, 175, 175, 64]);
			} else {
				target.setColorTone([0, 0, 0, 0]);
			}
		}
		else {
			if (this._selectionEffectCount % 30 < 15) {
				target.setBlendColor([255, 255, 255, 64]);
			} else {
				target.setBlendColor([0, 0, 0, 0]);
			}
		}
		
    } else if (this._selectionEffectCount > 0) {
        this._selectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
		target.setColorTone([0, 0, 0, 0]);
    }
};

////////////////
// Spriteset Battle
////////////////

Spriteset_Battle.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createBackground();
    this.createBattleField();
    this.createBattleback();
    if(!$gameSystem.drawEnemiesAboveBattleTachie()) { 
		this.createEnemies();
	}
    this.createActors();
};

Spriteset_Battle.prototype.addEnemy = function(enemy) {
	let sprite = new Sprite_Enemy(enemy);
	this._enemySprites.push(sprite);
	this._enemySprites.sort(this.compareEnemySprite.bind(this));
	this._battleField.addChild(sprite);
};

///////////
// Game BattlerBase
/////////////////////

//Custom Requirement
Game_BattlerBase.prototype.meetsSkillConditionsEval = function(skill, target) {
	if(target === undefined) {
		target = this._lastAITarget;
	}
	
    if (skill.requireEval === '') return true;
    let value = true;
    let item = skill;
    let a = this;
    let user = this;
    let subject = this;
    let s = $gameSwitches._data;
    let v = $gameVariables._data;
    let code = skill.requireEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'SKILL CUSTOM REQUIRE EVAL ERROR');
    }
    return value;
};

//removed mcr
Game_BattlerBase.prototype.skillMpCost = function(skill) {
  var cost = skill.mpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mmp * skill.mpCostPer;
  var code = skill.mpCostEval;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'SKILL CUSTOM MP COST ERROR');
  }
  return Math.max(0, Math.floor(cost));
};

/////////
// Display Visual Gauges
/////////////

Game_Enemy.prototype.displayVisualHpGaugeWindow = function() {
	if(Karryn.isInDrawEnemiesAtHalfWidthPose()) return false;
	let validShow = !this._tagDontDrawGauge || 
	(Karryn.isInShowEnemyGaugeOnlyDuringValidSelectionPose() && this._tagDontDrawGauge && (SceneManager._scene._enemyWindow.isOpenAndActive() && this._selectionShowName));
	return validShow;
};

Game_Actor.prototype.displayVisualHpGaugeWindow = function() {
	return false;
};

Game_Enemy.prototype.displayVisualPleasureGaugeWindow = function() {
	if(Karryn.isInDrawEnemiesAtHalfWidthPose()) return false;
	let validShow = !this._tagDontDrawGauge || 
	(Karryn.isInShowEnemyGaugeOnlyDuringValidSelectionPose() && (SceneManager._scene._enemyWindow.isOpenAndActive() && this._selectionShowName));
	return validShow;
};

Game_Actor.prototype.displayVisualPleasureGaugeWindow = function() {
	return false;
};

Game_Enemy.prototype.displayVisualEnergyGaugeWindow = function() {
	return false;
};

Game_Actor.prototype.displayVisualEnergyGaugeWindow = function() {
	return false;
};

//////////
// Game Message
/////////////

Remtairy.Misc.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
	Remtairy.Misc.Game_Message_clear.call(this);
	this._forcedShowFast = false;
};

//Called in Common Event 220, 221
Game_Message.prototype.forceShowFast = function(status) {
	this._forcedShowFast = status;
};

Game_Message.prototype.forceButtonInput = function() {
	this.setFaceImage("", 0);
	this.setBackground(2);
	this.setPositionType(3);
	this.addText("");
};

/////////
// Window Message
///////////////

Remtairy.Misc.Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    if($gameMessage.positionType() === 3) {
		this.move(0, REM_BATTLE_PAUSE_ARROW_Y, REM_BATTLE_PAUSE_ARROW_X, 0.1);
		this._goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - this._goldWindow.height;
	}
	else Remtairy.Misc.Window_Message_updatePlacement.call(this);
};

/////////
// Window TitleCommand
///////////////

Remtairy.Misc.Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    Remtairy.Misc.Window_TitleCommand_makeCommandList.call(this);
	this.addCommand('Website', 'remWebsite');
	this.addCommand('Discord', 'remDiscord');
	this.addCommand('Exit', 'exitGame');
};

/////////
// Window BattleEnemy
///////////////

Window_BattleEnemy.prototype.isClickedEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
	if(Karryn.isInDrawEnemiesAtHalfWidthPose()) {
		rect.width *= 0.5;
	}
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

Window_BattleEnemy.prototype.isMouseOverEnemy = function(enemy) {
    if (!enemy) return false;
    if (!enemy.isSpriteVisible()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
    var rect = new Rectangle();
    rect.width = enemy.spriteWidth();
    rect.height = enemy.spriteHeight();
	if(Karryn.isInDrawEnemiesAtHalfWidthPose()) {
		rect.width *= 0.5;
	}
    rect.x = enemy.spritePosX() - rect.width / 2;
    rect.y = enemy.spritePosY() - rect.height;
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

/////////////
// Scene Title
///////////////

Remtairy.Misc.Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    Remtairy.Misc.Scene_Title_createCommandWindow.call(this);
	this._commandWindow.setHandler('remWebsite', this.commandRemWebsite.bind(this));
	this._commandWindow.setHandler('remDiscord', this.commandRemDiscord.bind(this));
};

Scene_Title.prototype.commandRemWebsite = function() {
	TouchInput.clear();
	Input.clear();
	this._commandWindow.activate();
	
	let url = 'https://remtairy.com/';
	let url_jp = 'https://ci-en.dlsite.com/creator/2068';
	
	const commander = GameStartUpWebSite.getInstance();
	if(TextManager.isJapanese)
		commander.execute(url_jp);
	else
		commander.execute(url);
};

Scene_Title.prototype.commandRemDiscord = function() {
	TouchInput.clear();
	Input.clear();
	this._commandWindow.activate();
	
	let url = 'https://discord.gg/Zb7gG3u';
	
	const commander = GameStartUpWebSite.getInstance();
    commander.execute(url);
};

/////////////
// Scene Battle
///////////////

Remtairy.Misc.Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    Remtairy.Misc.Scene_Battle_selectEnemySelection.call(this);
    $gameTroop.reorderImagesOnSelection();
};

Scene_Battle.prototype.createActorCommandWindow = function() {
    this._actorCommandWindow = new Window_ActorCommand();
    this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
    this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
    this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
    this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
	this._actorCommandWindow.setHandler('escape', this.commandEscape.bind(this));
	this._actorCommandWindow.setHandler('battleLog', this.commandLog.bind(this));
	this._actorCommandWindow.setHandler('status', this.commandStatus.bind(this));
    this._actorCommandWindow.setHandler('cancel', this.cancelActorCommandWindowCommand.bind(this));
    this.addWindow(this._actorCommandWindow);
};

//For Mental Phase canceling
Scene_Battle.prototype.cancelActorCommandWindowCommand = function() {
	if(this._actorCommandWindow._actor.mentalPhase && ConfigManager.cancelSkipMentalPhase)
		this._actorCommandWindow._actor.enterActionPhase();
};

/////////////
// Scene Equip
///////////////

//Auto jump to equip command
Scene_Equip.prototype.createCommandWindow = function() {
    var wy = this._helpWindow.height;
    this._commandWindow = new Window_EquipCommand(0, wy, 240);
    this._commandWindow.setHelpWindow(this._helpWindow);
    this._commandWindow.setHandler('equip', this.commandEquip.bind(this));
    this._commandWindow.setHandler('optimize', this.commandOptimize.bind(this));
    this._commandWindow.setHandler('clear', this.commandClear.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup', this.previousActor.bind(this));
    this.addWindow(this._commandWindow);
	this._commandWindow.hide();
	this._commandWindow.deactivate();
};

//Auto jump to equip 
Scene_Equip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createSlotWindow();
    this.createItemWindow();
    this.createCompareWindow();
    this._lowerRightVisibility = true;
    this.updateLowerRightWindows();
    this.refreshActor();
	this._slotWindow.activate();
    this._slotWindow.select(0);
};

//Allow page up and page down in slots window
Scene_Equip.prototype.createSlotWindow = function() {
	var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth / 2;
    var wh = Graphics.boxHeight - wy;
    this._slotWindow = new Window_EquipSlot(0, wy, ww, wh);
    this._slotWindow.setHelpWindow(this._helpWindow);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
	if (!$gameTemp._cbeBattle) {
		this._slotWindow.setHandler('pagedown', this.slotToNextActor.bind(this));
		this._slotWindow.setHandler('pageup',   this.slotToPreviousActor.bind(this));
	}
    this.addWindow(this._slotWindow);
};

Scene_Equip.prototype.slotToNextActor = function() {
	this.nextActor();
	this._commandWindow.hide();
	this._commandWindow.deactivate();
	this._slotWindow.activate();
    this._slotWindow.select(0);
}

Scene_Equip.prototype.slotToPreviousActor = function() {
	this.previousActor();
	this._commandWindow.hide();
	this._commandWindow.deactivate();
	this._slotWindow.activate();
    this._slotWindow.select(0);
}

//Don't want this window in status menu
Scene_Equip.prototype.createStatusWindow = function() {
    var wx = this._commandWindow.width;
    var wy = this._helpWindow.height;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._statusWindow = new Window_SkillStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
	//this._statusWindow.hide();
    //this._statusWindow.deactivate();
};

//What is this window even for; got rid of it
Scene_Equip.prototype.updateLowerRightWindowTriggers = function() {
    return;
};

/////////
// Window Base
////////////////

Window_Base.prototype.standardFontFace = function() {
    return $gameSystem.getMessageFontName();
};

Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {
    width = width || 144;
    var icons = actor.allIcons().slice(0, Math.floor(width / Window_Base._iconWidth));
    for (var i = 0; i < icons.length; i++) {
		
        this.drawIcon(icons[i], x + Window_Base._iconWidth * i, y + 2);
    }
};

Window_Base.prototype.drawIconGray = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSetGray');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

Window_Base.prototype.drawLanguageIcon = function(iconIndex, x, y) {
	let iconSetName = false;
	if(TextManager.isEnglish) iconSetName = "IconSet_Language_EN";
	else if(TextManager.isJapanese) iconSetName = "IconSet_Language_JP";
    
	if(!iconSetName) return;
	
	var bitmap = ImageManager.loadSystem(iconSetName);
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

//Fix yanfly misalign text
Window_Base.prototype.drawTextEx = function(text, x, y, dontResetFontSettings) {
  if (text) {
    if(!dontResetFontSettings) this.resetFontSettings();
    var textState = { index: 0, x: x, y: y + REM_Y_ICON_PADDING, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    while (textState.index < textState.text.length) {
      this.processCharacter(textState);
    }
    return textState.x - x;
  } else {
    return 0;
  }
};

//Fix misalign icon
Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += Window_Base._iconWidth + REM_X_ICON_PADDING;
};

/////////
// Window EquipSlot and EquipItem
////////////////

//Edited to allow actor name
Window_EquipSlot.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
	if (this._actor) {
		this.drawActorName(this._actor, 0, 0, this.contents.width);
	}
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i + 1;
        if (index < this.maxItems()) {
            this.drawItem(index);
        }
    }
};

//Edited to allow actor name
Window_EquipSlot.prototype.setTopRow = function(row) {
	//var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight();
    var scrollY = row.clamp(0, this.maxTopRow()) * this.itemHeight() - this.itemHeight();
    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        this.updateCursor();
    }
};

//Fixed misalign icon
Window_EquipSlot.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 8;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + REM_Y_ICON_PADDING);
		
		if(TextManager.isJapanese) {
			if(item.hasRemNameJP == false) this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
			this.drawText(item.remNameJP, x + iconBoxWidth, y, width - iconBoxWidth);
		}
		else if(TextManager.isEnglish) {
			if(item.hasRemNameEN == false) this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
			this.drawText(item.remNameEN, x + iconBoxWidth, y, width - iconBoxWidth);
		}
		else
			this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

//Fixed misalign icon
Window_EquipSlot.prototype.drawEmptySlot = function(wx, wy, ww) {
    this.changePaintOpacity(false);
    var ibw = Window_Base._iconWidth + 8;
    this.resetTextColor();
    this.drawIcon(Yanfly.Icon.EmptyEquip, wx + 2, wy + REM_Y_ICON_PADDING);
	var text = '' + TextManager.charmEquipReq + this._actor.accessoryCharmReq(0);
    this.drawText(text, wx + ibw, wy, ww - ibw);
};

//Fixed misalign icon
Window_EquipItem.prototype.drawRemoveEquip = function(index) {
    if (!this.isEnabled(null)) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.changePaintOpacity(true);
    var ibw = Window_Base._iconWidth + 8;
    this.resetTextColor();
    this.drawIcon(Yanfly.Icon.RemoveEquip, rect.x + 10, rect.y + REM_Y_ICON_PADDING);
	var text = TextManager.yanflyRemove;
    this.drawText(text, rect.x+10 + ibw, rect.y, rect.width - ibw);
};

//TextManager
Window_EquipSlot.prototype.slotName = function(index) {
    var slots = this._actor.equipSlots();
	if(TextManager.isJapanese || TextManager.isEnglish) {
		var text = TextManager.equipTypes(slots[index]);
		if(!text) text = this._actor ? $dataSystem.equipTypes[slots[index]] : '';
		return text; 
	}
    else
		return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
};

Window_EquipItem.prototype.isEnabled = function(item) {
	if (item === null && this._actor) {
      var typeId = this._actor.equipSlots()[this._slotId];
      if (Yanfly.Param.EquipNonRemove.contains(typeId)) return false;
    }
    if (item !== null && this._actor) {
		let currentItem = false;
		if(this._actor.equips()[this._slotId] != void 0){
			currentItem = this._actor.equips()[this._slotId];
		}
		if(currentItem) {
			if (!this._actor.meetAllEquipRequirements(item, 1)) return false;
		}
		else {
			if (!this._actor.meetAllEquipRequirements(item, 0)) return false;
		}
    }
    return true;
};

Window_EquipItem.prototype.drawItemNumber = function(item, x, y, width) {
    return;
};

///////
// Window BattleLog
////////////////

Window_BattleLog.prototype.drawTextEx = function(text, x, y) {
	  if (text) {
		this.resetFontSettings();
		var textState = { index: 0, x: x, y: y, left: x };
		textState.text = this.convertEscapeCharacters(text);
		textState.height = this.calcTextHeight(textState, false);
		while (textState.index < textState.text.length) {
		  this.processCharacter(textState);
		}
		return textState.x - x;
	  } else {
		return 0;
	  }
};

////////
// Window StatCompare
///////////

//Extra params in equip stat compare window
Window_StatCompare.prototype.refresh = function() {
    this.contents.clear();
	this.resetFontSettings();
    if (!this._actor) return;

	if (this._tempActor) {
		this.drawDifference();
	}
	else {
		this.drawCurrentParam();
	}
};

Window_StatCompare.prototype.drawCurrentParam = function() {
	var line = 0;
	var paramId = 0;
	for(var i = 0; i < 13; i++) {
		if(i===0) continue;
		else if(i===1) paramId = PARAM_STRENGTH_ID;
		else if(i===2) paramId = PARAM_DEXTERITY_ID;
		else if(i===3) paramId = PARAM_AGILITY_ID;
		else if(i===4) paramId = PARAM_ENDURANCE_ID;
		else if(i===5) paramId = PARAM_MIND_ID;
		else if(i===6) paramId = PARAM_CHARM_ID;
		else if(i===7) paramId = SPARAM_WPATK_ID;
		else if(i===8) paramId = SPARAM_WPDEF_ID;
		else if(i===9) paramId = XPARAM_HIT_ID;
		else if(i===10) paramId = XPARAM_EVA_ID;
		else if(i===11) paramId = XPARAM_CRIT_ID;
		else if(i===12) paramId = 0;
	
		var x = this.textPadding();
		var y = line * this.lineHeight();
		this.changeTextColor(this.systemColor());
		
		if(i <= 6)
			this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
		else if (i >= 9 && i <= 11)	
			this.drawText(TextManager.xparam(paramId), x, y, this._paramNameWidth);
		else if (i === 7 || i === 8)
			this.drawText(TextManager.sparam(paramId), x, y, this._paramNameWidth);
		else if (i === 12)
			this.drawText(TextManager.critDmgName, x, y, this._paramNameWidth);
		
		x = this.contents.width - this.textPadding();
		x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
		this.resetTextColor();
		var actorparam = 0;
	
		if(i <= 6)
			actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
		else if (i === 9 || i === 10 || i === 11) 
			actorparam = (Yanfly.Util.toGroup(this._actor.xparam(paramId))*100).toFixed(0);
		//else if (i === 11) 
		//	actorparam = (Yanfly.Util.toGroup(this._actor.xparam(paramId))*100).toFixed(0) + '%';
		else if (i === 7 || i === 8)
			actorparam = (Yanfly.Util.toGroup(this._actor.sparam(paramId))*100).toFixed(0) + '%';
		else if (i === 12) {
			var value = 1;
			var user = this._actor;
			var bonus = user.criticalMultiplierBonus();
			try {
			  eval(Yanfly.Param.critMult);
			} catch (e) {
			  Yanfly.Util.displayError(e, code, 'CRITICAL MULTIPLIER ERROR');
			}
			actorparam = (Yanfly.Util.toGroup(value)*100).toFixed(0) + '%';
		}
			
		this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
		
		line++;
	}
};


Window_StatCompare.prototype.drawDifference = function() {
    var line = 0;
	var x = this.textPadding();
	
	for(var i = 0; i < 8; i++){
		if (this._actor.param(i) !== this._tempActor.param(i)) {
			this.drawParamRem(i, x, line * this.lineHeight());
			line++;
		}
	}
	
	for(var i = 0; i < 10; i++){
		if(i === 8) continue;
		if (this._actor.xparam(i) !== this._tempActor.xparam(i)) {
			this.drawXParamRem(i, x, line * this.lineHeight())
			line++;                
		}
	}
	
	line += this.drawCritDmgRem(x, line * this.lineHeight());
	
	for(var i = 0; i < 10; i++){
		if (this._actor.sparam(i) !== this._tempActor.sparam(i)) {
			this.drawSParamRem(i, x, line * this.lineHeight())
			line++;                
		}
	}	
	
	for(var i = 0; i < 8; i++){
		if (this._actor.getParamGrowthRate(i) !== this._tempActor.getParamGrowthRate(i)) {
			this.drawParamGrowthRem(i, x, line * this.lineHeight());
			line++;
		}
	}
	
	var elements = $dataSystem.elements;
	for (var i = 0 ; i < elements.length; i++){
		//todo: add ignore certain elements here; if( i === x) continue;
		if (this._actor.elementRate(i) !== this._tempActor.elementRate(i)) {
			if(this._actor.hasEdict(EDICT_PUBLISH_RESISTS)) {
				this.drawElementRem(i, x, line * this.lineHeight());
				line++ 
			}
		}
	}
	
	var states = $dataStates;
	for (var i = 0; i < states.length; i++){
		if (!states[i]) { continue }
		//todo: add ignore certain states here; if( i === x) continue;
		var state = states[i].id;
		if (this._actor.stateRate(state) !== this._tempActor.stateRate(state)) {
			this.drawStateRem(i, x, line * this.lineHeight());
			line++;
		}
	}
	
	line += this.drawEdictCostRem(x, line * this.lineHeight());
	line += this.drawPrisonIncomeRem(x, line * this.lineHeight());
	line += this.drawPrisonExpenseRem(x, line * this.lineHeight());
};

Window_StatCompare.prototype.drawParamRem = function(paramId, x, y) {
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = Yanfly.Util.toGroup(diffvalue);
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

Window_StatCompare.prototype.drawXParamRem = function(paramId, x, y) {
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.xparam(paramId), x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = "" + (Yanfly.Util.toGroup(this._actor.xparam(paramId))*100).toFixed(0);
	if(paramId >= 4)  actorparam += '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.xparam(paramId);
    var diffvalue = newValue - this._actor.xparam(paramId);
	actorparam = "" + (Yanfly.Util.toGroup(newValue)*100).toFixed(0);
	if(paramId >= 4)  actorparam += '%';
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	var text = "" + (Yanfly.Util.toGroup(diffvalue)*100).toFixed(0);
	if(paramId >= 4)  text += '%';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

Window_StatCompare.prototype.drawSParamRem = function(paramId, x, y) {
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.sparam(paramId), x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = "";
	//if(paramId == 1 || paramId == 4) actorparam = Yanfly.Util.toGroup(this._actor.sparam(paramId));
	//else 
		actorparam = "" + (Yanfly.Util.toGroup(this._actor.sparam(paramId))*100).toFixed(0) + '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.sparam(paramId);
    var diffvalue = newValue - this._actor.sparam(paramId);
	actorparam = "";
	//if(paramId == SPARAM_WPDEF_ID || paramId == 4) actorparam = Yanfly.Util.toGroup(newValue);
	//else 
		actorparam = "" + (Yanfly.Util.toGroup(newValue)*100).toFixed(0) + '%';
	
	if(paramId === SPARAM_WPDEF_ID || paramId === SPARAM_RECOVERY_ID || paramId === SPARAM_WPATK_ID || paramId === SPARAM_WP_REGEN_ID || paramId === SPARAM_EXR_ID) 
		this.changeTextColor(this.paramchangeTextColor(diffvalue));
	else
		this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    if(paramId === SPARAM_WPDEF_ID || paramId === SPARAM_RECOVERY_ID || paramId === SPARAM_WPATK_ID || paramId === SPARAM_WP_REGEN_ID) 
		this.changeTextColor(this.paramchangeTextColor(diffvalue));
	else
		this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
	var	text = "";
	//if(paramId == SPARAM_WPDEF_ID || paramId == SPARAM_WPATK_ID) text = Yanfly.Util.toGroup(diffvalue);
	//else 
		text = "" + (Yanfly.Util.toGroup(diffvalue)*100).toFixed(0) + '%';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

Window_StatCompare.prototype.drawParamGrowthRem = function(paramId, x, y) {
	this.changeTextColor(this.systemColor());
	
	if(paramId === PARAM_MAXSTAMINA_ID)
		this.drawText(TextManager.basic(2) + TextManager.growthRateText, x, y, this._paramNameWidth);
	else if(paramId === PARAM_MAXENERGY_ID)
		this.drawText(TextManager.basic(4) + TextManager.growthRateText, x, y, this._paramNameWidth);
	else
		this.drawText(TextManager.param(paramId) + TextManager.growthRateText, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = "" + (Yanfly.Util.toGroup(this._actor.getParamGrowthRate(paramId))*100).toFixed(0) + "%";
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.getParamGrowthRate(paramId);
    var diffvalue = newValue - this._actor.getParamGrowthRate(paramId);
    actorparam = "" + (Yanfly.Util.toGroup(newValue)*100).toFixed(0) + "%";
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = "" + (Yanfly.Util.toGroup(diffvalue)*100).toFixed(0) + "%";
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

Window_StatCompare.prototype.drawEdictCostRem = function(x, y) {
	var actorValue = this._actor.getEdictGoldRate();
	var tempValue = this._tempActor.getEdictGoldRate();

	if (actorValue === tempValue)
		return 0;
		
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.edictCostName, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = (Yanfly.Util.toGroup(actorValue)*100).toFixed(0) + '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = tempValue;
    var diffvalue = newValue - actorValue;
	actorparam = (Yanfly.Util.toGroup(newValue)*100).toFixed(0) + '%';
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	var	text = (Yanfly.Util.toGroup(diffvalue)*100).toFixed(0) + '%';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
	
	return 1;
	
};

Window_StatCompare.prototype.drawPrisonIncomeRem = function(x, y) {
	let actorValue = (this._actor._baseIncome + this._actor.additionalIncome()) * this._actor.incomeMultipler();
	let tempValue = (this._tempActor._baseIncome + this._tempActor.additionalIncome()) * this._tempActor.incomeMultipler();

	actorValue = Math.round(actorValue);
	tempValue = Math.round(tempValue);

	if (actorValue === tempValue)
		return 0;
		
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.income, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = actorValue + 'G';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = tempValue;
    var diffvalue = newValue - actorValue;
	actorparam = newValue + 'G';
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	var	text = diffvalue + 'G';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
	
	return 1;
	
};

Window_StatCompare.prototype.drawPrisonExpenseRem = function(x, y) {
	let actorValue = (this._actor._baseExpense + this._actor.additionalExpense()) * this._actor.expenseMultipler();
	let tempValue = (this._tempActor._baseExpense + this._tempActor.additionalExpense()) * this._tempActor.expenseMultipler();
	
	actorValue = Math.round(actorValue);
	tempValue = Math.round(tempValue);

	if (actorValue === tempValue)
		return 0;
		
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.expense, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = actorValue + 'G';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = tempValue;
    var diffvalue = newValue - actorValue;
	actorparam = newValue + 'G';
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
	var	text = diffvalue + 'G';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
	
	return 1;
	
};

Window_StatCompare.prototype.drawCritDmgRem = function(x, y) {
	var value = 1;
	var user = this._actor;
	var bonus = user.criticalMultiplierBonus();
	try {
	  eval(Yanfly.Param.critMult);
	} catch (e) {
	  Yanfly.Util.displayError(e, code, 'CRITICAL MULTIPLIER ERROR');
	}
	//actorparam = (Yanfly.Util.toGroup(value)*100).toFixed(0) + '%';
	
	var actorCritDmg = value;
	
	value = 1;
	var user = this._tempActor;
	var bonus = user.criticalMultiplierBonus();
	try {
	  eval(Yanfly.Param.critMult);
	} catch (e) {
	  Yanfly.Util.displayError(e, code, 'CRITICAL MULTIPLIER ERROR');
	}
	
	var tempCritDmg = value;

	if (actorCritDmg === tempCritDmg)
		return 0;
	
	this.changeTextColor(this.systemColor());
	this.drawText(TextManager.critDmgName, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var actorparam = (Yanfly.Util.toGroup(actorCritDmg)*100).toFixed(0) + '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = tempCritDmg;
    var diffvalue = newValue - actorCritDmg;
	actorparam = (Yanfly.Util.toGroup(newValue)*100).toFixed(0) + '%';
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
	var	text = (Yanfly.Util.toGroup(diffvalue)*100).toFixed(0) + '%';
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
	
	return 1;
};

Window_StatCompare.prototype.drawStateRem = function(stateId, x, y) {
	this.changeTextColor(this.systemColor());
	var text = $dataStates[stateId].name; 
	if(TextManager.isEnglish && $dataStates[stateId].hasRemNameEN) text = $dataStates[stateId].remNameEN;
	else if(TextManager.isJapanese && $dataStates[stateId].hasRemNameJP) text = $dataStates[stateId].remNameJP;
	text += TextManager.resistName;
	this.drawText(text, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var displayNum = ((Yanfly.Util.toGroup(this._actor.stateRate(stateId))*100).toFixed(0) - 100) * -1;
	var actorparam = "" + displayNum + '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.stateRate(stateId);
    var diffvalue = newValue - this._actor.stateRate(stateId);
	var displayNum = ((Yanfly.Util.toGroup(newValue)*100).toFixed(0) - 100) * -1;
	actorparam = "" + displayNum + '%';
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
	var	text = "" + Math.abs((Yanfly.Util.toGroup(diffvalue)*100).toFixed(0)) + '%';
    if (diffvalue > 0) {
      text = ' (-' + text + ')';
    } else {
      text = ' (+' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');

};

Window_StatCompare.prototype.drawElementRem = function(elementId, x, y) {
	this.changeTextColor(this.systemColor());
	//todo - todo what???
	var text = TextManager.element(elementId) + TextManager.resistName;
	this.drawText(text, x, y, this._paramNameWidth);
	
	x = this.contents.width - this.textPadding();
	x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
	this.resetTextColor();
	var displayNum = ((Yanfly.Util.toGroup(this._actor.elementRate(elementId))*100).toFixed(0) - 100) * -1;
	var actorparam = "" + displayNum + '%';
	this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, dw, 'center');
	
	x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.elementRate(elementId);
    var diffvalue = newValue - this._actor.elementRate(elementId);
	var displayNum = ((Yanfly.Util.toGroup(newValue)*100).toFixed(0) - 100) * -1;
	actorparam = "" + displayNum + '%';
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
    this.drawText(actorparam, x, y, this._paramValueWidth, 'right');
	
	x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    this.changeTextColor(this.paramchangeTextColorOpposite(diffvalue));
	var	text = "" + Math.abs((Yanfly.Util.toGroup(diffvalue)*100).toFixed(0)) + '%';
    if (diffvalue > 0) {
      text = ' (-' + text + ')';
    } else {
      text = ' (+' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};

Window_StatCompare.prototype.createWidths = function() {
    this._paramNameWidth = REM_PARAM_NAME_WIDTH_MAX;
    this._paramValueWidth = 0;
    this._arrowWidth = this.textWidth('\u2192' + ' ');
    var buffer = this.textWidth(' ');
    for (var i = 0; i < 8; ++i) {
      var value1 = this.textWidth(TextManager.param(i));
      var value2 = this.textWidth(Yanfly.Util.toGroup(this._actor.paramMax(i)));
      this._paramNameWidth = Math.max(value1, this._paramNameWidth);
      this._paramValueWidth = Math.max(value2, this._paramValueWidth);
    }
    this._bonusValueWidth = this._paramValueWidth;
    this._bonusValueWidth += this.textWidth('(+)') + buffer;
    this._paramNameWidth += buffer;
    this._paramValueWidth;
    if (this._paramNameWidth + this._paramValueWidth * 2 + this._arrowWidth +
      this._bonusValueWidth > this.contents.width) this._bonusValueWidth = 0;
};

Window_StatCompare.prototype.paramchangeTextColorOpposite = function(change) {
    if (change > 0) {
        return this.powerDownColor(); 
    } else if (change < 0) {
        return this.powerUpColor();
    } else {
        return this.normalColor();
    }
};

////////
// Window MessageBackLog
///////////

//Removed using the key to open the backlog to close it
Window_MessageBacklog.prototype.processHandling = function() {
  if (!this.isOpenAndActive()) return;
  Window_Command.prototype.processHandling.call(this);
};


////////
// Window Help
///////////

//Help window height
Window_Help.prototype.initialize = function(numLines) {
    var width = Graphics.boxWidth;
	var height = this.fittingHeight(numLines || 2.5);
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this._text = '';
};

Window_Help.prototype.drawBattler = function(battler) {
    this.resetFontSettings();
    let length = battler.allIcons().length;
    if (length <= 0) {
       let text = battler.name();
		let wx = 0;
		let wy = (this.contents.height - this.lineHeight()) / 2;
		this.drawText(text, wx, wy, REM_BHD_HELP_WIDTH, 'center');
    } else {
      this.drawBattlerWithIcons(battler);
    }
};

Window_Help.prototype.drawBattlerWithIcons = function(battler) {
    let icons = battler.allIcons();
    let text = battler.name();
    let wx = 0;
    let wy = 0;
    this.drawText(text, wx, wy, REM_BHD_HELP_WIDTH, 'center');
    wy += this.lineHeight();
    let ww = icons.length * Window_Base._iconWidth;
    ww = Math.min(ww, REM_BHD_HELP_WIDTH);
    wx = (REM_BHD_HELP_WIDTH - ww) / 2;
    this.drawActorIcons(battler, wx, wy, ww);
};

////////
// Window TreeType
///////////

Window_TreeType.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
        //this.drawIcon(item.iconIndex, x + padding, y + padding);
		this.drawIcon(item.iconIndex, x + padding, y + REM_Y_ICON_PADDING);
		
		var name = item.name;
		if(TextManager.isEnglish && item.hasRemNameEN) name = item.remNameEN;
		else if(TextManager.isJapanese && item.hasRemNameJP) name = item.remNameJP;
        this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

////////
// Window_BattleActor
//////////////

//Make left and right key usable in Window_BattleActor
Window_BattleActor.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
			this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('left')) {
			this.cursorUp(Input.isTriggered('up'));
        }
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

//Highlight Tachie
Window_BattleActor.prototype.isClickedActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible() && !actor._battleTachieFaceRect) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput.x;
    var y = TouchInput.y;
	var rect;
	if(!actor._battleTachieFaceRect) {
		rect = new Rectangle();
		rect.width = actor.spriteWidth();
		rect.height = actor.spriteHeight();
		rect.x = actor.spritePosX() - rect.width / 2;
		rect.y = actor.spritePosY() - rect.height;
	}
	else {
		rect = actor._battleTachieFaceRect;
		
	}
    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

//Highlight Tachie
Window_BattleActor.prototype.isMouseOverActor = function(actor) {
    if (!actor) return false;
    if (!actor.isSpriteVisible() && !actor._battleTachieFaceRect) return false;
    if (!actor.isAppeared()) return false;
    if ($gameTemp._disableMouseOverSelect) return false;
    var x = TouchInput._mouseOverX;
    var y = TouchInput._mouseOverY;
	
	var rect;
	if(!actor._battleTachieFaceRect) {
		rect = new Rectangle();
		rect.width = actor.spriteWidth();
		rect.height = actor.spriteHeight();
		rect.x = actor.spritePosX() - rect.width / 2;
		rect.y = actor.spritePosY() - rect.height;
	}
	else {
		rect = actor._battleTachieFaceRect;
	}

    return (x >= rect.x && y >= rect.y && x < rect.x + rect.width &&
      y < rect.y + rect.height);
};

////////////
// Window Base & Window Selectable
//////////////////

//Name for Items
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
		this.drawIcon(item.iconIndex, x + padding, y + REM_Y_ICON_PADDING);
		
		var name = item.name;
		if(TextManager.isJapanese && item.hasRemNameJP) name = item.remNameJP;
		else if(TextManager.isEnglish && item.hasRemNameEN) name = item.remNameEN;
		this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_Selectable.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = this.lineHeight();
        var padding = (iconBoxWidth - Window_Base._iconWidth) / 2;
        this.resetTextColor();
		this.drawIcon(item.iconIndex, x + padding, y + REM_Y_ICON_PADDING);
		
		var name = item.name;
		if(TextManager.isJapanese && item.hasRemNameJP) name = item.remNameJP;
		else if(TextManager.isEnglish && item.hasRemNameEN) name = item.remNameEN;
		this.drawText(name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};


//////////////
//////////////////
// Window Base
/////////////////
//////////////

Remtairy.Misc.Window_Base_convertExtraEscapeCharacters = Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
    //REM_SLVL[n]
	text = text.replace(/\x1bREM_SLVL\[(\d+)\]/gi, function() {
        return this.remMiscSLVL(parseInt(arguments[1]));
    }.bind(this));
    //REM_SD_SKR[n]
	text = text.replace(/\x1bREM_SD_SKR\[(\d+)\]/gi, function() {
        return this.remMiscSD_SKR(parseInt(arguments[1]));
    }.bind(this));
	//REM_MAPNAME[n]
	text = text.replace(/\x1bREM_MAPNAME\[(\d+)\]/gi, function() {
        return this.remMiscMapName(parseInt(arguments[1]));
    }.bind(this));
	//REM_AC[n]
	text = text.replace(/\x1bREM_IC\[(\d+)\]/gi, function() {
        return this.remMiscInvasionChance(parseInt(arguments[1]));
    }.bind(this));
	//REM_FR[n]
	text = text.replace(/\x1bREM_FR\[(\d+)\]/gi, function() {
        return this.remMiscFatigueRecovery(parseInt(arguments[1]));
    }.bind(this));
	//REM_BRIM[n]
	text = text.replace(/\x1bREM_BRIM\[(\d+)\]/gi, function() {
        return this.remMiscBarRepIncomeMultipler(parseInt(arguments[1]));
    }.bind(this));
	//REM_BARMUG[n]
	text = text.replace(/\x1bREM_BARMUG\[(\d+)\]/gi, function() {
        return this.remMiscBarStartingMugs(parseInt(arguments[1]));
    }.bind(this));
	//REM_BARGLASS[n]
	text = text.replace(/\x1bREM_BARGLASS\[(\d+)\]/gi, function() {
        return this.remMiscBarStartingGlasses(parseInt(arguments[1]));
    }.bind(this));
	//REM_AVR[n]
	text = text.replace(/\x1bREM_AVR\[(\d+)\]/gi, function() {
        return this.remMiscAvailableVisitorRooms(parseInt(arguments[1]));
    }.bind(this));
	//REM_RAC[n]
	text = text.replace(/\x1bREM_RAC\[(\d+)\]/gi, function() {
        return this.remMiscRejectAlcoholCost(parseInt(arguments[1]));
    }.bind(this));
	//REM_TRAY[n]
	text = text.replace(/\x1bREM_TRAY\[(\d+)\]/gi, function() {
        return this.remMiscTrayDescription(parseInt(arguments[1]));
    }.bind(this));
	//REM_CANT[n]
	text = text.replace(/\x1bREM_CANT\[(\d+)\]/gi, function() {
        return this.remMiscSkillCant(parseInt(arguments[1]));
    }.bind(this));
	
	return Remtairy.Misc.Window_Base_convertExtraEscapeCharacters.call(this, text);
};

Window_Base.prototype.remMiscMapName = function(n) {
    //var name = DataManager.getMapLocationDisplayNameMapId(n);
	let name = $gameParty.getMapName(n);
	return name;
};

Window_Base.prototype.remMiscSLVL = function(n) {
    let actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.slutLvl : '';
};

Window_Base.prototype.remMiscSD_SKR = function(n) {
    let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let text = '';
	
	if(actor.isStsLearnedSkill(330)) {
		text = '3~4';
	}
	else if(actor.isStsLearnedSkill(329)) {
		text = '2~3';
	}
	else {
		text = '2';
	}
	
	return text;
};

Window_Base.prototype.remMiscFatigueRecovery = function(n) {
	return $gameActors.actor(ACTOR_KARRYN_ID).fatigueRecoveryNumber();
};

Window_Base.prototype.remMiscBarRepIncomeMultipler = function(n) {
	return Math.round($gameParty.getBarReputationIncomeMultipler() * 100) - 100;
};

Window_Base.prototype.remMiscBarStartingMugs = function(n) {
	return $gameParty.waitressBattle_startingMugs();
};
Window_Base.prototype.remMiscBarStartingGlasses = function(n) {
	return $gameParty.waitressBattle_startingGlasses();
};

Window_Base.prototype.remMiscAvailableVisitorRooms = function(n) {
	return $gameParty.maxAvailableVisitorRooms();
};

Window_Base.prototype.remMiscRejectAlcoholCost = function(n) {
	return $gameActors.actor(ACTOR_KARRYN_ID).rejectAlcoholWillCost();
};

Window_Base.prototype.remMiscTrayDescription = function(n) {
	return $gameActors.actor(ACTOR_KARRYN_ID).trayContentsText();
};

Window_Base.prototype.remMiscSkillCant = function(n) {
	let text = '';

	if(n === SKILL_KARRYN_KISS_SELECTOR_CANT_ID) 
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynKissSkill();
	else if(n === SKILL_KARRYN_HANDJOB_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynHandjobSkill();
	else if(n === SKILL_KARRYN_COCK_PETTING_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynCockPettingSkill();
	else if(n === SKILL_KARRYN_COCK_STARE_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynCockStareSkill();
	else if(n === SKILL_KARRYN_RIMJOB_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynRimjobSkill();
	else if(n === SKILL_KARRYN_BLOWJOB_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynBlowjobSkill();
	else if(n === SKILL_KARRYN_TITTYFUCK_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynTittyFuckSkill();
	else if(n === SKILL_KARRYN_FOOTJOB_SELECTOR_CANT_ID)
		text = $gameActors.actor(ACTOR_KARRYN_ID).skillDescription_cant_karrynFootjobSkill();
	
	return text;
};


Window_Base.prototype.remMiscInvasionChance = function(n) {
    let actor = $gameActors.actor(ACTOR_KARRYN_ID);
	let invasionChance = actor.getInvasionChance();
	return Math.max(Math.round(invasionChance), 0);
};


/////////
// Window VisualPleasureGauge
// Credits to Yanfly
/////////////////

function Window_VisualPleasureGauge() {
    this.initialize.apply(this, arguments);
}

Window_VisualPleasureGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualPleasureGauge.prototype.constructor = Window_VisualPleasureGauge;

Window_VisualPleasureGauge.prototype.initialize = function() {
    this._opacitySpeed = 255 / Yanfly.Param.VHGGaugeDuration;
    this._dropSpeed = 0;
    this._visibleCounter = 0;
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    this._requestRefresh = false;
    this._currentPleasureValue = 0;
    this._displayedValue = 0;
    this.contentsOpacity = 0;
    this.opacity = 0;
};

Window_VisualPleasureGauge.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
	if(this._battler) {
		if(this._battler.isEnemy()) {
			this._currentPleasureValue = this._battler.currentPercentOfOrgasm(true);
			this._displayedValue = this._battler.currentPercentOfOrgasm(true);
		}
		else {
			this._currentPleasureValue = this._battler.currentPercentOfOrgasm(true);
			this._displayedValue = this._battler.currentPercentOfOrgasm(true);		
		}
	}
	else {
		this._currentPleasureValue = 0;
		this._displayedValue = 0;	
	}
};

Window_VisualPleasureGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};

Window_VisualPleasureGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updatePleasurePosition();
    this.updateRefresh();
};

Window_VisualPleasureGauge.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.hpGaugeWidth();
    var width = spriteWidth + this.standardPadding() * 2;
    width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
    var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
    height += this.standardPadding() * 2;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
    this.makeWindowBoundaries();
};

Window_VisualPleasureGauge.prototype.makeWindowBoundaries = function() {
    if (!this._requestRefresh) return;
    this._minX = -1 * this.standardPadding();
    this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
    this._minY = -1 * this.standardPadding();
    this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
    this._maxY -= SceneManager._scene._statusWindow.height;
};

Window_VisualPleasureGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    var battler = this._battler;
    //this.x = battler.spritePosX();
    this.x = battler.spritePosX() + this.standardPadding() + ENEMY_NAME_TEXT_X;
    //this.x -= Math.ceil(this.width / 2); 
	this.x -= Math.ceil(this.width); 
    this.x = this.x.clamp(this._minX, this._maxX);
    this.y = battler.spritePosY() + ENEMY_NAME_Y_VARIABLE;
	//this.y = this.y.clamp(this._minY, this._maxY);
	this.y += Yanfly.Param.VHGBufferY;
	if(this._battler.displayVisualEnergyGaugeWindow()) {
		this.y -= this.standardPadding() - this._battler.hpGaugeHeight() * 2 + 4;
	}
	else {
		this.y -= this.standardPadding() - this._battler.hpGaugeHeight() + 2;
	}
    
};

Window_VisualPleasureGauge.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};

Window_VisualPleasureGauge.prototype.isShowWindow = function() {
    if (!this._battler.isAppeared()) return false;
    if (!this._battler.hpGaugeVisible()) return false;
    if (Yanfly.Param.VHGAlwaysShow && !this._battler.isDead()) return true;
    if (this._currentPleasureValue !== this._displayedValue) return true;
    if (this._battler.isSelected()) return true;
    this._visibleCounter--;
    return this._visibleCounter > 0;
};

Window_VisualPleasureGauge.prototype.updatePleasurePosition = function() {
    if (!this._battler) return;
    if (this._currentPleasureValue !== this._battler.currentPercentOfOrgasm(true)) {
      this._visibleCounter = Yanfly.Param.VHGGaugeDuration;
      this._currentPleasureValue = this._battler.currentPercentOfOrgasm(true);
      var difference = Math.abs(this._displayedValue - this._battler.currentPercentOfOrgasm(true));
      this._dropSpeed = Math.ceil(difference / Yanfly.Param.VHGGaugeDuration);
    }
    this.updateDisplayCounter();
};

Window_VisualPleasureGauge.prototype.updateDisplayCounter = function() {
    if (this._currentPleasureValue === this._displayedValue) {
      return;
    }
    var d = this._dropSpeed;
    var c = this._currentPleasureValue;
    if (this._displayedValue > this._currentPleasureValue) {
      this._displayedValue = Math.max(this._displayedValue - d, c);
    } else if (this._displayedValue < this._currentPleasureValue) {
      this._displayedValue = Math.min(this._displayedValue + d, c);
    }
    this._requestRefresh = true;
};

Window_VisualPleasureGauge.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};

Window_VisualPleasureGauge.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    this._requestRefresh = false;
    var wy = this.contents.height - this.lineHeight();
    var ww = this.contents.width;
    this.drawActorPleasure(this._battler, 0, wy, ww);
};

Window_VisualPleasureGauge.prototype.gaugeBackColor = function() {
    return this.textColor(this._battler.pleasureGaugeBackColor());
};

Window_VisualPleasureGauge.prototype.pleasureGaugeColor1 = function() {
    return this.textColor(this._battler.pleasureGaugeColor1());
};

Window_VisualPleasureGauge.prototype.pleasureGaugeColor2 = function() {
    return this.textColor(this._battler.pleasureGaugeColor2());
};

Window_VisualPleasureGauge.prototype.drawActorPleasure = function(actor, x, y, width) {
    width = width || 186;
    let color1 = this.pleasureGaugeColor1();
    let color2 = this.pleasureGaugeColor2();
    let rate = this._displayedValue / 100;
    this.drawGauge(x, y, width, rate, color1, color2);
};

Window_VisualPleasureGauge.prototype.gaugeHeight = function() {
    if (!this._battler) return Window_Base.prototype.gaugeHeight.call(this);
    return this._battler.hpGaugeHeight();
};

if (Imported.YEP_CoreEngine && Yanfly.Param.VHGThick) {

Window_VisualPleasureGauge.prototype.drawGauge =
function(dx, dy, dw, rate, color1, color2) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.floor(dw * rate).clamp(0, dw);
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    if (eval(Yanfly.Param.GaugeOutline)) {
      color3.paintOpacity = this.translucentOpacity();
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
      dx += 2;
      gaugeY += 2;
      fillW = Math.max(0, fillW - 4);
      gaugeH -= 4;
    } else {
      var fillW = Math.floor(dw * rate);
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

}

/////////
// Window VisualSPGauge
// Credits to Yanfly
/////////////////

function Window_VisualEnergyGauge() {
    this.initialize.apply(this, arguments);
}

Window_VisualEnergyGauge.prototype = Object.create(Window_Base.prototype);
Window_VisualEnergyGauge.prototype.constructor = Window_VisualEnergyGauge;

Window_VisualEnergyGauge.prototype.initialize = function() {
    this._opacitySpeed = 255 / Yanfly.Param.VHGGaugeDuration;
    this._dropSpeed = 0;
    this._visibleCounter = 0;
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    this._requestRefresh = false;
    this._currentEnergyValue = 0;
    this._displayedValue = 0;
    this.contentsOpacity = 0;
    this.opacity = 0;
};

Window_VisualEnergyGauge.prototype.setBattler = function(battler) {
    if (this._battler === battler) return;
    this._battler = battler;
	if(this._battler) {
		this._currentEnergyValue = this._battler.mp;
		this._displayedValue = this._battler.mp;		
	}
	else {
		this._currentEnergyValue = 0;
		this._displayedValue = 0;	
	}
};

Window_VisualEnergyGauge.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._battler) return;
    this.updateWindowAspects();
};

Window_VisualEnergyGauge.prototype.updateWindowAspects = function() {
    this.updateWindowSize();
    this.updateWindowPosition();
    this.updateOpacity();
    this.updateEnergyPosition();
    this.updateRefresh();
};

Window_VisualEnergyGauge.prototype.updateWindowSize = function() {
    var spriteWidth = this._battler.hpGaugeWidth();
    var width = spriteWidth + this.standardPadding() * 2;
    width = Math.min(width, Graphics.boxWidth + this.standardPadding() * 2);
    var height = Math.max(this.lineHeight(), this.gaugeHeight() + 4);
    height += this.standardPadding() * 2;
    if (width === this.width && height === this.height) return;
    this.width = width;
    this.height = height;
    this.createContents();
    this._requestRefresh = true;
    this.makeWindowBoundaries();
};

Window_VisualEnergyGauge.prototype.makeWindowBoundaries = function() {
    if (!this._requestRefresh) return;
    this._minX = -1 * this.standardPadding();
    this._maxX = Graphics.boxWidth - this.width + this.standardPadding();
    this._minY = -1 * this.standardPadding();
    this._maxY = Graphics.boxHeight - this.height + this.standardPadding();
    this._maxY -= SceneManager._scene._statusWindow.height;
};

Window_VisualEnergyGauge.prototype.updateWindowPosition = function() {
    if (!this._battler) return;
    var battler = this._battler;
    //this.x = battler.spritePosX();
    this.x = battler.spritePosX() + this.standardPadding() + ENEMY_NAME_TEXT_X;
    //this.x -= Math.ceil(this.width / 2); 
	this.x -= Math.ceil(this.width); 
    this.x = this.x.clamp(this._minX, this._maxX);
    this.y = battler.spritePosY() + ENEMY_NAME_Y_VARIABLE;
	//this.y = this.y.clamp(this._minY, this._maxY);
	this.y += Yanfly.Param.VHGBufferY;
	this.y -= this.standardPadding() - this._battler.hpGaugeHeight() + 2;
	
};

Window_VisualEnergyGauge.prototype.updateOpacity = function() {
    if (this.isShowWindow()) {
      this.contentsOpacity += 32;
    } else {
      this.contentsOpacity -= 32;
    }
};

Window_VisualEnergyGauge.prototype.isShowWindow = function() {
    if (!this._battler.isAppeared()) return false;
    if (!this._battler.hpGaugeVisible()) return false;
    if (Yanfly.Param.VHGAlwaysShow && !this._battler.isDead()) return true;
    if (this._currentEnergyValue !== this._displayedValue) return true;
    if (this._battler.isSelected()) return true;
    this._visibleCounter--;
    return this._visibleCounter > 0;
};

Window_VisualEnergyGauge.prototype.updateEnergyPosition = function() {
    if (!this._battler) return;
    if (this._currentEnergyValue !== this._battler.mp) {
      this._visibleCounter = Yanfly.Param.VHGGaugeDuration;
      this._currentEnergyValue = this._battler.mp;
      var difference = Math.abs(this._displayedValue - this._battler.mp);
      this._dropSpeed = Math.ceil(difference / Yanfly.Param.VHGGaugeDuration);
    }
    this.updateDisplayCounter();
};

Window_VisualEnergyGauge.prototype.updateDisplayCounter = function() {
    if (this._currentEnergyValue === this._displayedValue) {
      return;
    }
    var d = this._dropSpeed;
    var c = this._currentEnergyValue;
    if (this._displayedValue > this._currentEnergyValue) {
      this._displayedValue = Math.max(this._displayedValue - d, c);
    } else if (this._displayedValue < this._currentEnergyValue) {
      this._displayedValue = Math.min(this._displayedValue + d, c);
    }
    this._requestRefresh = true;
};

Window_VisualEnergyGauge.prototype.updateRefresh = function() {
    if (this._requestRefresh) this.refresh();
};

Window_VisualEnergyGauge.prototype.refresh = function() {
    this.contents.clear();
    if (!this._battler) return;
    this._requestRefresh = false;
    var wy = this.contents.height - this.lineHeight();
    var ww = this.contents.width;
    this.drawActorEnergy(this._battler, 0, wy, ww);
};

Window_VisualEnergyGauge.prototype.gaugeBackColor = function() {
    return this.textColor(this._battler.energyGaugeBackColor());
};

Window_VisualEnergyGauge.prototype.energyGaugeColor1 = function() {
    return this.textColor(this._battler.energyGaugeColor1());
};

Window_VisualEnergyGauge.prototype.energyGaugeColor2 = function() {
    return this.textColor(this._battler.energyGaugeColor2());
};

Window_VisualEnergyGauge.prototype.drawActorEnergy = function(actor, x, y, width) {
    width = width || 186;
    let color1 = this.energyGaugeColor1();
    let color2 = this.energyGaugeColor2();
    let rate = this._displayedValue / actor.mmp;
    this.drawGauge(x, y, width, rate, color1, color2);
};

Window_VisualEnergyGauge.prototype.gaugeHeight = function() {
    if (!this._battler) return Window_Base.prototype.gaugeHeight.call(this);
    return this._battler.hpGaugeHeight();
};

if (Imported.YEP_CoreEngine && Yanfly.Param.VHGThick) {

Window_VisualEnergyGauge.prototype.drawGauge =
function(dx, dy, dw, rate, color1, color2) {
    var color3 = this.gaugeBackColor();
    var fillW = Math.floor(dw * rate).clamp(0, dw);
    var gaugeH = this.gaugeHeight();
    var gaugeY = dy + this.lineHeight() - gaugeH - 2;
    if (eval(Yanfly.Param.GaugeOutline)) {
      color3.paintOpacity = this.translucentOpacity();
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
      dx += 2;
      gaugeY += 2;
      fillW = Math.max(0, fillW - 4);
      gaugeH -= 4;
    } else {
      var fillW = Math.floor(dw * rate);
      var gaugeY = dy + this.lineHeight() - gaugeH - 2;
      this.contents.fillRect(dx, gaugeY, dw, gaugeH, color3);
    }
    this.contents.gradientFillRect(dx, gaugeY, fillW, gaugeH, color1, color2);
};

}

/////////
// Window ActorCommand
//////////////////

Window_ActorCommand.prototype.windowWidth = function() {
    return 10;
};

Window_ActorCommand.prototype.windowHeight = function() {
    return 8;
};

////////////////
// Game Action
////////////////

//Minimum damage
Game_Action.prototype.makeDamageValue = function(target, critical) {
	var item = this.item();
	var a = this.subject();
	var b = target;
	var user = this.subject();
	var s = $gameSwitches._data;
	var v = $gameVariables._data;
	var baseDamage = this.evalDamageFormula(target);
	var value = baseDamage;

	try {
		eval(Yanfly.DMG.DamageFlow);
	} catch (e) {
		Yanfly.Util.displayError(e, Yanfly.DMG.DamageFlow, 'DAMAGE FLOW ERROR');
	}

	if(target.isEnemy() && target.hasMetalPrefix() && !Karryn.isInIgnoreMetalPropertiesPose()) {
		return value;
	}
	else if(value > 0 && value < 1) {
		value = 1;
	}
	if(critical && value >= 1 && value < 2 ) {
		value = 2;
	}
	
	return Math.round(value);
};

//Damage step 92
Game_Action.prototype.applySexValues = function(target, critical) {
	let result = target.result();

	if(result.pleasureDamage === 0 && result.clothingDamage === 0 && result.pleasureFeedback === 0) 
		return;
		
	//Apply critical
	if(critical) {
		result.desireAreaDamage = this.applyCriticalRate(result.desireAreaDamage, result.desireAreaDamage, target);
		result.desireRandomDamage = this.applyCriticalRate(result.desireRandomDamage, result.desireRandomDamage, target);
		result.pleasureDamage = this.applyCriticalRate(result.pleasureDamage, result.pleasureDamage, target);
		result.staminaDamage = this.applyCriticalRate(result.staminaDamage, result.staminaDamage, target);
		result.clothingDamage = this.applyCriticalRate(result.clothingDamage, result.clothingDamage, target);
	}
	
	//Apply variance
	result.desireAreaDamage = this.applyVariance(result.desireAreaDamage, this.item().damage.variance);
	result.desireRandomDamage = this.applyVariance(result.desireRandomDamage, this.item().damage.variance);
	result.pleasureDamage = this.applyVariance(result.pleasureDamage, this.item().damage.variance);
	result.staminaDamage = this.applyVariance(result.staminaDamage, this.item().damage.variance);
	result.clothingDamage = this.applyVariance(result.clothingDamage, this.item().damage.variance);
	result.pleasureFeedback = this.applyVariance(result.pleasureFeedback, this.item().damage.variance);
	//result.ejaculateDamage = this.applyVariance(result.ejaculateDamage, this.item().damage.variance);
	result.ejaculateAnal = this.applyVariance(result.ejaculateAnal, this.item().damage.variance);
	result.ejaculatePussy = this.applyVariance(result.ejaculatePussy, this.item().damage.variance);
	result.ejaculateMouth = this.applyVariance(result.ejaculateMouth, this.item().damage.variance);
	result.bukkakeFace = this.applyVariance(result.bukkakeFace, this.item().damage.variance);
	result.bukkakeLeftArm = this.applyVariance(result.bukkakeLeftArm, this.item().damage.variance);
	result.bukkakeRightArm = this.applyVariance(result.bukkakeRightArm, this.item().damage.variance);
	result.bukkakeLeftLeg = this.applyVariance(result.bukkakeLeftLeg, this.item().damage.variance);
	result.bukkakeRightLeg = this.applyVariance(result.bukkakeRightLeg, this.item().damage.variance);
	result.bukkakeBoobs = this.applyVariance(result.bukkakeBoobs, this.item().damage.variance);
	result.bukkakeButt = this.applyVariance(result.bukkakeButt, this.item().damage.variance);
	
	//Apply graze
	if(result.graze) {
		let graze = Math.min(Math.max(this.subject().mev, 0), MAX_GRAZE_RATE);
		//result.desireAreaDamage = result.desireAreaDamage * graze;
		//result.desireRandomDamage = result.desireRandomDamage * graze;
		result.pleasureDamage = result.pleasureDamage * graze;
		result.staminaDamage = result.staminaDamage * graze;
		//result.hpDamage = result.hpDamage * graze;
		result.clothingDamage = result.clothingDamage * graze;
		result.pleasureFeedback = result.pleasureFeedback * graze;
		result.ejaculateDamage = result.ejaculateDamage * graze;
	}
	
	//Apply rounding
	result.desireAreaDamage = Math.round(result.desireAreaDamage);
	result.desireRandomDamage = Math.round(result.desireRandomDamage);
	result.pleasureDamage = Math.round(result.pleasureDamage);
	result.staminaDamage = Math.round(result.staminaDamage);
	result.clothingDamage = Math.round(result.clothingDamage);
	result.pleasureFeedback = Math.round(result.pleasureFeedback);
	//result.ejaculateDamage = Math.min(Math.round(result.ejaculateDamage), this.subject().energy);
	result.ejaculateAnal = Math.round(result.ejaculateAnal);
	result.ejaculatePussy = Math.round(result.ejaculatePussy);
	result.ejaculateMouth = Math.round(result.ejaculateMouth);
	result.bukkakeFace = Math.round(result.bukkakeFace);
	result.bukkakeRightArm = Math.round(result.bukkakeRightArm);
	result.bukkakeLeftArm = Math.round(result.bukkakeLeftArm);
	result.bukkakeRightLeg = Math.round(result.bukkakeRightLeg);
	result.bukkakeLeftLeg = Math.round(result.bukkakeLeftLeg);
	result.bukkakeBoobs = Math.round(result.bukkakeBoobs);
	result.bukkakeButt = Math.round(result.bukkakeButt);
	
	//Gain desire
	if(this.item().hasTag(TAG_ENEMY_PETTING_SKILL)) {
		result.skillTypeEnemyPetting = true;
		let area = result.desireTarget;
		if(area == AREA_MOUTH) {
			target.gainMouthDesire(result.desireAreaDamage);
			target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
		}
		else if(area == AREA_BOOBS || area == AREA_NIPPLES) {
			target.gainBoobsDesire(result.desireAreaDamage);
			target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
		}
		else if(area == AREA_CLIT || area == AREA_PUSSY) {
			target.gainPussyDesire(result.desireAreaDamage);
			target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
		}
		else if(area == AREA_BUTT || area == AREA_ANAL) {
			target.gainButtDesire(result.desireAreaDamage);
			target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
		}
		else if(area == AREA_FINGERS || area == AREA_HANDSHAKE) {
			target.gainCockDesire(result.desireAreaDamage);
			target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
		}
	}
	else if(this.item().hasTag(TAG_KISS_SKILL)) {
		this.subject().gainMouthDesire(result.desireAreaDamage);
		this.subject().gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
	}
	else if(this.item().hasTag(TAG_COCK_PET_SKILL)) {
		this.subject().gainCockDesire(result.desireAreaDamage);
		this.subject().gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
	}
	else if(this.item().hasTag(TAG_ENEMY_SEX_SKILL)) {
		result.skillTypeEnemySex = true;
		target.gainCockDesire(result.desireAreaDamage);
		target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
	}
	else if(this.item().hasTag(TAG_SEX_SKILL)) {
		this.subject().gainCockDesire(result.desireAreaDamage);
		this.subject().gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
	}
	else if(this.item().hasTag(TAG_CREAMPIE_SKILL) || this.item().hasTag(TAG_BUKKAKE_SKILL) || this.item().hasTag(TAG_SWALLOW_SKILL)) {
		result.skillTypeEnemyBukkake = true;
		target.gainCockDesire(result.desireAreaDamage);
		target.gainRandomDesireWithCockWeight(result.desireRandomDamage, result.desireCockWeight);
	
	}

	//Target pleasure damage
	if(result.pleasureDamage > 0) {
		target.gainPleasure(result.pleasureDamage);
		if(target.isActor() && !this.subject().isActor()) {
			let percentOfOrgasmFromValue = target.getPercentOfOrgasmFromValue(result.pleasureDamage);
			target.gainEnduranceExp(Math.min(120, Math.max(30, percentOfOrgasmFromValue * 4)), this.subject().enemyExperienceLvl());
		}
	}

	//Target stamina damage
	if(result.staminaDamage > 0 && !target.hasNoStamina()) target.gainHp(-result.staminaDamage);

	//Self pleasure damage
	if(result.pleasureFeedback > 0) {
		this.subject().gainPleasure(result.pleasureFeedback);
		if(this.subject().isActor() && !target.isActor()) {
			let percentOfOrgasmFromValue = target.getPercentOfOrgasmFromValue(result.pleasureFeedback);
			this.subject().gainEnduranceExp(Math.min(90, Math.max(25, percentOfOrgasmFromValue * 4)), target.enemyExperienceLvl());
		}
	}
	
	//Clothing damage
	if(result.clothingDamage > 0 && DEBUG_MODE)  {
		if(target.isActor()) 
			target.damageClothing(result.clothingDamage);
		else if(this.subject().isActor()) 
			this.subject().damageClothing(result.clothingDamage);
	}

	//Check for orgasms
	/*
	if(result.pleasureDamage > 0) {
		//if(target.reachedOrgasmPoint())
		//	BattleManager.setBMAllowTachieUpdate(false);
		
		if(result.pleasureFeedback > 0) {
			this.subject().checkForOrgasm();
		}
		target.checkForOrgasm();
	}
	else if(result.pleasureFeedback > 0) {
		this.subject().checkForOrgasm();
	}
	*/
	
	//Add up ejaculate damage
	if(result.ejaculateDamage > 0) {
		//result.ejaculateDamage += result.ejaculateAnal + result.ejaculatePussy + result.ejaculateMouth + result.bukkakeFace + result.bukkakeRightArm + result.bukkakeLeftArm + result.bukkakeBoobs + result.bukkakeButt;
	}
	
	//Apply Wanted Points
	if(result.staminaDamage > 0) this.subject().addWantedPoints(result.staminaDamage * WANTED_POINTS_STAMINA_DMG_MULTIPLER);
	if(result.pleasureDamage > 0) this.subject().addWantedPoints(result.pleasureDamage * WANTED_POINTS_PLEASURE_DMG_MULTIPLER);
};

////////
// Game ActionResult
//////////////////

Remtairy.Misc.Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    Remtairy.Misc.Game_ActionResult_clear.call(this);
	this.graze = false;
	this.skillTypeEnemyAttack = false;
	this.skillTypeEnemyTalk = false;
	this.skillTypeEnemySight = false;
	this.skillTypeEnemyPetting = false;
	this.skillTypeEnemySex = false;
	this.skillTypeEnemyBukkake = false;
	this.desireAreaDamage = 0;
	this.desireTarget = false;
	this.desireRandomDamage = 0;
	this.desireCockWeight = 0;
	this.pleasureDamage = 0;
	this.pleasureFeedback = 0;
	this.staminaDamage = 0;
	this.clothingDamage = 0;
	this.ejaculateDamage = 0;
	this.femaleOrgasmCount = 0;
	this.ejaculateAnal = 0;
	this.ejaculatePussy = 0;
	this.ejaculateMouth = 0;
	this.bukkakeFace = 0;
	this.bukkakeRightArm = 0;
	this.bukkakeLeftArm = 0;
	this.bukkakeRightLeg = 0;
	this.bukkakeLeftLeg = 0;
	this.bukkakeBoobs = 0;
	this.bukkakeButt = 0;
};

///////////
// Battle Hud
///////////

Battle_Hud.prototype.create_hud_text = function() {
	this.removeChild(this._hud_text);
	if (!this._battler) {return};	
	this._hud_text = new Sprite(this._en_text_img);
	this.addChild(this._hud_text);
};

////////////
// Game Battler
////////////////

Game_Battler.prototype.pleasureGaugeBackColor = function() {
		return REM_PLEASURE_GAUGE_BACK_COLOR;
};
Game_Battler.prototype.pleasureGaugeColor1 = function() {
		return REM_PLEASURE_GAUGE_COLOR_1;
};
Game_Battler.prototype.pleasureGaugeColor2 = function() {
		return REM_PLEASURE_GAUGE_COLOR_2;
};

Game_Battler.prototype.energyGaugeBackColor = function() {
		return REM_ENERGY_GAUGE_BACK_COLOR;
};
Game_Battler.prototype.energyGaugeColor1 = function() {
		return REM_ENERGY_GAUGE_COLOR_1;
};
Game_Battler.prototype.energyGaugeColor2 = function() {
		return REM_ENERGY_GAUGE_COLOR_2;
};


///////
// Game Party
//////////////////

//unused
Game_Party.prototype.glossaryManager = function() {
	for(var id = GLOSSARY_START; id < GLOSSARY_END; id+=2) {
		if(TextManager.isEnglish && this.hasItem($dataItems[id+1])) {
			this.loseItem($dataItems[id+1], 1);
			this.gainItem($dataItems[id], 1);
			
		}
		else if(TextManager.isJapanese && this.hasItem($dataItems[id])) {
			this.loseItem($dataItems[id], 1);
			this.gainItem($dataItems[id+1], 1);
		}
	}
};

//unused?
Game_Party.prototype.getFloorDamageRate = function() {
	var multipler = 1; 
	
	return multipler;
};

/////////////
// Game Player
////////////

Remtairy.Misc.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	Remtairy.Misc.Game_Player_initMembers.call(this);
	this.setReturnMapID(0);
    this.setReturnMapX(0);
    this.setReturnMapY(0);
};

Remtairy.Misc.Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
	this.setReturnMapID(mapId);
    this.setReturnMapX(x);
    this.setReturnMapY(y);
	Remtairy.Misc.Game_Player_reserveTransfer.call(this, mapId, x, y, d, fadeType);
};

Game_Player.prototype.setReturnMapID = function(value) {
	$gameParty._returnMapId = value;
};
Game_Player.prototype.setReturnMapX = function(value) {
	$gameParty._returnX = value;
};
Game_Player.prototype.setReturnMapY = function(value) {
	$gameParty._returnY = value;
};

Game_Player.prototype.getReturnMapID = function() {
	return $gameParty._returnMapId;
};
Game_Player.prototype.getReturnMapX = function() {
	return $gameParty._returnX;
};
Game_Player.prototype.getReturnMapY = function() {
	return $gameParty._returnY;
};

/////////
// Sprite RemNumber
///////////////////

function Sprite_RemNumber() {
    this.initialize.apply(this, arguments);
}

Sprite_RemNumber.prototype = Object.create(Sprite.prototype);
Sprite_RemNumber.prototype.constructor = Sprite_RemNumber;

Sprite_RemNumber.prototype.initialize = function(bitmapName) {
    Sprite.prototype.initialize.call(this);
    this._numberBitmap = ImageManager.loadSystem(bitmapName);
	this._colorRed = 0;
	this._colorBlue = 0;
	this._colorGreen = 0;
	this._colorGray = 0;
};

Sprite_RemNumber.prototype.digitWidth = function() {
    return this._numberBitmap ? this._numberBitmap.width / 10 : 0;
};

Sprite_RemNumber.prototype.digitHeight = function() {
    return this._numberBitmap ? this._numberBitmap.height : 0;
};

Sprite_RemNumber.prototype.setColor = function(r, g, b, gray) {
    this._colorRed = r;
	this._colorGreen = g;
	this._colorBlue = b;
	this._colorGray = gray;
};


Sprite_RemNumber.prototype.setNumber = function(value) {
    let string = Math.abs(value).toString();
    let row = 0;
    let w = this.digitWidth();
    let h = this.digitHeight();
    for (var i = 0; i < string.length; i++) {
        let sprite = this.createChildSprite();
        let n = Number(string[i]);
        sprite.setFrame(n * w, row * h, w, h);
        sprite.x = (i - (string.length - 1) / 2) * w;
        //sprite.dy = -i;
    }
    
};
 
Sprite_RemNumber.prototype.createChildSprite = function() {
    let sprite = new Sprite();
    sprite.bitmap = this._numberBitmap;
	sprite.setBlendColor([this._colorRed, this._colorGreen, this._colorBlue, this._colorGray]);
    //sprite.anchor.x = 0.5;
    //sprite.anchor.y = 1;
    //sprite.y = -40;
    //sprite.ry = sprite.y;
    this.addChild(sprite);
    return sprite;
};

///////////
// Sprite AoeRect
/////////////////

Sprite_AoeRect.prototype.updateAoEImage = function() {
	let scene = SceneManager._scene;
	if (scene._enemyWindow && scene._enemyWindow.active) {
		let target = scene._enemyWindow.enemy();
		let rowHeight = $dataEnemies[target._enemyId].dataRowHeight;
		let skill = this._skill;
		let skillId = skill.id;
		let skillTypeId = skill.stypeId;
		let skillElementId = skill.damage.elementId;
		let selectionName = '';
		
		target._hasSelectionVariables = false;
		target._selectionAoeBufferX = 0;
		target._selectionAoeBufferY = 0;
		target._selectionAoeRow = 0;
		target._selectionAoeColumn = 0;
		
		if(skillId === SKILL_CLEAVE_1_ID || skillId === SKILL_CLEAVE_2_ID) {
			if(rowHeight === 2) {
				target._hasSelectionVariables = true;
				target._selectionAoeBufferY = REM_SELECTION_SIZE_TWO_Y_BUFFER;
				target._selectionAoeRow = REM_SELECTION_SIZE_TWO_HEIGHT;
				target._selectionAoeColumn = REM_SELECTION_SIZE_TWO_WIDTH;
			}
			else if(rowHeight === 3) {
				target._hasSelectionVariables = true;
				target._selectionAoeBufferY = REM_SELECTION_SIZE_THREE_Y_BUFFER;
				//target._selectionAoeRow = REM_SELECTION_SIZE_THREE_HEIGHT;
				//target._selectionAoeColumn = REM_SELECTION_SIZE_THREE_WIDTH;
			}
			return;
		}
		if(target._tagDontDrawSelection) return;
		
		if(target._specialSelectionName) {
			selectionName = target._specialSelectionName;
			
			if(target.isBarTableType) {
				let table = target._enemyId;
				if(table === BAR_TABLE_A_ENEMY_ID) {
					this._widthPixels = BAR_TABLE_A_SELECTION_WIDTH;
					this._heightPixels = BAR_TABLE_A_SELECTION_HEIGHT;
					target._selectionAoeBufferX = BAR_TABLE_A_SELECTION_X_OFFSET;
					target._selectionAoeBufferY = BAR_TABLE_A_SELECTION_Y_OFFSET;
				}
				else if(table === BAR_TABLE_B_ENEMY_ID) {
					this._widthPixels = BAR_TABLE_B_SELECTION_WIDTH;
					this._heightPixels = BAR_TABLE_B_SELECTION_HEIGHT;
					target._selectionAoeBufferX = BAR_TABLE_B_SELECTION_X_OFFSET;
					target._selectionAoeBufferY = BAR_TABLE_B_SELECTION_Y_OFFSET;
				}
				else if(table === BAR_TABLE_C_ENEMY_ID) {
					this._widthPixels = BAR_TABLE_C_SELECTION_WIDTH;
					this._heightPixels = BAR_TABLE_C_SELECTION_HEIGHT;
					target._selectionAoeBufferX = BAR_TABLE_C_SELECTION_X_OFFSET;
					target._selectionAoeBufferY = BAR_TABLE_C_SELECTION_Y_OFFSET;
				}
				else if(table === BAR_TABLE_D_ENEMY_ID) {
					this._widthPixels = BAR_TABLE_D_SELECTION_WIDTH;
					this._heightPixels = BAR_TABLE_D_SELECTION_HEIGHT;
					target._selectionAoeBufferX = BAR_TABLE_D_SELECTION_X_OFFSET;
					target._selectionAoeBufferY = BAR_TABLE_D_SELECTION_Y_OFFSET;
				}
				
				target._hasSelectionVariables = true;
				target._selectionAoeRow = REM_SELECTION_SIZE_ONE_HEIGHT;
				target._selectionAoeColumn = REM_SELECTION_SIZE_ONE_WIDTH;
			}
			
		}
		else {
			if(skillTypeId === SKILLTYPE_SEXUAL_ID) {
				selectionName = 'AoE_sexual_';
			}
			else if(skillTypeId === SKILLTYPE_ATTACK_ID) {
				if(skillElementId === ELEMENT_PIERCE_ID) {
					selectionName = 'AoE_thrust_';
				}
				else if(skillElementId === ELEMENT_BLUNT_ID) {
					selectionName = 'AoE_strike_';
				}
				else {
					selectionName = 'AoE_slash_';
				}
			}
			else if(skillTypeId === SKILLTYPE_WAITRESS_ID) {
				selectionName = 'AoE_waitress_';
			}
			else if(skillTypeId === SKILLTYPE_RECEPTIONIST_ID) {
				selectionName = 'AoE_receptionist_';
			}
			else {
				selectionName = 'AoE_slash_';
			}
			
			if(Karryn.isInDrawEnemiesAtHalfWidthPose()) {
				selectionName += 'half_'
			}
			
			if(rowHeight === 1) {
				this._widthPixels = REM_SELECTION_SIZE_ONE_WIDTH;
				this._heightPixels = REM_SELECTION_SIZE_ONE_HEIGHT;
				target._hasSelectionVariables = true;
				target._selectionAoeRow = REM_SELECTION_SIZE_ONE_HEIGHT;
				target._selectionAoeColumn = REM_SELECTION_SIZE_ONE_WIDTH;
				target._selectionAoeBufferY = REM_SELECTION_SIZE_ONE_Y_BUFFER;
				selectionName += '1';
			}
			else if(rowHeight === 2) {
				this._widthPixels = REM_SELECTION_SIZE_TWO_WIDTH;
				this._heightPixels = REM_SELECTION_SIZE_TWO_HEIGHT;
				target._hasSelectionVariables = true;
				target._selectionAoeBufferY = REM_SELECTION_SIZE_TWO_Y_BUFFER;
				target._selectionAoeRow = REM_SELECTION_SIZE_TWO_HEIGHT;
				target._selectionAoeColumn = REM_SELECTION_SIZE_TWO_WIDTH;
				selectionName += '2';
			}
			else if(rowHeight === 3) {
				this._widthPixels = REM_SELECTION_SIZE_THREE_WIDTH;
				this._heightPixels = REM_SELECTION_SIZE_THREE_HEIGHT;
				target._hasSelectionVariables = true;
				target._selectionAoeBufferY = REM_SELECTION_SIZE_THREE_Y_BUFFER;
				target._selectionAoeRow = REM_SELECTION_SIZE_THREE_HEIGHT;
				target._selectionAoeColumn = REM_SELECTION_SIZE_THREE_WIDTH;
				selectionName += '3';
			}
			else return;
			
			if(Karryn.isInDrawEnemiesAtHalfWidthPose()) {
				this._widthPixels = REM_SELECTION_SIZE_HALF_WIDTH;
			}
			else if(Karryn.isInReceptionistPose()) {
				this._widthPixels = REM_SELECTION_SIZE_RECEPTIONIST_WIDTH;
			}
			
			if(!selectionName) return;
		}
		
		let hue = this._skill.aoeRectHue;
		this.bitmap = ImageManager.loadPicture(selectionName, hue);
		this.show();
		//this._glowRate = 8;
		//this.opacity = 0;
	}
};

///////////
// Scene Boot
/////////////////

Remtairy.Misc.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
	Remtairy.Misc.Scene_Boot_loadSystemImages.call(this);
    ImageManager.reserveSystem('IconSetGray');
};

//////////
// Scene Manager
///////////////

// Function Keys
SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        switch (event.keyCode) {
        case 116:   // F5
            //if (Utils.isNwjs()) { location.reload(); }
            break;
		case 117:   // F6	
			if($gamePlayer.getReturnMapID() && $gameScreen.isMapMode() && !$gameParty.inBattle() && !$gameMap.isEventRunning()) {
				$gamePlayer.reserveTransfer($gamePlayer.getReturnMapID(), $gamePlayer.getReturnMapX(), $gamePlayer.getReturnMapY(), 0, 0);
				//$gamePlayer.requestMapReload();
			}
			break;
		case 118:   // F7	
			this.debugCommand();
			break;
        case 119:   // F8
            if (Utils.isNwjs() && Utils.isOptionValid('test')) {
                require('nw.gui').Window.get().showDevTools();
            }
            break;
        }
    }
};

//no screen blur
SceneManager.snapForBackground = function() {
    this._backgroundBitmap = this.snap();
};

////////
// Data Manager

DataManager.processRemTMNotetags_RemtairyMisc_StateIcons = function(group) {
	for (let n = 1; n < group.length; n++) {
		let obj = group[n];
		let notedata = obj.note.split(/[\r\n]+/);

		obj.hasLanguageIcon = false;
		obj.languageIconIndex = 0;
		
		for (let i = 0; i < notedata.length; i++) {
			let line = notedata[i];
			
			if (line.match(/<LANGUAGE ICON INDEX:[ ](.*)>/i)) {
				obj.languageIconIndex = parseInt(RegExp.$1);
				obj.hasLanguageIcon = true;
			}
			
		}

	}
};



////////
/////////
// Game System
////////////
///////////

//////////
// Battle Tachie

Game_System.prototype.battleTachieAppearX = function() {
	if(Karryn.poseName == POSE_STANDBY && $gameParty._forceAdvantage == 'NORMAL') {
		return BATTLETACHIE_NORMAL_APPEAR_X;
	}
	else {
		return BATTLETACHIE_FULLSCREEN_APPEAR_X;
	}
};

Game_System.prototype.battleTachieHiddenX = function() {
	if(Karryn.poseName == POSE_STANDBY && $gameParty._forceAdvantage == 'NORMAL') {
		return BATTLETACHIE_HIDDEN_X;
	}
	else {
		return BATTLETACHIE_FULLSCREEN_APPEAR_X;
	}
};

Game_System.prototype.drawEnemiesAboveBattleTachie = function() {
	if(Karryn.isDrawEnemiesAboveBattleTachiePose()) {
		return true;
	}
	else {
		return false;
	}
};

////////
// Font

Game_System.prototype.initMessageFontSettings = function() {
    if ($dataSystem.locale.match(/^zh/)) {
      this._msgFontName = Yanfly.Param.MSGCNFontName;
    } else if ($dataSystem.locale.match(/^ko/)) {
      this._msgFontName = Yanfly.Param.MSGKRFontName;
    } 
	else if(TextManager.isJapanese) {
		this._msgFontName = FONT_JAPANESE_NAME;
	}
	else {
		this._msgFontName = FONT_GAMEFONT_NAME;
    }
    this._msgFontSize = Yanfly.Param.MSGFontSize;
    this._msgFontOutline = Yanfly.Param.MSGFontOutline;
};


Game_System.prototype.getMessageFontName = function() {
    if (this._msgFontName === undefined) this.initMessageFontSettings();
	if(TextManager.isJapanese && this._msgFontName != FONT_JAPANESE_NAME) this.initMessageFontSettings();
	else if(TextManager.isEnglish && this._msgFontName != FONT_GAMEFONT_NAME) this.initMessageFontSettings();
    return this._msgFontName;
};