import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface HistoryItem {
  name: string;
  date: string;
  score: number;
  total: number;
  status: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("quizHistory");
    if (data) {
      setHistory(JSON.parse(data));
    }
  }, []);

  return (
    <Box p={2} maxWidth="1000px" mx="auto">
      <Typography variant="h5" mb={3}>
        Test Tarixi
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            {/* <TableCell>Exam Name</TableCell> */}
            <TableCell>Created At</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((item, index) => (
            <TableRow
              key={index}
              style={{
                backgroundColor: index % 2 === 1 ? "#f9f9f9" : undefined,
              }}
            >
              <TableCell>{index + 1}</TableCell>
              {/* <TableCell>{item.name}</TableCell> */}
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.score}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default History;
