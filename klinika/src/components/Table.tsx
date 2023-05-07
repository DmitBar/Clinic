import React, { useContext } from 'react';
import { Divider, type SelectChangeEvent } from '@mui/material';
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Table as MUITable,
  Pagination,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { type ReactNode } from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { TableSkeleton } from './TableSkeleton';
import { getThemeMode } from '../utils';
import { PaletteModeTypes } from '../theme/theme';

export interface ITableCol<T> {
  label: string;
  renderCell?: (value: T, position: number) => ReactNode;
  accessor?: keyof T;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

interface ITableProps<T> {
  cols: Array<ITableCol<T>>;
  data: T[] | undefined;
  title: string;
  interactive?: boolean;
  onRowClick?: (row: T) => void;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onPageChange?: (page: number, rowsOffset: number) => void;
  onRowsPerPageChange?: (perPage: number) => void;
  footerInfo?: ReactNode;
  page?: number;
  count?: number;
  loading?: boolean;
  rightActions?: ReactNode;
}

export const Table = <T,>({
  cols,
  data = [],
  title,
  interactive = false,
  count = 0,
  onRowClick = () => {},
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
  page = 1,
  rowsPerPage = 0,
  rowsPerPageOptions = [],
  footerInfo = null,
  loading = false,
  rightActions = null,
}: ITableProps<T>): JSX.Element => {
  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    page: number
  ): void => {
    onPageChange(page, (page - 1) * rowsPerPage);
  };
  const handleRowsPerPageChange = (event: SelectChangeEvent<number>): void => {
    onRowsPerPageChange(Number(event.target.value));
  };

  const handleRowClick = (row: T) => (): void => {
    onRowClick(row);
  };
  return (
    <TableContainer component={Paper}>
      <PerfectScrollBar style={{ maxHeight: 780 }}>
        <Box p="24px" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            fontSize="1.125rem"
            fontWeight={500}
            lineHeight={1.334}
            letterSpacing={0.3}
            color="inherit"
          >
            {title}
          </Typography>
          {rightActions}
        </Box>
        <Divider />
        <MUITable stickyHeader>
          <TableHead>
            <TableRow
              sx={{
                '& > *:first-of-type': {
                  pl: 2.5,
                },
                whiteSpace: 'nowrap',
              }}
            >
              {cols.map((col) => (
                <TableCell key={col.label} align={col.align ?? 'left'}>
                  <Typography
                    fontSize="16px"
                    fontWeight={400}
                    letterSpacing={0.3}
                    color="inherit"
                  >
                    {col.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!loading ? (
              data.length > 0 ? (
                data.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      onClick={handleRowClick(row)}
                      sx={{
                        ...(interactive && {
                          '&:hover': {
                            backgroundColor:
                              getThemeMode() === PaletteModeTypes.light
                                ? grey[50]
                                : grey[800],
                            cursor: 'pointer',
                          },
                        }),
                        '& > *:first-of-type': {
                          pl: 2.5,
                        },
                      }}
                    >
                      {cols.map(({ accessor, renderCell, align = 'left' }) => {
                        return (
                          <TableCell key={accessor! as string} align={align}>
                            {renderCell ? (
                              renderCell(row, index + (page - 1) * rowsPerPage)
                            ) : (
                              <Typography
                                fontSize="14px"
                                fontWeight={400}
                                letterSpacing={0.3}
                                color="inherit"
                              >
                                {(row[accessor!] as ReactNode) ?? '-------'}
                              </Typography>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={cols.length} align="center">
                    <Typography
                      sx={{ p: 6 }}
                      fontSize="16px"
                      fontWeight={400}
                      letterSpacing={0.3}
                      color="inherit"
                    >
                      Список пуст
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableSkeleton count={rowsPerPage} colSpan={cols.length} />
            )}
          </TableBody>
          {(rowsPerPageOptions.length > 0 || count > 1 || footerInfo) &&
            data.length !== 0 && (
              <TableFooter
                sx={{
                  position: 'sticky',
                  bottom: 0,
                  bgcolor:
                    getThemeMode() === PaletteModeTypes.light
                      ? grey[50]
                      : grey[900],
                }}
              >
                <TableRow>
                  <TableCell
                    colSpan={cols.length}
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {rowsPerPageOptions.length > 0 && (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap={1}
                          flex={0.8}
                        >
                          <Typography color="inherit">
                            Показывать на странице:
                          </Typography>
                          <Select
                            size="small"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                          >
                            {rowsPerPageOptions.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </Box>
                      )}

                      {count > 0 && (
                        <Pagination
                          count={Math.ceil(count / rowsPerPage)}
                          page={page}
                          color="primary"
                          onChange={handlePageChange}
                        />
                      )}
                      <Box flex={1} display="flex" justifyContent="end">
                        {footerInfo}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
        </MUITable>
      </PerfectScrollBar>
    </TableContainer>
  );
};
