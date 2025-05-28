import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import GavelIcon from '@mui/icons-material/Gavel';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#101e54', color: '#ffffff', pt: 3, pb: 2 }}>
      <Container maxWidth="lg" sx={{marginLeft:3}}>
        <Grid container spacing={5}>

          {/* Community Section */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt:-1 }}>
           
            </Typography>
            <Stack spacing={1.8} mt={1}>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                <FeedbackIcon sx={{ mr: 0.7 }} fontSize="small" /> Feedback
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                <MenuBookIcon sx={{ mr: 0.7 }} fontSize="small" /> Guides
              </Link>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
                <HelpOutlineIcon sx={{ mr: 0.7 }} fontSize="small" /> FAQs
              </Link>
            </Stack>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" gutterBottom sx={{ fontSize: '13px', marginTop:'-2px' }}>
              &copy; {new Date().getFullYear()} All rights reserved
            </Typography>
            <Stack spacing={1} mt={2}>
              <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '13px', display: 'flex', alignItems: 'center' , marginTop:'-1.5px'}}>
                <GavelIcon sx={{ fontSize: '16px',mr: 0.7,marginTop:'-4px' }} fontSize="small" /> Terms of Use
              </Link>
            </Stack>
          </Grid>

          {/* Optional Spacer */}
          <Grid item xs={12} md={3} />

        </Grid>

        <Divider sx={{ my: 3, borderColor: '#195a3d' }} />

        <Box display="flex" justifyContent="space-between" flexWrap="wrap" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Link href="#" color="inherit" underline="hover" sx={{ fontSize: '13px', display: 'flex', alignItems: 'center' }}>
             StricBuzz by Usman Shaik ヅ
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
