import { ReactNode } from 'react';

export interface MainCardProps {
  border: boolean;
  boxShadow: boolean;
  children: ReactNode;
  content: boolean;
  contentClass: string;
  contentSX: {};
  darkTitle: boolean;
  secondary: ReactNode;
  shadow: string;
  sx: {};
  title: ReactNode;
  elevation?: number;
}
