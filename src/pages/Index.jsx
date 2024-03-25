import React, { useState } from "react";
import { Box, Heading, Text, Flex, Spacer, Button, useColorMode, Table, Thead, Tbody, Tr, Th, Td, Image, Grid, GridItem, Icon, Stack, Link } from "@chakra-ui/react";
import { FaMoon, FaSun, FaGasPump, FaStar } from "react-icons/fa";
import { cryptoData } from "../data/MockData";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sortConfig, setSortConfig] = useState({ key: "marketCap", direction: "descending" });

  const toggleFavorite = (name) => {
    const updatedCryptoData = cryptoData.map((crypto) => {
      if (crypto.name === name) {
        return { ...crypto, isFavorite: !crypto.isFavorite };
      }
      return crypto;
    });
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedCryptoData = [...cryptoData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box align="center">
      {}
      <Flex px={4} py={2} alignItems="center" justifyContent="space-between" maxWidth="1200">
        <Flex>
          <Text fontWeight="bold" mr={8}>
            Markets
          </Text>
          <Text fontWeight="bold" mr={8}>
            Blog
          </Text>
          <Text fontWeight="bold" mr={8}>
            Explore
          </Text>
          <Text fontWeight="bold">Learn</Text>
        </Flex>
        <Flex alignItems="center">
          <Flex alignItems="center" mr={4}>
            <Icon as={FaGasPump} mr={2} />
            <Text>ETH Gas [x Gwei]</Text>
          </Flex>
          <Button onClick={toggleColorMode} mr={4}>
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </Button>
          <Button variant="ghost" mr={4}>
            Login
          </Button>
          <Button bg="#8A2BE2" color="white">
            Sign up
          </Button>
        </Flex>
      </Flex>

      {}
      <Box textAlign="center" my={16} mx={8}>
        <Heading mb={4}>The Latest Crypto Market Data</Heading>
        <Text fontSize="xl" color="gray.600">
          The global cryptocurrency market cap today is $2.79 Trillion, a 7.2% change in the last 24 hours.📈
        </Text>
        <Box width="200px" mx="auto" mt={8}>
          <Box width="200px" height="100px" borderTopLeftRadius="100px" borderTopRightRadius="100px" borderWidth="10px" borderColor="gray.300" borderBottom="0" position="relative" boxSizing="border-box">
            <Text fontSize="6xl" fontWeight="bold" color="green.500" position="absolute" top="50%" left="50%" transform="translate(-50%, -70%)">
              87
            </Text>
          </Box>
          <Text mt={4} fontWeight="bold" color="grey">
            Extreme greed
          </Text>
        </Box>
      </Box>

      {/* Market data */}
      <Box overflowX="auto" maxWidth="1200">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>
                <Button onClick={() => requestSort("name")} variant="link">
                  Name
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("price")} variant="link">
                  Price
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange1h")} variant="link">
                  1h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange24h")} variant="link">
                  24h%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("percentChange7d")} variant="link">
                  7d%
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("marketCap")} variant="link">
                  Market Cap
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("volume24h")} variant="link">
                  Volume (24h)
                </Button>
              </Th>
              <Th>
                <Button onClick={() => requestSort("circulatingSupply")} variant="link">
                  Circulating Supply
                </Button>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedCryptoData.map((crypto) => (
              <Tr key={crypto.name}>
                <Td>
                  <Icon as={FaStar} color={crypto.isFavorite ? "yellow.400" : "gray.300"} onClick={() => toggleFavorite(crypto.name)} _hover={{ cursor: "pointer" }} />
                </Td>
                <Td>
                  <Text fontWeight="bold">{crypto.name}</Text>
                  <Text color="gray.500">{crypto.shortName}</Text>
                </Td>
                <Td>${crypto.price.toLocaleString()}</Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange1h >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange1h}%
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange24h >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange24h}%
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="bold" color={crypto.percentChange7d >= 0 ? "green.400" : "red.400"}>
                    {crypto.percentChange7d}%
                  </Text>
                </Td>
                <Td>${crypto.marketCap.toLocaleString()}</Td>
                <Td>${crypto.volume24h.toLocaleString()}</Td>
                <Td>{crypto.circulatingSupply.toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {}
      <Grid templateColumns="repeat(3, 1fr)" gap={8} my={16} mx={8} maxWidth="1200">
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
            <Heading size="md" mb={4}>
              ✨Top News
            </Heading>
            <Flex>
              <Image src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="News" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
              <Text>Bitcoin reaches new all-time high as institutional investors flock to crypto</Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
            <Heading size="md" mb={4}>
              🔥 Hot right now
            </Heading>
            <Stack spacing={2}>
              <Flex>
                <Text fontWeight="bold">1. Ethereum</Text>
                <Spacer />
                <Text color="green.500" fontWeight="bold">
                  +5.2%
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">2. Cardano</Text>
                <Spacer />
                <Text color="red.500" fontWeight="bold">
                  -2.1%
                </Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold">3. Polkadot</Text>
                <Spacer />
                <Text color="green.500" fontWeight="bold">
                  +8.7%
                </Text>
              </Flex>
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <Box borderWidth={1} borderColor="gray.200" boxShadow="md" p={4} borderRadius="md" h="100%">
            <Heading size="md" mb={4}>
              🎙️ Market Whispers
            </Heading>
            <Flex>
              <Image src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwyfHxjcnlwdG98ZW58MHx8fHwxNzExMzkwNjc3fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Podcast" borderRadius="md" boxSize={100} objectFit="cover" mr={4} />
              <Text>Tune in to our latest podcast episode discussing the future of DeFi</Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>

      {/* Footer */}
      <Box bg="gray.100" width="full">
        <Grid templateColumns="repeat(4, 1fr)" gap={8} color="gray.600" py={8} maxWidth="1200px" mx="auto" fontWeight="bold">
          <GridItem>
            <Text fontWeight="bold" mb={2}>
              Explore
            </Text>
            <Stack color="black">
              <Link>Cryptocurrencies</Link>
              <Link>Exchanges</Link>
              <Link>Wallets</Link>
              <Link>NFTs</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Tools</Text>
            <Stack color="black">
              <Link>Portfolio Tracker</Link>
              <Link>Price Alerts</Link>
              <Link>Tax Calculator</Link>
              <Link>Trading Simulator</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Support</Text>
            <Stack color="black">
              <Link>Help Center</Link>
              <Link>Contact Us</Link>
              <Link>FAQ</Link>
              <Link>Security</Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Text mb={2}>Company</Text>
            <Stack color="black">
              <Link>About Us</Link>
              <Link>Careers</Link>
              <Link>Blog</Link>
              <Link>Press</Link>
            </Stack>
          </GridItem>
        </Grid>
        <Flex justifyContent="center" color="gray.600" maxWidth="1200" mx="auto">
          <Text m="4">© 2023 CryptoMarket. All rights reserved.</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
