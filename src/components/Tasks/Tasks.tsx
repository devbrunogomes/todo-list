import { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";

//Crio a interface que será o modelo do meu array do meu useState que pegará as tarefas
interface Task {
  title: string;
  done: boolean;
  id: number;
}
//--------------------------------------------------------------
export const Tasks: React.FC = () => {
  //Estado para pegar o titulo das tarefas
  const [taskTitle, setTaskTitle] = useState("");
  //Estado para pegar a lista de tarefas e atualizar o conteudo da pagina. Por ser Typescript eu indico o modelo que esse array vai seguir. Veja que eu inicio o estado com um array vazio
  const [tasks, setTasks] = useState([] as Task[]);

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
      { id: new Date().getTime(), title: taskTitle, done: false }, //No id tem uma função básica que gera um número único
    ];
    setTasks(newTasks);

    //Para salvar o array de tarefas dentro do armazenamento local
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    //Pra limpar o input após adicionar a tarefa
    setTaskTitle("");
  }
  //--------------------------------------------------------------
  //O useEffect será disparado na montagem do componente. Por isso, eu uso ele pra pegar o meu array de tarefas que ficou salvo no localStorage
  //e passo um setTasks nele, como no meu HTML já tem um .map() disparando dentro do arrays tasks[] a renderização acontecerá.
  useEffect(() => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')

    if (tasksOnLocalStorage) {
      setTasks(JSON.parse(tasksOnLocalStorage))
    }
  }, [])


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

        <button type="submit">Adicionar Tarefa</button>
      </form>
      {/* //-------------------------------------------------------------- */}
      <ul>
        {/* Dentro do da minha lista ul, eu coloco um map, que vai estar o tempo todo mapeando o meu array task, que foi criado com o estado que pega a alteraçao do meu formulario */}
        {tasks.map((task) => {
          //Pra cada iteracao no array eu retorno um HTML
          return (
            //Cada elemento deve ter uma chave key unica, por isso usa-se o task.id, já que ele sempre tem um número único. E se usa sempre no 1o elemento retornado
            <li key={task.id}>
              <input type="checkbox" id={`task-${task.id}`} />
              <label htmlFor={`task-${task.id}`}>{task.title}</label>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
