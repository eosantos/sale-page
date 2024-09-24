import { useState } from 'react';
import ErrorPopup from './ErrorPopup';
import { HiArrowDownTray } from 'react-icons/hi2';
import { GiPaperClip } from 'react-icons/gi';

import styled from 'styled-components';

const UploadContainer = styled.div<{ $isDragging: boolean }>`
  margin: 20px 0 0 20px;
  padding: 60px;
  border: 2px ${({ $isDragging }) => ($isDragging ? 'dashed' : 'solid')} #015047;
  border-radius: 10px;
  text-align: center;
  background-color: ${({ $isDragging }) =>
    $isDragging ? '#e0f7fa' : '#f9f9f9'};
  transition:
    background-color 0.3s,
    border-color 0.3s;
`;

const UploadTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 780px) {
    display: block;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 5px;
`;

const UploadSubtitle = styled.h1`
  font-size: 16px;
  font-weight: 400;
`;

const HiArrowDownTrayIcon = styled.span`
  font-size: 35px;
  color: #015047;
  margin-right: 20px; // Ajuste se necessário
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: #f3f3f3;
  border-radius: 5px;
  margin: 10px auto;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 10px;
  background-color: #015047;
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
  background-color: #015047;
  color: white;
  padding: 10px 50px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #015049;
  }
`;

const SelectFileButton = styled.label`
  margin-top: 20px;
  background-color: #f9f9f9;
  color: #015047;
  border: 1px solid #015047;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;

  &:hover {
    background-color: #015047;
    color: #f9f9f9;
  }
`;

const DeleteButton = styled.button`
  background-color: #8c8c8c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 50px;
  margin-bottom: 10px;

  &:hover {
    background-color: #212121;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
`;

const GiPaperClipIcon = styled.span`
  margin-left: 5px;
`;

interface UploadedFile {
  file: File;
  id: string;
}

const DragMessage = styled.p`
  font-size: 18px;
  color: #015047;
  margin-top: 10px;
`;

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
              {isDragging ? (
                <UploadTitleContainer>
                  <HiArrowDownTrayIcon>
                    <HiArrowDownTray />
                  </HiArrowDownTrayIcon>
                  <DragMessage>SOLTE AQUI SEUS ARQUIVOS</DragMessage>
                </UploadTitleContainer>
              ) : (
                <UploadTitleContainer>
                  <HiArrowDownTrayIcon>
                    <HiArrowDownTray />
                  </HiArrowDownTrayIcon>
                  <TextContainer>
                    <UploadTitle>
                      Anexe aqui seu(s) comprovante(s) de pagamento.
                    </UploadTitle>
                    <UploadSubtitle>
                      Arquivos permitidos: PDF, JPEG ou PNG - Max 25mb
                    </UploadSubtitle>
                  </TextContainer>
                </UploadTitleContainer>
              )}
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
                      x
                    </DeleteButton>
                  </li>
                ))}
              </UploadedFilesList>
            </>
          )}

          {uploadedFiles.length === 0 &&
            loadingFiles.length === 0 &&
            !isDragging && (
              <ButtonContainer>
                <SelectFileButton htmlFor="file-upload">
                  ADICIONAR ARQUIVO
                  <GiPaperClipIcon>
                    <GiPaperClip />
                  </GiPaperClipIcon>
                </SelectFileButton>
              </ButtonContainer>
            )}

          {uploadedFiles.length > 0 && loadingFiles.length === 0 && (
            <ButtonContainer>
              <SelectFileButton htmlFor="file-upload">
                ADICIONAR ARQUIVO
                <GiPaperClipIcon>
                  <GiPaperClip />
                </GiPaperClipIcon>
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
