import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { ProductList } from "../../components/products";

const MenPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout title="Categoria - Men" pageDescription="toda la ropa para men">
      <Typography variant="h1" component="h1">
        Men
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
