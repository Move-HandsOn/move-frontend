import trash from '@/assets/Trash-1.svg';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import styles from './UploadAll.module.css';
import camera from "@/assets/CameraPlus.svg"
import Button from '../Button/Button';

type UploadAllProps = {
  fileList: UploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile[]>>;
};

export function UploadAll({ fileList, setFileList }: UploadAllProps) {
  const uploadLimited = 2;

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = <Button type="button" variant='gray'><img src={camera} alt="" />Adicionar Foto</Button>;

  return (
    <div className={styles.container}>
     {fileList.length > 0 && <div className={styles.containerCards}>
        {fileList.map((file) => (
          <div key={file.uid} className={styles.customCard}>
            {file.url || file.originFileObj ? (
              <img
              src={
                  file.url ||
                  (file.originFileObj && URL.createObjectURL(file.originFileObj))
                }
                alt={file.name}
              />
            ) : (
              <span>{file.name}</span>
            )}

            <button
              className={styles.customDeleteButton}
              onClick={() => handleRemove(file)}
              >
              <img src={trash} className={styles.deleteIcon} />
            </button>
          </div>
        ))}
      </div>}
     {fileList.length < uploadLimited ? <Upload
        onChange={handleChange}
        showUploadList={false}
        accept='images/*'
        beforeUpload={() => false}
        > 
        {uploadButton}
      </Upload> : null}
    </div>
  );
}
