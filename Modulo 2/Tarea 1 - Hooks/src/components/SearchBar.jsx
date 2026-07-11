import PropTypes from "prop-types";

const SearchBar = ({ searchText, setSearchText }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Buscar tarea..."
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="
            w-full
            px-4
            py-3
            border
            border-gray-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            transition
        "
            />
        </div>
    )
}

SearchBar.propTypes = {
    setSearchText: PropTypes.func.isRequired,
};

export default SearchBar