import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../../features/userThunks";
import { accounts } from "../../data/accounts";

const Account = () => {
    const dispatch = useDispatch(); 
    const token = useSelector((state) => state.auth.token); // Récupérer le token depuis Redux 
    const user = useSelector((state) => state.auth.user); // Récupérer les données de l'utilisateur

    useEffect(() => {
        if (token) {
          dispatch(fetchUserData()); // Récupérer les infos de l'utilisateur
        }
      }, [token, dispatch]);
    return (
        <>
            <div className="header">
                {user && (
                    <>
                        <h1>Welcome back, {user.firstName} {user.lastName}!</h1>
                        <button className="edit-button">Edit Name</button>
                    </>
                )}
            </div>

            <h2 className="sr-only">Accounts</h2>
                {accounts.map((account) => (
                    <section key={account.id} className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.name}</h3>
                            <p className="account-amount">{account.balance}</p>
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