import {Web3ContextWrapper} from './contexts/web3.context';
import {MainPage} from './pages';

function App() {
    return (
        <Web3ContextWrapper>
            <MainPage/>
        </Web3ContextWrapper>
    )
}

export default App
