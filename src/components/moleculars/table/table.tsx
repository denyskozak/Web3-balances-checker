import * as React from 'react';
import { Table as MaterialTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface ITableProps<T> {
    headCells: { title: string, key: keyof T }[],
    bodyCells: T[],
}

export const Table = <T extends {id: string}>(props: ITableProps<T>) => {
    const {headCells, bodyCells} = props;

    return (
        <TableContainer component={Paper}>
            <MaterialTable>
                <TableHead>
                    <TableRow>
                        {headCells.map((cell, index) => <TableCell key={`${cell.title}-${cell.key}`}
                                                          align={index !== 0 ? 'right' : 'left'}>{cell.title}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bodyCells.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            {headCells.map((cell, index) =>
                                <TableCell key={`${cell.title}-${cell.key}`} component={index !== 0 ? 'td' : 'th'}
                                           align={index !== 0 ? 'right' : 'left'}>{row[cell.key]}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </MaterialTable>
        </TableContainer>
    );
}