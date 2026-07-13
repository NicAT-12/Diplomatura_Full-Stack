import { Navigate, useLocation, Outlet } from 'react-router-dom'

import PropTypes from 'prop-types'

const RutaProtegida = ({ isLoged }) => {
    const location = useLocation()

    if (!isLoged) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return <Outlet />
}

RutaProtegida.propTypes = {
    isLoged: PropTypes.bool.isRequired
};

export default RutaProtegida