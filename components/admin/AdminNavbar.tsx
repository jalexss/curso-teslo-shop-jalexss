import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import { UiContext } from "../../context";

export const AdminNavbar = () => {
  const { toogleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link alignItems="center" display="flex">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={toogleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
