## LN07 - Todo App

VERSION 1
------ Show all tasks
------ Add new task
------ Mark a task as a completed task. Comleted task(s) should have different style from incomplete task(s)
------ Filter some tasks by their title/name

### chuẩn bị: cài sẵn NodeJS

### B1: tạo project bằng cú pháp cra với typescript:

npx create-react-app todo-app --template typescript

mở VScode tại thư mục todo-app

Xóa nội dung render trong App.tsx, file logo và App.css, các file này không còn cần thiết

### B2: cài thư viện MUI và áp dụng một số style cơ bản của MUI, làm theo link sau:

https://mui.com/material-ui/getting-started/installation/

npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto

Đặt ở thư mục gốc App.tsx (App.tsx thông thường là component áp dụng các root Provider hay các style cơ bản của ứng dụng)
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

npm install @mui/icons-material

### B3: cài thêm thư viện công cụ lodash:

npm i lodash
Thư viện tiện ích JavaScript hiện đại cung cấp tính mô-đun, hiệu suất và các tính năng bổ sung.

### B4: Phân tích đề bài: từ các thông tin trên, ta có thể suy ra cấu trúc render component như sau:

TodoList
|-index.tsx (chứaa 2 state items và sađâsđasadsad)
|-Filter.tsx ()
|-TodoItem.tsx
Component TaskFilter, TaskItem sẽ được render trong index.tsx
Tuy nhiên không nên thực hiện việc phân chia component từ ban đầu,
nên thực hiện toàn bọ UI cơ bản trong 1 component và sau đó chia component đó thành các component con sao cho hợp lí
Vậy nên ta sẽ thực hiện UI trong Todolist/index.tsx trước

### B5: Bắt từ thực hiện code UI từ trên xuống dưới và từ ngoài vào trong:

Render TodoList component vào App.tsx và bắt đầu dựng UI

===== TodoList/index.tsx =====
import React from "react";

const TodoList = () => {
return <div>TodoList</div>;
};

export default TodoList;

====== App.tsx =======
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TodoList from "./TodoList";

function App() {
return (
<>
<TodoList />
</>
);
}

export default App;

chạy npm start và xem đã render ra text TodoList trên màn hình chưa, nếu bị lỗi thì xem lại bị sai ở đâu và sửa

### B7: bắt đầu code UI, sau 1 hồi code theo trí tưởng tượng, mình code đc như sau
#   T o d o L i s t - R e a c t - L N 0 9  
 