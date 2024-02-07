import {useState} from 'react';
import {Alert, Button, Tooltip, Typography} from '@mui/material';
import {Card, List} from '../../';

interface IAccountCardProps {
    address: string;
    list: [string, string][]
    onDeleteClick: (address: string) => void;
}

export const AccountCard = (props: IAccountCardProps) => {
    const {
        address,
        list,
        actions,
        onDeleteClick,
    } = props;

    const [isCopiedAlertActive, setCopiedAlertActive] = useState(false);

    return (
            <Card actions={actions}>
                <Tooltip title={
                    <Typography gutterBottom variant="subtitle2">
                        {address}
                    </Typography>
                }>
                    <Button onClick={() => {
                        const alertTime = 5 * 1000 // 5s
                        navigator.clipboard.writeText(address)
                            .then(() => {
                                setCopiedAlertActive(true);
                                setTimeout(() => setCopiedAlertActive(false), alertTime)
                            })
                            .catch(() => alert('Copy is fail. Try again'))
                    }}>
                        <Typography gutterBottom variant="body1">
                            {` Address: ${address.slice(0, 9)}...`}
                        </Typography>
                    </Button>
                </Tooltip>
                {isCopiedAlertActive && <Alert severity="success">Address has benn copied</Alert>}
                <List values={list}/>
            </Card>
        );
}