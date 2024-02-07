import {Card as MaterialCard, CardActions, CardContent, Typography} from '@mui/material';
import {ReactNode} from 'react';

interface ICardProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children?: ReactNode;
}

export const Card = (props: ICardProps) => {
    const {title, description, children, actions} = props;

    return (
        <MaterialCard sx={{maxWidth: 345}}>
            <CardContent>
                <Typography gutterBottom variant="subtitle1">
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2">
                        {description}
                    </Typography>
                )}
                {children}
            </CardContent>
            {actions && (<CardActions>{actions}</CardActions>)}
        </MaterialCard>
    );
};
