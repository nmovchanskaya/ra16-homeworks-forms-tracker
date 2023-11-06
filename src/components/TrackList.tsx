import { TrackType } from "./TrackType";
import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const TrackList = (props: {tracks: TrackType[]}) => {

    dayjs.extend(customParseFormat);

    const {tracks} = props;
    const [curTracks, setTracks] = useState(tracks);
    const [form, setForm] = useState({
        date: 0,
        qty: 0
    });

    const deleteTrack = (date: number) => {
        setTracks(prevTracks => {
            return prevTracks.filter(item => item.date !== date).sort((a, b) => 
                a.date - b.date 
            );
        });
    }

    const addTrack = (event: React.FormEvent) => {
        event.preventDefault();

        setTracks(prevTracks => {

            const formDate = Date.parse(dayjs(form.date).format('MM/DD/YYYY'));
            const trackSameDate = prevTracks.filter(item => item.date === formDate);

            if (trackSameDate.length) {
                const tracksWithoutDate = prevTracks.filter(item => item.date !== formDate);
                return [...tracksWithoutDate, {
                    date: formDate,
                    qty: Number(form.qty) + Number(trackSameDate[0].qty)
                }].sort((a, b) => 
                    a.date - b.date 
                );
            }
            else {
                return [...prevTracks, {
                    date: formDate,
                    qty: form.qty
                }].sort((a, b) => 
                    a.date - b.date 
                );
            }
        });
    }

    const handlerInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    }
  
    return (
        <>
            <form onSubmit={event => event.preventDefault}>
                <input 
                    className="addform__input"
                    type="text" 
                    name="date"
                    placeholder="Date, dd.mm.yy" 
                    onChange={handlerInputChange} 
                />
                <input 
                    className="addform__input"
                    type="text" 
                    name="qty"
                    placeholder="Track, km"
                    onChange={handlerInputChange} 
                />
                <button type="submit" className="addform__submit" onClick={addTrack}>Add</button>
            </form>
            <table className="tracklist">
                {curTracks.map((item: TrackType) => {
                    return (
                        <tr className="tracklist__item">
                            <td className="tracklist__td">
                                {dayjs(new Date(item.date).toLocaleDateString('en-GB')).format('DD.MM.YYYY')}
                            </td>
                            <td className="tracklist__td">
                                {item.qty}
                            </td>
                            <td className="tracklist__del">
                                <button className="tracklist__del_btn" onClick={() => deleteTrack(item.date)}>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </>
    )
}