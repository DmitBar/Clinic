import { type PaletteMode } from '@mui/material';

export const getThemeMode = (): PaletteMode => {
  return (localStorage.getItem('mode') as PaletteMode) ?? 'light';
};

/**
 * Download file with blob
 * @param data
 * @param fileName
 * @param blobType
 */
export function downloadFile(
  data: any,
  fileName: string,
  blobType: string | undefined = undefined
): void {
  const blobOptions = blobType ? { type: blobType } : undefined;
  const url = window.URL.createObjectURL(new Blob([data], blobOptions));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
}

export function parseJwt(token: string) {
  var base64Url = token?.split('.')[1];
  var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      ?.split('')
      ?.map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      ?.join('')
  );

  return JSON.parse(jsonPayload);
}
