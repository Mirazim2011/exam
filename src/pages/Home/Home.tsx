import { useState, useEffect } from "react";
import API from "../../utils/config";
import { Button, MenuItem, Select, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { questionActions } from "../../store/questionSlice";

const Home = () => {
  interface categoryType {
    id: number;
    name: string;
  }

  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [categoryId, setCategoryId] = useState<number>(9);
  const [categoryData, setCategoryData] = useState<categoryType[]>([]);
  const countOfQuestions = [10, 15, 20, 25, 30];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await API.get("/api_category.php");
      const data = await res.data;
      setCategoryData(data.trivia_categories);
    };
    fetchCategory();
  }, []);

  const submitData = () => {
    dispatch(
      questionActions.changeQuestionData({
        numberOfQuestions,
        categoryId,
      })
    );
    navigate("/quiz");
  };

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: "480px", mx: "auto" }}>
      <Select
        fullWidth
        value={numberOfQuestions}
        onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
        sx={{ mb: 2 }}
      >
        {countOfQuestions.map((el) => (
          <MenuItem key={el} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        sx={{ mb: 3 }}
      >
        {categoryData.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>

      <Button fullWidth variant="contained" onClick={submitData}>
        Start
      </Button>
    </Box>
  );
};

export default Home;
