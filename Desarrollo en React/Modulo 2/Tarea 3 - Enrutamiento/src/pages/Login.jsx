import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({ handleLogin }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from
    const destino = from ? `${from.pathname}${from.search}` : '/'

    const onClickIngresar = () => {
        handleLogin()
        navigate(destino)
    }

    return (
        <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Login</h2>
            <button onClick={onClickIngresar} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Ingresar</button>
        </div>
    )
}

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired
};

export default Login;