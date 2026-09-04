import PropTypes from 'prop-types';

const UsuarioCard = ({ usuario }) => {
    return (
        <li className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <p className="text-lg font-semibold text-gray-800">{usuario.name}</p>
            <p className="text-sm text-gray-500 mt-1">{usuario.email}</p>
        </li>
    )
}

UsuarioCard.propTypes = {
    usuario: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default UsuarioCard;