import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import PackageCard from "./PackageCard";
import { Button, ButtonGroup, Typography } from "@mui/material";

export default function PackageModal({ openModal, closeModal, taskData }) {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  const sendRequestHandler = () => {
    fetch(
      `http://127.0.0.1:8000/api/service/dashboard/customer/requests/${taskData.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify({
          action: "accept",
          package_id: selectedPackage,
        }),
      },
    )
      .then(async (response) => {
        if(response.status === 200){
          alert("درخواست شما با موفقیت ثبت شد!")
        }
      })
  
      closeModal()
  };

  const cancleRequestHandler = () => {
    fetch(
      `http://127.0.0.1:8000/api/service/dashboard/agent/requests/${taskData.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify({
          action: "reject",
        }),
      },
    ).then((response) => console.log(response));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/service/dashboard/customer/requests/",
          {
            headers: { Authorization: `Bearer ${user.access}` },
          },
        );
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };
    if (taskData) {
      fetchData();
    }
  }, [taskData, user.access]);


  return (
    <>
      <Modal open={openModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.default",
            width: "70%",
            maxWidth: "60rem",
            height: "70%",
            borderRadius: 3,
            p: 2,
          }}
        >
          {/* {console.log(taskData)} */}
          <Typography
            variant="h5"
            color="text.contrastText"
            fontWeight="bold"
            mb={1}
          >
            پکیج مورد نظر را انتخاب کنید
          </Typography>

          <PackageCard
            title="پکیج عادی"
            price={taskData?.packages[0].price}
            comment="تعمیرکار مورد تأیید + ۱ ماه گارانتی (نرخ اتحادیه)"
            bgColor="info.main"
            txtColor="text.primary"
            selected={selectedPackage === taskData?.packages[0].id}
            onSelect={() => setSelectedPackage(taskData.packages[0].id)}
          />
          <PackageCard
            title="پکیج نقره‌ای"
            price={taskData?.packages[1].price}
            comment="تعمیرکار با ۲ سال سابقه + ۳ ماه گارانتی (۲۰٪ الی ۴۰٪ بالاتر از نرخ اتحادیه)"
            bgColor="#C0C0C0"
            txtColor="#646464"
            selected={selectedPackage === taskData?.packages[1].id}
            onSelect={() => setSelectedPackage(taskData.packages[1].id)}
          />
          <PackageCard
            title="پکیج طلایی"
            price={taskData?.packages[2].price}
            comment="تعمیرکار با ۵ سال سابقه + ۶ ماه گارانتی (۵۰٪ الی ۸۰٪ بالاتر از نرخ اتحادیه)"
            bgColor="secondary.dark"
            txtColor="secondary.light"
            selected={selectedPackage === taskData?.packages[2].id}
            onSelect={() => setSelectedPackage(taskData.packages[2].id)}
          />

          <ButtonGroup variant="contained" fullWidth>
            <Button
              sx={{
                backgroundColor: "primary.main",
                color: "secondary.main",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "text.secondary",
                },
              }}
              onClick={sendRequestHandler}
            >
              ثبت درخواست
            </Button>
            <Button
              sx={{
                backgroundColor: "error.main",
                color: "secondary.light",
                "&:hover": {
                  backgroundColor: "error.dark",
                  color: "text.secondary",
                },
              }}
              onClick={cancleRequestHandler}
            >
              رد درخواست
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </>
  );
}
