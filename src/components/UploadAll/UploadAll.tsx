import trash from '@/assets/Trash-1.svg';
import type { UploadFile, UploadProps } from 'antd';
import { Upload } from 'antd';
import { useState } from 'react';
import styles from './UploadAll.module.css';

export function UploadAll() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = <div className={styles.customUploadButton}>+</div>;

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
      <Upload
        onChange={handleChange}
        showUploadList={false}
        className={styles.customUploadButton}
      >
        {uploadButton}
      </Upload>
    </div>
  );
}
