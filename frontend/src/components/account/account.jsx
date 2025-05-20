import { accounts } from "../../data/accounts";
import SectionItem from "../sectionItem/sectionItem";
import UpdateUser from "../updateUser/updateUser";

const Account = () => {
    
    return (
        <>
            <UpdateUser />

            <h2 className="sr-only">Accounts</h2>
                {accounts.map((account) => (
                    <SectionItem
                        key={account.id}
                        title={account.name}
                        amount={account.balance}
                        currency={account.currency}
                        description={account.description}
                        customClass="account"
                    >
                        <button className="transaction-button">View transactions</button>
                    </SectionItem>
                ))}
        </>
    )
}

export default Account