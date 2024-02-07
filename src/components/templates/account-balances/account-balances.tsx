
interface IAccountBalancesProps {
    address: string;
    onAddressChange: (value: string) => void;
    onAddressSubmit: () => void;
}

const AccountBalancesComponent = (props: IAccountBalancesProps) => {
    const {
        address,
        onAddressChange,
        onAddressSubmit,
        balances
    } = props;

    return (
        <div>
            <input value={address} onChange={event => onAddressChange(event.target.value)} />
            <button onClick={onAddressSubmit}>Check address</button>
            {JSON.stringify(balances)}
        </div>
    );
}

export const AccountBalances = AccountBalancesComponent;