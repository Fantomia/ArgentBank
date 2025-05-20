import { accounts } from "../../data/accounts";
import UpdateUser from "../updateUser/updateUser";

const Account = () => {
    
    return (
        <>
            <UpdateUser />

            <h2 className="sr-only">Accounts</h2>
                {accounts.map((account) => (
                    <section key={account.id} className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.name}</h3>
                            <p className="account-amount">${account.balance}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                ))}
        </>
    )
}

export default Account