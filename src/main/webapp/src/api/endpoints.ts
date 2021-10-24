const endpoints = {
  game: {
    init: "/game/init",
    progress: "/game/progress",
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
  country: {
    flag: (tag: string) => `/country/${tag}/flag`,
    edit: (tag: string) => `/country/${tag}/edit`,
  },
  missionsTree: {
    edit: (name: string) => `/missions-tree/${name}/edit`,
  },
  mission: {
    edit: (name: string) => `/mission/${name}/edit`,
  },
};

export default endpoints;
