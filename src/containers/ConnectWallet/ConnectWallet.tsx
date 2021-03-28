import React, {
  useCallback,
  useState,
  useEffect,
} from 'react';

import {
  useTezos,
  useConnect,
  useReady,
  useAccountPkh,
  useOnBlock,
} from '@utils/dapp';
import { NETWORK } from '@utils/defaults';
// import { shortize } from '@utils/helpers';
import { Button } from '@components/ui/Button';
import { AccountButton } from '@components/common/AccountButton';

type ConnectWalletProps = {
  className?: string
};

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ className }) => {
  const tezos = useTezos();
  const connect = useConnect();
  const ready = useReady();
  const accountPkh = useAccountPkh();
  const [balance, setBalance] = useState<string | null>(null);

  const loadBalance = useCallback(async () => {
    if (tezos && accountPkh) {
      const bal = await tezos.tz.getBalance(accountPkh);
      setBalance(tezos.format('mutez', 'tz', bal).toString());
    }
  }, [tezos, accountPkh, setBalance]);

  // Load initial
  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  // Reload when new block
  useOnBlock(tezos, loadBalance);

  const handleConnect = useCallback(async () => {
    try {
      await connect(NETWORK, { forcePermission: ready });
    } catch (err) {
      alert(err.message);
    }
  }, [ready, connect]);

  return (ready && accountPkh) ? (
    <AccountButton
      balance={balance}
      accountPkh={accountPkh}
      className={className}
      onClick={handleConnect}
    />
  ) : (
    <Button
      type="button"
      className={className}
      onClick={handleConnect}
    >
      Connect wallet
    </Button>
  );
};
