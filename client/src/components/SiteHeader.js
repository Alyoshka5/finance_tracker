import { Box, Typography } from "@mui/material";
import logo from '../images/Logo.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SiteHeader() {
    const navigate = useNavigate();
    const [hovering, setHovering] = useState(false);

    return (
        <Box style={{display: 'flex', gap: '1rem', alignItems: 'center', cursor: hovering ? 'pointer' : ''}}
            onClick={() => navigate('/')}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <img src={logo} style={{width: '2.5rem'}} />
            <Typography variant='h3' style={{fontSize: '1.8rem'}}>LUTE</Typography>
        </Box>
    );
}