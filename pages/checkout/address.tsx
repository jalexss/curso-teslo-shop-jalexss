import { useContext, useEffect } from "react";
import { Typography, Grid, TextField, FormControl, MenuItem, Select, Box, Button } from "@mui/material"
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ShopLayout } from "../../components/layouts"
import { CartContext } from "../../context";
import { countries } from "../../utils"

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = ():FormData => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    address2: Cookies.get('address2') || '',
    zip: Cookies.get('zip') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage = () => {

  const router =useRouter();
  const { updateAddress } = useContext( CartContext )

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  useEffect(()=> {
    reset(getAddressFromCookies());
  }, [reset])

  const onSubmit = (data:FormData) => {

    updateAddress( data );
    router.push('/checkout/summary');
  }

  return (
    <ShopLayout title="Direccion" pageDescription="Confirmar direccion del destino" >
      <form noValidate onSubmit={ handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1" >Direccion</Typography>
        <Grid container spacing={2} sx={{mt:2}}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Nombre" 
              variant="filled" 
              fullWidth 
              { 
                ...register('firstName', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.firstName }
              helperText={ errors.firstName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Apellido" 
              variant="filled" 
              fullWidth 
              { 
                ...register('lastName', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.lastName }
              helperText={ errors.lastName?.message }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField 
              label="Direccion" 
              variant="filled" 
              fullWidth 
              { 
                ...register('address', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.address }
              helperText={ errors.address?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Direccion 2 (opcional)" 
              variant="filled" 
              fullWidth 
              { ...register('address2') }
              error={ !!errors.address2 }
              helperText={ errors.address2?.message }
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Ciudad" 
              variant="filled" 
              fullWidth 
              { 
                ...register('city', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.city }
              helperText={ errors.city?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Codigo Postal" 
              variant="filled" 
              fullWidth 
              { 
                ...register('zip', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.zip }
              helperText={ errors.zip?.message }
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth >
              <TextField
                select
                variant="filled"
                label="Pais"
                key={Cookies.get('country') || countries[0].code}
                defaultValue={ Cookies.get('country') || countries[0].code }
                { 
                  ...register('country', { 
                    required: 'Este campo es requerido',
                  })
                }
                error={ !!errors.country }
                // helperText={ errors.country?.message }
              >
                {
                  countries.map( country => (
                    <MenuItem 
                      key={ country.code }
                      value={ country.code }
                    >
                      { country.name }
                    </MenuItem>
                  ))
                }
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Telefono" 
              variant="filled" 
              fullWidth 
              { 
                ...register('phone', { 
                  required: 'Este campo es requerido',
                })
              }
              error={ !!errors.phone }
              helperText={ errors.phone?.message }
            />
          </Grid>

          <Box 
            display="flex"
            justifyContent="center"
            sx={{ mt: 5 }}
          >
            <Button 
              color="secondary" 
              className="circular-btn" 
              size="large"
              type="submit"
            >
              Revisar pedido
            </Button>
          </Box>
        </Grid>
      </form>
    </ShopLayout>
  )
}

export default AddressPage