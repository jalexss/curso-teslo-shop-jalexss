import { ShopLayout } from "../../components/layouts"
import { Typography } from '@mui/material';
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";


const kidPage = () => {

  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title="Categoria - Kid" pageDescription="toda la ropa para kids" >
      <Typography variant='h1' component='h1'>
        Kids
      </Typography>
      <Typography variant='h2' sx={{mb: 1}} >
        Todos los productos
      </Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  )
}

export default kidPage