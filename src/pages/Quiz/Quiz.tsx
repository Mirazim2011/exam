// // import { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import API from "../../utils/config";
// // import {
// //   Box,
// //   Button,
// //   ButtonGroup,
// //   Card,
// //   FormControl,
// //   FormControlLabel,
// //   Modal,
// //   Radio,
// //   RadioGroup,
// //   Typography,
// // } from "@mui/material";
// // import { Link } from "react-router-dom";
// // const style = {
// //   position: "absolute",
// //   top: "50%",
// //   left: "50%",
// //   transform: "translate(-50%, -50%)",
// //   width: 470,
// //   bgcolor: "background.paper",
// //   border: "2px solid #000",
// //   boxShadow: 24,
// //   p: 4,
// // };

// // const Quiz = () => {
// //   interface fullQuestionDataType {
// //     question: string;
// //     incorrect_answers: string[];
// //     correct_answer: string;
// //   }
// //   interface choosenAnswerDataType {
// //     question: string;
// //     options: string[];
// //     correct_answer: string;
// //     current_answer: string;
// //   }

// //   const [fullQuestionData, setFullQuestionData] = useState<
// //     fullQuestionDataType[]
// //   >([]);
// //   const [choosenAnswerData, setChoosenAnswerData] = useState<
// //     choosenAnswerDataType[]
// //   >([]);
// //   const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);

// //   const questionData = useSelector((state: any) => state.question);

// //   const [count, setCount] = useState(0);
// //   const [open, setOpen] = useState(false);
// //   const [check, setCheck] = useState<boolean>(false);

// //   function decode(str: string) {
// //     const txt = document.createElement("textarea");
// //     txt.innerHTML = str;
// //     return txt.value;
// //   }

// //   useEffect(() => {
// //     let shuffleData = fullQuestionData.map((el) => {
// //       let variants = [
// //         ...el.incorrect_answers.map((el) => decode(el)),
// //         decode(el.correct_answer),
// //       ];
// //       variants.sort(() => Math.random() - 0.5);
// //       return {
// //         question: decode(el.question),
// //         options: variants,
// //         correct_answer: el.correct_answer,
// //         current_answer: "",
// //       };
// //     });
// //     setChoosenAnswerData([...shuffleData]);
// //   }, [fullQuestionData]);

// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       const res = await API.get(
// //         `api.php?amount=${questionData.numberOfQuestions}&category=${questionData.categoryId}&type=multiple`
// //       );
// //       const data = await res.data;
// //       return data;
// //     };

// //     fetchQuestions().then((data) => {
// //       setFullQuestionData(data.results);
// //     });
// //   }, [questionData]);

// //   useEffect(() => {
// //     console.log(choosenAnswerData);
// //   }, [choosenAnswerData]);

// //   const handleChangeQuestion = (id: number, value: string) => {
// //     if (!check) {
// //       let arrData = choosenAnswerData;
// //       arrData[id].current_answer = value;
// //       setChoosenAnswerData([...arrData]);
// //     }
// //   };

// //   const finishQuiz = () => {
// //     let sanagich = 0;
// //     choosenAnswerData.forEach((el) => {
// //       if (el.correct_answer == el.current_answer) {
// //         sanagich++;
// //       }
// //     });

// //     setCount(sanagich);
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   return (
// //     <div className="container">
// //       <div>
// //         <ButtonGroup
// //           style={{ textAlign: "center", margin: "0 auto", display: "block" }}
// //         >
// //           {choosenAnswerData?.map((_, index) => (
// //             <Button
// //               key={index}
// //               onClick={() => {
// //                 setCurrentQuestionNumber(index);
// //               }}
// //               style={{
// //                 width: "55px",
// //                 height: "55px",
// //                 fontSize: "18px",
// //                 backgroundColor: check
// //                   ? choosenAnswerData[index]?.correct_answer ===
// //                     choosenAnswerData[index]?.current_answer
// //                     ? "green"
// //                     : "red"
// //                   : undefined,
// //                 color: check
// //                   ? choosenAnswerData[index]?.correct_answer ===
// //                     choosenAnswerData[index]?.current_answer
// //                     ? "white"
// //                     : "white"
// //                   : "",
// //                 borderColor: check
// //                   ? choosenAnswerData[index]?.correct_answer ===
// //                     choosenAnswerData[index]?.current_answer
// //                     ? "green"
// //                     : "red"
// //                   : undefined,
// //               }}
// //               variant={
// //                 index == currentQuestionNumber ? "contained" : "outlined"
// //               }
// //             >
// //               {index + 1}
// //             </Button>
// //           ))}
// //         </ButtonGroup>
// //       </div>
// //       <Typography
// //         style={{ textAlign: "center", margin: "25px 0" }}
// //         variant="h5"
// //         component="h2"
// //       >
// //         Question # {currentQuestionNumber + 1} /{" "}
// //         {questionData.numberOfQuestions}
// //       </Typography>

// //       <Card style={{ padding: "20px" }}>
// //         <Typography
// //           style={{ textAlign: "center", margin: "25px 0", fontWeight: "600" }}
// //           variant="h5"
// //           component="h2"
// //         >
// //           {choosenAnswerData[currentQuestionNumber]?.question}
// //         </Typography>
// //         <FormControl>
// //           <RadioGroup
// //             aria-labelledby="demo-radio-buttons-group-label"
// //             name="radio-buttons-group"
// //           >
// //             {choosenAnswerData[currentQuestionNumber]?.options?.map((el) => {
// //               return (
// //                 <FormControlLabel
// //                   key={el}
// //                   value={el}
// //                   control={
// //                     <Radio
// //                       style={{
// //                         color: check
// //                           ? choosenAnswerData[currentQuestionNumber]
// //                               ?.correct_answer === el
// //                             ? "green"
// //                             : "red"
// //                           : "inherit",
// //                       }}
// //                       checked={
// //                         choosenAnswerData[currentQuestionNumber]
// //                           .current_answer == el
// //                       }
// //                       onChange={() =>
// //                         handleChangeQuestion(currentQuestionNumber, el)
// //                       }
// //                     />
// //                   }
// //                   label={el}
// //                 />
// //               );
// //             })}
// //           </RadioGroup>
// //         </FormControl>

// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             marginTop: "20px",
// //           }}
// //         >
// //           {currentQuestionNumber > 0 ? (
// //             <Button
// //               variant="outlined"
// //               onClick={() =>
// //                 setCurrentQuestionNumber(currentQuestionNumber - 1)
// //               }
// //             >
// //               PREVIOUS
// //             </Button>
// //           ) : (
// //             <Button
// //               variant="outlined"
// //               disabled
// //               onClick={() =>
// //                 setCurrentQuestionNumber(currentQuestionNumber - 1)
// //               }
// //             >
// //               PREVIOUS
// //             </Button>
// //           )}
// //           {currentQuestionNumber < choosenAnswerData.length - 1 ? (
// //             <Button
// //               variant="contained"
// //               onClick={() =>
// //                 setCurrentQuestionNumber(currentQuestionNumber + 1)
// //               }
// //             >
// //               NEXT
// //             </Button>
// //           ) : (
// //             <Button
// //               disabled
// //               variant="contained"
// //               onClick={() =>
// //                 setCurrentQuestionNumber(currentQuestionNumber + 1)
// //               }
// //             >
// //               NEXT
// //             </Button>
// //           )}
// //         </div>
// //       </Card>

// //       <Button
// //         color="success"
// //         sx={{ display: "block", mt: "30px", marginLeft: "auto", mr: "20px" }}
// //         variant="contained"
// //         onClick={finishQuiz}
// //       >
// //         Finish
// //       </Button>

// //       {open && (
// //         <Modal
// //           open={open}
// //           onClose={handleClose}
// //           aria-labelledby="modal-modal-title"
// //           aria-describedby="modal-modal-description"
// //         >
// //           <Box sx={style}>
// //             <Typography
// //               color="primary"
// //               sx={{ fontSize: "32px", textAlign: "center", fontWeight: "bold" }}
// //               id="modal-modal-title"
// //               variant="h6"
// //               component="h2"
// //             >
// //               Sizning natijangiz:
// //             </Typography>
// //             <Typography
// //               sx={{ mt: 2, textAlign: "center", fontSize: "24px" }}
// //               id="modal-modal-description"
// //               variant="h2"
// //               component="h2"
// //             >
// //               {count} / {questionData.numberOfQuestions}
// //             </Typography>
// //             <Typography
// //               sx={{
// //                 mt: 2,
// //                 textAlign: "center",
// //                 fontWeight: "bold",
// //                 fontSize: "20px",
// //               }}
// //               id="modal-modal-description"
// //               variant="h3"
// //               component="h2"
// //             >
// //               YOKI
// //             </Typography>
// //             <Typography
// //               sx={{ mt: 2, textAlign: "center", fontSize: "24px" }}
// //               id="modal-modal-description"
// //               variant="h2"
// //               component="h2"
// //             >
// //               {((count / questionData.numberOfQuestions) * 100).toFixed()}%
// //             </Typography>
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 marginTop: "20px",
// //                 alignItems: "center",
// //                 justifyContent: "space-between",
// //               }}
// //             >
// //               <Button
// //                 onClick={() => {
// //                   setOpen(false);
// //                   setCheck(true);
// //                 }}
// //                 variant="contained"
// //               >
// //                 Xatolarni ko'rish
// //               </Button>
// //               <Button variant="outlined">
// //                 <Link
// //                   style={{ textDecoration: "none", color: "#186FC6" }}
// //                   to={"/"}
// //                 >
// //                   Yangi Testni Boshlash
// //                 </Link>
// //               </Button>
// //             </Box>
// //           </Box>
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // };

// // export default Quiz;
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import API from "../../utils/config";
// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Card,
//   FormControl,
//   FormControlLabel,
//   Modal,
//   Radio,
//   RadioGroup,
//   Typography,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90%",
//   maxWidth: "470px",
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const Quiz = () => {
//   interface fullQuestionDataType {
//     question: string;
//     incorrect_answers: string[];
//     correct_answer: string;
//   }

//   interface choosenAnswerDataType {
//     question: string;
//     options: string[];
//     correct_answer: string;
//     current_answer: string;
//   }

//   const [fullQuestionData, setFullQuestionData] = useState<
//     fullQuestionDataType[]
//   >([]);
//   const [choosenAnswerData, setChoosenAnswerData] = useState<
//     choosenAnswerDataType[]
//   >([]);
//   const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
//   const questionData = useSelector((state: any) => state.question);
//   const [count, setCount] = useState(0);
//   const [open, setOpen] = useState(false);
//   const [check, setCheck] = useState<boolean>(false);

//   function decode(str: string) {
//     const txt = document.createElement("textarea");
//     txt.innerHTML = str;
//     return txt.value;
//   }

//   useEffect(() => {
//     let shuffleData = fullQuestionData.map((el) => {
//       let variants = [
//         ...el.incorrect_answers.map((el) => decode(el)),
//         decode(el.correct_answer),
//       ];
//       variants.sort(() => Math.random() - 0.5);
//       return {
//         question: decode(el.question),
//         options: variants,
//         correct_answer: el.correct_answer,
//         current_answer: "",
//       };
//     });
//     setChoosenAnswerData([...shuffleData]);
//   }, [fullQuestionData]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await API.get(
//         `api.php?amount=${questionData.numberOfQuestions}&category=${questionData.categoryId}&type=multiple`
//       );
//       const data = await res.data;
//       return data;
//     };
//     fetchQuestions().then((data) => {
//       setFullQuestionData(data.results);
//     });
//   }, [questionData]);

//   const handleChangeQuestion = (id: number, value: string) => {
//     if (!check) {
//       let arrData = choosenAnswerData;
//       arrData[id].current_answer = value;
//       setChoosenAnswerData([...arrData]);
//     }
//   };

//   const finishQuiz = () => {
//     let sanagich = 0;
//     choosenAnswerData.forEach((el) => {
//       if (el.correct_answer === el.current_answer) sanagich++;
//     });
//     setCount(sanagich);
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   return (
//     <Box
//       sx={{ px: 2, maxWidth: "100%", width: "100%", boxSizing: "border-box" }}
//     >
//       <ButtonGroup
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 1,
//           my: 2,
//         }}
//       >
//         {choosenAnswerData?.map((_, index) => (
//           <Button
//             key={index}
//             onClick={() => setCurrentQuestionNumber(index)}
//             sx={{
//               width: "50px",
//               height: "50px",
//               fontSize: "16px",
//               backgroundColor:
//                 check &&
//                 choosenAnswerData[index]?.correct_answer ===
//                   choosenAnswerData[index]?.current_answer
//                   ? "green"
//                   : check
//                   ? "red"
//                   : undefined,
//               color: check ? "white" : undefined,
//               borderColor:
//                 check &&
//                 choosenAnswerData[index]?.correct_answer ===
//                   choosenAnswerData[index]?.current_answer
//                   ? "green"
//                   : check
//                   ? "red"
//                   : undefined,
//             }}
//             variant={index === currentQuestionNumber ? "contained" : "outlined"}
//           >
//             {index + 1}
//           </Button>
//         ))}
//       </ButtonGroup>

//       <Typography textAlign="center" my={2} variant="h6">
//         Question #{currentQuestionNumber + 1} / {questionData.numberOfQuestions}
//       </Typography>

//       <Card sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
//         <Typography variant="h6" fontWeight={600} textAlign="center" mb={3}>
//           {choosenAnswerData[currentQuestionNumber]?.question}
//         </Typography>

//         <FormControl>
//           <RadioGroup>
//             {choosenAnswerData[currentQuestionNumber]?.options?.map((el) => (
//               <FormControlLabel
//                 key={el}
//                 value={el}
//                 control={
//                   <Radio
//                     sx={{
//                       color:
//                         check &&
//                         choosenAnswerData[currentQuestionNumber]
//                           ?.correct_answer === el
//                           ? "green"
//                           : check
//                           ? "red"
//                           : undefined,
//                     }}
//                     checked={
//                       choosenAnswerData[currentQuestionNumber]
//                         .current_answer === el
//                     }
//                     onChange={() =>
//                       handleChangeQuestion(currentQuestionNumber, el)
//                     }
//                   />
//                 }
//                 label={el}
//               />
//             ))}
//           </RadioGroup>
//         </FormControl>

//         <Box display="flex" justifyContent="space-between" mt={2}>
//           <Button
//             variant="outlined"
//             onClick={() =>
//               setCurrentQuestionNumber((prev) => Math.max(0, prev - 1))
//             }
//             disabled={currentQuestionNumber === 0}
//           >
//             PREVIOUS
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => setCurrentQuestionNumber((prev) => prev + 1)}
//             disabled={currentQuestionNumber >= choosenAnswerData.length - 1}
//           >
//             NEXT
//           </Button>
//         </Box>
//       </Card>

//       <Button
//         color="success"
//         variant="contained"
//         onClick={finishQuiz}
//         sx={{ display: "block", mx: "auto", mb: 4 }}
//       >
//         Finish
//       </Button>

//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <Typography
//             color="primary"
//             sx={{ fontSize: "28px", textAlign: "center", fontWeight: "bold" }}
//           >
//             Sizning natijangiz:
//           </Typography>
//           <Typography sx={{ mt: 2, textAlign: "center", fontSize: "22px" }}>
//             {count} / {questionData.numberOfQuestions}
//           </Typography>
//           <Typography
//             sx={{
//               mt: 2,
//               textAlign: "center",
//               fontWeight: "bold",
//               fontSize: "18px",
//             }}
//           >
//             YOKI
//           </Typography>
//           <Typography sx={{ mt: 2, textAlign: "center", fontSize: "20px" }}>
//             {((count / questionData.numberOfQuestions) * 100).toFixed()}%
//           </Typography>
//           <Box display="flex" justifyContent="space-between" mt={3}>
//             <Button
//               onClick={() => {
//                 setOpen(false);
//                 setCheck(true);
//               }}
//               variant="contained"
//             >
//               Xatolarni ko'rish
//             </Button>
//             <Button variant="outlined">
//               <Link
//                 style={{ textDecoration: "none", color: "#186FC6" }}
//                 to={"/"}
//               >
//                 Yangi Testni Boshlash
//               </Link>
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Quiz;
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../utils/config";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Quiz = () => {
  interface fullQuestionDataType {
    question: string;
    incorrect_answers: string[];
    correct_answer: string;
  }
  interface choosenAnswerDataType {
    question: string;
    options: string[];
    correct_answer: string;
    current_answer: string;
  }

  const [fullQuestionData, setFullQuestionData] = useState<
    fullQuestionDataType[]
  >([]);
  const [choosenAnswerData, setChoosenAnswerData] = useState<
    choosenAnswerDataType[]
  >([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState<boolean>(false);

  const questionData = useSelector((state: any) => state.question);

  function decode(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await API.get(
        `api.php?amount=${questionData.numberOfQuestions}&category=${questionData.categoryId}&type=multiple`
      );
      const data = await res.data;
      setFullQuestionData(data.results);
    };
    fetchQuestions();
  }, [questionData]);

  useEffect(() => {
    const shuffledData = fullQuestionData.map((el) => {
      let variants = [
        ...el.incorrect_answers.map((el) => decode(el)),
        decode(el.correct_answer),
      ];
      variants.sort(() => Math.random() - 0.5);
      return {
        question: decode(el.question),
        options: variants,
        correct_answer: decode(el.correct_answer),
        current_answer: "",
      };
    });
    setChoosenAnswerData(shuffledData);
  }, [fullQuestionData]);

  const handleChangeQuestion = (id: number, value: string) => {
    if (!check) {
      let updatedData = [...choosenAnswerData];
      updatedData[id].current_answer = value;
      setChoosenAnswerData(updatedData);
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    choosenAnswerData.forEach((el) => {
      if (el.correct_answer === el.current_answer) {
        correctCount++;
      }
    });
    setCount(correctCount);
    setOpen(true);
  };

  return (
    <Box p={2} maxWidth="900px" margin="0 auto">
      <h2>
        <Link
          to={"/"}
          className="quiz-link"
        >
          <HomeIcon style={{ marginBottom: "5px" }} /> Savolni o'zgartirish
        </Link>
      </h2>
      <Grid container spacing={2} justifyContent="center" mb={2}>
        {choosenAnswerData.map((_, index) => (
          <Grid item xs={3} sm={2} md={1} key={index}>
            <Button
              fullWidth
              size="small"
              variant={
                index === currentQuestionNumber ? "contained" : "outlined"
              }
              onClick={() => setCurrentQuestionNumber(index)}
              style={{
                backgroundColor: check
                  ? choosenAnswerData[index].correct_answer ===
                    choosenAnswerData[index].current_answer
                    ? "green"
                    : "red"
                  : undefined,
                color: check ? "white" : undefined,
              }}
            >
              {index + 1}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" align="center" gutterBottom>
        Question {currentQuestionNumber + 1} / {questionData.numberOfQuestions}
      </Typography>

      <Card sx={{ p: { xs: 2, sm: 3 }, mb: 2 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {choosenAnswerData[currentQuestionNumber]?.question}
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup>
            {choosenAnswerData[currentQuestionNumber]?.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={
                  <Radio
                    checked={
                      choosenAnswerData[currentQuestionNumber]
                        ?.current_answer === option
                    }
                    onChange={() =>
                      handleChangeQuestion(currentQuestionNumber, option)
                    }
                    style={{
                      color: check
                        ? option ===
                          choosenAnswerData[currentQuestionNumber]
                            ?.correct_answer
                          ? "green"
                          : "red"
                        : undefined,
                    }}
                  />
                }
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Grid container justifyContent="space-between" mt={3}>
          <Button
            variant="outlined"
            disabled={currentQuestionNumber === 0}
            onClick={() => setCurrentQuestionNumber((prev) => prev - 1)}
          >
            Ortga
          </Button>
          <Button
            variant="contained"
            disabled={currentQuestionNumber === choosenAnswerData.length - 1}
            onClick={() => setCurrentQuestionNumber((prev) => prev + 1)}
          >
            Oldinga
          </Button>
        </Grid>
      </Card>

      <Button
        fullWidth
        color="success"
        variant="contained"
        onClick={finishQuiz}
        sx={{ mt: 2 }}
      >
        Tugatish
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h5" textAlign="center" fontWeight="bold">
            Sizning natijangiz:
          </Typography>
          <Typography variant="h6" textAlign="center" mt={2}>
            {count} / {questionData.numberOfQuestions}
          </Typography>
          <Typography variant="h6" textAlign="center" mt={1}>
            Yoki:
          </Typography>
          <Typography variant="h6" textAlign="center" mt={2}>
            {((count / questionData.numberOfQuestions) * 100).toFixed()}%
          </Typography>

          <Grid
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}
          >
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  setCheck(true);
                  setOpen(false);
                }}
              >
                Xatolarni ko‘rish
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="outlined">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#1976d2" }}
                >
                  Yangi testni boshlash
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default Quiz;
