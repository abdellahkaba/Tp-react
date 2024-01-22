import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 
const Inscription = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const navigate = useNavigate()
    const onSubmit =  (data) => {
        if(data.password !== data.passwordConfirm) {
            toast.error("Les mots de pass ne correspondent pas !")
        }else{
                axios.get(`http://localhost:3000/utilisateurs?email=${data.email}`).then((res) => {
                if(res.data.length > 0) {
                    toast.error("Un compte existe dejà avec cette adress email !")
                    reset()
                }else{
                  axios.post('http://localhost:3000/utilisateurs', data).then((res) => {
                        console.log(res)
                        toast.success("Inscription reussi !")
                        reset()
                        navigate('/connexion');
                    }) 
                }
            })    
        }

       
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
                <Typography variant='h4'>Inscription</Typography>

                
                <form action="" style={{marginTop: 4}} onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={'column'} gap={2}> 
                    
                        <TextField id='filled-basic'
                            label='votre prenom'
                            variant='outlined' 
                            fullWidth size='small' 
                            {...register("prenom", {required: "*", minLength: { value: 5, message: "Veuillez saisir de plus de deux caractère"} })}
                            sx={{marginTop: 1}}>
                        </TextField>

                        <TextField id='filled-basic'
                         label='votre nom'
                          variant='outlined' 
                          fullWidth size='small'
                          {...register("nom", {required: "*"} )}
                           sx={{marginTop: 1}}>

                        </TextField> 
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

                        <TextField id='filled-basic' label='Confirmez le mot de pass' variant='outlined' 
                        fullWidth size='small' 
                        {...register("passwordConfirm", {required: "*"})}
                        sx={{marginTop: 1}} type='password'>
                        </TextField>
                    </Stack>
                    <Button variant="contained" sx={{marginTop: 1}} type='submit' >Inscrire</Button>
                </form>
               
            </Box>
        </Stack>
    );
}
 

 
export default Inscription;