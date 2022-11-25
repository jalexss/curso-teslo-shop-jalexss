import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { validations } from '../../utils';

type FormData = {
  email: string,
  password: string,
};

const LoginPage = () => {
  
  const router = useRouter()
  // const { loginUser } = useContext( AuthContext );

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});

  useEffect( ()=> {
    getProviders().then( prov => {
      // console.log({prov});
      setProviders(prov)
    })
  }, [])

  const onLoginUser = async( { email, password }: FormData ) => {
    
    setShowError(false);

    // const isValidLogin = await loginUser( email, password );

    // if( !isValidLogin ) {

    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    // }


    // //TODO: NAVEGAR A LA PANTALLA QUE EL USUARIO ESTABA
    // const destination = router.query.p?.toString() || '/';
    // router.replace(destination);
    await signIn('credentials', { email, password })
  }

  return (
    <AuthLayout title={'Ingresar'}>
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate >
        <Box sx={{ width: 350, p: '10px 20px' }}>
          <Grid container spacing={2} >
            <Grid item xs={12} >
              <Typography variant="h1" component="h1" >Log In</Typography>
              <Chip
                label="no reconocemos este user / password"
                color="error"
                icon={ <ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email" 
                label="email" 
                variant="filled" 
                fullWidth 
                { 
                  ...register('email', {
                      required: 'Este campo es requerido',
                      validate: validations.isEmail 
                    })
                }
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                label="Password" 
                type="password"
                variant="filled" 
                fullWidth 
                { 
                  ...register('password', {
                    required: 'Este campo es requerido',
                    minLength: { value: 6, message: 'minimo 6 characters'}
                  })
                }
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                color="secondary" 
                className="circular-btn" 
                type="submit"
                size="large" 
                fullWidth 
              >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink 
                href={ router.query.p ? `/auth/register?p=${ router.query.p}` : '/auth/register' }  
                passHref
              >
                <Link underline="always">
                  No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
              <Divider sx={{ width: '100%', mb: 2 }}><Typography variant='subtitle2' color="GrayText"> Or </Typography></Divider>
              {
                Object.values( providers ).map(( provider: any )=> {

                  if( provider.id === "credentials" ) return (<div key="credentials"></div>)
                  
                  return (
                    <Button
                      key={ provider.id }
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={ () => signIn( provider.id )}
                    >
                      { provider.name}
                    </Button>
                  )
                })
              }
            </Grid>


          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req })

  const { p = '/' } = query;

  if( session ) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default LoginPage