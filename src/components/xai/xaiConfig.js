export const MODALITIES = {
  chest: {
    label: 'Chest X-ray',
    noun: 'radiograph',
    landmarks: ['Lung fields (upper, middle, lower zones)', 'Cardiac silhouette', 'Mediastinum', 'Costophrenic angles'],
  },
  retina: {
    label: 'Retinal Fundus',
    noun: 'fundus image',
    landmarks: ['Optic disc', 'Macula', 'Vascular arcades', 'Peripheral retina'],
  },
};

export const VIEW_MODES = [
  { id: 'overlay', label: 'Overlay' },
  { id: 'side', label: 'Side by side' },
  { id: 'original', label: 'Original' },
  { id: 'heatmap', label: 'Grad-CAM' },
];

export const ZOOM_MIN = 1;
export const ZOOM_MAX = 4;
export const ZOOM_STEP = 0.25;
