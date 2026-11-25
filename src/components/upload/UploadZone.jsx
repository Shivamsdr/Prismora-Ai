import { useState, useRef } from 'react';
import { Upload, FolderOpen } from 'lucide-react';

/**
 * UploadZone — Accessible drag-and-drop and file-picker upload area.
 * Supports keyboard activation and restrained visual feedback on drag-over.
 */
export default function UploadZone({
  onFileSelect,
  inputRef: externalRef,
  modalityName = 'medical image',
  disabled = false,
}) {
  const internalRef = useRef(null);
  const inputRef = externalRef || internalRef;
  const [isDragging, setIsDragging] = useState(false);

  function openFilePicker() {
    if (disabled) return;
    inputRef.current?.click();
  }

  function handleInputChange(e) {
    const selected = e.target.files?.[0];
    if (selected) {
      onFileSelect(selected);
    }
    // Reset input value so selecting the same file again triggers onChange
    e.target.value = '';
  }

  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isDragging) setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    // Only clear dragging state when leaving the dropzone container itself
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;

    const dropped = e.dataTransfer?.files?.[0];
    if (dropped) {
      onFileSelect(dropped);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFilePicker();
    }
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Upload ${modalityName}. Drag and drop or press Enter to browse files.`}
      onClick={openFilePicker}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={[
        'flex flex-col items-center justify-center text-center px-6 py-10 sm:py-12',
        'rounded-lg border border-dashed transition-base cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
        isDragging
          ? 'border-teal-600 bg-teal-50/70'
          : 'border-neutral-300 bg-neutral-50 hover:border-teal-600 hover:bg-teal-50/30',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
      ].join(' ')}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        onChange={handleInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        className={[
          'flex items-center justify-center w-11 h-11 rounded-md border mb-4 transition-base',
          isDragging
            ? 'border-teal-300 bg-teal-100 text-teal-700'
            : 'border-neutral-200 bg-white text-teal-600 shadow-xs',
        ].join(' ')}
      >
        <Upload size={20} aria-hidden="true" />
      </div>

      <p className="text-sm font-semibold text-navy-600 mb-1">
        {isDragging ? `Drop ${modalityName} here` : `Select or drop a ${modalityName}`}
      </p>

      <p className="text-xs text-neutral-600 max-w-sm leading-relaxed mb-5">
        Drag and drop an image file into this area, or browse from your local device.
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openFilePicker();
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold border border-neutral-300 bg-white text-neutral-800 hover:border-teal-600 hover:text-teal-700 shadow-xs transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        <FolderOpen size={14} aria-hidden="true" />
        Browse files
      </button>

      <div className="mt-5 pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Formats: JPG · JPEG · PNG
        </span>
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-400">
          |
        </span>
        <span className="font-mono text-2xs uppercase tracking-wider text-neutral-500">
          Max size: 10 MB
        </span>
      </div>
    </div>
  );
}
