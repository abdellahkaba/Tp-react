
import { Avatar, Box, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./navbar"
import AddPublication from "./addPublication"
import axios from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Key } from "@mui/icons-material"


const Dashboard = () => {
    const navigate = useNavigate()

    //Appel de de nos publicatons

    // const [publications,setPublications] = React.useState([])

    // verification si l'utilisateur n'est pas authentifier ne pourra pas acceder au dashboard
    useEffect(() => {
        if(!localStorage.getItem("utilisateur")){
            navigate("/connexion")
        }
    })

      // Access the client
        const queryClient = useQueryClient()
        const {data: publications, error,isLoading} = useQuery({
            queryKey: ['publications'],
            queryFn: ()=> axios.get("http://localhost:3000/publications").then((res) => res.data),
            
        })
        if(isLoading) {
            return <div>Chargement....</div>
        }

    return (
        <Box>
            <Navbar></Navbar>
            <AddPublication />
            <Box width={"60%"} margin={"auto"}>
                {publications.map((publication)  =>  ( 
                <Box width={"100%"}
                 bgcolor={"#ffff"}
                 borderRadius={4} 
                 marginBottom={3}
                 padding={2}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={2}>
                        <Avatar src={publication.photoUtilisateur} />
                        <Typography>{publication.auteur}</Typography>
                    </Stack>
                    <Typography>{publication.contenu}</Typography>
                    <img src={publication.imageUrl}  />
                </Box>))}
            </Box>
        </Box>
    )

}

export default Dashboard