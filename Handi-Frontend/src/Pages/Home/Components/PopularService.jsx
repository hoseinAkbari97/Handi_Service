import React from 'react'
import { Container, Grid, Typography, Card } from "@mui/material";
import { Build } from "@mui/icons-material";

export default function PopularService() {
  return (
    <Container sx={{ py: 8 }}>
    <Typography variant="h5" align="center" fontWeight="bold" mb={4} color="primary.main">
      خدمات پرطرفدار
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {[
        { title: "تعمیر یخچال", icon: <Build fontSize="large" color="secondary" /> },
        { title: "تعمیر لباسشویی", icon: <Build fontSize="large" color="secondary" /> },
        { title: "تعمیر کولر گازی", icon: <Build fontSize="large" color="secondary" /> },
        { title: "نصب تلویزیون", icon: <Build fontSize="large" color="secondary" /> },
      ].map((service, i) => (
        <Grid item xs={6} sm={3} key={i}>
          <Card
            sx={{
              textAlign: "center",
              py: 3,
              backgroundColor: "background.paper",
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
            }}
          >
            {service.icon}
            <Typography mt={1}>{service.title}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
  )
}
