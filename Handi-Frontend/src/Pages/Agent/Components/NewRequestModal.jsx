import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import PackageCard from "./PackageCard";
import { Button, Typography } from "@mui/material";
import { BorderClear } from "@mui/icons-material";

export default function NewRequestModal({ openModal, closeModal, task }) {
  const { user } = useContext(UserContext);
  const [requests, setRequests] = useState([]);

  const [normalTechID, setNormalTechID] = useState(null);
  const [silverTechID, setSilverTechID] = useState(null);
  const [goldTechID, setGoldTechID] = useState(null);

  const registerRequestHandler = () => {
    console.log("task ID: ", task);
    console.log("normal: ", normalTechID);
    console.log("silver: ", silverTechID);
    console.log("gold: ", goldTechID);

    fetch(
      `http://127.0.0.1:8000/api/service/dashboard/agent/tasks/${task.id}/accept/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify({
          packages: [
            {
              package_type: "normal",
              technician_id: normalTechID,
              price: 1500,
            },
            {
              package_type: "silver",
              technician_id: silverTechID,
              price: 2500,
            },
            {
              package_type: "gold",
              technician_id: goldTechID,
              price: 3500,
            },
          ],
        }),
      },
    )
      .then(async (response) => {
        const text = await response.text();

        console.log("RAW response:", text);
        console.log(response);
        

        try {
          const json = JSON.parse(text);
          return json;
        } catch (err) {
          console.error("Response is NOT JSON");
          throw new Error("Server returned non-JSON response");
        }
      })
      .then((data) => {
        console.log("response data:", data);
        closeModal();
      })
      .catch((error) => console.error("Fetch error:", error));
  };

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
          <Typography
            variant="h5"
            color="text.contrastText"
            fontWeight={"bold"}
            mb={1}
          >
            تخصیص به تکنسین ها
          </Typography>

          <PackageCard
            title="پکیج عادی"
            comment="تعمیرکار مورد تآیید + ۱ ماه گارانتی (نرخ اتحادیه)"
            technicians={user.technicians}
            bgColor="info.main"
            txtColor="text.primary"
            value={normalTechID}
            onChange={(e) => setNormalTechID(e.target.value)}
          />
          <PackageCard
            title="پکیج نقره‌ای"
            comment="تعمیرکار با ۲ سال سابقه + ۳ ماه گارانتی (۲۰٪ الی ۴۰٪ بالاتر از نرخ اتحادیه)"
            technicians={user.technicians}
            bgColor="#C0C0C0"
            txtColor="#646464"
            value={silverTechID}
            onChange={(e) => setSilverTechID(e.target.value)}
          />
          <PackageCard
            title="پکیج طلایی"
            comment="تعمیرکار با ۵ سال سابقه + ۶ ماه گارانتی (۵۰٪ الی ۸۰٪ بالاتر از نرخ اتحادیه)"
            technicians={user.technicians}
            bgColor="secondary.dark"
            txtColor="secondary.light"
            value={goldTechID}
            onChange={(e) => setGoldTechID(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              backgroundColor: "primary.main",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "primary.light",
                color: "text.secondary",
              },
            }}
            onClick={registerRequestHandler}
          >
            ثبت اطلاعات
          </Button>
        </Box>
      </Modal>
    </>
  );
}
