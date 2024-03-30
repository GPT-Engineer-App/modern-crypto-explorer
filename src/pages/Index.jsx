import React from "react";
import MarketTeaser from "../components/market/MarketTeaser";
import FearGreedIndexCard from "../components/market/cards/FearGreedIndexCard";
import WhaleWatchCard from "../components/market/cards/WhaleWatchCard";
import CryptoTable from "../components/market/CryptoTable";
import TradingTips from "../components/common/TradingTips";
import { Grid, Box, useBreakpointValue } from "@chakra-ui/react";
import CardSlider from "../components/layout/CardSlider";
import CryptoTrendCard from "../components/market/cards/CryptoTrendCard";

const Index = ({ assets, marketData }) => {
  const { bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap } = marketData;
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getTopAssets = (property, count) => assets.slice().sort((a, b) => b[property] - a[property]).slice(0, count);

  const winningCryptos = getTopAssets("changePercent24Hr", 3);
  const biggestDropCryptos = getTopAssets("changePercent24Hr", 3);
  const highVolumeCryptos = getTopAssets("volumeUsd24Hr", 3);

  const cryptoTrendCards = [
    { title: "🔥 Most Wanted", assets: winningCryptos, value: "changePercent24Hr" },
    { title: "💰 Highest Volume", assets: highVolumeCryptos, value: "volumeUsd24Hr", isColored: false },
    { title: "⚡Biggest Drop", assets: biggestDropCryptos, value: "changePercent24Hr" }
  ].map((config, index) => <CryptoTrendCard key={index} {...config} />);

  const mobileCards = (
    <CardSlider cards={[
      <FearGreedIndexCard bitcoinData={bitcoinData} btcDominance={btcDominance} ethDominance={ethDominance} totalVolume={totalVolume} marketDirection={marketDirection} totalMarketCap={totalMarketCap} />,
      <WhaleWatchCard />,
      ...cryptoTrendCards,
    ]} />
  );

  const desktopCards = (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} my={2} alignItems="center">
      <CardSlider cards={cryptoTrendCards} hasAutoSlide="true" hasPoints="true" slideInterval={6000} />
      <FearGreedIndexCard {...{ bitcoinData, btcDominance, ethDominance, totalVolume, marketDirection, totalMarketCap }} />
      <WhaleWatchCard />
    </Grid>
  );

  return (
    <Box mx="auto" maxWidth="1200px">
      <MarketTeaser assets={assets} mb={4} />
      <Box my={2} height="210px">
        {isMobile ? mobileCards : desktopCards}
      </Box>
      <CryptoTable assets={assets} />
      <TradingTips />
    </Box>
  );
};

export default Index;
