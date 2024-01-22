import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

 
const Connexion = () => {

    useEffect(() => {
        if(localStorage.getItem("utilisateur")){
            navigate("/")
        }
    })

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate()
    const onSubmit =  (data) => {
        axios.get(`http://localhost:3000/utilisateurs?email=${data.email}&password=${data.password}`).then(res => {
            if(res.data.length > 0){
                // On stock les informations dans le navigateur de l'utilisateur 
                localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
                navigate("/")
                toast.success("Connexion reussi !")
                
            }else{
                toast.error("La connexion non établie ")
            }
        })
       
    }
      
    return (
        <Stack 
            alignItems={'center'}
            justifyContent={'center'}
            width={"100%"}
            height={"100vh"}
            backgroundColor={"#f5f5f5"}
        >
            <Box
                width={400}
                sx={{
                    backgroundColor: "#fff",
                    padding: 3

                }}
            >
                <Typography variant='h4'>Connexion</Typography>

                
                <form action="" style={{marginTop: 4}} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={'column'} gap={2}> 
                        <TextField id='filled-basic'
                         label='votre email' 
                         variant='outlined'
                          fullWidth size='small' 
                          type='email'
                          {...register("email", {required: "*"})}
                           sx={{marginTop: 1}}>
                        </TextField>

                        <TextField id='filled-basic'
                        label='Mot de pass'
                        variant='outlined'
                        fullWidth size='small'
                        type='password'
                        {...register("password", {required: "*"})}
                        sx={{marginTop: 1}}>
                        </TextField>
                    </Stack>
                    <Button variant="contained" sx={{marginTop: 1}} type='submit' >Inscrire</Button>
                    <Typography paddingTop={2}>Créer un compte <Link to="/inscription">Cliquer ici</Link> </Typography>
                </form>
               
            </Box>
        </Stack>
    );
}
 

 
export default Connexion;