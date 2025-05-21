
const Search = (props) => {
return (
    <div>
            <h3>Search</h3>
                <input 
                type="text"
                value={props.searchTerm}
                onChange={e => {
                    let lowerCaseSearchTerm = e.target.value.toLowerCase()
                    props.setSearchTerm(lowerCaseSearchTerm)
                    }}
                placeholder="By name"
            />

        </div>
    )

}

export default Search