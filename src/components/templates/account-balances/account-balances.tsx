
interface IAccountBalancesProps {
    network: string;
}

const AccountBalancesComponent = (props: IAccountBalancesProps) => {
    return (
        <div>
            {props.network}
        </div>
    );
}

export const AccountBalances = AccountBalancesComponent;