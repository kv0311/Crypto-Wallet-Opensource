const endpointsMap: Record<
  'fiat' | 'wss' | 'covalent' | 'server',
  { prd: string; test: string }
> = {
  fiat: {
    // prd: 'http://18.139.115.33:4090/api',
    // test: 'http://18.139.115.33:4090/api',
    prd: 'https://wallet.camly.co/api',
    test: 'https://wallet.camly.co/api',
  },
  wss: {
    prd: 'wss://api.onekeycn.com',
    test: 'wss://api-sandbox.onekeytest.com',
  },
  covalent: {
    prd: 'https://wallet.camly.co/api/covalent',
    // test: 'https://node.onekeytest.com/covalent/client1-HghTg3a33',
    test: 'https://wallet.camly.co/api/covalent',
  },
  server: {
    prd: 'https://wallet.camly.co',
    test: 'https://wallet.camly.co',
  },
};

let endpoint = '';
let serverEndpoint = '';
let websocketEndpoint = '';
let covalentApiEndpoint = '';

export const switchTestEndpoint = (isTestEnable?: boolean) => {
  const key = isTestEnable ? 'test' : 'prd';
  endpoint = endpointsMap.fiat[key];
  serverEndpoint = endpointsMap.server[key];
  websocketEndpoint = endpointsMap.wss[key];
  covalentApiEndpoint = endpointsMap.covalent[key];
};

switchTestEndpoint(false);

export const getFiatEndpoint = () => endpoint;
export const getSocketEndpoint = () => websocketEndpoint;
export const getCovalentApiEndpoint = () => covalentApiEndpoint;
export const getServerEndpoint = () => serverEndpoint;
