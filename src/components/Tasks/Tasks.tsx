import { FormEvent, useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Task, TasksContext } from "../../context/TasksContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";

//Crio a interface que será o modelo do meu array do meu useState que pegará as tarefas

//--------------------------------------------------------------
export const Tasks: React.FC = () => {
  //Estado para pegar o titulo das tarefas
  const [taskTitle, setTaskTitle] = useState("");

  const { tasks, setTasks } = useContext(TasksContext);

  //Para armazenar o tamanho do array de tasks, para uma renderização condicional do botao delete all
  const tasksLength = tasks.length;

  const [animationUl, setAnimationUl] = useState(false);

  //--------------------------------------------------------------

  //Função disparada quando o usuario adicionar uma nova tarefa
  function handleSubmitAddTask(event: FormEvent) {
    //Ao submeter o formulario vai me retornar um evento, e eu pego esse evento e aplico o preventDefault
    event.preventDefault();

    //Pra filtrar tarefas curtas demais
    if (taskTitle.length < 3) {
      //emitir um alerta
      alert("Não é possivel adicionar uma tarefa com menos de 3 letras");
      return;
    }

    //Adicionar a tarefa ao array do estado (tasks)
    const newTasks = [
      //Eu uso uma variavel externa ao meu setTasks pois ele demora de jogar a tarefa ao localStorage. Dessa forma, eu driblo
      ...tasks, //pega as tarefas que já existiam, e coloca nesse novo valor do estado de tarefas
      {
        id: new Date().getTime(),
        title: taskTitle,
        done: false,
        exitAnimation: false,
      }, //No id tem uma função básica que gera um número único
    ];
    setTasks(newTasks);

    //Para salvar o array de tarefas dentro do armazenamento local
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    //Pra limpar o input após adicionar a tarefa
    setTaskTitle("");
  }
  //--------------------------------------------------------------
  function handleToggleTaskStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    //Para salvar o array de tarefas dentro do armazenamento local
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTasks(newTasks);
  }
  //--------------------------------------------------------------
  function handleRemoveTaskButton(taskId: number) {
    //Para iniciar a animação
    const tasksWithAnAnimation = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          exitAnimation: true,
        };
      }

      return task;
    });

    //Para renderizar a animação, e logo após fazer a exclusão
    setTasks(tasksWithAnAnimation);

    //Envolvi num setTimeOut pra atualizar o array (exclusão) após o tempo da animação
    setTimeout(() => {
      //Vou filtrar o array de tasks, excluindo a task com o id passado como parametro e armazeno num novo array
      const tasksWithoutAnTask = tasksWithAnAnimation.filter((task) => {
        if (task.id !== taskId) {
          return task;
        }
      });

      //Atualizo o estado do array com um setTasks, passando esse novo array sem a task que foi excluída
      setTasks(tasksWithoutAnTask);

      //Para salvar o array de tarefas dentro do armazenamento local
      localStorage.setItem("tasks", JSON.stringify(tasksWithoutAnTask));
    }, 500);
  }

  //--------------------------------------------------------------
  //Função para apagar todas as tasks
  function handleDeleteAllButton() {
    //Iniciar a animação de saída
    setAnimationUl(true);

    //Processo de deletar as tasks envolvido num timeOut para esperar o tempo de animação
    setTimeout(() => {
      //Definindo um array sem tasks
      const emptyTasks: Task[] = [];
      setTasks(emptyTasks);

      //Atualizar o local storage
      localStorage.setItem("tasks", JSON.stringify(emptyTasks));

      //Voltar o estado pra false para remover a classe da Ul
      setAnimationUl(false);
    }, 500);
  }
  //--------------------------------------------------------------
  return (
    <section className={styles.container}>
      <form
        //Eu criei uma função externa por uma boa prática, pois algumas funçoes poderiam ser mto grandes, deixando o código ilegivel
        onSubmit={handleSubmitAddTask} //O evento ja ta sendo passado de forma implicita
      >
        <div>
          <label htmlFor="task-title">Adicionar Tarefa</label>
          <input
            value={taskTitle} //O valor do input será o valor digitado pelo usuario, que vai ser armazenado pelo useState()
            onChange={(event) => {
              //Ao mudar (onChange), eu uso a funcao retornada pelo meu useState() e passo o event.target
              setTaskTitle(event.target.value);
            }}
            type="text"
            id="task-title"
            placeholder="Titulo da Tarefa"
          />
        </div>

        <button type="submit"><RiMenuAddLine /></button>
      </form>

      {/* //-------------------------------------------------------------- */}
      <ul className={`list ${animationUl ? styles.exitUl : ""}`}>
        {/* Dentro do da minha lista ul, eu coloco um map, que vai estar o tempo todo mapeando o meu array task, que foi criado com o estado que pega a alteraçao do meu formulario */}
        {tasks.map((task) => {
          //Pra cada iteracao no array eu retorno um HTML
          return (
            //Cada elemento deve ter uma chave key unica, por isso usa-se o task.id, já que ele sempre tem um número único. E se usa sempre no 1o elemento retornado
            <li
              key={task.id}
              className={`task ${task.done ? styles.done_li : " "} ${
                task.exitAnimation ? styles.exitTask : " "
              }`}
            >
              {/* obs: Ao contrario do evento do submit, aqui eu passo uma arrow function, pq a minha função tem um parametro, se eu fosse escrever apenas o nome da função, iria dar erro pq ela precisa de um parametro. E se eu apenas usasse o nome com o parametro eu estaria passando uma chamada de funcao, e nao uma funcao. E o onChange espera uma função. */}
              <input
                type="checkbox"
                id={`task-${task.id}`}
                onChange={() => {
                  handleToggleTaskStatus(task.id);
                }}
                checked={task.done}
              />
              <label
                htmlFor={`task-${task.id}`}
                className={task.done ? styles.done_span : ""}
              >
                {task.title}
                <button
                  onClick={() => {
                    handleRemoveTaskButton(task.id);
                  }}
                >
                  <FaRegTrashAlt />
                </button>
              </label>
            </li>
          );
        })}
      </ul>
      <div className={styles.deleteAllWrapper}>
        <button
          className={`button ${styles.delete_All} ${
            tasksLength < 2 ? styles.displayNone : ""
          }`}
          onClick={() => {
            handleDeleteAllButton();
          }}
        >
          Delete All
        </button>
      </div>
    </section>
  );
};
