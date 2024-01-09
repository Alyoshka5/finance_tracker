import { Box, Typography } from "@mui/material";
import logo from '../images/Logo.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SiteHeader() {
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);

    return (
        <Box style={{display: 'flex', gap: '0.6rem', alignItems: 'center', cursor: hovering ? 'pointer' : ''}}
            onClick={() => navigate('/')}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <img src={logo} style={{width: '2.2rem'}} />
            <Typography variant='h3' style={{fontSize: '1.6rem'}}>LUTE</Typography>
        </Box>
    );
}