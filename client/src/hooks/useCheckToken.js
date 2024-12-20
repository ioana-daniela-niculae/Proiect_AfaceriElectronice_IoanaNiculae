import { useEffect } from 'react'; 

//ca sa fol await declaram fct ca fiind async
const useCheckToken = (setLoading, setIsLoggedIn) => {
    useEffect(() => {
        //incercam sa luam tokenul din local storage
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/auth/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token}) // transf tokenul sub forma de obiect
            })
            //daca requestul a fost cu succes si nu a crapat, testam cu then
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setIsLoggedIn(true);
                }
            })
            //daca avem o eroare de ex. tokenul nu mai e valid sau e gresit
            //fol catch ca sa stergem tokenul resp din local storage
            .catch(() => {
                //daca se intampla vreo eroare stergem tokenul si
                // si redirectionam la login
                localStorage.removeItem('token');
                window.location.href = '/login'
            })
            //la finally vrem sa indif de ce se intampla setLoading sa fie false
            .finally(() => {
                setLoading(false);
            })
        } else {
            setLoading(false)
        }

    }, [])
}

export default useCheckToken;