import React from "react"
import { Grid, Stack, Text, Button, Link, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import api from "../product/api";

import { Product } from "../product/types";


interface Props {
  products: Product[];

}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })

}

const IndexRoute: React.FC<Props> = ({ products }) => {
  const [cart, setCart] = React.useState<Product[]>([]);

  const text = React.useMemo(
    () =>
      cart.reduce((message, product) => message.concat(`*${product.title} - ${parseCurrency(product.price)}\n`), ``)
        .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product) => total + product.price, 0))}`)
    , [cart]);


  return (
    <Stack spacing={6}>
      <Grid gridGap={6} templateColumns="repeat(auto-fill,minmax(240px, 1fr))">{products.map(product =>
        <Stack spacing={3} borderRadius="md" padding={4} key={product.id} backgroundColor="gray.100">
          <Stack spacing={1}>
            <Text>{product.title}</Text>
            <Text color="green.500" fontSize="md" fontWeight="500">{parseCurrency(product.price)}</Text>
          </Stack>
          <Button colorScheme="primary" onClick={() => setCart(cart => cart.concat(product))}>Agregar</Button>
        </Stack>)}
      </Grid>
      {Boolean(cart.length) && (
        <Flex position="sticky" bottom={4} justifyContent="center" alignItems="center">
          <Button
            width="fit-content%"
            isExternal
            colorScheme="whatsapp"
            as={Link}
            href={`https://wa.me/543516999027?text=${encodeURIComponent(text)}`}>
            Completar pedido ({cart.length} productos)
        </Button>
        </Flex>
      )}
    </Stack>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    props: {
      products
    }
  }

}

export default IndexRoute;