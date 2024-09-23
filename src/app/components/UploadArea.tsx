import { useState } from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div<{ $isDragging: boolean }>`
  margin-top: 30px;
  padding: 40px;
  border: 2px dashed ${({ $isDragging }) => ($isDragging ? '#007bff' : '#ccc')};
  border-radius: 10px;
  text-align: center;
  background-color: ${({ $isDragging }) =>
    $isDragging ? '#e0f7fa' : '#f9f9f9'};
  transition:
    background-color 0.3s,
    border-color 0.3s;
`;

const UploadTitle = styled.h3`
  margin-bottom: 15px;
`;

const UploadInstructions = styled.p`
  margin-bottom: 15px;
`;

const FileInput = styled.input`
  display: none;
`;

const SelectFileButton = styled.label`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: #0056b3;
  }
`;

const UploadedFilesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const UploadedFileItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e60000;
  }
`;

const FinishButton = styled.button`
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

interface UploadedFile {
  file: File;
  id: string;
}

export const UploadArea: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      handleFiles(filesArray);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const isValidSize = file.size <= 25 * 1024 * 1024; // 25MB
      const isValidType = [
        'application/pdf',
        'image/jpeg',
        'image/png'
      ].includes(file.type);
      return isValidSize && isValidType;
    });

    const newFiles = validFiles.map((file) => ({
      file,
      id: file.name + Date.now()
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const handleFinishUpload = () => {
    // Lógica para finalizar o envio (pode ser uma chamada de API, etc.)
    alert('Upload finalizado com sucesso!');
    setUploadedFiles([]);
  };

  return (
    <UploadContainer
      $isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <UploadTitle>Após efetuar o pagamento</UploadTitle>
      <UploadInstructions>
        Arraste e solte seus comprovantes de pagamento aqui ou selecione os
        arquivos
      </UploadInstructions>

      {/* Botão para selecionar arquivo */}
      <SelectFileButton htmlFor="file-upload">
        Selecionar Arquivo
      </SelectFileButton>

      <FileInput
        id="file-upload"
        type="file"
        multiple
        accept=".pdf,.jpeg,.png"
        onChange={handleFileSelect}
      />

      {/* Exibição de arquivos carregados */}
      {uploadedFiles.length > 0 && (
        <>
          <UploadedFilesList>
            {uploadedFiles.map((file) => (
              <UploadedFileItem key={file.id}>
                {file.file.name}
                <RemoveButton onClick={() => removeFile(file.id)}>
                  X
                </RemoveButton>
              </UploadedFileItem>
            ))}
          </UploadedFilesList>
          <FinishButton onClick={handleFinishUpload}>
            Finalizar Envio
          </FinishButton>
        </>
      )}
    </UploadContainer>
  );
};
