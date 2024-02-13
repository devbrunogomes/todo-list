import styles from "./styles.module.scss";

export const Tasks: React.FC = () => {
  return (
    <section className={styles.container}>
      <form>
        <div>
          <label htmlFor="task-title">Adicionar Tarefa</label>
          <input type="text" id="task-title" placeholder="Titulo da Tarefa" />
        </div>

        <button>Adicionar Tarefa</button>
      </form>
    </section>
  );
};
