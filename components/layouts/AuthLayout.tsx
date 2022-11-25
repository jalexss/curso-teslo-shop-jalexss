import { FC, ReactNode } from "react";
import Head from "next/head";
import { Box } from "@mui/material";

interface Props {
  title: string;
  children?: ReactNode;
}

export const AuthLayout:FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <main>
        <Box display="flex" justifyContent="center" alignItems="center" height="calc(100v - 200px)">
          {children}
        </Box>
      </main>
    </>
  )
}
