import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function HeroSection() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        py: 10,
        backgroundImage: "url('/pictures/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" color="contrastText" mb={2}>
        تعمیرات سریع و مطمئن لوازم خانگی شما
      </Typography>
      <Typography variant="h6" color="contrastText" mb={3}>
        از بهترین تکنسین‌ها خدمات باکیفیت دریافت کنید
      </Typography>
      <Box>
        <Button variant="contained" color="secondary" size="large">
          ثبت درخواست تعمیر
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          width: "90vw",
          backgroundColor: "primary.light",
          mt: "2rem",
          p: "2rem",
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h2" fontSize="2rem" color="secondary.light">
          قوانین و شرایط پکیج‌ها
        </Typography>
        <Box
          sx={{
            backgroundColor: "#8cd6ff",
            mt: "2rem",
            width: "98%",
            borderRadius: ".3rem",
          }}
        >
          <Typography variant="h6" p="1rem">
            پکیج معمولی
          </Typography>
          <Typography variant="body2" p="1rem">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#C0C0C0",
            mt: "2rem",
            width: "98%",
            borderRadius: ".3rem",
          }}
        >
          <Typography variant="h6" p="1rem">
            پکیج نقره‌ای
          </Typography>
          <Typography variant="body2" p="1rem">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "secondary.dark",
            mt: "2rem",
            width: "98%",
            borderRadius: ".3rem",
          }}
        >
          <Typography variant="h6" p="1rem">
            پکیج طلایی
          </Typography>
          <Typography variant="body2" p="1rem">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
