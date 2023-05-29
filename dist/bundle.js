/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AudioPlayer.ts":
/*!****************************!*\
  !*** ./src/AudioPlayer.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioPlayer = void 0;
var AudioPlayer;
(function (AudioPlayer) {
    AudioPlayer.BASE_PATH = "./dist/assets/audio";
    let audioPlayerElement;
    function getAudioPlayerElement() {
        if (!audioPlayerElement) {
            audioPlayerElement = document.createElement("audio");
            document.body.appendChild(audioPlayerElement);
        }
        return audioPlayerElement;
    }
    AudioPlayer.getAudioPlayerElement = getAudioPlayerElement;
    function getAudioPath(folder, name) {
        return `${AudioPlayer.BASE_PATH}/${folder}/${name}.mp3`;
    }
    AudioPlayer.getAudioPath = getAudioPath;
    function playAudiosInSequence(...paths) {
        return __awaiter(this, void 0, void 0, function* () {
            let seqItem = 0;
            const audioPlayer = getAudioPlayerElement();
            audioPlayer.src = paths[seqItem++];
            audioPlayer.load();
            audioPlayer.oncanplay = () => {
                audioPlayer.play();
            };
            return new Promise((res, rej) => {
                audioPlayer.onerror = rej;
                audioPlayer.onended = () => {
                    if (seqItem == paths.length)
                        return res();
                    audioPlayer.src = paths[seqItem++];
                };
            });
        });
    }
    AudioPlayer.playAudiosInSequence = playAudiosInSequence;
})(AudioPlayer = exports.AudioPlayer || (exports.AudioPlayer = {}));


/***/ }),

/***/ "./src/ChemicalCompounds.ts":
/*!**********************************!*\
  !*** ./src/ChemicalCompounds.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getPolyatomic = exports.POLYATOMICS = exports.CovalentCompound = exports.IonicCompound = exports.Bondable = exports.SUBSCRIPT_TO_NUM = exports.QUANTITY_SUBSCRIPTS = void 0;
const Nomenclature_1 = __webpack_require__(/*! ./Nomenclature */ "./src/Nomenclature.ts");
const Elements_1 = __webpack_require__(/*! ./Elements */ "./src/Elements.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Util.ts");
exports.QUANTITY_SUBSCRIPTS = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    10: "₁₀"
};
exports.SUBSCRIPT_TO_NUM = (0, Util_1.swapObj)(exports.QUANTITY_SUBSCRIPTS);
class Bondable {
    constructor(elements, charge, name) {
        this.elements = elements;
        this.charge = charge;
        this._name = name;
    }
    get chemicalFormula() {
        let result = "";
        this.elements.forEach(el => result += el.element.symbol + (el.quantity != 1 ? exports.QUANTITY_SUBSCRIPTS[el.quantity] : ""));
        return result;
    }
    get name() {
        if (this.elements.length == 1)
            return this.elements[0].element.name;
        return this._name;
    }
    get singletonElement() {
        return this.elements[0].element;
    }
    get actsLikeMetal() {
        return this.charge > 0;
    }
    isSingleton(strict = false) {
        return this.elements.length == 1 && (strict ? this.elements[0].quantity == 1 : true);
    }
    getCovalentName(mono = false, suffixed = false, index = 0) {
        if (this.isSingleton()) {
            const quantifiedElement = this.elements[index];
            let prefix = "";
            let elementName = suffixed ? Nomenclature_1.Nomenclature.ELEMENT_TO_ANION[quantifiedElement.element.name] : quantifiedElement.element.name;
            if (quantifiedElement.quantity == 1) {
                prefix = mono ? Nomenclature_1.Nomenclature.PREFIX_MAP[1] : "";
            }
            else {
                prefix = Nomenclature_1.Nomenclature.PREFIX_MAP[quantifiedElement.quantity] || "";
            }
            if (elementName.startsWith("o") || elementName.startsWith("a")) {
                return prefix.substring(0, prefix.length - 2) + elementName;
            }
            else {
                return prefix + elementName;
            }
        }
        else {
            return this._name;
        }
    }
    static fromElement(element, quantity = 1, charge) {
        return new Bondable([{ element, quantity }], charge ? charge : (element.charges.length == 1 ? element.charges[0] : element.charges[element.charges.length - 1]));
    }
}
exports.Bondable = Bondable;
class ChemicalCompound {
    constructor(bondable1, bondable2, name) {
        this.bondable1 = bondable1;
        this.bondable2 = bondable2;
        this._name = name;
    }
    get name() {
        if (this._name)
            return this._name;
        let result = "";
        return result;
    }
    get chemicalFormula() {
        return this.bondable1.chemicalFormula + this.bondable2.chemicalFormula;
    }
}
class IonicCompound extends ChemicalCompound {
    constructor(metal, nonmetal) {
        super(metal, nonmetal);
    }
    get name() {
        const anionEnding = Nomenclature_1.Nomenclature.ELEMENT_TO_ANION[this.nonmetal.singletonElement.name] || this.nonmetal.singletonElement.name;
        return `${this.metal.singletonElement.name} ${anionEnding}`;
    }
    get metal() {
        return this.bondable1;
    }
    ;
    get nonmetal() {
        return this.bondable2;
    }
    ;
}
exports.IonicCompound = IonicCompound;
class CovalentCompound extends ChemicalCompound {
    constructor(nonmetal1, nonmetal2) {
        super(nonmetal1, nonmetal2);
    }
    get name() {
        return `${this.nonmetal1.getCovalentName()} ${this.nonmetal2.getCovalentName(true, true)}`;
    }
    get nonmetal1() {
        return this.bondable1;
    }
    get nonmetal2() {
        return this.bondable2;
    }
}
exports.CovalentCompound = CovalentCompound;
exports.POLYATOMICS = {
    "NITRATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "NITRATE"),
    "NITRITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -1, "NITRITE"),
    "CHROMATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHROMIUM, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -2, "CHROMATE"),
    "DICHROMATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHROMIUM, "quantity": 2 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 7 }
    ], -2, "DICHROMATE"),
    "CYANIDE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 }
    ], -1, "CYANIDE"),
    "THIOCYANATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 }
    ], -1, "THIOCYANATE"),
    "PERMANGANATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.MANGANESE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "PERMANGANATE"),
    "HYDROXIDE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 1 }
    ], -1, "HYDROXIDE"),
    "PEROXIDE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -2, "PEROXIDE"),
    "AMIDE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 2 }
    ], -1, "AMIDE"),
    "SULFATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -2, "SULFATE"),
    "SULFITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -2, "SULFITE"),
    "PHOSPHATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -3, "PHOSPHATE"),
    "PHOSPHITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -3, "PHOSPHITE"),
    "HYDROGEN PHOSPHATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -2, "HYDROGEN PHOSPHATE"),
    "DIHYDROGEN PHOSPHATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 2 },
        { "element": Elements_1.PERIODIC_TABLE.PHOSPHORUS, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "DIHYDROGEN PHOSPHATE"),
    "ACETATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CARBON, "quantity": 2 },
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 3 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -1, "ACETATE"),
    "PERCHLORATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "PERCHLORATE"),
    "CHLORATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "CHLORATE"),
    "CHLORITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -1, "CHLORITE"),
    "HYPOCHLORITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CHLORINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 1 }
    ], -1, "HYPOCHLORITE"),
    "PERIODATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "PERIODATE"),
    "IODATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "IODATE"),
    "IODITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -1, "IODITE"),
    "HYPOIODITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.IODINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 1 }
    ], -1, "HYPOIODITE"),
    "PERBROMATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "PERBROMATE"),
    "BROMATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "BROMATE"),
    "BROMITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 2 }
    ], -1, "BROMITE"),
    "HYPOBROMITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.BROMINE, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 1 }
    ], -1, "HYPOBROMITE"),
    "CARBONATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -2, "CARBONATE"),
    "HYDROGEN CARBONATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.CARBON, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "HYDROGEN CARBONATE"),
    "HYDROGEN SULFATE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 4 }
    ], -1, "HYDROGEN SULFATE"),
    "HYDROGEN SULFITE": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.SULFUR, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.OXYGEN, "quantity": 3 }
    ], -1, "HYDROGEN SULFITE"),
    // "HYDROGEN SULFIDE": new Bondable([
    //     { "element": PERIODIC_TABLE.HYDROGEN, "quantity": 1 },
    //     { "element": PERIODIC_TABLE.SULFUR, "quantity": 1 }], -1, "HYDROGEN SULFIDE"),
    "AMMONIUM": new Bondable([
        { "element": Elements_1.PERIODIC_TABLE.NITROGEN, "quantity": 1 },
        { "element": Elements_1.PERIODIC_TABLE.HYDROGEN, "quantity": 4 }
    ], 1, "AMMONIUM")
};
function getPolyatomic(quantifiedElement) {
    const polyatomics = Object.values(exports.POLYATOMICS);
    return polyatomics.find(pa => {
        let equals = true;
        if (pa.elements.length == quantifiedElement.length) {
            for (let i = 0; i < quantifiedElement.length; i++) {
                equals && (equals = (0, Elements_1.compareQuantifiedElements)(pa.elements[i], quantifiedElement[i]));
            }
            return equals;
        }
        else {
            return false;
        }
    }) || null;
}
exports.getPolyatomic = getPolyatomic;


/***/ }),

/***/ "./src/Elements.ts":
/*!*************************!*\
  !*** ./src/Elements.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineSuffix = exports.getFromSymbol = exports.compareQuantifiedElements = exports.compareElements = exports.HOFBrINClS = exports.NONMETALS = exports.NOBLE_GASES = exports.BONDABLE_NONMETALS = exports.METALS = exports.PERIODIC_TABLE = void 0;
const Nomenclature_1 = __webpack_require__(/*! ./Nomenclature */ "./src/Nomenclature.ts");
exports.PERIODIC_TABLE = {
    HYDROGEN: { name: "HYDROGEN", number: 1, pos: [1, 1], charges: [1, -1], metal: false, symbol: "H" },
    HELIUM: { name: "HELIUM", number: 2, pos: [18, 1], charges: [], metal: false, symbol: "He" },
    LITHIUM: { name: "LITHIUM", number: 3, pos: [1, 2], charges: [1], metal: true, symbol: "Li" },
    BERYLLIUM: { name: "BERYLLIUM", number: 4, pos: [2, 2], charges: [2], metal: true, symbol: "Be" },
    BORON: { name: "BORON", number: 5, pos: [13, 2], charges: [3], metal: true, symbol: "B" },
    CARBON: { name: "CARBON", number: 6, pos: [14, 2], charges: [4, -4], metal: false, symbol: "C" },
    NITROGEN: { name: "NITROGEN", number: 7, pos: [15, 2], charges: [-3], metal: false, symbol: "N" },
    OXYGEN: { name: "OXYGEN", number: 8, pos: [16, 2], charges: [-2], metal: false, symbol: "O" },
    FLUORINE: { name: "FLUORINE", number: 9, pos: [17, 2], charges: [-1], metal: false, symbol: "F" },
    NEON: { name: "NEON", number: 10, pos: [18, 2], charges: [], metal: false, symbol: "Ne" },
    SODIUM: { name: "SODIUM", number: 11, pos: [1, 3], charges: [1], metal: true, symbol: "Na" },
    MAGNESIUM: { name: "MAGNESIUM", number: 12, pos: [2, 3], charges: [2], metal: true, symbol: "Mg" },
    ALUMINIUM: { name: "ALUMINIUM", number: 13, pos: [13, 3], charges: [3], metal: true, symbol: "Al" },
    SILICON: { name: "SILICON", number: 14, pos: [14, 3], charges: [4, -4], metal: true, symbol: "Si" },
    PHOSPHORUS: { name: "PHOSPHORUS", number: 15, pos: [15, 3], charges: [-3], metal: false, symbol: "P" },
    SULFUR: { name: "SULFUR", number: 16, pos: [16, 3], charges: [-2], metal: false, symbol: "S" },
    CHLORINE: { name: "CHLORINE", number: 17, pos: [17, 3], charges: [-1], metal: false, symbol: "Cl" },
    ARGON: { name: "ARGON", number: 18, pos: [18, 3], charges: [], metal: false, symbol: "Ar" },
    POTASSIUM: { name: "POTASSIUM", number: 19, pos: [1, 4], charges: [1], metal: true, symbol: "K" },
    CALCIUM: { name: "CALCIUM", number: 20, pos: [2, 4], charges: [2], metal: true, symbol: "Ca" },
    SCANDIUM: { name: "SCANDIUM", number: 21, pos: [3, 4], charges: [3], metal: true, symbol: "Sc" },
    TITANIUM: { name: "TITANIUM", number: 22, pos: [4, 4], charges: [4], metal: true, symbol: "Ti" },
    VANADIUM: { name: "VANADIUM", number: 23, pos: [5, 4], charges: [5], metal: true, symbol: "V" },
    CHROMIUM: { name: "CHROMIUM", number: 24, pos: [6, 4], charges: [3, 6], metal: true, symbol: "Cr" },
    MANGANESE: { name: "MANGANESE", number: 25, pos: [7, 4], charges: [2, 4, 7], metal: true, symbol: "Mn" },
    IRON: { name: "IRON", number: 26, pos: [8, 4], charges: [2, 3], metal: true, symbol: "Fe" },
    COBALT: { name: "COBALT", number: 27, pos: [9, 4], charges: [2, 3], metal: true, symbol: "Co" },
    NICKEL: { name: "NICKEL", number: 28, pos: [10, 4], charges: [2], metal: true, symbol: "Ni" },
    COPPER: { name: "COPPER", number: 29, pos: [11, 4], charges: [2], metal: true, symbol: "Cu" },
    ZINC: { name: "ZINC", number: 30, pos: [12, 4], charges: [2], metal: true, symbol: "Zn" },
    GALLIUM: { name: "GALLIUM", number: 31, pos: [13, 4], charges: [3], metal: true, symbol: "Ga" },
    GERMANIUM: { name: "GERMANIUM", number: 32, pos: [14, 4], charges: [4, -4], metal: true, symbol: "Ge" },
    ARSENIC: { name: "ARSENIC", number: 33, pos: [15, 4], charges: [-3], metal: true, symbol: "As" },
    SELENIUM: { name: "SELENIUM", number: 34, pos: [16, 4], charges: [-2], metal: false, symbol: "Se" },
    BROMINE: { name: "BROMINE", number: 35, pos: [17, 4], charges: [-1], metal: false, symbol: "Br" },
    KRYPTON: { name: "KRYPTON", number: 36, pos: [18, 4], charges: [], metal: false, symbol: "Kr" },
    RUBIDIUM: { name: "RUBIDIUM", number: 37, pos: [1, 5], charges: [1], metal: true, symbol: "Rb" },
    STRONTIUM: { name: "STRONTIUM", number: 38, pos: [2, 5], charges: [2], metal: true, symbol: "Sr" },
    YTTRIUM: { name: "YTTRIUM", number: 39, pos: [3, 5], charges: [3], metal: true, symbol: "Y" },
    ZIRCONIUM: { name: "ZIRCONIUM", number: 40, pos: [4, 5], charges: [4], metal: true, symbol: "Zr" },
    NIOBIUM: { name: "NIOBIUM", number: 41, pos: [5, 5], charges: [5], metal: true, symbol: "Nb" },
    MOLYBDENUM: { name: "MOLYBDENUM", number: 42, pos: [6, 5], charges: [4, 6], metal: true, symbol: "Mo" },
    TECHNETIUM: { name: "TECHNETIUM", number: 43, pos: [7, 5], charges: [4, 7], metal: true, symbol: "Tc" },
    RUTHENIUM: { name: "RUTHENIUM", number: 44, pos: [8, 5], charges: [3, 4], metal: true, symbol: "Ru" },
    RHODIUM: { name: "RHODIUM", number: 45, pos: [9, 5], charges: [3], metal: true, symbol: "Rh" },
    PALLADIUM: { name: "PALLADIUM", number: 46, pos: [10, 5], charges: [2, 4], metal: true, symbol: "Pd" },
    SILVER: { name: "SILVER", number: 47, pos: [11, 5], charges: [1], metal: true, symbol: "Ag" },
    CADMIUM: { name: "CADMIUM", number: 48, pos: [12, 5], charges: [2], metal: true, symbol: "Cd" },
    INDIUM: { name: "INDIUM", number: 49, pos: [13, 5], charges: [3], metal: true, symbol: "In" },
    TIN: { name: "TIN", number: 50, pos: [14, 5], charges: [4, -4], metal: true, symbol: "Sn" },
    ANTIMONY: { name: "ANTIMONY", number: 51, pos: [15, 5], charges: [-3], metal: true, symbol: "Sb" },
    TELLURIUM: { name: "TELLURIUM", number: 52, pos: [16, 5], charges: [-2], metal: true, symbol: "Te" },
    IODINE: { name: "IODINE", number: 53, pos: [17, 5], charges: [-1], metal: false, symbol: "I" },
    XENON: { name: "XENON", number: 54, pos: [18, 5], charges: [], metal: false, symbol: "Xe" },
    CESIUM: { name: "CESIUM", number: 55, pos: [1, 6], charges: [1], metal: true, symbol: "Cs" },
    BARIUM: { name: "BARIUM", number: 56, pos: [2, 6], charges: [2], metal: true, symbol: "Ba" },
    HAFNIUM: { name: "HAFNIUM", number: 72, pos: [4, 6], charges: [4], metal: true, symbol: "Hf" },
    TANTALUM: { name: "TANTALUM", number: 73, pos: [5, 6], charges: [5], metal: true, symbol: "Ta" },
    TUNGSTEN: { name: "TUNGSTEN", number: 74, pos: [6, 6], charges: [4, 6], metal: true, symbol: "W" },
    RHENIUM: { name: "RHENIUM", number: 75, pos: [7, 6], charges: [4], metal: true, symbol: "Re" },
    OSMIUM: { name: "OSMIUM", number: 76, pos: [8, 6], charges: [4], metal: true, symbol: "Os" },
    IRIDIUM: { name: "IRIDIUM", number: 77, pos: [9, 6], charges: [3, 4], metal: true, symbol: "Ir" },
    PLATINUM: { name: "PLATINUM", number: 78, pos: [10, 6], charges: [2, 4], metal: true, symbol: "Pt" },
    GOLD: { name: "GOLD", number: 79, pos: [11, 6], charges: [3], metal: true, symbol: "Au" },
    MERCURY: { name: "MERCURY", number: 80, pos: [12, 6], charges: [1, 2], metal: true, symbol: "Hg" },
    THALLIUM: { name: "THALLIUM", number: 81, pos: [13, 6], charges: [1, 3], metal: true, symbol: "Tl" },
    LEAD: { name: "LEAD", number: 82, pos: [14, 6], charges: [2, 4], metal: true, symbol: "Pb" },
};
exports.METALS = [exports.PERIODIC_TABLE.HYDROGEN, exports.PERIODIC_TABLE.LITHIUM, exports.PERIODIC_TABLE.BERYLLIUM, exports.PERIODIC_TABLE.BORON, exports.PERIODIC_TABLE.SODIUM, exports.PERIODIC_TABLE.MAGNESIUM, exports.PERIODIC_TABLE.ALUMINIUM, exports.PERIODIC_TABLE.SILICON, exports.PERIODIC_TABLE.POTASSIUM, exports.PERIODIC_TABLE.CALCIUM, exports.PERIODIC_TABLE.SCANDIUM, exports.PERIODIC_TABLE.TITANIUM, exports.PERIODIC_TABLE.VANADIUM, exports.PERIODIC_TABLE.CHROMIUM, exports.PERIODIC_TABLE.MANGANESE, exports.PERIODIC_TABLE.IRON, exports.PERIODIC_TABLE.COBALT, exports.PERIODIC_TABLE.NICKEL, exports.PERIODIC_TABLE.COPPER, exports.PERIODIC_TABLE.ZINC, exports.PERIODIC_TABLE.GALLIUM, exports.PERIODIC_TABLE.GERMANIUM, exports.PERIODIC_TABLE.ARSENIC, exports.PERIODIC_TABLE.RUBIDIUM, exports.PERIODIC_TABLE.STRONTIUM, exports.PERIODIC_TABLE.YTTRIUM, exports.PERIODIC_TABLE.ZIRCONIUM, exports.PERIODIC_TABLE.NIOBIUM, exports.PERIODIC_TABLE.MOLYBDENUM, exports.PERIODIC_TABLE.TECHNETIUM, exports.PERIODIC_TABLE.RUTHENIUM, exports.PERIODIC_TABLE.RHODIUM, exports.PERIODIC_TABLE.PALLADIUM, exports.PERIODIC_TABLE.SILVER, exports.PERIODIC_TABLE.CADMIUM, exports.PERIODIC_TABLE.INDIUM, exports.PERIODIC_TABLE.TIN, exports.PERIODIC_TABLE.ANTIMONY, exports.PERIODIC_TABLE.TELLURIUM, exports.PERIODIC_TABLE.IODINE, exports.PERIODIC_TABLE.CESIUM, exports.PERIODIC_TABLE.BARIUM, exports.PERIODIC_TABLE.HAFNIUM, exports.PERIODIC_TABLE.TANTALUM, exports.PERIODIC_TABLE.TUNGSTEN, exports.PERIODIC_TABLE.RHENIUM, exports.PERIODIC_TABLE.OSMIUM, exports.PERIODIC_TABLE.IRIDIUM, exports.PERIODIC_TABLE.PLATINUM, exports.PERIODIC_TABLE.GOLD, exports.PERIODIC_TABLE.MERCURY, exports.PERIODIC_TABLE.THALLIUM, exports.PERIODIC_TABLE.LEAD];
exports.BONDABLE_NONMETALS = [exports.PERIODIC_TABLE.HYDROGEN, exports.PERIODIC_TABLE.CARBON, exports.PERIODIC_TABLE.NITROGEN, exports.PERIODIC_TABLE.OXYGEN, exports.PERIODIC_TABLE.FLUORINE, exports.PERIODIC_TABLE.PHOSPHORUS, exports.PERIODIC_TABLE.SULFUR, exports.PERIODIC_TABLE.CHLORINE, exports.PERIODIC_TABLE.SELENIUM, exports.PERIODIC_TABLE.BROMINE, exports.PERIODIC_TABLE.IODINE];
exports.NOBLE_GASES = [exports.PERIODIC_TABLE.NEON, exports.PERIODIC_TABLE.ARGON, exports.PERIODIC_TABLE.HELIUM, exports.PERIODIC_TABLE.KRYPTON, exports.PERIODIC_TABLE.XENON];
exports.NONMETALS = exports.BONDABLE_NONMETALS.concat(exports.NOBLE_GASES);
exports.HOFBrINClS = [exports.PERIODIC_TABLE.HYDROGEN, exports.PERIODIC_TABLE.OXYGEN, exports.PERIODIC_TABLE.FLUORINE, exports.PERIODIC_TABLE.BROMINE, exports.PERIODIC_TABLE.IODINE, exports.PERIODIC_TABLE.NITROGEN, exports.PERIODIC_TABLE.CHLORINE];
function compareElements(el1, el2) {
    return el1.symbol == el2.symbol;
}
exports.compareElements = compareElements;
function compareQuantifiedElements(el1, el2) {
    return el1.element.symbol == el2.element.symbol && el1.quantity == el2.quantity;
}
exports.compareQuantifiedElements = compareQuantifiedElements;
function getFromSymbol(symbol) {
    const elements = Object.values(exports.PERIODIC_TABLE);
    return elements.find(el => el.symbol == symbol);
}
exports.getFromSymbol = getFromSymbol;
function combineSuffix(prefix, element, mono = false) {
    const rawPrefix = Nomenclature_1.Nomenclature.PREFIX_MAP[prefix];
    const moddedPrefix = Nomenclature_1.Nomenclature.MODDED_PREFIX_MAP[prefix];
    const elString = element.name.toLowerCase();
    const chosenPrefix = (elString.startsWith("o") || elString.startsWith("a")) ? moddedPrefix : rawPrefix;
    const monoMask = prefix == 1 && !mono ? "" : chosenPrefix;
    return {
        "rawPrefix": rawPrefix,
        "prefix": monoMask,
        "elementString": elString,
        "element": element,
        "result": monoMask + elString,
        "moddedPrefix": rawPrefix != chosenPrefix
    };
}
exports.combineSuffix = combineSuffix;


/***/ }),

/***/ "./src/Explainer.ts":
/*!**************************!*\
  !*** ./src/Explainer.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Explainer = exports.$explaination = void 0;
const _1 = __webpack_require__(/*! . */ "./src/index.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Util.ts");
const Common_1 = __webpack_require__(/*! ./explainations/Common */ "./src/explainations/Common.ts");
exports.$explaination = $("#explaination");
var Explainer;
(function (Explainer) {
    function parseExplainationString(str, additionalTemplates = {}) {
        let result = {
            "result": str,
            "variations": []
        };
        for (const variationName in Common_1.variations) {
            const variation = (0, Util_1.sample)(Common_1.variations[variationName]);
            result.result = result.result.replace(new RegExp(`\\{${variationName}\\}`), variation);
            result.variations.push(variation);
        }
        for (const additionals in additionalTemplates) {
            result.result = result.result.replace(new RegExp(`{${additionals}}`, "g"), additionalTemplates[additionals]);
        }
        result.result = result.result.replace(/\[B\]/g, "<div class=\"d-inline bold\">")
            .replace(/\[U\]/g, "<div class=\"d-inline underline\">")
            .replace(/\[I\]/g, "<div class=\"d-inline italic\">")
            .replace(/\[\/\]/g, "</div>");
        return result;
    }
    Explainer.parseExplainationString = parseExplainationString;
    function beginExplaination() {
        return __awaiter(this, void 0, void 0, function* () {
            exports.$explaination.empty();
            _1.ButtonLogic.inputEnable(false);
            Explainer.explaining = true;
            return (0, _1.delay)(2000);
        });
    }
    Explainer.beginExplaination = beginExplaination;
    function followUpExplainationSect(sec) {
        sec.css({ "max-height": window.innerHeight + "px", "padding": "30px" });
        window.scrollTo(0, document.body.scrollHeight);
    }
    Explainer.followUpExplainationSect = followUpExplainationSect;
    function createExplainationSect() {
        const $section = $(`<section class="anim-in-down"></section>`, { "class": "container-fluid rounded" });
        $section.css({
            "max-height": "0px",
            "padding-left": "30px",
            "padding-right": "30px",
            "overflow": "scroll",
            "background": "#f1f1f1",
            "display": "flex",
            "flex-direction": "row",
            "gap": "30px",
            "margin-top": "5px",
            "transition": "padding 1s, max-height 1s"
        });
        exports.$explaination.append($section);
        return $section;
    }
    Explainer.createExplainationSect = createExplainationSect;
    function followUpListPoint(point) {
        point.css({
            "opacity": 1,
            "transform": "scale(1)"
        });
        return (0, _1.delay)(1000);
    }
    Explainer.followUpListPoint = followUpListPoint;
    function createListPoint(sec, ind) {
        const $listPoint = $("<div></div>");
        $listPoint.text(ind);
        $listPoint.css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "padding": "15px",
            "width": "20px",
            "height": "20px",
            "background": "#50B5FF",
            "color": "#ffffff",
            "border-radius": "100%",
            "opacity": 0,
            "transform": "scale(1.5)",
            "font-size": "20px",
            "transition": "opacity 1s, transform 1s"
        });
        sec.append($listPoint);
        return $listPoint;
    }
    Explainer.createListPoint = createListPoint;
    function endExplaination() {
        return __awaiter(this, void 0, void 0, function* () {
            _1.$resetBtn.removeAttr("disabled");
            _1.$resetBtn.fadeIn(1000);
            window.scrollTo(0, _1.$resetBtn[0].getBoundingClientRect().bottom);
            Explainer.explaining = false;
            return (0, _1.delay)(1000);
        });
    }
    Explainer.endExplaination = endExplaination;
})(Explainer = exports.Explainer || (exports.Explainer = {}));


/***/ }),

/***/ "./src/Nomenclature.ts":
/*!*****************************!*\
  !*** ./src/Nomenclature.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nomenclature = void 0;
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Util.ts");
var Nomenclature;
(function (Nomenclature) {
    Nomenclature.ANION_MAP = {
        "HYDRIDE": "HYDROGEN",
        "CARBIDE": "CARBON",
        "NITRIDE": "NITROGEN",
        "OXIDE": "OXYGEN",
        "FLUORIDE": "FLUORINE",
        "PHOSPHIDE": "PHOSPHORUS",
        "SULFIDE": "SULFUR",
        "CHLORIDE": "CHLORINE",
        "SELENIDE": "SELENIUM",
        "BROMIDE": "BROMINE",
        "IODIDE": "IODINE"
    };
    Nomenclature.ELEMENT_TO_ANION = (0, Util_1.swapObj)(Nomenclature.ANION_MAP);
    Nomenclature.PREFIX_MAP = {
        1: "MONO",
        2: "DI",
        3: "TRI",
        4: "TETRA",
        5: "PENTA",
        6: "HEXA",
        7: "HEPTA",
        8: "OCTA",
        9: "NONA",
        10: "DECA"
    };
    Nomenclature.MODDED_PREFIX_MAP = {
        1: "MON",
        2: "DI",
        3: "TRI",
        4: "TETR",
        5: "PENT",
        6: "HEX",
        7: "HEPT",
        8: "OCT",
        9: "NON",
        10: "DEC"
    };
    Nomenclature.MODDED_PREFIX_TO_NUM = (0, Util_1.swapObj)(Nomenclature.MODDED_PREFIX_MAP);
    Nomenclature.PREFIX_TO_NUM = (0, Util_1.swapObj)(Nomenclature.PREFIX_MAP);
})(Nomenclature = exports.Nomenclature || (exports.Nomenclature = {}));


/***/ }),

/***/ "./src/Scheduler.ts":
/*!**************************!*\
  !*** ./src/Scheduler.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Routine = exports.WaitForSeconds = exports.WaitForMillis = exports.WaitForPromise = exports.WaitFor = void 0;
class WaitFor {
    constructor(test, process) {
        this.test = test;
        this.process = process || (function () { });
        this.tick();
    }
    tick() {
        if (this.test())
            return this.process();
        setTimeout(this.tick.bind(this));
    }
}
exports.WaitFor = WaitFor;
class WaitForPromise extends WaitFor {
    constructor(promise) {
        super(() => false);
        this.done = false;
        const self = this;
        this.test = () => this.done;
        promise.then(function () {
            self.done = true;
        }).catch(function () {
            self.done = true;
        });
    }
}
exports.WaitForPromise = WaitForPromise;
class WaitForMillis extends WaitFor {
    constructor(millis = 1, process) {
        const now = Date.now() + millis;
        super(() => (Date.now() >= now), process);
        this.millis = millis;
    }
}
exports.WaitForMillis = WaitForMillis;
class WaitForSeconds extends WaitForMillis {
    constructor(seconds = 1, process) {
        super(seconds * 1000, process);
    }
}
exports.WaitForSeconds = WaitForSeconds;
var Routine;
(function (Routine) {
    function continueGeneratorTask(task) {
        const result = task.next();
        const continueTask = () => continueGeneratorTask(task);
        if (result.done)
            return;
        if (result.value instanceof WaitFor)
            result.value.process = continueTask;
        else
            new WaitForMillis(1, continueTask);
    }
    function startTask(process) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = process();
            continueGeneratorTask(task);
        });
    }
    Routine.startTask = startTask;
})(Routine = exports.Routine || (exports.Routine = {}));


/***/ }),

/***/ "./src/Util.ts":
/*!*********************!*\
  !*** ./src/Util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.swapObj = exports.sample = exports.capitalize = void 0;
function capitalize(s) {
    let strings = s.split(" ");
    for (let i = 0; i < strings.length; i++) {
        const s = strings[i];
        strings[i] = s ? s[0].toUpperCase() + s.substring(1) : "";
    }
    return strings.join(" ");
}
exports.capitalize = capitalize;
function sample(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.sample = sample;
function swapObj(obj) {
    let result = {};
    for (const k in obj)
        result[obj[k]] = k;
    return result;
}
exports.swapObj = swapObj;


/***/ }),

/***/ "./src/explainations/Common.ts":
/*!*************************************!*\
  !*** ./src/explainations/Common.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commonExplainationScript = exports.variations = void 0;
exports.variations = {
    "INTRO.IDENTIFICATION.START": [
        "Firstly",
        "First",
        "To start",
        "In order to start",
        "To begin",
        "In order to begin",
        "In the beginning",
        "In the start"
    ],
    "INTRO.IDENTIFICATION.TO_IDENTIFY": [
        "identify",
        "figure out",
        "look closely",
        "see"
    ],
    "INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING": [
        "following",
        "given",
        "inputted"
    ]
};
exports.commonExplainationScript = {
    "VALIDATION": {
        "FORMULA": "Unfortunately, the formula you provided contains a symbol that I don't recognize. I wasn't programmed with knowledge of a chemical named [B]{symbol}[/].",
        "COMPOUND": "Unfortunately, the chemical name you provided contains chemicals that I don't recognize. I wasn't programmed with knowledge of [B]{name}[/].",
        "COMMON": "I have information for all chemicals from [U]Hydrogen to Lead[/], [I]not including the Lanthanoids or Actinoids[/]. Sorry for the inconvenience!"
    },
    "INTRO": {
        "IDENTIFICATION": "{INTRO.IDENTIFICATION.START}, we will {INTRO.IDENTIFICATION.TO_IDENTIFY} if the {INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING} compound is a [B]Ionic[/] or [B]Covalent[/] compound. An [B]Ionic[/] compound has the [U]metal[/] as the [B]cation[/] and [U]non-metal[/] as the [B]anion[/]. In ionic compounds, [U]metals will [B]give[/] electrons[/] and [U]non-metals will [B]take[/] electrons[/].",
        "CONTAINS_POLYATOMIC": "Before starting, notice this compound has more than 2 elements in it's formula, which means it contains a polyatomic.",
        "CONTAINS_POLYATOMIC_CATION": "Looking closely, [B]{CATION_F}[/] seems to be a [U]{CATION}[/] molecule.",
        "CONTAINS_POLYATOMIC_ANION": "Looking closely, [B]{ANION_F}[/] seems to be a [U]{ANION}[/] molecule.",
        "IS_METAL_AND_NONMETAL": "In this case, [B]{CATION}[/] is a [U]metal[/] and [B]{ANION}[/] is a [U]non-metal[/], which means this compound is [B]ionic[/].",
        "IS_METAL_AND_POLYATOMIC": "In this case, [B]{CATION}[/] is a [U]metal[/] and [B]{ANION}[/] is a [U]polyatomic[/], which means this compound is [B]ionic[/].",
        "IS_POLYATOMIC_AND_NONMETAL": "In this case, [B]{CATION}[/] is a polyatomic that gives electrons, and acts like a metal, and [B]{ANION}[/] is a [B]non-metal[/], which makes this compound an [B]ionic[/] compound.",
        // TODO re record molecular and covalent problem smhs
        "IS_NONMETAL_AND_NONMETAL": "In this case, both [B]{CATION}[/] and [B]{ANION}[/] are [U]non-metals[/], which makes this compound [B]covalent[/].",
        "IS_NONMETAL_AND_POLYATOMIC": "In this case, [B]{CATION}[/] is a [U]non-metal[/], and [B]{ANION}[/] is a [B]polyatomic[/], which makes this compound a [B]covalent[/] compound."
    }
};


/***/ }),

/***/ "./src/explainations/Compound.ts":
/*!***************************************!*\
  !*** ./src/explainations/Compound.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compound = exports.parseFormula = exports.compoundExplainationScript = void 0;
const __1 = __webpack_require__(/*! .. */ "./src/index.ts");
const AudioPlayer_1 = __webpack_require__(/*! ../AudioPlayer */ "./src/AudioPlayer.ts");
const ChemicalCompounds_1 = __webpack_require__(/*! ../ChemicalCompounds */ "./src/ChemicalCompounds.ts");
const Elements_1 = __webpack_require__(/*! ../Elements */ "./src/Elements.ts");
const Explainer_1 = __webpack_require__(/*! ../Explainer */ "./src/Explainer.ts");
const Nomenclature_1 = __webpack_require__(/*! ../Nomenclature */ "./src/Nomenclature.ts");
const Scheduler_1 = __webpack_require__(/*! ../Scheduler */ "./src/Scheduler.ts");
const Util_1 = __webpack_require__(/*! ../Util */ "./src/Util.ts");
const Common_1 = __webpack_require__(/*! ./Common */ "./src/explainations/Common.ts");
exports.compoundExplainationScript = {
    "INTRO": {
        "IDENTIFY": "In this case, the chemical compound is an",
    },
    "LONE": {
        "IS_LONE": "Fortunately, the input provided only contains one element, so we will not have to worry about ionic or covalent compounds.",
        "METAL": "The metal [B]{symbol}[/] would be called [B]{name}[/]",
        "NONMETAL": "The non-metal [B]{symbol}[/] would be called [B]{name}[/]",
        "PREFIX": "The prefix signifies how many of that atom is present.",
        "MPREFIX": "Since the element name begins with an A or O, the last letter of the prefix is adjusted accordingly.",
        "HOFBRINCL": "Since this symbol [U]is[/] a [I]HOFBrINCl[/] twin (meaning it is required for it to come in pairs),",
        "VALID_HOFBRINCL": "and it has a subscript of [B][I]2[/][/], this formula is [I]valid[/]. On the periodic table, this chemical is called [B]{name}[/].",
        "INVALID_HOFBRINCL": "and it currently only has a subscript of 1, this formula is [I]invalid[/].",
        "POLYATOMIC": "Fortunately, the input provided is a [B]polyatomic[/]. Polyatomics are [I]covalent compounds[/] that act as a single ion. Polyatomics can be [U]both nonmetals and metals[/]. This polyatomic behaves like",
        "POLYATOMIC_METAL": "a [U]positive ion[/], and [I]gives[/] electrons to become more [I]positively[/] charged. This is similar to the chemical properties of a [B]metal[/].",
        "POLYATOMIC_NONMETAL": "a [U]negative ion[/], and [I]takes[/] electrons to become more [I]negatively[/] charged. This is similar to the chemical properties of a [B]non-metal[/].",
        "POLYATOMIC_RESULT": "The polyatomic [B]{formula}[/] is also known as [B]{name}[/]."
    },
    "IONIC": {
        "NEEDS_SWAP": "In this formula, the metal and non-metal are in the wrong places. In ionic compounds, the metal goes first, and is followed by the non-metal. The correct way to write this formula would be [B]{metal_f}{non_metal_f}[/].",
        "IS_IONIC": "[B]ionic[/] compound. We know this because the compound contains a [U]metal and non-metal[/]. In an ionic compound, the metal [I]gives it's electron to a non-metal[/] to create a [B]lattice[/] structure. In this formula,",
        "IDENTIFY_POLY_METAL": "the metal is a polyatomic. [B]{metal_f}[/] is a polyatomic ion known as [B]{metal}[/].",
        "IDENTIFY_METAL": "the metal is [B]{metal_f}[/],",
        "IDENTIFY_POLY_NONMETAL": "and the non-metal, [B]{nonmetal_f}[/] is a polyatomic ion known as [B]{nonmetal}[/].",
        "IDENTIFY_NONMETAL": "and the non-metal in the formula is [B]{nonmetal_f}[/].",
        "DESCRIBE_BOND": "In this bond, [B]{metal}[/] gives its [I]{metal_gives} electrons[/] to [B]{nonmetal}[/].",
        "DESCRIBE_NO_SUFFIX": "To name this compound, we take the cation, and combine it with the anion. No modification of the non-metal's name is required, as [I]the non-metal is a polyatomic[/]. This compound would be called [U][B]{result}[/][/].",
        "DESCRIBE_SUFFIX": "To name this compound, we take the cation, and combine it with the anion ending with an [I]-ide[/]. {nonmetal} turns into [B]{anion}[/], so this compound would be called [U][B]{result}[/][/]."
    },
    "COVALENT": {
        "IS_COVALENT": "[B]covalent[/] compound. Covalent compounds are when two non-metals bond by sharing an electron to fill it's outer shell."
    }
};
function parseFormula(formula) {
    const result = [];
    const getQuantity = (n) => {
        const num = Number(n || "1");
        return Number.isNaN(num) ? 1 : num;
    };
    let segs = formula.split("");
    let num = "";
    let symbol = "";
    for (let i = 0; i < segs.length; i++) {
        const letter = segs[i];
        let val = ChemicalCompounds_1.SUBSCRIPT_TO_NUM[letter];
        if (val) {
            num += val;
        }
        else {
            const isLowerCase = letter.toLowerCase() == letter;
            if (isLowerCase) {
                symbol += letter;
            }
            else {
                if (symbol !== "") {
                    result.push({ "symbol": symbol, "quantity": getQuantity(num) });
                }
                symbol = letter;
                num = "";
            }
        }
    }
    result.push({ "symbol": symbol, "quantity": getQuantity(num) });
    return result;
}
exports.parseFormula = parseFormula;
function compound() {
    return __awaiter(this, void 0, void 0, function* () {
        const formula = __1.$input.val();
        return new Promise(res => {
            Scheduler_1.Routine.startTask(function* () {
                const $sect1 = Explainer_1.Explainer.createExplainationSect();
                const $listPoint1 = Explainer_1.Explainer.createListPoint($sect1, 1);
                Explainer_1.Explainer.followUpExplainationSect($sect1);
                yield new Scheduler_1.WaitForMillis(500);
                Explainer_1.Explainer.followUpListPoint($listPoint1);
                const $introText = $(`<div class="anim-in-down"></div>`);
                let parseResult = Explainer_1.Explainer.parseExplainationString(Common_1.commonExplainationScript.INTRO.IDENTIFICATION);
                $introText.html(parseResult.result);
                yield new Scheduler_1.WaitForSeconds(1);
                $sect1.append($introText);
                if (!mute) {
                    yield new Scheduler_1.WaitForPromise(AudioPlayer_1.AudioPlayer.playAudiosInSequence(AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.START", parseResult.variations[0]), AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "1"), AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.TO_IDENTIFY", parseResult.variations[1]), AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "2"), AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION.TO_CHECK_THE_FOLLOWING", parseResult.variations[2]), AudioPlayer_1.AudioPlayer.getAudioPath("INTRO.IDENTIFICATION", "3")));
                }
                yield new Scheduler_1.WaitForMillis(500);
                const compoundGroups = parseFormula(formula);
                const validSymbols = Object.values(Elements_1.PERIODIC_TABLE).map(pe => pe.symbol);
                // Validate all elements
                for (const group of compoundGroups) {
                    if (validSymbols.includes(group.symbol)) {
                        console.log("Valid symbol: " + group.symbol);
                    }
                    else {
                        console.log("Invalid symbol: " + group.symbol);
                        const err = Explainer_1.Explainer.parseExplainationString(Common_1.commonExplainationScript.VALIDATION.FORMULA + " " + Common_1.commonExplainationScript.VALIDATION.COMMON, {
                            "symbol": group.symbol
                        });
                        const $errBox = $(`<div class="anim-in-down mt-4"></div>`);
                        $errBox.html(err.result);
                        yield new Scheduler_1.WaitForMillis(500);
                        $introText.append($errBox);
                        if (!mute) {
                            const symb = group.symbol.toUpperCase();
                            const spellFormula = [
                                AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", symb[0])
                            ];
                            if (symb.length == 2)
                                spellFormula.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", symb[1]));
                            yield new Scheduler_1.WaitForPromise(AudioPlayer_1.AudioPlayer.playAudiosInSequence(AudioPlayer_1.AudioPlayer.getAudioPath("VALIDATION.FORMULA", "1"), ...spellFormula, AudioPlayer_1.AudioPlayer.getAudioPath("VALIDATION.COMMON", "1")));
                        }
                        return res("Invalid formula");
                    }
                }
                const quantifiedElements = compoundGroups.map(cg => ({
                    "element": (0, Elements_1.getFromSymbol)(cg.symbol),
                    "quantity": cg.quantity
                }));
                const isSingleton = compoundGroups.length == 1;
                if (isSingleton) {
                    const $singleton = $(`<div class="anim-in-down mt-4"></div>`);
                    const explainations = [exports.compoundExplainationScript.LONE.IS_LONE];
                    const audioExplainations = [AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.IS_LONE", "1")];
                    const quantifiedSingleton = quantifiedElements[0];
                    const symbol = quantifiedSingleton.element.symbol;
                    const name = quantifiedSingleton.element.name;
                    let combinedName;
                    if (Elements_1.HOFBrINClS.includes(quantifiedSingleton.element) && quantifiedSingleton.quantity <= 2) {
                        combinedName = name;
                        explainations.push(exports.compoundExplainationScript.LONE.HOFBRINCL);
                        audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.HOFBRINCL", "1"));
                        if (quantifiedSingleton.quantity === 2) {
                            explainations.push(exports.compoundExplainationScript.LONE.VALID_HOFBRINCL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.VALID_HOFBRINCL", "1"));
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                            if (symbol != "Br" && symbol != "I") {
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.VALID_HOFBRINCL", "2"));
                                combinedName += " gas";
                            }
                        }
                        else {
                            explainations.push(exports.compoundExplainationScript.LONE.INVALID_HOFBRINCL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.INVALID_HOFBRINCL", "1"));
                            combinedName = "Invalid formula";
                        }
                    }
                    else {
                        const combinationResult = (0, Elements_1.combineSuffix)(quantifiedSingleton.quantity, quantifiedSingleton.element);
                        const hasPrefix = !!combinationResult.prefix;
                        const ionic = Elements_1.METALS.includes(quantifiedElements[0].element);
                        combinedName = combinationResult.result;
                        const addSymbolSpeech = () => {
                            if (symbol.length == 2) {
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol[0]));
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol[1].toUpperCase()));
                            }
                            else {
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", symbol));
                            }
                        };
                        if (ionic) {
                            explainations.push(exports.compoundExplainationScript.LONE.METAL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.METAL", "1"));
                            addSymbolSpeech();
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.METAL", "2"));
                            if (hasPrefix)
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", combinationResult.prefix));
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                        }
                        else {
                            explainations.push(exports.compoundExplainationScript.LONE.NONMETAL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.NONMETAL", "1"));
                            addSymbolSpeech();
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.NONMETAL", "2"));
                            if (hasPrefix)
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", combinationResult.prefix));
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.ELEMENT", name));
                        }
                        if (quantifiedSingleton.quantity > 1) {
                            explainations.push(exports.compoundExplainationScript.LONE.PREFIX);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.PREFIX", "1"));
                            if (combinationResult.moddedPrefix) {
                                explainations.push(exports.compoundExplainationScript.LONE.MPREFIX);
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.MPREFIX", "1"));
                            }
                        }
                    }
                    const singletonMsg = Explainer_1.Explainer.parseExplainationString(explainations.join(" "), {
                        "symbol": symbol,
                        "name": (0, Util_1.capitalize)(combinedName.toLowerCase())
                    });
                    $singleton.html(singletonMsg.result);
                    $introText.append($singleton);
                    if (!mute) {
                        yield new Scheduler_1.WaitForPromise(AudioPlayer_1.AudioPlayer.playAudiosInSequence(...audioExplainations));
                    }
                    yield new Scheduler_1.WaitForMillis(500);
                    return res((0, Util_1.capitalize)(combinedName.toLowerCase()));
                }
                else {
                    const polyatomic = (0, ChemicalCompounds_1.getPolyatomic)(quantifiedElements);
                    const explainations = [exports.compoundExplainationScript.LONE.POLYATOMIC];
                    const audioExplainations = [AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.POLYATOMIC", "1")];
                    if (polyatomic) {
                        const formula = polyatomic.chemicalFormula;
                        const name = polyatomic.name;
                        if (polyatomic.charge > 0) {
                            explainations.push(exports.compoundExplainationScript.LONE.POLYATOMIC_METAL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_METAL", "1"));
                        }
                        else {
                            explainations.push(exports.compoundExplainationScript.LONE.POLYATOMIC_NONMETAL);
                            audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_NONMETAL", "1"));
                        }
                        explainations.push(exports.compoundExplainationScript.LONE.POLYATOMIC_RESULT);
                        audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_RESULT", "1"));
                        for (const letter of formula) {
                            const numVal = ChemicalCompounds_1.SUBSCRIPT_TO_NUM[letter];
                            if (numVal)
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", numVal.toString()));
                            else
                                audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.MISC", letter.toUpperCase()));
                        }
                        audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("C/LONE.POLYATOMIC_RESULT", "2"));
                        audioExplainations.push(AudioPlayer_1.AudioPlayer.getAudioPath("ELEMENTS.POLYATOMIC", name));
                        const polyatomicText = Explainer_1.Explainer.parseExplainationString(explainations.join(" "), {
                            "formula": formula,
                            "name": (0, Util_1.capitalize)(name.toLowerCase())
                        });
                        const $polyatomic = $(`<div class="anim-in-down mt-4"></div>`);
                        $polyatomic.html(polyatomicText.result);
                        $introText.append($polyatomic);
                        if (!mute) {
                            yield new Scheduler_1.WaitForPromise(AudioPlayer_1.AudioPlayer.playAudiosInSequence(...audioExplainations));
                        }
                        yield new Scheduler_1.WaitForMillis(500);
                        return res((0, Util_1.capitalize)(name.toLowerCase()));
                    }
                }
                const bondables = [];
                let parseQueue = quantifiedElements.copyWithin(0, 0);
                while (parseQueue.length !== 0) {
                    let useLength = 0;
                    let foundElement = null;
                    if (parseQueue.length >= 2) {
                        if (parseQueue.length >= 3) {
                            foundElement = (0, ChemicalCompounds_1.getPolyatomic)(parseQueue.slice(0, 3));
                            useLength = 3;
                        }
                        if (!foundElement) {
                            foundElement = (0, ChemicalCompounds_1.getPolyatomic)(parseQueue.slice(0, 2));
                            useLength = 2;
                        }
                    }
                    if (!foundElement) {
                        const element = parseQueue[0];
                        foundElement = new ChemicalCompounds_1.Bondable([element], element.element.charges[0], element.element.name);
                        useLength = 1;
                    }
                    parseQueue.splice(0, useLength);
                    bondables.push(foundElement);
                }
                const $sect2 = Explainer_1.Explainer.createExplainationSect();
                yield new Scheduler_1.WaitForMillis(100);
                Explainer_1.Explainer.followUpExplainationSect($sect2);
                const $listPoint2 = Explainer_1.Explainer.createListPoint($sect2, 2);
                yield new Scheduler_1.WaitForMillis(500);
                Explainer_1.Explainer.followUpListPoint($listPoint2);
                const $resultSect = Explainer_1.Explainer.createExplainationSect();
                const followUpResultsSection = () => __awaiter(this, void 0, void 0, function* () {
                    Explainer_1.Explainer.followUpExplainationSect($resultSect);
                    const $resultPoint = Explainer_1.Explainer.createListPoint($resultSect, 3);
                    yield (0, __1.delay)(100);
                    Explainer_1.Explainer.followUpListPoint($resultPoint);
                });
                yield new Scheduler_1.WaitForMillis(1000);
                const $identification = $(`<div class="anim-in-down"></div>`);
                const $result = $(`<div class="anim-in-down"></div>`);
                const ionic = bondables.length == 2 && (bondables[0].actsLikeMetal || bondables[1].actsLikeMetal);
                const chargesBalance = bondables.map(b => b.charge).reduce((accumulate, v) => accumulate + v) === 0;
                let identificationText = [exports.compoundExplainationScript.INTRO.IDENTIFY];
                let resultingText = [];
                if (ionic && chargesBalance) {
                    const needsSwap = !bondables[0].actsLikeMetal;
                    const [metal, nonmetal] = needsSwap ? [bondables[1], bondables[0]] : [bondables[0], bondables[1]];
                    if (needsSwap)
                        identificationText.push(exports.compoundExplainationScript.IONIC.NEEDS_SWAP);
                    let resultingName = (0, Util_1.capitalize)(metal.name.toLowerCase()) + " ";
                    let anionName = (0, Util_1.capitalize)(nonmetal.name.toLowerCase());
                    identificationText.push(exports.compoundExplainationScript.IONIC.IS_IONIC);
                    resultingText.push(exports.compoundExplainationScript.IONIC.DESCRIBE_BOND);
                    if (metal.isSingleton()) {
                        identificationText.push(exports.compoundExplainationScript.IONIC.IDENTIFY_METAL);
                    }
                    else {
                        identificationText.push(exports.compoundExplainationScript.IONIC.IDENTIFY_POLY_METAL);
                    }
                    if (nonmetal.isSingleton()) {
                        identificationText.push(exports.compoundExplainationScript.IONIC.IDENTIFY_NONMETAL);
                        resultingText.push(exports.compoundExplainationScript.IONIC.DESCRIBE_SUFFIX);
                        anionName = (0, Util_1.capitalize)(Nomenclature_1.Nomenclature.ELEMENT_TO_ANION[nonmetal.name].toLowerCase());
                        resultingName += anionName;
                    }
                    else {
                        identificationText.push(exports.compoundExplainationScript.IONIC.IDENTIFY_POLY_NONMETAL);
                        resultingText.push(exports.compoundExplainationScript.IONIC.DESCRIBE_NO_SUFFIX);
                        resultingName += (0, Util_1.capitalize)(nonmetal.name.toLowerCase());
                    }
                    $identification.html(Explainer_1.Explainer.parseExplainationString(identificationText.join(" "), {
                        "metal": (0, Util_1.capitalize)(metal.name.toLowerCase()),
                        "metal_f": metal.chemicalFormula,
                        "nonmetal": (0, Util_1.capitalize)(nonmetal.name.toLowerCase()),
                        "nonmetal_f": nonmetal.chemicalFormula,
                    }).result);
                    $sect2.append($identification);
                    yield new Scheduler_1.WaitForSeconds(1);
                    followUpResultsSection();
                    yield new Scheduler_1.WaitForMillis(500);
                    $result.html(Explainer_1.Explainer.parseExplainationString(resultingText.join(" "), {
                        "metal": (0, Util_1.capitalize)(metal.name.toLowerCase()),
                        "nonmetal": (0, Util_1.capitalize)(nonmetal.name.toLowerCase()),
                        "anion": anionName,
                        "metal_gives": metal.charge.toString(),
                        "result": resultingName
                    }).result);
                    $resultSect.append($result);
                    return res(resultingName);
                }
                else {
                    if (chargesBalance) { } //TODO
                    identificationText.push(exports.compoundExplainationScript.COVALENT.IS_COVALENT);
                    $sect2.append($identification);
                }
                res("Work in progress");
            });
        });
    });
}
exports.compound = compound;


/***/ }),

/***/ "./src/explainations/Formula.ts":
/*!**************************************!*\
  !*** ./src/explainations/Formula.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formula = exports.compoundExplainationScript = void 0;
const Scheduler_1 = __webpack_require__(/*! ../Scheduler */ "./src/Scheduler.ts");
exports.compoundExplainationScript = {
    "INTRO": {},
    "LONE": {
        "IS_LONE_CHEMICAL": "Looking at the periodic table, the chemical symbol for [B]{name}[/] would be [B]{symbol}[/]."
    }
};
function formula() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            Scheduler_1.Routine.startTask(function* () {
                res();
            });
        });
    });
}
exports.formula = formula;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonLogic = exports.delay = exports.$mutedSwitch = exports.$execBtnsContainer = exports.$resetBtn = exports.$findCompoundBtn = exports.$findFormulaBtn = exports.$input = exports.$main = exports.$noticeConfirmBtn = exports.$notice = void 0;
const ChemicalCompounds_1 = __webpack_require__(/*! ./ChemicalCompounds */ "./src/ChemicalCompounds.ts");
const Explainer_1 = __webpack_require__(/*! ./Explainer */ "./src/Explainer.ts");
const Util_1 = __webpack_require__(/*! ./Util */ "./src/Util.ts");
const Compound_1 = __webpack_require__(/*! ./explainations/Compound */ "./src/explainations/Compound.ts");
const Formula_1 = __webpack_require__(/*! ./explainations/Formula */ "./src/explainations/Formula.ts");
exports.$notice = $("#notice-box");
exports.$noticeConfirmBtn = $("#notice-confirm");
exports.$noticeConfirmBtn.on("click", () => {
    exports.$noticeConfirmBtn.attr("disabled", "disabled");
    exports.$notice.css({ "pointer-events": "none", "background": "transparent" });
    exports.$notice.children().addClass("anim-out-down");
    setTimeout(() => {
        exports.$main.addClass("anim-in-down");
    }, 500);
    setTimeout(() => {
        exports.$notice.removeClass("d-flex");
        exports.$notice.addClass("d-none");
    }, 1000);
});
exports.$main = $("main");
exports.$input = $("#input");
exports.$findFormulaBtn = $("#find-formula");
exports.$findCompoundBtn = $("#find-compound");
exports.$resetBtn = $("#reset");
exports.$execBtnsContainer = $("#exec-buttons");
exports.$mutedSwitch = $("#muted");
const delay = (ms) => new Promise(r => setInterval(r, ms));
exports.delay = delay;
$(window).on("load", () => {
    ButtonLogic.inputEnable(true);
    const examples = [
        "Dihydrogen Monoxide",
        "Carbon Dioxide",
        "Sodium Chloride",
        "Lead II Chloride",
        "Ammonium Iodide",
        "H2O",
        "NH4",
        "CO2",
        "NaCl",
        "H2",
        "O2",
        "O3",
        "NH4OH"
    ];
    exports.$input.trigger("focus");
    // $input.val(sample(examples));
    exports.$input.val("NH4OH");
    exports.$input.trigger("input");
    window.mute = true;
});
exports.$input.on("input", () => {
    const val = exports.$input.val().toString();
    exports.$input.val((val => {
        ButtonLogic.inputMode = "NONE";
        exports.$findFormulaBtn.attr("disabled", "disabled");
        exports.$findCompoundBtn.attr("disabled", "disabled");
        if (val.length == 0)
            return "";
        ButtonLogic.inputMode = new RegExp("[a-z]{2}").test(val) ? "COMPOUND" : "FORMULA";
        let result = val;
        result = result.replace(new RegExp("!"), "1").replace(new RegExp("@"), "2").replace(new RegExp("#"), "3").replace(new RegExp("\\$"), "4").replace(new RegExp("%"), "5").replace(new RegExp("\\^"), "6").replace(new RegExp("&"), "7").replace(new RegExp("\\*"), "8").replace(new RegExp("\\("), "9").replace(new RegExp("\\)"), "0");
        if (ButtonLogic.inputMode == "COMPOUND") {
            result = result.replace(new RegExp("[^ \\w]+", "g"), "");
            result = result.replace(new RegExp("1", "g"), "I").replace(new RegExp("2", "g"), "II").replace(new RegExp("3", "g"), "III").replace(new RegExp("4", "g"), "IV").replace(new RegExp("5", "g"), "V").replace(new RegExp("6", "g"), "VI").replace(new RegExp("7", "g"), "VII").replace(new RegExp("8", "g"), "VIII").replace(new RegExp("9", "g"), "IX").replace(new RegExp("10", "g"), "X").replace(new RegExp("I0", "g"), "X");
            result = result.replace(new RegExp("[₀₁₂₃₄₅₆₇₈₉]+", "g"), "");
            result = result.split(" ").map(word => (0, Util_1.capitalize)(word)).join(" ");
        }
        else if (ButtonLogic.inputMode == "FORMULA") {
            for (const quantity in ChemicalCompounds_1.QUANTITY_SUBSCRIPTS)
                result = result.replace(new RegExp(quantity, "g"), ChemicalCompounds_1.QUANTITY_SUBSCRIPTS[quantity]);
            result = result.replace(new RegExp("^[₀₁₂₃₄₅₆₇₈₉]+", "g"), "");
            result = result.replace(new RegExp("[^ \\w₁₂₃₄₅₆₇₈₉₀]+", "g"), "");
            result = result.replace(new RegExp("(\\w)₀"), "$1");
            "₀₁₂₃₄₅₆₇₈₉".split("").forEach(sub => {
                result = result.split(sub).map(r => (0, Util_1.capitalize)(r)).join(sub);
            });
            let fResult = "";
            let num = "";
            let segs = result.split("");
            for (let i = 0; i < segs.length; i++) {
                const letter = segs[i];
                let val = ChemicalCompounds_1.SUBSCRIPT_TO_NUM[letter];
                if (val) {
                    num += val;
                    if (i != segs.length - 1)
                        continue;
                }
                let subscript = "";
                if (num && num != "0") {
                    if (new RegExp("^10+$").test(num)) {
                        subscript = ChemicalCompounds_1.QUANTITY_SUBSCRIPTS[10];
                    }
                    else {
                        if (num.endsWith("0")) {
                            subscript = ChemicalCompounds_1.QUANTITY_SUBSCRIPTS[Number(num.replace(/0+$/, ''))];
                        }
                        else {
                            subscript = ChemicalCompounds_1.QUANTITY_SUBSCRIPTS[Number(num.at(-1))];
                        }
                    }
                }
                fResult += subscript;
                if (!val) {
                    fResult += letter;
                }
                num = "";
            }
            result = fResult;
        }
        ButtonLogic.toggleModeButtons();
        return (0, Util_1.capitalize)(result).trimStart();
    })(val));
});
var ButtonLogic;
(function (ButtonLogic) {
    ButtonLogic.inputMode = "NONE";
    function toggleModeButtons() {
        exports.$findCompoundBtn.attr("disabled", "disabled");
        exports.$findFormulaBtn.attr("disabled", "disabled");
        switch (ButtonLogic.inputMode) {
            case "FORMULA":
                exports.$findCompoundBtn.removeAttr("disabled");
                break;
            case "COMPOUND":
                exports.$findFormulaBtn.removeAttr("disabled");
                break;
        }
    }
    ButtonLogic.toggleModeButtons = toggleModeButtons;
    function inputEnable(enable) {
        exports.$main.css("padding-top", enable ? "200px" : "20px");
        exports.$input.removeAttr("disabled");
        exports.$mutedSwitch.removeAttr("disabled");
        if (!enable) {
            exports.$findCompoundBtn.attr("disabled", "disabled");
            exports.$findFormulaBtn.attr("disabled", "disabled");
            exports.$input.attr("disabled", "disabled");
            exports.$mutedSwitch.attr("disabled", "disabled");
            exports.$execBtnsContainer.css({ "height": "0px", "opacity": 0 });
        }
    }
    ButtonLogic.inputEnable = inputEnable;
    function createResultSec(title, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const $explainationSect = $(`<section id="result" class="rounded anim-in-up"></section>`);
            $explainationSect.html(`<h1>${title}</h1><span>${body}</span>`);
            Explainer_1.$explaination.append($explainationSect);
            return (0, exports.delay)(2000);
        });
    }
    ButtonLogic.createResultSec = createResultSec;
    function onFormulaBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Explaining formula...");
            yield Explainer_1.Explainer.beginExplaination();
            yield (0, Formula_1.formula)();
            yield createResultSec("Formula Name", "Work in progress");
            return Explainer_1.Explainer.endExplaination();
        });
    }
    ButtonLogic.onFormulaBtn = onFormulaBtn;
    function onCompoundBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Explaining compound name...");
            yield Explainer_1.Explainer.beginExplaination();
            const result = yield (0, Compound_1.compound)();
            yield createResultSec("Compound Name", result);
            return Explainer_1.Explainer.endExplaination();
        });
    }
    ButtonLogic.onCompoundBtn = onCompoundBtn;
    function reset() {
        exports.$resetBtn.attr("disabled", "disabled");
        exports.$resetBtn.fadeOut(2000);
        exports.$input.trigger("focus");
        exports.$input.trigger("input");
    }
    ButtonLogic.reset = reset;
})(ButtonLogic = exports.ButtonLogic || (exports.ButtonLogic = {}));
exports.$input.on("keydown", event => {
    if (event.key == "Enter") {
        exports.$input.trigger("blur");
        switch (ButtonLogic.inputMode) {
            case "FORMULA": {
                ButtonLogic.onCompoundBtn();
                break;
            }
            case "COMPOUND": {
                ButtonLogic.onFormulaBtn();
                break;
            }
        }
    }
});
exports.$mutedSwitch.on("click", () => {
    mute = !exports.$mutedSwitch.is(":checked");
});
exports.$findFormulaBtn.on("click", ButtonLogic.onFormulaBtn);
exports.$findCompoundBtn.on("click", ButtonLogic.onCompoundBtn);
exports.$resetBtn.on("click", () => {
    exports.$execBtnsContainer.css({ "height": "150px", "opacity": 1 });
    exports.$input[0].scrollTo({ "behavior": "smooth" });
    ButtonLogic.inputEnable(true);
    ButtonLogic.reset();
    Explainer_1.$explaination.css({ "opacity": 0 });
    (0, exports.delay)(2000).then(() => __awaiter(void 0, void 0, void 0, function* () {
        Explainer_1.$explaination.empty();
        Explainer_1.$explaination.css({ "opacity": 1, "height": "0" });
        yield (0, exports.delay)(1000);
        Explainer_1.$explaination.css({ "opacity": 1, "height": "unset" });
    }));
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map