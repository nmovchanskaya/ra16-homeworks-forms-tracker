export const FormAdd = (props: {
        addTrack: React.MouseEventHandler, 
        setForm: React.Dispatch<React.SetStateAction<{
            date: string;
            qty: string;
        }>>, 
        form: {
            date: string;
            qty: string;
        }
    }) => {

    const {addTrack, setForm, form} = props;

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    }

    return (
        <form onSubmit={event => event.preventDefault}>
            <input 
                className="addform__input"
                type="text" 
                name="date"
                placeholder="Date, dd.mm.yy" 
                value={form.date}
                onChange={handlerInputChange} 
            />
            <input 
                className="addform__input"
                type="text" 
                name="qty"
                placeholder="Track, km"
                value={form.qty}
                onChange={handlerInputChange} 
            />
            <button type="submit" className="addform__submit" onClick={addTrack}>Add</button>
        </form>
    )
}
