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

// Contracts
export const FA2_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_FA2_TOKEN!;
export const AUCTION_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_AUCTION_TOKEN!;
export const MARKETPLACE_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_TOKEN!;

// Pagination settings
export const ITEMS_PER_PAGE = 2;
