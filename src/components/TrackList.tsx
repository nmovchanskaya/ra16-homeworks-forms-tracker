import { TrackType } from "./TrackType";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const TrackList = (props: {tracks: TrackType[], onDelete: (date: number) => void}) => {

    dayjs.extend(customParseFormat);

    const {tracks, onDelete} = props;
  
    return (
        <>
            <table className="tracklist">
                {tracks.map((item: TrackType) => {
                    return (
                        <tr className="tracklist__item">
                            <td className="tracklist__td">
                                {dayjs(new Date(item.date).toLocaleDateString('en-GB')).format('DD.MM.YYYY')}
                            </td>
                            <td className="tracklist__td">
                                {item.qty}
                            </td>
                            <td className="tracklist__del">
                                <button className="tracklist__del_btn" onClick={() => {onDelete(item.date)}}>
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