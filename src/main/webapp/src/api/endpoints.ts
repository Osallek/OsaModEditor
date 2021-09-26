const endpoints = {
  game: {
    init: "/game/init",
    changeDefines: "/game/defines",
  },
  province: {
    changeOwner: "/province/change-owner",
    changeController: "/province/change-controller",
    changeOwnerAndController: "/province/change-owner-controller",
    changeOwnerAndControllerAndCore: "/province/change-owner-controller-core",
    addToHre: "/province/add-hre",
    removeFromHre: "/province/remove-hre",
    changeTradeGood: "/province/change-trade-good",
    changeReligion: "/province/change-religion",
    changeCulture: "/province/change-culture",
    decolonize: "/province/decolonize",
    changeTradeNode: "/province/change-trade-node",
    changeArea: "/province/change-area",
    changeColonialRegion: "/province/change-colonial-region",
    removeColonialRegion: "/province/remove-colonial-region",
    changeTradeCompany: "/province/change-trade-company",
    removeTradeCompany: "/province/remove-trade-company",
    changeWinter: "/province/change-winter",
    changeMonsoon: "/province/change-monsoon",
    changeClimate: "/province/change-climate",
    changeTerrain: "/province/change-terrain",
  },
};

export default endpoints;
