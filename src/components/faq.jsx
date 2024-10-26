import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";
const Data = [
  {
    title: "What is 0xGasless and how does it work?",
    content:
      "0xGasless is web3 protocol using which you can swap tokens without paying the gas. It is powered by account abstraction technology.",
  },
  {
    title: "What is account abstraction?",
    content:
      "Account abstraction is a way to solve these problems by allowing users to flexibly program more security and better user experiences into their accounts. This helps in batching txs and enabling gasless transactions.",
  },
];

export default function FAQ() {
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        id="faq"
      >
        <Stack
          sx={{
            backgroundImage: `url('background2.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            overflowX: "hidden",
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundColor: "black",
            alignItems: "center",
            width: "100%",
          }}
        >
          <motion.div variants={boxVariant(0.2)}>
            <Typography
              color="white"
              sx={{
                margin: "32px 0px",
                fontFamily: "DM Mono",
                fontSize: { sm: "40px", xs: "20px" },
              }}
            >
              Frequently Asked Questions
            </Typography>
          </motion.div>
          <Stack sx={{ gap: "15px", padding: "40px" }}>
            {Data.map((faq) => {
              return (
                <>
                  <motion.div variants={boxVariant(0.4)}>
                    <Accordion sx={{ background: "none", color: "white" }}>
                      <AccordionSummary
                        expandIcon={<AddIcon sx={{ color: "white" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography
                          sx={{ fontSize: { sm: "20px", xs: "16px" } }}
                        >
                          {faq.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          sx={{ fontSize: { sm: "18px", xs: "14px" } }}
                        >
                          {faq.content}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Divider sx={{ backgroundColor: "white" }} />
                  </motion.div>
                </>
              );
            })}
          </Stack>
        </Stack>
      </motion.div>
    </>
  );
}
