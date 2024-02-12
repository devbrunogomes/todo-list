import './styles.css'

export const Header: React.FC = () => { //Exportando como arrow function eu consigo agr tipar a minha funçao
  return (
    <header className="header">
      <div>
        <h1>MyTodo</h1>

        <span>Bem vindo(a)</span>
      </div>

      <div>
        {/* Aqui virá os cards */}
      </div>
    </header>
  );
};
