"use client"

import { Header } from "@/app/component/header";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { ListVote } from "@/app/component/list-vote";

// 定义本地 Hardhat 网络
const localhost = {
  id: 31337,
  name: 'Local Hardhat',
  network: 'localhost',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
  },
}

const config = getDefaultConfig({
  appName: 'vote',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base, localhost],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex flex-col gap-4 w-full h-full">
            <Header className="sticky top-0 shadow-sm" />
            <div className="flex-1 p-4">
              <ListVote />
            </div>
          </div>
          <Toaster position="bottom-right" />        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
