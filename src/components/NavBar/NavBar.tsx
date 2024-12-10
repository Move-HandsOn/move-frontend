import style from './NavBar.module.css';
import ArrowLeft from '../../assets/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';

type Props = {
  title?: string;
};

function NavBar({ title }: Props) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={style.title_container}>
      <button className={style.return_button} onClick={handleBackClick}>
        <img src={ArrowLeft} alt="Botão de Voltar" />
      </button>
      <h1>{title}</h1>
    </div>
  );
}

export default NavBar;
