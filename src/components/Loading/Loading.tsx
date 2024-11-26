import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import style from './Loading.module.css';
interface ILoadingProps {
  show: boolean;
}

function Loading({ show }: ILoadingProps) {
  return (
    <>
      {show && (
        <div className={style.container}>
          <Spin indicator={<LoadingOutlined spin />} />
        </div>
      )}
    </>
  );
}

export default Loading;
