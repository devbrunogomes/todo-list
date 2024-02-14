import { Header } from "./components/Header/Header";
import { Tasks } from "./components/Tasks/Tasks";
import { TasksProvider } from "./context/TasksContext";
import "./styles/global.css";

function App() {
  return (
    //Envolvo todo o conteudo do meu App com meu provider, pra poder acessar o Context em cada uma delas
    <TasksProvider>
      <Header />

      <Tasks />
    </TasksProvider>
  );
}

export default App;
