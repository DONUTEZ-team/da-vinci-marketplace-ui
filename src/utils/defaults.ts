export enum NetworkType {
  MAINNET = 'mainnet',
  DELPHINET = 'delphinet',
  EDONET = 'edo2net',
  CUSTOM = 'custom',
}

export const BLOCK_INTERVAL = 60000;

export const APP_NAME = 'Da Vinci Marketplace';

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK as NetworkType;
export const NETWORK_RPC = process.env.NEXT_PUBLIC_NETWORK_RPC!;
