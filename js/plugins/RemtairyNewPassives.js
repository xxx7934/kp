﻿var Remtairy = Remtairy || {};
Remtairy.NewPassives = Remtairy.NewPassives || {};

//=============================================================================
 /*:
 * @plugindesc New Passives
 * @author Remtairy
 *
 * @help
 * This is a private plugin. 
 * Do not redistribute, use, or modify this plugin
 * without explicit written permission from Remtairy.
 *
 */
//=============================================================================

const CHARA_CREATE_ONE_BOOBS_ID = 990;
const CHARA_CREATE_ONE_NIPPLES_ID = 991;
const CHARA_CREATE_ONE_CLIT_ID = 992;
const CHARA_CREATE_ONE_PUSSY_ID = 993;
const CHARA_CREATE_ONE_BUTT_ID = 994;
const CHARA_CREATE_ONE_ANAL_ID = 995;
const CHARA_CREATE_ONE_MOUTH_ID = 996;
const CHARA_CREATE_ONE_PETTING_ID = 997;

const CHARA_CREATE_THREE_MOUTH_ID = 980;
const CHARA_CREATE_THREE_BOOBS_ID = 981;
const CHARA_CREATE_THREE_PUSSY_ID = 982;
const CHARA_CREATE_THREE_BUTT_ID = 983;
const CHARA_CREATE_THREE_ONANI_ID = 984;
const CHARA_CREATE_THREE_SADO_ID = 985;
const CHARA_CREATE_THREE_MAZO_ID = 986;

const PASSIVE_SECRET_CURIOSITY_ID = 114;

const PASSIVE_MAX_MOUTH_DESIRE_FIRST_ID = 115;
const PASSIVE_MAX_BOOBS_DESIRE_FIRST_ID = 116;
const PASSIVE_MAX_PUSSY_DESIRE_FIRST_ID = 117;
const PASSIVE_MAX_BUTT_DESIRE_FIRST_ID = 118;
const PASSIVE_MAX_COCK_DESIRE_FIRST_ID = 119;
const PASSIVE_MAX_ALL_DESIRE_FIRST_ID = 120;

const PASSIVE_MAX_MOUTH_DESIRE_SECOND_ID = 121;
const PASSIVE_MAX_BOOBS_DESIRE_SECOND_ID = 122;
const PASSIVE_MAX_PUSSY_DESIRE_SECOND_ID = 123;
const PASSIVE_MAX_BUTT_DESIRE_SECOND_ID = 124;
const PASSIVE_MAX_COCK_DESIRE_SECOND_ID = 125;
const PASSIVE_MAX_ALL_DESIRE_SECOND_ID = 126;

const PASSIVE_MAX_MOUTH_DESIRE_THREE_ID = 127;
const PASSIVE_MAX_BOOBS_DESIRE_THREE_ID = 128;
const PASSIVE_MAX_PUSSY_DESIRE_THREE_ID = 129;
const PASSIVE_MAX_BUTT_DESIRE_THREE_ID = 130;
const PASSIVE_MAX_COCK_DESIRE_THREE_ID = 131;
const PASSIVE_MAX_ALL_DESIRE_THREE_ID = 132;

const PASSIVE_FIRST_KISS_ID = 133;
const PASSIVE_KISS_COUNT_ONE_ID = 134;
const PASSIVE_KISS_PEOPLE_ONE_ID = 135;
const PASSIVE_KISS_PEOPLE_TWO_ID = 136;
const PASSIVE_KISS_COUNT_TWO_ID = 137;
const PASSIVE_KISS_PEOPLE_THREE_ID = 138;
const PASSIVE_KISS_PEOPLE_FOUR_ID = 139;
const PASSIVE_KISS_ORGASM_ONE_ID = 140;
const PASSIVE_KISS_ORGASM_TWO_ID = 141;

const PASSIVE_BJ_COUNT_ONE_ID = 142;
const PASSIVE_BJ_PEOPLE_ONE_ID = 143;
const PASSIVE_BJ_COUNT_TWO_ID = 144;
const PASSIVE_BJ_PEOPLE_TWO_ID = 145;
const PASSIVE_BJ_PEOPLE_THREE_ID = 146;
const PASSIVE_BJ_PEOPLE_FOUR_ID = 147;
const PASSIVE_BJ_ORGASM_ONE_ID = 148;
const PASSIVE_BJ_ORGASM_TWO_ID = 149;

const PASSIVE_MOUTH_PLEASURE_ONE_ID = 150;
const PASSIVE_MOUTH_PLEASURE_TWO_ID = 151;

const PASSIVE_SWALLOW_PEOPLE_ONE_ID = 152;
const PASSIVE_SWALLOW_PEOPLE_TWO_ID = 153;
const PASSIVE_SWALLOW_ML_ONE_ID = 154;
const PASSIVE_SWALLOW_ML_TWO_ID = 155;
const PASSIVE_SWALLOW_ML_THREE_ID = 156;
const PASSIVE_MAX_SWALLOW_ML_ONE_ID = 157;
const PASSIVE_MAX_SWALLOW_ML_TWO_ID = 158;
const PASSIVE_SWALLOW_ORGASM_ONE_ID = 159;
const PASSIVE_SWALLOW_ORGASM_TWO_ID = 160;

const PASSIVE_BUKKAKE_COUNT_ONE_ID = 161;
const PASSIVE_BUKKAKE_ML_ONE_ID = 162;
const PASSIVE_BUKKAKE_COUNT_TWO_ID = 163;
const PASSIVE_BUKKAKE_ML_TWO_ID = 164;
const PASSIVE_BUKKAKE_ML_THREE_ID = 165;
const PASSIVE_BUKKAKE_ML_FOUR_ID = 166;
const PASSIVE_BUKKAKE_MAX_ML_ONE_ID = 167;
const PASSIVE_BUKKAKE_MAX_ML_TWO_ID = 168;
const PASSIVE_BUKKAKE_BOOBS_ML_ONE_ID = 169;
const PASSIVE_BUKKAKE_FACE_ML_ONE_ID = 170;
const PASSIVE_BUKKAKE_BUTT_ML_ONE_ID = 171;
const PASSIVE_BUKKAKE_ORGASM_ONE_ID = 172;
const PASSIVE_BUKKAKE_ORGASM_TWO_ID = 173;

const PASSIVE_HJ_COUNT_ONE_ID = 174;
const PASSIVE_HJ_PEOPLE_ONE_ID = 175;
const PASSIVE_HJ_COUNT_TWO_ID = 176;
const PASSIVE_HJ_PEOPLE_TWO_ID = 177;
const PASSIVE_HJ_PEOPLE_THREE_ID = 178;
const PASSIVE_HJ_PEOPLE_FOUR_ID = 179;
const PASSIVE_HJ_ORGASM_ONE_ID = 180;
const PASSIVE_HJ_ORGASM_TWO_ID = 181;

const PASSIVE_HJ_COUNT_THREE_ID = 182;
const PASSIVE_COCK_PETTING_COUNT_ONE_ID = 183;
const PASSIVE_COCK_PETTING_PEOPLE_ONE_ID = 184;
const PASSIVE_COCK_PETTING_PEOPLE_TWO_ID = 185;

const PASSIVE_ORGASM_COUNT_ONE_ID = 186;
const PASSIVE_ORGASM_COUNT_TWO_ID = 189;
const PASSIVE_ORGASM_COUNT_THREE_ID = 190;
const PASSIVE_ORGASM_COUNT_FOUR_ID = 191;
const PASSIVE_ORGASM_COUNT_FIVE_ID = 192;
const PASSIVE_ORGASM_COUNT_SIX_ID = 193;
const PASSIVE_ORGASM_COUNT_SEVEN_ID = 194;
const PASSIVE_ORGASM_DOUBLE_ID = 187;
const PASSIVE_ORGASM_TRIPLE_ID = 188;
const PASSIVE_ORGASM_ML_ONE_ID = 195;
const PASSIVE_ORGASM_ML_TWO_ID = 196;
const PASSIVE_ORGASM_PEOPLE_ONE_ID = 197;
const PASSIVE_ORGASM_PEOPLE_TWO_ID = 198;
const PASSIVE_PUSSY_JUICE_ML_ONE_ID = 199;
const PASSIVE_PUSSY_JUICE_ML_TWO_ID = 200;

const PASSIVE_BOOBS_PETTED_COUNT_ONE_ID = 201;
const PASSIVE_BOOBS_PETTED_PEOPLE_ONE_ID = 202;
const PASSIVE_BOOBS_PETTED_COUNT_TWO_ID = 203;
const PASSIVE_BOOBS_PETTED_PEOPLE_TWO_ID = 204;
const PASSIVE_BOOBS_PETTED_COUNT_THREE_ID = 205;
const PASSIVE_BOOBS_PETTED_PEOPLE_THREE_ID = 206;
const PASSIVE_BOOBS_PETTED_PEOPLE_FOUR_ID = 207;

const PASSIVE_NIPPLES_PETTED_COUNT_ONE_ID = 208;
const PASSIVE_NIPPLES_PETTED_PEOPLE_ONE_ID = 209;
const PASSIVE_NIPPLES_PETTED_COUNT_TWO_ID = 210;
const PASSIVE_NIPPLES_PETTED_PEOPLE_TWO_ID = 211;
const PASSIVE_NIPPLES_PETTED_COUNT_THREE_ID = 212;
const PASSIVE_NIPPLES_PETTED_PEOPLE_THREE_ID = 213;

const PASSIVE_TITTYFUCK_COUNT_ONE_ID = 214;
const PASSIVE_TITTYFUCK_PEOPLE_ONE_ID = 215;
const PASSIVE_TITTYFUCK_COUNT_TWO_ID = 216;
const PASSIVE_TITTYFUCK_PEOPLE_TWO_ID = 217;
const PASSIVE_TITTYFUCK_PEOPLE_THREE_ID = 218;
const PASSIVE_TITTYFUCK_PEOPLE_FOUR_ID = 219;
const PASSIVE_TITTYFUCK_ORGASM_ONE_ID = 220;
const PASSIVE_TITTYFUCK_ORGASM_TWO_ID = 221;

const PASSIVE_BOOBS_PLEASURE_ONE_ID = 222;
const PASSIVE_BOOBS_PLEASURE_TWO_ID = 223;

const PASSIVE_CLIT_PETTED_COUNT_ONE_ID = 224;
const PASSIVE_CLIT_PETTED_PEOPLE_ONE_ID = 225;
const PASSIVE_CLIT_PETTED_COUNT_TWO_ID = 226;
const PASSIVE_CLIT_PETTED_PEOPLE_TWO_ID = 227;
const PASSIVE_CLIT_PETTED_COUNT_THREE_ID = 228;
const PASSIVE_CLIT_PETTED_PEOPLE_THREE_ID = 229;
const PASSIVE_CLIT_PETTED_PEOPLE_FOUR_ID = 230;

const PASSIVE_CUNNILINGUS_COUNT_ONE_ID = 231;
const PASSIVE_CUNNILINGUS_PEOPLE_ONE_ID = 232;
const PASSIVE_CUNNILINGUS_COUNT_TWO_ID = 233;
const PASSIVE_CUNNILINGUS_PEOPLE_TWO_ID = 234;
const PASSIVE_CUNNILINGUS_ORGASM_ONE_ID = 235;
const PASSIVE_CUNNILINGUS_ORGASM_TWO_ID = 236;

const PASSIVE_PUSSY_PETTED_COUNT_ONE_ID = 237;
const PASSIVE_PUSSY_PETTED_PEOPLE_ONE_ID = 238;
const PASSIVE_PUSSY_PETTED_COUNT_TWO_ID = 239;
const PASSIVE_PUSSY_PETTED_PEOPLE_TWO_ID = 240;
const PASSIVE_PUSSY_PETTED_COUNT_THREE_ID = 241;
const PASSIVE_PUSSY_PETTED_PEOPLE_THREE_ID = 242;
const PASSIVE_PUSSY_PETTED_COUNT_FOUR_ID = 243;

const PASSIVE_FIRST_SEX_ID = 244;
const PASSIVE_PUSSY_SEX_COUNT_ONE_ID = 245;
const PASSIVE_PUSSY_SEX_COUNT_TWO_ID = 246;
const PASSIVE_PUSSY_SEX_PEOPLE_ONE_ID = 247;
const PASSIVE_PUSSY_SEX_COUNT_THREE_ID = 248;
const PASSIVE_PUSSY_SEX_PEOPLE_TWO_ID = 249;
const PASSIVE_PUSSY_SEX_PEOPLE_THREE_ID = 250;
const PASSIVE_PUSSY_SEX_PEOPLE_FOUR_ID = 251;
const PASSIVE_PUSSY_SEX_ORGASM_ONE_ID = 252;
const PASSIVE_PUSSY_SEX_ORGASM_TWO_ID = 253;
const PASSIVE_PUSSY_PLEASURE_ONE_ID = 254;
const PASSIVE_PUSSY_PLEASURE_TWO_ID = 255;

const PASSIVE_PUSSY_CREAMPIE_PEOPLE_ONE_ID = 256;
const PASSIVE_PUSSY_CREAMPIE_PEOPLE_TWO_ID = 257;
const PASSIVE_PUSSY_CREAMPIE_ML_ONE_ID = 258;
const PASSIVE_PUSSY_CREAMPIE_ML_TWO_ID = 259;
const PASSIVE_PUSSY_CREAMPIE_ML_THREE_ID = 260;
const PASSIVE_PUSSY_CREAMPIE_ML_FOUR_ID = 261;
const PASSIVE_MAX_PUSSY_CREAMPIE_ML_ONE_ID = 262;
const PASSIVE_MAX_PUSSY_CREAMPIE_ML_TWO_ID = 263;
const PASSIVE_PUSSY_CREAMPIE_ORGASM_ONE_ID = 264;
const PASSIVE_PUSSY_CREAMPIE_ORGASM_TWO_ID = 265;

const PASSIVE_BUTT_PETTED_COUNT_ONE_ID = 266;
const PASSIVE_BUTT_PETTED_PEOPLE_ONE_ID = 267;
const PASSIVE_BUTT_PETTED_COUNT_TWO_ID = 268;
const PASSIVE_BUTT_PETTED_PEOPLE_TWO_ID = 269;
const PASSIVE_BUTT_PETTED_COUNT_THREE_ID = 270;
const PASSIVE_BUTT_PETTED_PEOPLE_THREE_ID = 271;
const PASSIVE_BUTT_PETTED_PEOPLE_FOUR_ID = 272;

const PASSIVE_BUTT_SPANKED_COUNT_ONE_ID = 273;
const PASSIVE_BUTT_SPANKED_PEOPLE_ONE_ID = 274;
const PASSIVE_BUTT_SPANKED_COUNT_TWO_ID = 275;
const PASSIVE_BUTT_SPANKED_PEOPLE_TWO_ID = 276;
const PASSIVE_BUTT_SPANKED_PEOPLE_THREE_ID = 277;

const PASSIVE_ANAL_PETTED_COUNT_ONE_ID = 278;
const PASSIVE_ANAL_PETTED_PEOPLE_ONE_ID = 279;
const PASSIVE_ANAL_PETTED_COUNT_TWO_ID = 280;
const PASSIVE_ANAL_PETTED_PEOPLE_TWO_ID = 281;
const PASSIVE_ANAL_PETTED_COUNT_THREE_ID = 282;
const PASSIVE_ANAL_PETTED_PEOPLE_THREE_ID = 283;
const PASSIVE_ANAL_PETTED_COUNT_FOUR_ID = 284;

const PASSIVE_FIRST_ANAL_ID = 285;
const PASSIVE_ANAL_SEX_COUNT_ONE_ID = 286;
const PASSIVE_ANAL_SEX_COUNT_TWO_ID = 287;
const PASSIVE_ANAL_SEX_PEOPLE_ONE_ID = 288;
const PASSIVE_ANAL_SEX_COUNT_THREE_ID = 289;
const PASSIVE_ANAL_SEX_PEOPLE_TWO_ID = 290;
const PASSIVE_ANAL_SEX_PEOPLE_THREE_ID = 291;
const PASSIVE_ANAL_SEX_PEOPLE_FOUR_ID = 292;
const PASSIVE_ANAL_SEX_ORGASM_ONE_ID = 293;
const PASSIVE_ANAL_SEX_ORGASM_TWO_ID = 294;
const PASSIVE_ANAL_PLEASURE_ONE_ID = 295;
const PASSIVE_ANAL_PLEASURE_TWO_ID = 296;

const PASSIVE_ANAL_CREAMPIE_PEOPLE_ONE_ID = 297;
const PASSIVE_ANAL_CREAMPIE_PEOPLE_TWO_ID = 298;
const PASSIVE_ANAL_CREAMPIE_ML_ONE_ID = 299;
const PASSIVE_ANAL_CREAMPIE_ML_TWO_ID = 701;
const PASSIVE_ANAL_CREAMPIE_ML_THREE_ID = 702;
const PASSIVE_ANAL_CREAMPIE_ML_FOUR_ID = 703;
const PASSIVE_MAX_ANAL_CREAMPIE_ML_ONE_ID = 704;
const PASSIVE_MAX_ANAL_CREAMPIE_ML_TWO_ID = 705;
const PASSIVE_ANAL_CREAMPIE_ORGASM_ONE_ID = 706;
const PASSIVE_ANAL_CREAMPIE_ORGASM_TWO_ID = 707;

const PASSIVE_TALK_COUNT_ONE_ID = 708;
const PASSIVE_TALK_COUNT_TWO_ID = 710;
const PASSIVE_TALK_PEOPLE_ONE_ID = 709;
const PASSIVE_TALK_PEOPLE_TWO_ID = 711;
const PASSIVE_TALK_PEOPLE_THREE_ID = 712;
const PASSIVE_TALK_PLEASURE_ONE_ID = 713;
const PASSIVE_TALK_PLEASURE_TWO_ID = 714;
const PASSIVE_TALK_ORGASM_ONE_ID = 715;
const PASSIVE_TALK_ORGASM_TWO_ID = 716;

const PASSIVE_SIGHT_PEOPLE_ONE_ID = 717;
const PASSIVE_SIGHT_PEOPLE_TWO_ID = 718;
const PASSIVE_SIGHT_PEOPLE_THREE_ID = 719;
const PASSIVE_SIGHT_PEOPLE_FOUR_ID = 720;
const PASSIVE_SIGHT_PLEASURE_ONE_ID = 732;
const PASSIVE_SIGHT_PLEASURE_TWO_ID = 733;
const PASSIVE_SIGHT_BOOBS_ONE_ID = 721;
const PASSIVE_SIGHT_NIPPLES_ONE_ID = 722;
const PASSIVE_SIGHT_CLIT_ONE_ID = 723;
const PASSIVE_SIGHT_WETPUSSY_ONE_ID = 724;
const PASSIVE_SIGHT_BUTT_ONE_ID = 725;
const PASSIVE_SIGHT_ANALCREAMPIE_ONE_ID = 726;
const PASSIVE_SIGHT_PUSSYCREAMPIE_ONE_ID = 727;
const PASSIVE_SIGHT_BUKKAKEFACE_ONE_ID = 728;
const PASSIVE_SIGHT_BUKKAKEBOOBS_ONE_ID = 729;
const PASSIVE_SIGHT_BUKKAKEBUTT_ONE_ID = 730;
const PASSIVE_SIGHT_MOUTHSWALLOW_ONE_ID = 731;
const PASSIVE_SIGHT_ORGASM_ONE_ID = 734;
const PASSIVE_SIGHT_ORGASM_TWO_ID = 735;

const PASSIVE_SEE_JERKOFF_COUNT_ONE_ID = 736;

const PASSIVE_PETTING_ORGASM_ONE_ID = 750;
const PASSIVE_PETTING_ORGASM_TWO_ID = 751;

const PASSIVE_CLOTHES_STRIPPED_ONE_ID = 752;
const PASSIVE_CLOTHES_STRIPPED_TWO_ID = 753;
const PASSIVE_CLOTHES_STRIPPED_THREE_ID = 754;
const PASSIVE_CLOTHES_STRIPPED_FOUR_ID = 755;
const PASSIVE_PANTIES_STRIPPED_ONE_ID = 756;
const PASSIVE_PANTIES_STRIPPED_TWO_ID = 757;
const PASSIVE_PANTIES_STRIPPED_THREE_ID = 758;

const PASSIVE_SUBDUED_COUNT_ONE_ID = 759;
const PASSIVE_SUBDUED_COUNT_TWO_ID = 760;
const PASSIVE_COCKINESS_COUNT_ONE_ID = 761;
const PASSIVE_COCKINESS_COUNT_TWO_ID = 762;
const PASSIVE_COCKINESS_COUNT_THREE_ID = 763;
const PASSIVE_COCKINESS_COUNT_FOUR_ID = 764;
const PASSIVE_TAUNT_COUNT_ONE_ID = 765;
const PASSIVE_TAUNT_COUNT_TWO_ID = 766;
const PASSIVE_TAUNT_COUNT_THREE_ID = 767;
const PASSIVE_SUBDUED_ERECT_COUNT_ONE_ID = 768;
const PASSIVE_SUBDUED_ERECT_COUNT_TWO_ID = 769;
const PASSIVE_COCKKICK_COUNT_ONE_ID = 770;
const PASSIVE_COCKKICK_COUNT_TWO_ID = 771;
const PASSIVE_COCKKICK_COUNT_THREE_ID = 772;
const PASSIVE_SADISM_PLEASURE_ONE_ID = 773;
const PASSIVE_SADISM_PLEASURE_TWO_ID = 774;
const PASSIVE_SADISM_ORGASM_ONE_ID = 775;
const PASSIVE_SADISM_ORGASM_TWO_ID = 776;

const PASSIVE_DEFEATED_COUNT_ONE_ID = 777;
const PASSIVE_DEFEATED_COUNT_TWO_ID = 778;
const PASSIVE_DEFEATED_COUNT_THREE_ID = 779;
const PASSIVE_DEFEATED_COUNT_FOUR_ID = 780;
const PASSIVE_DOGEZA_COUNT_ONE_ID = 781;
const PASSIVE_DOGEZA_COUNT_TWO_ID = 782;
const PASSIVE_DOGEZA_COUNT_THREE_ID = 783;
const PASSIVE_MASOCHISM_PLEASURE_ONE_ID = 784;
const PASSIVE_MASOCHISM_PLEASURE_TWO_ID = 785;
const PASSIVE_MASOCHISM_ORGASM_ONE_ID = 786;
const PASSIVE_MASOCHISM_ORGASM_TWO_ID = 787;

const PASSIVE_DOUBLE_PEN_COUNT_ONE_ID = 788;
const PASSIVE_DOUBLE_PEN_COUNT_TWO_ID = 789;
const PASSIVE_DOUBLE_PEN_COUNT_THREE_ID = 790;
const PASSIVE_TRIPLE_PEN_COUNT_ONE_ID = 791;
const PASSIVE_TRIPLE_PEN_COUNT_TWO_ID = 792;
const PASSIVE_TRIPLE_PEN_COUNT_THREE_ID = 793;
const PASSIVE_BLOWBANG_COUNT_ONE_ID = 794;
const PASSIVE_BLOWBANG_COUNT_TWO_ID = 795;
const PASSIVE_BLOWBANG_COUNT_THREE_ID = 796;

const PASSIVE_SEXUAL_PARTNERS_TOTAL_ONE_ID = 797;
const PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID = 798;
const PASSIVE_SEXUAL_PARTNERS_TOTAL_THREE_ID = 799;
const PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID = 800;
const PASSIVE_SEXUAL_PARTNERS_TOTAL_FIVE_ID = 801;

const PASSIVE_SEXUAL_PARTNERS_GOBLIN_ONE_ID = 802;
const PASSIVE_SEXUAL_PARTNERS_GOBLIN_TWO_ID = 803;
const PASSIVE_SEXUAL_PARTNERS_GOBLIN_THREE_ID = 804;
const PASSIVE_SEXUAL_PARTNERS_THUG_ONE_ID = 805;
const PASSIVE_SEXUAL_PARTNERS_THUG_TWO_ID = 806;
const PASSIVE_SEXUAL_PARTNERS_THUG_THREE_ID = 807;
const PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID = 808;
const PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID = 809;
const PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID = 810;

const PASSIVE_KISS_USAGE_ONE_ID = 811;
const PASSIVE_KISS_USAGE_TWO_ID = 812;
const PASSIVE_KISS_USAGE_THREE_ID = 813;
const PASSIVE_BJ_USAGE_ONE_ID = 814;
const PASSIVE_BJ_USAGE_TWO_ID = 815;
const PASSIVE_BJ_USAGE_THREE_ID = 816;
const PASSIVE_HJ_USAGE_ONE_ID = 817;
const PASSIVE_HJ_USAGE_TWO_ID = 818;
const PASSIVE_HJ_USAGE_THREE_ID = 819;
const PASSIVE_TITTYFUCK_USAGE_ONE_ID = 820;
const PASSIVE_TITTYFUCK_USAGE_TWO_ID = 821;
const PASSIVE_TITTYFUCK_USAGE_THREE_ID = 822;
const PASSIVE_PUSSY_SEX_USAGE_ONE_ID = 823;
const PASSIVE_PUSSY_SEX_USAGE_TWO_ID = 824;
const PASSIVE_PUSSY_SEX_USAGE_THREE_ID = 825;
const PASSIVE_PUSSY_SEX_USAGE_FOUR_ID = 826;
const PASSIVE_ANAL_SEX_USAGE_ONE_ID = 827;
const PASSIVE_ANAL_SEX_USAGE_TWO_ID = 828;
const PASSIVE_ANAL_SEX_USAGE_THREE_ID = 829;
const PASSIVE_ANAL_SEX_USAGE_FOUR_ID = 830;

const PASSIVE_SUBDUED_COUNT_THREE_ID = 831;
const PASSIVE_FLAUNT_COUNT_ONE_ID = 832;
const PASSIVE_FLAUNT_COUNT_TWO_ID = 833;
const PASSIVE_FLAUNT_COUNT_THREE_ID = 834;
const PASSIVE_HORNY_COUNT_ONE_ID = 835;
const PASSIVE_HORNY_COUNT_TWO_ID = 836;
const PASSIVE_HORNY_COUNT_THREE_ID = 837;
const PASSIVE_HORNY_COUNT_FOUR_ID = 838;
const PASSIVE_OFFBALANCE_COUNT_ONE_ID = 839;
const PASSIVE_OFFBALANCE_COUNT_TWO_ID = 840;
const PASSIVE_OFFBALANCE_COUNT_THREE_ID = 841;
const PASSIVE_FALLEN_COUNT_ONE_ID = 842;
const PASSIVE_FALLEN_COUNT_TWO_ID = 843;
const PASSIVE_FALLEN_COUNT_THREE_ID = 844;

const PASSIVE_RIMJOB_COUNT_ONE_ID = 845;
const PASSIVE_RIMJOB_PEOPLE_ONE_ID = 846;
const PASSIVE_RIMJOB_COUNT_TWO_ID = 847;
const PASSIVE_RIMJOB_PEOPLE_TWO_ID = 848;
const PASSIVE_RIMJOB_USAGE_ONE_ID = 849;
const PASSIVE_RIMJOB_USAGE_TWO_ID = 850;
const PASSIVE_RIMJOB_USAGE_THREE_ID = 851;

const PASSIVE_FOOTJOB_COUNT_ONE_ID = 852;
const PASSIVE_FOOTJOB_PEOPLE_ONE_ID = 853;
const PASSIVE_FOOTJOB_COUNT_TWO_ID = 854;
const PASSIVE_FOOTJOB_PEOPLE_TWO_ID = 855;
const PASSIVE_FOOTJOB_USAGE_ONE_ID = 856;
const PASSIVE_FOOTJOB_USAGE_TWO_ID = 857;
const PASSIVE_FOOTJOB_USAGE_THREE_ID = 858;

const PASSIVE_VIRGINS_TOTAL_ONE_ID = 859;
const PASSIVE_VIRGINS_TOTAL_TWO_ID = 860;
const PASSIVE_VIRGINS_TOTAL_THREE_ID = 861;
const PASSIVE_VIRGINS_TOTAL_FOUR_ID = 862;

const PASSIVE_TOTAL_TOYS_INSERT_COUNT_ONE_ID = 863;
const PASSIVE_TOTAL_TOYS_INSERT_COUNT_TWO_ID = 864;
const PASSIVE_PINK_ROTOR_INSERT_COUNT_ONE_ID = 865;
const PASSIVE_PINK_ROTOR_INSERT_COUNT_TWO_ID = 866;
const PASSIVE_DILDO_INSERT_COUNT_ONE_ID = 867;
const PASSIVE_DILDO_INSERT_COUNT_TWO_ID = 868;
const PASSIVE_ANAL_BEADS_INSERT_COUNT_ONE_ID = 869;
const PASSIVE_ANAL_BEADS_INSERT_COUNT_TWO_ID = 870;
const PASSIVE_TOYS_PLEASURE_ONE_ID = 871;
const PASSIVE_TOYS_PLEASURE_TWO_ID = 872;
const PASSIVE_TOYS_ORGASM_ONE_ID = 873;
const PASSIVE_TOYS_ORGASM_TWO_ID = 874;

const PASSIVE_SEXUAL_PARTNERS_NERD_ONE_ID = 875;
const PASSIVE_SEXUAL_PARTNERS_NERD_TWO_ID = 876;
const PASSIVE_SEXUAL_PARTNERS_NERD_THREE_ID = 877;
const PASSIVE_SEXUAL_PARTNERS_ROGUE_ONE_ID = 878;
const PASSIVE_SEXUAL_PARTNERS_ROGUE_TWO_ID = 879;
const PASSIVE_SEXUAL_PARTNERS_ROGUE_THREE_ID = 880;
const PASSIVE_SEXUAL_PARTNERS_SLIME_ONE_ID = 881;
const PASSIVE_SEXUAL_PARTNERS_SLIME_TWO_ID = 882;
const PASSIVE_SEXUAL_PARTNERS_SLIME_THREE_ID = 883;

const PASSIVE_BAR_WAITRESS_SEX_COUNT_ONE_ID = 884;
const PASSIVE_BAR_WAITRESS_SEX_COUNT_TWO_ID = 885;
const PASSIVE_BAR_WAITRESS_SEX_COUNT_THREE_ID = 886;
const PASSIVE_URINAL_COUNT_ONE_ID = 887;
const PASSIVE_URINAL_COUNT_TWO_ID = 888;
const PASSIVE_URINAL_COUNT_THREE_ID = 889;

const PASSIVE_RECEPTIONIST_VISITOR_SEX_COUNT_ONE_ID = 890;
const PASSIVE_RECEPTIONIST_VISITOR_SEX_COUNT_TWO_ID = 891;
const PASSIVE_RECEPTIONIST_VISITOR_SEX_COUNT_THREE_ID = 892;

const PASSIVE_KARRYN_STARE_COCK_ONE_ID = 893;
const PASSIVE_KARRYN_STARE_COCK_TWO_ID = 894;
const PASSIVE_KARRYN_STARE_COCK_THREE_ID = 895;
const PASSIVE_KARRYN_STARE_COCK_FOUR_ID = 896;

const PASSIVE_WAITRESS_FLASH_COUNT_ONE_ID = 897;
const PASSIVE_WAITRESS_FLASH_COUNT_TWO_ID = 898;

const PASSIVE_JOB_PETTING_COUNT_ONE_ID = 899;
const PASSIVE_JOB_PETTING_COUNT_TWO_ID = 900;
const PASSIVE_JOB_PETTING_COUNT_THREE_ID = 901;

const PASSIVE_DOWNSTAMINA_COUNT_ONE_ID = 902;
const PASSIVE_DOWNSTAMINA_COUNT_TWO_ID = 903;
const PASSIVE_DOWNSTAMINA_COUNT_THREE_ID = 904;

const PASSIVE_SPANKING_ORGASM_ONE_ID = 905;
const PASSIVE_SPANKING_ORGASM_TWO_ID = 906;
const PASSIVE_SADISM_ORGASM_THREE_ID = 907;
const PASSIVE_MASOCHISM_ORGASM_THREE_ID = 908;


////////////
//////////////
// Game Actor
//////////////
////////////

//////////
// Check For New Passives
//////////////////

Game_Actor.prototype.checkForNewPassives = function() {
	if(!DEBUG_MODE) return;
	
	this.checkForNewMouthPassives();
	this.checkForNewHandjobPassives();
	this.checkForNewBlowjobPassives();
	this.checkForNewBoobsPassives();
	this.checkForNewPussyPassives();
	this.checkForNewButtPassives();
	this.checkForNewCockPassives();
	this.checkForNewTalkSightStripPassives();
	this.checkForNewSpecialPassives();
	this.checkForNewEjaculationPassives();
	this.checkForNewSadoMasoPassives();
	this.checkForNewOrgasmPassives();
	this.checkForNewDebuffPassives();
	this.checkForNewSexualPartnersPassives();
	
	this.recalculateBodySensitivities();
	this.recalculateSkillLvls();
};

Game_Actor.prototype.checkForNewMouthPassives = function() {
	if(!this.hasPassive(PASSIVE_FIRST_KISS_ID) && this._firstKissWantedID >= 0) {
		this.learnNewPassive(PASSIVE_FIRST_KISS_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_MOUTH_DESIRE_FIRST_ID) && this._recordMaxReachedMouthDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_MOUTH_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_MOUTH_DESIRE_SECOND_ID) && this._recordMaxReachedMouthDesireCount >= 10 && this._recordKissedCount >= 50) {
		this.learnNewPassive(PASSIVE_MAX_MOUTH_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_MOUTH_DESIRE_THREE_ID) && this._recordMaxReachedMouthDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_MAX_MOUTH_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_KISS_COUNT_ONE_ID) && this._recordKissedCount >= 10) {
		this.learnNewPassive(PASSIVE_KISS_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_COUNT_TWO_ID) && this._recordKissedCount >= 69) {
		this.learnNewPassive(PASSIVE_KISS_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_PEOPLE_ONE_ID) && this._recordKissedPeople >= 10) {
		this.learnNewPassive(PASSIVE_KISS_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_PEOPLE_TWO_ID) && this._recordKissedPeople >= 20 && this._recordMaxReachedMouthDesireCount >= 2) {
		this.learnNewPassive(PASSIVE_KISS_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_PEOPLE_THREE_ID) && this._recordKissedPeople >= 50) {
		this.learnNewPassive(PASSIVE_KISS_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_PEOPLE_FOUR_ID) && this._recordKissedPeople >= 100) {
		this.learnNewPassive(PASSIVE_KISS_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_KISS_USAGE_ONE_ID) && this._recordKissUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_KISS_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_USAGE_TWO_ID) && this._recordKissUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_KISS_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_USAGE_THREE_ID) && this._recordKissUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_KISS_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MOUTH_PLEASURE_ONE_ID) && this._recordMouthPleasure >= 1000) {
		this.learnNewPassive(PASSIVE_MOUTH_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MOUTH_PLEASURE_TWO_ID) && this._recordMouthPleasure >= 5000) {
		this.learnNewPassive(PASSIVE_MOUTH_PLEASURE_TWO_ID)
	}
};

Game_Actor.prototype.checkForNewHandjobPassives = function() {
	if(!this.hasPassive(PASSIVE_HJ_COUNT_ONE_ID) && this._recordHandjobCount >= 5) {
		this.learnNewPassive(PASSIVE_HJ_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_COUNT_TWO_ID) && this._recordHandjobCount >= 15 && this._recordMaxReachedCockDesireCount >= 2) {
		this.learnNewPassive(PASSIVE_HJ_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_COUNT_THREE_ID) && this._recordHandjobUsageCount >= 5 && this._recordMaxReachedCockDesireCount >= 5) {
		this.learnNewPassive(PASSIVE_HJ_COUNT_THREE_ID)
	}
	
	else if(!this.hasPassive(PASSIVE_HJ_PEOPLE_ONE_ID) && this._recordHandjobPeople >= 5) {
		this.learnNewPassive(PASSIVE_HJ_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_PEOPLE_TWO_ID) && this._recordHandjobPeople >= 30) {
		this.learnNewPassive(PASSIVE_HJ_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_PEOPLE_THREE_ID) && this._recordHandjobPeople >= 69) {
		this.learnNewPassive(PASSIVE_HJ_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_PEOPLE_FOUR_ID) && this._recordHandjobPeople >= 100) {
		this.learnNewPassive(PASSIVE_HJ_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_HJ_USAGE_ONE_ID) && this._recordHandjobUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_HJ_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_USAGE_TWO_ID) && this._recordHandjobUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_HJ_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_USAGE_THREE_ID) && this._recordHandjobUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_HJ_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_COCK_PETTING_COUNT_ONE_ID) && this._recordCockPettedCount >= 10) {
		this.learnNewPassive(PASSIVE_COCK_PETTING_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCK_PETTING_PEOPLE_ONE_ID) && this._recordCockPettedPeople >= 30) {
		this.learnNewPassive(PASSIVE_COCK_PETTING_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCK_PETTING_PEOPLE_TWO_ID) && this._recordCockPettedPeople >= 69 && this._recordMaxReachedCockDesireCount >= 15) {
		this.learnNewPassive(PASSIVE_COCK_PETTING_PEOPLE_TWO_ID)
	}
	
};

Game_Actor.prototype.checkForNewBlowjobPassives = function() {
	if(!this.hasPassive(PASSIVE_BJ_COUNT_ONE_ID) && this._recordBlowjobCount >= 5) {
		this.learnNewPassive(PASSIVE_BJ_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_COUNT_TWO_ID) && this._recordBlowjobCount >= 20 && this._recordMaxReachedMouthDesireCount >= 3 && this._recordMaxReachedCockDesireCount >= 3) {
		this.learnNewPassive(PASSIVE_BJ_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_PEOPLE_ONE_ID) && this._recordBlowjobPeople >= 10) {
		this.learnNewPassive(PASSIVE_BJ_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_PEOPLE_TWO_ID) && this._recordBlowjobPeople >= 30) {
		this.learnNewPassive(PASSIVE_BJ_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_PEOPLE_THREE_ID) && this._recordBlowjobPeople >= 69) {
		this.learnNewPassive(PASSIVE_BJ_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_PEOPLE_FOUR_ID) && this._recordBlowjobPeople >= 125) {
		this.learnNewPassive(PASSIVE_BJ_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BJ_USAGE_ONE_ID) && this._recordBlowjobUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_BJ_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_USAGE_TWO_ID) && this._recordBlowjobUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_BJ_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_USAGE_THREE_ID) && this._recordBlowjobUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_BJ_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SWALLOW_PEOPLE_ONE_ID) && this._recordSwallowPeople >= 1) {
		this.learnNewPassive(PASSIVE_SWALLOW_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SWALLOW_PEOPLE_TWO_ID) && this._recordSwallowPeople >= 10) {
		this.learnNewPassive(PASSIVE_SWALLOW_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SWALLOW_ML_ONE_ID) && this._recordSwallowML >= 250) {
		this.learnNewPassive(PASSIVE_SWALLOW_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SWALLOW_ML_TWO_ID) && this._recordSwallowML >= 1000) {
		this.learnNewPassive(PASSIVE_SWALLOW_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SWALLOW_ML_THREE_ID) && this._recordSwallowML >= 5000) {
		this.learnNewPassive(PASSIVE_SWALLOW_ML_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_SWALLOW_ML_ONE_ID) && this._recordSwallowMaxML >= 50) {
		this.learnNewPassive(PASSIVE_MAX_SWALLOW_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_SWALLOW_ML_TWO_ID) && this._recordSwallowMaxML >= 150) {
		this.learnNewPassive(PASSIVE_MAX_SWALLOW_ML_TWO_ID)
	}

};

Game_Actor.prototype.checkForNewBoobsPassives = function() {
	if(!this.hasPassive(PASSIVE_MAX_BOOBS_DESIRE_FIRST_ID) && this._recordMaxReachedBoobsDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_BOOBS_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_BOOBS_DESIRE_SECOND_ID) && this._recordMaxReachedBoobsDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_MAX_BOOBS_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_BOOBS_DESIRE_THREE_ID) && this._recordMaxReachedBoobsDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_MAX_BOOBS_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BOOBS_PETTED_COUNT_ONE_ID) && this._recordBoobsPettedCount >= 5 && this._recordBoobsPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_COUNT_TWO_ID) && this._recordBoobsPettedCount >= 50 && this._recordBoobsPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_COUNT_THREE_ID) && this._recordBoobsPettedCount >= 250 && this._recordBoobsPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_PEOPLE_ONE_ID) && this._recordBoobsPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_PEOPLE_TWO_ID) && this._recordBoobsPettedPeople >= 30) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_PEOPLE_THREE_ID) && this._recordBoobsPettedPeople >= 80) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PETTED_PEOPLE_FOUR_ID) && this._recordBoobsPettedPeople >= 200) {
		this.learnNewPassive(PASSIVE_BOOBS_PETTED_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_COUNT_ONE_ID) && this._recordNipplesPettedCount >= 5 && this._recordNipplesPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_COUNT_TWO_ID) && this._recordNipplesPettedCount >= 25 && this._recordNipplesPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_COUNT_THREE_ID) && this._recordNipplesPettedCount >= 125 && this._recordNipplesPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_ONE_ID) && this._recordNipplesPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_TWO_ID) && this._recordNipplesPettedPeople >= 42) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_THREE_ID) && this._recordNipplesPettedPeople >= 100) {
		this.learnNewPassive(PASSIVE_NIPPLES_PETTED_PEOPLE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TITTYFUCK_COUNT_ONE_ID) && this._recordTittyFuckCount >= 5) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_PEOPLE_ONE_ID) && this._recordTittyFuckPeople >= 12) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_COUNT_TWO_ID) && this._recordTittyFuckCount >= 20) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_PEOPLE_TWO_ID) && this._recordTittyFuckPeople >= 30) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_PEOPLE_THREE_ID) && this._recordTittyFuckPeople >= 69) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_PEOPLE_FOUR_ID) && this._recordTittyFuckPeople >= 125) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TITTYFUCK_USAGE_ONE_ID) && this._recordTittyFuckUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_USAGE_TWO_ID) && this._recordTittyFuckUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_USAGE_THREE_ID) && this._recordTittyFuckUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BOOBS_PLEASURE_ONE_ID) && this._recordBoobsPleasure + this._recordNipplesPleasure >= 2000) {
		this.learnNewPassive(PASSIVE_BOOBS_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BOOBS_PLEASURE_TWO_ID) && this._recordBoobsPleasure + this._recordNipplesPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_BOOBS_PLEASURE_TWO_ID)
	}

};

Game_Actor.prototype.checkForNewPussyPassives = function() {
	if(!this.hasPassive(PASSIVE_FIRST_SEX_ID) && (this._firstPussySexWantedID >= 0 || this._firstPussySexWasToy)) {
		this.learnNewPassive(PASSIVE_FIRST_SEX_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_PUSSY_DESIRE_FIRST_ID) && this._recordMaxReachedPussyDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_PUSSY_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_PUSSY_DESIRE_SECOND_ID) && this._recordMaxReachedPussyDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_MAX_PUSSY_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_PUSSY_DESIRE_THREE_ID) && this._recordMaxReachedPussyDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_MAX_PUSSY_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_CLIT_PETTED_COUNT_ONE_ID) && this._recordClitPettedCount >= 5 && this._recordClitPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_PEOPLE_ONE_ID) && this._recordClitPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_COUNT_TWO_ID) && this._recordClitPettedCount >= 50 && this._recordClitPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_PEOPLE_TWO_ID) && this._recordClitPettedPeople >= 30) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_COUNT_THREE_ID) && this._recordClitPettedCount >= 150 && this._recordClitPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_PEOPLE_THREE_ID) && this._recordClitPettedPeople >= 80) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLIT_PETTED_PEOPLE_FOUR_ID) && this._recordClitPettedPeople >= 200) {
		this.learnNewPassive(PASSIVE_CLIT_PETTED_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_CUNNILINGUS_COUNT_ONE_ID) && this._recordCunnilingusCount >= 1) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CUNNILINGUS_PEOPLE_ONE_ID) && this._recordCunnilingusPeople >= 10) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CUNNILINGUS_COUNT_TWO_ID) && this._recordCunnilingusCount >= 42) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_CUNNILINGUS_PEOPLE_TWO_ID) && this._recordCunnilingusPeople >= 69) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_PEOPLE_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_PETTED_COUNT_ONE_ID) && this._recordPussyPettedCount >= 5 && this._recordPussyPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_PEOPLE_ONE_ID) && this._recordPussyPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_COUNT_TWO_ID) && this._recordPussyPettedCount >= 25 && this._recordPussyPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_PEOPLE_TWO_ID) && this._recordPussyPettedPeople >= 42) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_COUNT_THREE_ID) && this._recordPussyPettedCount >= 75 && this._recordPussyPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_PEOPLE_THREE_ID) && this._recordPussyPettedPeople >= 125) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PETTED_COUNT_FOUR_ID) && this._recordPussyPettedCount >= 250 && this._recordPussyPettedPeople >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_PETTED_COUNT_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_SEX_COUNT_ONE_ID) && this._recordPussyFuckedCount >= 5) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_COUNT_TWO_ID) && this._recordPussyFuckedCount >= 15) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_PEOPLE_ONE_ID) && this._recordPussyFuckedPeople >= 25 && this._recordMaxReachedPussyDesireCount >= 3 && this._recordMaxReachedCockDesireCount >= 3) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_COUNT_THREE_ID) && this._recordPussyFuckedCount >= 42) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_PEOPLE_TWO_ID) && this._recordPussyFuckedPeople >= 50 && this._recordMaxReachedPussyDesireCount >= 5 && this._recordMaxReachedCockDesireCount >= 5) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_PEOPLE_THREE_ID) && this._recordPussyFuckedPeople >= 100 && this._recordMaxReachedPussyDesireCount >= 12 && this._recordMaxReachedCockDesireCount >= 12) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_PEOPLE_FOUR_ID) && this._recordPussyFuckedPeople >= 250 && this._recordMaxReachedPussyDesireCount >= 30 && this._recordMaxReachedCockDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_SEX_USAGE_ONE_ID) && this._recordPussySexUsageCount >= 20) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_USAGE_TWO_ID) && this._recordPussySexUsageCount >= 50) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_USAGE_THREE_ID) && this._recordPussySexUsageCount >= 120) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_USAGE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_USAGE_FOUR_ID) && this._recordPussySexUsageCount >= 250) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_USAGE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_PLEASURE_ONE_ID) && this._recordPussyPleasure + this._recordClitPleasure >= 2000) {
		this.learnNewPassive(PASSIVE_PUSSY_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_PLEASURE_TWO_ID) && this._recordPussyPleasure + this._recordClitPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_PUSSY_PLEASURE_TWO_ID)
	}
	
};

Game_Actor.prototype.checkForNewButtPassives = function() {
	if(!this.hasPassive(PASSIVE_FIRST_ANAL_ID) && this._firstAnalSexWantedID >= 0) {
		this.learnNewPassive(PASSIVE_FIRST_ANAL_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_BUTT_DESIRE_FIRST_ID) && this._recordMaxReachedButtDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_BUTT_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_BUTT_DESIRE_SECOND_ID) && this._recordMaxReachedButtDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_MAX_BUTT_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_BUTT_DESIRE_THREE_ID) && this._recordMaxReachedButtDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_MAX_BUTT_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BUTT_PETTED_COUNT_ONE_ID) && this._recordButtPettedCount >= 5) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_PEOPLE_ONE_ID) && this._recordButtPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_COUNT_TWO_ID) && this._recordButtPettedCount >= 50) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_PEOPLE_TWO_ID) && this._recordButtPettedPeople >= 30) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_COUNT_THREE_ID) && this._recordButtPettedCount >= 150) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_PEOPLE_THREE_ID) && this._recordButtPettedPeople >= 80) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_PETTED_PEOPLE_FOUR_ID) && this._recordButtPettedPeople >= 100) {
		this.learnNewPassive(PASSIVE_BUTT_PETTED_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BUTT_SPANKED_COUNT_ONE_ID) && this._recordButtSpankedCount >= 3) {
		this.learnNewPassive(PASSIVE_BUTT_SPANKED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_SPANKED_PEOPLE_ONE_ID) && this._recordButtSpankedPeople >= 10) {
		this.learnNewPassive(PASSIVE_BUTT_SPANKED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_SPANKED_COUNT_TWO_ID) && this._recordButtSpankedCount >= 25) {
		this.learnNewPassive(PASSIVE_BUTT_SPANKED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_SPANKED_PEOPLE_TWO_ID) && this._recordButtSpankedPeople >= 42) {
		this.learnNewPassive(PASSIVE_BUTT_SPANKED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUTT_SPANKED_PEOPLE_THREE_ID) && this._recordButtSpankedPeople >= 80) {
		this.learnNewPassive(PASSIVE_BUTT_SPANKED_PEOPLE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_PETTED_COUNT_ONE_ID) && this._recordAnalPettedCount >= 5) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_PEOPLE_ONE_ID) && this._recordAnalPettedPeople >= 10) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_COUNT_TWO_ID) && this._recordAnalPettedCount >= 25) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_PEOPLE_TWO_ID) && this._recordAnalPettedPeople >= 42) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_COUNT_THREE_ID) && this._recordAnalPettedCount >= 75) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_PEOPLE_THREE_ID) && this._recordAnalPettedPeople >= 125) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PETTED_COUNT_FOUR_ID) && this._recordAnalPettedCount >= 250) {
		this.learnNewPassive(PASSIVE_ANAL_PETTED_COUNT_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_SEX_COUNT_ONE_ID) && this._recordAnalFuckedCount >= 5) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_COUNT_TWO_ID) && this._recordAnalFuckedCount >= 15) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_PEOPLE_ONE_ID) && this._recordAnalFuckedPeople >= 25 && this._recordMaxReachedButtDesireCount >= 3 && this._recordMaxReachedCockDesireCount >= 3) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_COUNT_THREE_ID) && this._recordAnalFuckedCount >= 42) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_PEOPLE_TWO_ID) && this._recordAnalFuckedPeople >= 50 && this._recordMaxReachedButtDesireCount >= 5 && this._recordMaxReachedCockDesireCount >= 5) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_PEOPLE_THREE_ID) && this._recordAnalFuckedPeople >= 100 && this._recordMaxReachedButtDesireCount >= 12 && this._recordMaxReachedCockDesireCount >= 12) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_PEOPLE_FOUR_ID) && this._recordAnalFuckedPeople >= 250 && this._recordMaxReachedButtDesireCount >= 30 && this._recordMaxReachedCockDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_SEX_USAGE_ONE_ID) && this._recordAnalSexUsageCount >= 20) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_USAGE_TWO_ID) && this._recordAnalSexUsageCount >= 50) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_USAGE_THREE_ID) && this._recordAnalSexUsageCount >= 120) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_USAGE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_USAGE_FOUR_ID) && this._recordAnalSexUsageCount >= 250) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_USAGE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_PLEASURE_ONE_ID) && this._recordButtPleasure + this._recordAnalPleasure >= 2000) {
		this.learnNewPassive(PASSIVE_ANAL_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_PLEASURE_TWO_ID) && this._recordButtPleasure + this._recordAnalPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_ANAL_PLEASURE_TWO_ID)
	}
	
};

Game_Actor.prototype.checkForNewCockPassives = function() {
	if(!this.hasPassive(PASSIVE_MAX_COCK_DESIRE_FIRST_ID) && this._recordMaxReachedCockDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_COCK_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_COCK_DESIRE_SECOND_ID) && this._recordMaxReachedCockDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_MAX_COCK_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_COCK_DESIRE_THREE_ID) && this._recordMaxReachedCockDesireCount >= 25) {
		this.learnNewPassive(PASSIVE_MAX_COCK_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEE_JERKOFF_COUNT_ONE_ID) && this._recordSeeJerkOffCount >= 10) {
		this.learnNewPassive(PASSIVE_SEE_JERKOFF_COUNT_ONE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_KARRYN_STARE_COCK_ONE_ID) && ((this._recordSeeJerkOffCount + this._recordSeeEnemyTalkCockPeople * 4 >= 20) || this._firstKissWasPenis )) {
		this.learnNewPassive(PASSIVE_KARRYN_STARE_COCK_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KARRYN_STARE_COCK_TWO_ID) && this._recordCockStareUsageCount >= 5) {
		this.learnNewPassive(PASSIVE_KARRYN_STARE_COCK_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_KARRYN_STARE_COCK_THREE_ID) && this._recordCockStareUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_KARRYN_STARE_COCK_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KARRYN_STARE_COCK_FOUR_ID) && this._recordCockStareUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_KARRYN_STARE_COCK_FOUR_ID)
	}
	
};

Game_Actor.prototype.checkForNewTalkSightStripPassives = function() {
	if(!this.hasPassive(PASSIVE_TALK_COUNT_ONE_ID) && this._recordTalkedAtCount >= 10) {
		this.learnNewPassive(PASSIVE_TALK_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_COUNT_TWO_ID) && this._recordTalkedAtCount >= 100) {
		this.learnNewPassive(PASSIVE_TALK_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_PEOPLE_ONE_ID) && this._recordTalkedAtPeople >= 25 && this.slutLvl >= 10) {
		this.learnNewPassive(PASSIVE_TALK_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_PEOPLE_TWO_ID) && this._recordTalkedAtPeople >= 150 && this.slutLvl >= 42) {
		this.learnNewPassive(PASSIVE_TALK_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_PEOPLE_THREE_ID) && this._recordTalkedAtPeople >= 1000 && this.slutLvl >= 100) {
		this.learnNewPassive(PASSIVE_TALK_PEOPLE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TALK_PLEASURE_ONE_ID) && this._recordTalkPleasure >= 1000) {
		this.learnNewPassive(PASSIVE_TALK_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_PLEASURE_TWO_ID) && this._recordTalkPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_TALK_PLEASURE_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SIGHT_PEOPLE_ONE_ID) && this._recordSeenPeople >= 10 && this.charm >= VAR_ACCESSORY_CHARM_REQ_2) {
		this.learnNewPassive(PASSIVE_SIGHT_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SIGHT_PEOPLE_TWO_ID) && this._recordSeenPeople >= 50 && this.charm >= VAR_ACCESSORY_CHARM_REQ_3) {
		this.learnNewPassive(PASSIVE_SIGHT_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SIGHT_PEOPLE_THREE_ID) && this._recordSeenPeople >= 250 && this.charm >= VAR_ACCESSORY_CHARM_REQ_4) {
		this.learnNewPassive(PASSIVE_SIGHT_PEOPLE_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SIGHT_PEOPLE_FOUR_ID) && this._recordSeenPeople >= 1000 && this.charm >= VAR_ACCESSORY_CHARM_REQ_5) {
		this.learnNewPassive(PASSIVE_SIGHT_PEOPLE_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SIGHT_PLEASURE_ONE_ID) && this._recordSightPleasure >= 1000) {
		this.learnNewPassive(PASSIVE_SIGHT_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SIGHT_PLEASURE_TWO_ID) && this._recordSightPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_SIGHT_PLEASURE_TWO_ID)
	}
	
	if(this.slutLvl >= 10) {
		if(!this.hasPassive(PASSIVE_SIGHT_BOOBS_ONE_ID) && this._recordSeenBoobsCount >= 50) {
			this.learnNewPassive(PASSIVE_SIGHT_BOOBS_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_NIPPLES_ONE_ID) && this._recordSeenNipplesCount >= 50) {
			this.learnNewPassive(PASSIVE_SIGHT_NIPPLES_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_CLIT_ONE_ID) && this._recordSeenClitCount >= 50) {
			this.learnNewPassive(PASSIVE_SIGHT_CLIT_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_WETPUSSY_ONE_ID) && this._recordSeenPussyCount >= 50) {
			this.learnNewPassive(PASSIVE_SIGHT_WETPUSSY_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_BUTT_ONE_ID) && this._recordSeenButtCount >= 50) {
			this.learnNewPassive(PASSIVE_SIGHT_BUTT_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_ANALCREAMPIE_ONE_ID) && this._recordSeenAnalCreampieCount >= 25) {
			this.learnNewPassive(PASSIVE_SIGHT_ANALCREAMPIE_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_PUSSYCREAMPIE_ONE_ID) && this._recordSeenPussyCreampieCount >= 25) {
			this.learnNewPassive(PASSIVE_SIGHT_PUSSYCREAMPIE_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_BUKKAKEFACE_ONE_ID) && this._recordSeenBukkakeFaceCount >= 25) {
			this.learnNewPassive(PASSIVE_SIGHT_BUKKAKEFACE_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_BUKKAKEBOOBS_ONE_ID) && this._recordSeenBukkakeBoobsCount >= 25) {
			this.learnNewPassive(PASSIVE_SIGHT_BUKKAKEBOOBS_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_BUKKAKEBUTT_ONE_ID) && this._recordSeenBukkakeButtCount >= 25 && this._recordSeenButtCount >= 42) {
			this.learnNewPassive(PASSIVE_SIGHT_BUKKAKEBUTT_ONE_ID)
		}
		else if(!this.hasPassive(PASSIVE_SIGHT_MOUTHSWALLOW_ONE_ID) && this._recordSeenMouthSwallowCount >= 25 && this._recordSeenMouthCount >= 42) {
			this.learnNewPassive(PASSIVE_SIGHT_MOUTHSWALLOW_ONE_ID)
		}
	}
	
	if(!this.hasPassive(PASSIVE_WAITRESS_FLASH_COUNT_ONE_ID) && this._recordWaitressFlashedCount >= 3) {
		this.learnNewPassive(PASSIVE_WAITRESS_FLASH_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_WAITRESS_FLASH_COUNT_TWO_ID) && this._recordWaitressFlashedCount >= 30) {
		this.learnNewPassive(PASSIVE_WAITRESS_FLASH_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_CLOTHES_STRIPPED_ONE_ID) && this._recordClothesStrippedCount >= 10 && this.charm >= VAR_ACCESSORY_CHARM_REQ_2) {
		this.learnNewPassive(PASSIVE_CLOTHES_STRIPPED_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLOTHES_STRIPPED_TWO_ID) && this._recordClothesStrippedCount >= 42 && this.charm >= VAR_ACCESSORY_CHARM_REQ_3) {
		this.learnNewPassive(PASSIVE_CLOTHES_STRIPPED_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLOTHES_STRIPPED_THREE_ID) && this._recordClothesStrippedCount >= 120 && this.charm >= VAR_ACCESSORY_CHARM_REQ_4) {
		this.learnNewPassive(PASSIVE_CLOTHES_STRIPPED_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CLOTHES_STRIPPED_FOUR_ID) && this._recordClothesStrippedCount >= 420 && this.charm >= VAR_ACCESSORY_CHARM_REQ_5) {
		this.learnNewPassive(PASSIVE_CLOTHES_STRIPPED_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PANTIES_STRIPPED_ONE_ID) && this._recordPantiesStrippedCount >= 5 && this.slutLvl >= 10) {
		this.learnNewPassive(PASSIVE_PANTIES_STRIPPED_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PANTIES_STRIPPED_TWO_ID) && this._recordPantiesStrippedCount >= 25 && this.slutLvl >= 42) {
		this.learnNewPassive(PASSIVE_PANTIES_STRIPPED_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PANTIES_STRIPPED_THREE_ID) && this._recordPantiesStrippedCount >= 100 && this.slutLvl >= 100) {
		this.learnNewPassive(PASSIVE_PANTIES_STRIPPED_THREE_ID)
	}
};

Game_Actor.prototype.checkForNewSpecialPassives = function() {
	if(!this.hasPassive(PASSIVE_SECRET_CURIOSITY_ID)) {
		this.learnNewPassive(PASSIVE_SECRET_CURIOSITY_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_ALL_DESIRE_FIRST_ID) && this._recordMaxReachedAllDesireCount > 0) {
		this.learnNewPassive(PASSIVE_MAX_ALL_DESIRE_FIRST_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_ALL_DESIRE_SECOND_ID) && this._recordMaxReachedAllDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_MAX_ALL_DESIRE_SECOND_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_ALL_DESIRE_THREE_ID) && this._recordMaxReachedAllDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_MAX_ALL_DESIRE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_DOUBLE_PEN_COUNT_ONE_ID) && this._recordDoublePenetrationCount > 0) {
		this.learnNewPassive(PASSIVE_DOUBLE_PEN_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOUBLE_PEN_COUNT_TWO_ID) && this._recordDoublePenetrationCount >= 25 && this._firstPussySexWantedID >= 0 && this._firstAnalSexWantedID >= 0) {
		this.learnNewPassive(PASSIVE_DOUBLE_PEN_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOUBLE_PEN_COUNT_THREE_ID) && this._recordDoublePenetrationCount >= 100 && this._firstPussySexWantedID >= 0 && this._firstAnalSexWantedID >= 0) {
		this.learnNewPassive(PASSIVE_DOUBLE_PEN_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TRIPLE_PEN_COUNT_ONE_ID) && this._recordTriplePenetrationCount > 0) {
		this.learnNewPassive(PASSIVE_TRIPLE_PEN_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TRIPLE_PEN_COUNT_TWO_ID) && this._recordTriplePenetrationCount >= 15) {
		this.learnNewPassive(PASSIVE_TRIPLE_PEN_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TRIPLE_PEN_COUNT_THREE_ID) && this._recordTriplePenetrationCount >= 50) {
		this.learnNewPassive(PASSIVE_TRIPLE_PEN_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BLOWBANG_COUNT_ONE_ID) && this._recordBlowbangCount > 0) {
		this.learnNewPassive(PASSIVE_BLOWBANG_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BLOWBANG_COUNT_TWO_ID) && this._recordBlowbangCount >= 5) {
		this.learnNewPassive(PASSIVE_BLOWBANG_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BLOWBANG_COUNT_THREE_ID) && this._recordBlowbangCount >= 15) {
		this.learnNewPassive(PASSIVE_BLOWBANG_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_URINAL_COUNT_ONE_ID) && this._recordUrinalCount > 0) {
		this.learnNewPassive(PASSIVE_URINAL_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_URINAL_COUNT_TWO_ID) && this._recordUrinalCount >= 5) {
		this.learnNewPassive(PASSIVE_URINAL_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_URINAL_COUNT_THREE_ID) && this._recordUrinalCount >= 15) {
		this.learnNewPassive(PASSIVE_URINAL_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_JOB_PETTING_COUNT_ONE_ID) && this._recordPettedWhileWorkingCount >= 10) {
		this.learnNewPassive(PASSIVE_JOB_PETTING_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_JOB_PETTING_COUNT_TWO_ID) && this._recordPettedWhileWorkingCount >= 100) {
		this.learnNewPassive(PASSIVE_JOB_PETTING_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_JOB_PETTING_COUNT_THREE_ID) && this._recordPettedWhileWorkingCount >= 420) {
		this.learnNewPassive(PASSIVE_JOB_PETTING_COUNT_THREE_ID)
	}

	if(!this.hasPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_ONE_ID) && this._recordSexualPartnersVisitor >= 1) {
		this.learnNewPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_TWO_ID) && this._recordSexualPartnersVisitor >= 10) {
		this.learnNewPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_THREE_ID) && this._recordSexualPartnersVisitor >= 30) {
		this.learnNewPassive(PASSIVE_BAR_WAITRESS_SEX_COUNT_THREE_ID)
	}
	
	
};

Game_Actor.prototype.checkForNewEjaculationPassives = function() {
	if(!this.hasPassive(PASSIVE_BUKKAKE_COUNT_ONE_ID) && this._recordBukkakeTotalCount >= 3) {
		this.learnNewPassive(PASSIVE_BUKKAKE_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_ML_ONE_ID) && this._recordBukkakeTotalML >= 100) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_COUNT_TWO_ID) && this._recordBukkakeTotalCount >= 25) {
		this.learnNewPassive(PASSIVE_BUKKAKE_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_ML_TWO_ID) && this._recordBukkakeTotalML >= 500) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_ML_THREE_ID) && this._recordBukkakeTotalML >= 2000) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ML_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_ML_FOUR_ID) && this._recordBukkakeTotalML >= 5000) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ML_FOUR_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_MAX_ML_ONE_ID) && this._recordBukkakeTotalMaxML >= 100) {
		this.learnNewPassive(PASSIVE_BUKKAKE_MAX_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_MAX_ML_TWO_ID) && this._recordBukkakeTotalMaxML >= 300) {
		this.learnNewPassive(PASSIVE_BUKKAKE_MAX_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_FACE_ML_ONE_ID) && this._recordBukkakeFaceML >= 500) {
		this.learnNewPassive(PASSIVE_BUKKAKE_FACE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_BOOBS_ML_ONE_ID) && this._recordBukkakeBoobsML >= 800) {
		this.learnNewPassive(PASSIVE_BUKKAKE_BOOBS_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_BUTT_ML_ONE_ID) && this._recordBukkakeButtML >= 400) {
		this.learnNewPassive(PASSIVE_BUKKAKE_BUTT_ML_ONE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_PEOPLE_ONE_ID) && this._recordPussyCreampiePeople >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_PEOPLE_TWO_ID) && this._recordPussyCreampiePeople >= 5) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ML_ONE_ID) && this._recordPussyCreampieML >= 150) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ML_TWO_ID) && this._recordPussyCreampieML >= 750) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ML_THREE_ID) && this._recordPussyCreampieML >= 2500) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ML_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ML_FOUR_ID) && this._recordPussyCreampieML >= 10000) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ML_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_PUSSY_CREAMPIE_ML_ONE_ID) && this._recordPussyCreampieMaxML >= 50) {
		this.learnNewPassive(PASSIVE_MAX_PUSSY_CREAMPIE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_PUSSY_CREAMPIE_ML_TWO_ID) && this._recordPussyCreampieMaxML >= 150) {
		this.learnNewPassive(PASSIVE_MAX_PUSSY_CREAMPIE_ML_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_PEOPLE_ONE_ID) && this._recordAnalCreampiePeople >= 1) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_PEOPLE_TWO_ID) && this._recordAnalCreampiePeople >= 5) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ML_ONE_ID) && this._recordAnalCreampieML >= 150) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ML_TWO_ID) && this._recordAnalCreampieML >= 750) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ML_THREE_ID) && this._recordAnalCreampieML >= 2500) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ML_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ML_FOUR_ID) && this._recordAnalCreampieML >= 10000) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ML_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MAX_ANAL_CREAMPIE_ML_ONE_ID) && this._recordAnalCreampieMaxML >= 50) {
		this.learnNewPassive(PASSIVE_MAX_ANAL_CREAMPIE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MAX_ANAL_CREAMPIE_ML_TWO_ID) && this._recordAnalCreampieMaxML >= 150) {
		this.learnNewPassive(PASSIVE_MAX_ANAL_CREAMPIE_ML_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TOTAL_TOYS_INSERT_COUNT_ONE_ID) && this._recordTotalToysInsertedCount >= 1) {
		this.learnNewPassive(PASSIVE_TOTAL_TOYS_INSERT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TOTAL_TOYS_INSERT_COUNT_TWO_ID) && this._recordTotalToysInsertedCount >= 25) {
		this.learnNewPassive(PASSIVE_TOTAL_TOYS_INSERT_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PINK_ROTOR_INSERT_COUNT_ONE_ID) && this._recordClitToyInsertedCount >= 3) {
		this.learnNewPassive(PASSIVE_PINK_ROTOR_INSERT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PINK_ROTOR_INSERT_COUNT_TWO_ID) && this._recordClitToyInsertedCount >= 15) {
		this.learnNewPassive(PASSIVE_PINK_ROTOR_INSERT_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_DILDO_INSERT_COUNT_ONE_ID) && this._recordPussyToyInsertedCount >= 3) {
		this.learnNewPassive(PASSIVE_DILDO_INSERT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DILDO_INSERT_COUNT_TWO_ID) && this._recordPussyToyInsertedCount >= 15) {
		this.learnNewPassive(PASSIVE_DILDO_INSERT_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_BEADS_INSERT_COUNT_ONE_ID) && this._recordAnalToyInsertedCount >= 3) {
		this.learnNewPassive(PASSIVE_ANAL_BEADS_INSERT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_BEADS_INSERT_COUNT_TWO_ID) && this._recordAnalToyInsertedCount >= 15) {
		this.learnNewPassive(PASSIVE_ANAL_BEADS_INSERT_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TOYS_PLEASURE_ONE_ID) && this._recordToysPleasure >= 1000) {
		this.learnNewPassive(PASSIVE_TOYS_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TOYS_PLEASURE_TWO_ID) && this._recordToysPleasure >= 10000) {
		this.learnNewPassive(PASSIVE_TOYS_PLEASURE_TWO_ID)
	}
};

Game_Actor.prototype.checkForNewSadoMasoPassives = function() {
	if(!this.hasPassive(PASSIVE_SUBDUED_COUNT_ONE_ID) && this._recordSubduedTotal >= 25) {
		this.learnNewPassive(PASSIVE_SUBDUED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SUBDUED_COUNT_TWO_ID) && this._recordSubduedTotal >= 100) {
		this.learnNewPassive(PASSIVE_SUBDUED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SUBDUED_COUNT_THREE_ID) && this._recordSubduedTotal >= 150 && this.charm >= VAR_ACCESSORY_CHARM_REQ_3) {
		this.learnNewPassive(PASSIVE_SUBDUED_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_COCKINESS_COUNT_ONE_ID) && this._recordCockinessMaxedCount >= 1) {
		this.learnNewPassive(PASSIVE_COCKINESS_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCKINESS_COUNT_TWO_ID) && this._recordCockinessGainedValue >= 300) {
		this.learnNewPassive(PASSIVE_COCKINESS_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCKINESS_COUNT_THREE_ID) && this._recordCockinessGainedValue >= 1000) {
		this.learnNewPassive(PASSIVE_COCKINESS_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCKINESS_COUNT_FOUR_ID) && this._recordCockinessGainedValue >= 3000) {
		this.learnNewPassive(PASSIVE_COCKINESS_COUNT_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TAUNT_COUNT_ONE_ID) && this._recordTauntCount >= 10 && this._recordTauntPeople >= 30 && this._recordSubduedTotal >= 75) {
		this.learnNewPassive(PASSIVE_TAUNT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TAUNT_COUNT_TWO_ID) && this._recordTauntCount >= 25 && this._recordTauntPeople >= 69 && this._recordCockinessGainedValue >= 500) {
		this.learnNewPassive(PASSIVE_TAUNT_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_TAUNT_COUNT_THREE_ID) && this._recordTauntCount >= 69 && this._recordTauntPeople >= 200 && this._recordCockinessGainedValue >= 2000) {
		this.learnNewPassive(PASSIVE_TAUNT_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_FLAUNT_COUNT_ONE_ID) && this._recordFlauntCount >= 10 && this._recordFlauntPeople >= 30 && this._recordCockinessGainedValue >= 200) {
		this.learnNewPassive(PASSIVE_FLAUNT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_FLAUNT_COUNT_TWO_ID) && this._recordFlauntCount >= 25 && this._recordFlauntPeople >= 69 && this._recordCockinessGainedValue >= 400) {
		this.learnNewPassive(PASSIVE_FLAUNT_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_FLAUNT_COUNT_THREE_ID) && this._recordFlauntCount >= 69 && this._recordFlauntPeople >= 200 && this._recordCockinessGainedValue >= 1700) {
		this.learnNewPassive(PASSIVE_FLAUNT_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SUBDUED_ERECT_COUNT_ONE_ID) && this._recordSubduedErectEnemiesWithAttack >= 30) {
		this.learnNewPassive(PASSIVE_SUBDUED_ERECT_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SUBDUED_ERECT_COUNT_TWO_ID) && this._recordSubduedErectEnemiesWithAttack >= 100) {
		this.learnNewPassive(PASSIVE_SUBDUED_ERECT_COUNT_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_COCKKICK_COUNT_ONE_ID) && this._recordCockKickUsageCount >= 15 && this._recordCockinessMaxedCount >= 1) {
		this.learnNewPassive(PASSIVE_COCKKICK_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCKKICK_COUNT_TWO_ID) && this._recordCockKickUsageCount >= 50 && this._recordCockinessGainedValue >= 500) {
		this.learnNewPassive(PASSIVE_COCKKICK_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_COCKKICK_COUNT_THREE_ID) && this._recordCockKickUsageCount >= 150 && this._recordCockinessGainedValue >= 2500) {
		this.learnNewPassive(PASSIVE_COCKKICK_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_RIMJOB_COUNT_ONE_ID) && this._recordRimjobCount >= 1) {
		this.learnNewPassive(PASSIVE_RIMJOB_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_RIMJOB_PEOPLE_ONE_ID) && this._recordRimjobPeople >= 5) {
		this.learnNewPassive(PASSIVE_RIMJOB_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_RIMJOB_COUNT_TWO_ID) && this._recordRimjobCount >= 25) {
		this.learnNewPassive(PASSIVE_RIMJOB_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_RIMJOB_PEOPLE_TWO_ID) && this._recordRimjobPeople >= 50) {
		this.learnNewPassive(PASSIVE_RIMJOB_PEOPLE_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_RIMJOB_USAGE_ONE_ID) && this._recordRimjobUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_RIMJOB_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_RIMJOB_USAGE_TWO_ID) && this._recordRimjobUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_RIMJOB_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_RIMJOB_USAGE_THREE_ID) && this._recordRimjobUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_RIMJOB_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_FOOTJOB_COUNT_ONE_ID) && this._recordFootjobCount >= 1) {
		this.learnNewPassive(PASSIVE_FOOTJOB_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_FOOTJOB_PEOPLE_ONE_ID) && this._recordFootjobPeople >= 5) {
		this.learnNewPassive(PASSIVE_FOOTJOB_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_FOOTJOB_COUNT_TWO_ID) && this._recordFootjobCount >= 25) {
		this.learnNewPassive(PASSIVE_FOOTJOB_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_FOOTJOB_PEOPLE_TWO_ID) && this._recordFootjobPeople >= 50) {
		this.learnNewPassive(PASSIVE_FOOTJOB_PEOPLE_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_FOOTJOB_USAGE_ONE_ID) && this._recordFootjobUsageCount >= 15) {
		this.learnNewPassive(PASSIVE_FOOTJOB_USAGE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_FOOTJOB_USAGE_TWO_ID) && this._recordFootjobUsageCount >= 42) {
		this.learnNewPassive(PASSIVE_FOOTJOB_USAGE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_FOOTJOB_USAGE_THREE_ID) && this._recordFootjobUsageCount >= 100) {
		this.learnNewPassive(PASSIVE_FOOTJOB_USAGE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SADISM_PLEASURE_ONE_ID) && this._recordSadismPleasure >= 2000) {
		this.learnNewPassive(PASSIVE_SADISM_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SADISM_PLEASURE_TWO_ID) && this._recordSadismPleasure >= 25000) {
		this.learnNewPassive(PASSIVE_SADISM_PLEASURE_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_DEFEATED_COUNT_ONE_ID) && this._recordDefeatedTotal >= 3) {
		this.learnNewPassive(PASSIVE_DEFEATED_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DEFEATED_COUNT_TWO_ID) && this._recordDefeatedTotal >= 8) {
		this.learnNewPassive(PASSIVE_DEFEATED_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_DEFEATED_COUNT_THREE_ID) && this._recordDefeatedTotal >= 20) {
		this.learnNewPassive(PASSIVE_DEFEATED_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DEFEATED_COUNT_FOUR_ID) && this._recordDefeatedTotal >= 42) {
		this.learnNewPassive(PASSIVE_DEFEATED_COUNT_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_DOGEZA_COUNT_ONE_ID) && this._recordDogezaCount >= 5 && this._recordDogezaPeople >= 12) {
		this.learnNewPassive(PASSIVE_DOGEZA_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOGEZA_COUNT_TWO_ID) && this._recordDogezaCount >= 15 && this._recordCockinessGainedValue >= 420 && this._recordDogezaPeople >= 42) {
		this.learnNewPassive(PASSIVE_DOGEZA_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOGEZA_COUNT_THREE_ID) && this._recordDogezaCount >= 42 && this._recordCockinessGainedValue >= 690 && this._recordDogezaPeople >= 125) {
		this.learnNewPassive(PASSIVE_DOGEZA_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MASOCHISM_PLEASURE_ONE_ID) && this._recordMasochismPleasure >= 2000) {
		this.learnNewPassive(PASSIVE_MASOCHISM_PLEASURE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MASOCHISM_PLEASURE_TWO_ID) && this._recordMasochismPleasure >= 25000) {
		this.learnNewPassive(PASSIVE_MASOCHISM_PLEASURE_TWO_ID)
	}
};

Game_Actor.prototype.checkForNewOrgasmPassives = function() {
	if(!this.hasPassive(PASSIVE_ORGASM_DOUBLE_ID) && this._recordMaxConsecutiveOrgasmCount >= 2) {
		this.learnNewPassive(PASSIVE_ORGASM_DOUBLE_ID)
	}
	if(!this.hasPassive(PASSIVE_ORGASM_TRIPLE_ID) && this._recordMaxConsecutiveOrgasmCount >= 3) {
		this.learnNewPassive(PASSIVE_ORGASM_TRIPLE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ORGASM_COUNT_ONE_ID) && this._recordOrgasmCount > 0) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_TWO_ID) && this._recordOrgasmCount >= 7) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_THREE_ID) && this._recordOrgasmCount >= 20) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_FOUR_ID) && this._recordOrgasmCount >= 42) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_FOUR_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_FIVE_ID) && this._recordOrgasmCount >= 69) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_FIVE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_SIX_ID) && this._recordOrgasmCount >= 123) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_SIX_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_COUNT_SEVEN_ID) && this._recordOrgasmCount >= 250) {
		this.learnNewPassive(PASSIVE_ORGASM_COUNT_SEVEN_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_ML_ONE_ID) && this._recordOrgasmML >= 150) {
		this.learnNewPassive(PASSIVE_ORGASM_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_ML_TWO_ID) && this._recordOrgasmML >= 750) {
		this.learnNewPassive(PASSIVE_ORGASM_ML_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_PEOPLE_ONE_ID) && this._recordOrgasmPresencePeople >= 50) {
		this.learnNewPassive(PASSIVE_ORGASM_PEOPLE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ORGASM_PEOPLE_TWO_ID) && this._recordOrgasmPresencePeople >= 500) {
		this.learnNewPassive(PASSIVE_ORGASM_PEOPLE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_JUICE_ML_ONE_ID) && this._recordPussyDripTenthML >= 10000) {
		this.learnNewPassive(PASSIVE_PUSSY_JUICE_ML_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_JUICE_ML_TWO_ID) && this._recordPussyDripTenthML >= 200000) {
		this.learnNewPassive(PASSIVE_PUSSY_JUICE_ML_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_KISS_ORGASM_ONE_ID) && this._recordOrgasmFromKissCount >= 1) {
		this.learnNewPassive(PASSIVE_KISS_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_KISS_ORGASM_TWO_ID) && this._recordOrgasmFromKissCount >= 10) {
		this.learnNewPassive(PASSIVE_KISS_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_BUKKAKE_ORGASM_ONE_ID) && this._recordOrgasmFromBukkakeCount >= 1) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BUKKAKE_ORGASM_TWO_ID) && this._recordOrgasmFromBukkakeCount >= 10) {
		this.learnNewPassive(PASSIVE_BUKKAKE_ORGASM_TWO_ID)
	}

	if(!this.hasPassive(PASSIVE_HJ_ORGASM_ONE_ID) && this._recordOrgasmFromHandjobCount >= 1) {
		this.learnNewPassive(PASSIVE_HJ_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HJ_ORGASM_TWO_ID) && this._recordOrgasmFromHandjobCount >= 10) {
		this.learnNewPassive(PASSIVE_HJ_ORGASM_TWO_ID)
	}

	if(!this.hasPassive(PASSIVE_BJ_ORGASM_ONE_ID) && this._recordOrgasmFromBlowjobCount >= 1) {
		this.learnNewPassive(PASSIVE_BJ_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_BJ_ORGASM_TWO_ID) && this._recordOrgasmFromBlowjobCount >= 10) {
		this.learnNewPassive(PASSIVE_BJ_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TITTYFUCK_ORGASM_ONE_ID) && this._recordOrgasmFromTittyFuckCount >= 1) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TITTYFUCK_ORGASM_TWO_ID) && this._recordOrgasmFromTittyFuckCount >= 10) {
		this.learnNewPassive(PASSIVE_TITTYFUCK_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_CUNNILINGUS_ORGASM_ONE_ID) && this._recordOrgasmFromCunnilingusCount >= 1) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_CUNNILINGUS_ORGASM_TWO_ID) && this._recordOrgasmFromCunnilingusCount >= 10) {
		this.learnNewPassive(PASSIVE_CUNNILINGUS_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_SEX_ORGASM_ONE_ID) && this._recordOrgasmFromPussySexCount >= 5) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_SEX_ORGASM_TWO_ID) && this._recordOrgasmFromPussySexCount >= 25) {
		this.learnNewPassive(PASSIVE_PUSSY_SEX_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ORGASM_ONE_ID) && this._recordOrgasmFromPussyCreampieCount >= 1) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PUSSY_CREAMPIE_ORGASM_TWO_ID) && this._recordOrgasmFromPussyCreampieCount >= 10) {
		this.learnNewPassive(PASSIVE_PUSSY_CREAMPIE_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_SEX_ORGASM_ONE_ID) && this._recordOrgasmFromAnalSexCount >= 4) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_SEX_ORGASM_TWO_ID) && this._recordOrgasmFromAnalSexCount >= 20) {
		this.learnNewPassive(PASSIVE_ANAL_SEX_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ORGASM_ONE_ID) && this._recordOrgasmFromAnalCreampieCount >= 1) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_ANAL_CREAMPIE_ORGASM_TWO_ID) && this._recordOrgasmFromAnalCreampieCount >= 10) {
		this.learnNewPassive(PASSIVE_ANAL_CREAMPIE_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SWALLOW_ORGASM_ONE_ID) && this._recordOrgasmFromCumSwallowCount >= 1) {
		this.learnNewPassive(PASSIVE_SWALLOW_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SWALLOW_ORGASM_TWO_ID) && this._recordOrgasmFromCumSwallowCount >= 10) {
		this.learnNewPassive(PASSIVE_SWALLOW_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TALK_ORGASM_ONE_ID) && this._recordOrgasmFromTalkCount >= 1) {
		this.learnNewPassive(PASSIVE_TALK_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TALK_ORGASM_TWO_ID) && this._recordOrgasmFromTalkCount >= 10) {
		this.learnNewPassive(PASSIVE_TALK_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SIGHT_ORGASM_ONE_ID) && this._recordOrgasmFromSightCount >= 1) {
		this.learnNewPassive(PASSIVE_SIGHT_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SIGHT_ORGASM_TWO_ID) && this._recordOrgasmFromSightCount >= 10) {
		this.learnNewPassive(PASSIVE_SIGHT_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_TOYS_ORGASM_ONE_ID) && this._recordOrgasmFromToysCount >= 1) {
		this.learnNewPassive(PASSIVE_TOYS_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_TOYS_ORGASM_TWO_ID) && this._recordOrgasmFromToysCount >= 10) {
		this.learnNewPassive(PASSIVE_TOYS_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_PETTING_ORGASM_ONE_ID) && this._recordOrgasmFromPettingCount >= 4) {
		this.learnNewPassive(PASSIVE_PETTING_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_PETTING_ORGASM_TWO_ID) && this._recordOrgasmFromPettingCount >= 30) {
		this.learnNewPassive(PASSIVE_PETTING_ORGASM_TWO_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SADISM_ORGASM_ONE_ID) && this._recordOrgasmFromSadismCount >= 1) {
		this.learnNewPassive(PASSIVE_SADISM_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SADISM_ORGASM_TWO_ID) && this._recordOrgasmFromSadismCount >= 8) {
		this.learnNewPassive(PASSIVE_SADISM_ORGASM_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SADISM_ORGASM_THREE_ID) && this._recordOrgasmFromSadismCount >= 20) {
		this.learnNewPassive(PASSIVE_SADISM_ORGASM_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_MASOCHISM_ORGASM_ONE_ID) && this._recordOrgasmFromMasochismCount >= 1) {
		this.learnNewPassive(PASSIVE_MASOCHISM_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_MASOCHISM_ORGASM_TWO_ID) && this._recordOrgasmFromMasochismCount >= 8) {
		this.learnNewPassive(PASSIVE_MASOCHISM_ORGASM_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_MASOCHISM_ORGASM_THREE_ID) && this._recordOrgasmFromMasochismCount >= 20) {
		this.learnNewPassive(PASSIVE_MASOCHISM_ORGASM_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SPANKING_ORGASM_ONE_ID) && this._recordOrgasmFromSpankingCount >= 2) {
		this.learnNewPassive(PASSIVE_SPANKING_ORGASM_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SPANKING_ORGASM_TWO_ID) && this._recordOrgasmFromSpankingCount >= 15) {
		this.learnNewPassive(PASSIVE_SPANKING_ORGASM_TWO_ID)
	}
	
	
};
Game_Actor.prototype.checkForNewDebuffPassives = function() {
	if(!this.hasPassive(PASSIVE_HORNY_COUNT_ONE_ID) && this._recordHornyCount >= 1) {
		this.learnNewPassive(PASSIVE_HORNY_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HORNY_COUNT_TWO_ID) && this._recordHornyCount >= 15) {
		this.learnNewPassive(PASSIVE_HORNY_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_HORNY_COUNT_THREE_ID) && this._recordHornyCount >= 75) {
		this.learnNewPassive(PASSIVE_HORNY_COUNT_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_HORNY_COUNT_FOUR_ID) && this._recordHornyCount >= 150) {
		this.learnNewPassive(PASSIVE_HORNY_COUNT_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_OFFBALANCE_COUNT_ONE_ID) && this._recordDebuffOffBalancedCount >= 10 && this._recordDefeatedTotal >= 1) {
		this.learnNewPassive(PASSIVE_OFFBALANCE_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_OFFBALANCE_COUNT_TWO_ID) && this._recordDebuffOffBalancedCount >= 20 && this._recordDefeatedTotal >= 3) {
		this.learnNewPassive(PASSIVE_OFFBALANCE_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_OFFBALANCE_COUNT_THREE_ID) && this._recordDebuffOffBalancedCount >= 42 && this._recordDefeatedTotal >= 10) {
		this.learnNewPassive(PASSIVE_OFFBALANCE_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_FALLEN_COUNT_ONE_ID) && this._recordDebuffFallenCount >= 3) {
		this.learnNewPassive(PASSIVE_FALLEN_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_FALLEN_COUNT_TWO_ID) && this._recordDebuffFallenCount >= 12) {
		this.learnNewPassive(PASSIVE_FALLEN_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_FALLEN_COUNT_THREE_ID) && this._recordDebuffFallenCount >= 30) {
		this.learnNewPassive(PASSIVE_FALLEN_COUNT_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_DOWNSTAMINA_COUNT_ONE_ID) && this._recordDebuffDownStaminaCount >= 12) {
		this.learnNewPassive(PASSIVE_DOWNSTAMINA_COUNT_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOWNSTAMINA_COUNT_TWO_ID) && this._recordDebuffDownStaminaCount >= 30 && this._recordDefeatedTotal >= 3) {
		this.learnNewPassive(PASSIVE_DOWNSTAMINA_COUNT_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_DOWNSTAMINA_COUNT_THREE_ID) && this._recordDebuffDownStaminaCount >= 100 && this._recordDefeatedTotal >= 10) {
		this.learnNewPassive(PASSIVE_DOWNSTAMINA_COUNT_THREE_ID)
	}


};


Game_Actor.prototype.checkForNewSexualPartnersPassives = function() {
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_ONE_ID) && this._recordSexualPartnersTotal >= 10 && this._recordMaxReachedAllDesireCount >= 1) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID) && this._recordSexualPartnersTotal >= 30 && this._recordMaxReachedAllDesireCount >= 4) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_THREE_ID) && this._recordSexualPartnersTotal >= 100 && this._recordMaxReachedAllDesireCount >= 10) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID) && this._recordSexualPartnersTotal >= 300 && this._recordMaxReachedAllDesireCount >= 30) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FOUR_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FIVE_ID) && this._recordSexualPartnersTotal >= 1000 && this._recordMaxReachedAllDesireCount >= 50) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_TOTAL_FIVE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_VIRGINS_TOTAL_ONE_ID) && this._recordVirginitiesTakenTotal >= 3) {
		this.learnNewPassive(PASSIVE_VIRGINS_TOTAL_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_VIRGINS_TOTAL_TWO_ID) && this._recordVirginitiesTakenTotal >= 10) {
		this.learnNewPassive(PASSIVE_VIRGINS_TOTAL_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_VIRGINS_TOTAL_THREE_ID) && this._recordVirginitiesTakenTotal >= 30) {
		this.learnNewPassive(PASSIVE_VIRGINS_TOTAL_THREE_ID)
	}
	else if(!this.hasPassive(PASSIVE_VIRGINS_TOTAL_FOUR_ID) && this._recordVirginitiesTakenTotal >= 100) {
		this.learnNewPassive(PASSIVE_VIRGINS_TOTAL_FOUR_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_ONE_ID) && this._recordSexualPartnersGoblin >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_TWO_ID) && this._recordSexualPartnersGoblin >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_THREE_ID) && this._recordSexualPartnersGoblin >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GOBLIN_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_ONE_ID) && this._recordSexualPartnersThug >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_THUG_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_TWO_ID) && this._recordSexualPartnersThug >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_THUG_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_THUG_THREE_ID) && this._recordSexualPartnersThug >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_THUG_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID) && this._recordSexualPartnersGuard >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID) && this._recordSexualPartnersGuard >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID) && this._recordSexualPartnersGuard >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_GUARD_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_ONE_ID) && this._recordSexualPartnersNerd >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_NERD_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_TWO_ID) && this._recordSexualPartnersNerd >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_NERD_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_NERD_THREE_ID) && this._recordSexualPartnersNerd >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_NERD_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_ONE_ID) && this._recordSexualPartnersRogue >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_TWO_ID) && this._recordSexualPartnersRogue >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_THREE_ID) && this._recordSexualPartnersRogue >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_ROGUE_THREE_ID)
	}
	
	if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_ONE_ID) && this._recordSexualPartnersSlime >= 5) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_ONE_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_TWO_ID) && this._recordSexualPartnersSlime >= 20) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_TWO_ID)
	}
	else if(!this.hasPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_THREE_ID) && this._recordSexualPartnersSlime >= 100) {
		this.learnNewPassive(PASSIVE_SEXUAL_PARTNERS_SLIME_THREE_ID)
	}
};