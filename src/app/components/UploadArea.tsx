import React from 'react';
import UploadContainer from './UploadContainer';
import UploadButton from './UploadButton';
import UploadIconWrapper from './UploadIconWrapper';
import UploadSelectFileButton from './UploadSelectFileButton';
import UploadFinishButton from './UploadFinishButton';
import {
  UploadProgressBarContainer,
  UploadProgressBar
} from './UploadProgressBar';
import UploadedFilesList from './UploadedFilesList';
import UploadDeleteButton from './UploadDeleteButton';
import UploadDragMessage from './UploadDragMessage';
import ErrorPopup from './ErrorPopup';
import { HiArrowDownTray } from 'react-icons/hi2';
import { GiPaperClip } from 'react-icons/gi';
import useUploadHandlers from '../hooks/useUploadHandlers';
import styled from 'styled-components';

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

const FileName = styled.span`
  font-size: 12px
  display: flex;
  color: #015047;
  font-weight: 600;
`;

const ContainerProgress = styled.span`
  display: flex;
  align-items: center;
`;

const FileProgress = styled.span`
  font-size: 12px;
  color: #229321;
  font-weight: 600;
  margin-right: 0px;
`;

const UploadTitleEnviados = styled.h1`
  font-size: 18px;
  margin-bottom: 5px;
  color: #015047;
`;

const UploadSubtitle = styled.h1`
  font-size: 16px;
  font-weight: 400;
`;

const GiPaperClipIcon = styled.span`
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
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

const UploadArea: React.FC = () => {
  const {
    isDragging,
    uploadedFiles,
    loadingFiles,
    uploadProgress,
    successMessage,
    errorPopup,
    handleFileSelect,
    handleDrop,
    handleResetUpload,
    handleFinishUpload,
    handleClosePopup,
    setIsDragging,
    setUploadedFiles
  } = useUploadHandlers();

  return (
    <UploadContainer
      $isDragging={isDragging}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {errorPopup.isOpen && (
        <ErrorPopup message={errorPopup.message} onClose={handleClosePopup} />
      )}
      {successMessage ? (
        <>
          <p>{successMessage}</p>
          <UploadButton>
            <UploadFinishButton onClick={handleResetUpload}>
              Enviar Novamente
            </UploadFinishButton>
          </UploadButton>
        </>
      ) : (
        <>
          {loadingFiles.length > 0 ? (
            loadingFiles.map((file) => (
              <div key={file.id}>
                <FileName>{file.file.name}</FileName>
                <ContainerProgress>
                  <FileProgress>{uploadProgress[file.id]}%</FileProgress>
                  <UploadProgressBarContainer>
                    <UploadProgressBar progress={uploadProgress[file.id]} />
                  </UploadProgressBarContainer>
                </ContainerProgress>
              </div>
            ))
          ) : (
            <>
              {uploadedFiles.length === 0 && (
                <div>
                  {isDragging ? (
                    <>
                      <UploadIconWrapper>
                        <HiArrowDownTray />
                      </UploadIconWrapper>
                      <UploadDragMessage isDragging={isDragging}>
                        SOLTE AQUI SEUS ARQUIVOS
                      </UploadDragMessage>
                    </>
                  ) : (
                    <UploadTitleContainer>
                      <UploadIconWrapper>
                        <HiArrowDownTray />
                      </UploadIconWrapper>

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
                  {!isDragging && (
                    <ButtonContainer>
                      <SelectFileButton htmlFor="file-upload">
                        ADICIONAR ARQUIVO
                        <GiPaperClipIcon>
                          <GiPaperClip />
                        </GiPaperClipIcon>
                      </SelectFileButton>
                    </ButtonContainer>
                  )}
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <>
                  <UploadTitleEnviados>ARQUIVOS ENVIADOS</UploadTitleEnviados>
                  <UploadSubtitle>
                    Arquivos permitidos: PDF, JPEG ou PNG - Max 25mb
                  </UploadSubtitle>
                  <UploadedFilesList>
                    {uploadedFiles.map((file) => (
                      <li key={file.id}>
                        <FileName>{file.file.name}</FileName>
                        <UploadDeleteButton
                          onClick={() =>
                            setUploadedFiles((prev) =>
                              prev.filter((f) => f.id !== file.id)
                            )
                          }
                        >
                          X
                        </UploadDeleteButton>
                      </li>
                    ))}
                  </UploadedFilesList>
                  <UploadButton>
                    <UploadSelectFileButton htmlFor="file-upload">
                      ADICIONAR ARQUIVO
                      <GiPaperClipIcon>
                        <GiPaperClip />
                      </GiPaperClipIcon>
                    </UploadSelectFileButton>
                    <UploadFinishButton onClick={handleFinishUpload}>
                      FINALIZAR ENVIO
                    </UploadFinishButton>
                  </UploadButton>
                </>
              )}
            </>
          )}
          <input
            id="file-upload"
            type="file"
            multiple
            accept="application/pdf, image/jpeg, image/png"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </>
      )}
    </UploadContainer>
  );
};

export default UploadArea;
