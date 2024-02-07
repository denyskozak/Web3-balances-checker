import * as React from 'react';
import {Box, List as MaterialList, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';

interface IListProps {
    values: [string, string][]
}

export const List = (props: IListProps) => {
    const {values} = props;
    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <nav aria-label="main mailbox folders">
                <MaterialList>
                    {values.map(([title, value]) => (
                        <ListItem disablePadding  key={`${title}${value}`}>
                            <ListItemIcon>
                                {title}
                            </ListItemIcon>
                            <ListItemText>
                                {value}
                            </ListItemText>
                        </ListItem>
                    ))}
                </MaterialList>
            </nav>
        </Box>
    );
}
