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
  },
};

export default endpoints;
