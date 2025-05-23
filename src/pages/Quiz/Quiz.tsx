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
  GridLegacy as Grid,
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
    category: string;
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
      try {
        const savedData = localStorage.getItem("quizQuestions");
        const savedKey = localStorage.getItem("quizKey");

        const currentKey = `${questionData.numberOfQuestions}-${questionData.categoryId}`;

        if (savedData && savedKey === currentKey) {
          setFullQuestionData(JSON.parse(savedData));
          return;
        }

        const res = await API.get(
          `api.php?amount=${questionData.numberOfQuestions}&category=${questionData.categoryId}&type=multiple`
        );

        const data = res.data;

        if (res.status === 429 || data.response_code === 5) {
          alert("So‘rovlar limiti oshib ketdi. Keyinroq urinib ko‘ring.");
          return;
        }

        localStorage.setItem("quizQuestions", JSON.stringify(data.results));
        localStorage.setItem("quizKey", currentKey);
        setFullQuestionData(data.results);
      } catch (error) {
        console.log("Xatolik yuz berdi: " + error);
      }
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
    const history = JSON.parse(localStorage.getItem("quizHistory") || "[]");
    const newEntry = {
      name: decode(fullQuestionData[0].category),
      date: new Date().toLocaleDateString("en-GB"),
      score: correctCount,
      total: questionData.numberOfQuestions,
      status: "pending",
    };
    history.unshift(newEntry);
    localStorage.setItem("quizHistory", JSON.stringify(history));
  };

  return (
    <Box p={2} maxWidth="900px" margin="0 auto">
      <h2>
        <Link to="/" className="quiz-link">
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
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("quizQuestions");
                  localStorage.removeItem("quizKey");
                }}
              >
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
