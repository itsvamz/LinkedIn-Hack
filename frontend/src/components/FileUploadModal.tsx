
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (file: File) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      onClose();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-sm text-gray-700 mb-4">Upload your resume or portfolio</p>
            <Button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700">
              Choose File
            </Button>
            <p className="text-xs text-gray-500 mt-3">PDF, DOC, DOCX up to 10MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
