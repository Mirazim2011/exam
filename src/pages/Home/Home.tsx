// import { useState } from "react";
// import API from "../../utils/config";
// import { Button, MenuItem, Select } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { questionActions } from "../../store/questionSlice";

// const Home = () => {
//   interface categoryType {
//     id: number;
//     name: string;
//   }

//   const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
//   const [categoryId, setCategoryId] = useState<number>(9);
//   const [categoryData, setCategoryData] = useState<categoryType[]>([]);
//   const countOfQuestions = [10, 15, 20, 25, 30];
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const fetchCategory = async () => {
//     const res = await API.get("/api_category.php");
//     const data = await res.data;
//     return data;
//   };

//   const submitData = () => {
//     dispatch(
//       questionActions.changeQuestionData({
//         numberOfQuestions,
//         categoryId,
//       })
//     );
//     navigate("/quiz");
//   };

//   fetchCategory().then((data) => setCategoryData(data.trivia_categories));
//   return (
//     <div className="container">
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           width: "100%",
//         }}
//       >
//         <Select
//           style={{
//             width: "100%",
//           }}
//           value={numberOfQuestions}
//           onChange={(e: any) => setNumberOfQuestions(e.target.value)}
//         >
//           {countOfQuestions.map((el) => (
//             <MenuItem value={el} key={el}>
//               {el}
//             </MenuItem>
//           ))}
//         </Select>

//         <Select
//           style={{
//             width: "100%",
//             margin: "20px 0",
//           }}
//           value={categoryId}
//           onChange={(e: any) => setCategoryId(e.target.value)}
//         >
//           {categoryData.map((item) => (
//             <MenuItem key={item.id} value={item.id}>
//               {item.name}
//             </MenuItem>
//           ))}
//         </Select>

//         <Button
//           style={{ width: "100%" }}
//           variant="contained"
//           onClick={submitData}
//         >
//           Start
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Home;
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
