//Track Addresses (Fill in present addresses to prevent new deplopyment)
const contractAddr: any = {
  rinkeby: {
      game:"0x4650e8FC59AbfD38B90712501225Fd19562C97AC",  //D2.91
      claim:"0xF1326573800a70bbeDF360eCF6cdfCbE20459945",  //D2.8
      task: "0xc5a8f704cc85e2e9630Af03e975344594c96C8D5", //D1.0
      hub:"0xadE0EE8E93bC6EeB87c7c5279B36eA7977fCAF96", //D4.6 (Proxy)
      avatar:"0x0665dfc970Bd599e08ED6084DC12B2dD028cC416",  //D2.8 (Proxy)
      history:"0xD7ab715a2C1e5b450b54B1E3cE5136D755c715B8", //D4.4 (Proxy)
  },
  goerli:{
    game: "0xDB4236A452aD591F39d04F758D3A8aBc92EC4bd4", //D220721
    claim: "0x8761b3E3bCDd243A063f18d5C24528C1400FA95B", //D220721
    task: "0x848bCc3a27724B09415e030cDeCe669b87a4Fe47", //D220721
    hub: "0x4F1b5C2b4925D077226144466eA576Ff8f3eEA78", //D220721
    avatar: "0x93f5D16e5c590849CdCb4c0CC5666C4c927c92B8", //D220721
    history:"0xce5F671e5e2C9c122e09Fe323aB0840155ab1D60", //D220721
  },
  mumbai:{
    game: "0x57d1469c53Bb259Dc876A274ADd329Eb703Ab286", // D2.91
    claim: "0xED7621062a097f95183edC753e185B4f75d4B637", // D2.8
    task: "",
    hub: "0x47307dEBB584C680E51dAFb167622ce9633c2Acf", // D4.6 (Proxy)
    avatar: "0xFe61dc25C3B8c3F990bCea5bb901704B2a8b9Bd2", // D2.8 (Proxy)
    history: "0x95BD98a656C907fC037aF87Ea740fD94188Cd65f", // D4.4 (Proxy)
  },
  optimism:{
    game: "",
    claim: "",
    task: "",
    hub: "",
    avatar: "",
    history:"",
  },
  optimism_kovan:{
    game: "0x086C1A95773a1ec76F5D8C7350B5D220cbcc640A",
    claim: "0xCC32bD878C0781800A38249Cdb206A844678E5F1",
    task: "",
    hub: "0x145b34E3BB516FBC47968984dbe0b463f03F32cF",
    avatar: "0x93f5D16e5c590849CdCb4c0CC5666C4c927c92B8",
    history: "0xce5F671e5e2C9c122e09Fe323aB0840155ab1D60",
  },
};

export default contractAddr;