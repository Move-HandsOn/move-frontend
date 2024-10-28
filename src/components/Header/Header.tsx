import style from './Header.module.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

type Props = {
  title: string;
  handleSearchClick: () => void;
};

function Header({ title, handleSearchClick }: Props) {
  return (
    <header className={style.header}>
      <h2 className={style.title}>{title} </h2>
      <Tooltip title="">
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          iconPosition="end"
          style={{ background: '#f6f6f6', border: 'none' }}
          onClick={handleSearchClick}
        />
      </Tooltip>
    </header>
  );
}

export default Header;
