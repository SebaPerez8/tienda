import { Box, ChakraProvider, Container, Divider, Heading, Image, Text, VStack } from "@chakra-ui/react"
import { AppProps } from "next/app"
import theme from "../theme"
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} >
      <Box padding={4}>
        <Container
          borderRadius="sm"
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
        >
          <VStack marginBottom={6}>
            <Image borderRadius={999} src="//placehold.it/128x128"></Image>
            <Heading>Tienda</Heading>
            <Text>descripcion de la tienda</Text>
          </VStack>
          <Divider mariginY={6} />
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider >
  )
}
export default App