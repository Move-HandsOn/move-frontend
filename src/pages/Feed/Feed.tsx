import style from '../Feed/Feed.module.css';
import Header from '@/components/Header/Header';

function Feed() {
  return (
    <div className={style.feed_container}>
      <Header title="Início" />
      <h1 className={style.header_title}>Olá, Natália Oliveira! </h1>
      <h3 className={style.group_section}>Grupos de atividades</h3>
    </div>
  );
}

export default Feed;
