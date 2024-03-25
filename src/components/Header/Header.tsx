//Pra importar um modulo css, eu jogo pra dentro de uma variavel, e todos os parametros do meu css agr pode ser acessado como um objeto
import { useContext } from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import styles from "./styles.module.scss";
import { TasksContext } from "../../context/TasksContext";

//Exportando como arrow function eu consigo agr tipar a minha funçao
export const Header: React.FC = () => {
  //Trazendo meu array de tarefas do useState() que tá no meu context
  const { tasks } = useContext(TasksContext)

  //Com um .length eu tenho o total de tarefas
  const totalTasks = tasks.length

  //Com um .reduce eu tenho o total de tarefas pendentes
  const totalPending = tasks.reduce((total, task) => {
    if (!task.done) {
      return total + 1
    }
    return total
  }, 0)

  const totalDone = totalTasks - totalPending


  return (
    // Eu nao uso mais uma string comum para a classe, agr eu acesso o styles e uso o nome que eu usaria caso fosse uma string
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>To Do List</h1>

          <span>Bem vindo(a)</span>

          <span>
            Feito por
            <a href="" target="_blank">
              Bruno Gomes
            </a>
          </span>
        </div>

        <div>
          <StatsCard title="Total" value={totalTasks} />
          <StatsCard title="Pendentes" value={totalPending}/>
          <StatsCard title="Concluídas" value={totalDone}/>
        </div>
      </div>
    </header>
  );
};
