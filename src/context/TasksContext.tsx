import { createContext, useEffect, useState } from "react";

//--------------------------------------------------------------
interface TasksContextData {
  //O contexto exportado já terá um padrao, seguindo o contrato:
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
export const TasksContext = createContext({} as TasksContextData); //Criando um contexto, com sua tipagem
//--------------------------------------------------------------

interface TasksProviderProps {
  children: React.ReactNode;
}

export interface Task {
  //o contrato do estado Tasks que é um array, que seguirá esse padrão
  title: string;
  done: boolean;
  id: number;
  exitAnimation: boolean;
}

//--------------------------------------------------------------
export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  //Como eu preciso usar o estado tasks, eu trouxe ele para o contexto, para entao conseguir acessá-lo em vários componentes

  //Estado para pegar a lista de tarefas e atualizar o conteudo da pagina. Por ser Typescript eu indico o modelo que esse array vai seguir. Veja que eu inicio o estado com um array vazio
  const [tasks, setTasks] = useState([] as Task[]);

  //O useEffect será disparado na montagem do componente. Por isso, eu uso ele pra pegar o meu array de tarefas que ficou salvo no localStorage
  //e passo um setTasks nele, como no meu HTML já tem um .map() disparando dentro do arrays tasks[] a renderização acontecerá.
  //--------------------------------------------------------------
  useEffect(() => {
    const tasksOnLocalStorage = localStorage.getItem("tasks");

    if (tasksOnLocalStorage) {
      setTasks(JSON.parse(tasksOnLocalStorage));
    }
  }, []);
  //--------------------------------------------------------------
  //Retornando um Provider
  return (
    <>
      {/* O conteúdo que eu poderei acessar nos componentes envolvido pelo meu Provider é o que estiver dentro da 
          propriedade value={}. Ou seja, ela que exporta o meu contexto */}
      <TasksContext.Provider
        value={{
          tasks,
          setTasks,
        }}
      >
        {children}
      </TasksContext.Provider>
    </>
  );
};
