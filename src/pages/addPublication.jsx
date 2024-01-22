import { Button, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

 
const AddPublication = () => {
    //On récupère d'abord la valeur de l'utilisateur qui est connecté
    const user = JSON.parse(localStorage.getItem('utilisateur'))
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const onSubmit = (data) => {
        //Ajouter d'autre information sur ma publication
        const publication = {
            ...data,
            id: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.prenom
        }
        axios.post("http://localhost:3000/publications", publication).then((res) =>{
            console.log(res)
            toast.success("La publication effectuée avec success !")
            reset()
        })
    }

    return <Stack width={"60%"} margin={"auto"}>
        <h2>Ajouter un publication</h2>
        <form style={{
            marginTop: 4
        }}
        onSubmit={handleSubmit(onSubmit)}
        >
            <Stack gap={2}>
            <TextField
                id='filled-basic'
                label="Veuillez saisir votre titre"
                variant='outlined'
                fullWidth
                size='small'
                type='text'
                multiline
                rows={3}
                {...register("contenu", {required: "Veuillez saisir du text", 
                minLength: {
                    value: 3,
                    message: "Veuillez saisir plus de 5"
                }})}
            >
                
            </TextField>

            <TextField
                id='filled-basic'
                label="Saisir l'Url de l'image"
                variant='outlined'
                fullWidth
                size='small'
                type='text'
                {...register("imageUrl", {required: "Veuillez saisir l'Url de l'image"})}
            >  
            </TextField>
            <Button variant='contained' type='submit'>Publier</Button>
            </Stack>
        </form>
    </Stack>
}
 

 
export default AddPublication;