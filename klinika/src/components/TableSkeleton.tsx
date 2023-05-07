import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

interface ITableSkeletonProps {
    count: number;
    colSpan: number;
}

export const TableSkeleton = ({ count, colSpan }: ITableSkeletonProps): JSX.Element => {
    return (
        <>
            {Array(count)
                .fill(1)
                .map((_, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell
                                colSpan={colSpan}
                                sx={{
                                    p: 0,
                                }}>
                                <Skeleton height={60} />
                            </TableCell>
                        </TableRow>
                    );
                })}
        </>
    );
};
