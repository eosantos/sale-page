import { useState } from 'react';
import ErrorPopup from './ErrorPopup';
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

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 300px; // Limite máximo da barra
  background-color: #f3f3f3;
  border-radius: 5px;
  margin: 10px auto; // Centraliza a barra
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 10px;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
`;

const UploadingMessage = styled.p`
  color: blue;
  font-weight: bold;
`;

const UploadedFilesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
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

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // Espaço entre os botões
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

interface UploadedFile {
  file: File;
  id: string;
}

export const UploadArea: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState<UploadedFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorPopup, setErrorPopup] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: '' });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      const isDuplicate = uploadedFiles.some(
        (uploadedFile) => uploadedFile.file.name === file.name
      );

      if (!isValidSize) {
        setErrorPopup({
          isOpen: true,
          message: 'O arquivo deve ter no máximo 25MB.'
        });
      } else if (!isValidType) {
        setErrorPopup({
          isOpen: true,
          message:
            'Tipo de arquivo não suportado. Apenas PDF, JPEG e PNG são permitidos.'
        });
      } else if (isDuplicate) {
        setErrorPopup({
          isOpen: true,
          message: 'Você já enviou um arquivo com esse nome.'
        });
      }

      return isValidSize && isValidType && !isDuplicate;
    });

    const newFiles = validFiles.map((file) => ({
      file,
      id: file.name + Date.now()
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Inicia o upload dos novos arquivos
    newFiles.forEach((file) => uploadFile(file));
  };

  const uploadFile = async (file: UploadedFile) => {
    setLoadingFiles((prev) => [...prev, file]);
    setUploadProgress((prev) => ({ ...prev, [file.id]: 0 }));

    // Simulação de upload com progresso
    const totalChunks = 100; // Divida em 100 partes para simulação
    for (let i = 1; i <= totalChunks; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simula um delay
      setUploadProgress((prev) => ({ ...prev, [file.id]: i })); // Atualiza o progresso
    }

    // Finaliza o upload
    setLoadingFiles((prev) => prev.filter((f) => f.id !== file.id)); // Remove o arquivo da lista de carregamento

    // Verifica se todos os arquivos foram carregados
    if (loadingFiles.length === 1) {
      setSuccessMessage('Arquivos enviados com sucesso!');
    }
  };

  const handleFinishUpload = () => {
    setSuccessMessage('Arquivos enviados com sucesso!');
    setLoadingFiles([]); // Limpa a lista de arquivos em carregamento
  };

  const handleResetUpload = () => {
    setSuccessMessage('');
    setUploadedFiles([]);
    setLoadingFiles([]);
    setUploadProgress({});
  };

  const handleClosePopup = () => {
    setErrorPopup({ isOpen: false, message: '' });
  };

  return (
    <UploadContainer
      $isDragging={isDragging}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
      }}
    >
      {errorPopup.isOpen && (
        <ErrorPopup message={errorPopup.message} onClose={handleClosePopup} />
      )}

      {successMessage ? (
        <>
          <SuccessMessage>{successMessage}</SuccessMessage>
          <ButtonContainer>
            <FinishButton onClick={handleResetUpload}>
              Enviar Novamente
            </FinishButton>
          </ButtonContainer>
        </>
      ) : (
        <>
          {loadingFiles.length > 0 ? (
            loadingFiles.map((file) => (
              <div key={file.id}>
                <UploadingMessage>{file.file.name}</UploadingMessage>
                <ProgressBarContainer>
                  <ProgressBar progress={uploadProgress[file.id]} />
                </ProgressBarContainer>
                <p>{uploadProgress[file.id]}%</p>
              </div>
            ))
          ) : (
            <></>
          )}

          {uploadedFiles.length === 0 && loadingFiles.length === 0 && (
            <>
              <h3>Anexe aqui seu(s) comprovante(s) de pagamento.</h3>
              <p>Arquivos permitidos: PDF, JPEG ou PNG - Max 25mb</p>
            </>
          )}

          {uploadedFiles.length > 0 && loadingFiles.length === 0 && (
            <>
              <h3>Arquivos enviados</h3>
              <UploadedFilesList>
                {uploadedFiles.map((file) => (
                  <li key={file.id}>
                    {file.file.name}
                    <DeleteButton
                      onClick={() =>
                        setUploadedFiles((prev) =>
                          prev.filter((f) => f.id !== file.id)
                        )
                      }
                    >
                      Excluir
                    </DeleteButton>
                  </li>
                ))}
              </UploadedFilesList>
            </>
          )}

          {/* Mostra os botões "Selecionar Arquivo" e "Finalizar Envio" quando não há arquivos carregados */}
          {uploadedFiles.length === 0 && loadingFiles.length === 0 && (
            <ButtonContainer>
              <SelectFileButton htmlFor="file-upload">
                Selecionar Arquivo
              </SelectFileButton>
            </ButtonContainer>
          )}

          {uploadedFiles.length > 0 && loadingFiles.length === 0 && (
            <ButtonContainer>
              <SelectFileButton htmlFor="file-upload">
                Selecionar Arquivo
              </SelectFileButton>
              <FinishButton onClick={handleFinishUpload}>
                Finalizar Envio
              </FinishButton>
            </ButtonContainer>
          )}

          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.jpeg,.png"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
        </>
      )}
    </UploadContainer>
  );
};
