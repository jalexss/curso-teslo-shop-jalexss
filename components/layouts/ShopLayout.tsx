import Head from "next/head"
import { FC, ReactNode } from "react";
import { Navbar, SideBarMenu } from "../ui";

interface Props {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
  children?: ReactNode;
}

export const ShopLayout:FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={ pageDescription} />
        <meta name="og:title" content={ title } />
        <meta name="og:description" content={ pageDescription } />

        {
          imageFullUrl && (
            <meta name="og:image" content={ imageFullUrl } />
          )
        }
      
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideBarMenu />

      <main 
        style={{
          margin: '88px auto',
          maxWidth: '1440px',
          padding: '0px 30px'
        }} 
      >
        {children}
      </main>

      <footer>
        {/* TODO: custom footer */}
      </footer>
    </>
  )
}