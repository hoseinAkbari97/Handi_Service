import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import {
  Kitchen,
  LocalLaundryService,
  SevereCold,
  Tv,
} from "@mui/icons-material";

export default function PopularService() {
  const services = [
    {
      title: "تعمیر یخچال",
      icon: <Kitchen fontSize="large" color="secondary" />,
    },
    {
      title: "تعمیر لباسشویی",
      icon: <LocalLaundryService fontSize="large" color="secondary" />,
    },
    {
      title: "تعمیر کولر گازی",
      icon: <SevereCold fontSize="large" color="secondary" />,
    },
    {
      title: "نصب تلویزیون",
      icon: <Tv fontSize="large" color="secondary" />,
    },
  ];

  return (
    <Container sx={{ pb: 8 }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight="bold"
        mb={4}
        color="primary.main"
      >
        خدمات پرطرفدار
      </Typography>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        {services.map((service, index) => (
          <Box key={index}>
            <Card
              sx={{
                textAlign: "center",
                py: 3,
                backgroundColor: "primary.main",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
              }}
            >
              {service.icon}
              <Typography mt={1}>{service.title}</Typography>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
