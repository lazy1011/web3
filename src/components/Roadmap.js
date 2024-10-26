import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { boxVariant, slideIn, staggerContainer } from "../Utils/motion";

const CheckboxData = [
  {
    heading: "Phase 1",
    title: null,
    checked: true,
  },
  {
    heading: null,
    title: "Team Foundation",
    checked: true,
  },
  {
    heading: null,
    title: "Idea analysis & initiation",
    checked: true,
  },
  {
    heading: null,
    title: "Market Fit Research",
    checked: true,
  },
  {
    heading: null,
    title: "Development of Project Plan",
      checked: true,
  },
  {
    heading: null,
    title: "Onboarding Advisors",
    checked: false,
  },
  {
    heading: "Phase 2",
    title: null,
      checked: true,
  },
  {
    heading: null,
    title: "Development of the Smart Contract",
       checked: true,
  },
  {
    heading: null,
    title: "Website Launch",
      checked: true,
  },
  {
    heading: null,
    title: "Development of Platform Infrastructure",
       checked: true,
  },
  {
    heading: null,
    title: "Launch and Test the platform",
    checked: true,
  },
  {
    heading: null,
    title: "Marketing campaigns ",
    checked: false,
  },
  {
    heading: "Phase 3",
    title: null,
    checked: false,
  },
  {
    heading: null,
    title: "Deployment of Anon Swap (ZK Snarks)",
    checked: false,
  },
  {
    heading: null,
    title: "Deployment on Multiple chains",
    checked: false,
  },
  {
    heading: null,
    title: "Development of MEV Free Gasless Bridge",
    checked: false,
  },
  {
    heading: null,
    title: "Partnerships",
    checked: false,
  },
  {
    heading: null,
    title: "CEX Listings",
    checked: false,
  },
];

const CustomCheckboxLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    color: "#fff",
  },
}));
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    color: "#fff",
  },
  "& .MuiIconButton-root.Mui-disabled": {
    color: "red",
  },
}));

const Roadmap = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div id="roadmap"></div>

      <Box
        sx={{
          background: "url(./roadmap-bg.png)",
          display: "flex",
          overflowX: "hidden",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0 60px",
          zIndex: "99",
        }}
        margin="-10px 0 0"
      >
        <motion.div variants={boxVariant(0.2)}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: { xs: "29px", lg: "35px", xl: "60px" },
              color: "#fff",
              marginBottom: "15px",
              padding: "18px",
            }}
          >
            Roadmap
          </Typography>
        </motion.div>
        <motion.div variants={slideIn("left", "tween", 0.3, 0.8)}>
          <Stack
            direction="row"
            gap="20px"
            sx={{
              display: "flex",
              flexDirection: { xs: "row" },
              justifyContent: { xs: "flex-start" },
              alignItems: { xs: "flex-start" },
              width: "100%",
              padding: { xs: "20px 0 0 30px", md: "" },
            }}
          >
            <Box
              sx={{
                borderLeft: "1px solid #fff",
                paddingLeft: "10px",
                marginRight: "10px",
              }}
            >
              <FormGroup
                sx={{
                  paddingLeft: "20px",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                {CheckboxData.map((element) => {
                  if (element.heading !== null) {
                    return (
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: { xs: "24px", xl: "37px" },
                          color: "#fff",
                          marginBottom: "10px",
                          marginTop: "35px",
                        }}
                      >
                        {element.heading}
                      </Typography>
                    );
                  } else {
                    if (element.checked) {
                      return (
                        <CustomCheckboxLabel
                          control={
                            <CustomCheckbox
                              disabled
                              defaultChecked
                              sx={{
                                color: "white",
                                "&.Mui-checked": { color: "white" },
                              }}
                            />
                          }
                          label={element.title}
                          style={{ color: "#fff" }}
                        />
                      );
                    } else {
                      return (
                        <CustomCheckboxLabel
                          control={
                            <CustomCheckbox
                              disabled
                              style={{
                                color: "white",
                                userSelect: "none",
                                "&.Mui-checked": { color: "#fff" },
                                "&.Mui-disabled": { color: "#fff" },
                              }}
                            />
                          }
                          label={element.title}
                          sx={{ color: "#fff" }}
                        />
                      );
                    }
                  }
                })}
              </FormGroup>
            </Box>
            {/* <Box
            component="img"
            sx={{
              display: { xs: "none", md: "block" },
              minHeight: "300px",
              width: "600px",
              objectFit: "contain",
              // zIndex: "9"
            }}
            alt="background-image"
            src={Robot}
          />  */}
          </Stack>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Roadmap;
