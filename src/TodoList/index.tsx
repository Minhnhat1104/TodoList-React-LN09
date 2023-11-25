import { Box, Stack, Typography, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import TodoFilter from "./components/TodoFilter";
import TodoWrite from "./components/TodoWrite";
import TodoItems from "./components/TodoItems";
import TodoProvider from "./components/TodoProvider";

const TodoList = () => {
  const theme = useTheme();

  return (
    <TodoProvider>
      <Box display="flex" width="100%" height="100vh">
        <Stack margin="auto" spacing={1} sx={{ background: blue[100] }} p={2}>
          <Typography variant="h4" textAlign="center">
            Todo List
          </Typography>

          {/* Filter */}
          <TodoFilter />

          {/* Todo Items */}
          <TodoItems />

          {/* Add */}
          <TodoWrite />
        </Stack>
      </Box>
    </TodoProvider>
  );
};

export default TodoList;
