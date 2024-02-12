//Pra importar um modulo css, eu jogo pra dentro de uma variavel, e todos os parametros do meu css agr pode ser acessado como um objeto
import { StatsCard } from "../StatsCard/StatsCard";
import styles from "./styles.module.scss";

export const Header: React.FC = () => {
  //Exportando como arrow function eu consigo agr tipar a minha funçao
  return (
    // Eu nao uso mais uma string comum para a classe, agr eu acesso o styles e uso o nome que eu usaria caso fosse uma string
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>MyTodo</h1>

          <span>Bem vindo(a)</span>
        </div>

        <div>
          <StatsCard title="Total de tarefas" value={5} />
          <StatsCard title="Tarefas Pendentes" value={4}/>
          <StatsCard title="Tarefas Concluídas" value={1}/>
        </div>
      </div>
    </header>
  );
};
