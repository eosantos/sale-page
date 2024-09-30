import { useState } from 'react';

interface UploadedFile {
  file: File;
  id: string;
}

const useUploadHandlers = () => {
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
  }>({
    isOpen: false,
    message: ''
  });

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      handleFiles(filesArray);
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => validateFile(file));
    const newFiles = validFiles.map((file) => ({
      file,
      id: file.name + Date.now()
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => uploadFile(file));
  };

  const validateFile = (file: File): boolean => {
    const isValidSize = file.size <= 25 * 1024 * 1024; // 25MB
    const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(
      file.type
    );
    const isDuplicate = uploadedFiles.some(
      (uploadedFile) => uploadedFile.file.name === file.name
    );

    if (!isValidSize) {
      showErrorPopup('O arquivo deve ter no máximo 25MB.');
    } else if (!isValidType) {
      showErrorPopup(
        'Tipo de arquivo não suportado. Apenas PDF, JPEG e PNG são permitidos.'
      );
    } else if (isDuplicate) {
      showErrorPopup('Você já enviou um arquivo com esse nome.');
    }

    return isValidSize && isValidType && !isDuplicate;
  };

  const showErrorPopup = (message: string) => {
    setErrorPopup({ isOpen: true, message });
  };

  const uploadFile = async (file: UploadedFile) => {
    setLoadingFiles((prev) => [...prev, file]);
    setUploadProgress((prev) => ({ ...prev, [file.id]: 0 }));
    for (let i = 1; i <= 100; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simula um delay
      setUploadProgress((prev) => ({ ...prev, [file.id]: i }));
    }
    setLoadingFiles((prev) => prev.filter((f) => f.id !== file.id));
    if (loadingFiles.length === 1) {
      setSuccessMessage('Arquivos enviados com sucesso!');
    }
  };

  const handleFinishUpload = () => {
    setSuccessMessage('Arquivos enviados com sucesso!');
    setLoadingFiles([]);
  };

  const handleResetUpload = () => {
    setSuccessMessage('');
    setUploadedFiles([]);
    setLoadingFiles([]);
    setUploadProgress({});
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleClosePopup = () => {
    setErrorPopup({ isOpen: false, message: '' });
  };

  return {
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
  };
};

export default useUploadHandlers;
