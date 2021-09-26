import { useEffect, useState, useContext } from "react";

import { IMG_PATH } from "../../constants/api";
import useUser from "../../hooks/use-user";
import { MyListContext } from "../../context/myList";
import { addToCurrentProfile, removeFromCurrentProfile } from "../../services/firebase";
import TrailerButton from "../Trailer/TrailerButton";

const DetailBanner = ({ data, type }) => {
  const [profile, setProfile] = useState(null)
  const [add, setAdd] = useState(false)
  const { user } = useUser()
  const { myList, setMyList } = useContext(MyListContext)

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('userProfile')))
    if (myList?.some(item => {
      return item.id === data.id
    })) {
      setAdd(true)
    }
  }, [myList])

  const handleSubmition = async () => {
    setAdd(!add)
    if (add) {
      const newMyList = myList.filter(item => {
        return item.id !== data.id
      })
      setMyList(newMyList)
      await removeFromCurrentProfile(user.docId, profile.profileId, {
        ...data, type
      })
    } else {
      setMyList((prev) => [...prev, { ...data, type }])
      await addToCurrentProfile(user.docId, profile.profileId, {
        ...data, type
      })
    }
  }

  return (
    <div className="info__banner">
      <div className="info__banner--poster">
        <div className="info__banner--poster-bg">
          <img
            className="info__banner--poster-bgimg"
            src={`${IMG_PATH}/${data.backdrop_path}`}
            alt={data.title}
          />
        </div>
        <div className="info__banner--detail">
          <h1 className="info__banner--detail-title">
            {data.title || data.name || data.original_title}
          </h1>
          <div className="info__banner--detail-actions">
            <TrailerButton id={data.id} />
            <button className="btn__round" onClick={handleSubmition}>
              {!add ?
                <svg viewBox="0 0 24 24">
                  <path
                    className="btn__round--icon"
                    d="M13 11h8v2h-8v8h-2v-8H3v-2h8V3h2v8z"
                    fill="currentColor"
                  ></path>
                </svg> :
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    className="btn__round--icon"
                    d="M3.707 12.293l-1.414 1.414L8 19.414 21.707 5.707l-1.414-1.414L8 16.586z"
                  ></path>
                </svg>
              }
            </button>
            <button className="btn__round">
              <svg viewBox="0 0 24 24">
                <path
                  className="btn__round--icon"
                  d="M15.167 8.994h3.394l.068.023c1.56.138 2.867.987 2.867 2.73 0 .275-.046.527-.092.78.367.435.596.986.596 1.72 0 .963-.39 1.52-1.032 1.978.023.183.023.252.023.39 0 .963-.39 1.784-1.009 2.243.023.206.023.275.023.39 0 1.743-1.33 2.591-2.89 2.73L12.21 22c-2.04 0-3.05-.252-4.563-.895-.917-.39-1.353-.527-2.27-.619L4 20.371v-8.234l2.476-1.445 2.27-4.427c0-.046.085-1.552.253-4.52l.871-.389c.092-.069.275-.138.505-.184.664-.206 1.398-.252 2.132 0 1.261.436 2.064 1.537 2.408 3.258.142.829.226 1.695.26 2.564l-.008 2zm-4.42-2.246l-2.758 5.376L6 13.285v5.26c.845.113 1.44.3 2.427.72 1.37.58 2.12.735 3.773.735l4.816-.023c.742-.078.895-.3 1.015-.542.201-.4.201-.876 0-1.425.558-.184.917-.479 1.078-.883.182-.457.182-.966 0-1.528.601-.228.901-.64.901-1.238s-.202-1.038-.608-1.32c.23-.46.26-.892.094-1.294-.168-.404-.298-.627-1.043-.738l-.172-.015h-5.207l.095-2.09c.066-1.448-.009-2.875-.216-4.082-.216-1.084-.582-1.58-1.096-1.758-.259-.09-.546-.086-.876.014-.003.06-.081 1.283-.235 3.67z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <button className="btn__round">
              <svg viewBox="0 0 24 24">
                <path
                  className="btn__round--icon"
                  d="M8.833 15.006H5.44l-.068-.023c-1.56-.138-2.867-.987-2.867-2.73 0-.275.046-.527.092-.78C2.23 11.038 2 10.487 2 9.753c0-.963.39-1.52 1.032-1.978-.023-.183-.023-.252-.023-.39 0-.963.39-1.784 1.009-2.243-.023-.206-.023-.275-.023-.39 0-1.743 1.33-2.591 2.89-2.73L11.79 2c2.04 0 3.05.252 4.563.895.917.39 1.353.527 2.27.619L20 3.629v8.234l-2.476 1.445-2.27 4.427c0 .046-.085 1.552-.253 4.52l-.871.389c-.092.069-.275.138-.505.184-.664.206-1.398.252-2.132 0-1.261-.436-2.064-1.537-2.408-3.258a19.743 19.743 0 0 1-.26-2.564l.008-2zm4.42 2.246l2.758-5.376L18 10.715v-5.26c-.845-.113-1.44-.3-2.427-.72C14.203 4.156 13.453 4 11.8 4l-4.816.023c-.742.078-.895.3-1.015.542-.201.4-.201.876 0 1.425-.558.184-.917.479-1.078.883-.182.457-.182.966 0 1.528-.601.228-.901.64-.901 1.238s.202 1.038.608 1.32c-.23.46-.26.892-.094 1.294.168.404.298.627 1.043.738l.172.015h5.207l-.095 2.09c-.066 1.448.009 2.875.216 4.082.216 1.084.582 1.58 1.096 1.758.259.09.546.086.876-.014.003-.06.081-1.283.235-3.67z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBanner;
