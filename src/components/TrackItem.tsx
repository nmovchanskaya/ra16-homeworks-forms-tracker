import { TrackType } from "./TrackType";

export const TrackItem = (props: {track: TrackType}) => {
    const {track} = props;

    return (
      <tr className="tracklist__item">
          <td>
              {track.date}
          </td>
          <td>
              {track.qty}
          </td>
          <td>
              <button className="tracklist__item_edit">edit</button>
              <button className="tracklist__item_del">del</button>
          </td>
      </tr>
    )
  }