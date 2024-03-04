import styles from './styles.module.scss'

interface StatsCardProps {
  title: string;
  value: number;
}

//Logo após o React.FC eu abro um generic '<>', e passo o contrato(interface) dos parametros que vao ser recebidos
export const StatsCard: React.FC<StatsCardProps> = (props) => {
  return (
    <article className={styles.stats_card}>
      <h2>{props.title}</h2>

      <p>{props.value}</p>
    </article>
  )
}