const Add = (props) => {

return (
    <div>
        <h3>Add</h3>
        {/* add a custom submission function reference directly to the form so as not to trigger
        the page to rerender*/}

        <form onSubmit={props.addPersonToList}>
        <div>
            Name: <input
                    type="text"
                    value={props.newName}
                    onChange={e => {
                    props.setNewName(e.target.value)

                    }}/>
        </div>
        <div>
            <label>Phone number: </label>
            <input
                type="tel"
                // pattern="\(\d{3}\)\s\d{3}-\d{4}" disables on 5/16 in order to implement on the back-end
                value={props.newPhone}
            onChange={e => props.setNewPhone(e.target.value)}
            placeholder="(000) 000-0000"
            />

        </div>
        <div>
          {/*ensure that the type of the button is submit so that the form can read it */}
          <button type='submit'>add</button>
        </div>
        </form>
    </div>
    )
}
export default Add